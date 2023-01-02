from os import listdir
import json
import re

# NOTES BEFORE RUNNING THE PROGRAM:
# -Create a new folder called "new_folder" at the same directory as this program
# -Copy the "Blocks" folder from appinventor-source
# -Create "messages.json" at the same dir as this program
# --This is the localisation file, which can be obtained in app inventor's github sources

# Copied from
# https://github.com/mit-cml/appinventor-sources/blob/f18f4508a341ac637e65c5ed96ab56372c88aebc/appinventor/blocklyeditor/src/blocks/utilities.js#L44
# With slight modifications
YailTypeToBlocklyTypeMap = {
    'number': {
        'input': "['Number']",
        'output': "['Number', 'String', 'Key']"
    },
    'text': {
        'input': "['String']",
        'output': "['Number', 'String', 'Key']"
    },
    'boolean': {
        'input': "['Boolean']",
        'output': "['Boolean', 'String']"
    },
    'list': {
        'input': "['Array']",
        'output': "['Array', 'String']"
    },
    'component': {
        'input': "['COMPONENT']",
        'output': "['COMPONENT', 'Key']"
    },
    'any': {
        'input': 'null',
        'output': 'null'
    },
    'dictionary': {
        'input': "['Dictionary']",
        'output': "['Dictionary', 'String', 'Array']"
    },
    'pair': {
        'input': "['Pair']",
        'output': "['Pair', 'String', 'Array']"
    },
    'key': {
        'input': "['Key']",
        'output': "['String', 'Key']"
    },
    'enum': {
        'input': 'null',
        'output': "['Key']"
    }
}

YailTypeToBlocklyTypeStr = "Blockly.Blocks.Utilities.YailTypeToBlocklyType("

replaceTextTable = {
    "Blockly.FieldFlydown.DISPLAY_BELOW" : "BELOW",
    "Blockly.FieldFlydown.DISPLAY_RIGHT" : "RIGHT",
    "Blockly.FieldFlydown.DISPLAY_LOCATION" : "BELOW"
}
replaceTextTableKeys = replaceTextTable.keys()

#Read file list
orginalBlockFilesLis = listdir("blocks")

#Read message
msgFile = open("messages.json","r")
messages = json.loads(msgFile.read())
#print(messages['Blockly.Msg.CONTROLS_IF_MSG_ELSE'])

#Replace all blocks with localised string
def replaceText(nline):
    _nline = nline
    if "Blockly.Msg" in nline and "goog." not in nline:
        if "new Blockly.FieldDropdown(" in nline: #DEBUG
            print(nline)

        #Identify type
        nline_split = nline.split(".")
        msgType = "Blockly.Msg." + "".join(list(filter(
            lambda x:x.isnumeric() or x.isalpha() or x=="_" or x=="-",
            nline_split[nline_split.index("Msg")+1]
        )))
        #Replace with string
        try:
            _nline = nline.replace(msgType,"\"" + messages[msgType] + "\"")
        except KeyError:
            msgType = "Blockly.Msg." + "LANG_" + "".join(list(filter(
                lambda x:x.isnumeric() or x.isalpha() or x=="_" or x=="-",
                nline_split[nline_split.index("Msg")+1]
            )))
            _nline = nline.replace(msgType,"\"" + messages[msgType] + "\"")
        #if "LANG_" in msgType:
        #    print(msgType)
    return _nline

#Loop through files
for fileName in orginalBlockFilesLis:
    if ".js" not in fileName:
        continue
    print("---Opening",fileName+"---")
    defFile = open("blocks/"+fileName,"r")
    defFileText = defFile.read()

    nJsFile = ""

    currentBlock = ""

    #Loop through lines in the file
    for line in defFileText.split("\n"):
        nline = line
        #Check for block type
        blockTypeList = re.findall("Blockly\.Blocks\['(?:[^\\']|\\\\|\\')*']",nline)
        if len(blockTypeList)==1:
            currentBlock = blockTypeList[0][blockTypeList[0].index("[")+2:blockTypeList[0].index("]")-1]
            #print(currentBlock)

        #Check for replaable string in the table
        for rkeys in replaceTextTable.keys():
            if rkeys in nline:
                nline = nline.replace(rkeys,replaceTextTable[rkeys])

        #Check for YailTypeToBlockType, as it is not a built in functin in vanila Blockly
        if "Blockly.Blocks.Utilities.YailTypeToBlocklyType(" in nline:
            #Get type so that it can be correctly mapped in this program
            varType = nline[nline.index(YailTypeToBlocklyTypeStr)+len(YailTypeToBlocklyTypeStr)+1:nline.rfind(",")-1]
            #Get if it is I/O so that it can be correctly mapped in this program
            if "Blockly.Blocks.Utilities.INPUT" in nline:
                IOtype = "input"
            else:
                IOtype = "output"

            #print(IOtype,varType,"|",nline)
            #Finally, replace the code
            endOfFun = nline.index("Blockly.Blocks.Utilities.INPUT" if IOtype=="input" else "Blockly.Blocks.Utilities.OUTPUT") + (31 if IOtype=="input" else 32)
            nline = nline.replace(nline[nline.index(YailTypeToBlocklyTypeStr):endOfFun],YailTypeToBlocklyTypeMap[varType][IOtype])
        
        #Check for Blockly.FieldDropdown
        if "new Blockly.FieldDropdown(this.OPERATORS)" in nline:
            operators = re.findall(".OPERATORS = function \(\) \{[^}]*\}",defFileText)[0]
            nline = nline.replace("new Blockly.FieldDropdown(this.OPERATORS)","new Blockly.FieldDropdown(" + operators[operators.index("return [")+7:-2].replace(";","") + ")")

        #Replace all blocks with localised string
        #NOTE No longer required. Create message.js and use Blockly's standard format instead.
        #nline = replaceText(nline)
        #if "Blockly.Msg" in nline and "goog." not in nline:
        #    if "new Blockly.FieldDropdown(" in nline: #DEBUG
        #        print(nline)
#
        #    #Identify type
        #    nline_split = nline.split(".")
        #    msgType = "Blockly.Msg." + "".join(list(filter(
        #        lambda x:x.isnumeric() or x.isalpha() or x=="_" or x=="-",
        #        nline_split[nline_split.index("Msg")+1]
        #    )))
        #    #Replace with string
        #    try:
        #        nline = nline.replace(msgType,"\"" + messages[msgType] + "\"")
        #    except KeyError:
        #        msgType = "Blockly.Msg." + "LANG_" + "".join(list(filter(
        #            lambda x:x.isnumeric() or x.isalpha() or x=="_" or x=="-",
        #            nline_split[nline_split.index("Msg")+1]
        #        )))
        #        nline = nline.replace(msgType,"\"" + messages[msgType] + "\"")
        #    #if "LANG_" in msgType:
        #    #    print(msgType)

        #Replace color pallet
        if "_CATEGORY_HUE" in nline:
            nline = nline.replace("Blockly.CONTROL_CATEGORY_HUE","'#B18E35'")
            nline = nline.replace("Blockly.LOGIC_CATEGORY_HUE","'#77AB41'")
            nline = nline.replace("Blockly.MATH_CATEGORY_HUE","'#3F71B5'")
            nline = nline.replace("Blockly.TEXT_CATEGORY_HUE","'#B32D5E'")
            nline = nline.replace("Blockly.LIST_CATEGORY_HUE","'#49A6D4'")
            nline = nline.replace("Blockly.COLOR_CATEGORY_HUE","'#7D7D7D'")
            nline = nline.replace("Blockly.DICTIONARY_CATEGORY_HUE","'#2D1799'")
        
        
        nJsFile += nline + "\n"
    nFile = open("new_block/" + fileName,"w")
    print("---Writing",fileName+"---")
    nFile.write(nJsFile)
    nFile.close()
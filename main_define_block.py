from os import listdir
import json

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

#Read file list
orginalBlockFilesLis = listdir("blocks")

#Read message
msgFile = open("messages.json","r")
messages = json.loads(msgFile.read())
#print(messages['Blockly.Msg.CONTROLS_IF_MSG_ELSE'])

#Loop through files
for fileName in orginalBlockFilesLis:
    if ".js" not in fileName:
        continue
    print("---Opening",fileName+"---")
    defFile = open("blocks/"+fileName,"r")
    defFileText = defFile.read()

    nJsFile = ""

    #Loop through lines in the file
    for line in defFileText.split("\n"):
        nline = line
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
        #Replace all blocks with localised string
        if "Blockly.Msg" in nline and "goog." not in nline:
            #Identify type
            nline_split = nline.split(".")
            msgType = "Blockly.Msg." + "".join(list(filter(
                lambda x:x.isnumeric() or x.isalpha() or x=="_" or x=="-",
                nline_split[nline_split.index("Msg")+1]
            )))
            #Replace with string
            try:
                nline = nline.replace(msgType,"\"" + messages[msgType] + "\"")
            except KeyError:
                msgType = "Blockly.Msg." + "LANG_" + "".join(list(filter(
                    lambda x:x.isnumeric() or x.isalpha() or x=="_" or x=="-",
                    nline_split[nline_split.index("Msg")+1]
                )))
            #if "LANG_" in msgType:
            #    print(msgType)
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
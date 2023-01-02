import re
from os import listdir
import json

# Get a list of variable functions in a js file.

# Map function for branket
def mapBranket(x):
    if x=="{":
        return "}"
    elif x=="[":
        return "]"
    elif x=="(":
        return ")"
    else:
        return ""

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

    # Get variables in the file
    varList = re.findall(r"Blockly\.Blocks\.[a-zA-Z]+_[a-zA-Z]+\.[A-Za-z0-9]+ = function \(\)",defFileText)
    for i_str in varList:
        valPossibleArea = defFileText[defFileText.index(i_str) + len(i_str):]
        returnTxtPos = valPossibleArea.index("return")
        charCount = 0
        branketFound = False
        while charCount<=10 and not branketFound:
            charCount += 1
            branketFound = valPossibleArea[returnTxtPos+charCount]=="[" or valPossibleArea[returnTxtPos+charCount]=="{" or valPossibleArea[returnTxtPos+charCount]=="("
            #print(charCount,valPossibleArea[returnTxtPos+charCount])
        if not branketFound:
            print("No Branket")
            continue
        branketType = "".join(list(map(mapBranket,valPossibleArea[returnTxtPos+charCount])))
        print(branketType)
        charCount_ = charCount+1
        branketCount = 1
        try:
            while valPossibleArea[returnTxtPos+charCount_]!=branketType:
                if valPossibleArea[returnTxtPos+charCount_] == valPossibleArea[returnTxtPos+charCount]:
                    branketCount += 1
                elif valPossibleArea[returnTxtPos+charCount_]==branketType:
                    branketCount -=1
                if branketCount <0:
                    break
                #print(valPossibleArea[returnTxtPos+charCount_+1],branketCount,valPossibleArea[returnTxtPos+charCount_+1]!=branketType)
                charCount_ += 1
        except IndexError:
            print("Out of bound")
            continue

        if branketCount==1:
            charCount_ += 1
            print("RES:",valPossibleArea[charCount+5:charCount_],"\n}","Char At:",charCount,charCount_)
        

        print("-------------")


        ##TODO Output the text into a js file.
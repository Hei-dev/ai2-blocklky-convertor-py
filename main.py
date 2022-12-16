import xml.dom.minidom as xmldom
from os import listdir

newToolbox = []
xmlToolbox = xmldom.parse("toolbox.xml")
xmlToolblocks = xmlToolbox.getElementsByTagName("block")
for xmlToolblock in xmlToolblocks:
    newToolbox.append(xmlToolblock.getAttribute("type").replace("colour","color"))
    

print("============")

convertedBlocks = {}
TODO = []

similarBlocks = []

for bkyfilename in listdir("AI2"):
    if ".xml" in bkyfilename:
        continue

    print("Parsing",bkyfilename)

    xml = xmldom.parse("AI2/" + bkyfilename)
    
    xmlblocks = xml.getElementsByTagName("block")
    for xmlblock in xmlblocks:
        block_type = xmlblock.getAttribute("type")
        if block_type in convertedBlocks.keys():
            continue
        block_type_arr = xmlblock.getAttribute("type").split("_")
        for newBlk in newToolbox:
            for i_str in block_type_arr:
                if i_str in newBlk:
                    similarBlocks.append(newBlk)
                    break
        print("---------------------------")
        
        print("Similar blocks with", block_type)
        for i in range(len(similarBlocks)):
            print(i,":",similarBlocks[i])
        print("Enter - if no suitable block is found and creating new block is desirable.")
        pos = input("Select number: ")
        if pos!="-":
            try:
                convertedBlocks[block_type] = similarBlocks[int(pos)]
            except:
                TODO.append(block_type)
        else:
            TODO.append(block_type)
        similarBlocks = []
    
code = ""

for keys in convertedBlocks.keys():
    if keys!=convertedBlocks[keys]:
        code += "lstr.replaceAll('" + keys +"', '" + convertedBlocks[keys] + "');"

code += "//TODO Make definition of the following blocks: \n" + str(TODO)

finalCodeFile = open("ConvertorCode.js","w")
finalCodeFile.write(code)
finalCodeFile.close()

print("Code:",code)

print("Finished")
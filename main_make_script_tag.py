import os

#Program to automatically generate script HTML tags

scriptCode = ""
for fileName in os.listdir("new_block"):
    scriptCode += "<script src=\"new_block/" + fileName + "\"></script>\n"
print(scriptCode)
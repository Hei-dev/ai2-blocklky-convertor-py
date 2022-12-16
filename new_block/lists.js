// -*- mode: java; c-basic-offset: 2; -*-
// Copyright 2013-2014 MIT, All rights reserved
// Released under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
/**
 * @license
 * @fileoverview Lists blocks for Blockly, modified for MIT App Inventor.
 * @author mckinney@mit.edu (Andrew F. McKinney)
 */

'use strict';

//goog.provide('Blockly.Blocks.lists');

//goog.require('Blockly.Blocks.Utilities');

Blockly.Blocks['lists_create_with'] = {
  // Create a list with any number of elements of any type.
  category: 'Lists',
  helpUrl: "/reference/blocks/lists.html#makealist",
  init: function() {
    this.setColour('#49A6D4');
    this.appendValueInput('ADD0')
        .appendField("make a list");
    this.appendValueInput('ADD1');
    this.setOutput(true, ['Array', 'String']);
    this.setMutator(new Blockly.Mutator(['lists_create_with_item']));
    this.setTooltip("Create a list with any number of items.");
    this.itemCount_ = 2;
    this.emptyInputName = 'EMPTY';
    this.repeatingInputName = 'ADD';
  },
  mutationToDom: Blockly.mutationToDom,
  domToMutation: Blockly.domToMutation,
  decompose: function(workspace){
    return Blockly.decompose(workspace,'lists_create_with_item',this);
  },
  compose: Blockly.compose,
  saveConnections: Blockly.saveConnections,
  addEmptyInput: function(){
    this.appendDummyInput(this.emptyInputName)
      .appendField("create empty list");
  },
  addInput: function(inputNum){
    var input = this.appendValueInput(this.repeatingInputName + inputNum);
    if(inputNum === 0){
      input.appendField("make a list");
    }
    return input;
  },
  updateContainerBlock: function(containerBlock) {
    containerBlock.setFieldValue(Blockly.Msg.LANG_LISTS_CREATE_WITH_CONTAINER_TITLE_ADD,"CONTAINER_TEXT");
  },
  // create type blocks for both make a list (two items) and create empty list
  typeblock: [
      { translatedName: "make a list",
        mutatorAttributes: { items: 2 } },
      { translatedName: "create empty list",
        mutatorAttributes: { items: 0 } }]
};

Blockly.Blocks['lists_create_with_item'] = {
  // Add items.
  init: function() {
    this.setColour('#49A6D4');
    this.appendDummyInput()
        .appendField("item");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Add an item to the list.");
    this.contextMenu = false;
  }
};


Blockly.Blocks['lists_add_items'] = {
  // Create a list with any number of elements of any type.
  category: 'Lists',
  helpUrl: "/reference/blocks/lists.html#additems",
  init: function() {
    this.setColour('#49A6D4');
    this.appendValueInput('LIST')
      .setCheck(['Array'])
      .appendField("add items to list")
      .appendField(" list");
    this.appendValueInput('ITEM0')
      .appendField("item")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Adds items to the end of a list.");
    this.setMutator(new Blockly.Mutator(['lists_add_items_item']));
    this.itemCount_ = 1;
    this.emptyInputName = null;
    this.repeatingInputName = 'ITEM';
  },
  mutationToDom: Blockly.mutationToDom,
  domToMutation: Blockly.domToMutation,
  decompose: function(workspace){
    return Blockly.decompose(workspace,'lists_add_items_item',this);
  },
  compose: Blockly.compose,
  saveConnections: Blockly.saveConnections,
  addEmptyInput: function(){},
  addInput: function(inputNum){
    var input = this.appendValueInput(this.repeatingInputName + inputNum);
    input.appendField('item').setAlign(Blockly.ALIGN_RIGHT);
    return input;
  },
  updateContainerBlock: function(containerBlock) {
    containerBlock.setFieldValue(Blockly.Msg.LANG_LISTS_ADD_ITEMS_CONTAINER_TITLE_ADD,"CONTAINER_TEXT");
    containerBlock.setTooltip("Add, remove, or reorder sections to reconfigure this list block.");
  },
  typeblock: [{ translatedName: "add items to list" }]
};

Blockly.Blocks['lists_add_items_item'] = {
  // Add items.
  init: function() {
    this.setColour('#49A6D4');
    this.appendDummyInput()
        .appendField("item");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Add an item to the list.");
    this.contextMenu = false;
  }
};

Blockly.Blocks['lists_is_in'] = {
  // Is in list?.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#inlist",
  init : function() {
    this.setColour('#49A6D4');
    var checkTypeList = ['Array'];
    var checkTypeAny = null;
    this.interpolateMsg("is in list? thing %1 list %2",
            ['ITEM', checkTypeAny, Blockly.ALIGN_RIGHT],
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setOutput(true, ['Boolean', 'String']);
    this.setTooltip("Returns true if the the thing is an item in the list, and false if not.");
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: "is in list?" }]
};


Blockly.Blocks['lists_length'] = {
  // Length of list.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#lengthoflist",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('LIST')
      .setCheck(['Array'])
      .appendField("length of list")
      .appendField("list");
    this.setTooltip("Counts the number of items in a list.");
  },
  typeblock: [{ translatedName: "length of list" }]
};

Blockly.Blocks['lists_is_empty'] = {
  // Is the list empty?.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#islistempty",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, ['Boolean', 'String']);
    this.appendValueInput('LIST')
      .setCheck(['Array'])
      .appendField("is list empty?")
      .appendField("list");
    this.setTooltip("Returns true if the list is empty.");
  },
  typeblock: [{ translatedName: "is list empty?" }]
};

Blockly.Blocks['lists_pick_random_item'] = {
  // Length of list.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#pickrandomitem",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, null);
    this.appendValueInput('LIST')
      .setCheck(['Array'])
      .appendField("pick a random item")
      .appendField("list");
    this.setTooltip("Pick an item at random from the list.");
  },
  typeblock: [{ translatedName: "pick a random item" }]
};

Blockly.Blocks['lists_position_in'] = {
  // Postion of item in list.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#indexinlist",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, ['Number', 'String', 'Key']);
    var checkTypeList = ['Array'];
    var checkTypeAny = null;
    this.interpolateMsg("index in list  thing %1 list %2",
            ['ITEM', checkTypeAny, Blockly.ALIGN_RIGHT],
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setTooltip("Find the position of the thing in the list. If it's not in the list, return 0.");
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: "index in list" }]
};


Blockly.Blocks['lists_select_item'] = {
  // Select from list an item.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#selectlistitem",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, null);
    var checkTypeList = ['Array'];
    var checkTypeNumber = ['Number'];
    this.interpolateMsg("select list item  list %1 index %2",
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['NUM', checkTypeNumber, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setTooltip("Returns the item at position index in the list.");
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: "select list item" }]
};

Blockly.Blocks['lists_insert_item'] = {
  // Insert Item in list.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#insert",
  init : function() {
    this.setColour('#49A6D4');
    var checkTypeList = ['Array'];
    var checkTypeNumber = ['Number'];
    var checkTypeAny = null;
    this.interpolateMsg("insert list item  list %1 index %2 item %3",
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['INDEX', checkTypeNumber, Blockly.ALIGN_RIGHT],
            ['ITEM', checkTypeAny, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Insert an item into a list at the specified position.");
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: "insert list item" }]
};

Blockly.Blocks['lists_replace_item'] = {
  // Replace Item in list.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#replace",
  init : function() {
    this.setColour('#49A6D4');
    var checkTypeList = ['Array'];
    var checkTypeNumber = ['Number'];
    var checkTypeAny = null;
    this.interpolateMsg("replace list item  list %1 index %2 replacement %3",
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['NUM', checkTypeNumber, Blockly.ALIGN_RIGHT],
            ['ITEM', checkTypeAny, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Replaces the nth item in a list.");
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: "replace list item" }]
};

Blockly.Blocks['lists_remove_item'] = {
  // Remove Item in list.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#removeitem",
  init : function() {
    this.setColour('#49A6D4');
    var checkTypeList = ['Array'];
    var checkTypeNumber = ['Number'];
    this.interpolateMsg("remove list item  list %1 index %2",
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['INDEX', checkTypeNumber, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Removes the item at the specified position from the list.");
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: "remove list item" }]
};

Blockly.Blocks['lists_append_list'] = {
  // Append to list.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#append",
  init : function() {
    this.setColour('#49A6D4');
    var checkTypeList = ['Array'];
    this.interpolateMsg("append to list  list1 %1 list2 %2",
            ['LIST0', checkTypeList, Blockly.ALIGN_RIGHT],
            ['LIST1', checkTypeList, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Appends all the items in list2 onto the end of list1. After the append, list1 will include these additional elements, but list2 will be unchanged.");
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: "append to list" }]
};


Blockly.Blocks['lists_copy'] = {
  // Make a copy of list.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#copy",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, ['Array', 'String']);
    this.appendValueInput('LIST')
      .setCheck(['Array'])
      .appendField("copy list")
      .appendField("list");
    this.setTooltip("Makes a copy of a list, including copying all sublists");
  },
  typeblock: [{ translatedName: "copy list" }]
};

Blockly.Blocks['lists_is_list'] = {
  // Is a list?
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#isalist",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, ['Boolean', 'String']);
    this.appendValueInput('ITEM')
      .appendField("is a list?")
      .appendField("thing");
    this.setTooltip("Tests if something is a list.");
  },
  typeblock: [{ translatedName: "is a list?" }]
};

Blockly.Blocks['lists_reverse'] = {
  // Reverse the list.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#reverse",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, ['Array', 'String']);
    this.appendValueInput('LIST')
      .setCheck(['Array'])
      .appendField("reverse list")
      .appendField("list");
    this.setTooltip("Reverses the order of input list and returns it as a new list.");
  },
  typeblock: [{ translatedName: "reverse list" }]
}

Blockly.Blocks['lists_to_csv_row'] = {
  // Make a csv row from list.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#listtocsvrow",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('LIST')
      .setCheck(['Array'])
      .appendField("list to csv row")
      .appendField("list");
    this.setTooltip("Interprets the list as a row of a table and returns a CSV (comma-separated value) text representing the row. Each item in the row list is considered to be a field, and is quoted with double-quotes in the resulting CSV text. Items are separated by commas. The returned row text does not have a line separator at the end.");
  },
  typeblock: [{ translatedName: "list to csv row" }]
};

Blockly.Blocks['lists_to_csv_table'] = {
  // Make a csv table from list.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#listtocsvtable",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('LIST')
      .setCheck(['Array'])
      .appendField("list to csv table")
      .appendField("list");
    this.setTooltip("Interprets the list as a table in row-major format and returns a CSV (comma-separated value) text representing the table. Each item in the list should itself be a list representing a row of the CSV table. Each item in the row list is considered to be a field, and is quoted with double-quotes in the resulting CSV text. In the returned text, items in rows are separated by commas and rows are separated by CRLF (\r\
).");
  },
  typeblock: [{ translatedName: "list to csv table" }]
};

Blockly.Blocks['lists_from_csv_row'] = {
  // Make list from csv row.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#listfromcsvrow",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, ['Array', 'String']);
    this.appendValueInput('TEXT')
      .setCheck(['String'])
      .appendField("list from csv row")
      .appendField("text");
    this.setTooltip("Parses a text as a CSV (comma-separated value) formatted row to produce a list of fields. It is an error for the row text to contain unescaped newlines inside fields (effectively, multiple lines). It is okay for the row text to end in a single newline or CRLF.");
  },
  typeblock: [{ translatedName: "list from csv row" }]
};

Blockly.Blocks['lists_from_csv_table'] = {
  // Make list from csv table.
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#listfromcsvtable",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, ['Array', 'String']);
    this.appendValueInput('TEXT')
      .setCheck(['String'])
      .appendField("list from csv table")
      .appendField("text");
    this.setTooltip("Parses a text as a CSV (comma-separated value) formatted table to produce a list of rows, each of which is a list of fields. Rows can be separated by newlines (\
) or CRLF (\r\
).");
  },
  typeblock: [{ translatedName: "list from csv table" }]
};

Blockly.Blocks['lists_lookup_in_pairs'] = {
  // Look up in a list of pairs (key, value).
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#lookuppairs",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, null);
    var checkTypeList = ['Array'];
    var checkTypeNumber = ['Number'];
    var checkTypeAny = null;
    this.interpolateMsg("look up in pairs  key %1 pairs %2 notFound %3",
            ['KEY', checkTypeAny, Blockly.ALIGN_RIGHT],
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['NOTFOUND', checkTypeAny, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setTooltip("Returns the value associated with the key in the list of pairs");
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: "look up in pairs" }]
};

Blockly.Blocks['lists_join_with_separator'] = {
  // Joins list items into a single string separated by specified separator
  category : 'Lists',
  helpUrl : "/reference/blocks/lists.html#joinwithseparator",
  init : function() {
    this.setColour('#49A6D4');
    this.setOutput(true, ['Number', 'String', 'Key']);
    var checkTypeList = ['Array'];
    var checkTypeText = ['String'];
    this.interpolateMsg("join items using separator %1 list %2",
            ['SEPARATOR', checkTypeText, Blockly.ALIGN_RIGHT],
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setTooltip("Returns text with list elements joined with separator");
    this.setInputsInline(false);
  },
  typeblock: [{ translatedName: "join with separator" }]
};


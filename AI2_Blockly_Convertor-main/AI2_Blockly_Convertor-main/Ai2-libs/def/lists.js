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

Blockly.LIST_CATEGORY_HUE = '#49A6D4'


Blockly.Blocks['lists_create_with_item'] = {
  // Add items.
  init: function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendDummyInput()
        .appendField("LISTS_CREATE_WITH_ITEM_TITLE");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip();
    this.contextMenu = false;
  }
};


Blockly.Blocks['lists_add_items'] = {
  // Create a list with any number of elements of any type.
  category: 'Lists',
  
  init: function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendValueInput('LIST')
      //.setCheck(['Array'])
      //Line above checks for the input type according to the iist. Not working at the moment. (Source: blocks/utilities.js)
      .appendField("Add item to")
      .appendField("List");
    this.appendValueInput('ITEM0')
      .appendField("with item")
      .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip();
    this.setMutator(new Blockly.Mutator(['lists_add_items_item']));
    this.itemCount_ = 1;
    this.emptyInputName = null;
    this.repeatingInputName = 'ITEM';
  },
  //Mutations (Dynamic numbers of inputs) Not working atm
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
    containerBlock.setFieldValue(LISTS_ADD_ITEMS_CONTAINER_TITLE_ADD,"CONTAINER_TEXT");
    containerBlock.setTooltip(LISTS_ADD_ITEMS_CONTAINER_TOOLTIP);
  },
  //typeblock: [{ translatedName: LISTS_ADD_ITEMS_TITLE_ADD }]
};

Blockly.Blocks['lists_add_items_item'] = {
  // Add items.
  init: function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.appendDummyInput()
        .appendField("LANG_LISTS_ADD_ITEM_TITLE");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip();
    this.contextMenu = false;
  }
};

/* DEFINITION REWRITED DUE TO EXTRA CODE
Blockly.Blocks['lists_is_in'] = {
  // Is in list?.
  category : 'Lists',
  //helpUrl : LISTS_IS_IN_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    var checkTypeList = "Array";
    var checkTypeAny = null;
    //this.appendField("LISTS_IS_IN_INPUT")
    this.interpolateMsg(,
            ['ITEM', checkTypeAny, Blockly.ALIGN_RIGHT],
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setOutput(true, ["Boolean","String"]);
    //this.setTooltip(LISTS_IS_IN_TOOLTIP);
    this.setInputsInline(false);
  },
  //typeblock: [{ translatedName: LISTS_IS_IN_TITLE_IS_IN }]
};*/
Blockly.Blocks['lists_is_in'] = {
    init: function() {
      this.appendValueInput("ITEM")
          .setCheck(null)
          .appendField("is in list item");
      this.appendValueInput("LIST")
          .setCheck("Array")
          .appendField("list");
      this.setOutput(true, ["Boolean", "String"]);
      this.setColour(195);
    //this.setTooltip("");
    this.setHelpUrl("");
    }
};
Blockly.Blocks['lists_is_empty'] = {
  // Is the list empty?.
  category : 'Lists',

  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, ['Boolean', 'String']);
    this.appendValueInput('LIST')
      .setCheck(['Array', 'String'])
      .appendField("LISTS_TITLE_IS_EMPTY")
      .appendField("LISTS_INPUT_LIST");
    //this.setTooltip();
  },
  //typeblock: [{ translatedName: LISTS_TITLE_IS_EMPTY }]
};

Blockly.Blocks['lists_pick_random_item'] = {
  // Length of list.
  category : 'Lists',

  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, null);
    this.appendValueInput('LIST')
      .setCheck(['Array', 'String'])
      .appendField("LISTS_PICK_RANDOM_TITLE_PICK_RANDOM")
      .appendField("LISTS_PICK_RANDOM_ITEM_INPUT_LIST");
    //this.setTooltip(LISTS_PICK_RANDOM_TOOLTIP);
  },
  //typeblock: [{ translatedName: LISTS_PICK_RANDOM_TITLE_PICK_RANDOM }]
};

/* TODO NEEDS REWRITE
Blockly.Blocks['lists_position_in'] = {
  // Postion of item in list.
  category : 'Lists',
  //helpUrl : LISTS_POSITION_IN_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, ['Number', 'String', 'Key']);
    var checkTypeList = "Array";
    var checkTypeAny = null;
    this.interpolateMsg(LISTS_POSITION_IN_INPUT,
            ['ITEM', checkTypeAny, Blockly.ALIGN_RIGHT],
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    //this.setTooltip(LISTS_POSITION_IN_TOOLTIP);
    this.setInputsInline(false);
  },
  //typeblock: [{ translatedName: LISTS_POSITION_IN_TITLE_POSITION }]
};*/
Blockly.Blocks['lists_position_in'] = {
  init: function() {
    this.appendValueInput("ITEM")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("index of item");
    this.appendValueInput("LIST")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("in list");
    this.setOutput(true, ["Number", "String"]);
    this.setColour(195);
    //this.setTooltip("");
    this.setHelpUrl("");
  }
};

/* TODO CONVERT TO list_indexOf*/
Blockly.Blocks['lists_select_item'] = {
  // Select from list an item.
  category : 'Lists',

  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, null);
    var checkTypeList = ['Array'];
    var checkTypeNumber = ['Number'];
    this.appendValueInput("NUM")
        .setCheck(checkTypeNumber)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("get item at index");
    this.appendValueInput("LIST")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("in list");
    //this.setTooltip();
    this.setInputsInline(false);
  },
  //typeblock: [{ translatedName: LISTS_SELECT_ITEM_TITLE_SELECT }]
};


/* TODO NEEDS REWRITE
Blockly.Blocks['lists_insert_item'] = {
  // Insert Item in list.
  category : 'Lists',
  //helpUrl : LISTS_INSERT_ITEM_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    var checkTypeList = ['Array'];
    var checkTypeNumber = ['Number'];
    var checkTypeAny = Blockly.Blocks.Utilities.YailTypeToBlocklyType("any",Blockly.Blocks.Utilities.INPUT);
    this.interpolateMsg(LISTS_INSERT_INPUT,
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['INDEX', checkTypeNumber, Blockly.ALIGN_RIGHT],
            ['ITEM', checkTypeAny, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip(LISTS_INSERT_TOOLTIP);
    this.setInputsInline(false);
  },
  //typeblock: [{ translatedName: LISTS_INSERT_TITLE_INSERT_LIST }]
};*/

Blockly.Blocks['lists_insert_item'] = {
  init: function() {
    this.appendValueInput("LIST")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("In List");
    this.appendValueInput("INDEX")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Insert item at");
    this.appendValueInput("ITEM")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("With value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
 //this.setTooltip("");
 this.setHelpUrl("");
  }
};

/* TODO NEEDS REWRITE
Blockly.Blocks['lists_replace_item'] = {
  // Replace Item in list.
  category : 'Lists',
  //helpUrl : LISTS_REPLACE_ITEM_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    var checkTypeList = ['Array'];
    var checkTypeNumber = ['Number'];
    var checkTypeAny = Blockly.Blocks.Utilities.YailTypeToBlocklyType("any",Blockly.Blocks.Utilities.INPUT);
    this.interpolateMsg(LISTS_REPLACE_ITEM_INPUT,
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['NUM', checkTypeNumber, Blockly.ALIGN_RIGHT],
            ['ITEM', checkTypeAny, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip(LISTS_REPLACE_ITEM_TOOLTIP);
    this.setInputsInline(false);
  },
  //typeblock: [{ translatedName: LISTS_REPLACE_ITEM_TITLE_REPLACE }]
};*/
Blockly.Blocks['lists_replace_item'] = {
  init: function() {
    this.appendValueInput("LIST")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("In List");
    this.appendValueInput("NUM")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("set item at");
    this.appendValueInput("ITEM")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("to value");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
 //this.setTooltip("");
 this.setHelpUrl("");
  }
};

/* TODO NEEDS REWRITE
Blockly.Blocks['lists_remove_item'] = {
  // Remove Item in list.
  category : 'Lists',
  //helpUrl : LISTS_REMOVE_ITEM_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    var checkTypeList = ['Array'];
    var checkTypeNumber = ['Number'];
    this.interpolateMsg(LISTS_REMOVE_ITEM_INPUT,
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['INDEX', checkTypeNumber, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip(LISTS_REMOVE_ITEM_TOOLTIP);
    this.setInputsInline(false);
  },
  //typeblock: [{ translatedName: LISTS_REMOVE_ITEM_TITLE_REMOVE }]
};*/
Blockly.Blocks['lists_remove_item'] = {
  init: function() {
    this.appendValueInput("LIST")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("In List");
    this.appendValueInput("NUM")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("remove item at");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
 //this.setTooltip("");
 this.setHelpUrl("");
  }
};

/* TODO NEEDS REWRITE
Blockly.Blocks['lists_append_list'] = {
  // Append to list.
  category : 'Lists',
  //helpUrl : LISTS_APPEND_LIST_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    var checkTypeList = ['Array'];
    this.interpolateMsg(LISTS_APPEND_LIST_INPUT,
            ['LIST0', checkTypeList, Blockly.ALIGN_RIGHT],
            ['LIST1', checkTypeList, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip(LISTS_APPEND_LIST_TOOLTIP);
    this.setInputsInline(false);
  },
  //typeblock: [{ translatedName: LISTS_APPEND_LIST_TITLE_APPEND }]
};
*/
Blockly.Blocks['lists_append_list'] = {
  init: function() {
    this.appendValueInput("LIST0")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Join 2 lists  list1");
    this.appendValueInput("LIST1")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("list2");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
 //this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['lists_copy'] = {
  // Make a copy of list.
  category : 'Lists',

  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, ['Array', 'String']);
    this.appendValueInput('LIST')
      .setCheck("Array")
      .appendField("LISTS_COPY_TITLE_COPY")
      .appendField("LISTS_COPY_INPUT_LIST");
    //this.setTooltip();
  },
  //typeblock: [{ translatedName: LISTS_COPY_TITLE_COPY }]
};

Blockly.Blocks['lists_is_list'] = {
  // Is a list?
  category : 'Lists',

  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, ['Boolean', 'String']);
    this.appendValueInput('ITEM')
      .appendField("LISTS_IS_LIST_TITLE_IS_LIST")
      .appendField("LISTS_IS_LIST_INPUT_THING");
    //this.setTooltip(LISTS_IS_LIST_TOOLTIP);
  },
  //typeblock: [{ translatedName: LISTS_IS_LIST_TITLE_IS_LIST }]
};

Blockly.Blocks['lists_reverse'] = {
  // Reverse the list.
  category : 'Lists',
  //helpUrl : LISTS_REVERSE_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true,["Array","String"]);
    this.appendValueInput('LIST')
      .setCheck("Array")
      .appendField("LISTS_REVERSE_TITLE_REVERSE")
      .appendField("LISTS_REVERSE_INPUT_LIST");
    //this.setTooltip();
  },
  //typeblock: [{ translatedName: LISTS_REVERSE_TITLE_REVERSE }]
}

Blockly.Blocks['lists_to_csv_row'] = {
  // Make a csv row from list.
  category : 'Lists',
  //helpUrl : LISTS_TO_CSV_ROW_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, null);
    this.appendValueInput('LIST')
      .setCheck("Array")
      .appendField("LISTS_TO_CSV_ROW_TITLE_TO_CSV")
      .appendField("LISTS_TO_CSV_ROW_INPUT_LIST");
    //this.setTooltip();
  },
  //typeblock: [{ translatedName: LISTS_TO_CSV_ROW_TITLE_TO_CSV }]
};

Blockly.Blocks['lists_to_csv_table'] = {
  // Make a csv table from list.
  category : 'Lists',
  //helpUrl : LISTS_TO_CSV_TABLE_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, null);
    this.appendValueInput('LIST')
      .setCheck("Array")
      .appendField("LISTS_TO_CSV_TABLE_TITLE_TO_CSV")
      .appendField("LISTS_TO_CSV_TABLE_INPUT_LIST");
    //this.setTooltip();
  },
  //typeblock: [{ translatedName: LISTS_TO_CSV_TABLE_TITLE_TO_CSV }]
};

Blockly.Blocks['lists_from_csv_row'] = {
  // Make list from csv row.
  category : 'Lists',
  //helpUrl : LISTS_FROM_CSV_ROW_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, ["Array","String"]);
    this.appendValueInput('TEXT')
      .setCheck(null)
      .appendField("LISTS_FROM_CSV_ROW_TITLE_FROM_CSV")
      .appendField("LISTS_FROM_CSV_ROW_INPUT_TEXT");
    //this.setTooltip();
  },
  //typeblock: [{ translatedName: LISTS_FROM_CSV_ROW_TITLE_FROM_CSV }]
};

Blockly.Blocks['lists_from_csv_table'] = {
  // Make list from csv table.
  category : 'Lists',
  //helpUrl : LISTS_FROM_CSV_TABLE_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, ["Array","String"]);
    this.appendValueInput('TEXT')
      .setCheck(null)
      .appendField("LISTS_FROM_CSV_TABLE_TITLE_FROM_CSV")
      .appendField("LISTS_FROM_CSV_TABLE_INPUT_TEXT");
    //this.setTooltip();
  },
  //typeblock: [{ translatedName: LISTS_FROM_CSV_TABLE_TITLE_FROM_CSV }]
};

/* TODO NEEDS REWRITE
Blockly.Blocks['lists_lookup_in_pairs'] = {
  // Look up in a list of pairs (key, value).
  //THIS RREQUIRES SPECIAL CODING.
  category : 'Lists',
  //helpUrl : LISTS_LOOKUP_IN_PAIRS_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("any",Blockly.Blocks.Utilities.OUTPUT));
    var checkTypeList = ['Array'];
    var checkTypeNumber = ['Number'];
    var checkTypeAny = Blockly.Blocks.Utilities.YailTypeToBlocklyType("any",Blockly.Blocks.Utilities.INPUT);
    this.interpolateMsg(LISTS_LOOKUP_IN_PAIRS_INPUT,
            ['KEY', checkTypeAny, Blockly.ALIGN_RIGHT],
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            ['NOTFOUND', checkTypeAny, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    //this.setTooltip(LISTS_LOOKUP_IN_PAIRS_TOOLTIP);
    this.setInputsInline(false);
  },
  //typeblock: [{ translatedName: LISTS_LOOKUP_IN_PAIRS_TITLE_LOOKUP_IN_PAIRS }]
};
*/
Blockly.Blocks['lists_lookup_in_pairs'] = {
  init: function() {
    this.appendValueInput("KEY")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Use list as Dict and search for key");
    this.appendValueInput("LIST")
        .setCheck("Array")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("in list");
    this.appendValueInput("NOTFOUND")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Value when there are no maches");
    this.setOutput(true, null);
    this.setColour(195);
 //this.setTooltip("");
 this.setHelpUrl("");
  }
};

/*
Blockly.Blocks['lists_join_with_separator'] = {
  // Joins list items into a single string separated by specified separator
  category : 'Lists',
  //helpUrl : LISTS_JOIN_WITH_SEPARATOR_HELPURL,
  init : function() {
    this.setColour(Blockly.LIST_CATEGORY_HUE);
    this.setOutput(true, Blockly.Blocks.Utilities.YailTypeToBlocklyType("text",Blockly.Blocks.Utilities.OUTPUT));
    var checkTypeList = ['Array'];
    var checkTypeText = Blockly.Blocks.Utilities.YailTypeToBlocklyType("text",Blockly.Blocks.Utilities.INPUT);
    this.interpolateMsg(LISTS_JOIN_WITH_SEPARATOR_INPUT,
            ['SEPARATOR', checkTypeText, Blockly.ALIGN_RIGHT],
            ['LIST', checkTypeList, Blockly.ALIGN_RIGHT],
            Blockly.ALIGN_RIGHT);
    //this.setTooltip(LISTS_JOIN_WITH_SEPARATOR_TOOLTIP);
    this.setInputsInline(false);
  },
  //typeblock: [{ translatedName: LISTS_JOIN_WITH_SEPARATOR_TITLE }]
};*/
Blockly.Blocks['lists_join_with_separator'] = {
  init: function() {
    this.appendValueInput("SEPERATOR")
        .setCheck(null)
        .appendField("List to String with seperator");
    this.appendValueInput("LIST")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("for list");
    this.setOutput(true, null);
    this.setColour(195);
 //this.setTooltip("");
 this.setHelpUrl("");
  }
};
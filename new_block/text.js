// -*- mode: java; c-basic-offset: 2; -*-
// Copyright 2013-2017 MIT, All rights reserved
// Released under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
/**
 * @license
 * @fileoverview Text blocks for Blockly, modified for MIT App Inventor.
 * @author mckinney@mit.edu (Andrew F. McKinney)
 */

'use strict';

//goog.provide('Blockly.Blocks.text');

//goog.require('Blockly.Blocks.Utilities');

Blockly.Blocks['text'] = {
  // Text value.
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#string",
  init: function () {
    var textInput = new Blockly.FieldTextInput('');
    textInput.onFinishEditing_ = Blockly.Blocks.text
        .bumpBlockOnFinishEdit.bind(this);

    this.setColour('#B32D5E');
    this.appendDummyInput()
        .appendField("“")
        .appendField(textInput, 'TEXT')
        .appendField("”");
    this.setOutput(true, [Blockly.Blocks.text.connectionCheck]);
    this.setTooltip("A text string.");
  },
  errors: [{name:"checkInvalidNumber"}],
  typeblock: [{translatedName: "Text"}]
};

Blockly.Blocks.text.connectionCheck = function (myConnection, otherConnection, opt_value) {
  var otherTypeArray = otherConnection.check_;
  if (!otherTypeArray) {  // Other connection accepts everything.
    return true;
  }

  var block = myConnection.sourceBlock_;
  var shouldIgnoreError = Blockly.mainWorkspace.isLoading;
  var value = opt_value || block.getFieldValue('TEXT');

  for (var i = 0; i < otherTypeArray.length; i++) {
    if (otherTypeArray[i] == "String") {
      return true;
    } else if (otherTypeArray[i] == "Number") {
      if (shouldIgnoreError) {
        // Error may be noted by WarningHandler's checkInvalidNumber
        return true;
      } else if (Blockly.Blocks.Utilities.NUMBER_REGEX.test(value)) {
        // Value passes a floating point regex
        return !isNaN(parseFloat(value));
      }
    } else if (otherTypeArray[i] == "Key") {
      return true;
    } else if (otherTypeArray[i] == "Key") {
      return true;
    }
  }
  return false;
};

/**
 * Bumps the text block out of its connection iff it is connected to a number
 * input and it no longer contains a number.
 * @param {string} finalValue The final value typed into the text input.
 * @this Blockly.Block
 */
Blockly.Blocks.text.bumpBlockOnFinishEdit = function(finalValue) {
  var connection = this.outputConnection.targetConnection;
  if (!connection) {
    return;
  }
  // If the connections are no longer compatible.
  if (!Blockly.Blocks.text.connectionCheck(
      this.outputConnection, connection, finalValue)) {
    connection.disconnect();
    connection.sourceBlock_.bumpNeighbours_();
  }
}

Blockly.Blocks['text_join'] = {
  // Create a string made up of any number of elements of any type.
  // TODO: (Andrew) Make this handle multiple arguments.
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#join",
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('ADD0')
        .appendField("join");
    this.appendValueInput('ADD1');
    this.setTooltip("Appends all the inputs to form a single text string.\nIf there are no inputs, makes an empty text.");
    this.setMutator(new Blockly.Mutator(['text_join_item']));
    this.emptyInputName = 'EMPTY';
    this.repeatingInputName = 'ADD';
    this.itemCount_ = 2;
  },
  mutationToDom: Blockly.mutationToDom,
  domToMutation: Blockly.domToMutation,
  decompose: function (workspace) {
    return Blockly.decompose(workspace, 'text_join_item', this);
  },
  compose: Blockly.compose,
  saveConnections: Blockly.saveConnections,
  addEmptyInput: function () {
    this.appendDummyInput(this.emptyInputName)
        .appendField("join");
  },
  addInput: function (inputNum) {
    var input = this.appendValueInput(this.repeatingInputName + inputNum).setCheck(['String']);
    if (inputNum === 0) {
      input.appendField("join");
    }
    return input;
  },
  updateContainerBlock: function (containerBlock) {
    containerBlock.inputList[0].fieldRow[0].setText("join");
  },
  typeblock: [{translatedName: "join"}]

};

Blockly.Blocks['text_join_item'] = {
  // Add items.
  init: function () {
    this.setColour('#B32D5E');
    this.appendDummyInput()
        .appendField("string");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("");
    this.contextMenu = false;
  }
};

Blockly.Blocks['text_length'] = {
  // String length.
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#length",
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('VALUE')
        .setCheck(['String'])
        .appendField("length");
    this.setTooltip("Returns number of letters (including spaces)\nin the provided text.");
  },
  typeblock: [{translatedName: "length"}]
};

Blockly.Blocks['text_isEmpty'] = {
  // Is the string null?
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#isempty",
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Boolean', 'String']);
    this.appendValueInput('VALUE')
        .setCheck(['String'])
        .appendField("is empty");
    this.setTooltip("Returns true if the length of the\n' + 'text is 0, false otherwise.");
  },
  typeblock: [{translatedName: "is empty"}]
};

Blockly.Blocks['text_compare'] = {
  // Compare two texts
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#compare",
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Boolean', 'String']);
    this.appendValueInput('TEXT1')
        .setCheck(['String'])
        .appendField("compare texts");
    this.appendValueInput('TEXT2')
        .setCheck(['String'])
        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setInputsInline(true);
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.text_compare.TOOLTIPS()[mode];
    });
  },
  typeblock: [{
    translatedName: Blockly.Msg.LANG_TEXT_COMPARE_INPUT_COMPARE + Blockly.Msg.LANG_TEXT_COMPARE_LT,
    dropDown: {
      titleName: 'OP',
      value: 'LT'
    }
  }, {
    translatedName: Blockly.Msg.LANG_TEXT_COMPARE_INPUT_COMPARE + Blockly.Msg.LANG_TEXT_COMPARE_EQUAL,
    dropDown: {
      titleName: 'OP',
      value: 'EQUAL'
    }
  }, {
    translatedName: Blockly.Msg.LANG_TEXT_COMPARE_INPUT_COMPARE + Blockly.Msg.LANG_TEXT_COMPARE_NEQ,
    dropDown: {
      titleName: 'OP',
      value: 'NEQ'
    }
  }, {
    translatedName: Blockly.Msg.LANG_TEXT_COMPARE_INPUT_COMPARE + Blockly.Msg.LANG_TEXT_COMPARE_GT,
    dropDown: {
      titleName: 'OP',
      value: 'GT'
    }
  }]
};

Blockly.Blocks.text_compare.OPERATORS = function () {
  return [
    [Blockly.Msg.LANG_TEXT_COMPARE_LT, 'LT'], [Blockly.Msg.LANG_TEXT_COMPARE_EQUAL, 'EQUAL'], [Blockly.Msg.LANG_TEXT_COMPARE_NEQ, 'NEQ'], [Blockly.Msg.LANG_TEXT_COMPARE_GT, 'GT']
  ]
};

Blockly.Blocks.text_compare.TOOLTIPS = function () {
  return {
    LT: "Tests whether text1 is lexicographically less than text2.\nif one text is the prefix of the other, the shorter text is\nconsidered smaller. Uppercase characters precede lowercase characters.",
    EQUAL: "Tests whether text strings are identical, ie., have the same\ncharacters in the same order. This is different from ordinary:\nin the case where the text strings are numbers: 123 and 0123 are:\nbut not text:.",
    NEQ: "Tests whether text strings are different, ie., don't have the same\ncharacters in the same order. This is different from ordinary ≠\nin the case where the text strings are numbers: 123 and 0123 are text ≠\nbut are mathematically:.",
    GT: "Reports whether text1 is lexicographically greater than text2.\nif one text is the prefix of the other, the shorter text is considered smaller.\nUppercase characters precede lowercase characters."
  }
};

Blockly.Blocks['text_trim'] = {
  // trim string
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#trim",
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('TEXT')
        .setCheck(['String'])
        .appendField("trim");
    this.setTooltip("Returns a copy of its text string arguments with any\nleading or trailing spaces removed.");
  },
  typeblock: [{translatedName: "trim"}]
};

Blockly.Blocks['text_changeCase'] = {
  // Change capitalization.
  category: 'Text',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.text_changeCase.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('TEXT')
        .setCheck(['String'])
        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.text_changeCase.TOOLTIPS()[mode];
    });
  },
  typeblock: [{
    translatedName: "upcase",
    dropDown: {
      titleName: 'OP',
      value: 'UPCASE'
    }
  }, {
    translatedName: "downcase",
    dropDown: {
      titleName: 'OP',
      value: 'DOWNCASE'
    }
  }]
};

Blockly.Blocks.text_changeCase.OPERATORS = function () {
  return [
    [Blockly.Msg.LANG_TEXT_CHANGECASE_OPERATOR_UPPERCASE, 'UPCASE'], [Blockly.Msg.LANG_TEXT_CHANGECASE_OPERATOR_DOWNCASE, 'DOWNCASE']
  ]
};

Blockly.Blocks.text_changeCase.TOOLTIPS = function () {
  return {
    UPCASE: "Returns a copy of its text string argument converted to uppercase.",
    DOWNCASE: "Returns a copy of its text string argument converted to lowercase."
  }
};

Blockly.Blocks.text_changeCase.HELPURLS = function () {
  return {
    UPCASE: "/reference/blocks/text.html#upcase",
    DOWNCASE: "/reference/blocks/text.html#downcase"
  }
};

Blockly.Blocks['text_starts_at'] = {
  // return index of first occurrence.
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#startsat",
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Number', 'String', 'Key']);
    var checkTypeText = ['String'];
    this.interpolateMsg("starts at  text %1 piece %2",
        ['TEXT', checkTypeText, Blockly.ALIGN_RIGHT],
        ['PIECE', checkTypeText, Blockly.ALIGN_RIGHT],
        Blockly.ALIGN_RIGHT);
    this.setTooltip("Returns the starting index of the piece in the text.\nwhere index 1 denotes the beginning of the text. Returns 0 if the\npiece is not in the text.");
    this.setInputsInline(false);
  },
  typeblock: [{translatedName: "starts at"}]
};

Blockly.Blocks['text_contains'] = {
  category: 'Text',

  helpUrl: function() {
    return Blockly.Blocks.text_contains.HELPURLS()[this.getMode()];
  },

  init: function () {
    this.setColour('#B32D5E');

    var utils = Blockly.Blocks.Utilities;
    var getType = utils.YailTypeToBlocklyType;
    var dropdown = new Blockly.FieldDropdown(
        Blockly.Blocks.text_contains.OPERATORS(),
        Blockly.Blocks.text_contains.adjustToMode.bind(this));
    var text = new Blockly.FieldLabel(
        "piece");

    this.setOutput(true, getType("boolean", utils.OUTPUT));
    this.interpolateMsg(
        "%1 text %2 %3 %4",
        ['OP', dropdown],
        ['TEXT', getType('text', utils.INPUT), Blockly.ALIGN_RIGHT],
        ['PIECE_TEXT', text],
        ['PIECE', getType('text', utils.INPUT), Blockly.ALIGN_RIGHT],
        Blockly.ALIGN_RIGHT);
    this.setInputsInline(false);

    this.setTooltip(function() {
      return Blockly.Blocks.text_contains.TOOLTIPS()[this.getMode()];
    }.bind(this));
  },

  // TODO: This can be removed after the blockly update b/c validators are
  // properly triggered on load from XML.
  domToMutation: function (xmlElement) {
    var mode = xmlElement.getAttribute('mode');
    Blockly.Blocks.text_contains.adjustToMode.call(this, mode);
  },

  mutationToDom: function () {
    var container = document.createElement('mutation');
    container.setAttribute('mode', this.getMode());
    return container;
  },

  getMode: function() {
    return this.getFieldValue('OP');
  },

  typeblock: [
    {
      translatedName: "contains",
      dropDown: {
        titleName: 'OP',
        value: 'CONTAINS'
      }
    },
    {
      translatedName: "contains any",
      dropDown: {
        titleName: 'OP',
        value: 'CONTAINS_ANY'
      }
    },
    {
      translatedName: "contains all",
      dropDown: {
        titleName: 'OP',
        value: 'CONTAINS_ALL'
      }
    }
  ]
};

/**
 * Updates the block's PIECE input to reflect the current mode.
 * @param {string} mode 
 * @this {!Blockly.BlockSvg}
 */
Blockly.Blocks.text_contains.adjustToMode = function (mode) {
  var utils = Blockly.Blocks.Utilities;
  var getType = utils.YailTypeToBlocklyType;

  if (mode == 'CONTAINS') {
    this.getInput('PIECE')
        .setCheck(getType('text', utils.INPUT));
    this.setFieldValue(
        "piece",
        'PIECE_TEXT');
  } else {
    this.getInput('PIECE')
      .setCheck(getType('list', utils.INPUT));
    this.setFieldValue(
        "piece list",
        'PIECE_TEXT');
  }
};

// The order here determines the order in the dropdown
Blockly.Blocks.text_contains.OPERATORS = function() {
  return [
    [Blockly.Msg.LANG_TEXT_CONTAINS_OPERATOR_CONTAINS, 'CONTAINS'],
    [Blockly.Msg.LANG_TEXT_CONTAINS_OPERATOR_CONTAINS_ANY, 'CONTAINS_ANY'],
    [Blockly.Msg.LANG_TEXT_CONTAINS_OPERATOR_CONTAINS_ALL, 'CONTAINS_ALL'],
  ]
};

Blockly.Blocks.text_contains.TOOLTIPS = function() {
  return {
    'CONTAINS': "Tests whether the piece is contained in the text.",
    'CONTAINS_ANY': "Tests whether the any of the pieces are contained in the text.",
    'CONTAINS_ALL': "Tests whether the all of the pieces are contained in the text.",
  }
};

Blockly.Blocks.text_contains.HELPURLS = function() {
  return {
    'CONTAINS': "/reference/blocks/text.html#contains",
    'CONTAINS_ANY': "/reference/blocks/text.html#containsany",
    'CONTAINS_ALL': "/reference/blocks/text.html#containsall",
  }
};

Blockly.Blocks['text_split'] = {
  // This includes all four split variants (modes). The name and type of the 'AT' arg
  // changes to match the selected mode.
  category: 'Text',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.text_split.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Array', 'String']);
    this.appendValueInput('TEXT')
        .setCheck(['String'])
        .appendField(new Blockly.FieldDropdown(this.OPERATORS, Blockly.Blocks.text_split.dropdown_onchange), 'OP')
        .appendField("text");
    this.appendValueInput('AT')
        .setCheck(['String'])
        .appendField(Blockly.Msg.LANG_TEXT_SPLIT_INPUT_AT, 'ARG2_NAME')
        .setAlign(Blockly.ALIGN_RIGHT);
  },
  // TODO: This can be removed after the blockly update b/c validators are
  // properly triggered on load from XML.
  // adjust for the mode when the block is read in
  domToMutation: function (xmlElement) {
    var mode = xmlElement.getAttribute('mode');
    Blockly.Blocks.text_split.adjustToMode(mode, this);
  },
  // put the mode in the DOM so it can be read in by domToMutation
  // Note: All attributes must be 100% lowercase because IE always writes
  // attributes as lowercase.
  mutationToDom: function () {
    var container = document.createElement('mutation');
    var savedMode = this.getFieldValue('OP');
    container.setAttribute('mode', savedMode);
    return container;
  },
  typeblock: [{
    translatedName: "split",
    dropDown: {
      titleName: 'OP',
      value: 'SPLIT'
    }
  }, {
    translatedName: "split at first",
    dropDown: {
      titleName: 'OP',
      value: 'SPLITATFIRST'
    }
  }, {
    translatedName: "split at any",
    dropDown: {
      titleName: 'OP',
      value: 'SPLITATANY'
    }
  }, {
    translatedName: "split at first of any",
    dropDown: {
      titleName: 'OP',
      value: 'SPLITATFIRSTOFANY'
    }
  }]
};

// Change the name and type of ARG2 and set tooltop depending on mode
Blockly.Blocks.text_split.adjustToMode = function (mode, block) {
  if (mode == 'SPLITATFIRST' || mode == 'SPLIT') {
    block.getInput("AT").setCheck(['String']);
    block.setFieldValue(Blockly.Msg.LANG_TEXT_SPLIT_INPUT_AT, 'ARG2_NAME');
  } else if (mode == 'SPLITATFIRSTOFANY' || mode == 'SPLITATANY') {
    block.getInput("AT").setCheck(['Array']);
    block.setFieldValue(Blockly.Msg.LANG_TEXT_SPLIT_INPUT_AT_LIST, 'ARG2_NAME');
  }
  ;
  block.setTooltip(Blockly.Blocks.text_split.TOOLTIPS()[mode]);
};

Blockly.Blocks.text_split.dropdown_onchange = function (mode) {
  Blockly.Blocks.text_split.adjustToMode(mode, this.sourceBlock_)
};

// The order here determines the order in the dropdown
Blockly.Blocks.text_split.OPERATORS = function () {
  return [
    [Blockly.Msg.LANG_TEXT_SPLIT_OPERATOR_SPLIT, 'SPLIT'],
    [Blockly.Msg.LANG_TEXT_SPLIT_OPERATOR_SPLIT_AT_FIRST, 'SPLITATFIRST'],
    [Blockly.Msg.LANG_TEXT_SPLIT_OPERATOR_SPLIT_AT_ANY, 'SPLITATANY'],
    [Blockly.Msg.LANG_TEXT_SPLIT_OPERATOR_SPLIT_AT_FIRST_OF_ANY, 'SPLITATFIRSTOFANY']
  ]
};

Blockly.Blocks.text_split.TOOLTIPS = function () {
  return {
    SPLITATFIRST: "Divides the given text into two pieces using the location of the first occurrence of \nthe text 'at' as the dividing point, and returns a two-item list consisting of the piece \nbefore the dividing point and the piece after the dividing point. \nSplitting 'apple,banana,cherry,dogfood' with a comma as the splitting point \nreturns a list of two items: the first is the text 'apple' and the second is the text \n'banana,cherry,dogfood'. \nNotice that the comma after 'apple' does not appear in the result, \nbecause that is the dividing point.",
    SPLITATFIRSTOFANY: "Divides the given text into a two-item list, using the first location of any item \nin the list 'at' as the dividing point. \n\nSplitting 'I love apples bananas apples grapes' by the list '(ba,ap)' returns \na list of two items, the first being 'I love' and the second being \n'ples bananas apples grapes.'",
    SPLIT: "Divides text into pieces using the text 'at' as the dividing points and produces a list of the results.  \nSplitting 'one,two,three,four' at ',', (comma) returns the list '(one two three four)'. \nSplitting 'one-potato,two-potato,three-potato,four' at '-potato', returns the list '(one two three four)'.",
    SPLITATANY: "Divides the given text into a list, using any of the items in the list 'at' as the \ndividing point, and returns a list of the results. \nSplitting 'appleberry,banana,cherry,dogfood' with 'at' as the two-element list whose \nfirst item is a comma and whose second item is 'rry' returns a list of four items: \n'(applebe banana che dogfood)'."
  }
};

Blockly.Blocks.text_split.HELPURLS = function () {
  return {
    SPLITATFIRST: "/reference/blocks/text.html#splitat",
    SPLITATFIRSTOFANY: "/reference/blocks/text.html#split",
    SPLIT: "/reference/blocks/text.html#split",
    SPLITATANY: "/reference/blocks/text.html#splitatany"
  }
};

Blockly.Blocks['text_split_at_spaces'] = {
  // Split at spaces
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#splitspaces",
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Array', 'String']);
    this.appendValueInput('TEXT')
        .setCheck(['String'])
        .appendField("split at spaces");
    this.setTooltip("Split the text into pieces separated by spaces.");
  },
  typeblock: [{translatedName: "split at spaces"}]
};

Blockly.Blocks['text_segment'] = {
  // Create text segment
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#segment",
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Number', 'String', 'Key']);
    var checkTypeText = ['String'];
    var checkTypeNumber = ['Number'];
    this.interpolateMsg("segment  text %1 start %2 length %3",
        ['TEXT', checkTypeText, Blockly.ALIGN_RIGHT],
        ['START', checkTypeNumber, Blockly.ALIGN_RIGHT],
        ['LENGTH', checkTypeNumber, Blockly.ALIGN_RIGHT],
        Blockly.ALIGN_RIGHT);
    this.setTooltip("Extracts the segment of the given length from the given text\nstarting from the given text starting from the given position. Position\n1 denotes the beginning of the text.");
    this.setInputsInline(false);
  },
  typeblock: [{translatedName: "segment"}]
};

Blockly.Blocks['text_replace_all'] = {
  // Replace all occurrences of text
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#replaceall",
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Number', 'String', 'Key']);
    var checkTypeText = ['String'];
    this.interpolateMsg("replace all text %1 segment %2 replacement %3",
        ['TEXT', checkTypeText, Blockly.ALIGN_RIGHT],
        ['SEGMENT', checkTypeText, Blockly.ALIGN_RIGHT],
        ['REPLACEMENT', checkTypeText, Blockly.ALIGN_RIGHT],
        Blockly.ALIGN_RIGHT);
    this.setTooltip("Returns a new text obtained by replacing all occurrences\nof the segment with the replacement.");
    this.setInputsInline(false);
  },
  typeblock: [{translatedName: "replace all"}]
};

Blockly.Blocks['obfuscated_text'] = {
  // Text value.
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#obfuscatetext",
  init: function () {
    this.setColour('#B32D5E');
    var label = "Obfuscated Text" + " " +
        "“"
    var textInput = new Blockly.FieldTextBlockInput('');
    textInput.onFinishEditing_ = Blockly.Blocks.text
        .bumpBlockOnFinishEdit.bind(this);
    this.appendDummyInput()
        .appendField(label)
        .appendField(textInput,'TEXT')
        .appendField("”");
    this.setOutput(true, [Blockly.Blocks.text.connectionCheck]);
    this.setTooltip("Produces text, like a text block.  The difference is that the \ntext is not easily discoverable by examining the app's APK.  Use this when creating apps \nto distribute that include confidential information, for example, API keys.  \nWarning: This provides only very low security against expert adversaries.");
    this.confounder = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
  },
  domToMutation: function(xmlElement) {
    var confounder = xmlElement.getAttribute('confounder');
    this.confounder = confounder;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation')
    container.setAttribute('confounder', this.confounder);
    return container;
  },
  typeblock: [{translatedName: "Obfuscated Text"}]
};

Blockly.Blocks['text_is_string'] = {
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#isstring",
  init: function() {
    this.setColour('#B32D5E');
    this.appendValueInput('ITEM')
      .appendField("is a string?")
      .appendField("thing");
    this.setOutput(true, ['Boolean', 'String']);
    this.setTooltip("Returns true if <code>thing</code> is a string.");
  },
  typeblock: [{translatedName: "is a string?"}]
};

Blockly.Blocks['text_reverse'] = {
  // String reverse.
  category: 'Text',
  helpUrl: "/reference/blocks/text.html#reverse",
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('VALUE')
        .setCheck(['String'])
        .appendField("reverse");
    this.setTooltip("Reverse the given text.");
  },
  typeblock: [{translatedName: "reverse"}]
};

Blockly.Blocks['text_replace_mappings'] = {
  // Replace all occurrences in mappings with their corresponding replacement
  category: 'Text',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.text_replace_mappings.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#B32D5E');
    this.setOutput(true, ['Number', 'String', 'Key']);
    var checkTypeText = ['String'];
    var checkTypeMap = ['Dictionary'];

    this.appendValueInput('MAPPINGS')
      .setCheck(checkTypeMap)
      .appendField("replace all mappings")
      .setAlign(Blockly.ALIGN_RIGHT)

    this.appendValueInput('TEXT')
      .setCheck(checkTypeText)
      .appendField("in text")
      .setAlign(Blockly.ALIGN_RIGHT)

    this.appendDummyInput()
        .appendField("preferring")
        .appendField(new Blockly.FieldDropdown(this.OPERATORS, Blockly.Blocks.text_replace_mappings.onchange), 'OP')
        .appendField("order")
        .setAlign(Blockly.ALIGN_RIGHT)

    this.setInputsInline(false);

    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.text_replace_mappings.TOOLTIPS()[mode];
    });
  },
  typeblock: [{
    translatedName: "longest string first",
    dropDown: {
      titleName: 'OP',
      value: 'LONGEST_STRING_FIRST'
    }
  }, {
    translatedName: "dictionary",
    dropDown: {
      titleName: 'OP',
      value: 'DICTIONARY_ORDER'
    }
  }
  /*{
    translatedName : "split at first",
    dropDown: {
        titleName: 'OP',
        value: 'EARLIEST_OCCURRENCE'
    }
  }*/
  ]
};

// The order here determines the order in the dropdown
Blockly.Blocks.text_replace_mappings.OPERATORS = function () {
  return [
    [Blockly.Msg.LANG_TEXT_REPLACE_ALL_MAPPINGS_OPERATOR_LONGEST_STRING_FIRST, 'LONGEST_STRING_FIRST'],
    [Blockly.Msg.LANG_TEXT_REPLACE_ALL_MAPPINGS_OPERATOR_DICTIONARY_ORDER, 'DICTIONARY_ORDER']
    //['earliest occurrence', 'EARLIEST_OCCURRENCE']
  ]
};

Blockly.Blocks.text_replace_mappings.TOOLTIPS = function () {
  return {
    LONGEST_STRING_FIRST : "Returns a new text obtained by replacing all occurrences",
    DICTIONARY_ORDER : Blockly.Msg.LANG_TEXT_REPLACE_ALL_MAPPINGS_TOOLTIP_DICTIONARY_ORDER
    //EARLIEST_OCCURRENCE : "tooltip"
  }
};

Blockly.Blocks.text_replace_mappings.HELPURLS = function () {
  return {
    LONGEST_STRING_FIRST : "/reference/blocks/text.html#replaceallmappingslongeststring",
    DICTIONARY_ORDER : "/reference/blocks/text.html#replaceallmappingsdictionary"
    //EARLIEST_OCCURRENCE : "help"
  }
}


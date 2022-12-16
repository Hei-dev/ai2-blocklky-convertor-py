// -*- mode: java; c-basic-offset: 2; -*-
// Copyright 2013-2014 MIT, All rights reserved
// Released under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
/**
 * @license
 * @fileoverview Math blocks for Blockly, modified for MIT App Inventor.
 * @author mckinney@mit.edu (Andrew F. McKinney)
 */

'use strict';

//goog.provide('Blockly.Blocks.math');

//goog.require('Blockly.Blocks.Utilities');

Blockly.Blocks['math_number'] = {
  // Numeric value.
  category: 'Math',
  helpUrl: "/reference/blocks/math.html#number",
  init: function () {
    this.setColour('#3F71B5');
    this.appendDummyInput().appendField(
        new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Report the number shown.");
  },
  typeblock: [{translatedName: "number"}]
};

/**
 * Ensures that only a number may be entered into the text field. Supports
 * decimal, binary, octal, and hex.
 * @param {string} text The text to check the validity of.
 * @return {string} Validated text.
 */
Blockly.Blocks.math_number.validator = function (text) {
  // TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
  var n = Number(text || 0);  // Number() supports binary, hex, etc.
  if (window.isNaN(n)) {
    // Fall back to old method. This is just UI-Behavior that doesn't affect
    // the generated code, but we might as well keep it the same.
    n = window.parseFloat(text || 0);
    return window.isNaN(n) ? null : String(n);
  }
  // Don't convert n to string, because that always returns decimal.
  return text;
};

Blockly.Blocks['math_number_radix'] = {
  category:'Math',

  helpUrl: "/reference/blocks/math.html#number-radix",

  init: function() {
    this.dropdown = new Blockly.FieldDropdown([
        [Blockly.Msg.LANG_MATH_DECIMAL_FORMAT, 'DEC'],
        [Blockly.Msg.LANG_MATH_BINARY_FORMAT, 'BIN'],
        [Blockly.Msg.LANG_MATH_OCTAL_FORMAT, 'OCT'],
        [Blockly.Msg.LANG_MATH_HEXADECIMAL_FORMAT, 'HEX'],
    ], this.dropdownListener);
    this.numberField = new Blockly.FieldTextInput('0', this.numberValidator);

    this.setColour('#3F71B5');
    this.appendDummyInput()
        .appendField(this.dropdown, 'OP')
        .appendField(this.numberField, 'NUM');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Report the number shown in decimal (base-10) format.");
  },

  typeblock: [{translatedName: "number radix"}],

  dropdownListener: function(newValue) {
    var numberField = this.sourceBlock_.numberField;
    var currentPrefix = Blockly.Blocks.math_number_radix.PREFIX[this.getValue()];
    var currentValue = Number(currentPrefix + numberField.getValue());
    var newRadix = Blockly.Blocks.math_number_radix.RADIX[newValue];
    numberField.setValue(currentValue.toString(newRadix))
  },

  numberValidator: function(text) {
    if (!text) {
      return 0;
    }
    var dropdown = this.sourceBlock_.dropdown;
    var prefix = Blockly.Blocks.math_number_radix.PREFIX[dropdown.getValue()];
    var n = Number(prefix + text);
    // Do not convert n to string, because that always returns decimal.
    return window.isNaN(n) ? null : text;
  }
};

// Maps dropdown value to radix prefix.
Blockly.Blocks.math_number_radix.PREFIX = {
  'DEC': '',
  'BIN': '0b',
  'OCT': '0o',
  'HEX': '0x'
};

// Maps dropdown value to radix.
Blockly.Blocks.math_number_radix.RADIX = {
  'DEC': 10,
  'BIN': 2,
  'OCT': 8,
  'HEX': 16
};

Blockly.Blocks['math_compare'] = {
  // Basic arithmetic operator.
  // TODO(Andrew): equality block needs to have any on the sockets.
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_compare.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Boolean', 'String']);
    this.appendValueInput('A')
        .setCheck(null);
    this.appendValueInput('B')
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown(this.OPERATORS, Blockly.Blocks.math_compare.onchange), 'OP');
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_compare.TOOLTIPS()[mode];
    });
  },
  // Potential clash with logic equal, using '=' for now
  typeblock: [{
    translatedName: "=",
    dropDown: {
      titleName: 'OP',
      value: 'EQ'
    }
  }, {
    translatedName: "≠",
    dropDown: {
      titleName: 'OP',
      value: 'NEQ'
    }
  }, {
    translatedName: "<",
    dropDown: {
      titleName: 'OP',
      value: 'LT'
    }
  }, {
    translatedName: "≤",
    dropDown: {
      titleName: 'OP',
      value: 'LTE'
    }
  }, {
    translatedName: ">",
    dropDown: {
      titleName: 'OP',
      value: 'GT'
    }
  }, {
    translatedName: "≥",
    dropDown: {
      titleName: 'OP',
      value: 'GTE'
    }
  }]
};

Blockly.Blocks.math_compare.onchange = function (value) {
  if (!this.sourceBlock_) {
    return;
  }
  if (value == "EQ" || value == "NEQ") {
    this.sourceBlock_.getInput("A").setCheck(null);
    this.sourceBlock_.getInput("B").setCheck(null);
  } else {
    this.sourceBlock_.getInput("A")
        .setCheck(['Number']);
    this.sourceBlock_.getInput("B")
        .setCheck(['Number']);
  }
};

Blockly.Blocks.math_compare.OPERATORS = function () {
  return [[Blockly.Msg.LANG_MATH_COMPARE_EQ, 'EQ'],
    [Blockly.Msg.LANG_MATH_COMPARE_NEQ, 'NEQ'],
    [Blockly.Msg.LANG_MATH_COMPARE_LT, 'LT'],
    [Blockly.Msg.LANG_MATH_COMPARE_LTE, 'LTE'],
    [Blockly.Msg.LANG_MATH_COMPARE_GT, 'GT'],
    [Blockly.Msg.LANG_MATH_COMPARE_GTE, 'GTE']];
};

Blockly.Blocks.math_compare.TOOLTIPS = function () {
  return {
    EQ: "Return true if both numbers are equal to each other.",
    NEQ: "Return true if both numbers are not equal to each other.",
    LT: "Return true if the first number is smaller\nthan the second number.",
    LTE: "Return true if the first number is smaller\nthan or equal to the second number.",
    GT: "Return true if the first number is greater\nthan the second number.",
    GTE: "Return true if the first number is greater\nthan or equal to the second number."
  }
};

Blockly.Blocks.math_compare.HELPURLS = function () {
  return {
    EQ: "/reference/blocks/math.html#=",
    NEQ: "/reference/blocks/math.html#not=",
    LT: "/reference/blocks/math.html#lt",
    LTE: "/reference/blocks/math.html#lte",
    GT: "/reference/blocks/math.html#gt",
    GTE: "/reference/blocks/math.html#gte"
  }
};

Blockly.Blocks['math_add'] = {
  // Basic arithmetic operator.
  category: 'Math',
  helpUrl: "/reference/blocks/math.html#add",
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM0')
        .setCheck(['Number']);
    // append the title on a separate line to avoid overly long lines
    this.appendValueInput('NUM1')
        .setCheck(['Number'])
        .appendField("+");
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      return "Return the sum of the two numbers.";
    });
    this.setMutator(new Blockly.Mutator(['math_mutator_item']));
    this.emptyInputName = 'EMPTY';
    this.repeatingInputName = 'NUM';
    this.itemCount_ = 2;
  },
  mutationToDom: Blockly.mutationToDom,
  domToMutation: function(container) {
    Blockly.domToMutation.call(this, container);

    // If we only have one input, put the + operator before it
    if (this.itemCount_ === 1) {
      this.inputList[0].appendField('0 ' + "+");
    }
  },
  decompose: function (workspace) {
    return Blockly.decompose(workspace, 'math_mutator_item', this);
  },
  compose: function(containerBlock) {
    Blockly.compose.call(this, containerBlock);

    // If we only have one input, put the + operator before it
    if (this.itemCount_ === 1) {
      this.inputList[0].appendField('0 ' + "+");
    }
  },
  saveConnections: Blockly.saveConnections,
  addEmptyInput: function () {
    this.appendDummyInput(this.emptyInputName)
      .appendField("+");
  },
  addInput: function (inputNum) {
    var input = this.appendValueInput(this.repeatingInputName + inputNum)
        .setCheck(['Number']);
    if (inputNum !== 0) {
      input.appendField("+");
    }
    return input;
  },
  updateContainerBlock: function (containerBlock) {
    containerBlock.setFieldValue("+", "CONTAINER_TEXT");
  },
  typeblock: [{translatedName: "+"}]
};

Blockly.Blocks['math_mutator_item'] = {
  // Add items.
  init: function () {
    this.setColour('#3F71B5');
    this.appendDummyInput()
      //.appendField("item");
        .appendField("number");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    //this.setTooltip(Blockly.Msg.LANG_LISTS_CREATE_WITH_ITEM_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Blocks['math_subtract'] = {
  // Basic arithmetic operator.
  category: 'Math',
  helpUrl: "/reference/blocks/math.html#subtract",
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('A')
        .setCheck(['Number']);
    this.appendValueInput('B')
        .setCheck(['Number'])
        .appendField("-");
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    this.setTooltip("Return the difference of the two numbers.");
  },
  typeblock: [{translatedName: "-"}]
};

Blockly.Blocks['math_multiply'] = {
  // Basic arithmetic operator.
  category: 'Math',
  helpUrl: "/reference/blocks/math.html#multiply",
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM0')
        .setCheck(['Number']);
    this.appendValueInput('NUM1')
        .setCheck(['Number'])
        .appendField(Blockly.Blocks.Utilities.times_symbol);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      return "Return the product of the two numbers.";
    });
    this.setMutator(new Blockly.Mutator(['math_mutator_item']));
    this.emptyInputName = 'EMPTY';
    this.repeatingInputName = 'NUM';
    this.itemCount_ = 2;
  },
  mutationToDom: Blockly.mutationToDom,
  domToMutation: function(container) {
    Blockly.domToMutation.call(this, container);
    if (this.itemCount_ === 1) {
      this.inputList[0].appendField('1 ' + Blockly.Blocks.Utilities.times_symbol);
    }
  },
  decompose: function (workspace) {
    return Blockly.decompose(workspace, 'math_mutator_item', this);
  },
  compose: function(containerBlock) {
    Blockly.compose.call(this, containerBlock);
    if (this.itemCount_ === 1) {
      this.inputList[0].appendField('1 ' + Blockly.Blocks.Utilities.times_symbol);
    }
  },
  saveConnections: Blockly.saveConnections,
  addEmptyInput: function () {
    this.appendDummyInput(this.emptyInputName)
      .appendField(Blockly.Blocks.Utilities.times_symbol);
  },
  addInput: function (inputNum) {
    var input = this.appendValueInput(this.repeatingInputName + inputNum)
        .setCheck(['Number']);
    if (inputNum !== 0) {
      input.appendField(Blockly.Blocks.Utilities.times_symbol);
    }
    return input;
  },
  updateContainerBlock: function (containerBlock) {
    containerBlock.setFieldValue(Blockly.Blocks.Utilities.times_symbol, "CONTAINER_TEXT");
  },
  typeblock: [{translatedName: "*"}]
};

Blockly.Blocks['math_division'] = {
  // Basic arithmetic operator.
  category: 'Math',
  helpUrl: "/reference/blocks/math.html#divide",
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('A')
        .setCheck(['Number']);
    this.appendValueInput('B')
        .setCheck(['Number'])
        .appendField("/");
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    this.setTooltip("Return the quotient of the two numbers.");
  },
  typeblock: [{translatedName: "/"}]
};

Blockly.Blocks['math_power'] = {
  // Basic arithmetic operator.
  category: 'Math',
  helpUrl: "/reference/blocks/math.html#exponent",
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('A')
        .setCheck(['Number']);
    this.appendValueInput('B')
        .setCheck(['Number'])
        .appendField("^");
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip("Return the first number raised to\nthe power of the second number.");
  },
  typeblock: [{translatedName: "^"}]
};


Blockly.Blocks['math_bitwise'] = {
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_bitwise.HELPURLS()[mode];
  },
  init: function () {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM0')
        .setCheck(['Number'])
        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.appendValueInput('NUM1')
        .setCheck(['Number']);
    this.setInputsInline(false);
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_bitwise.TOOLTIPS()[mode];
    });
    this.setMutator(new Blockly.Mutator(['math_mutator_item']));
    this.itemCount_ = 2;
    this.valuesToSave = {'OP': null};
    this.emptyInputName = 'EMPTY';
    this.repeatingInputName = 'NUM';
  },
  mutationToDom: Blockly.mutationToDom,
  domToMutation: Blockly.domToMutation,
  decompose: function (workspace) {
    return Blockly.decompose(workspace, 'math_mutator_item', this);
  },
  compose: Blockly.compose,
  saveConnections: Blockly.saveConnections,
  addEmptyInput: function () {
    var input = this.appendDummyInput(this.emptyInputName);
    input.appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setFieldValue(this.valuesToSave['OP'], 'OP');
  },
  addInput: function (inputNum) {
    var input = this.appendValueInput(this.repeatingInputName + inputNum)
        .setCheck(['Number']);
    if (inputNum == 0) {
      input.appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
      this.setFieldValue(this.valuesToSave['OP'], 'OP');
    }
    return input;
  },
  updateContainerBlock: function (containerBlock) {

    for (var i = 0; i < Blockly.Blocks.math_bitwise.OPERATORS.length; i++) {
      if (Blockly.Blocks.math_bitwise.OPERATORS[i][1] == this.getFieldValue("OP")) {
        containerBlock.setFieldValue(Blockly.Blocks.math_bitwise.OPERATORS[i][0], "CONTAINER_TEXT");
      }
    }

  },
  typeblock: [{
    translatedName: "bitwise and",
    dropDown: {
      titleName: 'OP',
      value: 'BITAND'
    }
  }, {
    translatedName: "bitwise or",
    dropDown: {
      titleName: 'OP',
      value: 'BITIOR'
    }
  }, {
    translatedName: "bitwise xor",
    dropDown: {
      titleName: 'OP',
      value: 'BITXOR'
    }
  }]
};

Blockly.Blocks.math_bitwise.OPERATORS = function () {
  return [[Blockly.Msg.LANG_MATH_BITWISE_AND, 'BITAND'],
    [Blockly.Msg.LANG_MATH_BITWISE_IOR, 'BITIOR'],
    [Blockly.Msg.LANG_MATH_BITWISE_XOR, 'BITXOR']]
};

Blockly.Blocks.math_bitwise.TOOLTIPS = function () {
  return {
    BITAND: "Return the bitwise AND of the two numbers.",
    BITIOR: "Return the bitwise inclusive OR of the two numbers.",
    BITXOR: "Return the bitwise exclusive OR of the two numbers."
  }
};

Blockly.Blocks.math_bitwise.HELPURLS = function () {
  return {
    BITAND: "/reference/blocks/math.html#bitwise_and",
    BITIOR: "/reference/blocks/math.html#bitwise_ior",
    BITXOR: "/reference/blocks/math.html#bitwise_xor"
  }
};

Blockly.Blocks['math_random_int'] = {
  // Random integer between [X] and [Y].
  category: 'Math',
  helpUrl: "/reference/blocks/math.html#randomint",
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);

    var checkTypeNumber = ['Number'];
    this.interpolateMsg("random integer from %1 to %2",
        ['FROM', checkTypeNumber, Blockly.ALIGN_RIGHT],
        ['TO', checkTypeNumber, Blockly.ALIGN_RIGHT],
        Blockly.ALIGN_RIGHT)
    /*this.appendValueInput('FROM')
     .setCheck(['Number'])
     .appendField("random integer")
     .appendField("from");
     this.appendValueInput('TO')
     .setCheck(['Number'])
     .appendField("to");*/
    this.setInputsInline(true);
    this.setTooltip("Returns a random integer between the upper bound\nand the lower bound. The bounds will be clipped to be smaller\nthan 2**30.");
  },
  typeblock: [{translatedName: "random integer"}]
};

Blockly.Blocks['math_random_float'] = {
  // Random fraction between 0 and 1.
  category: 'Math',
  helpUrl: "/reference/blocks/math.html#randomfrac",
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendDummyInput()
        .appendField("random fraction");
    this.setTooltip("Return a random number between 0 and 1.");
  },
  typeblock: [{translatedName: "random fraction"}]
};

Blockly.Blocks['math_random_set_seed'] = {
  // Set the seed of the radom number generator
  category: 'Math',
  helpUrl: "/reference/blocks/math.html#randomseed",
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(false, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM')
        .setCheck(['Number'])
        .appendField("random set seed")
        .appendField("to");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("specifies a numeric seed\nfor the random number generator");
  },
  typeblock: [{translatedName: "random set seed"}]
};

Blockly.Blocks['math_on_list'] = {
  // Evaluate a list of numbers to return sum, average, min, max, etc.
  // Some functions also work on text (min, max, mode, median).
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_on_list.HELPURLS()[mode];
  },
  init: function () {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM0')
        .setCheck(['Number'])
        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.appendValueInput('NUM1')
        .setCheck(['Number']);
    this.setInputsInline(false);
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_on_list.TOOLTIPS()[mode];
    });
    this.setMutator(new Blockly.Mutator(['math_mutator_item']));
    this.itemCount_ = 2;
    this.valuesToSave = {'OP': null};
    this.emptyInputName = 'EMPTY';
    this.repeatingInputName = 'NUM';
  },
  mutationToDom: Blockly.mutationToDom,
  domToMutation: Blockly.domToMutation,
  decompose: function (workspace) {
    return Blockly.decompose(workspace, 'math_mutator_item', this);
  },
  compose: Blockly.compose,
  saveConnections: Blockly.saveConnections,
  addEmptyInput: function () {
    var input = this.appendDummyInput(this.emptyInputName);
    input.appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.setFieldValue(this.valuesToSave['OP'], 'OP');
  },
  addInput: function (inputNum) {
    var input = this.appendValueInput(this.repeatingInputName + inputNum)
        .setCheck(['Number']);
    if (inputNum == 0) {
      input.appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
      this.setFieldValue(this.valuesToSave['OP'], 'OP');
    }
    return input;
  },
  updateContainerBlock: function (containerBlock) {

    for (var i = 0; i < Blockly.Blocks.math_on_list.OPERATORS.length; i++) {
      if (Blockly.Blocks.math_on_list.OPERATORS[i][1] == this.getFieldValue("OP")) {
        containerBlock.setFieldValue(Blockly.Blocks.math_on_list.OPERATORS[i][0], "CONTAINER_TEXT");
      }
    }

  },
  typeblock: [{
    translatedName: "min",
    dropDown: {
      titleName: 'OP',
      value: 'MIN'
    }
  }, {
    translatedName: "max",
    dropDown: {
      titleName: 'OP',
      value: 'MAX'
    }
  }]
};

Blockly.Blocks.math_on_list.OPERATORS = function () {
  return [[Blockly.Msg.LANG_MATH_ONLIST_OPERATOR_MIN, 'MIN'],
    [Blockly.Msg.LANG_MATH_ONLIST_OPERATOR_MAX, 'MAX']]
};

Blockly.Blocks.math_on_list.TOOLTIPS = function () {
  return {
    MIN: "Return the smallest of its arguments..",
    MAX: "Return the largest of its arguments.."
  }
};

Blockly.Blocks.math_on_list.HELPURLS = function () {
  return {
    MIN: "http://appinventor.mit.edu/explore/ai2/support/blocks/math#min",
    MAX: "http://appinventor.mit.edu/explore/ai2/support/blocks/math#max"
  }
};

Blockly.Blocks['math_single'] = {
  // Advanced math operators with single operand.
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_single.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM')
        .setCheck(['Number'])
        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_single.TOOLTIPS()[mode];
    });
  },
  typeblock: [{
    translatedName: "square root",
    dropDown: {
      titleName: 'OP',
      value: 'ROOT'
    }
  }, {
    translatedName: "absolute",
    dropDown: {
      titleName: 'OP',
      value: 'ABS'
    }
  }, {
    translatedName: "neg",
    dropDown: {
      titleName: 'OP',
      value: 'NEG'
    }
  }, {
    translatedName: "log",
    dropDown: {
      titleName: 'OP',
      value: 'LN'
    }
  }, {
    translatedName: "e^",
    dropDown: {
      titleName: 'OP',
      value: 'EXP'
    }
  }, {
    translatedName: "round",
    dropDown: {
      titleName: 'OP',
      value: 'ROUND'
    }
  }, {
    translatedName: "ceiling",
    dropDown: {
      titleName: 'OP',
      value: 'CEILING'
    }
  }, {
    translatedName: "floor",
    dropDown: {
      titleName: 'OP',
      value: 'FLOOR'
    }
  }]
};

Blockly.Blocks.math_single.OPERATORS = function () {
  return [[Blockly.Msg.LANG_MATH_SINGLE_OP_ROOT, 'ROOT'],
    [Blockly.Msg.LANG_MATH_SINGLE_OP_ABSOLUTE, 'ABS'],
    [Blockly.Msg.LANG_MATH_SINGLE_OP_NEG, 'NEG'],
    [Blockly.Msg.LANG_MATH_SINGLE_OP_LN, 'LN'],
    [Blockly.Msg.LANG_MATH_SINGLE_OP_EXP, 'EXP'],
    [Blockly.Msg.LANG_MATH_ROUND_OPERATOR_ROUND, 'ROUND'],
    [Blockly.Msg.LANG_MATH_ROUND_OPERATOR_CEILING, 'CEILING'],
    [Blockly.Msg.LANG_MATH_ROUND_OPERATOR_FLOOR, 'FLOOR']];
};

Blockly.Blocks.math_single.TOOLTIPS = function () {
  return {
    ROOT: "Return the square root of a number.",
    ABS: "Return the absolute value of a number.",
    NEG: "Return the negation of a number.",
    LN: "Return the natural logarithm of a number, i.e. the logarithm to the base e (2.71828...)",
    EXP: "Return e (2.71828...) to the power of a number.",
    ROUND: "Round a number up or down.",
    CEILING: "Rounds the input to the smallest\nnumber not less then the input",
    FLOOR: "Rounds the input to the largest\nnumber not greater then the input"
  }
};

Blockly.Blocks.math_single.HELPURLS = function () {
  return {
    ROOT: "/reference/blocks/math.html#sqrt",
    ABS: "/reference/blocks/math.html#abs",
    NEG: "/reference/blocks/math.html#neg",
    LN: "/reference/blocks/math.html#log",
    EXP: "/reference/blocks/math.html#e",
    ROUND: "/reference/blocks/math.html#round",
    CEILING: "/reference/blocks/math.html#ceiling",
    FLOOR: "/reference/blocks/math.html#floor"
  }
};

Blockly.Blocks['math_abs'] = {
  // Advanced math operators with single operand.
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_single.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM')
        .setCheck(['Number'])
        .appendField(new Blockly.FieldDropdown(Blockly.Blocks.math_single.OPERATORS), 'OP');
    this.setFieldValue('ABS', "OP");
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_single.TOOLTIPS()[mode];
    });
  }
};

Blockly.Blocks['math_neg'] = {
  // Advanced math operators with single operand.
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_single.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM')
        .setCheck(['Number'])
        .appendField(new Blockly.FieldDropdown(Blockly.Blocks.math_single.OPERATORS), 'OP');
    this.setFieldValue('NEG', "OP");
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_single.TOOLTIPS()[mode];
    });
  }
};

Blockly.Blocks['math_round'] = {
  // Advanced math operators with single operand.
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_single.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM')
        .setCheck(['Number'])
        .appendField(new Blockly.FieldDropdown(Blockly.Blocks.math_single.OPERATORS), 'OP');
    this.setFieldValue('ROUND', "OP");
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_single.TOOLTIPS()[mode];
    });
  }
};

Blockly.Blocks['math_ceiling'] = {
  // Advanced math operators with single operand.
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_single.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM')
        .setCheck(['Number'])
        .appendField(new Blockly.FieldDropdown(Blockly.Blocks.math_single.OPERATORS), 'OP');
    this.setFieldValue('CEILING', "OP");
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_single.TOOLTIPS()[mode];
    });
  }
};

Blockly.Blocks['math_floor'] = {
  // Advanced math operators with single operand.
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_single.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM')
        .setCheck(['Number'])
        .appendField(new Blockly.FieldDropdown(Blockly.Blocks.math_single.OPERATORS), 'OP');
    this.setFieldValue('FLOOR', "OP");
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_single.TOOLTIPS()[mode];
    });
  }
};

Blockly.Blocks['math_divide'] = {
  // Remainder or quotient of a division.
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_divide.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('DIVIDEND')
        .setCheck(['Number'])
        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    this.appendValueInput('DIVISOR')
        .setCheck(['Number'])
        .appendField("÷");
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_divide.TOOLTIPS()[mode];
    });
  },
  typeblock: [{
    translatedName: "modulo of",
    dropDown: {
      titleName: 'OP',
      value: 'MODULO'
    }
  }, {
    translatedName: "remainder of",
    dropDown: {
      titleName: 'OP',
      value: 'REMAINDER'
    }
  }, {
    translatedName: "quotient of",
    dropDown: {
      titleName: 'OP',
      value: 'QUOTIENT'
    }
  }]
};

Blockly.Blocks.math_divide.OPERATORS = function () {
  return [[Blockly.Msg.LANG_MATH_DIVIDE_OPERATOR_MODULO, 'MODULO'],
    [Blockly.Msg.LANG_MATH_DIVIDE_OPERATOR_REMAINDER, 'REMAINDER'],
    [Blockly.Msg.LANG_MATH_DIVIDE_OPERATOR_QUOTIENT, 'QUOTIENT']];
};

Blockly.Blocks.math_divide.TOOLTIPS = function () {
  return {
    MODULO: "Return the modulo.",
    REMAINDER: "Return the remainder.",
    QUOTIENT: "Return the quotient."
  }
};

Blockly.Blocks.math_divide.HELPURLS = function () {
  return {
    MODULO: "/reference/blocks/math.html#modulo",
    REMAINDER: "/reference/blocks/math.html#remainder",
    QUOTIENT: Blockly.Msg.LANG_MATH_DIVIDE_HELPURL_QUOTIENT
  }
};

Blockly.Blocks['math_trig'] = {
  // Trigonometry operators.
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_trig.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM')
        .setCheck(['Number'])
        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_trig.TOOLTIPS()[mode];
    });
  },
  typeblock: [{
    translatedName: "sin",
    dropDown: {
      titleName: 'OP',
      value: 'SIN'
    }
  }, {
    translatedName: "cos",
    dropDown: {
      titleName: 'OP',
      value: 'COS'
    }
  }, {
    translatedName: "tan",
    dropDown: {
      titleName: 'OP',
      value: 'TAN'
    }
  }, {
    translatedName: "asin",
    dropDown: {
      titleName: 'OP',
      value: 'ASIN'
    }
  }, {
    translatedName: "acos",
    dropDown: {
      titleName: 'OP',
      value: 'ACOS'
    }
  }, {
    translatedName: "atan",
    dropDown: {
      titleName: 'OP',
      value: 'ATAN'
    }
  }]
};

Blockly.Blocks.math_trig.OPERATORS = function () {
  return [[Blockly.Msg.LANG_MATH_TRIG_SIN, 'SIN'],
    [Blockly.Msg.LANG_MATH_TRIG_COS, 'COS'],
    [Blockly.Msg.LANG_MATH_TRIG_TAN, 'TAN'],
    [Blockly.Msg.LANG_MATH_TRIG_ASIN, 'ASIN'],
    [Blockly.Msg.LANG_MATH_TRIG_ACOS, 'ACOS'],
    [Blockly.Msg.LANG_MATH_TRIG_ATAN, 'ATAN']];
}

Blockly.Blocks.math_trig.TOOLTIPS = function () {
  return {
    SIN: "Provides the sine of the given angle in degrees.",
    COS: "Provides the cosine of the given angle in degrees.",
    TAN: "Provides the tangent of the given angle in degrees.",
    ASIN: "Provides the angle in the range (-90,+90]\ndegrees with the given sine value.",
    ACOS: "Provides the angle in the range [0, 180)\ndegrees with the given cosine value.",
    ATAN: "Provides the angle in the range (-90, +90)\ndegrees with the given tangent value."
  }
};

Blockly.Blocks.math_trig.HELPURLS = function () {
  return {
    SIN: "/reference/blocks/math.html#sin",
    COS: "/reference/blocks/math.html#cos",
    TAN: "/reference/blocks/math.html#tan",
    ASIN: "/reference/blocks/math.html#asin",
    ACOS: "/reference/blocks/math.html#acos",
    ATAN: "/reference/blocks/math.html#atan"
  }
};

Blockly.Blocks['math_cos'] = {
  // Trigonometry operators.
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_trig.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM')
        .setCheck(['Number'])
        .appendField(new Blockly.FieldDropdown(Blockly.Blocks.math_trig.OPERATORS), 'OP');
    this.setFieldValue('COS', "OP");
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_trig.TOOLTIPS()[mode];
    });
  }
};

Blockly.Blocks['math_tan'] = {
  // Trigonometry operators.
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_trig.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM')
        .setCheck(['Number'])
        .appendField(new Blockly.FieldDropdown(Blockly.Blocks.math_trig.OPERATORS), 'OP');
    this.setFieldValue('TAN', "OP");
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_trig.TOOLTIPS()[mode];
    });
  }
};

Blockly.Blocks['math_atan2'] = {
  // Trigonometry operators.
  category: 'Math',
  helpUrl: "/reference/blocks/math.html#atan2",
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendDummyInput().appendField("atan2");
    this.appendValueInput('Y')
        .setCheck(['Number'])
        .appendField("y")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('X')
        .setCheck(['Number'])
        .appendField("x")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setInputsInline(false);
    this.setTooltip("Provides the angle in the range (-180, +180]\ndegrees with the given rectangular coordinates.");
  },
  typeblock: [{translatedName: "atan2"}]
};

Blockly.Blocks['math_convert_angles'] = {
  // Trigonometry operators.
  category: 'Math',
  helpUrl: function () {
    var mode = this.getFieldValue('OP');
    return Blockly.Blocks.math_convert_angles.HELPURLS()[mode];
  },
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM')
        .setCheck(['Number'])
        .appendField("convert")
        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setTooltip(function () {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_convert_angles.TOOLTIPS()[mode];
    });
  },
  typeblock: [{
    translatedName: "convert" +
    ' ' + "radians to degrees",
    dropDown: {
      titleName: 'OP',
      value: 'RADIANS_TO_DEGREES'
    }
  }, {
    translatedName: "convert" +
    ' ' + "degrees to radians",
    dropDown: {
      titleName: 'OP',
      value: 'DEGREES_TO_RADIANS'
    }
  }]
};

Blockly.Blocks.math_convert_angles.OPERATORS = function () {
  return [[Blockly.Msg.LANG_MATH_CONVERT_ANGLES_OP_RAD_TO_DEG, 'RADIANS_TO_DEGREES'],
    [Blockly.Msg.LANG_MATH_CONVERT_ANGLES_OP_DEG_TO_RAD, 'DEGREES_TO_RADIANS']]
};

Blockly.Blocks.math_convert_angles.TOOLTIPS = function () {
  return {
    RADIANS_TO_DEGREES: "Returns the degree value in the range\n[0, 360) corresponding to its radians argument.",
    DEGREES_TO_RADIANS: "Returns the radian value in the range\n[-π, +π) corresponding to its degrees argument."
  }
};

Blockly.Blocks.math_convert_angles.HELPURLS = function () {
  return {
    RADIANS_TO_DEGREES: "/reference/blocks/math.html#convertrad",
    DEGREES_TO_RADIANS: "/reference/blocks/math.html#convertdeg"
  }
};

Blockly.Blocks['math_format_as_decimal'] = {
  category: 'Math',
  helpUrl: "/reference/blocks/math.html#format",
  init: function () {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);

    var checkTypeNumber = ['Number'];
    this.interpolateMsg("format as decimal number %1 places %2",
        ['NUM', checkTypeNumber, Blockly.ALIGN_RIGHT],
        ['PLACES', checkTypeNumber, Blockly.ALIGN_RIGHT],
        Blockly.ALIGN_RIGHT);
    /*this.appendDummyInput()
      .appendField('format as decimal');
    this.appendValueInput('NUM')
      .setCheck(['Number'])
      .appendField('number')
      .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('PLACES')
      .setCheck(['Number'])
      .appendField('places')
      .setAlign(Blockly.ALIGN_RIGHT);*/
    this.setInputsInline(false);
    this.setTooltip("Returns the number formatted as a decimal\nwith a specified number of places.");
  },
  typeblock: [{translatedName: "format as decimal"}]
};

Blockly.Blocks['math_is_a_number'] = {
  category : 'Math',
  helpUrl: function() {
      var mode = this.getFieldValue('OP');
      return Blockly.Blocks.math_is_a_number.HELPURLS[mode];
  },
  init : function() {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Boolean', 'String']);
    this.appendValueInput('NUM')
        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_is_a_number.TOOLTIPS[mode];
    });
  },
  typeblock: [{
    translatedName: "is number?",
    dropDown: {
      titleName: 'OP',
      value: 'NUMBER'
    }
  },{
    translatedName: "is Base 10?",
    dropDown: {
      titleName: 'OP',
      value: 'BASE10'
    }
  },{
    translatedName: "is hexadecimal?",
    dropDown: {
      titleName: 'OP',
      value: 'HEXADECIMAL'
    }
  },{
    translatedName: "is binary?",
    dropDown: {
      titleName: 'OP',
      value: 'BINARY'
    }
  }]
};

Blockly.Blocks.math_is_a_number.OPERATORS =
  [[ Blockly.Msg.LANG_MATH_IS_A_NUMBER_INPUT_NUM, 'NUMBER' ],
   [ Blockly.Msg.LANG_MATH_IS_A_DECIMAL_INPUT_NUM, 'BASE10' ],
   [ Blockly.Msg.LANG_MATH_IS_A_HEXADECIMAL_INPUT_NUM, 'HEXADECIMAL' ],
   [ Blockly.Msg.LANG_MATH_IS_A_BINARY_INPUT_NUM, 'BINARY' ]];

Blockly.Blocks.math_is_a_number.TOOLTIPS = {
  NUMBER : "Tests if something is a number.",
  BASE10 : "Tests if something is a string that represents a positive base 10 integer.",
  HEXADECIMAL : "Tests if something is a string that represents a hexadecimal number.",
  BINARY : "Tests if something is a string that represents a binary number."
};

Blockly.Blocks.math_is_a_number.HELPURLS = {
  NUMBER : "/reference/blocks/math.html#isnumber",
  BASE10 : "/reference/blocks/math.html#isnumber",
  HEXADECIMAL : "/reference/blocks/math.html#isnumber",
  BINARY : "/reference/blocks/math.html#isnumber"
};

Blockly.Blocks['math_convert_number'] = {
  category : 'Math',
  helpUrl: function() {
      var mode = this.getFieldValue('OP');
      return Blockly.Blocks.math_convert_number.HELPURLS[mode];
  },
  init : function() {
    this.setColour('#3F71B5');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendValueInput('NUM')
        .appendField("convert number")
        .appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
    var thisBlock = this;
    this.setTooltip(function() {
      var mode = thisBlock.getFieldValue('OP');
      return Blockly.Blocks.math_convert_number.TOOLTIPS[mode];
    });
  },
  typeblock: [{
    translatedName: "base 10 to hex",
    dropDown: {
      titleName: 'OP',
      value: 'DEC_TO_HEX'
    }
  },{
    translatedName: "hex to base 10",
    dropDown: {
      titleName: 'OP',
      value: 'HEX_TO_DEC'
    }
  },{
    translatedName: "base 10 to binary",
    dropDown: {
      titleName: 'OP',
      value: 'DEC_TO_BIN'
    }
  },{
    translatedName: "binary to base 10",
    dropDown: {
      titleName: 'OP',
      value: 'BIN_TO_DEC'
    }
  }]
};

Blockly.Blocks.math_convert_number.OPERATORS =
  [[ Blockly.Msg.LANG_MATH_CONVERT_NUMBER_OP_DEC_TO_HEX, 'DEC_TO_HEX' ],
   [ Blockly.Msg.LANG_MATH_CONVERT_NUMBER_OP_HEX_TO_DEC, 'HEX_TO_DEC' ],
   [ Blockly.Msg.LANG_MATH_CONVERT_NUMBER_OP_DEC_TO_BIN, 'DEC_TO_BIN' ],
   [ Blockly.Msg.LANG_MATH_CONVERT_NUMBER_OP_BIN_TO_DEC, 'BIN_TO_DEC' ]];

Blockly.Blocks.math_convert_number.TOOLTIPS = {
  DEC_TO_HEX : "Takes a positive integer in base 10 and returns the string that represents the number in hexadecimal",
  HEX_TO_DEC : "Takes a string that represents a number in hexadecimal and returns the string that represents the number in base 10",
  DEC_TO_BIN : "Takes a positive integer in base 10 and returns the string that represents the number in binary",
  BIN_TO_DEC : "Takes a string that represents a number in binary and returns the string that represents the number in base 10"
};

Blockly.Blocks.math_convert_number.HELPURLS = {
  DEC_TO_HEX : "http://appinventor.mit.edu/explore/ai2/support/blocks/math#convertnumber",
  HEX_TO_DEC : "http://appinventor.mit.edu/explore/ai2/support/blocks/math#convertnumber",
  DEC_TO_BIN : "http://appinventor.mit.edu/explore/ai2/support/blocks/math#convertnumber",
  BIN_TO_DEC : "http://appinventor.mit.edu/explore/ai2/support/blocks/math#convertnumber"
};


// -*- mode: java; c-basic-offset: 2; -*-
// Copyright 2013-2014 MIT, All rights reserved
// Released under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
/**
 * @license
 * @fileoverview Color blocks for Blockly, modified for MIT App Inventor.
 * @author mckinney@mit.edu (Andrew F. McKinney)
 */

'use strict';

//goog.provide('Blockly.Blocks.color');

//goog.require('Blockly.Blocks.Utilities');

Blockly.Blocks['color_black'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#000000'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Click the square to pick a color.");
  },
  typeblock: [{ translatedName: "black" }]
};

Blockly.Blocks['color_white'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#ffffff'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "white" }]
};

Blockly.Blocks['color_red'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#ff0000'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "red" }]
};

Blockly.Blocks['color_pink'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#ffafaf'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "pink" }]
};

Blockly.Blocks['color_orange'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#ffc800'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "orange" }]
};

Blockly.Blocks['color_yellow'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#ffff00'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "yellow" }]
};

Blockly.Blocks['color_green'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#00ff00'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "green" }]
};

Blockly.Blocks['color_cyan'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#00ffff'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "cyan" }]
};

Blockly.Blocks['color_blue'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#0000ff'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "blue" }]
};

Blockly.Blocks['color_magenta'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#ff00ff'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "magenta" }]
};

Blockly.Blocks['color_light_gray'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#cccccc'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "light gray" }]
};

Blockly.Blocks['color_gray'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#888888'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "gray" }]
};


Blockly.Blocks['color_dark_gray'] = {
  // Colour picker.
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#basic",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendDummyInput().appendField(new Blockly.FieldColour('#444444'), 'COLOR');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "dark gray" }]
};

Blockly.Blocks['color_make_color'] = {
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#make",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendValueInput('COLORLIST')
      .appendField("make color")
      .setCheck(['Array']);
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.setTooltip("Generate a color using the given red, green, blue, and optionally alpha components.");
  },
  typeblock: [{ translatedName: "make color" }]
};

Blockly.Blocks['color_split_color'] = {
  category: "Colors",
  helpUrl: "/reference/blocks/colors.html#split",
  init: function() {
    this.setColour('#7D7D7D');
    this.appendValueInput('COLOR')
      .appendField("split color")
      .setCheck(['Number']);
    this.setOutput(true, ['Array', 'String']);
    this.setTooltip("A list of four elements, each in the range 0 to 255, representing the red, green, blue and alpha components.");
  },
  typeblock: [{ translatedName: "split color" }]
};


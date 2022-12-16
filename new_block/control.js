// -*- mode: java; c-basic-offset: 2; -*-
// Copyright 2013-2014 MIT, All rights reserved
// Released under the Apache License, Version 2.0
// http://www.apache.org/licenses/LICENSE-2.0
/**
 * @fileoverview Control blocks for Blockly, modified for App Inventor
 * @author fraser@//google.com (Neil Fraser)
 * @author andrew.f.mckinney@gmail.com (Andrew F. McKinney)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

/**
 * Lyn's History:
 * [lyn, written 11/16-17/13, added 07/01/14] Added freeVariables, renameFree, and renameBound to forRange and forEach loops
 * [lyn, 10/27/13] Specify direction of flydowns
 * [lyn, 10/25/13] Made collapsed block labels more sensible.
 * [lyn, 10/10-14/13]
 *   + Installed flydown index variable declarations in forRange and forEach loops
 *   + Abstracted over string labels on all blocks using constants defined in en/_messages.js
 *   + Renamed "for <i> start [] end [] step []" block to "for each <number> from [] to [] by []"
 *   + Renamed "for each <i> in list []" block to "for each <item> in list []"
 *   + Renamed "choose test [] then-return [] else-return []" to "if [] then [] else []"
 *     (TODO: still needs to have a mutator like  the "if" statement blocks).
 *   + Renamed "evaluate" block to "evaluate but ignore result"
 *   + Renamed "do {} then-return []" block to "do {} result []" and re-added this block
 *     to the Control drawer (who removed it?)
 *   + Removed get block (still in Variable drawer; no longer needed with parameter flydowns)
 * [lyn, 11/29-30/12]
 *   + Change forEach and forRange loops to take name as input text rather than via plug.
 *   + For these blocks, add extra methods to support renaming.
 */

'use strict';

//goog.provide('Blockly.Blocks.control');

//goog.require('Blockly.Blocks.Utilities');

Blockly.Blocks['controls_if'] = {
  // If/elseif/else condition.
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#if",
  init: function () {
    this.setColour('#B18E35');
    this.appendValueInput('IF0')
        .setCheck(['Boolean'])
        .appendField("if");
    this.appendStatementInput('DO0')
        .appendField("then");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setMutator(new Blockly.Mutator(['controls_if_elseif',
      'controls_if_else']));
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function () {
      if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return "If a value is true, then do some statements.";
      } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return "If a value is true, then do the first block of statements.\nOtherwise, do the second block of statements.";
      } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
        return "If the first value is true, then do the first block of statements.\nOtherwise, if the second value is true, do the second block of statements.";
      } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
        return "If the first value is true, then do the first block of statements.\nOtherwise, if the second value is true, do the second block of statements.\nIf none of the values are true, do the last block of statements.";
      }
      return '';
    });
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    this.warnings = [{name: "checkEmptySockets", sockets: [{baseName: "IF"}, {baseName: "DO"}]}];
  },
  mutationToDom: function () {
    if (!this.elseifCount_ && !this.elseCount_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    return container;
  },
  domToMutation: function (xmlElement) {
    this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0
    this.elseCount_ = window.parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.updateShape_();
  },
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock('controls_if_if');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 1; x <= this.elseifCount_; x++) {
      var elseifBlock = workspace.newBlock('controls_if_elseif');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = workspace.newBlock('controls_if_else');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    return containerBlock;
  },
  compose: function (containerBlock) {
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    var valueConnections = [null];
    var statementConnections = [null];
    var elseStatementConnection = null;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          this.elseifCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          statementConnections.push(clauseBlock.statementConnection_);
          break;
        case 'controls_if_else':
          this.elseCount_++;
          elseStatementConnection = clauseBlock.statementConnection_;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
        clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
    Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
  },
  saveConnections: function (containerBlock) {
    // Store a pointer to any connected child blocks.
    var inputDo;
    var clauseBlock = containerBlock.getInput('STACK').connection.targetBlock();
    var x = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'controls_if_elseif':
          var inputIf = this.getInput('IF' + x);
          inputDo = this.getInput('DO' + x);
          clauseBlock.valueConnection_ =
              inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          x++;
          break;
        case 'controls_if_else':
          inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ =
              inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection &&
      clauseBlock.nextConnection.targetBlock();
    }
  },
  typeblock: [{translatedName: "if"}],
  updateShape_: function() {
    // Delete everything.
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
    }
    var i = 1;
    while (this.getInput('IF' + i)) {
      this.removeInput('IF' + i);
      this.removeInput('DO' + i);
      i++;
    }
    // Rebuild block.
    for (var i = 1; i <= this.elseifCount_; i++) {
      this.appendValueInput('IF' + i)
        .setCheck(['Boolean'])
        .appendField("else if");
      this.appendStatementInput('DO' + i)
        .appendField("then");
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE')
        .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    }
  }
};

Blockly.Blocks['controls_if_if'] = {
  // If condition.
  init: function () {
    this.setColour('#B18E35');
    this.appendDummyInput()
        .appendField("if");
    this.appendStatementInput('STACK');
    this.setTooltip("Add, remove, or reorder sections\nto reconfigure this if block.");
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_if_elseif'] = {
  // Else-If condition.
  init: function () {
    this.setColour('#B18E35');
    this.appendDummyInput()
        .appendField("else if");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Add a condition to the if block.");
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_if_else'] = {
  // Else condition.
  init: function () {
    this.setColour('#B18E35');
    this.appendDummyInput()
        .appendField("else");
    this.setPreviousStatement(true);
    this.setTooltip("Add a final, catch-all condition to the if block.");
    this.contextMenu = false;
  }
};

Blockly.Blocks['controls_forRange'] = {
  // For range.
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#forrange",
  init: function () {
    this.setColour('#B18E35');
    //this.setOutput(true, null);
    // Need to deal with variables here
    // [lyn, 11/30/12] Changed variable to be text input box that does renaming right (i.e., avoids variable capture)
    // Old code:
    // this.appendValueInput('VAR').appendField('for range').appendField('variable').setAlign(Blockly.ALIGN_RIGHT);
    // this.appendValueInput('START').setCheck(Number).appendField('start').setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('START')
        .setCheck(['Number'])
        .appendField("for each")
        .appendField(new Blockly.FieldParameterFlydown(Blockly.Msg.LANG_CONTROLS_FORRANGE_INPUT_VAR, true, Blockly.FieldFlydown.DISPLAY_BELOW), 'VAR')
        .appendField("from")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('END')
        .setCheck(['Number'])
        .appendField("to")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('STEP')
        .setCheck(['Number'])
        .appendField("by")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendStatementInput('DO')
        .appendField("do")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Runs the blocks in the 'do' section for each numeric value in the range from start to end, stepping the value each time.  Use the given variable name to refer to the current value.");
  },
  getVars: function () {
    return [this.getFieldValue('VAR')];
  },
  blocksInScope: function () {
    var doBlock = this.getInputTargetBlock('DO');
    if (doBlock) {
      return [doBlock];
    } else {
      return [];
    }
  },
  declaredNames: function () {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function (oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  renameBound: function (boundSubstitution, freeSubstitution) {
    Blockly.LexicalVariable.renameFree(this.getInputTargetBlock('START'), freeSubstitution);
    Blockly.LexicalVariable.renameFree(this.getInputTargetBlock('END'), freeSubstitution);
    Blockly.LexicalVariable.renameFree(this.getInputTargetBlock('STEP'), freeSubstitution);
    var oldIndexVar = this.getFieldValue('VAR');
    var newIndexVar = boundSubstitution.apply(oldIndexVar);
    if (newIndexVar !== oldIndexVar) {
      this.renameVar(oldIndexVar, newIndexVar);
      var indexSubstitution = Blockly.Substitution.simpleSubstitution(oldIndexVar, newIndexVar);
      var extendedFreeSubstitution = freeSubstitution.extend(indexSubstitution);
      Blockly.LexicalVariable.renameFree(this.getInputTargetBlock('DO'), extendedFreeSubstitution);
    } else {
      var removedFreeSubstitution = freeSubstitution.remove([oldIndexVar]);
      Blockly.LexicalVariable.renameFree(this.getInputTargetBlock('DO'), removedFreeSubstitution);
    }
    if (this.nextConnection) {
      var nextBlock = this.nextConnection.targetBlock();
      Blockly.LexicalVariable.renameFree(nextBlock, freeSubstitution);
    }
  },
  renameFree: function (freeSubstitution) {
    var indexVar = this.getFieldValue('VAR');
    var bodyFreeVars = Blockly.LexicalVariable.freeVariables(this.getInputTargetBlock('DO'));
    bodyFreeVars.deleteName(indexVar);
    var renamedBodyFreeVars = bodyFreeVars.renamed(freeSubstitution);
    if (renamedBodyFreeVars.isMember(indexVar)) { // Variable capture!
      var newIndexVar = Blockly.FieldLexicalVariable.nameNotIn(indexVar, renamedBodyFreeVars.toList());
      var boundSubstitution = Blockly.Substitution.simpleSubstitution(indexVar, newIndexVar);
      this.renameBound(boundSubstitution, freeSubstitution);
    } else {
      this.renameBound(new Blockly.Substitution(), freeSubstitution);
    }
  },
  freeVariables: function () { // return the free variables of this block
    var result = Blockly.LexicalVariable.freeVariables(this.getInputTargetBlock('DO'));
    result.deleteName(this.getFieldValue('VAR')); // Remove bound index variable from body free vars
    result.unite(Blockly.LexicalVariable.freeVariables(this.getInputTargetBlock('START')));
    result.unite(Blockly.LexicalVariable.freeVariables(this.getInputTargetBlock('END')));
    result.unite(Blockly.LexicalVariable.freeVariables(this.getInputTargetBlock('STEP')));
    if (this.nextConnection) {
      var nextBlock = this.nextConnection.targetBlock();
      result.unite(Blockly.LexicalVariable.freeVariables(nextBlock));
    }
    return result;
  },
  typeblock: [{translatedName: Blockly.Msg.LANG_CONTROLS_FOREACH_NUMBER_TYPEBLOCK}]
};

Blockly.Blocks['controls_forEach'] = {
  // For each loop.
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#foreach",
  init: function () {
    this.setColour('#B18E35');
    //this.setOutput(true, null);
    // [lyn, 10/07/13] Changed default name from "i" to "item"
    // [lyn, 11/29/12] Changed variable to be text input box that does renaming right (i.e., avoids variable capture)
    // Old code:
    // this.appendValueInput('VAR').appendField('for range').appendField('variable').setAlign(Blockly.ALIGN_RIGHT);
    // this.appendValueInput('START').setCheck(Number).appendField('start').setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('LIST')
        .setCheck(['Array'])
        .appendField("for each")
        .appendField(new Blockly.FieldParameterFlydown("item",
            true, Blockly.FieldFlydown.DISPLAY_BELOW), 'VAR')
        .appendField("in list")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendStatementInput('DO').appendField("do");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Runs the blocks in the 'do'  section for each item in the list.  Use the given variable name to refer to the current list item.");
  },
  getVars: function () {
    return [this.getFieldValue('VAR')];
  },
  blocksInScope: function () {
    var doBlock = this.getInputTargetBlock('DO');
    if (doBlock) {
      return [doBlock];
    } else {
      return [];
    }
  },
  declaredNames: function () {
    return [this.getFieldValue('VAR')];
  },
  renameVar: function (oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'VAR');
    }
  },
  renameBound: function (boundSubstitution, freeSubstitution) {
    Blockly.LexicalVariable.renameFree(this.getInputTargetBlock('LIST'), freeSubstitution);
    var oldIndexVar = this.getFieldValue('VAR');
    var newIndexVar = boundSubstitution.apply(oldIndexVar);
    if (newIndexVar !== oldIndexVar) {
      this.renameVar(oldIndexVar, newIndexVar);
      var indexSubstitution = Blockly.Substitution.simpleSubstitution(oldIndexVar, newIndexVar);
      var extendedFreeSubstitution = freeSubstitution.extend(indexSubstitution);
      Blockly.LexicalVariable.renameFree(this.getInputTargetBlock('DO'), extendedFreeSubstitution);
    } else {
      var removedFreeSubstitution = freeSubstitution.remove([oldIndexVar]);
      Blockly.LexicalVariable.renameFree(this.getInputTargetBlock('DO'), removedFreeSubstitution);
    }
    if (this.nextConnection) {
      var nextBlock = this.nextConnection.targetBlock();
      Blockly.LexicalVariable.renameFree(nextBlock, freeSubstitution);
    }
  },
  renameFree: function (freeSubstitution) {
    var indexVar = this.getFieldValue('VAR');
    var bodyFreeVars = Blockly.LexicalVariable.freeVariables(this.getInputTargetBlock('DO'));
    bodyFreeVars.deleteName(indexVar);
    var renamedBodyFreeVars = bodyFreeVars.renamed(freeSubstitution);
    if (renamedBodyFreeVars.isMember(indexVar)) { // Variable capture!
      var newIndexVar = Blockly.FieldLexicalVariable.nameNotIn(indexVar, renamedBodyFreeVars.toList());
      var boundSubstitution = Blockly.Substitution.simpleSubstitution(indexVar, newIndexVar);
      this.renameBound(boundSubstitution, freeSubstitution);
    } else {
      this.renameBound(new Blockly.Substitution(), freeSubstitution);
    }
  },
  freeVariables: function () { // return the free variables of this block
    var result = Blockly.LexicalVariable.freeVariables(this.getInputTargetBlock('DO'));
    result.deleteName(this.getFieldValue('VAR')); // Remove bound index variable from body free vars
    result.unite(Blockly.LexicalVariable.freeVariables(this.getInputTargetBlock('LIST')));
    if (this.nextConnection) {
      var nextBlock = this.nextConnection.targetBlock();
      result.unite(Blockly.LexicalVariable.freeVariables(nextBlock));
    }
    return result;
  },
  typeblock: [{translatedName: Blockly.Msg.LANG_CONTROLS_FOREACH_ITEM_TYPEBLOCK}]
};

Blockly.Blocks['controls_for_each_dict'] = {
  category: 'Control',

  helpUrl: "/reference/blocks/control.html#foreachdict",

  init: function() {
    this.setColour('#B18E35');
    var checkTypeDict = ['Dictionary'];
    var keyField = new Blockly.FieldParameterFlydown(
        "key",
        true, Blockly.FieldFlydown.DISPLAY_BELOW);
    var valueField = new Blockly.FieldParameterFlydown(
        "value",
        true, Blockly.FieldFlydown.DISPLAY_BELOW);
    this.interpolateMsg("for each %1 with %2 in dictionary %3",
        ['KEY', keyField],
        ['VALUE', valueField],
        ['DICT', checkTypeDict, Blockly.ALIGN_LEFT],
        Blockly.ALIGN_LEFT);
    this.appendStatementInput('DO')
        .appendField("do");
    this.setInputsInline(false);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Runs the blocks in the 'do' section for each key-value entry in the dictionary. Use the given variable names to refer to the key/value of the current dictionary item.");
  },

  getVars: function () {
    return [this.getFieldValue('KEY'), this.getFieldValue('VALUE')];
  },

  blocksInScope: function () {
    var doBlock = this.getInputTargetBlock('DO');
    if (doBlock) {
      return [doBlock];
    } else {
      return [];
    }
  },

  declaredNames: function () {
    return [this.getFieldValue('KEY'), this.getFieldValue('VALUE')];
  },

  renameVar: function (oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('KEY'))) {
      this.setFieldValue(newName, 'KEY');
    }
    if (Blockly.Names.equals(oldName, this.getFieldValue('VALUE'))) {
      this.setFieldValue(newName, 'VALUE');
    }
  },

  renameBound: function (boundSubstitution, freeSubstitution) {
    Blockly.LexicalVariable.renameFree(
        this.getInputTargetBlock('DICT'), freeSubstitution);

    var varFieldIds = ['KEY', 'VALUE'];

    for (var i = 0, fieldId; (fieldId = varFieldIds[i]); i++) {
      var oldVar = this.getFieldValue(fieldId);
      var newVar = boundSubstitution.apply(oldVar);
      if (newVar !== oldVar) {
        this.renameVar(oldVar, newVar);
        var keySubstitution = Blockly.Substitution.simpleSubstitution(
            oldVar, newVar);
        freeSubstitution = freeSubstitution.extend(keySubstitution);
      } else {
        freeSubstitution = freeSubstitution.remove([oldVar]);
      }
    }

    Blockly.LexicalVariable.renameFree(this.getInputTargetBlock('DO'), modifiedSubstitution);

    if (this.nextConnection) {
      var nextBlock = this.nextConnection.targetBlock();
      Blockly.LexicalVariable.renameFree(nextBlock, freeSubstitution);
    }
  },

  renameFree: function (freeSubstitution) {
    var bodyFreeVars = Blockly.LexicalVariable.freeVariables(
        this.getInputTargetBlock('DO'));

    var varFieldIds = ['KEY', 'VALUE'];
    var boundSubstitution = new Blockly.Substitution();

    for (var i = 0, fieldId; (fieldId = varFieldIds[i]); i++) {
      var oldVar = this.getFieldValue(fieldId);
      bodyFreeVars.deleteName(oldVar);
      var renamedBodyFreeVars = bodyFreeVars.renamed(freeSubstitution);
      if (renamedBodyFreeVars.isMember(oldVar)) {
        var newVar = Blockly.FieldLexicalVariable.nameNotIn(
            oldVar, renamedBodyFreeVars.toList());
        var substitution = Blockly.Substitution.simpleSubstitution(
            oldVar, newVar);
        boundSubstitution.extend(substitution);
      }
    }
  },

  freeVariables: function () { // return the free variables of this block
    var result = Blockly.LexicalVariable.freeVariables(
        this.getInputTargetBlock('DO'));

    // Remove bound variables from body free vars.
    result.deleteName(this.getFieldValue('KEY'));
    result.deleteName(this.getFieldValue('VALUE'));

    result.unite(Blockly.LexicalVariable.freeVariables(
        this.getInputTargetBlock('DICT')));

    if (this.nextConnection) {
      var nextBlock = this.nextConnection.targetBlock();
      result.unite(Blockly.LexicalVariable.freeVariables(nextBlock));
    }

    return result;
  },
  typeblock: [{translatedName: "for each in dictionary"}]
};

Blockly.Blocks['controls_while'] = {
  // While condition.
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#while",
  init: function () {
    this.setColour('#B18E35');
    this.appendValueInput('TEST')
        .setCheck(['Boolean'])
        .appendField("while")
        .appendField("test")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendStatementInput('DO')
        .appendField("do")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Runs the blocks in the 'do' section while the test is true.");
  },
  typeblock: [{translatedName: "while"}]
};

// [lyn, 01/15/2013] Remove DO C-sockets because now handled more modularly by DO-THEN-RETURN block.
Blockly.Blocks['controls_choose'] = {
  // Choose.
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#choose",
  init: function () {
    this.setColour('#B18E35');
    this.setOutput(true, null);
    this.appendValueInput('TEST')
        .setCheck(['Boolean'])
        .appendField("if")
        .appendField("")
        .setAlign(Blockly.ALIGN_RIGHT);
    // this.appendStatementInput('DO0').appendField('then-do').setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('THENRETURN')
        .appendField("then")
        .setAlign(Blockly.ALIGN_RIGHT);
    // this.appendStatementInput('ELSE').appendField('else-do').setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('ELSERETURN')
        .appendField("else")
        .setAlign(Blockly.ALIGN_RIGHT);
    /* this.setTooltip('If the condition being tested is true, the agent will '
     + 'run all the blocks attached to the \'then-do\' section and return the value attached '
     + 'to the \'then-return\'slot. Otherwise, the agent will run all blocks attached to '
     + 'the \'else-do\' section and return the value in the \'else-return\' slot.');
     */
    // [lyn, 01/15/2013] Edit description to be consistent with changes to slots.
    this.setTooltip("If the condition being tested is true,return the result of evaluating the expression attached to the 'then-return' slot;otherwise return the result of evaluating the expression attached to the 'else-return' slot;at most one of the return slot expressions will be evaluated.");
  },
  typeblock: [{
    translatedName: "if" + ' ' +
    "then" + ' ' +
    "else"
  }]
};

// [lyn, 10/10/13] This used to be in the control drawer as well as the procedure drawer
// but someone removed it from the control drawer. I think it still belongs here.
Blockly.Blocks['controls_do_then_return'] = {
  // String length.
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#doreturn",
  init: function () {
    this.setColour('#B18E35');
    this.appendStatementInput('STM')
        .appendField("do");
    this.appendValueInput('VALUE')
        .appendField("result")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setOutput(true, null);
    this.setTooltip("Runs the blocks in 'do' and returns a statement. Useful if you need to run a procedure before returning a value to a variable.");
  },
  typeblock: [{translatedName: "do result"}]
};

// [lyn, 01/15/2013] Added
Blockly.Blocks['controls_eval_but_ignore'] = {
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#evaluate",
  init: function () {
    this.setColour('#B18E35');
    this.appendValueInput('VALUE')
        .appendField("evaluate but ignore result");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("Runs the connected block of code and ignores the return value (if any). Useful if need to call a procedure with a return value but don't need the value.");
  },
  typeblock: [{translatedName: "evaluate but ignore result"}]
};

Blockly.Blocks['controls_openAnotherScreen'] = {
  // Open another screen
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#openscreen",
  init: function () {
    this.setColour('#B18E35');
    this.appendValueInput('SCREEN')
        .appendField("open another screen")
        .appendField("screenName")
        .setAlign(Blockly.ALIGN_RIGHT)
        .setCheck(['String']);
    this.setPreviousStatement(true);
    this.setTooltip("Opens a new screen in a multiple screen app. You should not use this block to return to Screen1. Use the close screen block instead.");
  },
  typeblock: [{translatedName: "open another screen"}]
};

Blockly.Blocks['controls_openAnotherScreenWithStartValue'] = {
  // Open another screen with start value
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#openscreenwithvalue",
  init: function () {
    this.setColour('#B18E35');
    this.appendValueInput('SCREENNAME')
        .setCheck(['String'])
        .appendField("open another screen with start value")
        .appendField("screenName")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.appendValueInput('STARTVALUE')
        .appendField("startValue")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setTooltip("Opens a new screen in a multiple screen app and passes the start value to that screen.");
  },
  typeblock: [{translatedName: "open another screen with start value"}]
};

Blockly.Blocks['controls_getStartValue'] = {
  // Get start value
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#getstartvalue",
  init: function () {
    this.setColour('#B18E35');
    this.setOutput(true, null);
    this.appendDummyInput()
        .appendField("get start value");
    this.setTooltip("Returns the value that was passed to this screen when it was opened, typically by another screen in a multiple-screen app. If no value was passed, returns the empty text.");
  },
  typeblock: [{translatedName: "get start value"}]
};

Blockly.Blocks['controls_closeScreen'] = {
  // Close screen
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#closescreen",
  init: function () {
    this.setColour('#B18E35');
    this.appendDummyInput()
        .appendField("close screen");
    this.setPreviousStatement(true);
    this.setTooltip("Close the current screen");
  },
  typeblock: [{translatedName: "close screen"}]
};

Blockly.Blocks['controls_closeScreenWithValue'] = {
  // Close screen with value
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#closescreenwithvalue",
  init: function () {
    this.setColour('#B18E35');
    this.appendValueInput('SCREEN')
        .appendField("close screen with value")
        .appendField("result")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setTooltip("Closes the current screen and returns a result to the screen that opened this one.");
  },
  typeblock: [{translatedName: "close screen with value"}]
};

Blockly.Blocks['controls_closeApplication'] = {
  // Close application
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#closeapp",
  init: function () {
    this.setColour('#B18E35');
    this.appendDummyInput().appendField("close application");
    this.setPreviousStatement(true);
    this.setTooltip("Closes all screens in this app and stops the app.");
  },
  typeblock: [{translatedName: "close application"}]
};

Blockly.Blocks['controls_getPlainStartText'] = {
  // Get plain start text
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#getplainstarttext",
  init: function () {
    this.setColour('#B18E35');
    this.setOutput(true, ['Number', 'String', 'Key']);
    this.appendDummyInput()
        .appendField("get plain start text");
    this.setTooltip("Returns the plain text that was passed to this screen when it was started by another app. If no value was passed, returns the empty text. For multiple screen apps, use get start value rather than get plain start text.");
  },
  typeblock: [{translatedName: "get plain start text"}]
};

Blockly.Blocks['controls_closeScreenWithPlainText'] = {
  // Close screen with plain text
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#closescreenwithplaintext",
  init: function () {
    this.setColour('#B18E35');
    this.appendValueInput('TEXT')
        .setCheck(['String'])
        .appendField("close screen with plain text")
        .appendField("text")
        .setAlign(Blockly.ALIGN_RIGHT);
    this.setPreviousStatement(true);
    this.setTooltip("Closes the current screen and returns text to the app that opened this one.   This command is for returning text to non-App Inventor activities, not to App Inventor screens. For App Inventor Screens, as in multiple screen apps, use Close Screen with Value, not Close Screen with Plain Text.");
  },
  typeblock: [{translatedName: "close screen with plain text"}]
};

Blockly.Blocks['controls_break'] = {
    // generate a call to break (the escape from loops)
  category: 'Control',
  helpUrl: "/reference/blocks/control.html#break",
  init: function () {
    this.setColour('#B18E35');
    this.appendDummyInput()
        .appendField("break");
    this.setPreviousStatement(true);
    this.setTooltip("Break out of the containing loop.");
    this.errors = [{name:"checkIsNotInLoop"}];
  },
  typeblock: [{translatedName: "break"}]
};



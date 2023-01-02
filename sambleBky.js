Blockly.Blocks['block_type'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["option","OPTIONNAME"],
                ["option","OPTIONNAME"],
                ["option","OPTIONNAME"]
            ]), "NAME");
        this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
    }
};
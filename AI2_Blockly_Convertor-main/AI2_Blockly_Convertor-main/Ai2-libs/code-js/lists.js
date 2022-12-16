

Blockly.JavaScript['lists_add_items'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) + '.push(' + Blockly.JavaScript.valueToCode(block, 'ITEM0', Blockly.JavaScript.ORDER_ATOMIC) + ');'
}

Blockly.JavaScript['lists_is_in'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC) + 'in' + Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC)
}

Blockly.JavaScript['lists_is_empty'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) + '.length==0'
}

Blockly.JavaScript['lists_pick_random_item'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) + '[' + 'Math.floor(Math.random()*' + Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) + '.length)' + ']'
}

Blockly.JavaScript['lists_position_in'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) + '.indexOf(' + Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC) + ')'
}

Blockly.JavaScript['lists_select_item'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) + '[' + Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) + ']'
}

Blockly.JavaScript['lists_insert_item'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) + '.splice('
        + Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_ATOMIC) + ',0,' + Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC) + ');';
}

Blockly.JavaScript['lists_replace_item'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) + '[' + Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) + '] = ' + Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC)
}

Blockly.JavaScript['lists_remove_item'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) + '.splice(' + Blockly.JavaScript.valueToCode(block, 'NUM', Blockly.JavaScript.ORDER_ATOMIC) + ',1);'
}

Blockly.JavaScript['lists_append_list'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'LIST0', Blockly.JavaScript.ORDER_ATOMIC) + '.concat(' + Blockly.JavaScript.valueToCode(block, 'LIST1', Blockly.JavaScript.ORDER_ATOMIC) + ');'
}

Blockly.JavaScript['lists_copy'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC)
}

Blockly.JavaScript['lists_is_list'] = function(block){
    return 'typeof '+ Blockly.JavaScript.valueToCode(block, 'ITEM', Blockly.JavaScript.ORDER_ATOMIC) + ' === "array"'
}

Blockly.JavaScript['lists_reverse'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) + '.reverse();'
}

Blockly.JavaScript['lists_to_csv_row'] = function(block){
    return ''
}

Blockly.JavaScript['lists_to_csv_table'] = function(block){
    return ''
}

Blockly.JavaScript['lists_from_csv_row'] = function(block){
    return ''
}

Blockly.JavaScript['lists_from_csv_table'] = function(block){
    return ''
}

Blockly.JavaScript['lists_lookup_in_pairs'] = function(block){
    return ''
}

Blockly.JavaScript['lists_join_with_separator'] = function(block){
    return Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_ATOMIC) + '.join(' + Blockly.JavaScript.valueToCode(block, 'SEPERATOR', Blockly.JavaScript.ORDER_ATOMIC) + ')' 
}
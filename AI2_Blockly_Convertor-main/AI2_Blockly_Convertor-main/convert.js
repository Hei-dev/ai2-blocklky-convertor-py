function startConvert(bkyfile){
    var bkyxml = bkyfile.split("\n")
    var lstr
    var i;
    var bkstack;

    bkyfile = bkyfile.replaceAll('lists_is_empty', 'lists_isEmpty');
    bkyfile = bkyfile.replaceAll('lists_position_in', 'lists_indexOf');
    bkyfile = bkyfile.replaceAll('lists_select_item', 'lists_getIndex');
    bkyfile = bkyfile.replaceAll('controls_forRange', 'controls_for');
    bkyfile = bkyfile.replaceAll('controls_while', 'controls_whileUntil');
    bkyfile = bkyfile.replaceAll('color_black', 'color_picker');
    bkyfile = bkyfile.replaceAll('color_white', 'color_picker');
    bkyfile = bkyfile.replaceAll('color_red', 'color_picker');
    bkyfile = bkyfile.replaceAll('color_yellow', 'color_picker');
    bkyfile = bkyfile.replaceAll('color_green', 'color_picker');
    bkyfile = bkyfile.replaceAll('color_blue', 'color_picker');
    bkyfile = bkyfile.replaceAll('color_magenta', 'color_picker');
    bkyfile = bkyfile.replaceAll('color_make_color', 'color_rgb');
    bkyfile = bkyfile.replaceAll('math_compare', 'logic_compare');
    bkyfile = bkyfile.replaceAll('math_add', 'math_arithmetic');
    bkyfile = bkyfile.replaceAll('math_subtract', 'math_random_float');
    bkyfile = bkyfile.replaceAll('math_multiply', 'math_arithmetic');
    bkyfile = bkyfile.replaceAll('math_division', 'math_arithmetic');
    bkyfile = bkyfile.replaceAll('math_power', 'math_arithmetic');
    bkyfile = bkyfile.replaceAll('math_abs', 'math_single');
    bkyfile = bkyfile.replaceAll('math_neg', 'math_arithmetic');
    bkyfile = bkyfile.replaceAll('math_ceiling', 'math_round');
    bkyfile = bkyfile.replaceAll('math_floor', 'math_round');
    bkyfile = bkyfile.replaceAll('math_divide', 'math_modulo');
    bkyfile = bkyfile.replaceAll('text_split', 'lists_split');
    bkyfile = bkyfile.replaceAll('text_split_at_spaces', 'lists_split');
    bkyfile = bkyfile.replaceAll('text_segment', 'text_getSubstring');
    bkyfile = bkyfile.replaceAll('logic_boolean', 'logic_compare');
    bkyfile = bkyfile.replaceAll('logic_false', 'logic_boolean');
    bkyfile = bkyfile.replaceAll('logic_or', 'logic_negate');

    for(i=0;i<bkyxml.length;i++){ //Special blocks that will be converted to differents block type.
        lstr = bkyxml[i]
        lstr = String(lstr).replace(/<block type="math_compare"/g,"<block type=\"logic_compare\"")
        lstr = lstr.replaceAll('lists_is_empty', 'lists_isEmpty');
        lstr = lstr.replaceAll('lists_position_in', 'lists_indexOf');
        lstr = lstr.replaceAll('lists_select_item', 'lists_getIndex');
        lstr = lstr.replaceAll('controls_forRange', 'controls_for');
        lstr = lstr.replaceAll('controls_while', 'controls_whileUntil');
        lstr = lstr.replaceAll('color_black', 'color_picker');
        lstr = lstr.replaceAll('color_white', 'color_picker');
        lstr = lstr.replaceAll('color_red', 'color_picker');
        lstr = lstr.replaceAll('color_yellow', 'color_picker');
        lstr = lstr.replaceAll('color_green', 'color_picker');
        lstr = lstr.replaceAll('color_blue', 'color_picker');
        lstr = lstr.replaceAll('color_magenta', 'color_picker');
        lstr = lstr.replaceAll('color_make_color', 'color_rgb');
        lstr = lstr.replaceAll('math_compare', 'logic_compare');
        lstr = lstr.replaceAll('math_add', 'math_arithmetic');
        lstr = lstr.replaceAll('math_subtract', 'math_random_float');
        lstr = lstr.replaceAll('math_multiply', 'math_arithmetic');
        lstr = lstr.replaceAll('math_division', 'math_arithmetic');
        lstr = lstr.replaceAll('math_power', 'math_arithmetic');
        lstr = lstr.replaceAll('math_abs', 'math_single');
        lstr = lstr.replaceAll('math_neg', 'math_arithmetic');
        lstr = lstr.replaceAll('math_ceiling', 'math_round');
        lstr = lstr.replaceAll('math_floor', 'math_round');
        lstr = lstr.replaceAll('math_divide', 'math_modulo');
        lstr = lstr.replaceAll('text_split', 'lists_split');
        lstr = lstr.replaceAll('text_split_at_spaces', 'lists_split');
        lstr = lstr.replaceAll('text_segment', 'text_getSubstring');
        lstr = lstr.replaceAll('logic_boolean', 'logic_compare');
        lstr = lstr.replaceAll('logic_false', 'logic_boolean');
        lstr = lstr.replaceAll('logic_or', 'logic_negate');

    }
    console.log(bkyfile)

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(bkyfile),Blockly.getMainWorkspace())
}

function toCode(block){

}
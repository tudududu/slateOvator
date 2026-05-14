var w = new Window('dialog', 'Autosize Test');
    w.margins = 10;

    // Dialog Width To Be Defined:
    var w_width = 450;

    // Stactic Text To Be Defined:
    w_statictext = 'This is a dynamically sized message. It can be short or it can be very long. \nIt should wrap nicely and the box should grow vertically to fit the text without cutting off or overflowing weirdly. \n\nThis Solution is not mine but written by Marc Autret from Indiscripts in July 2013.';
//  80 below is somewhat arbitrary. Run the script and see where the first line ends. Adjust w_static text to a bit longer than that. Uncomment the line below to get the text length, Use that in the "if" statement.
//alert (w_statictext.length)
if (w_statictext.length < 80 && w_statictext.indexOf("\r")===-1 && w_statictext.indexOf("\n")===-1) {
// single line
     var st = w.add('statictext', undefined, w_statictext);
}else{
// multiline    
    var st = w.add('statictext', undefined, 'X', {multiline: true});
    // if not using standard font size, Font must be defined below, even if using set_font, or the message will truncate unpredictably.
    st.graphics.font="Tahoma:14";
    var X_width = st.preferredSize[0];
    with(st){preferredSize = [-1,-1]; characters = ~~(w_width/X_width); preferredSize[1] = -1;};
    st.text = w_statictext;
}
    // "Close" Button:
    w.add('button', undefined, 'Close', {name: 'OK'});
set_font (w, "Tahoma:14");
w.show();

function set_font (control, font) {
    for (var i = 0; i < control.children.length; i++) {
    if ("GroupPanel".indexOf (control.children[i].constructor.name) > -1)
    set_font (control.children[i], font);
    else
    control.children[i].graphics.font = font;
    }
}//--end set_font;
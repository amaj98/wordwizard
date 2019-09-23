var ready = () =>{
    $('#game').text("Press any key to start")
    $(document).keydown(()=>{
        $('#game').text("")
        startGame()});
}
var startGame = ()=>{
    $(document).keydown(inputHandler);
}

var inputHandler = (evt)=>{
    if(evt.keyCode== 13){
        //submit for input
        $('#play').text("");
    }
    else if (evt.keyCode >= 65 && evt.keyCode<=90){
        $('#play').text(($('#play').text() + evt.key).toUpperCase());
    }
    else if(evt.keyCode == 8){
        $('#play').text($('#play').text().slice(0,-1));
    }
}
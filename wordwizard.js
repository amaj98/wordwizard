var ready = () =>{
    
    $(document).on("click", function(){

        $.ajax({

            method: "GET",

            url: "api.php",

            success: data=>{$(document).text(data)}

        });

      });
    $('#game').text("Press Enter to start")

    $(document).keydown((evt)=>{
        if(evt.key == 'Enter'){
            $('#game').text("");
            $(document).off('keydown')
            startGame();}
        });
}
var startGame = ()=>{
    $('#game').append("<div id = 'guesses'></div>")
    $('#game').append("<div id = 'letterbank'>LETTERS</div>")
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
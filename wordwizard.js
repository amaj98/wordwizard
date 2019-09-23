var ready = () =>{
    /*
    $('body').empty();
    $('body').text('abc');
    $('body').on('click',()=>{$.post("api.php",{"words":"abc,123,456"},(data)=>$('body').text(JSON.stringify(data)))});
    $('body').on('keydown',()=>{$.get("api.php",(data)=>$('body').text(JSON.stringify(data)))});
    
    */
   
    $('#game').text("Press Enter to start")

    $(document).keydown((evt)=>{
        if(evt.key == 'Enter'){
            $('#game').text("");
            $(document).off('keydown')
            startGame();}
        });
}


var startGame = ()=>{
    $('#game').append("<div id = 'guesses'></div>");
    $('#game').append("<div id = 'letterbank'>letter bank</div>");
    jQuery.ajaxSetup({async:false});
    let letters = ""
    $.get("api.php",(data)=>letters = data["rack"]);
    let combos = combinations(letters);
    console.log(...combos);
    $('#letterbank').append("<div class = 'letters text-center' id = 'letters'>" + [...letters].join(' ') + "</div>");
    $(document).keydown(inputHandler);
}

var combinations = (letters)=>{
    let combos = [];
    let f = (prefix, letters)=> {
      for (var i = 0; i < letters.length; i++) {
        result.push(prefix + letters[i]);
        f(prefix + letterss[i], letters.slice(i + 1));
      }
    }
    f('', letters);
    return combos;
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
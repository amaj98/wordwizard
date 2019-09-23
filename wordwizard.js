var ready = () =>{
    $('body').empty();
    $('body').text('abc');
    $('body').on('click',()=>{$.post("api.php",'["A","B","AB"]',(data)=>$('body').text(JSON.stringify(data)))});
    $('body').on('keydown',()=>{$.get("api.php",(data)=>$('body').text(JSON.stringify(data)))});
    
    
   /*
    $('#game').text("Press Enter to start")

    $(document).keydown((evt)=>{
        if(evt.key == 'Enter'){
            $('#game').text("");
            $(document).off('keydown')
            startGame();}
        });*/
}


var startGame = ()=>{
    $('#game').append("<div id = 'guesses'></div>");
    $('#game').append("<div id = 'letterbank'>letter bank</div>");;    
    $.get("api.php",(data)=> processRack(data["rack"]));
}

var processRack = (rack) => {
    let combos = combinations(rack);
    console.log(JSON.stringify(combos));
    $.post("api.php",JSON.stringify(combos),(data)=>processWords(data));
    $('#letterbank').append("<div class = 'letters text-center' id = 'letters'>" + [...rack].join(' ') + "</div>");
    
}

var processWords = (words) =>{
    console.log('processing words');
    console.log(words);
    $(document).keydown(inputHandler);
}

var combinations = (letters)=>{
    let combos = [];
    let f = (prefix, letters)=> {
      for (var i = 0; i < letters.length; i++) {
        combos.push(prefix + letters[i]);
        f(prefix + letters[i], letters.slice(i + 1));
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
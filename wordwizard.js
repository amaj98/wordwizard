var ready = () =>{
   
    $('#game').text("Press Enter to start")

    $(document).keydown((evt)=>{
        if(evt.key == 'Enter'){
            $('#game').text("");
            $(document).off('keydown')
            $('#play').text("");
            startGame();}
        });
}


var startGame = ()=>{
    $('#game').append("<div id = 'words'></div>");
    $('#game').append("<div id = 'letterbank'>letter bank</div>");;    
    $.get("api.php",(data)=> processRack(data['rack']));
}

var processRack = (rack) => {
    let combos = combinations(rack);
    console.log(JSON.stringify(combos));
    $.post("api.php",{"words":JSON.stringify(combos)},(data)=>processWords(data));
    $('#letterbank').append("<div class = 'letters text-center' id = 'letters'>" + [...rack].join(' ') + "</div>");
    
}
var wordMap = {}

var processWords = (words) =>{
    words = words.filter(word => word.length>=3);
    for(word of words){
        wordMap[word] = $("<div class = 'word'>" + [...word].map(l=>'_').join(' ') + "</div>").appendTo($('#words'));
    }
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
    return [...new Set(combos)];
}

var inputHandler = (evt)=>{
    if(evt.keyCode== 13){
        let w = $('#play').text();
        if(w in wordMap) wordMap[w].text(w);

        $('#play').text("");
    }
    else if (evt.keyCode >= 65 && evt.keyCode<=90){
        $('#play').text(($('#play').text() + evt.key).toUpperCase());
    }
    else if(evt.keyCode == 8){
        $('#play').text($('#play').text().slice(0,-1));
    }
}
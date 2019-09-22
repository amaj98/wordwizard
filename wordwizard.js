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


let showRacks = function(racks){

    $("#bingos").html('');

    racks.map(rack=>{

      $("#bingos").append(`<li>${rack.rack}: <span class="answer hidden">${rack.words}</span></li>`);

    });

    $("#bingos li").on("click", function(evt){

      $(evt.currentTarget).find(".answer").toggleClass("hidden");

    });

  }

  

  $("#grabmore").on("click", function(){

    $.ajax({

        method: "GET",

        url: "api.php",

        success: data=>{ showRacks(data)}

    });

  });
$(document).ready(function(){
    
    var d = new Date
    
    if (d.getDate() == birthDay && d.getMonth() == birthMonth - 1) {

        for (var i = 0; i < 300; i++) {
          create(i);
        }

        function create(i) {
          var width = Math.floor((Math.random() * 6) + 5);
          var height = width * 0.4;
          var colourIdx = Math.ceil(Math.random() * 3);
          var colour = "red";
          switch(colourIdx) {
            case 1:
              colour = "yellow";
              break;
            case 2:
              colour = "blue";
              break;
            default:
              colour = "red";
          }



          $('<div class="confetti-'+i+' '+colour+'"></div>').css({
            "width" : width+"px",
            "height" : height+"px",
            "top" : -Math.random()*20+"%",
            "left" : Math.random()*100+"%",
            "opacity" : Math.random()+0.5,
            "transform" : "rotate("+Math.random()*360+"deg)"
          }).appendTo($( "#body" ));  

          drop(i);
        }

        function drop(x) {
          $('.confetti-'+x).animate({
            top: "100%",
            left: "+="+Math.random()*15+"%"
          }, Math.random()*3000 + 3000, function() {
            reset(x);
          });
        }

        function reset(x) {
          $('.confetti-'+x).animate({
            "top" : -Math.random()*20+"%",
            "left" : "-="+Math.random()*15+"%"
          }, 0, function() {
            drop(x);             
          });
        }
        
    }
    
});
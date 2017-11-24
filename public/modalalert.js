var modal = document.getElementById('alarm');
var titlebar = document.getElementById("titlebar");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];



window.onkeydown = function (event) {
    var x = event.keyCode;
    if (x == 38) {
        modal.style.display = "block";
        annyang.start();
    }
}

span.onclick = function () {
    modal.style.display = "none";
    annyang.abort();
}

// voice recognition defined here, called in onkeydown function above
if ((annyang)) {
    
    var commands = {
        'close': function () {
            console.log("heard");

            modal.style.display = "none";
            annyang.abort();
        }
    };

   
    annyang.addCommands(commands);
    annyang.debug();

   

}



// Get the modal
var modal = document.getElementById('alarm');

var titlebar = document.getElementById("titlebar");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



window.onkeydown = function(event) {
    var x = event.keyCode;
    if (x == 38){
        modal.style.display ="block";
        annyang.start();
    } 
}    

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    annyang.abort();
}

if ((annyang)) {
    console.log("Here");
    // Let's define our first command. First the text we expect, and then the function it should call
    var commands = {
      'close': function() {
            console.log("heard");
            
            modal.style.display = "none";
            annyang.abort();
        }
    };
  
    // Add our commands to annyang
    annyang.addCommands(commands);
    annyang.debug();
  
    // Start listening. You can call this here, or attach this call to an event, button, etc.
    
}

// Implement a voice closing function here

// When the user clicks anywhere outside of the modal, close it
//window.onclick = function(event) {
//    if (event.target == modal) {
//        modal.style.display = "none";
//    }
//}
// laver først jquery chaining, hvor jeg laver en funktion, hvor når man klikker på knappen show, så bliver teksten(mit article id "description") hvid og teksten glider op og ned, når man trykker på knappen.

$(document).ready(function(){
$("#Show").click(function(){
     $("#description").css("color",  "#fff")
     .slideUp(2000)
     .slideDown(2000);
});
});



document.getElementById('h1').style.color = "#2c226b";
document.getElementById('h1').style.fontSize="1.2em";
document.getElementById('h1').style.fontWeight="700";
//styler her min overskrift "h1" med javascript.

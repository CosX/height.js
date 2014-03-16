$(document).ready(function(){
  rsHeight.fillscreen($(".ala"));
  var holdsettimeout;
  window.addEventListener('resize', function(){
    clearTimeout(holdsettimeout);
    holdsettimeout = setTimeout(function () {
  		rsHeight.fillscreen($(".ala"));
  	}, 1000);
  });
});

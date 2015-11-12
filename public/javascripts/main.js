//Used only for mocks - remove this!

$(document).ready(function () {
  $( ".title-toggle" ).click(function() {
    $( this ).parent().toggleClass( "active" );
  });

  $( ".btn-style-a" ).click(function() {
    $( ".widget-box" ).removeClass( "style-b" ).addClass( "style-a" );
  });
  $( ".btn-style-b" ).click(function() {
    $( ".widget-box" ).removeClass( "style-a" ).addClass( "style-b" );
  });

  $( ".togle-bg a.dark" ).click(function() {
    $( ".prev-view" ).removeClass("light").removeClass("grey").addClass( "dark" );
  });
  $( ".togle-bg a.grey" ).click(function() {
    $( ".prev-view" ).removeClass("light").removeClass("black").addClass( "grey" );
  });
  $( ".togle-bg a.light" ).click(function() {
    $( ".prev-view" ).removeClass("black").removeClass("grey").addClass( "light" );
  });

  $("#launch_call").click(function(e) {
    e.preventDefault();
    makeCall();
  });

  $("#hangup_call").click(function(e) {
    e.preventDefault();
    voxbone.WebRTC.hangup();
  });

  $('.codebox-actions a').click(function(e) {
    e.preventDefault();
  });
});

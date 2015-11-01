$(document).ready(function () {
  $( ".title-toggle" ).click(function() {
    $( this ).parent().toggleClass( "active" );
  });
});


$(document).ready(function () {
  $( ".btn-style-a" ).click(function() {
    $( ".widget-box" ).removeClass( "style-b" ).addClass( "style-a" );
  });
  $( ".btn-style-b" ).click(function() {
    $( ".widget-box" ).removeClass( "style-a" ).addClass( "style-b" );
  });
});

$(document).ready(function () {
  $( ".togle-bg a.dark" ).click(function() {
    $( ".prev-view" ).removeClass("light").removeClass("grey").addClass( "dark" );
  });
  $( ".togle-bg a.grey" ).click(function() {
    $( ".prev-view" ).removeClass("light").removeClass("black").addClass( "grey" );
  });
  $( ".togle-bg a.light" ).click(function() {
    $( ".prev-view" ).removeClass("black").removeClass("grey").addClass( "light" );
  });
});

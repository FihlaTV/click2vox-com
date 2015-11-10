$(document).ready(function () {

  $("#launch_call").click(function(e) {
    e.preventDefault();
    makeCall();
  });

  $('.voxButton').load($('.voxButton').attr('href'));
  $('.voxButton').show();

});

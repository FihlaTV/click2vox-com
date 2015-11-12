$(document).ready(function () {
  $('#control').append(' \
    <div class="vox-widget-wrapper hidden"> \
      <div class="vw-main"> \
        <div class="vw-header"> \
          <span class="vw-title"> \
            In Call \
          </span> \
          <div class="vw-actions"> \
            <a href="#" id="full-screen"><i class="vw-icon vx-icon-full-screen-off"></i></a> \
            <a href="#" id="close-screen"><i class="vw-icon vx-icon-close"></i></a> \
          </div> \
        </div> \
        <div class="vw-body"> \
          <div class="vw-btn-group"> \
            <a href="#"> \
              <i class="vw-icon vx-icon-mic"></i> \
              <div id="microphone" class="int-sensor"> \
                <em class="on"></em> \
                <em class="on"></em> \
                <em class="on"></em> \
              </div> \
            </a> \
            <a href="#" class="hidden"> \
              <i class="vw-icon vx-icon-vol"></i> \
              <div id="volume" class="int-sensor"> \
                <em class="on"></em> \
                <em class="on"></em> \
                <em class="on"></em> \
              </div> \
            </a> \
            <a href="#" id="dialpad"><i class="vw-icon vx-icon-pad"></i></a> \
          </div> \
          <a href="#" class="vw-end-call"><i class="vw-icon vx-icon-phone"></i>End Call</a> \
          <div class="vw-dialpad"> \
            <ul> \
              <li class="vw-tl">1</li> \
              <li>2</li> \
              <li class="vw-tr">3</li> \
              <li>4</li> \
              <li>5</li> \
              <li>6</li> \
              <li>7</li> \
              <li>8</li> \
              <li>9</li> \
              <li class="vw-bl">*</li> \
              <li>0</li> \
              <li class="vw-br">#</li> \
            </ul> \
          </div> \
          <div class="vw-footer"> \
            <a href="https://voxbone.com" target="_blank">powered by:</a> \
          </div> \
        </div> \
      </div> \
    </div> \
  ');

  window.addEventListener('message', function(event) {
    console.log(event.data);
    if(event.data == 'openWidget') {
      $(".vox-widget-wrapper").removeClass('hidden');
    };
  });

  $('.vw-dialpad li').click(function(e) {
    e.preventDefault();
    $('#call_button_frame')[0].contentWindow.postMessage(this.textContent,'*');
  });

  $(".vw-end-call").click(function(e) {
    e.preventDefault();
    $('#call_button_frame')[0].contentWindow.postMessage('hang_up','*');
  });

  $("#close-screen i").click(function(e) {
    e.preventDefault();
    $(".vox-widget-wrapper").addClass('hidden');
    $('#call_button_frame')[0].contentWindow.postMessage('hang_up','*');
  });

  $("#full-screen i").click(function(e) {
    e.preventDefault();
    $(".vw-body").toggleClass('hidden');
    $(this).toggleClass('vx-icon-full-screen-on').toggleClass('vx-icon-full-screen-off');
  });

  $(".vw-icon.vx-icon-pad").click(function(e) {
    e.preventDefault();
    $("#dialpad").toggleClass('active');
    $(".vw-dialpad").toggleClass('active');
  });

  $(".vw-icon.vx-icon-mic").click(function(e) {
    e.preventDefault();
    $("#microphone em").toggleClass('on').toggleClass('off');
    $('#call_button_frame')[0].contentWindow.postMessage('microphone-mute','*');
  });

  $(".vw-icon.vx-icon-vol").click(function(e) {
    e.preventDefault();
    $("#volume em").toggleClass('on').toggleClass('off');
    $('#call_button_frame')[0].contentWindow.postMessage('volume-mute','*');
  });
});


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
        <div id="vw-body" class="vw-body"> \
          <div id="vw-btn-group" class="vw-btn-group"> \
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
          <div id="vw-dialpad" class="vw-dialpad"> \
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
          <div id="vw-footer" class="vw-footer"> \
            <a href="https://voxbone.com" target="_blank">powered by:</a> \
          </div> \
        </div> \
        <div id="vw-message" class="vw-body hidden">Message!</div> \
      </div> \
    </div> \
  ');

  window.addEventListener('message', function(event) {
    // console.log(event.data);
    switch(event.data) {
      case 'openWidgetWithoutDialPad':
        $("#dialpad").addClass('hidden');
        $(".vox-widget-wrapper").removeClass('hidden');
        break;
      case 'openWidget':
        $(".vox-widget-wrapper").removeClass('hidden');
        break;
      case 'setMessage':
        $(".vox-widget-wrapper .vw-body").addClass('hidden');
        $("#full-screen").addClass('hidden');
        $(".vox-widget-wrapper #vw-message").removeClass('hidden');
        $(".vox-widget-wrapper #vw-message")[0].innerHTML = 'Browser does NOT support WebRTC!';
        $(".vox-widget-wrapper").removeClass('hidden');
        break;
      };
  });

  function is_iframe() {
    return $('#call_button_frame').length > 0;
  };

  function call_action(message) {
    // console.log(message);
    if (is_iframe()) {
      $('#call_button_frame')[0].contentWindow.postMessage(message, '*');
    } else {
      send_voxbone_interaction(message);
    };
  };

  $('.vw-dialpad li').click(function(e) {
    e.preventDefault();
    call_action(this.textContent);
  });

  $(".vw-end-call").click(function(e) {
    e.preventDefault();
    call_action('hang_up');
  });

  $("#close-screen i").click(function(e) {
    e.preventDefault();
    $(".vox-widget-wrapper").addClass('hidden');
    call_action('hang_up');
  });

  $("#full-screen i").click(function(e) {
    e.preventDefault();
    $("#vw-body").toggleClass('hidden');
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
    call_action('microphone-mute');
  });

  $(".vw-icon.vx-icon-vol").click(function(e) {
    e.preventDefault();
    $("#volume em").toggleClass('on').toggleClass('off');
    call_action('volume-mute');
  });
});

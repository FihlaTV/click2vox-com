$(document).ready(function () {
  $('#control').append(' \
    <div class="vox-widget-wrapper hidden"> \
      <div class="vw-main"> \
        <div class="vw-header"> \
          <span class="vw-title" id="vw-title">Starting Call</span> \
          <span class="vw-animated-dots">.</span> \
          <span class="vw-animated-dots">.</span> \
          <span class="vw-animated-dots">.</span> \
          <div class="vw-actions"> \
            <a href="#" id="full-screen"><i class="vw-icon vx-icon-full-screen-off"></i></a> \
            <a href="#" id="close-screen"><i class="vw-icon vx-icon-close"></i></a> \
          </div> \
        </div> \
        <div id="vw-body" class="vw-body"> \
          <div id="vw-in-call"> \
            <div id="vw-btn-group" class="vw-btn-group"> \
              <a href="#"> \
                <i class="vw-icon vx-icon-mic"></i> \
                <div id="microphone" class="int-sensor"> \
                  <em id="mic5"></em> \
                  <em id="mic4"></em> \
                  <em id="mic3"></em> \
                  <em id="mic2"></em> \
                  <em id="mic1"></em> \
                </div> \
              </a> \
              <a href="#" class="hidden"> \
                <i class="vw-icon vx-icon-vol"></i> \
                <div id="volume" class="int-sensor"> \
                  <em id="vol5"></em> \
                  <em id="vol4"></em> \
                  <em id="vol3"></em> \
                  <em id="vol2"></em> \
                  <em id="vol1"></em> \
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
          </div> \
          <div id="vw-rating" class="vw-rating hidden"> \
            <div id="vw-rating-question" class="vw-question">How was the quality of your call?</div> \
            <div id="vw-rating-stars" class="vw-stars"></div> \
            <div id="vw-rating-message" class="vw-message">Any additional feedback? \
              <input type="text" name="rating-message" id="rating-message" placeholder="Optional"" class="form-control"> \
            </div> \
            <div id="vw-rating-button" class="vw-button"> \
              <button class="btn-style mdi-communication-call" id="send-rating"> \
                <span>Send</span> \
              </button> \
            </div> \
          </div> \
          <div id="vw-footer" class="vw-footer"> \
            <a href="https://voxbone.com" target="_blank">powered by:</a> \
          </div> \
        </div> \
      </div> \
    </div> \
  ');

  window.addEventListener('message', function(event) {
    // console.log(event.data);
    var message = event.data;

    if (typeof message === 'string' && message.substring(0,12) == 'setMicVolume') {
      var vol = parseInt(message.substring(12,13));
      // console.log("Vol -> " + vol);

      $("#microphone em").removeClass();
      if (vol > 0) $("#mic1").addClass('on');
      if (vol > 1) $("#mic2").addClass('on');
      if (vol > 2) $("#mic3").addClass('on');
      if (vol > 3) $("#mic4").addClass('on');
      if (vol > 4) $("#mic5").addClass('peak');
      return;
    };

    if (typeof message === 'object' && message.action == 'setMessage') {
      $("body")[0].innerHTML = message.text;
      return;
    };

    switch(message) {
      case 'setCallCalling':
        $("#vw-title").text("Calling...");
        break;
      case 'setCallFailed':
        $("#vw-title").text("Call Failed");
        break;
      case 'setInCall':
        $("#vw-title").text("In Call");
        $(".vw-animated-dots").removeClass('hidden');
        break;
      case 'setCallEnded':
        $("#vw-title").text("Call Ended");
        $(".vw-animated-dots").addClass('hidden');
        break;
      case 'openWidgetWithoutDialPad':
        $("#dialpad").addClass('hidden');
        $(".vox-widget-wrapper").removeClass('hidden');
        break;
      case 'openWidget':
        $(".vox-widget-wrapper").removeClass('hidden');
        break;
    };
  });

  $('#send-rating').click(function(e) {
    e.preventDefault();

    var rate = $('#vw-rating-stars').raty('score');
    if (!rate) return;

    var comment = $('#rating-message').val();

    var data =  { rate: rate, comment: comment };
    var message = { action: 'rate', data: data };

    call_action(message);

    $("#vw-rating").hide('slow').html('Thank you for rating our service!').fadeIn(500);
  });

  function is_iframe() {
    return $('#call_button_frame').length > 0;
  };

  function send_voxbone_interaction(message){
    if (!voxbone.WebRTC.rtcSession.isEstablished())
      return;

    switch(message) {
      case 'hang_up':
        voxbone.WebRTC.hangup();
        break;
      case 'microphone-mute':
        if (voxbone.WebRTC.isMuted) {
          voxbone.WebRTC.unmute();
        } else {
          voxbone.WebRTC.mute();
        }
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
      case '*':
      case '#':
        voxbone.WebRTC.sendDTMF(message);
        break;
    }
  };

  function call_action(message) {
    if (is_iframe()) {
      $('#call_button_frame')[0].contentWindow.postMessage(message, '*');
    } else {
      if (message.action &&  message.action == 'rate')
        console.log(message);
      else
        send_voxbone_interaction(message);
    };
  };

  $('#vw-rating-stars').raty({ starType : 'i' });

  $('.vw-dialpad li').click(function(e) {
    e.preventDefault();
    call_action(this.textContent);
  });

  $(".vw-end-call").click(function(e) {
    e.preventDefault();
    $("#vw-in-call").addClass('hidden');
    $("#vw-rating").removeClass('hidden');
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

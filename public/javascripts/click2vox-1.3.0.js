// Voxbone Click2Vox Widget library
// Version - v1.3.0

function loadScript(url, callback) {
  // Adding the script tag to the head as suggested before
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
};

var check0Ready = (function() {
  loadScript("//webrtc.voxbone.com/js/jssip-latest.js", check1Ready);
});

var check1Ready = (function() {
  loadScript("//webrtc.voxbone.com/js/voxbone-latest.js", check2Ready);
});

var check2Ready = (function() {
  loadScript("//cdnjs.cloudflare.com/ajax/libs/raty/2.7.0/jquery.raty.min.js", check3Ready);
});

var check3Ready = (function() {
  console.log("jQuery & Raty are loaded");

  var info = $(".voxButton").data();

  $('head')
    .append($('<link rel="stylesheet" type="text/css" />')
    .attr('href', info.server_url + '/stylesheets/vxb-widget.css') );

  if(info.default_button_css){
    $('head')
      .append($('<link rel="stylesheet" type="text/css" />')
      .attr('href', info.server_url + '/stylesheets/vxb-button.css') );
  }

  $('.voxButton').append(' \
    <audio id="audio-ringback-tone" preload="auto" loop> \
      <source src="https://upload.wikimedia.org/wikipedia/commons/c/cd/US_ringback_tone.ogg" type="audio/ogg"> \
    </audio> \
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
          <div id="vw-unable-to-acces-mic" class="vw-unable-to-acces-mic hidden"> \
            <p style="color: red;">Oops. It looks like we are unable to use your microphone.</p> \
            <p>Please enable microphone access in your browser to allow this call</p> \
          </div> \
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
            <a href="#" id="vw-end-call" class="vw-end-call"><i class="vw-icon vx-icon-phone"></i>End Call</a> \
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
            <form name="rating"> \
              <div id="vw-rating-question" class="vw-question">How was the quality of your call?</div> \
              <div id="vw-rating-stars" class="vw-stars"></div> \
              <div id="vw-rating-message" class="vw-message">Any additional feedback? \
                <input type="text" name="rating-message" id="rating-message" placeholder="Optional"" class="form-control"> \
              </div> \
              <div id="vw-rating-button" class="vw-button"> \
                <button class="btn-style btn-style-disabled" id="send-rating"> \
                  <span>Send</span> \
                </button> \
              </div> \
            </form> \
          </div> \
          <div id="vw-rating-after-message" class="vw-rating hidden"> \
            <p>Thank you for using our service</p> \
          </div> \
          <div id="vw-footer" class="vw-footer"> \
            <a href="https://voxbone.com" target="_blank">powered by:</a> \
          </div> \
        </div> \
      </div> \
    </div> \
  ');

  var links = "";
  if(info.show_frame && info.default_button_css) {
    links = '<div class="widget-footer-left">\
               <a href="https://test.webrtc.org/" target="_blank">Test your setup</a>\
             </div>\
             <div class="widget-footer-right">\
               <a href="https://voxbone.com" target="_blank">powered by:</a>\
             </div>'
  };

  $('.voxButton').append(' \
    <div id="launch_call_div" class="widget-box style-b">\
      <button id="launch_call" class="btn-style launch_call">\
        <span>' +  info.text + '</span>\
      </button>\
      ' + links + '\
    </div>\
  ');

  function getVoxrtcConfig(callback) {
    $.get(info.server_url + '/token_config', function (data) {
      callback(eval('(' + data + ')'));
    });
  };

  function sendPostMessage(action, value){
    if (typeof value === 'undefined') { value = ''; }
    var message = { action: action, value: value };
    parent.postMessage(message, "*");
  };

  var eventHandlers = {
    'localMediaVolume': function (e) {
      if(voxbone.WebRTC.isMuted) return;
      sendPostMessage('setMicVolume', e.localVolume )
    },
    'progress': function (e) {
      console.log('Calling...');
      //- sendPostMessage('setCallCalling');
    },
    'failed': function (e){
      console.log('Failed to connect: ' + e.cause);
      sendPostMessage('setCallFailed', e.cause.substr(0,11));
    },
    'accepted': function (e){
      console.log('Call started');
      sendPostMessage('setInCall');
    },
    'ended': function (e){
      console.log('Call ended');
      sendPostMessage('setCallEnded');
    },
    'getUserMediaFailed': function (e){
      console.log('Cannot get User Media');
      sendPostMessage('setCallFailedUserMedia');
    },
    'getUserMediaAccepted': function(e) {
      sendPostMessage('setCallCalling');
      console.log('local media accepted');
      voxbone.Logger.loginfo("local media accepted");
    },
    'authExpired': function (e){
      console.log('Auth Expired!');
      getVoxrtcConfig(function(data) {
        voxbone.WebRTC.init(data);
      });
    }
  };

  function init() {
    // $scope.wirePluginAndEvents();

    voxbone.WebRTC.configuration.post_logs = true;
    voxbone.WebRTC.authServerURL = "https://webrtc.voxbone.com/rest/authentication/createToken";
    voxbone.WebRTC.customEventHandler = eventHandlers;
    getVoxrtcConfig(function (data) {
      voxbone.WebRTC.init(data);
    });
  };

  function isInCall() {
    return (typeof voxbone.WebRTC.rtcSession.isEstablished === "function") && !voxbone.WebRTC.rtcSession.isEnded();
  };

  function isWebRTCSupported() {
    return voxbone.WebRTC.isWebRTCSupported();
  };

  function makeCall(did) {
    if (isInCall()) return;

    if (!isWebRTCSupported() && (info.incompatible_browser_configuration == 'link_button_to_a_page')) {
      $window.open(info.redirect_url, '_blank');
      return;
    }

    if (isWebRTCSupported()) {
      $("#vw-title").text("Waiting for User Media");
      $("#microphone em").removeClass('on').removeClass('off');
      $("#vw-unable-to-acces-mic").addClass('hidden');
      $(".vw-animated-dots").removeClass('hidden');
      $(".vox-widget-wrapper").removeClass('hidden');
      $("#vw-in-call").removeClass('hidden');
      $(".vw-rating").addClass('hidden');

      if (info.dial_pad)
        $("#dialpad").removeClass('hidden');
      else
        $("#dialpad").addClass('hidden');

      var caller_id = info.caller_id ? info.caller_id : "click2vox";
      voxbone.WebRTC.configuration.uri = (new JsSIP.URI(scheme = "sip", user = (caller_id).replace(/[^a-zA-Z0-9-_]/g, ''), "voxbone.com")).toString();

      if (info.context)
        voxbone.WebRTC.context = info.context;

      if (info.send_digits) {
        console.log('Digits to be send: ' + info.send_digits);
        voxbone.WebRTC.configuration.dialer_string = info.send_digits;
      }

      voxbone.WebRTC.call(did);
      window.onbeforeunload = function (e) {
        voxbone.WebRTC.unloadHandler();
      };
    }
  };

  $("#launch_call").click(function(e) {
    e.preventDefault();
    makeCall(info.did);
  });

  $("#hangup_call").click(function(e) {
    e.preventDefault();
    voxbone.WebRTC.hangup();
  });

  window.addEventListener('message', function(event) {
    // console.log(event.data);
    var message = event.data;

    switch(message.action) {
      case 'setMicVolume':
        $("#microphone em").removeClass();
        if (message.value > 0.01) $("#mic1").addClass('on');
        if (message.value > 0.05) $("#mic2").addClass('on');
        if (message.value > 0.10) $("#mic3").addClass('on');
        if (message.value > 0.20) $("#mic4").addClass('on');
        if (message.value > 0.30) $("#mic5").addClass('peak');
        break;
      case 'setCallCalling':
        $("#vw-title").text("Calling");
        playRingbackTone();
        break;
      case 'setCallFailed':
        stopRingbackTone();
        $("#vw-title").text("Call Failed: " + message.value);
        $(".vw-animated-dots").addClass('hidden');
        $("#vw-in-call").addClass('hidden');
        $("#vw-rating-after-message").removeClass('hidden');
        break;
      case 'setInCall':
        stopRingbackTone();
        $("#vw-title").text("In Call");
        $(".vw-animated-dots").removeClass('hidden');
        break;
      case 'setCallEnded':
        $("#vw-title").text("Call Ended");
        $(".vw-animated-dots").addClass('hidden');
        $("#vw-in-call").addClass('hidden');
        resetRating();
        $("#vw-rating").removeClass('hidden');
        $(".vw-end-call").click();
        break;
      case 'openWidgetWithoutDialPad':
        $("#dialpad").addClass('hidden');
        $("#vw-title").text("Waiting for User Media");
        $("#microphone em").removeClass('on').removeClass('off');
        $(".vw-animated-dots").removeClass('hidden');
        $(".vox-widget-wrapper").removeClass('hidden');
        $("#vw-in-call").removeClass('hidden');
        $(".vw-rating").addClass('hidden');
        $("#vw-unable-to-acces-mic").addClass('hidden');
        break;
      case 'openWidget':
        $("#vw-title").text("Waiting for User Media");
        $("#microphone em").removeClass('on').removeClass('off');
        $(".vw-animated-dots").removeClass('hidden');
        $(".vox-widget-wrapper").removeClass('hidden');
        $("#vw-in-call").removeClass('hidden');
        $(".vw-rating").addClass('hidden');
        $("#vw-unable-to-acces-mic").addClass('hidden');
        break;
      case 'setCallFailedUserMedia':
        stopRingbackTone();
        $("#vw-title").text("Call Failed");
        $(".vw-animated-dots").addClass('hidden');
        $("#vw-in-call").addClass('hidden');
        $("#vw-unable-to-acces-mic").removeClass('hidden');
        break;
    };
  });

  $('#send-rating').click(function(e) {
    e.preventDefault();

    var rate = $('#vw-rating-stars').raty('score');
    var comment = $('#rating-message').val();

    if (!rate && !comment) return;

    var data =  { rate: rate, comment: comment, url: document.URL, token: info.button_id };
    var message = { action: 'rate', data: data };

    sendRate(message.data);

    $("#vw-rating").addClass('hidden');
    $("#vw-rating-after-message").removeClass('hidden');
  });

  function stopRingbackTone(){
    $("#audio-ringback-tone").trigger('pause');
    $("#audio-ringback-tone").prop("currentTime",0);
  };

  function playRingbackTone(){
    $("#audio-ringback-tone").prop("currentTime",0);
    $("#audio-ringback-tone").trigger('play');
  };

  function callAction(message){
    if (!(typeof voxbone.WebRTC.rtcSession.isEstablished === "function") || voxbone.WebRTC.rtcSession.isEnded())
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

  function sendRate(data) {
    $.ajax({
      type: "POST",
      url: info.server_url + "/rating",
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      crossDomain: true,
      data: JSON.stringify(data),
      dataType: 'json',
      success: function(responseData, status, xhr) {
        console.log("rating sent!");
      },
      error: function(request, status, error) {
        console.log("rating sending error callback");
      }
    });
  };

  function resetRating() {
    $('#send-rating').addClass("btn-style-disabled");
    $('#vw-rating-stars').raty('cancel');
    $('#rating-message').val('');
  };

  $('#vw-rating-stars').raty({
    starType  : 'i',
    click     : function(score, evt) {
      // alert("Score: " + score);
      $('#send-rating').removeClass("btn-style-disabled");
      $('#send-rating').addClass("btn-style");
    }
  });

  $('.vw-dialpad li').click(function(e) {
    e.preventDefault();
    callAction(this.textContent);
  });

  $(".vw-end-call").click(function(e) {
    e.preventDefault();
    resetRating();
    callAction('hang_up');
  });

  $("#close-screen i").click(function(e) {
    e.preventDefault();
    $(".vox-widget-wrapper").addClass('hidden');
    callAction('hang_up');

    // send "no rating"
    var data =  { rate: 0, comment: 'Closed Without Rating', url: document.URL };
    var message = { action: 'rate', data: data };
    callAction(message);
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
    callAction('microphone-mute');
  });

  $(".vw-icon.vx-icon-vol").click(function(e) {
    e.preventDefault();
    $("#volume em").toggleClass('on').toggleClass('off');
    callAction('volume-mute');
  });

  init();
});

if (typeof jQuery === 'undefined')
  loadScript("//cdnjs.cloudflare.com/ajax/libs/jquery/1.12.3/jquery.min.js", check0Ready);
else
  check0Ready();

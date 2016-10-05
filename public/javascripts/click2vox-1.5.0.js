// Voxbone Click2Vox Widget library
// Version - v1.5.0

var head = document.getElementsByTagName('head')[0];
var infoVoxbone, voxButtonElement;

voxButtonElement = document.getElementsByClassName('voxButton')[0];
if (voxButtonElement === undefined) {
  voxButtonElement = document.createElement("div");
  voxButtonElement.className = "voxButton";
  voxButtonElement.dataset.use_default_button_css = false;
  // document.body.appendChild(voxButtonElement);
}

function loadScript(url, callback) {
  // Adding the script tag to the head as suggested before
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  // Then bind the event to the callback function.
  // There are several events for cross browser compatibility.
  script.onreadystatechange = callback;
  script.onload = callback;

  // Fire the loading
  head.appendChild(script);
}

function loadCss(url) {
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  document.getElementsByTagName("head")[0].appendChild(link);
}

var check0Ready = (function() {
  infoVoxbone = voxButtonElement.dataset;
  infoVoxbone.server_url = (infoVoxbone.server_url === undefined) ? 'https://click2vox.com' : infoVoxbone.server_url;

  loadCss(infoVoxbone.server_url + '/stylesheets/vxb-widget.css');

  if(infoVoxbone.use_default_button_css !== 'false')
    loadCss(infoVoxbone.server_url + '/stylesheets/vxb-button.css');

  if (typeof voxbone === 'undefined')
    loadScript("//cdn.voxbone.com/voxbone/voxbone-2.1.0.min.js", check1Ready);
  else
    check1Ready();
});

var check1Ready = (function() {

  var voxBranding = '\
    <div id="vw-footer" class="vw-footer"> \
      <a href="https://voxbone.com" target="_blank">powered by:</a> \
    </div>\
  ';

  var voxPopup = ' \
    <audio id="audio-ringback-tone" preload="auto" loop> \
      <source src="https://upload.wikimedia.org/wikipedia/commons/c/cd/US_ringback_tone.ogg" type="audio/ogg"> \
    </audio> \
    <div style="display: none;" class="vox-widget-wrapper hidden"> \
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
              <div id="vw-rating-stars" class="vw-stars"> \
                <input type="radio" id="vxb-star5" name="vxb-rate" value="5"> \
                <label for="vxb-star5" title="Excellent">5 stars</label> \
                <input type="radio" id="vxb-star4" name="vxb-rate" value="4"> \
                <label for="vxb-star4" title="Very Good">4 stars</label> \
                <input type="radio" id="vxb-star3" name="vxb-rate" value="3"> \
                <label for="vxb-star3" title="Good">3 stars</label> \
                <input type="radio" id="vxb-star2" name="vxb-rate" value="2"> \
                <label for="vxb-star2" title="Poor">2 stars</label> \
                <input type="radio" id="vxb-star1" name="vxb-rate" value="1"> \
                <label for="vxb-star1" title="Unacceptable">1 star</label> \
              </div> \
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
          </div>\
  ';

  // showing voxbone branding
  if (infoVoxbone.show_branding !== 'false')
    voxPopup += voxBranding;

  // let's close the popup markup
  voxPopup += '\
        </div> \
      </div> \
    </div> \
  ';

  voxButtonElement.innerHTML += voxPopup;

  var links = '';
  var show_frame = infoVoxbone.show_frame !== 'false';

  if (show_frame) {
    if (infoVoxbone.test_setup !== 'false') {
      links = '\
        <div class="widget-footer-left">\
          <a href="https://test.webrtc.org/" target="_blank">Test your setup</a>\
        </div>\
      ';
    }

    if (infoVoxbone.show_branding !== 'false') {
      links += '\
        <div class="widget-footer-right">\
          <a href="https://voxbone.com" target="_blank">powered by:</a>\
        </div> \
      ';
    }
  } else {
    infoVoxbone.div_css_class_name += ' no-frame';
    if (infoVoxbone.show_branding === 'false')
      infoVoxbone.div_css_class_name += ' no-branding';
  }

  var custom_button_color = '';
  if (infoVoxbone.custom_button_color) {
    custom_button_color = 'style="border: ' + infoVoxbone.custom_button_color + '; background: ' + infoVoxbone.custom_button_color + '"';
  }

  var custom_frame_color = '';
  if (infoVoxbone.custom_frame_color) {
    custom_frame_color = "background:"+ infoVoxbone.custom_frame_color;
  }

  if (!isWebRTCSupported() && infoVoxbone.incompatible_browser_configuration === 'show_text_html') {
    voxButtonElement.innerHTML += ' \
    <div style="display: none;'+custom_frame_color+'" id="launch_call_div" class="vxb-widget-box ' + (infoVoxbone.div_css_class_name || "style-b") + '">\
      <span>' +  unescape(infoVoxbone.text_html) + '</span>\
    </div>\
  ';
  }
  else if (!isWebRTCSupported() && infoVoxbone.incompatible_browser_configuration === 'hide_widget')
    hideElement('div[data-button_id="' + infoVoxbone.button_id + '"]');
  else {
    voxButtonElement.innerHTML += ' \
    <div style="display: none;'+custom_frame_color+'" id="launch_call_div" class="vxb-widget-box ' + (infoVoxbone.div_css_class_name || "style-b") + '">\
      <button id="launch_call" ' + custom_button_color + ' class="vxb-btn-style ' + (infoVoxbone.button_css_class_name) + '"><span>' +  unescape(infoVoxbone.text) + '</span></button>\
      ' + links + '\
    </div>\
  ';
  }

  function getVoxrtcConfig(callback) {
    var request = new XMLHttpRequest();

    var dict = {
      username: infoVoxbone.voxbone_webrtc_username || '',
      secret: infoVoxbone.voxbone_webrtc_password || ''
    };

    var params = voxbone.Request.param(dict);
    var url = infoVoxbone.server_url + '/token_config?' + params;

    request.open('GET', url, true);

    request.onload = function() {
      if (request.status === 200)
        /*jshint evil:true*/
        /*We are skipping this because its unlikely to have code injection
        issues since we are bringing the response from the backend*/
        callback(eval('(' + request.responseText + ')'));
    };

    request.send();
  }

  function sendPostMessage(action, value){
    if (typeof value === 'undefined')
      value = '';

    postMessage({ action: action, value: value }, "*");
  }

  var eventHandlers = {
    'localMediaVolume': function (e) {
      if(voxbone.WebRTC.isMuted) return;
      sendPostMessage('setMicVolume', e.localVolume );
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
      handleAuth();
    }
  };

  function handleAuth() {
    var basic = (infoVoxbone.basic_auth === 'true');
    var username = infoVoxbone.voxbone_webrtc_username;
    var key = infoVoxbone.voxbone_webrtc_password;

    if (basic && username && key) {
      voxbone.WebRTC.basicAuthInit(username, key);
    } else {
      voxbone.WebRTC.authServerURL = infoVoxbone.auth_server_url || "https://webrtc.voxbone.com/rest/authentication/createToken";

      // NOTE: using `custom_auth_data` makes mandatory handling `authExpired` event separately
      if (infoVoxbone.custom_auth_data) {
        var data = {};
        if (typeof infoVoxbone.custom_auth_data === 'string')
          data = JSON.parse(infoVoxbone.custom_auth_data);
        else
          data = infoVoxbone.custom_auth_data;

        voxbone.WebRTC.init(data);
      } else {
        getVoxrtcConfig(function(data) {
          voxbone.WebRTC.init(data);
        });
      }

    }
  }

  function notifyLoaded() {
    // NOTE: if we plan to support IE -someday- we need to make sure to
    // implement this in a way that works for IE.
    // check this out for reference: http://caniuse.com/#feat=customevent
    var event = new CustomEvent("click2vox-ready", {
      "detail": {
        "infoVoxbone": infoVoxbone,
        "webrtcSupported": isWebRTCSupported()
      }
    });

    // Dispatch/Trigger the event on top of the document
    document.dispatchEvent(event);
  }

  function init() {
    setTimeout(function() { document.querySelector("#launch_call_div").style.display = "block"; }, 500);

    // let's trigger an event when things are ready
    notifyLoaded();

    if (isWebRTCSupported()) {
      voxbone.WebRTC.configuration.post_logs = true;
      voxbone.WebRTC.customEventHandler = eventHandlers;
      handleAuth();
    } else {
      if (isChromeOnHttp())
        console.log("WebRTC doesn't work in Chrome on HTTP -> https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins");
    }
  }

  function isInCall() {
    return (typeof voxbone.WebRTC.rtcSession.isEstablished === "function") && !voxbone.WebRTC.rtcSession.isEnded();
  }

  function isChromeOnHttp() {
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    var isHttp = window.location.protocol === "http:";
    return isChrome && isHttp;
  }

  function isWebRTCSupported() {
    return voxbone.WebRTC.isWebRTCSupported() && !isChromeOnHttp();
  }

  function makeCall() {
    voxButtonElement = document.getElementsByClassName('voxButton')[0];
    infoVoxbone = voxButtonElement.dataset;

    if (isInCall()) return;

    if (!isWebRTCSupported() && (infoVoxbone.incompatible_browser_configuration === 'link_button_to_a_page')) {
      var redirect_url = infoVoxbone.redirect_url || 'https://voxbone.com';
      window.open(redirect_url);
      return;
    }

    if (isWebRTCSupported()) {
      resetWidget();

      var caller_id = infoVoxbone.caller_id ? infoVoxbone.caller_id : "click2vox";
      voxbone.WebRTC.configuration.uri = (new JsSIP.URI(scheme = "sip", user = (caller_id).replace(/[^a-zA-Z0-9-_]/g, ''), "voxbone.com")).toString();

      if (infoVoxbone.context)
        voxbone.WebRTC.context = infoVoxbone.context;

      if (infoVoxbone.send_digits) {
        console.log('Digits to be send: ' + infoVoxbone.send_digits);
        voxbone.WebRTC.configuration.dialer_string = infoVoxbone.send_digits;
      }

      voxbone.WebRTC.call(infoVoxbone.did);
      window.onbeforeunload = function (e) {
        voxbone.WebRTC.unloadHandler();
      };
    }
  }

  window.addEventListener('message', function(event) {
    var message = event.data;

    switch(message.action) {

      case 'setMicVolume':
        clearMicDots();
        if (message.value > 0.01) setMicDot('1');
        if (message.value > 0.05) setMicDot('2');
        if (message.value > 0.10) setMicDot('3');
        if (message.value > 0.20) setMicDot('4');
        if (message.value > 0.30) setMicDot('5');
        break;

      case 'setCallCalling':
        playRingbackTone();
        setWidgetTitle("Calling");
        break;

      case 'setCallFailed':
        pauseRingbackTone();
        setWidgetTitle("Call Failed: " + message.value);
        hideAnimatedDots();
        hideElement('.vox-widget-wrapper #vw-in-call');
        showElement(".vox-widget-wrapper #vw-rating-after-message");
        break;

      case 'setInCall':
        pauseRingbackTone();
        setWidgetTitle("In Call");
        showAnimatedDots();
        break;

      case 'setCallEnded':
        resetWidget();
        setWidgetTitle("Call Ended");
        hideAnimatedDots();
        hideElement('.vox-widget-wrapper #vw-in-call');
        if (infoVoxbone.rating !== "false") {
          showElement(".vox-widget-wrapper #vw-rating");
        } else
          showElement(".vox-widget-wrapper #vw-rating-after-message");
        callAction('hang_up');
        break;

      case 'setCallFailedUserMedia':
        pauseRingbackTone();
        setWidgetTitle("Call Failed");
        hideAnimatedDots();
        hideElement('.vox-widget-wrapper #vw-in-call');
        showElement(".vox-widget-wrapper #vw-unable-to-acces-mic");
        break;
    }
  });

  function clearMicDots(){
    var micDots = document.querySelectorAll('.vox-widget-wrapper #microphone em');
    Array.prototype.forEach.call(micDots, function(el, i) {
      el.classList = "";
    });
  }

  function setMicDot(dot) {
    var el = document.querySelector('.vox-widget-wrapper #mic' + dot);
    if (dot === '5')
      el.classList.add('peak');
    else
      el.classList.add('on');
  }

  function showElement(selector){
    var el = document.querySelector(selector);
    el.classList.remove('hidden');
  }

  function hideElement(selector){
    var el = document.querySelector(selector);
    el.classList.add('hidden');
  }

  function showAnimatedDots(){
    var dots = document.querySelectorAll('.vox-widget-wrapper .vw-animated-dots');
    Array.prototype.forEach.call(dots, function(el, i) {
      el.classList.remove('hidden');
    });
  }

  function hideAnimatedDots(){
    var dots = document.querySelectorAll('.vox-widget-wrapper .vw-animated-dots');
    Array.prototype.forEach.call(dots, function(el, i) {
      el.classList.add('hidden');
    });
  }

  function setWidgetTitle(title){
    var el = document.querySelector('.vox-widget-wrapper #vw-title');
    el.innerText = title;
  }

  function getRingbackTone(){
    return document.querySelector('.voxButton #audio-ringback-tone');
  }

  function pauseRingbackTone(){
    getRingbackTone().pause();
  }

  function playRingbackTone(){
    var audioEl = getRingbackTone();
    audioEl.currentTime = 0;
    audioEl.play();
  }

  function callAction(message){
    if (typeof voxbone.WebRTC.rtcSession.isEstablished !== "function" || voxbone.WebRTC.rtcSession.isEnded())
      return;

    switch(message) {
      case 'hang_up':
        voxbone.WebRTC.hangup();
        break;
      case 'microphone_mute':
        if (voxbone.WebRTC.isMuted)
          voxbone.WebRTC.unmute();
        else
          voxbone.WebRTC.mute();
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
  }

  function sendRate(data) {
    var request = new XMLHttpRequest();
    request.open('POST', infoVoxbone.server_url + "/rating", true);
    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    request.addEventListener("load", function(responseData, status, xhr) {
      console.log("rating sent!");
    });

    request.addEventListener("error", function(responseData, status, xhr) {
      console.log("rating sending error callback");
    });

    request.send(JSON.stringify(data));
  }

  function resetWidget() {
    // Reset Widget
    setWidgetTitle("Waiting for User Media");
    clearMicDots();

    hideElement(".vox-widget-wrapper #vw-unable-to-acces-mic");
    hideElement(".vox-widget-wrapper #vw-rating-after-message");
    hideElement(".vox-widget-wrapper .vw-rating");

    showAnimatedDots();
    showElement(".vox-widget-wrapper #vw-in-call");
    showElement(".vox-widget-wrapper #vw-body");
    showElement(".vox-widget-wrapper");
    document.querySelector(".vox-widget-wrapper").style.display = "block";

    if (infoVoxbone.dial_pad !== "false")
      showElement(".vox-widget-wrapper #dialpad");
    else
      hideElement(".vox-widget-wrapper #dialpad");

    // Reset Rating
    document.querySelector('.vox-widget-wrapper #send-rating').classList.add("btn-style-disabled");
    document.querySelector('.vox-widget-wrapper #rating-message').value = "";

    var starRatingButtons = document.querySelectorAll(".vox-widget-wrapper input[name=vxb-rate]");
    Array.prototype.forEach.call(starRatingButtons, function(el, i) {
      el.checked = false;
    });
  }

  function handleEvent (eventName, selector, callback) {
    var element = document.querySelector(selector);
    if (element) element.addEventListener(eventName, callback);
  }

  // Start of Button Events
  //
  // Click on Make Call button event
  handleEvent('click', '.vxb-widget-box #launch_call', function (e) {
    e.preventDefault();
    makeCall();
  });
  //
  // End of Button Events

  // Start of Widget Events
  //
  // Click on Send Rating button event
  handleEvent('click', '.vox-widget-wrapper #send-rating', function (e) {
    e.preventDefault();

    var rate = document.querySelector('.vox-widget-wrapper input[name=vxb-rate]:checked');
    if (!rate) return;

    var comment = document.querySelector('.vox-widget-wrapper #rating-message');
    var commentValue = comment ? comment.value : "";

    var data =  { rate: rate.value, comment: commentValue, url: document.URL, token: infoVoxbone.button_id };
    var message = { action: 'rate', data: data };

    sendRate(message.data);

    hideElement(".vox-widget-wrapper #vw-rating");
    showElement(".vox-widget-wrapper #vw-rating-after-message");
  });

  // Click Rating star buttons event
  var starRatingButtons = document.querySelectorAll(".vox-widget-wrapper input[name=vxb-rate]");
  Array.prototype.forEach.call(starRatingButtons, function(el, i) {
    el.addEventListener('click', function (e) {
      var element = document.querySelector(".vox-widget-wrapper #send-rating");
      element.classList.add('btn-style');
      element.classList.remove('btn-style-disabled');
    });
  });

  // Click on Pad buttons event
  var padButtons = document.querySelectorAll(".vox-widget-wrapper .vw-dialpad li");
  Array.prototype.forEach.call(padButtons, function(el, i) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      callAction(this.textContent);
    });
  });

  // End call button event
  handleEvent('click', '.vox-widget-wrapper .vw-end-call', function (e) {
    e.preventDefault();
    resetWidget();
    callAction('hang_up');
  });

  // Close Widget button event
  handleEvent('click', '.vox-widget-wrapper #close-screen i', function (e) {
    e.preventDefault();
    hideElement(".vox-widget-wrapper");

    callAction('hang_up');

    // send "no rating"
    var data =  { rate: 0, comment: 'Closed Without Rating', url: document.URL };
    var message = { action: 'rate', data: data };
    callAction(message);
  });

  // Open Widget button event
  handleEvent('click', '.vox-widget-wrapper #full-screen i', function (e) {
    e.preventDefault();

    var widget_body_selector = ".vox-widget-wrapper #vw-body";
    if (document.querySelector(widget_body_selector).classList.contains('hidden')) {
      showElement(widget_body_selector);
    } else {
      hideElement(widget_body_selector);
    }

    this.classList.toggle('vx-icon-full-screen-on');
    this.classList.toggle('vx-icon-full-screen-off');
  });

  // Pad button event
  handleEvent('click', '.vox-widget-wrapper i.vx-icon-pad', function (e) {
    e.preventDefault();
    var element = document.querySelector(".vox-widget-wrapper .vw-dialpad");
    element.classList.toggle('active');
  });

  // Mic button event
  handleEvent('click', '.vox-widget-wrapper i.vx-icon-mic', function (e) {
    e.preventDefault();

    var elements = document.querySelectorAll(".vox-widget-wrapper #microphone em");
    Array.prototype.forEach.call(elements, function(el, i) {
      el.classList.add('off');
      el.classList.remove('on');
    });

    callAction('microphone_mute');
  });
  //
  // End of Widget Events

  init();
});


check0Ready();

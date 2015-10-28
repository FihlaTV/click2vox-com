// extend.js
// Written by Andrew Dupont, optimized by Addy Osmani
function extend(destination, source) {

	var toString = Object.prototype.toString,
		objTest = toString.call({});

	for (var property in source) {
		if (source[property] && objTest === toString.call(source[property])) {
			destination[property] = destination[property] || {};
			extend(destination[property], source[property]);
		} else {
			destination[property] = source[property];
		}
	}
	return destination;

}

/**
 * voxbone.js
 */
var voxbone = voxbone || {};


/**
 * Pinger Logic & Best POP Selection for WebRTC
 */
extend(voxbone, {
	Pinger: {
		/**
		 * Placeholder for ping result
		 */
		pingResults: [],

		/**
		 * Load an image and compute the time it took to load.
		 * Loading time is then stored into pingResult for further processing.
		 * Each pop will host a small http server to serve the image.
		 *
		 * If a ping fails, a value of -1 will be stored
		 *
		 * @param pop Name of the Pop to ping, mainly used as an identifier for storing ping result.
		 * @param url URL of the Pop to ping
		 */
		ping: function (pop, url) {
			var started = new Date().getTime();
			var _that = this;
			var callback = this.recordPingResult;

			this.img = new Image();
			_that.inUse = true;

			this.img.onload = function () {
				var elapsed = new Date().getTime() - started;
				callback(pop, elapsed);
				_that.inUse = false;
			};

			this.img.onerror = function (e) {
				_that.inUse = false;
				callback(pop, -1);
			};

			this.img.src = url + "?" + new Date().getTime();
			this.timer = setTimeout(function () {
				if (_that.inUse) {
					_that.inUse = false;
					callback(pop, -1);
				}
			}, 1500);
		},

		/**
		 * Record the ping result for a given pop and store it into a placeholder
		 * A duration of -1 will be used in the event a ping has timeout or URL doesn't resolve.
		 *
		 * @param pop Pop identifier
		 * @param duration ping duration
		 */
		recordPingResult: function (pop, duration) {
			//if(duration < 0 ) return;
            console.log("[ping] "+pop+" replied in "+duration);
			var entry = {
				name: pop,
				ping: duration
			};

			voxbone.Pinger.pingResults.push(entry);
		},

		/**
		 * Extract which Pop is best from all the pinged Pop.
		 * It iterate over all stored ping result and returns the best one excluding ping of -1.
		 *
		 * @returns Name of the Pop which has the best ping
		 */
		getBestPop: function () {
			var bestPop = undefined;
            //If no proper ping server found, default to BE
            if(this.pingResults.length == 0){
                bestPop =  {
                    name:'BE',
                    ping: -1
                };
            //Else find the fastest
            }else{
                for (var i = 0; i < this.pingResults.length; i++) {
                    var result = this.pingResults[i];
                    if ((result.ping > 0 ) && (bestPop == undefined || ( (result.ping < bestPop.ping) ))) {
                        bestPop = result;
                    }
                }
            }
			return bestPop;
		}
	}
});

/**
 *
 */
extend(voxbone, {

	WebRTC: {
		/**
		 * id of the <audio/> html tag.
		 * If an audio element with this id already exists in the page, the script will load it and attach audio stream to it.
		 * If not found, the script will create the audio component and attach the audio stream to it.
		 */
		audioComponentName: 'peer-audio',

        /**
         * id of the <video/> html tag.
         * If a video element with this id already exists in the page, the script will load it and attach video stream to it.
         * If not found, the script will create the video component and attach the stream to it.
         */
        videoComponentName: 'peer-video',

        /**
         * Indiciate if video should be used or not.
         * If video is set to true, then the user will be prompted for webcam access.
         *
         */
        allowVideo : false,

		/**
		 * URL of voxbone ephemeral auth server
		 */
		authServerURL: 'https://webrtc.voxbone.com/rest/authentication/createToken',

		/**
		 * Switch between WebSocket & Secure WebSocket
		 */
		useSecureSocket: true,

		/**
		 * The actual WebRTC session
		 */
		rtcSession: {},
		/**
		 * The web audiocontext
		 */
		audioContext: {},

		/**
		 * local media volume
		 */
		localVolume: 0,

		/**
		 * The callback timer for local media volume
		 */
		localVolumeTimer: undefined,

		/**
		 * Timer used if customer wants to insert a add
		 * some gap between the digits
		 */
		dtmfTimer: undefined,

		/**
		 * The script processor for local media volume
		 */
		audioScriptProcessor: {},

		/**
		 * Used to bypass ping mechanism and enforce the POP to be used
		 * If set to 'undefined' ping will be triggered and best pop will be set as preferedPop
		 */
		preferedPop: undefined,

		/**
		 * Configuration object use to hold authentication data as well as the list of Web Socket Servers.
		 * This Configuration object is the native JsSip configuration object.
		 */
		configuration: {
			'authorization_user': undefined,
			'password': undefined,
			'ws_servers': undefined,
			'uri': 'voxrtc@voxbone.com',
			'trace_sip': true,
			'register': false,
			'digit_duration': 100, 
			'digit_gap': 500
		},

		customEventHandler: {
			'progress': function (e) {
			},
			'accepted': function (e) {
			},
			'getUserMediaFailed': function (e) {
				alert("Failed to access mic/camera");
			},
			'localMediaVolume': function (e) {
			},
			'failed': function (e) {
			},
			'ended': function (e) {
			}
		},

		/**
		 * Actual JsSIP User-Agent
		 */
		phone: undefined,

		/**
		 * Context is a variable which will hold anything you want to be transparently carried to the call
		 */
		context: undefined,

		/**
		 * Authenticate toward voxbone ephemeral server and get jsonp callback onto voxbone.WebRTC.processAuthData
		 * in order to process authentication result data.
		 *
		 * @param credentials credentials to be used against ephemeral auth server
		 */
		init: function (credentials) {
			console.log('auth server: ' + this.authServerURL);
			$.ajax({
				type: "GET",
				url: this.authServerURL,
				headers: {
					Accept: "application/json"
				},
				contentType: "application/json; charset=utf-8",
				crossDomain: true,
				cache: false,
				data: {
					'username': credentials.username,
					'key': credentials.key,
					'expires': credentials.expires,
					'jsonp': 'voxbone.WebRTC.processAuthData'
				},
				jsonp: false,
				dataType: 'jsonp'
			});
		},

		/**
		 * Process the Authentication data from Voxbone ephemeral auth server.
		 * It retrieves the list of ping servers and invoke voxbone.Pinger.ping on each of them.
		 * It also store the URI of websocket server and authorization data.
		 *
		 * @param data the Data from voxbone ephemeral server to process
		 */
		processAuthData: function (data) {
			if (this.useSecureSocket) {
				this.configuration.ws_servers = data.wss;
			} else {
				this.configuration.ws_servers = data.ws;
			}

			this.configuration.authorization_user = data.username;
			this.configuration.password = data.password;
			//Initialize User-Agent early in the process
			this.phone = new JsSIP.UA(this.configuration);
			this.phone.start();
			//If no prefered Pop is defined, ping and determine which one to prefer
			if (this.preferedPop == undefined) {
				console.log("prefered pop undefined, pinging....");
				this.pingServers = data["pingServers"];
				$.each(this.pingServers, function (key, value) {
					voxbone.Pinger.ping(key, value);
				});
			} else {
				console.log("preferred pop already set to " + this.preferedPop);
			}
		},


		/**
		 * Check if the document contains an audio element with the provided id.
		 * If no audio element exists, it creates it. prior to bind audio stream to it.
		 *
		 * @param id id of the audio element
		 * @param audioStream audio stream from the WebSocket
		 * @returns {HTMLElement}
		 */
		initAudioElement: function (id, audioStream) {
			var audio = document.getElementById(id);
			//If Audio element doesn't exist, create it
			if (!audio) {
				audio = document.createElement('audio');
				audio.id = id;
				audio.hidden = false;
				audio.autoplay = true;
                document.body.appendChild(audio);
			}
			//Bind audio stream to audio element
			audio.src = (window.webkitURL ? webkitURL : URL).createObjectURL(audioStream);
			return audio;
		},

        /**
         * Check if the docupent contains a video element  with the provided id.
         * If no video element exists, it created it prior to bind video stream to it
         *
         * @param id id of the video element
         * @param videoStream video stream from the WebSocket
         * @returns {HTMLElement}
         */
        initVideoElement : function(id, videoStream){
            var video = document.getElementById(id);
            if(!video){
                video = document.createElement('video');
                video.id = id;
                video.hidden = false;
                video.autoplay = true;
                document.body.appendChild(video);
            }
            //Bind video stream to video element
            video.src = (window.webkitURL ? webkitURL : URL).createObjectURL(videoStream);
            return video;
        },
	

        sendPreConfiguredDtmf : function(digitsPending){
		var digit = undefined;
		var pause = 0; 
		var digit_sent = false;
		
		clearTimeout(self.dtmfTimer);
		if (digitsPending.length > 0) {
			if (digitsPending[0].indexOf('ms') != -1) {
				/*Calculate the pause in this case*/
				pause += parseInt(digitsPending[0].substring(0,digitsPending[0].indexOf('ms')));
			} else {
				/*We found a digit*/
				digit = digitsPending[0];
			}
			digitsPending = digitsPending.slice(1, digitsPending.length);
			if (digit !== undefined) {
				var d = Date.now();
				voxbone.WebRTC.rtcSession.sendDTMF(digit);
				digit_sent = true;
			}
			if (digitsPending.length > 0) {
				var nextDigitGap = pause > 0 ? (pause - voxbone.WebRTC.configuration.digit_gap) : (voxbone.WebRTC.configuration.digit_gap + voxbone.WebRTC.configuration.digit_duration);
				if (nextDigitGap < 0) {
					/*We can't have a negative pause between digits*/
					nextDigitGap = 0;
				}
				self.dtmfTimer = setTimeout(function () {
					voxbone.WebRTC.sendPreConfiguredDtmf(digitsPending);
					}, nextDigitGap);
			}
			
		}
		
	},
		/**
		 * Place a call on a given phone number.
		 * Prior to place the call, it will lookup for best possible POP to use
		 * and set the X-Voxbone-Pop header accordingly
		 *
		 * @param destPhone phone number to dial in E164 format.
		 */
		call: function (destPhone) {
			var uri = new JsSIP.URI('sip', destPhone, 'voxout.voxbone.com'); 
			if (this.preferedPop == undefined) {
				this.preferedPop = voxbone.Pinger.getBestPop().name;
			}
			console.log("prefered pop: ", this.preferedPop);

			var headers = [];
			headers.push('X-Voxbone-Pop: ' + this.preferedPop);

			if (this.context) {
				headers.push('X-Voxbone-Context: ' + this.context);
			}

			var options = {
				'eventHandlers': {
					'peerconnection': function (e) {
						var streams = e.peerconnection.getLocalStreams()
						console.log("streams "+ streams.length);
					 	for (var i = 0; i < streams.length; i++) {
							if(streams[i].getAudioTracks().length > 0) {
								/*activate the local volume monitoring*/
								try {
						        		self.audioContext = new AudioContext();	
								}
								catch (e) {
									console.error("Web Audio API not supported");
								}
								self.audioScriptProcessor = self.audioContext.createScriptProcessor(0, 1, 1);
								var mic = self.audioContext.createMediaStreamSource(streams[i]);
								mic.connect(self.audioScriptProcessor);
								self.audioScriptProcessor.connect(self.audioContext.destination);
								self.audioScriptProcessor.onaudioprocess = function(event) {
									var input = event.inputBuffer.getChannelData(0);
									var i;
									var sum = 0.0;
									for (i = 0; i < input.length; ++i) {	
										sum += input[i] * input[i];
									}
									self.localVolume = Math.sqrt(sum / input.length);
								}
								self.localVolumeTimer = setInterval(function() {
									var e = { localVolume : self.localVolume.toFixed(2)};
									voxbone.WebRTC.customEventHandler.localMediaVolume(e);
									}, 200);
								break;
							}
					 	}
						
					},
					'progress': function (e) {
                        voxbone.WebRTC.customEventHandler.progress(e);
					},
					'failed': function (e) {
						console.error("Call failed, Failure cause is", e.cause);
						if (self.localVolumeTimer !== undefined) {
							clearInterval(self.localVolumeTimer);
							self.localVolumeTimer = undefined;
							self.audioContext = undefined;
							self.audioScriptProcessor = undefined;
						}
						if (self.dtmfTimer !== undefined) {
							clearTimeout(self.dtmfTimer);
							self.dtmfTimer = undefined;
						}
						if (e.cause == JsSIP.C.causes.USER_DENIED_MEDIA_ACCESS) { 
							voxbone.WebRTC.customEventHandler.getUserMediaFailed(e);
						}
						voxbone.WebRTC.customEventHandler.failed(e);
					},
					'accepted': function (e) {
						//voxbone.WebRTC.rtcSession = e.sender;
						voxbone.WebRTC.customEventHandler.accepted(e);
					},
					'addstream': function (e) {
                            			if(voxbone.WebRTC.allowVideo){
                                			voxbone.WebRTC.initVideoElement(voxbone.WebRTC.videoComponentName, e.stream);
                            			} else{
                                			voxbone.WebRTC.initAudioElement(voxbone.WebRTC.audioComponentName, e.stream);
                            			}
						//Check if the customer has configured any dialer string, use that to bypass IVRs
						if (voxbone.WebRTC.configuration.dialer_string.length > 0) {
							var digitsPending = voxbone.WebRTC.configuration.dialer_string.split(',');
							voxbone.WebRTC.sendPreConfiguredDtmf(digitsPending);
						}
					},
					'ended': function (e) {
						if (self.localVolumeTimer !== undefined) {
							clearInterval(self.localVolumeTimer);
							self.localVolumeTimer = undefined;
							self.audioContext = undefined;
							self.audioScriptProcessor = undefined;
						}
						if (self.dtmfTimer !== undefined) {
							clearTimeout(self.dtmfTimer);
							self.dtmfTimer = undefined;
						}
						voxbone.WebRTC.customEventHandler.ended(e);
					},
				},
				'extraHeaders': [],
				'mediaConstraints': {'audio': true, 'video': voxbone.WebRTC.allowVideo}
			};

			options.extraHeaders = headers;
			this.rtcSession = this.phone.call(uri.toAor(), options);
		},

        sendDTMF : function(tone){
            this.rtcSession.sendDTMF(tone);
        },

		/**
		 * Terminate the WebRTC session
		 */
		hangup: function () {
            if (this.rtcSession != undefined) {
				this.rtcSession.terminate();
			}
		},

		/**
		 * Indicates if the client microphone is muted or not
		 */
		isMuted: false,

		/**
		 * Mute microphone
		 */
		mute: function () {
			var streams = this.rtcSession.connection.getLocalStreams();
			for (var i = 0; i < streams.length; i++) {
				for (var j = 0; j < streams[i].getAudioTracks().length; j++) {
					streams[i].getAudioTracks()[j].enabled = false;
				}
			}
			this.isMuted = true;
		},

		/**
		 * unmute microphone
		 */
		unmute: function () {
			var streams = this.rtcSession.connection.getLocalStreams();
			for (var i = 0; i < streams.length; i++) {
				for (var j = 0; j < streams[i].getAudioTracks().length; j++) {
					streams[i].getAudioTracks()[j].enabled = true;
				}
			}
			this.isMuted = false;
		},

		/**
		 * Checks if the client browser supports WebRTC or not.
		 *
		 * @returns {boolean}
		 */
		isWebRTCSupported: function () {
			if (!window.navigator.webkitGetUserMedia && !window.navigator.mozGetUserMedia) {
				return false;
			}
			else {
				var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
				if (is_firefox) {
					var patt = new RegExp("firefox/([0-9])+");
					var patt2 = new RegExp("([0-9])+");
					var user_agent = patt.exec(navigator.userAgent.toLowerCase())[0];
					var version = patt2.exec(user_agent)[0];
					if (version < 23) {
						return false;
					}
				}

				return true;
			}
		}
	}
});

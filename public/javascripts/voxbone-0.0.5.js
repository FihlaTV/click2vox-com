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

JsSIP.VoxboneLogger.setInfo(function() {
		var args = Array.prototype.slice.call(arguments);
		console.log.apply(console,args);
		if (args.length == 5) {
			voxbone.Logger.addLogToBuffer("INFO: "+args[0]);
			voxbone.Logger.addLogToBuffer("INFO: "+args[3]);
		} else {
			voxbone.Logger.addLogToBuffer("INFO: "+args[0]);
		}

	});

JsSIP.VoxboneLogger.setError = function () {
		var args = Array.prototype.slice.call(arguments);
		console.error.apply(console, args);
		if (args.length == 5) {
			voxbone.Logger.addLogToBuffer("ERROR: "+args[0]);
			voxbone.Logger.addLogToBuffer("ERROR: "+args[3]);
		} else {
			voxbone.Logger.addLogToBuffer("ERROR: "+args[0]);
		}
	};

extend(voxbone, {
	Logger : {
		loginfo : function(log) {
			console.log(log);
			voxbone.Logger.addLogToBuffer("INFO: "+ log);
		},
		logerror : function(log) {
			console.log(log);
			voxbone.Logger.addLogToBuffer("ERROR: "+ log);
		},
		addLogToBuffer : function(log) {
			voxbone.WebRTC.webrtcLogs = voxbone.WebRTC.webrtcLogs.concat("\r\n");
			voxbone.WebRTC.webrtcLogs = voxbone.WebRTC.webrtcLogs.concat(log);
		}

	}
})
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
            		voxbone.Logger.loginfo("[ping] "+pop+" replied in "+duration);
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
                    if ((bestPop == undefined) || (result.ping > 0 && ((bestPop.ping < 0) || (result.ping < bestPop.ping) ))) {
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
		 * URL of voxbone ephemeral auth server for basic auth
		 */
		basicAuthServerURL: 'https://webrtc.voxbone.com/rest/authentication/basicToken',

		/**
		 * Blob containing the logs for a webrtc session
		 */
		webrtcLogs: "",

		/**
		 * The actual WebRTC session
		 */
		rtcSession: {},
		/**
		 * SIP call id for current session
		 */
		callid: "",
		/**
		 * SIP call id of previous session
		 */
		previous_callid: "",
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
			'stun_servers': undefined,
			'turn_servers': undefined,
			'post_logs': false,
			/**
			It controls if we want to push
			the logs for a web session where
			the user didn't make any call attempt
			**/
			'post_logs_nocall': false,
			'webrtc_log': undefined,
			'uri': 'voxrtc@voxbone.com',
			'trace_sip': true,
			'register': false,
			/**
			 * dialer_string
			 * Digits to dial after call is established
			 * dialer string is comma separated, to define a specfic pause between digits,
			 * we add another entry like 1,700ms,2, this will add a 700ms of pause between
			 * digits 1 & 2.
			 * Example = '1,2,3,1200ms,4,5,900ms,6,#'
			*/
			'dialer_string': undefined,
			'digit_duration': 100,  // duration of a digit
			'digit_gap': 500 // pause between two digits
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
			},
			'authExpired': function (e) {
			},
			'getUserMediaAccepted': function(e) {
				voxbone.Logger.loginfo("local media accepted");
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
			voxbone.Logger.loginfo('auth server: ' + this.authServerURL);
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
		 * Same as init, only difference is that it is used for basic authentication
		 * @param username: webrtc username of the customer
		 * @param key: webrtc key in plain text of the customer
		 */
		basicAuthInit: function (username, key) {
			voxbone.Logger.loginfo('auth server: ' + this.basicAuthServerURL);
			$.ajax({
				type: "GET",
				url: this.basicAuthServerURL,
				headers: {
					Accept: "application/json"
				},
				contentType: "application/json; charset=utf-8",
				crossDomain: true,
				cache: false,
				data:  {
					'username': username,
					'key': key,
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
			this.configuration.ws_servers = data.wss;
			this.configuration.stun_servers = data.stunServers;
			this.configuration.turn_servers = data.turnServers;
			this.configuration.webrtc_log = data.log;

			this.configuration.authorization_user = data.username;
			this.configuration.password = data.password;
			//If no prefered Pop is defined, ping and determine which one to prefer
			if (this.preferedPop == undefined) {
				voxbone.Logger.loginfo("prefered pop undefined, pinging....");
				this.pingServers = data["pingServers"];
				$.each(this.pingServers, function (key, value) {
					voxbone.Pinger.ping(key, value);
				});
			} else {
				voxbone.Logger.loginfo("preferred pop already set to " + this.preferedPop);
			}

			var timeout = this.getAuthExpiration();
			if (timeout > 0) {
				voxbone.Logger.loginfo("Credential expires in " + timeout + " seconds");
				// refresh at 75% of duration
				setTimeout(this.customEventHandler.authExpired, timeout*750)
			}
		},

		/**
		 * Calculates the number of seconds until the current WebRTC token expires
		 *
		 * @returns time until expration in seconds
		 */

		getAuthExpiration: function (data) {
			var now = Math.floor((new Date).getTime()/1000);
			var fields = this.configuration.authorization_user.split(/:/);
			return fields[0] - now;
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
			audio.src = (window.URL ? URL : webkitURL).createObjectURL(audioStream);
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
            video.src = (window.URL ? URL : webkitURL).createObjectURL(videoStream);
            return video;
        },


        sendPreConfiguredDtmf : function(digitsPending){
		var digit = undefined;
		var pause = 0;
		var digit_sent = false;

		if (voxbone.WebRTC.dtmfTimer !== undefined) {
			clearTimeout(voxbone.WebRTC.dtmfTimer);
			voxbone.WebRTC.dtmfTime = undefined;
		}
		if (digitsPending.length > 0) {
			if (digitsPending[0].indexOf('ms') != -1) {
				/*Calculate the pause in this case*/
				pause = parseInt(digitsPending[0].substring(0,digitsPending[0].indexOf('ms')));
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
				voxbone.WebRTC.dtmfTimer = setTimeout(function () {
					voxbone.WebRTC.sendPreConfiguredDtmf(digitsPending);
					}, nextDigitGap);
			}

		}

	},
        postCallRating : function(e164, rating, comment, url){
		if (voxbone.WebRTC.previous_callid !== undefined) {
			$.ajax({
				type: "POST",
				url: voxbone.WebRTC.configuration.webrtc_log,
				crossDomain: true,
				data: {
					'payload_type': "webrtc_call_rating",
					'username': voxbone.WebRTC.configuration.authorization_user,
					'password': voxbone.WebRTC.configuration.password,
					'callid' : voxbone.WebRTC.previous_callid,
					'e164' : e164,
					'url' : url,
					'rating' : rating,
					'comment' : comment,
				}
			});
			/*
			 *We are assuming that postCallRating is the
			 *only function using previous_callid, so
                         *we can nuke it here
			*/
			voxbone.WebRTC.previous_callid = undefined;
		}

	},
        postLogsToServer : function(){
		if (voxbone.WebRTC.configuration.post_logs == true) {
			/*Push the webrtc logs to the logging server*/
			if (voxbone.WebRTC.configuration.webrtc_log !== undefined) {
				$.ajax({
					type: "POST",
					url: voxbone.WebRTC.configuration.webrtc_log,
					crossDomain: true,
					data: {
						'payload_type': "webrtc_logs",
						'username': voxbone.WebRTC.configuration.authorization_user,
						'password': voxbone.WebRTC.configuration.password,
						'callid' : voxbone.WebRTC.callid,
						'pop' : voxbone.WebRTC.preferedPop,
						'context' : voxbone.WebRTC.context,
						'uri' : voxbone.WebRTC.configuration.uri,
						'logs' : voxbone.WebRTC.webrtcLogs
					}
				});
			}
		}
	},
	/*Clean up the webrtc object, resets any ongoing timers and other data specific to
          the current call*/
        cleanUp : function(){
		if (voxbone.WebRTC.localVolumeTimer !== undefined) {
			clearInterval(voxbone.WebRTC.localVolumeTimer);
			voxbone.WebRTC.localVolumeTimer = undefined;
			voxbone.WebRTC.audioContext = undefined;
			voxbone.WebRTC.audioScriptProcessor = undefined;
		}
		if (voxbone.WebRTC.dtmfTimer !== undefined) {
			clearTimeout(voxbone.WebRTC.dtmfTimer);
			voxbone.WebRTC.dtmfTimer = undefined;
		}
		voxbone.WebRTC.previous_callid = voxbone.WebRTC.callid;
		voxbone.WebRTC.callid = "";
		voxbone.WebRTC.webrtcLogs = "";
		voxbone.WebRTC.rtcSession = {};

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
			voxbone.Logger.loginfo("prefered pop: ", this.preferedPop);

			var headers = [];
			headers.push('X-Voxbone-Pop: ' + this.preferedPop);

			if (this.context) {
				headers.push('X-Voxbone-Context: ' + this.context);
			}

			var options = {
				'eventHandlers': {
					'peerconnection': function (e) {
						var streams = e.peerconnection.getLocalStreams()
						voxbone.Logger.loginfo("streams "+ streams.length);
					 	for (var i = 0; i < streams.length; i++) {
							if(streams[i].getAudioTracks().length > 0) {
								/*activate the local volume monitoring*/
								try {
						        		voxbone.WebRTC.audioContext = new AudioContext();
								}
								catch (e) {
									voxbone.Logger.logerror("Web Audio API not supported");
								}
								voxbone.WebRTC.audioScriptProcessor = voxbone.WebRTC.audioContext.createScriptProcessor(0, 1, 1);
								var mic = voxbone.WebRTC.audioContext.createMediaStreamSource(streams[i]);
								mic.connect(voxbone.WebRTC.audioScriptProcessor);
								voxbone.WebRTC.audioScriptProcessor.connect(voxbone.WebRTC.audioContext.destination);
								voxbone.WebRTC.audioScriptProcessor.onaudioprocess = function(event) {
									var input = event.inputBuffer.getChannelData(0);
									var i;
									var sum = 0.0;
									for (i = 0; i < input.length; ++i) {
										sum += input[i] * input[i];
									}
									voxbone.WebRTC.localVolume = Math.sqrt(sum / input.length);
								}
								voxbone.WebRTC.localVolumeTimer = setInterval(function() {
									var e = { localVolume : voxbone.WebRTC.localVolume.toFixed(2)};
									voxbone.WebRTC.customEventHandler.localMediaVolume(e);
									}, 200);
								break;
							}
					 	}

					},
					'sending': function (e) {
						voxbone.WebRTC.callid = e.request.call_id;
					},
					'progress': function (e) {
                        voxbone.WebRTC.customEventHandler.progress(e);
					},
					'failed': function (e) {
						voxbone.Logger.logerror("Call failed, Failure cause is " +e.cause);
						voxbone.WebRTC.postLogsToServer();
						voxbone.WebRTC.cleanUp();
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
						if (voxbone.WebRTC.configuration.dialer_string !== undefined && voxbone.WebRTC.configuration.dialer_string.length > 0) {
							var digitsPending = voxbone.WebRTC.configuration.dialer_string.split(',');
							voxbone.WebRTC.sendPreConfiguredDtmf(digitsPending);
						}
					},
					'ended': function (e) {
						voxbone.WebRTC.postLogsToServer();
						voxbone.WebRTC.cleanUp();
						voxbone.WebRTC.customEventHandler.ended(e);
					},
				},
				'extraHeaders': [],
				'pcConfig': { rtcpMuxPolicy: "negotiate" },
				'mediaConstraints': {'audio': true, 'video': voxbone.WebRTC.allowVideo}
			};
			if (this.configuration.stun_servers !== undefined || this.configuration.turn_servers !== undefined) {
				var ice_servers = [];
				for (var i=0; i < this.configuration.stun_servers.length; i++) {
					ice_servers.push(this.configuration.stun_servers[i]);
				}
				for (var i=0; i < this.configuration.turn_servers.length; i++) {
					ice_servers.push(this.configuration.turn_servers[i]);
				}
				options.pcConfig.iceServers = ice_servers;

				/**
				  * Stop the ice gathering process 10 seconds after we
			          * we have atleast 1 relay candidate
                                */
                                options.pcConfig.gatheringTimeoutAfterRelay = 5000;
			}
			options.pcConfig.iceCandidatePoolSize=10;


			options.extraHeaders = headers;
			if (this.phone == undefined) {
				this.phone = new JsSIP.UA(this.configuration);
				this.phone.once('connected', function() { voxbone.WebRTC.rtcSession = voxbone.WebRTC.phone.call(uri.toAor(), options);});
				this.phone.on('newRTCSession', function(data) { data.session.on('connecting', function(e) {voxbone.WebRTC.customEventHandler.getUserMediaAccepted(e);}) });
				this.phone.start();
			} else {
				this.phone.configuration = this.configuration;
				this.rtcSession = this.phone.call(uri.toAor(), options);
			}
		      },
		/**
		 * Checks if user is in an established
                 * call or if a call attempt is in progress,
		 * returns true if any of the above conditions
		 * is true otherwise returns false
		 *
		 * @returns {boolean}
		 */
		isCallOpen : function() {
			if (typeof voxbone.WebRTC.rtcSession.isEstablished === "function" && typeof voxbone.WebRTC.rtcSession.isInProgress === "function") {
				if ((voxbone.WebRTC.rtcSession.isInProgress() == true) || (voxbone.WebRTC.rtcSession.isEstablished() == true)) {
					return true;
				}
			}
			return false;
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
		 * voxbone handler for page unload
		 * It will hangup any ongoing calls
		 * and post the logs
		 */
		unloadHandler: function () {
			if (typeof(voxbone.WebRTC.rtcSession.hangup) === "function") {
					voxbone.Logger.loginfo("Page unloading while a call was in progress, hanging up");
					voxbone.WebRTC.hangup();
					voxbone.WebRTC.postLogsToServer();
			} else if (voxbone.WebRTC.configuration.post_logs_nocall == true) {
				/*Don't care if any calls were made, we still want logs*/
				voxbone.WebRTC.postLogsToServer();
			}

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

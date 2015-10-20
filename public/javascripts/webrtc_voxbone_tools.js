//TODO: we should move this into modules

function cleanHmacDigest(hmac) {
  while ((hmac.length % 4 != 0)) {
    hmac += '=';
  }
  hmac = hmac.replace('/ /g', '+');
  return hmac;
};

function createKey() {
  self.username = 'webrtcventurestest';
  self.secret = 'T#st123!';
  var sha1 = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA1, self.secret);
  self.expires = Math.round(Date.now()/1000) + 100;
  var text = self.expires + ':' + self.username;
  sha1.update(text);
  hmac = sha1.finalize();
  self.key = cleanHmacDigest(hmac.toString(CryptoJS.enc.Base64));
  var data = {};
  data.key = self.key;
  data.expires = self.expires;
  data.username = self.username;
  return data;
};

/**
** Detects browser compatibility
**/
function detectBrowser(){
  var supported = voxbone.WebRTC.isWebRTCSupported();
  if(supported == false){
    $('#container').innerHTML = '<p>Your browser does not support WebRTC, please switch to Chrome, Opera, or Firefox.</p>'
  }else{
    console.log("WebRTC is supported, it's all goooood.");
  }
}

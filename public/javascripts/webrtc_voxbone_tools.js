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

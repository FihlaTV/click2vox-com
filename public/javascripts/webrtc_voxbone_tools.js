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

var connection = new RTCMultiConnection();

connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

connection.userid = 'destination-' + connection.userid;

connection.session = {
    audio: true,
    video: false
};

connection.dontCaptureUserMedia = true;

var BandwidthHandler = connection.BandwidthHandler;
connection.bandwidth = {
  audio: 510
};
connection.processSdp = function(sdp) {
    sdp = BandwidthHandler.setApplicationSpecificBandwidth(sdp, connection.bandwidth, !!connection.session.screen);
    /*sdp = BandwidthHandler.setVideoBitrates(sdp, {
        min: connection.bandwidth.video,
        max: connection.bandwidth.video
    });*/

    sdp = BandwidthHandler.setOpusAttributes(sdp);

    sdp = BandwidthHandler.setOpusAttributes(sdp, {
        'stereo': 1,
        'maxaveragebitrate': connection.bandwidth.audio * 1000 * 8,
        'maxplaybackrate': connection.bandwidth.audio * 1000 * 8,
        'maxptime': 3
    });

    return sdp;
};

connection.mediaConstraints = {
    audio: true,
};

connection.iceServers = [];

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: false
};

var predefinedRoomId = '437829';

window.addEventListener("DOMContentLoaded", function() {
  document.getElementById('btn-join-room').onclick = function() {
      this.disabled = true;
      connection.openOrJoin( predefinedRoomId );
  };
}, false);
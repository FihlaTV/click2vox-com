$(document).ready(function () {
  $('#control').append(' \
    <div class="vox-widget-wrapper"> \
      <div class="vw-main"> \
        <div class="vw-header"> \
          <span class="vw-title"> \
            In Call \
          </span> \
          <div class="vw-actions"> \
            <a href="javascript:void(0)"><i class="vw-icon vx-icon-full-sreen-on"></i></a> \
            <a href="javascript:void(0)"><i class="vw-icon vx-icon-close"></i></a> \
          </div> \
        </div> \
        <div class="vw-body"> \
          <div class="vw-btn-group"> \
            <a href="javascript:void(0)"> \
              <i class="vw-icon vx-icon-mic"></i> \
              <div class="int-sensor"> \
                <em></em> \
                <em></em> \
                <em class="on"></em> \
              </div> \
            </a> \
            <a href="javascript:void(0)"> \
              <i class="vw-icon vx-icon-vol"></i> \
              <div class="int-sensor"> \
                <em></em> \
                <em class="on"></em> \
                <em class="on"></em> \
              </div> \
            </a> \
            <a class="active" href="javascript:void(0)"><i class="vw-icon vx-icon-pad"></i></a> \
          </div> \
          <a href="javascript:void(0)" class="vw-end-call"><i class="vw-icon vx-icon-phone"></i>End Call</a> \
          <div class="vw-dialpad active"> \
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
          <div class="vw-footer"> \
            <a href="#">powered by:</a> \
          </div> \
        </div> \
      </div> \
    </div> \
  ');

  $('.vw-dialpad li').click(function(e) {
    e.preventDefault();
    $('#call_button_frame')[0].contentWindow.postMessage(this.textContent,'*');
  });

  $(".vw-end-call").click(function(e) {
    e.preventDefault();
    $('#call_button_frame')[0].contentWindow.postMessage('hang_up','*');
  });
});


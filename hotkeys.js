var $j = jQuery.noConflict();
var enabled = 1;

$j(document).keydown(function(e) {
  if (enabled == 1) {
    switch (e.which) {
      case 80: //p
        $j(".tarantula-btn-pass").click();
        break;

      case 70: //f
        $j(".tarantula-btn-fail").click();
        nextstep();
        break;

      case 83: //s
        $j(".tarantula-btn-skip").click();
        nextstep();
        break;

      case 78: //n
        $j(".tarantula-btn-notimplemented").click();
        nextstep();
        break;

      case 40: //down arrow
        nextstep();
        console.log('down');
        break;

      case 38: //up arrow
        $j(".tarantula-btn-prev")[1].click();
        console.log('up');
        break;

      case 109: //-
        $j(".tarantula-btn-prev")[0].click();
        break;

      case 107: //+
        $j(".tarantula-btn-next")[0].click();
        break;
    }
  }
});

function nextstep () {
  $j(".tarantula-btn-next")[1].click();
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "enable") {
      enabled = 1;
    }
    else if (request.message === "disable") {
      enabled = 0;
    }
  }
);

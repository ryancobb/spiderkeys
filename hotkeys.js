var $j = jQuery.noConflict();
var enabled = 1;

get_button_state(); //get the button state on intial load

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
        break;

      case 38: //up arrow
        $j(".tarantula-btn-prev")[1].click();
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

//Get button state
function get_button_state () {
  chrome.runtime.sendMessage({msg: "btn_state"}, function(response){
     enabled = response.msg * 1;
  });
}

//Listen for button updates
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      enabled = request.msg * 1;
  });

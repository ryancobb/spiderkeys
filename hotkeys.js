var $j = jQuery.noConflict();
var enabled = 1;

get_button_state(); //get the button state on intial load

$j(document).keydown(function(e) {
  var lastStep = false;

  if (enabled == 1) {
    if ( inTest() ) {
      if ( notTextBox() ) {
        switch (e.which) {
          case 80: //p

            if ( lastTestStep() ) {
              lastStep = true;
            }

            $j(".tarantula-btn-pass").click();
            if ( lastStep ) {
              nextCase();
            }
            break;

          case 70: //f
            $j(".tarantula-btn-fail").click();
            next();
            break;

          case 83: //s
            $j(".tarantula-btn-skip").click();
            next();
            break;

          case 78: //n
            $j(".tarantula-btn-notimplemented").click();
            next();
            break;

          case 40: //down arrow
            next();
            break;

          case 38: //up arrow
            $j(".tarantula-btn-prev")[1].click();
            break;

          case 109: //-
            $j(".tarantula-btn-prev")[0].click();
            break;

          case 107: //+
            nextCase();
            break;
        }
      }
    }
  }
});

function next() {
  if ( lastTestStep() ) {
    nextCase();
  }
  else {
    nextstep();
  }
}

function lastTestStep() {
  return $j(".tarantula-execution-step-current").next("tr").text() === "End of Case"
}

function nextstep () {
  $j(".tarantula-btn-next")[1].click();
};

function nextCase() {
  $j(".tarantula-btn-next")[0].click();
}

function notTextBox() {
  return $j(".x-form-focus").length === 0;
}

function inTest() {
  return $j("#toolbar tr td:first").text() == "Case Execution";
}

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

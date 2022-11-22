var playerABtn = document.getElementById("A");
var playerBBtn = document.getElementById("B");
var playerAText = document.getElementById("playerA");
var playerBText = document.getElementById("playerB");
var startBtn = document.getElementById("start");
var dualBtn = document.getElementById("dual");
var resetBtn = document.getElementById("reset");
var checkBtn = document.getElementById("check");
var defaulttime = new Date(0, 0, 0, 0, 0, 0, 0);
var playerAtimer = new Date(0, 0, 0, 0, 15, 0, 0);
var playerBtimer = new Date(0, 0, 0, 0, 15, 0, 0);
var started = false;
var playerA = false;
var playerB = false;
var pause = false;
var check = false;
var playerAvalue = 0;
var playerBvalue = 0;
var playerAarray = [];
var playerBarray = [];

function parse(number) {
  if (number < 10) {
    return "0" + number;
  } else {
    return number;
  }
}

function settime() {
  playerAText.value =
    parse(playerAtimer.getMinutes()) + ":" + parse(playerAtimer.getSeconds());
  playerBText.value =
    parse(playerBtimer.getMinutes()) + ":" + parse(playerBtimer.getSeconds());
}

dualBtn.addEventListener("click", function () {
  pause = !pause;
  dualBtn.innerText = pause ? "Resume" : "Pause";
});

checkBtn.addEventListener("click",() =>{
	check=!check;
	if(playerA){
		playerAText.value = "U Win";
        playerBText.value = "Over";
	}
	if(playerB){
		playerBText.value = "U Win";
        playerAText.value = "Over";
	}
	playerA = false;
	playerB = false;
	started = false;
});

startBtn.addEventListener("click", () => {
  playerA = true;
  playerB = false;
  started = true;
  check = false;
  playerAvalue = playerAText.value;
  playerBvalue = playerBText.value;
  playerAarray = playerAvalue.split(":");
  playerBarray = playerBvalue.split(":");
  playerAtimer = new Date(0, 0, 0, 0, playerAarray[0], playerAarray[1], 0);
  playerBtimer = new Date(0, 0, 0, 0, playerBarray[0], playerBarray[1], 0);
  settime();
});

resetBtn.addEventListener("click", function () {
  playerA = false;
  playerB = false;
  started = false;
  pause = false;
  check = false;
  dualBtn.innerText = pause ? "Resume" : "Pause";
  playerAtimer = new Date(0, 0, 0, 0, 15, 0, 0);
  playerBtimer = new Date(0, 0, 0, 0, 15, 0, 0);
  settime();
});

playerABtn.addEventListener("click", () => {
  playerA = false;
  playerB = true;
  started = true;
  pause = false;
});

playerBBtn.addEventListener("click", () => {
  playerB = false;
  playerA = true;
  started = true;
  pause = false;
});

function timerFunction() {
	
  if (started && !pause) {
	  console.log(pause);
    if (playerB) {
      playerBtimer = new Date(playerBtimer.getTime() - 1000);
	  settime();
	  }
	  if(playerBtimer.getTime() <= defaulttime.getTime()) {
        playerA = false;
        playerB = false;
        started = false;
        playerAText.value = "U Win";
        playerBText.value = "Over";
      }
    
    if (playerA) {
      playerAtimer = new Date(playerAtimer.getTime() - 1000);
      settime();
	   }
	   if(playerAtimer.getTime() <= defaulttime.getTime()) {
        playerA = false;
        playerB = false;
        started = false;
        playerBText.value = "U Win";
        playerAText.value = "Over";
      }
    }
}


setInterval(timerFunction, 1000);

function collision({
    ob1,
    ob2
}){
    return(
        ob1.attackBox.position.x + ob1.attackBox.width >= ob2.position.x && ob1.attackBox.position.x <= ob2.position.x +ob2.width &&  ob1.attackBox.position.y /*top of attackbox*/+ ob1.attackBox.height /*bottom of attackBox */ >= ob2.position.y
        /* top side of foe*/&& ob1.attackBox.position.y /*top side of player attackBox */ <= ob2.position.y +ob2.height /*bottom side of foe */
    )
}

function judge({player, foe, timerLeftID}){
    clearTimeout(timerLeftID)
    document.querySelector('#display').style.display='flex'
    if(player.health === foe.health){
        document.querySelector('#display').innerHTML = 'Tie'
       
    }else if(player.health > foe.health){
        document.querySelector('#display').innerHTML = 'Player wins' 
    }
    else if(foe.health > player.health){
        document.querySelector('#display').innerHTML = 'Enemy wins' 
    }
}

let timeLeft = 60;
let timerLeftID

function countdown() {
  timeLeft--
  document.querySelector("#timer").innerHTML = String( timeLeft )
  if (timeLeft > 0) {
    timerLeftID= setTimeout(countdown, 1000);
  }

  if(timeLeft === 0){
        judge({player, foe, timerLeftID})    
}
};

setTimeout(countdown, 1000);


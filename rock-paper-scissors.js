const score=JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  losses:0,
  ties:0
};

let isAutoPlaying=false;
let intervalId;

function autoplay(){
  if(!isAutoPlaying){
    intervalId=setInterval(function(){
      const Move=pickComputermove();
      playGame(Move);
    },1000)
    isAutoPlaying=true;
  }else{
    clearInterval(intervalId);
    isAutoPlaying=false;
  }
}

updateScoreElement();

function playGame(playerMove){
  const computerMove=pickComputermove();
  let result='';
  if(playerMove=='Scissors'){
    if(computerMove === 'Rock'){
      result='You lose.';
    }else if(computerMove==='Paper'){
      result='You win.';
    }else if(computerMove==='Scissors'){
      result='Tie.';
    }
  }else if(playerMove=='Paper'){
    if(computerMove === 'Rock'){
    result='You win.';
    }else if(computerMove==='Paper'){
      result='Tie.';
    }else if(computerMove==='Scissors'){
      result='You lose.';
    }
  }else if(playerMove=='Rock'){
    if(computerMove === 'Rock'){
    result='Tie.';
    }else if(computerMove==='Paper'){
      result='You lose.';
    }else if(computerMove==='Scissors'){
      result='You win.';
    }
  }
  if(result==='You win.'){
    score.wins+=1;
  }else if(result==='You lose.'){
    score.losses+=1;
  }else if(result==='Tie.'){
    score.ties+=1;
  }

  localStorage.setItem('score',JSON.stringify(score));

  document.querySelector('.js-move')
  .innerHTML=`You
  <img src="images/${playerMove}-emoji.png" class="move-icon">
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;

  updateScoreElement();

  document.querySelector('.js-result').innerHTML=result;
}

function updateScoreElement(){
  document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputermove(){
  const randomNumber=Math.random();
  let computerMove='';
  if(randomNumber>=0 && randomNumber<1/3){
    computerMove='Rock';
  }else if(randomNumber>=1/3 && randomNumber<2/3){
    computerMove='Paper';
  }else if(randomNumber>=2/3 && randomNumber<1){
    computerMove='Scissors';
  }
  return computerMove;
}

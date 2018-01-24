let counter = 0,
    arrayOfCards = $(".card"),
    moves = 0,
    arrOfitems = [],
    stars = 3,
    star1 = $(".stars")[0].childNodes[1].childNodes[0],
    star2 = $(".stars")[0].childNodes[3].childNodes[0],
    star3 = $(".stars")[0].childNodes[5].childNodes[0],
    shuffledCardArray = [];
        
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// shuffle cards
function ShuffleOnCards(){
    $(".deck").innetHTML = "";
    shuffledCardArray = shuffle(arrayOfCards);
    $(".deck").append(shuffledCardArray);
}

ShuffleOnCards();



// timer

let minutesLabel = document.getElementById("minutes"),
    secondsLabel = document.getElementById("seconds"),
    totalSeconds = 0,
    seconds = 0,
    minutes = 0,
    TimerId = setInterval(setTime, 1000);

function setTime() {
    ++totalSeconds;
    seconds =  pad(totalSeconds % 60);
    minutes = pad(parseInt(totalSeconds / 60));
    secondsLabel.innerHTML = seconds;
    minutesLabel.innerHTML = minutes ;
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

    
    
//reset All cards 
function playAgain(){
   $(".card").removeClass("open match unmatch");
    ShuffleOnCards();
   $("div.congratsTab").remove();
   moves = 0;
   $(".moves")[0].innerHTML = moves;
   counter = 0;
   $(star1).attr("class","fa fa-star");
   $(star2).attr("class","fa fa-star");
   $(star3).attr("class","fa fa-star");

// clear Timer
   clearInterval(TimerId);
   secondsLabel.innerHTML = "00";
   minutesLabel.innerHTML = "00";
   totalSeconds = 0;       
   TimerId = setInterval(setTime, 1000);

}

// reset when click "reset btn"
$(".restart").click(function(){
   playAgain();
})

//show Card
$(".card").click(function(){
    if($(this).hasClass("open") == false){
        $(this).addClass("open");
        counter++;
        checkCard(this);
    }
});


/* check cards if equal or not equal*/
function checkCard(item){
    
    arrOfitems.push(item);
    if(counter===2){
        counter = 0;
        let item1 = arrOfitems[0],
            item2 = arrOfitems[1],
            item1CassName = item1.childNodes[1].className,
            item2ClassName = item2.childNodes[1].className;

        if(item1CassName===item2ClassName){
            $(item1).addClass("match");
            $(item2).addClass("match");
            
        }else{
            
            setTimeout(function(){
                $(item1).addClass("unmatch");
                $(item1).removeClass("open");
            },500);
            
            setTimeout(function(){
                $(item2).addClass("unmatch");
                $(item2).removeClass("open");
            },500);
            
            setTimeout(function(){
                $(item1).removeClass("unmatch");
                $(item2).removeClass("unmatch");
            },1000);
            
        }
        moves++;
        $(".moves")[0].innerHTML = moves;
        arrOfitems=[];
        checkCompleteness();
        calcStars();
        

    }
}
// check if user finish all cards
function checkCompleteness(){
    let len = $(".match").length;
    if(len==16){
        clearInterval(TimerId);

        $(".deck").append("<div class='congratsTab' ><span></span> <h1>Congratulations! You Won!</h1> <p> with " + moves + " Moves and "+ stars +" Stars </p> <p>time taken: " + minutes + ":" + seconds +"</p> <button id='again' >Play Again</button></div>");
        
    }
}

// calc Star
function calcStars(){
    
    if(moves==8){
         $(star3).attr("class","fa fa-star-o");
         stars=2;
    }else if(moves==14){
        $(star2).attr("class","fa fa-star-o");
        stars=1;
    }

}

// reset where clicking on "Play Again"

$("div").on("click","#again",function(){
    playAgain();
});



var MemoryGame = (function() {
    // Your Memory Game JavaScript code here
  
    const memoryMoves = document.getElementById("moves-count");
    const timeValue = document.getElementById("time");
    const memoryGameStartButton = document.getElementById("memo-start");
    const memoryStopButton = document.getElementById("stop");
    const gameContainer = document.querySelector(".game-container");
    const result = document.getElementById("results");
    const controls = document.querySelector(".controls-container");
    let memoryCards;
    let interval;
    let firstCard = false;
    let secondCard = false;
    
    // Other Memory Game functions and logic...
    //Items array
    const items = [
      { name: "memo_01", image: "img/memo_01.png" },
      { name: "memo_02", image: "img/memo_02.jpg" },
      { name: "memo_03", image: "img/memo_03.jpg" },
      { name: "memo_04", image: "img/memo_04.jpg" },
      { name: "memo_05", image: "img/memo_05.png" },
      { name: "memo_06", image: "img/memo_06.jpg" },
      { name: "memo_07", image: "img/memo_07.jpg" },
      { name: "memo_08", image: "img/memo_08.jpg" },
      { name: "memo_09", image: "img/memo_09.jpg" },
      { name: "memo_10", image: "img/memo_10.jpg" },
      { name: "memo_11", image: "img/memo_11.jpg" },
      { name: "memo_12", image: "img/memo_12.jpg" },
      { name: "memo_13", image: "img/memo_13.png" },
      { name: "memo_14", image: "img/memo_14.png" },
      { name: "memo_15", image: "img/memo_15.jpg" },
      { name: "memo_16", image: "img/memo_16.jpg" },
      { name: "memo_17", image: "img/memo_17.jpg" },
      { name: "memo_18", image: "img/memo_18.jpg" },
      { name: "memo_19", image: "img/memo_19.jpg" },
      { name: "memo_20", image: "img/memo_20.jpg" },
    ];

  //Initial Time
let seconds = 0,
minutes = 0;
//Initial moves and win count
let movesCount = 0,
winCount = 0;

//For timer
const timeGenerator = () => {
seconds += 1;
//minutes logic
if (seconds >= 60) {
  minutes += 1;
  seconds = 0;
}
//format time before displaying
let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
movesCount += 1;
memoryMoves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

//Pick random objects from the items array
const generateRandom = (size = 4) => {
//temporary array
let tempArray = [...items];
//initializes cardValues array
let cardValues = [];
//size should be double (4*4 matrix)/2 since pairs of objects would exist
size = (size * size) / 2;
//Random object selection
for (let i = 0; i < size; i++) {
  const randomIndex = Math.floor(Math.random() * tempArray.length);
  cardValues.push(tempArray[randomIndex]);
  //once selected remove the object from temp array
  tempArray.splice(randomIndex, 1);
}
return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
gameContainer.innerHTML = "";
cardValues = [...cardValues, ...cardValues];
//simple shuffle
cardValues.sort(() => Math.random() - 0.5);
for (let i = 0; i < size * size; i++) {
  /*
      Create Cards
      before => front side (contains question mark)
      after => back side (contains actual image);
      data-card-values is a custom attribute which stores the names of the cards to match later
    */
  gameContainer.innerHTML += `
   <div class="card-container" data-card-value="${cardValues[i].name}">
      <div class="card-before">?</div>
      <div class="card-after">
      <img src="${cardValues[i].image}" class="image"/></div>
   </div>
   `;
}
//Grid
gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

//Cards
memoryCards = document.querySelectorAll(".card-container");
memoryCards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount == half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>Nice ONE!!!</h2>
            <h4>Moves: ${movesCount}</h4>`;
            result.classList.add("show");
            setTimeout(() => {
                stopGame();
            }, .1);
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

  
    memoryGameStartButton.addEventListener("click", () => {
      // Memory Game start logic...
      movesCount = 0;
      seconds = 0;
      minutes = 0;
      //controls and buttons visibility
      controls.classList.add("hide");
      memoryStopButton.classList.remove("hide");
      memoryGameStartButton.classList.add("hide");
      //Start timer
      interval = setInterval(timeGenerator, 1000);
      //initial moves
      memoryMoves.innerHTML = `<span>Moves:</span> ${movesCount}`;
      initializer();
    });
  
    memoryStopButton.addEventListener("click", () => {
      // Memory Game stop logic...
    controls.classList.remove("hide");
    memoryStopButton.classList.add("hide");
    memoryGameStartButton.classList.remove("hide");
    clearInterval(interval);
    });


        // Any other logic you need to stop the game
        memoryStopButton.addEventListener(
            "click",
            (stopGame = () => {
              controls.classList.remove("hide");
              memoryStopButton.classList.add("hide");
              memoryGameStartButton.classList.remove("hide");
              clearInterval(interval);
            })
);
  
    // Initialize Memory Game...
const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};
})();

  var OtherGame = (function() {
    // Your Other Game JavaScript code here
  
    const otherMoves = document.getElementById("moves");
    const container = document.querySelector(".container");
    const puzzleGameStartButton = document.getElementById("puzzle-start");
    const coverScreen = document.querySelector(".cover-screen");
    const otherResult = document.getElementById("resulta");
    // Other variables and functions...

    
//Random number for image
const randomNumber = () => Math.floor(Math.random() * 8) + 1;

//Get row and column value from data-position
const getCoords = (element) => {
  const [row, col] = element.getAttribute("data-position").split("_");
  return [parseInt(row), parseInt(col)];
};

//row1, col1 are image co-ordinates while row2 amd col2 are blank image co-ordinates
const checkAdjacent = (row1, row2, col1, col2) => {
  if (row1 == row2) {
    //left/right
    if (col2 == col1 - 1 || col2 == col1 + 1) {
      return true;
    }
  } else if (col1 == col2) {
    //up/down
    if (row2 == row1 - 1 || row2 == row1 + 1) {
      return true;
    }
  }
  return false;
};

//Fill array with random value for images
const randomImages = () => {
  while (imagesArr.length < 8) {
    let randomVal = randomNumber();
    if (!imagesArr.includes(randomVal)) {
      imagesArr.push(randomVal);
    }
  }
  imagesArr.push(9);
};

//Generate Grid
const gridGenerator = () => {
  let count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let div = document.createElement("div");
      div.setAttribute("data-position", `${i}_${j}`);
      div.addEventListener("click", selectImage);
      div.classList.add("image-container");
      div.innerHTML = `<img src="img/P&G_0${
        imagesArr[count]
      }.png" class="image ${
        imagesArr[count] == 3 ? "target" : ""
      }" data-index="${imagesArr[count]}"/>`;
      count += 1;
      container.appendChild(div);
    }
  }
};

//Click the image
const selectImage = (e) => {
  e.preventDefault();
  //Set currentElement
  currentElement = e.target;
  //target(blank image)
  let targetElement = document.querySelector(".target");
  let currentParent = currentElement.parentElement;
  let targetParent = targetElement.parentElement;

  //get row and col values for both elements
  const [row1, col1] = getCoords(currentParent);
  const [row2, col2] = getCoords(targetParent);

  if (checkAdjacent(row1, row2, col1, col2)) {
    //Swap
    currentElement.remove();
    targetElement.remove();
    //Get image index(to be used later for manipulating array)
    let currentIndex = parseInt(currentElement.getAttribute("data-index"));
    let targetIndex = parseInt(targetElement.getAttribute("data-index"));
    //Swap Index
    currentElement.setAttribute("data-index", targetIndex);
    targetElement.setAttribute("data-index", currentIndex);
    //Swap Images
    currentParent.appendChild(targetElement);
    targetParent.appendChild(currentElement);
    //Array swaps
    let currentArrIndex = imagesArr.indexOf(currentIndex);
    let targetArrIndex = imagesArr.indexOf(targetIndex);
    [imagesArr[currentArrIndex], imagesArr[targetArrIndex]] = [
      imagesArr[targetArrIndex],
      imagesArr[currentArrIndex],
    ];

    //Win condition
    if (imagesArr.join("") == "123456789") {
      setTimeout(() => {
        //When games ends display the cover screen again
        coverScreen.classList.remove("hide");
        container.classList.add("hide");
        otherResult.innerText = `Total Moves: ${movesCount}`;
        startButton.innerText = "RestartGame";
      }, 1000);
    }
    //Increment a display move
    movesCount += 1;
    otherMoves.innerText = `Moves: ${movesCount}`;
  }
};
  
    puzzleGameStartButton.addEventListener("click", () => {
      // Other Game start logic...
      container.classList.remove("hide");
      createRestartButton(); // Create the restart button
      coverScreen.classList.add("hide");
      container.innerHTML = "";
      imagesArr = [];
      randomImages();
      gridGenerator();
      movesCount = 0;
      otherMoves.innerText = `Moves: ${movesCount}`;
      otherResult.innerText = "";
    });
    // Restart button
const createRestartButton = () => {
    const restartButton = document.createElement("button");
    restartButton.id = "restart-button";
    restartButton.textContent = "Reshuffle";
    restartButton.addEventListener("click", restartGame);

  // Insert the restart button above the container
  container.insertAdjacentElement("beforebegin", restartButton);
};
// Function to restart the game
const restartGame = () => {
    container.innerHTML = "";
    imagesArr = [];
    randomImages();
    gridGenerator();
    movesCount = 0;
    otherMoves.innerText = `Moves: ${movesCount}`;
    otherResult.innerText = "";
    coverScreen.classList.add("hide");
};
  
    // Initialize Other Game...
    window.onload = () => {
        coverScreen.classList.remove("hide");
        container.classList.add("hide");
      };
  })();
  
  
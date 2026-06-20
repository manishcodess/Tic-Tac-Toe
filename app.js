let turn = 'O';
let total_turn = 0;

//👉 addEventListener and removeEventListener need the function itself, not the function call.
let winner = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

let board_array = new Array(9).fill("E");
//   0.  1.  2.  3.  4.  5.  6.  7.  8
// ["E","E","E","E","E","E","E","E","E"]


function checkWinner(){
   
    for(let [index0,index1,index2] of winner)
    { // o==0 &&0==0      ya fir x==x && x==x
        if(board_array[index0]!="E"&&board_array[index0]===board_array[index1]&&board_array[index1]===board_array[index2])
            return 1;
    }


    return 0;

}


// Print sahi se ho rha hai....

const printer = (event)=>{
   //i have 3 option o,x,draw
    const element = event.target;
    //console.log(typeof element.id); //string
    //console.log(typeof board_array[element.id]); //string

    // if board is empty (no x to o vice versa)
    if(board_array[element.id]==="E") {
      total_turn++;
      element.classList.add("taken");

      if(turn==='O'){
        element.innerHTML = "O";
        element.classList.add("o-color");
        board_array[Number(element.id)] = "O";
        turn = "X";

       // board_array[element.id] = "O"; //index is convert to number "1" to 1 in js
        
       if(checkWinner())
        {
            document.getElementById('winningMessage').innerHTML = "Winner is O";
            board.removeEventListener('click',printer);
            //so cant play after someone win remove add eventlistener
            return;
        }
        
        }
      
        
    else{
        element.innerHTML = "X";
        element.classList.add("x-color");
        board_array[element.id] = "X";
        turn = "O";

        if(checkWinner())
        {
            document.getElementById('winningMessage').innerHTML = "Winner is X";
            board.removeEventListener('click',printer);
            //same refernce (printer fx) using which earlier addlistener
            //was applied   now cant click on board
            return;
        }
        
    }

    if(total_turn==9)
    {
        document.getElementById('winningMessage').innerHTML = "Match is Draw";
        board.removeEventListener('click',printer);
    }

}}   


const board = document.querySelector('.board');
board.addEventListener('click',printer);  /*not printer()*/

const Restart = document.getElementById("restartButton");

//restart
//Restart.addEventListener('click', () => {
 // const cell = document.getElementsByClassName('cell'); // Get all game cells
 //console.log(cell)
 // Array.from(cell).forEach((value) => {
 //   value.innerHTML = ""; // Clear the content of each cell
 // });
 Restart.addEventListener('click', () => {
  const cell = document.querySelectorAll('.cell') // Get all game cells
  console.log(cell);
  cell.forEach((value) => {//we used for each not map
    value.innerHTML = ""; // Clear the content of each cell
    value.classList.remove("taken", "x-color", "o-color");
  });


  
  

  turn = "O"; // Reset the starting player
  total_turn = 0; // Reset the turn counter
  board_array = new Array(9).fill("E"); // Empty board array ("E" = empty maybe)
  document.getElementById('winningMessage').innerHTML = ""; // Clear win message
// In your code, when someone wins (or it’s a draw), you do this:
// board.removeEventListener('click', printer); to stop further moves.
  board.addEventListener('click', printer); // Enable clicking again on the board
});//restart evn


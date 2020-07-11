// * This js file is incomplete. It will log to the console the elements you click
    // call another function and set stone. You will have to work through the logic
    // of the game as you know it from building it in the terminal. Work through the
    // puzzle slowly, stepping through the flow of logic, and making the game work.
    // Have fun!!
// * First run the program in your browser with live server and double-click on the row you'd like to select an element from.
// * Why are you get a warning in your console? Fix it.
// * Delete these comment lines!

let stone = null
let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};
let startRow;
let stoneEnd=null;

let arrayRowStart =null;
let arrayRowEnd = null;
let numberMoves=0;
let expertWin=0;
let proWin=0;
let tryingWin=0;
let suckWin=0;
let currentMoves=0;
let illegalMoves=0;
let lastGameMoves=0;
let averageGameMoves=0;
let totalGamesPlayed=0;

// this function is called when a row is clicked. 
// Open your inspector tool to see what is being captured and can be used.
const selectRow = (row) => {
  const currentRow = row.getAttribute("data-row")
  

  if(!stone){pickUpStone(row.id)}
  else {dropStone (row.id)}
  
  let winnerCheck = checkForWin();

  if (winnerCheck){
    alert("Winner Winner Chicken Dinner.  It took you "+ currentMoves)
    lastGameMoves=lastGameMoves+currentMoves;
    document.getElementById("lastGame").innerHTML=currentMoves;
    totalGamesPlayed++;
    averageGameMoves=lastGameMoves/totalGamesPlayed
    document.getElementById("averageGame2").innerHTML=averageGameMoves;


    if (currentMoves<16){ 
      expertWin++;
      document.getElementById("expertGame").innerHTML=expertWin;
           }
    else if (currentMoves<18){ 
       proWin++
       document.getElementById("proGame2").innerHTML=proWin;
                 }
    else if (currentMoves<21){ 
       tryingWin++
       document.getElementById("tryingGame").innerHTML=tryingWin;
                 }
    else { 
      suckWin++
      document.getElementById("suckGame2").innerHTML=suckWin;
                }

    
    
  resetBoard(row.id);
  }

} 

// this function can be called to get the last stone in the stack

const pickUpStone = (rowID) => {
  let selectedRow = document.getElementById(rowID);
  console.log ("Stone picked up");
  stone=null;  
  stone = selectedRow.removeChild(selectedRow.lastChild);

  //some times the computer misses the click on the tower  added short delay and second time 
  // get info if the computer does not recognize stone.id as a string.
  for (let x=0; x<5000; x++){let nothingDelay;}
  console.log (typeof (stone.id))
  if(typeof(stone.id)!="string"){
    stone = selectedRow.removeChild(selectedRow.lastChild);}


  currentMoves++;
  document.getElementById("currentGame").innerHTML=currentMoves
  startRow=rowID;     
}



const storeMove = (rowID) => {
    let lastItem = stacks[arrayRowStart].pop();
    stacks[arrayRowEnd].push(lastItem)
    console.log (stacks)
}

// You could use this function to drop the stone but you'll need to toggle between pickUpStone & dropStone
// Once you figure that out you'll need to figure out if its a legal move...
// Something like: if(!stone){pickupStone} else{dropStone}

const dropStone = (rowID) => {
 
  let endRow = document.getElementById(rowID);
  
  if (rowID == "bottom-row"){arrayRowEnd='a'}
  if (rowID == "middle-row"){arrayRowEnd='b'}
  if (rowID == "top-row"){arrayRowEnd='c'}
  if (startRow == "bottom-row"){arrayRowStart='a'}
  if (startRow == "middle-row"){arrayRowStart='b'}
  if (startRow == "top-row"){arrayRowStart='c'}
      
  let checkLegal = isLegal (arrayRowStart, arrayRowEnd);

  if (checkLegal){
    document.getElementById(rowID).appendChild(stone)
    stone = null
    storeMove(rowID)
  }      
      else {
      alert("Illegal Move Try again")   
      illegalMoves++;
      document.getElementById("illegalGame2").innerHTML=illegalMoves;   
      document.getElementById(startRow).appendChild(stone)
      stone = null }
}


const isLegal = (startStack, endStack) => {
  // check to see if there is a disk on the start stack
 const iterator=stacks[startStack].values();
 const iterator2=stacks[endStack].values();
 let diskTotalValue =0;
 let startStackSmallest=4;
 let endStackLargest=0;


 //loop runs through the array assocated with the start tower and adds the total value of the 
 //tower.  If 0 then no disk are on the tower.  Also stores the smallest disk so it can be checked
 //against the end tower.
 for (const value of iterator){
   diskTotalValue=diskTotalValue+value
   if (value<startStackSmallest&&value!=''&&value!=null){startStackSmallest=value}
   }
 if (diskTotalValue==0){
  return false; }
 //end of checking to see if there was a disk on the start tower
 
 //This section checks the disk on the end tower is larger than the one being moved
 for (const value of iterator2){
  if (value>endStackLargest){endStackLargest=value}
 }
  
        
        if (endStackLargest==0 || (endStackLargest>startStackSmallest)){
          console.log("good move") 
          return true
        }

        else {console.log ("bad move");
          return false;}

 
}


const checkForWin = () => {
  // set to allow win if all disks are on Tower B or C.

  const iterator=stacks.b.values();
  const iterator2=stacks.c.values();
  let diskTotalValue =0;
  
  //check tower B
  
  for (const value of iterator){
    diskTotalValue=diskTotalValue+value}
    if (diskTotalValue==10){
        console.log("winner")
        return true;    }
 
  //reset total to test next tower
  diskTotalValue=0;
    

  //test tower C
    for (const value of iterator2){
      diskTotalValue=diskTotalValue+value}
          if (diskTotalValue==10){
          console.log("winner")
          return true    
      }      
   else {return false;}
  }

  const resetBoard =(rowID)=> {
    


    let selectedRow = document.getElementById(rowID); 
    for (let i=0; i<4; i++){   
    stone = selectedRow.removeChild(selectedRow.childNodes[0]);
    document.getElementById("bottom-row").appendChild(stone)}

    stacks = {
      a: [4, 3, 2, 1],
      b: [],
      c: []
    };
    
    currentMoves=0;
    stone = null
   startRow=null
   stoneEnd=null;

   arrayRowStart =null;
   arrayRowEnd = null;



  }

// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.


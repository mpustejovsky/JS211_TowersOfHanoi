'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}


const movePiece = (startStack,endStack) => {

    let lastItem = stacks[startStack].pop();
    stacks[endStack].push(lastItem)
    
 
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
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

// What is a win in Towers of Hanoi? When should this function run?
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
   


// When is this function called? What should it do with its argument?
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  //start to validate if input was an exceptable value
  const validReply =['a','b','c']
  const iterator = validReply.values()
  let goodInput1=0;
  let goodInput2=0;
                                          //loop through and check values
  for (const value of iterator){
    if (value == startStack){goodInput1++}
    if (value == endStack){goodInput2++}}
                                          //if both inputs are good the two should add to 2.
            if ((goodInput1+goodInput2)==2){
              goodInput1=0;
              goodInput2=0; }
                                            //if inputs are bad console.log and return
            else {console.log ("Bad Input Try again"  )
                  goodInput1=0;
                  goodInput2=0;
                  return "Bad Input"}
   //end of checking for proper inputs
   //check not for legal move
  let checkIfLegal = isLegal(startStack, endStack);
    if (!checkIfLegal){
      console.log ("Not a legal Move.  Try Again!")
      return false;
    }

    //now move on board
    movePiece(startStack,endStack);
    checkForWin();
  }


const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}

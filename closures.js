// function createCounter(){
//    let c =0;
//    return function(){
//      c++;
//      return c;
//    }
//  }
// const c1 = createCounter()
// c1()
// c1()
// the inner function remembers the reference to c variable 





//eg -2 

// function bankAccount(initialBalance){
//     let balance = initialBalance
//    return {
//      deposit(amt){
//         return balance+=amt
//      },
//     getBalance(amt){
//         return balance
//      }
//    }
//  }
// const c1 = bankAccount(500) 
// c1.getBalance()
 


// //eg -3 
// function power(exp){
//   return function(base){
//     return base**exp;
//   }
// }
// const sq = power(2)
// sq(5)





//let x = 10;
// function outer() {
//     return function () {
//         console.log(x);
//     };
// }

// const fn = outer();
// x = 99;
// fn(); // 99

// If values were copied:
// It would print 10
// But it prints 99 because:
// The closure references the same binding
// The value was updated later

// When console.log(x) executes, JavaScript looks for x in the current lexical environment.
// If not found, it follows the lexical environment chain outward.
// If x is not found all the way up to the Global Lexical Environment, a ReferenceError is thrown.


// execution :
// GlobalLexicalEnv:
// {
//   x: <uninitialized>,   // TDZ (because let)
//   outer: function
//   fn: <uninitialized>   // TDZ
// }
// x is not immediately 10 — it’s created first, then initialized during execution

// Now code starts executing top to bottom.
// x = 10
// const fn = outer();

// Call Stack
// outer()
// Global()


// A new function object is created (inner function)
// innerFunction.[[Environment]] → GlobalLexicalEnv
// Why global?
// Because x is not in outer’s scope
// It is found lexically in the global scope

// After outer() returns
// Memory now looks like:
// GlobalLexicalEnv:
// {
//   x: 10,
//   outer: function,
//   fn: innerFunction
// }
// innerFunction.[[Environment]] → GlobalLexicalEnv

// x= 99
// This updates the same binding in GlobalLexicalEnv.






var x = 10; 
function outer() {
   let z = 19 ;
    return function () {
        console.log(x,z);
    };
} 
const fn = outer();
x = 99;
fn(); // 99



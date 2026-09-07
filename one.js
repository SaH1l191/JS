
//let can be reassigned but not redecleared 
// var can be done anythign 



// Execution context  : 
// has memory  context , code context 
// memory context = contains the functions and the variables in key value pairs 
// code context contains the code execution line by line 
// also known as thread of execution


// JS is sync single threaded langugage 
// JS is Just in time compiled language, 
//        JavaScript
//             ↓
//          Parsing(write syntax,func etc)
//             ↓
//          Bytecode (not the cpu level ie low level machine code)
//             ↓
//       ┌─────────────┐
//       │ Interpreter │ (understands and executes the bytecode)
//       └──────┬──────┘
//              ↓
//           Execute (cpu level machine code)
//              ↓
//     Is code "hot"? 
//         ↙         ↘
//       No           Yes
//       ↓             ↓
//    Continue     JIT Compiler ( sees hot code , compiles it to machine code for faster execution ) : eg(10,20) variables are initialized at runtime , jit compiler sees and does inlinting or machine level code if it was string then it wouldnt work(means it will find other way in memory repereantation to make it fasters customized ) as it is not cpu native operation 
//                     ↓
//              Machine Code
//                     ↓
//                   CPU


// eg code : 
// var n =2 
// function square(num){
//     var ans = num * num;
//     return ans;
// }
// var square2= square(n)
// var square4= square(4)


//how execution works here : 

//  phase-1 
// memory is assigned : 
// n = undefined , square2=undefined,square4=undefined
// square : entire fnc is stored in memory 

// phase-2
// code context is assigned :
// var n =2
// comes to square2 function : 
//  a seperate memory,code contxt is created 
//  memory1 : num : undefined,ans=undefined
// function invoked=> num=2 ans is returned 
// squr2 is set 
// this seperate memeory , code context is destroyed

// repeat this for square4 
// var square4= square(4)


//execution starts from the top of the code context
//first line is executed :






// EG -2 
// getName()
// console.log(getName)
// console.log(x)
// var x = 7
// function getName(){
//     console.log("asfd")
// }
//follow the steps of above : 
// asfd
// [Function: getName]
// undefined



//if an arrow function was used instead of normal function
// then error would be thrown , as arrw functions are assigned to 
//variables 
// eg : 
// getName()
// console.log(getName)
// console.log(x)
// var x = 7
// var getName = ()=>{
//     console.log("asfd")
// }
//output : getName is not a function as getname is var and arrow fnc assigned to it 






// how Functions work in JS 
// var x =1 
// a(); b()
// function a(){
//     var x= 10;
//     console.log(x)
// }
// function b(){
//     var x= 100;
//     console.log(x)
// }

//how executions works here: 
// memory execution phase : x = undefined,a:function,b:function
// code : x : 1
// simultaneously in call stack :already a global context is pushed 
// after this a() executes and a() in pushed in call stack 
// a's memory & code execution is done , executed a() and pooped off stack 
// same for b 


// global execution context ;
//creates window object by default 
// and this keyword points to it 
// a this varaible is created 
// eg  :input:
// this == window 
// true


// var,functions are attached to windwo object inside it  , not let 
//like 
// var a =10
// function b(){var s=10,consol.elog(s)}
// so a,function b() wil get attached , not s varaible 
// this works too => console.log(window.a)  or tis.a



// unedfined vs not defined  
// undefined basically acts as a placeholder to the variable 
//eg : console.log(x) var x=10
// whereas not defined means no memory(placeholder) is given to that variable 
// eg : console.log(x) // x var doesnt exists anywhere




// js is loosely typed ;
// var a = "string" later can do a =123




// Lexical scoping 

// lexical environment is the local memory  along the lexical environment of its parent 
// leixcal means hierarchy 

// function a (){
//     var b =10 
//     c()
//     function c(){
//         console.log(b)
//     }
// }
// a()
// console.log(b)

// in call stack : 
// first in call stack => global EC ,
// then on top of call stack => a() function
// then on top of call stack => c() function

// lexical environment of a is created and b is attached to it
// then lexical environment of c is created and b is attached to it
// so in c() , b can be accessed as it is lexically scoped
//also func c cannot finds b in its own lexical environment so it looks for b in its parent lexical environment ie a()
// if we try to access b outside the function c() , error will be thrown
// because b is not defined outside a()

// each function has lexical scoping reference to its parents env 

// this is the scope chaninng 





//temporal dead zone
//basically we cannot access the const,let variales before intialization 
// like eg : 
// console.log(x)
// let x = 10
// because these let , const are stored in seperate  space reserved to them 
// means not stroed in global memoey object 
// so this can only be executed after initialization 

// result : ReferenceError: Cannot access 'x' before initialization
// so the time difference between when the let a = 10 was hoisted and till when it 
// was assigned some value <= this peiroed is called temporzal dead zone 

//TDZ is the period from entering the scope until execution reaches the let/const declaration and initializes it.
//func,var(initialed to undeifned),let(but not initialized),const are all hoisted 

//eg  :
// console.log(x)
// let x = 10
//tdz for x occurs till 1 line then it gets assigned => so it thorws   error 
// reference error => cannot access x before initializtion 

// whereas 
// console.log(y) // some other variable 
// var sdf = 10
//here it thorws reference error not defined , meaning in previous eg JS knew that x was 
// there but it doesnt allow , in this eg JS doenst know as it is not degnfiend in program 

// also let cannot be redeclared ( syntax errror !) doesnt execute sigle line of code 

// for const => 
// syntax error occurs if const b is just defined not initailized and cnnot be re initialized 

// thorws type error when const b=10,later b=1000 , ie reassigned 


// so types of error are : 
//reference error -2 types => one was for let , and other not defined variables 
// syntax error => in case of let redeclare OR const missing initialization or reassigment  => missing syntax


// difference between block and scoope 
// block is defined by a parenthesis 
// scope is where we can access variabeles and fnc 

//block is used to combine group of JS statement  :
//  eg  { var a =10 , consol.log...}
//best eg : 
// if(true ) true 
// but whwat if we want to do muktiple things =>create block
//A block can create a scope, but not every scope is necessarily a block

// reason why let , const are block scoped and VAR is function scoped  (or global-scoped when declared at top level).
// {
//     var a =10 ; 
//     let b =10 ; const c= 100
// }
// console.log(a)
// now a gets attached to the global object , but b,c are not 


//shadowing in JS 
//var doesnt have shadowing as it is function scoped becayse var is func scoped , it doesnt follow block rules ,and also var can be reassigned/redeclaerd
// var a = 130
// { 
//     var a =10 ; 
//      console.log(a)
// }
// console.log(a)

// here in above eg : out var =130 is shadowing inner var inside block but still the output 
// is 10 10 
// why is that : because it is reference to same memory (so not exactly shadowing but refering to same )
// so var gets modified inside the global object 
// as var is limited to func scope 

// this is not in case of let 
// let b = 130
// {
//     var a = 10
//     let b = 10
//     const c = 100
//     console.log(b)
// }
// console.log(b)
// here it printgs 10,130 : no shodwing 
//same for const 
// same if that block was a function 


// illegal shadowing : as var doesnt follow block scopring and attched to func scoped
// let a= 20
// {
//     var a = 10
//     console.log(a)
// } 
// error : syntax error cannot redeclare a 



// but  but you can shdow let - let 
// eg : this works 
// let a =10
// {
//     let a=100
//     console.log(a)
// }console.log(a)


// so what is the problem with this eg : 
// illegal shadowing : 
// let a= 20
// {
//     var a = 10
//     console.log(a)
// } 
// error : syntax error cannot redeclare a 

//how to fix it ? if var a doesnt cross boundry of the block then it wont throw errror
// so the  fix is below : 
// let a= 20
// function advcs(){
//     var a = 10
//     console.log(a)
// } 


//each block has its own scope 



// closures in JS 

//in each nested func , first memory assigment is doen then code execution is done
// closure : a combination of function bundeld with with its lexical environment 
// eg  
// function a (){
//     var b =10;
//     function y(){
//         console.log(b)
//     }
//     y()
// }
// a()

//functions always remembers thier scope 
//A function object retains a reference to the lexical environment in which it was created.
// eg :perfect closure  
// function x(){
//     let  a =1
//     return function(){
//         console.log(a)
//     }
// }
// let l = x();
// l()

//so when we returned fucntion => that returned the function + lexical evvironnment  


// eg:3
// let g = 100;
// function outer() {
//     let a = 1;
//     function middle() {
//         let b = 2;
//         return function inner() {
//             console.log(a, b, g);
//         };
//     }
//     return middle();
// }
// outer()();

// corner cases : 

// function x(){
//     var a =5
//     function y(){
//         console.log(a)
//     }
//     a=100
//     return y
// }
// var z=x() 
// z()

//so when fuction is returned it preserves the lexical scoping 
// + the reference to variables 




//set time out +  closures 

// function x(){
//     var i=1;
//     setTimeout(function(){
//         console.log(i)
//     },3000)
//     console.log("first")
// }
// x()

//will print first first then value of i 



// confusing eg  understanding : 

// function x() {
//     for (var i = 1; i <= 5; i++) {
//         setTimeout(function () {
//             console.log(i)
//         }, 1000 * i)
//     }
//     console.log('sdf')
// }
// x()

// js executes loop var i instanty and puts ssettimout into hold 
// prints first 

//each callback func refereces to same i , 
//by the time the first timeout reaches its end var i already reached 6
// and prints its value 
//as we know functino maintian the lexical scoping wiht reference to variabls 



// fix will be :  changing var to let 
// so new copy of i is created newly everytime when setTimeout calls i 
//each callback func references to its own distinct i due to using LET
// function x() {
//     for (let i = 1; i <= 5; i++) {
//         setTimeout(function () {
//             console.log(i)
//         }, 1000 * i)
//     }
//     console.log('sdf')
// }
// x()



//how to fix : by some how if we were forced to use var in loop instead of 
//let in loop (which would have fixed )
//by some how we wanted to pass i by value 

// function x() {
//     for (var i = 1; i <= 5; i++) { 

//         function close(x){
//              setTimeout(function () {
//                 console.log(x)
//             }, 1000 * x) 
//         }
//         close(i)

//     }
//     console.log('sdf')
// }
// x()


// JavaScript is always “pass-by-value” — but for objects, the value is a reference
// let a = 10;
// function change(x) {
//     x = 20;
// }
// change(a);
// console.log(a); // 10





//functions in JS 
// function declarration AKA functino statement
// function a(){
//     console.log("A called")
//}//this can be hoisted 


// function expression  whn func obj assinged to variable
// b()
// var b=function(){
//     console.log("b called")
// }
//TypeError: b is not a function as undefined() is called 

// this function is assinged to a varaiable so cannot be hoisted if done then trhows type error 
//TypeError happens when a variable exists but is the wrong type for the operation.
// bcz b exists
// but its value is undefined
// and undefined() is not callable

// if  plain b() is calleed only , then refernce error ; didnt find anyehre exists

//anonymouse function 
//wrong syntax 
// function (){}
// so we need to use them as values  like above var b eg...


//named function expression : 

// var xx = function xyz(){
//     console.log("xyz called")
// }
// even if we call xyz() it would thorw => reference error not defined
// Outside the function → xyz does not exist at all
// So JavaScript says:
// “I can’t find this identifier anywhere.”



//sumary of all errors till now : 


// console.log(a); // 10
// let a = 10;
//refernce error : cannot access a before initializaiton


// console.log(zzzzz) //reference error : not defined



// let a =10
// let a =20 //syntax error cannot redeclare




// b()
// var b=function(){
//     console.log("b called")
// }
//TypeError: b is not a function as undefined() is called 








//what are first class functions 
// the ability to use function as values 
// Assign a function to a variable
// Pass a function as an argument
// Return a function from another function
// Store functions in data structures (arrays, objects)

// eg:1
// function sayHello() {
//     console.log("Hello");
// }
// function execute(fn) {
//     fn(); // calling the passed function
// }
// execute(sayHello);

// assigning 
// const greet = function () {
//     console.log("Hello!");
// };

// greet();


//returning functions 
// function multiplier(factor) {
//     return function (num) {
//         return num * factor;
//     };
// }
// const double = multiplier(2);
// console.log(double(5));


// Object with functions
// const calculator = {
//     add(a, b) {
//         return a + b;
//     },
//     sub(a, b) {
//         return a - b;
//     }
// };
// console.log(calculator.add(3, 2));






//callback functions in JS 
// A function that is passed as an argument to another function and is intended to be called (“called back”) later.

// function greet(name, callback) {
//     console.log("Hello " + name);
//     callback();
// }
// function sayBye() {
//     console.log("Goodbye!");
// }
// greet("Alice", sayBye);




// console.log("Start");
// setTimeout(function() {
//     console.log("This runs later");
// }, 1000);
// console.log("End");




// interview queswtion : 
// how to  check the count of the buttons that are pressed 

// let c = 0;
// <button id="clickMe"></button>
// document.addEventListener("click", function () {
//     console.log("clicekd"); c++;
// })
//problem with the above code : c can be access by anyone 

// solution : we want c to be modified only by that function 
// so we can create a closure for that c 

// soluition:
// function execute() {
//     let c = 0;
//     document.getElementById('clickMe').
//     addEventListener("click", function () {
//         console.log("clicekd",++c); 
//     })
// }
// execute() 




//async JS & event loop 
// JavaScript itself (the ECMAScript engine) is single-threaded and does not provide I/O, timers, or DOM access natively.
// It cannot directly access network requests, timers, or the DOM.
// Things like setTimeout, fetch, or document.getElementById are provided by the browser through Web APIs.
// Think of Web APIs as browser “helpers” that JS can call into.

//JavaScript itself executes code synchronously on its JS execution thread,
//  while the host environment can perform or coordinate asynchronous operations
//  outside that immediate execution flow and later schedule JavaScript callbacks/tasks to run

// ┌──────────────────────────────────────────┐
// │                 BROWSER                  │
// │                                          │
// │   ┌──────────────┐                       │
// │   │ JavaScript   │                       │
// │   │ Engine       │                       │
// │   │              │                       │
// │   │ Call Stack   │                       │
// │   └──────────────┘                       │
// │          │                               │
// │          │                               │
// │   ┌──────┴──────────────────────────┐    │
// │   │          Browser APIs           │    │
// │   │                                │    │
// │   │ timers / DOM / network / etc.  │    │
// │   └─────────────────────────────────┘    │
// │                                          │
// │          Event Loop / Queues             │
// └──────────────────────────────────────────┘



// console.log("Start")
// setTimeout(function(cb){
// console.log("callback")},3000)
// console.log("end")

//prints start , end , callback 
// when the timer expires, the function is put into callback queue 
// and event loop checks if smthng is present and remove the fnc from 
// bacllback queue to the call stack and executre and pop out  ( callback is oly pushed in call stack is empty )


//there is also a micotask queue which has higher priority 
//all the cb func that comes from promises goes into this 
//as well as muttiaon observer 


//and all other call back fnc goest to callback queue (task queeu)

//order : 
// Synchronous code
//       ↓
// Microtasks
//       ↓
// Next task

//After the currently running JavaScript finishes, the microtask queue is drained before the event loop proceeds to another task.
// run microtask
// run microtask
// ...
// until microtask queue is empty


// the task waiting th callback queue can never get a chanve to execute : 
// leading to starvation 

// Explanation of queues and event loop priorities
// 1 Call Stack
// JavaScript executes code here, one function at a time, single-threaded.
// 2 Web APIs
// Browser manages timers (setTimeout), network (fetch), DOM events, etc.
// When a timer expires, the callback is placed in Task Queue (Callback Queue).
// 3 Task Queue (Callback Queue)
// Contains callbacks from timers, UI events, setTimeout, setInterval, etc.
// Callbacks here are executed only when the call stack is empty.
// Lower priority than microtask queue.
// 4 Microtask Queue
// Contains callbacks from promises (.then, .catch, .finally) and MutationObserver.
// Microtasks are executed immediately after the current execution completes and before any task from the task queue.
// Higher priority than the task queue.
// This means all microtasks run before the event loop takes the next task from the task queue.
// 5Starvation
// If microtasks continuously enqueue new microtasks, the task queue callbacks may starve (never run).
// This can freeze UI updates or delay timers.
// This is why careful design is important.

// eg : function loop() {
//     queueMicrotask(loop);
// }

// loop();

// setTimeout(() => {
//     console.log("Timeout");
// }, 0);
// The microtask queue never becomes empty.therefore the next task may never get its turn.


// console.log("Start");
// fetch("https://jsonplaceholder.typicode.com/todos/1")
//   .then(response => response.json())
//   .then(data => {
//     console.log("Fetch callback (Promise microtask)");
//   });
// setTimeout(() => {
//   console.log("Timeout callback");
// }, 0);
// console.log("End");

//explanation : 
// The setTimeout callback will be ready before the fetch resolves because the fetch involves network latency.
// So, the event loop:
// Executes the setTimeout callback (from the task queue).
// Then, when fetch resolves, its .then() microtasks are queued.
// Microtasks always run immediately after the current task finishes.
// So the fetch callback runs after the timeout callback.
// setTimeout callback is scheduled to go into the task queue after ~4ms minimum delay (browsers and Node impose a minimum delay).
// fetch() makes an HTTP request, which takes some time (tens or hundreds of milliseconds).
// When the network response arrives, the .then() callbacks are queued as microtasks.

//If the timeout task becomes ready before the fetch's promise reaction
// → timeout task may run first.
// If the fetch promise reaction becomes ready first
// → its microtask can run before the timeout task.



// eg: for clearing confusion :
// console.log("Start");
// Promise.resolve().then(() => {
//   console.log("Promise callback");
// });
// setTimeout(() => {
//   console.log("Timeout callback");
// }, 0); // this doesnt mean immediately executes after 0ms , it is put in callback queue and event loop checks if call stack is empty then only it executes
// console.log("End");


// THen Why use setTimeout(fn, 0)?
// Suppose:
// console.log("Important 1");
// setTimeout(() => {
//     console.log("Less important");
// }, 0);
// console.log("Important 2");
// Output:
// Important 1
// Important 2
// Less important
// This can be useful for deferring work to a later task.



//closures & garbage collcetor are related as the vars that form closure  as 
//A variable remains alive as long as it is reachable through something that is still reachable.


// browser : 
// JavaScript Engine & Runtime Environment Overview
// 1️⃣ JavaScript Engine
// It’s a software program (not hardware) responsible for:
// Parsing JavaScript code
// Compiling it (JIT compilation)
// Executing it
// 2️⃣ Parsing
// The engine breaks code into tokens (lexical analysis)
// Then uses a syntax parser to build an AST (Abstract Syntax Tree)
// AST represents the code’s structure and semantics in a tree format
// 3️⃣ Compilation and Interpretation
// Interpretation: Executes code line-by-line without prior optimization (fast start, slower runtime)
// Compilation: Translates entire code or functions to machine code before execution (optimized but slower start)
// JavaScript engines use a hybrid approach:
// JIT (Just-In-Time) Compilation
// Compile hot code paths on-the-fly while interpreting the rest
// Balances startup speed and runtime performance
// 4️⃣ Execution
// The JavaScript engine executes the compiled/interpreted code
// Uses optimizations like:
// Inlining: Replaces function calls with the function body to save call overhead
// Inline caching: Optimizes property access by caching property lookups
// Copy elision: Reduces unnecessary copying of objects
// 5️⃣ JavaScript Runtime Environment
// JavaScript does not run alone—it requires a runtime environment that provides:
// JavaScript Engine (V8 in Chrome, SpiderMonkey in Firefox, JavaScriptCore in Safari)
// Memory Heap: Where objects and variables are stored dynamically
// Call Stack: Where function calls are stacked and executed
// Web APIs: Browser-provided APIs like DOM, timers, fetch, localStorage, etc.
// Callback Queue (Task Queue): Stores callback functions waiting to be executed
// Microtask Queue: Stores promise callbacks and mutation observer callbacks, executed before task queue
// Event Loop: Manages the execution flow—moves callbacks from queues to call stack when empty
// Garbage Collector: Automatically frees memory no longer referenced by the program
// Uss algorithms like Mark-and-Sweep
// 6️⃣ JavaScript Engine Examples
// V8 (Google Chrome, Node.js) — fastest and most widely used
// SpiderMonkey (Firefox)
// JavaScriptCore (Safari)
// Chakra (Microsoft Edge Legacy)


//concurreny model in JS 

// lets say there is a code , which has millions of lines 
//  we had a settimeout of 5sec , which expired & is alaready waiting 
// in the callback queue , simulatneously the event loop is waiting for the 
// sync program of Glbbal context env to complete its execution (due to long code)
// so this timeout will get exexutre only after main code is executed 
// because event loop waits for call stack to get empty to put the cb to stack 


// prioritize the imp function or pieve of code , so that main sync tasks are performed 
// the immeidately the next imp tasks of the setTimeout 0ms are executed 
// so the tasks that are less important should be put in setTimeout with 0 ms
// so that sync 


// Prioritizing important tasks
// Use setTimeout(fn, 0) or queueMicrotask(fn) to defer less important tasks so that critical code executes first.
// Example: you want main code to run without being blocked by non-critical UI updates:
// console.log("Important task");
// setTimeout(() => console.log("Less important task"), 0);
// console.log("Another important task");


// Output:
// Importat task
// Another important task
// Less important task
// The less important task is deferred, letting the main synchronous code run first.



// Modern engines commonly use a combination of:
// JavaScript
//     ↓
// Parsing
//     ↓
// Intermediate representation / bytecode
//     ↓
// Execution
//     ↓
// JIT optimization for hot code
//     ↓
// optimized machine code
// Modern JavaScript engines use parsing, interpretation/bytecode execution, and JIT compilation and optimization techniques
// JIT = Just-In-Time compilation.
// The idea is:
//     Compile/optimize code while the program is running.


//Call Stack
// Used to keep track of currently executing function calls.
// Heap
// A region of memory used for dynamically allocated data such as objects and functions

// Objects are dynamically allocated and managed by the JavaScript engine, and the heap is a useful mental model for that storage
// Because objects can have dynamic size and lifetime

// What is garbage collection?
// Garbage collection is the automatic process of reclaiming memory that the program can no longer reach/use.


// Mark-and-sweep strategy : reclamining memory in garbage collection strategy 

// One classic garbage-collection concept is mark-and-sweep.

// Imagine:

// Global
//   │
//   ├────→ Object A
//   │
//   └────→ Object B

// Object A ───→ Object C

// Object D   ← nobody references it

// The GC starts from roots such as reachable global/runtime references.

// It marks:

// Global
//  ↓
// A
//  ↓
// C
// B
// Those are reachable.
// D isn't reachable.
// So conceptually:
// A → keep
// B → keep
// C → keep
// D → garbage
// The engine can reclaim memory associated with unreachable data.
// Modern engines use sophisticated generational and incremental GC strategies; "mark-and-sweep" is a useful foundational model rather than the whole modern GC implementation.



// Higher-Order Functions  : 

// 1.First class functions 
// The ability of functions, where the functions can be treated as variables, that is we can pass functions as arguments, return function and even assign function to another variables 
// 2.Higher order function 
// Functions that takes one or more functions as argument 
// 3.Call back function 
// Functions that can be passed as an argument to another function 


// const radius =[1,2,3,4,5]
// function area(x){
//   return Math.PI *x*x
// }
// function circumference(x){
//   return Math.PI *2*x
// }
//generic function 
// function calculate(f,x){
//   return f(x);
// }
// for(let i = 0; i < radius.length;i++){
//   console.log(calculate(area,radius[i]))
// }
// for(let i = 0; i < radius.length;i++){
//   console.log(calculate(circumference,radius[i]))
// }

//async functions always return a Promise, and await works with a Promise-like value.



//eg -1 
// async function test() {
//   console.log("A");
//   console.log("B");
// }
// console.log("Start")
// test();
// console.log("End");
//0utput : start a b end -> even if the func is async m there is no await so it executes normally


//eg-2
// async function test() {
//   console.log("A");
//   await Promise.resolve();
//   console.log("B");
// }
// test();
// console.log("C");
//output : a c b  -> await tells pause the execution of this functino(till the time it is resolved) and execute the next line of code in the main thread







// functions are objects  IN JS and callable :

//another concept : a===b is true as both references to same obj( as func is obj)
// function hello() {
//     console.log("Hello");
// }
// const a = hello;
// const b = hello;
// console.log(a === b);


// EG: 
// function counter() {}
// counter.count = 0;
// console.log(counter.count); // 0
// counter.count++;
// counter.count++;
// console.log(counter.count); // 2

// EG ; 
// function greet() {
//     console.log("Hello");
// }
// greet.language = "English";
// greet.version = 1;
// console.log(greet.language); // English
// console.log(greet.version); 

// const greet = function () {
//     console.log("Hello");
// }; 
// const a = greet 
// greet,a  conceptually references to the same  function object


// EG :
// const calculator = {
//     add: function (a, b) {
//         return a + b;
//     }
// };
// calculator.add(2,  3); //method is nothing but a function that is a property of an object


// EG: 
// const operations = [
//     function (x) {
//         return x + 1;
//     },
//     function (x) {
//         return x * 2;
//     },
//     function (x) {
//         return x ** 2;
//     }
// ];
// console.log(operations[0](5)); // 6
// console.log(operations[1](5)); // 10
// console.log(operations[2](5)); // 25

// EG : 
// map, filter, and reduce suddenly make sense : takes in func as a paramter and transforms the array into another array
// const numbers = [1, 2, 3, 4];
// const result = numbers.map(function (number) {
//     return number * 2;
// })
// console.log(result);

// conceptually : 
// function myMap(array, fn) {
//     const result = [];

//     for (const item of array) {
//         result.push(fn(item));
//     }

//     return result;
// }


// Regular functions have a property called:
// function Person(name) {
//     this.name = name;
// }
// console.log(Person.prototype);
// Person.prototype.sayHello = function () {
//     console.log("Hello, " + this.name);
// };
// but for arrow functions 
// const add = () => {};
// console.log(add.prototype); // undefined 
// This is a great example of why "functions are objects" does not mean all function types behave identically

// so in short arrow functions : 
// don't have their own this
// don't have their own arguments
// cannot be used as constructors with new
// don't have the normal function .prototype property
// const add = (a, b) => a + b;
// add.description = "Adds two numbers";
// console.log(add.description);


// function Person(name){
//     this.name = name;
// }
// Person.prototype.sayHello = function(){ //Person.prototype is the shared object from which 
//     //objects created using new Person() can get properties and methods they don't have themselves.
//     console.log("Hello, " + this.name);
// }
// const john = new Person("John");//creates a new obj & sets its prototy. to Person.prototype
// console.log(Person.prototype)
// console.log(john.__proto__); // Person.prototype other way same meanning 
// console.log(john.sayHello())
// console.log(john.__proto__ === Person.prototype); // true
// console.log(Object.getPrototypeOf(john) === Person.prototype) //modenr way to get prototype of an object


// why need of new keyword :
// 1. Creates a new empty object.
// 2. Sets the prototype of that object to the constructor’s prototype.
// 3. Binds this inside the constructor to the new object.
// 4. Returns the new object (unless the constructor explicitly returns another object).

// const john = new Person("John");
// as approximately:
// const john = {};
// Object.setPrototypeOf(john, Person.prototype);
// Person.call(john, "John");
// return john;

// const alice = Person("Alice");
// console.log(alice); // undefined
// console.log(alice.sayHello()); //type error : cannot read property sayHello of undefined


//call
// call() lets you explicitly choose this.
// greet.call(person);
// means: Run greet with this set to person.









// EG;
//this also works 
// function Person(name) {
//     console.log(name);
// }
// Person.prototype.sayHello = function() {
//     console.log("Hello");
// }
// const alice = new Person("Alice");
// alice.sayHello()


//So what is new actually for?
// Forget this for a moment.
// Imagine:
// function Person(name) {
// }
// If you do:
// Person("Alice");
// you're saying:
//     "Run this function."
// If you do:
// new Person("Alice");
// you're saying:
//     "Create a new object based on Person, then run this function to initialize that object."
// That's the key difference.



// Once functions are objects, they can have methods such as:
// call()
// apply()
// bind()
//synatx : 
// greet.call(thisValue, arg1, arg2, ...)
//greet.apply(thisValue, [arg1, arg2, ...])

function greet(message, punctuation) {
    console.log(message + " " + this.name + punctuation);
}
const person = {name: "Alice"};
greet.call(person,"hello","!"); //basically Call this function with this refer/set to person, and takes in a list of arguments
greet.apply(person, ["Hello", "!"]);//same as call but takes an array of arguments instead of a list of arguments


const boundGreet = greet.bind(person);
boundGreet("gello","!!!!"); //creates new func BoundGreet with this permanently set to person, regardless of how it's called later.
//so boundgreet != greet , it is a new function with this permanently set to person
//we basically say Give me a new function that, whenever I run it later, uses person as this 



//all about promises 
// Promise is an object representing the eventual result of an asynchronous operation.
//initially pending , then either resolved(fulfilled state) or rejected(rejected state)

// EG : 
// fetch("/users")
//     .then(response => {
//         return response.json();
//     })
//     .catch(error => {
//         console.log(error);
//     })
//     .finally(() => {
//         hideLoadingSpinner();
//     });


// more about promiesse :

// EG : 
// const p1 = fetch("/users");
// const p2 = fetch("/posts");
// const p3 = fetch("/comments");
// You want to coordinate these three operations.

Promise.all() // when all promises are expected to succeed then use 
Promise.all([p1, p2, p3]) //if all succesd ,then resulst are into array else rejected 


Promise.allSettled() // i dont care whetherr they succeed or fail , i just want to know the result of all promises (reutrns results in array )


Promise.any() //give me any promise that succeeds (returns the first fulfilled promise, or rejects if all fail)

Promise.race() //give me the first promise that settles (fulfilled or rejected) (returns the first settled promise, regardless of outcome)



// all about "THIS" keyword  : 
// biggest misconception : this refers to the object where the function was written
//  it is how waas this function called ? 

// EG:
// For example:
// function a() {
//     console.log(this);
// }
// a();
// The value of this depends on the environment/mode in which the code runs.
// Now compare:
// const obj = {
//     a: function () {
//         console.log(this);
//     }
// };
// obj.a();
// Here, a() was called as a method of obj, so:
// this === obj
// That distinction is the foundation of this.


// method vs detached functino call
const obj = {
    name: "Alice",
    greet() {
        console.log(this.name);
    }
};
obj.greet(); // before . is the method receiver so this==obj
const detachedGreet = obj.greet;
detachedGreet(); // this is undefined in strict mode (as this loses context), or window/global in non-strict mode


// Non-stict mode
// In non-strict mode, a standalone regular function call can result in:
// this === globalThis
// In a browser, that is typically:
// this === window
// Strict mode
// "use strict";
// function a() {
//     console.log(this);
// }
// a();
// Now:
// this === undefined
// This is extremely important.
// So:
// function a() {
//     console.log(this);
// }
// a();
// is not enough information to determine this without knowing the execution context/mode.



// this with new
// Now:
// function Person(name) {
//     this.name = name;
// }
// const person = new Person("Alice");
// console.log(person.name);
// Output:
// Alice
// When you use:
// new Person("Alice")
// JavaScript creates a new object and, conceptually, makes:
// this
// refer to that new object while the constructor runs.




// const obj = {
//     name: "Alice",
//     greet() {
//         console.log(this.name);
//     }
// };
// obj.greet(); // this === obj bcz (who called greet here ? obj so this is obj)



// in a nut shell, this determines when where it is called 
// also for normal calling function this keyword has no lexical scoping 
//normal func : like 
// function outer() {
//     const x = 10;

//     function normal() {
//         console.log(x); // lexical → 10
//         console.log(this); // NOT lexical
//     }
// }


but this works as calle called obj. with greet() func
// const obj = {
//     name: "Alice",

//     greet() {
//         function inner() {
//             console.log(this.name);
//         }

//         inner(); 
//     }
// };

// obj.greet(); //prints alice







for functions : 
lexical scopeing : variables 
this -> determine when called(runtime) 

const arrow = () => {
    console.log(x);    // lexical
    console.log(this); // lexical
};


eg : 2 
const obj = {
    name: "Alice",

    arrow: () => {
        console.log(this.name);
    }
};
obj.arrow();
//this ==obj as when this was called its lexical scope was obj




//imp eg : 
const obj = {
    name: "Alice",
    greet() {
        console.log(this.name);
    }
};
const fn = obj.greet; // now fn is a detached function, so this is undefined in strict mode (or window/global in non-strict mode)
fn();

//to preseve the context
const fn = obj.greet.bind(obj) 




eg:
const obj = {
    name: "Alice",
    greet() {
        const inner = function () {
            console.log(this.name);
        };

        inner();
    }
};
obj.greet();
//here undefined as iner is a normal function and no lexical scoping for this so this is undefined in strict mode (or window/global in non-strict mode)


The four major this rules to memorize

Rule 1 — Regular function call
fn();
this depends on strict mode/environment.
Rule 2 — Method call
obj.fn();
For a regular function:
this === obj
Rule 3 — Explicit binding
fn.call(obj);
fn.apply(obj);
fn.bind(obj);
For regular functions:
this === obj
Rule 4 — Arrow functions
Arrow functions don't create their own this.
const fn = () => {
    console.log(this);
};
this comes from the surrounding lexical scope.
And therefore:
fn.call(obj);
fn.apply(obj);
fn.bind(obj)();
cannot change it.




//Objets ;
const user = {
  name: "Rahul",
  age: 25,
  city: "Mumbai"
};
console.log(Object.keys(user))// ["name", "age", "city"]
//simmilaryl object.values(uesr)
//similary object.entries(user) // [["name", "Rahul"], ["age", 25], ["city", "Mumbai"]]


Object.assign() //Copies properties from one or more objects into another object,or modifies the target obj

Objet.freeze() //Prevents adding, removing, or modifying properties of an object. The object becomes immutable.
//but shallow copy only , so if the object has nested objects , then those can be modified

// const user = {
//   name: "Rahul",
//   age: 25,
 //   address: {
 //       city: "Mumbai"
//}
// };
// Object.freeze(user);
// user.age = 30;
// console.log(user.age); //throws error as top level object is frozen but nested objects can be modified in strict mode

// but user.address.city = "Delhi"; // This works as nested property


Object.seal()
// Object.seal() prevents:
//     adding properties
//     deleting properties



EG: 
const user = {
  name: "Rahul"
};
console.log(
  Object.getOwnPropertyDescriptor(user, "name")
);
outputs :
{
  value: "Rahul",
  writable: true,
  enumerable: true,
  configurable: true
}

can create own objs with 
const user = {};
Object.defineProperty(user, "name", {
  value: "Rahul",
  writable: false,
  enumerable: true,
  configurable: false
});


//EG : 
//copy is shallow only, only nested properties are copied by refernce not value 
const user = {
  name: "Rahul",
  address: {
    city: "Mumbai"
  }
};
const cpy = user 
console.log(user===cpy)
cpy.address.city = "Delhi";
console.log(user) //modifies adderss of original,copied both to Delhi
console.log(cpy)


//deep copy fix : 
const copy = structuredClone(user);



practice eg: 
const key = "score";
const student = {
  name: "Rahul",
  [key]: 95,
  address: {
    city: "Mumbai"
  }
};
const {
  name,
  address: { city },
  ...other
} = student;
const copy = {
  ...student,
  score: 100
};
const deepCopy = structuredClone(student);
deepCopy.address.city = "Delhi";


console.log(name);
console.log(city);
console.log(other);
console.log(copy.score);
console.log(student.score);
console.log(deepCopy.address.city);
console.log(student.address.city);
console.log(copy.address === student.address);
console.log(deepCopy.address === student.address);

outputs : 
Rahul
Mumbai
{ score: 95 }
100
95
Delhi
Mumbai
true
false




JS primitive types : 
string
number
bigint
boolean
undefined
symbol
null


everything else is object type :
{}
[]
function () {}
new Date()



Rule 2:
[] , {} , "0" , "false" , "null" , "undefined" , "NaN" are all truthy values in JS


//remember rules : String → Number
Number("")        // 0
Number(" ")       // 0
Number("10")      // 10
Number("10.5")    // 10.5
Number("hello")   // NaN


Number(null)      // 0
Number(undefined) // NaN



If JavaScript needs a primitive from an object, it performs:
ToPrimitive
For arrays, you can develop this simple mental model:
[]      → ""
[1]     → "1"
[1, 2]  → "1,2"
Because arrays' string representation behaves like:
[].toString()      // ""
[1].toString()     // "1"
[1, 2].toString()  // "1,2"


NEXT RULE :
Same type? 
5==5 , "hello"=="hello" → compare values directly

null and undefined?

Special rule:
null == undefined // true
But
null === undefined // false

Rule : convert boolean to number
true → 1 false → 0

Rule  — Object vs primitive?
If one side is an object and the other is a primitive, convert the object to a primitive.
eg : [] == false
first => []->"" , ""==0  , 0==0 (stirng to num conversion)


Rule :String vs Number?
Convert the string to a number.
"5" == 5
becomes:
5 == 5



EG : []==false
s1 : [] => ""
s2 : false => 0
s3 : "" => 0
s4 : 0==0 => true




edge cases : 
Case 1 — NaN
NaN === NaN
→ false
But:
Object.is(NaN, NaN)
→ true
Case 2 — 0 and -0
0 === -0
→ true
But:
Object.is(0, -0)
→ false
So memorize this tiny table


next : 
"5"-2 => string to number conversion
false - 0 => boolean changes to number


Rule 5 — null and undefined
For numeric conversion:
null      → 0
undefined → NaN
Therefore:
null + 1
becomes:
0 + 1
while:
undefined + 1
becomes:
NaN + 1
and stays:
NaN



Boolean("false") // true
Boolean("0")     // true
Boolean("hello") // true
Boolean(" ")     // true
Only the empty string is falsy:
Boolean("") // false

eg : 
[] + {}
ans : 
[] + {}
 ↓
"" + "[object Object]"
 ↓
"[object Object]"


3. {} + []
This one is a special trap.
You might reason:
{} → "[object Object]"
[] → ""
and expect:
"[object Object]"
But if you write:
{} + []
at the beginning of a JavaScript statement, JavaScript can interpret {} as an empty block, rather than an object literal.
So you can get:
{} + []
// 0
depending on context/environment


for ({} + {}) 
// output : "[object Object][object Object]"




start notes and learning from here and revise above 


//remaining : 
// iterators , generators 
//data strucutres 
//classes 
//prototype chaining egs more 



// Polyfills 
// A polyfill is a piece of JavaScript code (usually a function)
//  that adds functionality that the environment doesn’t support natively


//  Array.prototype.includes = 
//    function(el){
//    for(let i =0; i<this.length;i++){
//      if(this[i] == el) return true;
//    }
//    return false;
//  }

// console.log([1,2,3].includes(2))


// some polyfills : 
const a = [1, 2, 3, 4];

// Array.prototype.myMap = function(cb) {
//     const res = [];
//     for (let i = 0; i < this.length; i++) {
//         res.push(cb(this[i]));
//     }
//     return res;
// };
// console.log(a.myMap(num => num * 2));


Array.prototype.myFilter = function(cb) {
    const res = [];
    for (let i = 0; i < this.length; i++) {
        if(cb(this[i]))res.push(this[i]);
    }
    return res;
};
// console.log(a.myFilter(num => num != 2));


Array.prototype.myforEach = function(cb) {
    for (let i = 0; i < this.length; i++) {
        console.log(cb(this[i]))
    }
};
// console.log(a.myforEach(num =>num*2));


// console.log((num=>num*2)(1, 0, [1, 2, 3]))


Array.prototype.myReduce = function(cb,ini=0) {
    let init=ini ? ini : 0 
    for (let i = 0; i < this.length; i++) {
        init=cb(init,this[i])
    }
    return init
}
// console.log(a.myReduce((acc,num)=>acc+num,0));


Array.prototype.myFind = function(cb) {
    for (let i = 0; i < this.length; i++) {
        if(cb(this[i])) return this[i];
    }
    return undefined;
}
// console.log(a.myFind((num)=>num>2));


Array.prototype.myIncludes = function(val) {
    for (let i = 0; i < this.length; i++) {
        if(this[i]==val) return true;
    }
    return false;
}
// console.log(a.myIncludes(2));

//does sthis aray contain atleast one el satisfying condn
Array.prototype.mySome = function(cb) {
    for (let i = 0; i < this.length; i++) {
        if (cb(this[i])) return true;
    }
    return false;
};
console.log(a.mySome(num=>num===2));






// Object destructuring
// const user = { name: "John", age: 25 };
// const { name, age } = user;
// console.log(name, age);

// Array destructuring
// const arr = [10, 20];
// const [a, b] = arr;

// Spread/Rest(...)
// const arr1 = [1, 2];
// const arr2 = [...arr1, 3, 4];

// const obj1 = { a: 1 };
// const obj2 = { ...obj1, b: 2 };


// function sum(...nums) {
//   return nums.reduce((a, b) => a + b, 0);
// }
// sum(1, 2, 3); // 6



// Default Parameters
// Provide default values to function parameters.
// function greet(name = "Guest") {
//   return `Hello ${name}`;
// }
// greet(); // Hello Guest


// Optional Chaining ?
// const user = {};
// console.log(user.address?.city);// undefined (no error)


// Nullish Coalescing (??)
// Use a default value only if null or undefined.
// const value = null;
// const result = value ?? "default";
// console.log(result); // "default"


// Template Literals
// String interpolation and multi-line strings using backticks `.
// const name = "Alice";
// const age = 22;
// const msg = `My name is ${name}
// and I am ${age} years old.`;


// Module Import/export
// math.js
// export const add = (a, b) => a + b;
// export default function sub(a, b) {
//   return a - b;
// }
// import sub, { add } from "./math.js";
// add(2, 3);
// sub(5, 2);



// What is an Error in JavaScript?
// An error is a runtime problem that stops normal execution of code.
// Common error types:
// SyntaxError – invalid JS syntax
// ReferenceError – variable not defined
// TypeError – wrong operation on a value
// RangeError, URIError, etc.

// try {
//   let x = y + 1; // y is not defined
// } catch (error) {
//   console.log(error.message);
// } finally {
//   console.log("Always runs");
// }


// function divide(a, b) {
//   if (b === 0) {
//     throw new Error("Division by zero is not allowed");
//   }
//   return a / b;
// }

// try {
//   divide(10, 0);
// } catch (e) {
//   console.log(e.message);
// }



// Built-in error object properties:
// try {
//   foo();
// } catch (e) {
//   console.log(e.name);    // ReferenceError
//   console.log(e.message); // foo is not defined
//   console.log(e.stack);   // call stack
// }




// Two kinds of equality in JS
// === (Strict equality)
// ✔ No type conversion
// ✔ Compare type + value

// 5 === "5"   // false
// null === undefined // false
//  Rule: If types differ → false (except NaN, which is never equal to itself)



// The Golden Coercion Rules (MEMORIZE THESE)
// When using ==, JavaScript applies these rules in order:


// Rule 1: Same type → compare directly
// 1 == 1       // true
// "hi" == "hi" // true


// Rule 2: null and undefined
// null == undefined // true
// 👉 They are only equal to each other
// null == 0    // false
// undefined == 0 // false


// Rule 3: Boolean → Number
// If one side is boolean:
// true  → 1
// false → 0
// false == 0 // true
// true == 1  // true



// Rule 4: String ↔ Number
// If comparing string and number → convert string to number
// "5" == 5   // true
// "5" - 1    // 4   ("5" → 5)


// Rule 5: Object ↔ Primitive
// Objects are converted to primitive using:
// valueOf()
// toString()
// Arrays → strings
// [] → ""
// [1,2] → "1,2"

// console.log([] == "");        // true
// console.log([1] == 1);       // true
// console.log([1,2] == "1,2"); // true

// [] == ""        // true
// [] == 0         // true
// "" == 0         // true
// js
// Copy code
// [] === false    // false (no coercion)
// {} == {}        // false (different references)
// NaN == NaN      // false


// Each {} creates a new memory location.

// const a = {};
// const b = {};
// a === b  // false
// But:
// const a = {};
// const b = a;
// a === b  // true

// NaN is not equal to anything, including itself.


// "5" - 1
// Operator logic
// - forces numeric conversion
// "5" → 5



// 3️⃣ Truthy & Falsy (VERY IMPORTANT)
// Falsy values (ONLY these 6):
// false
// 0
// -0
// 0n
// ""
// null
// undefined
// NaN
// 👉 Everything else is truthy



// some eg : 
// 0 || "hello"
// Answer: "hello"
// Why:
// || returns first truthy value

// Boolean("")
// Answer: false
// Why:
// Empty string is falsy


// Boolean([])
// Answer: true
// Why:
// All objects are truthy


// !!"false"
// Answer: true
// Why:
// Non-empty string is truthy


// [] === []
// Answer: false
// Why:
// Different references in memory

 



// REMAINING CONCEPTS : 
// this in:
// class methods

// Prototypes & Prototype Chain
// What is [[Prototype]]
// __proto__ vs prototype
// How JS does inheritance internally
// Why arrays have .map() but objects don’t



// Objects deep dive
// Object.freeze, seal, preventExtensions
// in vs hasOwnProperty
// Object.hasOwn(obj, key)
// obj.hasOwnProperty(key)
// key in obj






// Promise chaining — DEEP
// Error propagation through chains
// return value of .then()
// returning a Promise from .then()
// Promise vs callback



// async / await
// error handling with try/catch
// parallel vs sequential await


// OOP IN JS (optinal)

 

// DOM & BROWSER JS (Frontend / Full-stack)
// DOM, but need:
// Even bubbling & capturing
// event.target vs event.currentTarget
// preventDefault vs stopPropagation
// How browser renders JS + layout + paint (high level)

  

// array methods 
// internally:
// map
// filter
// reduce
// forEach
// find, some, every
// Interviewers ask:
// “Implement map using reduce”
// Write a polyfill for reduce”
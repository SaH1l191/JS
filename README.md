# JavaScript Fundamentals

## Variable Declarations

### `let`
- Can be **reassigned** but **not redeclared** in the same scope.

```javascript
let x = 10;
x = 20; // valid
let x = 30; // SyntaxError: Identifier 'x' has already been declared
```

### `var`
- Can be **reassigned** and **redeclared** anywhere.

```javascript
var a = 10;
a = 20; // valid
var a = 30; // also valid
```

---

## Execution Context

An **Execution Context** has two parts:

| Part | Description |
|------|-------------|
| **Memory Context** | Stores functions and variables as key-value pairs. |
| **Code Context** | Executes the code line by line. Also known as **Thread of Execution**. |

---

## JS is Single-Threaded & JIT-Compiled

- **Synchronous** – One thing at a time.
- **Single-threaded** – One call stack.
- **Just-In-Time (JIT) Compiled** – Combines interpretation and compilation.

### JIT Compilation Flow

```
JavaScript
    ↓
Parsing (syntax, functions, etc.)
    ↓
Bytecode (not CPU-level machine code)
    ↓
┌─────────────┐
│ Interpreter │  ← understands and executes bytecode
└──────┬──────┘
       ↓
    Execute (CPU-level machine code)
       ↓
  Is code "hot"?
    ↙       ↘
  No         Yes
  ↓           ↓
Continue   JIT Compiler
              ↓
         Machine Code
              ↓
            CPU
```

### What is "Hot" Code?

Code that runs repeatedly. The JIT compiler detects it and compiles it to native machine code for faster execution.

**Example with inlining:**

```javascript
var n = 2;
function square(num) {
    var ans = num * num;
    return ans;
}
square(n);   // JIT may inline this as: ans = 2 * 2 = 4
square(4);   // JIT may inline this as: ans = 4 * 4 = 16
```

- At runtime, `n` and `4` are initialized. The JIT compiler sees this and performs **inlining** or customizes memory representation for faster execution.
- If the value was a string, JIT would find other memory optimizations instead.

---

## Execution Example 1

```javascript
var n = 2;
function square(num) {
    var ans = num * num;
    return ans;
}
var square2 = square(n);
var square4 = square(4);
```

### How It Executes

#### Phase 1 – Memory Allocation (Creation Phase)

| Variable/Function | Value |
|--------------------|-------|
| `n` | `undefined` |
| `square2` | `undefined` |
| `square4` | `undefined` |
| `square` | entire function stored in memory |

#### Phase 2 – Code Execution

1. `var n = 2` → `n` becomes `2`
2. `square2 = square(n)` → A **separate execution context** is created:
   - **Memory:** `num = undefined`, `ans = undefined`
   - **Code:** `num = 2`, `ans = 4`, returns `4`
   - `square2` is set to `4`
   - This separate context is **destroyed**
3. `square4 = square(4)` → Same process repeats for `square4`

> Execution starts from the **top** of the code context. The first line is executed first.

---

## Execution Example 2 – Hoisting & var

```javascript
getName();
console.log(getName);
console.log(x);
var x = 7;
function getName() {
    console.log("asfd");
}
```

**Output:**
```
asfd
[Function: getName]
undefined
```

### Why?
- `getName` is a function declaration → hoisted fully.
- `var x` is hoisted but initialized to `undefined`.
- `getName()` is called → prints `"asfd"`.
- `console.log(getName)` → prints the function.
- `console.log(x)` → prints `undefined` (not yet assigned).

---

## Arrow Function vs Function Declaration

```javascript
getName();
console.log(getName);
console.log(x);
var x = 7;
var getName = () => {
    console.log("asfd");
};
```

**Output:**
```
ReferenceError: Cannot access 'getName' before initialization
```

### Why?
Arrow functions are **assigned to variables** (`var`, `let`, `const`). They are **not hoisted** like function declarations. Calling `getName()` before assignment throws an error.

---

## Function Execution & Call Stack

```javascript
var x = 1;
a(); b();
function a() {
    var x = 10;
    console.log(x);
}
function b() {
    var x = 100;
    console.log(x);
}
```

### How It Executes

#### Phase 1 – Memory Allocation

| Variable/Function | Value |
|--------------------|-------|
| `x` | `undefined` |
| `a` | function |
| `b` | function |

#### Phase 2 – Code Execution & Call Stack

1. `x = 1`
2. `a()` is pushed onto the call stack
   - Separate context created: `x = 10`
   - Prints `10`
   - `a()` is popped off the call stack
3. `b()` is pushed onto the call stack
   - Separate context created: `x = 100`
   - Prints `100`
   - `b()` is popped off the call stack

```
Call Stack:
┌─────────┐
│    b    │  ← after a() finishes
├─────────┤
│ Global  │
└─────────┘
```

---

## Global Execution Context

- Creates a **`window` object** by default (in browsers).
- `this` keyword points to `window`.

```javascript
this === window; // true
```

- `var` and `function` declarations are **attached to the `window` object**.
- `let` and `const` are **not** attached to `window`.

```javascript
var a = 10;
function b() {
    var s = 10;
    console.log(s);
}

// a and function b() are attached to window
// s is NOT attached to window
console.log(window.a); // 10
console.log(this.a);   // 10
```

---

## `undefined` vs `not defined`

| Concept | Meaning |
|---------|---------|
| **`undefined`** | A placeholder. Variable exists but has no value assigned yet. |
| **Not defined** | No memory (placeholder) is given to the variable at all. |

```javascript
// undefined
console.log(x); // undefined
var x = 10;

// Not defined
console.log(y); // ReferenceError: y is not defined
```

---

## JS is Loosely Typed

Variables can hold any type of value and can be reassigned to a different type.

```javascript
var a = "string";
a = 123; // valid
```

---

## Lexical Scoping

> **Lexical Environment** = Local memory + Lexical environment of its parent.
> **Lexical** = hierarchy / where the code is physically written.

```javascript
function a() {
    var b = 10;
    c();
    function c() {
        console.log(b);
    }
}
a();
console.log(b); // ReferenceError: b is not defined
```

### How It Executes

#### Call Stack:
1. Global EC → pushed first
2. `a()` → pushed on top of Global
3. `c()` → pushed on top of `a()`

#### Lexical Environment:
- `a`'s lexical environment contains `b = 10`.
- `c`'s lexical environment is created inside `a`.
- `c()` can access `b` because `b` exists in its **parent's** lexical environment.
- `b` **cannot** be accessed outside `a()`.

> Each function has a **lexical scoping reference** to its parent's environment.
> This is called **Scope Chaining**.

---

## Temporal Dead Zone (TDZ)

We **cannot access** `let` and `const` variables **before initialization**.

```javascript
console.log(x);
let x = 10;
// ReferenceError: Cannot access 'x' before initialization
```

### What is TDZ?

The **time difference** between when a `let`/`const` is hoisted and when it is assigned a value is called the **Temporal Dead Zone**.

```
┌─────────────────────┐
│   Scope Created     │
│        ↓            │
│   ┌─────────┐       │
│   │   TDZ   │       │  ← cannot access
│   └─────────┘       │
│        ↓            │
│  Initialization    │  ← let x = 10
│        ↓            │
│     Accessible     │
└─────────────────────┘
```

### Key Points

| Type | Hoisted? | Initialized? | Access Before Init |
|------|----------|--------------|---------------------|
| `var` | Yes | Yes (`undefined`) | ✅ Works (shows `undefined`) |
| `let` | Yes | No | ❌ ReferenceError |
| `const` | Yes | No | ❌ ReferenceError |

### TDZ vs Not Defined

```javascript
// TDZ Error – JS knows 'x' exists but can't access before init
console.log(x);
let x = 10;
// ReferenceError: Cannot access 'x' before initialization

// Not Defined – JS doesn't know 'y' at all
console.log(y);
// ReferenceError: y is not defined
```

---

## `let` – No Redeclaration

```javascript
let x = 10;
let x = 20; // SyntaxError: Identifier 'x' has already been declared
```

This is a **SyntaxError** – the code doesn't execute a single line.

---

## `const` – No Redeclaration & No Reassignment

```javascript
// Error: Missing initialization
const b;
// SyntaxError: Missing initializer in const declaration

// Error: Reassignment
const b = 10;
b = 1000;
// TypeError: Assignment to constant variable
```

---

## Types of Errors

| Error Type | Cause | Example |
|------------|-------|---------|
| **ReferenceError (TDZ)** | Accessing `let`/`const` before initialization | `console.log(x); let x = 10;` |
| **ReferenceError (Not Defined)** | Variable doesn't exist anywhere | `console.log(y);` |
| **SyntaxError** | Redeclaring `let`, or `const` without initialization | `let x=1; let x=2;` / `const x;` |
| **TypeError** | Reassigning `const` | `const x=1; x=2;` |

---

## Block vs Scope

- **Block** – Defined by curly braces `{ }`. Used to group multiple JS statements.
- **Scope** – Where variables and functions can be accessed.

> A block can create a scope, but not every scope is necessarily a block.

```javascript
// Block example – grouping multiple statements
if (true) {
    var a = 10;
    let b = 10;
    const c = 100;
    console.log(a, b, c);
}
```

### Why `let`/`const` are Block Scoped & `var` is Function Scoped

```javascript
{
    var a = 10;
    let b = 10;
    const c = 100;
}
console.log(a); // 10 – var leaks out of block
// console.log(b); // ReferenceError
// console.log(c); // ReferenceError
```

- `var` attaches to the **global object** (or nearest function scope).
- `let` and `const` stay confined to the **block**.

---

## Shadowing in JS

### `var` Does NOT Have True Shadowing

`var` is function scoped, so it doesn't follow block rules.

```javascript
var a = 130;
{
    var a = 10;
    console.log(a); // 10
}
console.log(a); // 10 (not 130 – same reference, not shadowed)
```

The inner `var a` refers to the **same memory** as the outer `var a`. It modifies the global object.

### `let` and `const` Have True Shadowing

```javascript
let b = 130;
{
    let b = 10;
    console.log(b); // 10 – new block-scoped variable
}
console.log(b); // 130 – outer variable unaffected
```

Each `let`/`const` creates a **distinct variable** in its own block scope.

### Illegal Shadowing

`var` cannot shadow `let` because `var` ignores block boundaries:

```javascript
let a = 20;
{
    var a = 10; // SyntaxError: Cannot redeclare block-scoped variable 'a'
    console.log(a);
}
```

### Legal Shadowing – `let` Shadowing `let`

```javascript
let a = 10;
{
    let a = 100;
    console.log(a); // 100
}
console.log(a); // 10
```

### Fix for Illegal Shadowing

If `var` doesn't cross the block boundary (e.g., inside a function), no error:

```javascript
let a = 20;
function advcs() {
    var a = 10; // no conflict – function creates its own scope
    console.log(a); // 10
}
advcs();
```

> Each block has its own scope.

---

## Closures in JS

> **Closure** = A function bundled with its **lexical environment**.

A function object retains a reference to the lexical environment in which it was created.

### Example 1 – Basic Closure

```javascript
function a() {
    var b = 10;
    function y() {
        console.log(b);
    }
    y();
}
a(); // 10
```

Functions always remember their scope.

### Example 2 – Perfect Closure (Returning Function)

```javascript
function x() {
    let a = 1;
    return function () {
        console.log(a);
    };
}
let l = x();
l(); // 1
```

When the inner function is returned, it returns the function **+ its lexical environment**.

### Example 3 – Multi-level Closure

```javascript
let g = 100;
function outer() {
    let a = 1;
    function middle() {
        let b = 2;
        return function inner() {
            console.log(a, b, g);
        };
    }
    return middle();
}
outer()(); // 1 2 100
```

### Corner Case – Reference, Not Copy

```javascript
function x() {
    var a = 5;
    function y() {
        console.log(a);
    }
    a = 100;
    return y;
}
var z = x();
z(); // 100 (not 5 – closure captures reference, not value)
```

When the function is returned, it preserves the lexical scoping **+ the reference to variables**.

---

## SetTimeout + Closures

### Example 1 – Basic

```javascript
function x() {
    var i = 1;
    setTimeout(function () {
        console.log(i);
    }, 3000);
    console.log("first");
}
x();
// Output:
// first
// 1 (after 3 seconds)
```

### Example 2 – Classic Loop Problem

```javascript
function x() {
    for (var i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, 1000 * i);
    }
    console.log("sdf");
}
x();
// Output:
// sdf
// 6 6 6 6 6 (all print 6 – var is function scoped)
```

**Why?** Each callback references the **same `i`**. By the time the first timeout fires, `var i` has already reached `6`.

### Fix 1 – Use `let`

```javascript
function x() {
    for (let i = 1; i <= 5; i++) {
        setTimeout(function () {
            console.log(i);
        }, 1000 * i);
    }
    console.log("sdf");
}
x();
// Output:
// sdf
// 1 2 3 4 5
```

Each callback references its own distinct `i` because `let` is block scoped.

### Fix 2 – Pass `i` by Value Using a Wrapper

```javascript
function x() {
    for (var i = 1; i <= 5; i++) {
        function close(x) {
            setTimeout(function () {
                console.log(x);
            }, 1000 * x);
        }
        close(i);
    }
    console.log("sdf");
}
x();
// Output:
// sdf
// 1 2 3 4 5
```

---

## Pass by Value

JavaScript is always **"pass-by-value"** — but for objects, the value is a **reference**.

```javascript
let a = 10;
function change(x) {
    x = 20;
}
change(a);
console.log(a); // 10
```

---

## Functions in JS

### Function Declaration (AKA Function Statement)

```javascript
function a() {
    console.log("A called");
}
// Can be hoisted
```

### Function Expression

```javascript
b();
var b = function () {
    console.log("b called");
};
// TypeError: b is not a function
// b exists but is undefined at call time → undefined() is not callable
```

> If only `b()` is called (without `var b` preceding), it throws **ReferenceError** (not defined).

### Anonymous Function

```javascript
// Wrong syntax:
// function () {}

// Must be used as a value:
var b = function () {
    console.log("hello");
};
```

### Named Function Expression

```javascript
var xx = function xyz() {
    console.log("xyz called");
};
xx(); // works
xyz(); // ReferenceError: xyz is not defined
```

The name `xyz` is only accessible **inside** the function itself.

---

## Summary of All Errors

| Code | Error |
|------|-------|
| `console.log(a); let a = 10;` | ReferenceError: Cannot access 'a' before initialization |
| `console.log(zzzzz);` | ReferenceError: zzzzz is not defined |
| `let a = 10; let a = 20;` | SyntaxError: Identifier 'a' has already been declared |
| `b(); var b = function(){};` | TypeError: b is not a function |

---

## First Class Functions

The ability to use functions as values:
- Assign a function to a variable
- Pass a function as an argument
- Return a function from another function
- Store functions in data structures (arrays, objects)

### Passing Function as Argument

```javascript
function sayHello() {
    console.log("Hello");
}
function execute(fn) {
    fn();
}
execute(sayHello); // Hello
```

### Assigning to Variable

```javascript
const greet = function () {
    console.log("Hello!");
};
greet(); // Hello!
```

### Returning Functions

```javascript
function multiplier(factor) {
    return function (num) {
        return num * factor;
    };
}
const double = multiplier(2);
console.log(double(5)); // 10
```

### Object with Functions

```javascript
const calculator = {
    add(a, b) {
        return a + b;
    },
    sub(a, b) {
        return a - b;
    },
};
console.log(calculator.add(3, 2)); // 5
```

---

## Callback Functions in JS

A function passed as an argument to another function, intended to be called later.

### Basic Example

```javascript
function greet(name, callback) {
    console.log("Hello " + name);
    callback();
}
function sayBye() {
    console.log("Goodbye!");
}
greet("Alice", sayBye);
// Output:
// Hello Alice
// Goodbye!
```

### Callback with setTimeout

```javascript
console.log("Start");
setTimeout(function () {
    console.log("This runs later");
}, 1000);
console.log("End");
// Output:
// Start
// End
// This runs later (after 1 second)
```

### Interview Question – Button Click Counter

**Problem:** Count how many times a button is pressed.

```javascript
let c = 0;
document.getElementById("clickMe").addEventListener("click", function () {
    console.log("clicked", ++c);
});
// Problem: c is accessible to anyone – not encapsulated
```

**Solution using Closure:**

```javascript
function execute() {
    let c = 0;
    document.getElementById("clickMe").addEventListener("click", function () {
        console.log("clicked", ++c);
    });
}
execute();
// c is now encapsulated – only the callback can modify it
```

The callback closes over `c`, keeping it private while still accessible to the event handler.

---

## Async JS & Event Loop

JavaScript itself (the ECMAScript engine) is single-threaded and does **not** provide I/O, timers, or DOM access natively.

- It cannot directly access network requests, timers, or the DOM.
- Things like `setTimeout`, `fetch`, or `document.getElementById` are provided by the **browser** through **Web APIs**.
- Think of Web APIs as browser "helpers" that JS can call into.

> JavaScript executes code synchronously on its JS execution thread, while the host environment can perform or coordinate asynchronous operations outside that immediate execution flow and later schedule JavaScript callbacks/tasks to run.

### Browser Architecture

```
┌──────────────────────────────────────────┐
│                 BROWSER                  │
│                                          │
│   ┌──────────────┐                       │
│   │ JavaScript   │                       │
│   │ Engine       │                       │
│   │              │                       │
│   │ Call Stack   │                       │
│   └──────────────┘                       │
│          │                               │
│   ┌──────┴──────────────────────────┐    │
│   │          Browser APIs           │    │
│   │                                │    │
│   │ timers / DOM / network / etc.  │    │
│   └─────────────────────────────────┘    │
│                                          │
│          Event Loop / Queues             │
└──────────────────────────────────────────┘
```

### Basic setTimeout Example

```javascript
console.log("Start");
setTimeout(function () {
    console.log("callback");
}, 3000);
console.log("end");
// Output: Start → end → callback
```

When the timer expires, the function is placed in the **callback queue**. The event loop checks if the call stack is empty, then moves the callback from the queue to the call stack for execution.

---

## Task Queue vs Microtask Queue

| Queue | Source | Priority |
|-------|--------|----------|
| **Microtask Queue** | Promises (`.then`, `.catch`, `.finally`), `MutationObserver` | Higher |
| **Task Queue** (Callback Queue) | `setTimeout`, `setInterval`, DOM events, network callbacks | Lower |

### Execution Order

```
Synchronous code
       ↓
Microtasks (drain entire queue)
       ↓
Next task from Task Queue
```

After the currently running JavaScript finishes, the **microtask queue is drained** before the event loop proceeds to another task.

> Microtasks always run before any task from the task queue.

### Starvation

If microtasks continuously enqueue new microtasks, the task queue callbacks may **starve** (never run). This can freeze UI updates or delay timers.

```javascript
function loop() {
    queueMicrotask(loop);
}
loop();

setTimeout(() => {
    console.log("Timeout");
}, 0);
// The microtask queue never becomes empty.
// The setTimeout callback may never get a chance to run.
```

---

## Event Loop – Complete Flow

1. **Call Stack** – JavaScript executes code here, one function at a time, single-threaded.
2. **Web APIs** – Browser manages timers (`setTimeout`), network (`fetch`), DOM events, etc.
3. **Task Queue (Callback Queue)** – Contains callbacks from timers, UI events, `setTimeout`, `setInterval`. Lower priority than microtask queue.
4. **Microtask Queue** – Contains callbacks from Promises (`.then`, `.catch`, `.finally`) and `MutationObserver`. Higher priority than the task queue.
5. **Starvation** – If microtasks continuously enqueue new microtasks, task queue callbacks may never run.

---

## Fetch + setTimeout + Promise – Execution Order

```javascript
console.log("Start");
fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((data) => {
        console.log("Fetch callback (Promise microtask)");
    });
setTimeout(() => {
    console.log("Timeout callback");
}, 0);
console.log("End");
```

### Explanation

- `setTimeout` callback is scheduled to go into the task queue after ~4ms minimum delay.
- `fetch()` makes an HTTP request, which takes time (tens/hundreds of milliseconds).
- When the network response arrives, `.then()` callbacks are queued as **microtasks**.
- If the timeout task becomes ready before the fetch's promise reaction → timeout runs first.
- If the fetch promise reaction becomes ready first → its microtask can run before the timeout task.

---

## Promise vs setTimeout Execution Order

```javascript
console.log("Start");
Promise.resolve().then(() => {
    console.log("Promise callback");
});
setTimeout(() => {
    console.log("Timeout callback");
}, 0);
console.log("End");
// Output: Start → End → Promise callback → Timeout callback
```

> `setTimeout(fn, 0)` does **not** mean "execute immediately after 0ms". It puts the callback in the task queue, and the event loop executes it only when the call stack is empty.

### Why Use setTimeout(fn, 0)?

```javascript
console.log("Important 1");
setTimeout(() => {
    console.log("Less important");
}, 0);
console.log("Important 2");
// Output: Important 1 → Important 2 → Less important
```

Use `setTimeout(fn, 0)` to **defer less important work** so that critical synchronous code executes first.

---

## Closures & Garbage Collector

Closures and garbage collection are related. A variable remains alive as long as it is **reachable** through something that is still reachable.

---

## JavaScript Engine & Runtime Environment

### 1. JavaScript Engine

A software program responsible for:
- Parsing JavaScript code
- Compiling it (JIT compilation)
- Executing it

### 2. Parsing

The engine breaks code into tokens (lexical analysis), then uses a syntax parser to build an **AST (Abstract Syntax Tree)**.

### 3. Compilation and Interpretation

| Approach | Description |
|----------|-------------|
| **Interpretation** | Executes code line-by-line without prior optimization (fast start, slower runtime) |
| **Compilation** | Translates entire code to machine code before execution (optimized but slower start) |
| **JIT (Just-In-Time) Compilation** | Compile hot code paths on-the-fly while interpreting the rest |

### 4. Execution Optimizations

- **Inlining** – Replaces function calls with the function body to save call overhead.
- **Inline caching** – Optimizes property access by caching property lookups.
- **Copy elision** – Reduces unnecessary copying of objects.

### 5. JavaScript Runtime Environment

JavaScript does not run alone — it requires a runtime environment that provides:

| Component | Description |
|-----------|-------------|
| **JavaScript Engine** | V8 (Chrome), SpiderMonkey (Firefox), JavaScriptCore (Safari) |
| **Memory Heap** | Where objects and variables are stored dynamically |
| **Call Stack** | Where function calls are stacked and executed |
| **Web APIs** | DOM, timers, fetch, localStorage, etc. |
| **Callback Queue** | Stores task callbacks waiting to be executed |
| **Microtask Queue** | Stores promise callbacks, executed before task queue |
| **Event Loop** | Manages execution flow — moves callbacks from queues to call stack |
| **Garbage Collector** | Automatically frees memory no longer referenced |

### 6. JavaScript Engine Examples

| Engine | Browser/Runtime |
|--------|-----------------|
| **V8** | Google Chrome, Node.js |
| **SpiderMonkey** | Firefox |
| **JavaScriptCore** | Safari |
| **Chakra** | Microsoft Edge Legacy |

### Modern Engine Flow

```
JavaScript
    ↓
Parsing
    ↓
Intermediate representation / bytecode
    ↓
Execution
    ↓
JIT optimization for hot code
    ↓
Optimized machine code
```

---

## Concurrency Model in JS

If a long synchronous program is running, a `setTimeout` that has already expired will only execute **after** the main code finishes — because the event loop waits for the call stack to be empty.

```javascript
// Long running synchronous code blocks the event loop
// Even if setTimeout(5000) has expired, its callback waits in the queue
```

### Prioritizing Tasks

- Use `setTimeout(fn, 0)` or `queueMicrotask(fn)` to defer less important tasks.
- Critical synchronous code runs first, then deferred tasks execute.

```javascript
console.log("Important task");
setTimeout(() => console.log("Less important task"), 0);
console.log("Another important task");
// Output: Important task → Another important task → Less important task
```

---

## Garbage Collection

Garbage collection is the **automatic process** of reclaiming memory that the program can no longer reach.

### Call Stack & Heap

| Component | Purpose |
|-----------|---------|
| **Call Stack** | Tracks currently executing function calls |
| **Heap** | Region of memory for dynamically allocated data (objects, functions) |

Objects are dynamically allocated and managed by the engine. The heap is a mental model for that storage because objects can have dynamic size and lifetime.

### Mark-and-Sweep Strategy

One classic garbage-collection concept:

```
Global
  │
  ├────→ Object A
  │
  └────→ Object B

Object A ───→ Object C

Object D   ← nobody references it
```

**Mark phase:** Start from roots (global, runtime references):
- Global → A → C → B are **reachable** (marked)
- D is **not reachable**

**Sweep phase:**
- A → keep
- B → keep
- C → keep
- D → garbage → reclaim memory

> Modern engines use sophisticated **generational** and **incremental** GC strategies. Mark-and-sweep is a useful foundational model rather than the whole modern GC implementation.

---

## Higher-Order Functions

### 1. First Class Functions

The ability of functions to be treated as variables — pass as arguments, return from functions, assign to variables.

### 2. Higher Order Function

A function that takes one or more functions as arguments, or returns a function.

### 3. Callback Function

A function passed as an argument to another function.

### Example – Generic Calculator

```javascript
const radius = [1, 2, 3, 4, 5];

function area(x) {
    return Math.PI * x * x;
}
function circumference(x) {
    return Math.PI * 2 * x;
}

function calculate(f, x) {
    return f(x);
}

for (let i = 0; i < radius.length; i++) {
    console.log(calculate(area, radius[i]));
}
for (let i = 0; i < radius.length; i++) {
    console.log(calculate(circumference, radius[i]));
}
```

> Async functions always return a Promise, and `await` works with a Promise-like value.

---

## Async Functions

### Example 1 – No Await

```javascript
async function test() {
    console.log("A");
    console.log("B");
}
console.log("Start");
test();
console.log("End");
// Output: Start → A → B → End
// No await, so it executes normally
```

### Example 2 – With Await

```javascript
async function test() {
    console.log("A");
    await Promise.resolve();
    console.log("B");
}
test();
console.log("C");
// Output: A → C → B
// await pauses execution of this function and runs the next line in main thread
```

---

## Functions Are Objects in JS

Functions are objects and are **callable**.

### Example – Function References

```javascript
function hello() {
    console.log("Hello");
}
const a = hello;
const b = hello;
console.log(a === b); // true – both reference the same function object
```

### Example – Adding Properties to Functions

```javascript
function counter() {}
counter.count = 0;
console.log(counter.count); // 0
counter.count++;
counter.count++;
console.log(counter.count); // 2
```

```javascript
function greet() {
    console.log("Hello");
}
greet.language = "English";
greet.version = 1;
console.log(greet.language); // English
console.log(greet.version);  // 1
```

### Example – Methods (Functions as Object Properties)

```javascript
const calculator = {
    add: function (a, b) {
        return a + b;
    },
};
calculator.add(2, 3); // 5
```

### Example – Functions in Arrays

```javascript
const operations = [
    function (x) { return x + 1; },
    function (x) { return x * 2; },
    function (x) { return x ** 2; },
];
console.log(operations[0](5)); // 6
console.log(operations[1](5)); // 10
console.log(operations[2](5)); // 25
```

### Example – map, filter, reduce

```javascript
const numbers = [1, 2, 3, 4];
const result = numbers.map(function (number) {
    return number * 2;
});
console.log(result); // [2, 4, 6, 8]
```

Conceptually, `map` works like:

```javascript
function myMap(array, fn) {
    const result = [];
    for (const item of array) {
        result.push(fn(item));
    }
    return result;
}
```

---

## Regular Functions vs Arrow Functions – Prototype

```javascript
function Person(name) {
    this.name = name;
}
console.log(Person.prototype); // exists

const add = () => {};
console.log(add.prototype); // undefined
```

> Arrow functions don't have their own `prototype` property.

### Arrow Functions – Key Differences

- Don't have their own `this`
- Don't have their own `arguments`
- Cannot be used as constructors with `new`
- Don't have the normal function `.prototype` property

```javascript
const add = (a, b) => a + b;
add.description = "Adds two numbers"; // can still add custom properties
console.log(add.description);
```

---

## Prototypes & The `new` Keyword

### Prototype Chain

```javascript
function Person(name) {
    this.name = name;
}
Person.prototype.sayHello = function () {
    console.log("Hello, " + this.name);
};

const john = new Person("John");
console.log(john.__proto__ === Person.prototype); // true
console.log(Object.getPrototypeOf(john) === Person.prototype); // modern way
john.sayHello(); // Hello, John
```

### What `new` Does

1. Creates a new empty object.
2. Sets the prototype of that object to the constructor's prototype.
3. Binds `this` inside the constructor to the new object.
4. Returns the new object (unless the constructor explicitly returns another object).

```javascript
const john = new Person("John");
// Approximately:
const john = {};
Object.setPrototypeOf(john, Person.prototype);
Person.call(john, "John");
return john;
```

### Without `new`

```javascript
const alice = Person("Alice");
console.log(alice); // undefined
// alice.sayHello(); // TypeError: Cannot read property 'sayHello' of undefined
```

---

## call, apply, bind

Once functions are objects, they can have methods:

### `call()`

Explicitly choose `this` and pass arguments individually.

```javascript
function greet(message, punctuation) {
    console.log(message + " " + this.name + punctuation);
}
const person = { name: "Alice" };
greet.call(person, "Hello", "!"); // Hello Alice!
```

### `apply()`

Same as `call` but takes an array of arguments.

```javascript
greet.apply(person, ["Hello", "!"]); // Hello Alice!
```

### `bind()`

Creates a new function with `this` permanently set.

```javascript
const boundGreet = greet.bind(person);
boundGreet("Hello", "!!!!"); // Hello Alice!!!!
// boundGreet !== greet – it's a new function
```

> `bind` returns a new function. `call` and `apply` invoke immediately.

---

## Promises

A Promise is an object representing the eventual result of an asynchronous operation.

- **Pending** → initial state
- **Fulfilled** → resolved
- **Rejected** → rejected

```javascript
fetch("/users")
    .then((response) => {
        return response.json();
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        hideLoadingSpinner();
    });
```

### Promise Combinators

| Combinator | Description |
|------------|-------------|
| `Promise.all([p1, p2, p3])` | Resolves when **all** succeed; rejects if any fail. Returns array of results. |
| `Promise.allSettled([p1, p2, p3])` | Returns results of all promises regardless of success/failure. |
| `Promise.any([p1, p2, p3])` | Returns the **first fulfilled** promise; rejects if all fail. |
| `Promise.race([p1, p2, p3])` | Returns the **first settled** promise (fulfilled or rejected). |

---

## The `this` Keyword

**Biggest misconception:** `this` refers to the object where the function was written.

**Reality:** `this` depends on **how the function is called** (runtime binding).

### Example – Method vs Detached Call

```javascript
const obj = {
    name: "Alice",
    greet() {
        console.log(this.name);
    },
};
obj.greet(); // "Alice" – called as method of obj

const detachedGreet = obj.greet;
detachedGreet(); // undefined (strict mode) or window (non-strict)
```

### Strict Mode vs Non-Strict Mode

```javascript
// Non-strict mode
function a() {
    console.log(this); // globalThis (window in browser)
}
a();

// Strict mode
"use strict";
function a() {
    console.log(this); // undefined
}
a();
```

### `this` with `new`

```javascript
function Person(name) {
    this.name = name;
}
const person = new Person("Alice");
console.log(person.name); // Alice
// 'this' refers to the newly created object
```

### `this` Has No Lexical Scoping in Regular Functions

```javascript
function outer() {
    const x = 10;
    function normal() {
        console.log(x);     // lexical → 10
        console.log(this);  // NOT lexical
    }
}
```

### Arrow Functions – Lexical `this`

```javascript
const arrow = () => {
    console.log(this); // lexical – inherits from surrounding scope
};
```

```javascript
const obj = {
    name: "Alice",
    arrow: () => {
        console.log(this.name); // this === surrounding scope (not obj)
    },
};
obj.arrow(); // may print undefined depending on context
```

### Preserving Context with `bind`

```javascript
const obj = {
    name: "Alice",
    greet() {
        console.log(this.name);
    },
};
const fn = obj.greet;
fn(); // undefined (detached)

const fnBound = obj.greet.bind(obj);
fnBound(); // Alice
```

### Inner Function Gotcha

```javascript
const obj = {
    name: "Alice",
    greet() {
        const inner = function () {
            console.log(this.name);
        };
        inner(); // undefined – inner is a regular function, not a method
    },
};
obj.greet();
```

### The Four `this` Rules

| Rule | When | `this` Value |
|------|------|-------------|
| **1. Regular function call** | `fn()` | Depends on strict mode (`undefined` or `globalThis`) |
| **2. Method call** | `obj.fn()` | `obj` |
| **3. Explicit binding** | `fn.call(obj)` / `fn.apply(obj)` / `fn.bind(obj)` | `obj` |
| **4. Arrow function** | `() => {}` | Inherits from surrounding lexical scope (cannot be changed) |

```javascript
const fn = () => { console.log(this); };
fn.call(obj);  // cannot change this for arrow functions
fn.apply(obj); // same
fn.bind(obj)(); // same
```

---

## Objects – Utility Methods

### `Object.keys()`, `Object.values()`, `Object.entries()`

```javascript
const user = { name: "Rahul", age: 25, city: "Mumbai" };
Object.keys(user);    // ["name", "age", "city"]
Object.values(user);  // ["Rahul", 25, "Mumbai"]
Object.entries(user); // [["name", "Rahul"], ["age", 25], ["city", "Mumbai"]]
```

### `Object.assign()`

Copies properties from one or more objects into another.

### `Object.freeze()`

Prevents adding, removing, or modifying properties. **Shallow freeze only** — nested objects can still be modified.

```javascript
const user = {
    name: "Rahul",
    address: { city: "Mumbai" },
};
Object.freeze(user);
user.age = 30;         // Error in strict mode
user.address.city = "Delhi"; // Works! nested object not frozen
```

### `Object.seal()`

Prevents adding and deleting properties, but existing properties can be modified.

### `Object.getOwnPropertyDescriptor()`

```javascript
const user = { name: "Rahul" };
Object.getOwnPropertyDescriptor(user, "name");
// { value: "Rahul", writable: true, enumerable: true, configurable: true }
```

### `Object.defineProperty()`

```javascript
const user = {};
Object.defineProperty(user, "name", {
    value: "Rahul",
    writable: false,
    enumerable: true,
    configurable: false,
});
```

---

## Shallow Copy vs Deep Copy

### Shallow Copy – Reference Sharing

```javascript
const user = {
    name: "Rahul",
    address: { city: "Mumbai" },
};
const cpy = user;
cpy.address.city = "Delhi";
console.log(user); // address.city is now "Delhi" – both share same reference
```

### Deep Copy Fix

```javascript
const copy = structuredClone(user);
copy.address.city = "Delhi";
console.log(user.address.city); // Mumbai – original unaffected
```

---

## Practice Example – Destructuring & Spread

```javascript
const key = "score";
const student = {
    name: "Rahul",
    [key]: 95,
    address: { city: "Mumbai" },
};

const {
    name,
    address: { city },
    ...other
} = student;

const copy = { ...student, score: 100 };
const deepCopy = structuredClone(student);
deepCopy.address.city = "Delhi";

console.log(name);                    // Rahul
console.log(city);                    // Mumbai
console.log(other);                   // { score: 95 }
console.log(copy.score);              // 100
console.log(student.score);           // 95
console.log(deepCopy.address.city);   // Delhi
console.log(student.address.city);    // Mumbai
console.log(copy.address === student.address);   // true (shallow)
console.log(deepCopy.address === student.address); // false (deep)
```

---

## JS Primitive Types

| Type | Example |
|------|---------|
| `string` | `"hello"` |
| `number` | `42` |
| `bigint` | `9007199254740991n` |
| `boolean` | `true` / `false` |
| `undefined` | `undefined` |
| `symbol` | `Symbol("id")` |
| `null` | `null` |

Everything else is an **object type**: `{}`, `[]`, `function() {}`, `new Date()`, etc.

---

## Truthy & Falsy Values

> `[]`, `{}`, `"0"`, `"false"`, `"null"`, `"undefined"`, `"NaN"` are all **truthy** values in JS.

---

## Type Conversion Rules

### String → Number

| Expression | Result |
|------------|--------|
| `Number("")` | `0` |
| `Number(" ")` | `0` |
| `Number("10")` | `10` |
| `Number("10.5")` | `10.5` |
| `Number("hello")` | `NaN` |

### Other Conversions

| Expression | Result |
|------------|--------|
| `Number(null)` | `0` |
| `Number(undefined)` | `NaN` |

### ToPrimitive (Object → Primitive)

For arrays, use this mental model:

```javascript
[].toString()      // ""
[1].toString()     // "1"
[1, 2].toString()  // "1,2"
```

---

## Type Coercion (== Comparisons)

### Rules

1. **Same type?** → Compare values directly: `5 == 5`, `"hello" == "hello"`

2. **`null` and `undefined`:**
   - `null == undefined` → `true`
   - `null === undefined` → `false`

3. **Boolean → Number:** `true → 1`, `false → 0`

4. **Object vs Primitive:** Convert object to primitive first.

5. **String vs Number:** Convert string to number.

### Example: `[] == false`

```
[] == false
↓
"" == false      (ToPrimitive)
↓
"" == 0          (boolean to number)
↓
0 == 0           (string to number)
↓
true
```

---

## Edge Cases

### `NaN`

```javascript
NaN === NaN;          // false
Object.is(NaN, NaN);  // true
```

### `0` and `-0`

```javascript
0 === -0;          // true
Object.is(0, -0);  // false
```

### Numeric Conversion with null/undefined

```javascript
null + 1;      // 1 (null → 0)
undefined + 1; // NaN (undefined → NaN)
```

### Boolean Conversion

```javascript
Boolean("false"); // true – non-empty string
Boolean("0");     // true – non-empty string
Boolean("hello"); // true
Boolean(" ");     // true – space is a character
Boolean("");      // false – only empty string is falsy
```

### `[] + {}` and `{} + []`

```javascript
[] + {};
// "" + "[object Object]"
// "[object Object]"

{} + [];
// If {} is interpreted as an empty block: +[] → 0
// If {} is interpreted as an object: "[object Object]"
// Context-dependent!
```

### `{} + {}`

```javascript
{} + {};
// "[object Object][object Object]"
```

---

## Arithmetic Coercion Examples

```javascript
"5" - 2;    // 3 – string converted to number
false - 0;  // 0 – boolean converted to number
```

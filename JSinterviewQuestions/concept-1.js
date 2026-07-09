 //Playwright JavaScript Interview Questions list
	// 1) 00:21 - Can a JavaScript object hold a function as a property? Explain with an example.
//ANS: Program
const person = { // Object literal
        name : "Shasti", // Property
        age: 30, // Property
greet : function(){// Method (function as a property)
            console. log ("Hello, I am " + this.name);// Accessing the name property using 'this' keyword
}       // The 'greet' method can be called to display a greeting message that includes the person's name.
}  // Accessing the properties and method of the person object     
 person. name // Output: Shasti
 person-greet(); // Hello, I am John // In this example, the 'person' object has a property 'name' and a method 'greet'. The 'greet' method is a function that can be called to display a greeting message that includes the person's name. This demonstrates that JavaScript objects can indeed hold functions as properties, allowing for more complex and dynamic behavior.

	// 2) 03:28 - What are anonymous functions in JavaScript? Define their syntax and implementation.
//ANS:
function sayHello(){// Named function
return "Hello, I am the world "; // This function can be called by its name 'sayHello' to execute the code within it and return the greeting message.
}// Anonymous function assigned to a variable

const helloMessage = sayHello(); // Calling the named function and storing its return value in the variable 'helloMessage'
console. log (helloMessage); // Hello, I am the world // In this example, 'sayHello' is a named function that returns a greeting message. The function can be called by its name to execute the code and return the message. Anonymous functions, on the other hand, do not have a name and are often assigned to variables or used as arguments in other functions. They can be defined using function expressions or arrow functions.

const greet = function (name) { // Anonymous function assigned to a variable
           return "Hello, I am" + name; // This anonymous function takes a parameter 'name' and returns a greeting message that includes the provided name. It can be called using the variable 'greet' to execute the code and return the message.
} // Calling the anonymous function and storing its return value in the variable 'greetMessage'
console. log (greet)// Hello, I am undefined // In this example, an anonymous function is assigned to the variable 'greet'. The function takes a parameter 'name' and returns a greeting message that includes the provided name. However, since we did not pass any argument when calling 'greet', it returns "Hello, I am undefined". To get a proper greeting message, we can call the function with an argument like this: console.log(greet("Shasti")); // Hello, I am Shasti

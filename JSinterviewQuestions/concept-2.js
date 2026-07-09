// 3)	07:22 - What is the difference between var, const, and let? Explain with an example.
 
// 'var' is function-scoped or globally -scoped and can be re-declared and updated

 function varExample() {
    var x = 10; // 'var' declaration
    if (true) {// Block scope
        var x = 20; // 'var' is function-scoped, so this re-declares and updates the same variable 'x'
        console.log(x); // Output: 20
    }
    console.log(x); // Output: 20 - The value of 'x' is updated to 20 within the function scope
}

// 'let' is block-scoped and can be updated but not re-declared within the same scope

function varExample2() {
    let x = 10; // 'let' declaration
    if (true) {// Block scope
        let x = 20; // 'let' is block-scoped, so this declares a new variable 'x' within the block scope
        y=30;// 'y' is not declared with 'let' or 'var', so it becomes a global variable ( 'y' is a global variable VAR KEYWORD)
        console.log(x); // Output: 20
    }
    console.log(y); // Output: 30 - The variable 'y' is accessible outside the block scope because it was not declared with 'let' or 'var'
    console.log(x); // Output: 10 - The value of 'x' remains unchanged outside the block scope

    // 'const' is block-scoped and cannot be updated or re-declared within the same scope
    function varExample3() {
        const x = 10; // 'const' declaration
        if (true) {// Block scope
            const x = 20; // 'const' is block-scoped, so this declares a new variable 'x' within the block scope
            console.log(x); // Output: 20
        }
        x = 30; // This will throw an error because 'x' is declared as a constant and cannot be updated
        console.log(x); // Output: 20 - This line will not be executed due to the error
    }
}
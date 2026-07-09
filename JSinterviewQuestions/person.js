// 8) 49:15 - Create an inheritance relationship between a parent and child class. Invoke the parent constructor from the child class. Create main.js to call parent class methods from a child class object.
//ANS:

// Define the parent class Person

class Person {
    constructor(name, age) {
        this.name = name;   
        this.age = age;
    }   

    //method to get the person's details
    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}

// export the Person class to be used in other files
export default Person;
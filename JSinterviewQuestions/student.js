//9) 55:21 - From the above code, explain how the super and these keywords help achieve the solution.

// Import the Person class from the person.js file
import Person from './person.js';   

//Define the child class Student that extends the Person class
class Student extends Person {
    constructor (name,age, grade){
        // Call the parent class constructor using super() to initialize name and age
        super(name, age);
        this.grade = grade; // Initialize the grade property specific to Student
    }

    // Method to get the student's details, including the grade
    getStudentDetails() {
        // Call the parent class's getDetails() method to get name and age, and add grade information
        const parentDetails = super.getDetails(); // Get details from the Person class
        return `${parentDetails}, Grade: ${this.grade}`; // Return combined details
    }
}

// Export the Student class to be used in other files
export default Student; 

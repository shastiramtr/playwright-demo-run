// IMport the Student class from the student.js file
import Student from './student.js';

// Create an object of the Student class with name, age, and grade
const student1 = new Student("Shastiram", 20, "A");

// Call the getStudentDetails() method to get the student's details and print it
console.log(student1.getStudentDetails()); // Output: Name: Shastiram, Age: 20, Grade: A
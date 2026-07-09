class LoginPage {// define a class named LoginPage to represent the login page of the application
    constructor(page) {// define a constructor that takes a page object as an argument to interact with the web page elements
        this.page = page;// assign the page object to a class property for later use in methods
        // what does this mean? this.page is a reference to the page object that is passed as an argument to the constructor. It allows the class to interact with the web page elements and perform actions such as navigating to URLs, filling input fields, and clicking buttons. By assigning it to this.page, we can use it in other methods of the class to perform various operations on the web page.
        this.username = page.getByRole('textbox', { name: 'Email' });// locate the username input field using its role and name and assign it to a class property
        this.password = page.getByRole('textbox', { name: 'Password' });// locate the password input field using its role and name and assign it to a class property
        this.loginButton = page.getByRole('button', { name: 'Log in' });// locate the login button using its role and name and assign it to a class property
    }// end of the constructor method
    async goto(){// define an asynchronous method named goto to navigate to the login page
        await this.page.goto('https://book-stg.warnerhotels.co.uk/ibe/WASW/reservations/book?arrival=2026-12-04&departure=2026-12-07');// navigate to the specified URL for the login page
    }// end of the goto method
    async validlogin(email,password){// define an asynchronous method named validlogin that takes email and password as arguments to perform a valid login action
        await this.username.fill(email);// fill the username input field with the provided email
        await this.password.fill(password);// fill the password input field with the provided password
        await this.loginButton.click();// click the login button to submit the login form
    }// end of the validlogin method
}
module.exports = {LoginPage}; // export the LoginPage class as a module
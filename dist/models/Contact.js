"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
//* UC1 : Ability to create a contacts
class Contact {
    constructor(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    displayContact() {
        console.log("\nContact Details : ");
        console.log(`👤 Name       : ${this.firstName} ${this.lastName}`);
        console.log(`🏠 Address    : ${this.address}, ${this.city}, ${this.state} - ${this.zip}`);
        console.log(`📞 Phone No.  : ${this.phoneNumber}`);
        console.log(`📧 Email      : ${this.email}`);
    }
    //* UC7 - Compare two contacts for equality (based on first and last name)
    equals(other) {
        return (this.firstName.toLowerCase() === other.firstName.toLowerCase() &&
            this.lastName.toLowerCase() === other.lastName.toLowerCase());
    }
}
exports.Contact = Contact;

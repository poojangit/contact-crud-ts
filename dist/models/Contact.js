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
        console.log("\n Contact Details : ");
        console.log(`👤 Name       : ${this.firstName} ${this.lastName}`);
        console.log(`🏠 Address    : ${this.address}, ${this.city}, ${this.state} - ${this.zip}`);
        console.log(`📞 Phone No.  : ${this.phoneNumber}`);
        console.log(`📧 Email      : ${this.email}`);
    }
}
exports.Contact = Contact;

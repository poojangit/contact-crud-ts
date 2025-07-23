"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBook = void 0;
const validators_1 = require("../utils/validators");
const input_1 = require("../utils/input");
class AddressBook {
    constructor() {
        this.contacts = [];
    }
    //* UC2 : Ability to add a new Contact to Address Book
    addContact(contact) {
        this.contacts.push(contact);
        console.log("\n ✅ Contact added successfully!\n");
    }
    getAllContacts() {
        return this.contacts;
    }
    //* UC3: Ability to edit an existing contact using their name via console input. 
    editContactByName(firstName) {
        const contact = this.contacts.find(c => c.firstName.toLowerCase() === firstName.toLowerCase());
        if (!contact) {
            console.log(`❌ Contact with name "${firstName}" not found.`);
            return false;
        }
        console.log(`\n 📝 Editing contact for: ${contact.firstName} ${contact.lastName}`);
        contact.lastName = (0, input_1.getInput)("Enter new Last Name: ");
        contact.address = (0, input_1.getInput)("Enter new Address: ");
        contact.city = (0, input_1.getInput)("Enter new City: ");
        contact.state = (0, input_1.getInput)("Enter new State: ");
        //* Additional implementation - Regex validations for zip, phonenumber and email
        let zip = parseInt((0, input_1.getInput)("Enter new Zip Code: "));
        while (!(0, validators_1.isValidZipCode)(zip)) {
            zip = parseInt((0, input_1.getInput)("Invalid zip. Enter a correct zip code"));
        }
        contact.zip = zip;
        let phone = parseInt((0, input_1.getInput)("Enter new Phone Number: "));
        while (!(0, validators_1.isValidPhoneNumber)(phone)) {
            phone = parseInt((0, input_1.getInput)("Invalid Phone number. Enter a Valid one !"));
        }
        let email = (0, input_1.getInput)("Enter new Email: ");
        while (!(0, validators_1.isValidEmail)(email)) {
            email = (0, input_1.getInput)("Invalid email. Enter a valid email : ");
        }
        console.log("\n✅ Contact updated successfully!");
        contact.displayContact();
        return true;
    }
    //* UC4 : Ability to delete the person using a person name
    deleteContactByName(firstName) {
        const index = this.contacts.findIndex((c) => c.firstName.toLowerCase() === firstName.toLowerCase());
        if (index == -1) {
            console.log("The contact detail is not found");
        }
        const removed = this.contacts.splice(index, 1)[0];
        console.log(`\n🗑️  Contact "${removed.firstName} ${removed.lastName}" deleted successfully!\n`);
        return true;
    }
}
exports.AddressBook = AddressBook;

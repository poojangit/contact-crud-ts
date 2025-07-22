"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const AddressBook_1 = require("./services/AddressBook");
const Contact_1 = require("./models/Contact");
const validators_1 = require("./utils/validators");
class AddressBookMain {
    constructor() {
        this.addressBook = new AddressBook_1.AddressBook();
    }
    displayWelcomeMessage() {
        console.log("🖐️  Welcome to my Address Book Program");
    }
    start() {
        this.displayWelcomeMessage();
        const addressBookName = readline_sync_1.default.question("\n Enter a name for your Address book: ");
        console.log(`\nAddress Book "${addressBookName}" created successfully!!"`);
        this.addMultipleContactFromConsole();
    }
    displayAllContacts() {
        const allContacts = this.addressBook.getAllContacts();
        console.log("\n📒 All Contacts in Address Book:");
        if (allContacts.length === 0) {
            console.log("No contacts found");
        }
        else {
            allContacts.forEach((contact, index) => {
                console.log(`\n Contact #${index + 1}`);
                contact.displayContact();
            });
        }
    }
    addMultipleContactFromConsole() {
        //* UC5 - Ability to add multiple person to Address Book
        let continueAdding = true;
        while (continueAdding) {
            const shouldAdd = readline_sync_1.default.question("\n Do you want to add a new contact? (y/n): ");
            if (shouldAdd.toLowerCase() !== "y") {
                continueAdding = false;
                break;
            }
            console.log("\n📝 Add the contact details:");
            const firstName = readline_sync_1.default.question("Enter First Name: ");
            const lastName = readline_sync_1.default.question("Enter Last Name: ");
            const address = readline_sync_1.default.question("Enter Address: ");
            const city = readline_sync_1.default.question("Enter City: ");
            const state = readline_sync_1.default.question("Enter State: ");
            //* Additional implementation - Regex validations for zip, phonenumber and email
            let zip = parseInt(readline_sync_1.default.question("Enter new Zip Code: "));
            while (!(0, validators_1.isValidZipCode)(zip)) {
                zip = parseInt(readline_sync_1.default.question("Invalid zip. Enter a correct zip code : --> "));
            }
            let phoneNumber = parseInt(readline_sync_1.default.question("Enter new Phone Number: "));
            while (!(0, validators_1.isValidPhoneNumber)(phoneNumber)) {
                phoneNumber = parseInt(readline_sync_1.default.question("Invalid Phone number. Enter a Valid 10 digit Phone number : --> "));
            }
            let email = readline_sync_1.default.question("Enter new Email: ");
            while (!(0, validators_1.isValidEmail)(email)) {
                email = readline_sync_1.default.question("Invalid email. Enter a valid email : --> ");
            }
            const contact = new Contact_1.Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
            this.addressBook.addContact(contact);
            //* UC3 - Ability to edit existing contact
            const shouldEdit = readline_sync_1.default.question("\nDo you want to edit this contact now? (y/n): ");
            if (shouldEdit.toLowerCase() === "y") {
                this.addressBook.editContactByName(firstName);
            }
            //* UC4 - Ability to delete the contact
            const shouldDelete = readline_sync_1.default.question("\nDo you want to delete this contact? (y/n): ");
            if (shouldDelete.toLowerCase() === "y") {
                this.addressBook.deleteContactByName(firstName);
            }
        }
        this.displayAllContacts();
    }
}
const app = new AddressBookMain();
app.start();

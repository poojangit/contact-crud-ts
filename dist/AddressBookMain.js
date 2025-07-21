"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const AddressBook_1 = require("./services/AddressBook");
const Contact_1 = require("./models/Contact");
class AddressBookMain {
    constructor() {
        this.addressBook = new AddressBook_1.AddressBook();
    }
    displayWelcomeMessage() {
        console.log("🖐️  Welcome to my Address Book Program");
    }
    start() {
        this.displayWelcomeMessage();
        this.addContactFromConsole();
    }
    addContactFromConsole() {
        console.log("Add the contact details : ");
        const firstName = readline_sync_1.default.question("Enter First Name: ");
        const lastName = readline_sync_1.default.question("Enter Last Name: ");
        const address = readline_sync_1.default.question("Enter Address: ");
        const city = readline_sync_1.default.question("Enter City: ");
        const state = readline_sync_1.default.question("Enter State: ");
        const zip = parseInt(readline_sync_1.default.question("Enter Zip Code: "));
        const phoneNumber = parseInt(readline_sync_1.default.question("Enter Phone Number: "));
        const email = readline_sync_1.default.question("Enter Email: ");
        const contact = new Contact_1.Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
        this.addressBook.addContact(contact);
        const shouldEdit = readline_sync_1.default.question("/n ✏️ Do you want to edit this contact now ? (y/n): ");
        if (shouldEdit.toLowerCase() === "y") {
            this.addressBook.editContactByName(firstName);
        }
        console.log("\n ✅ Contact Updated successfully!\n");
    }
}
const app = new AddressBookMain();
app.start();

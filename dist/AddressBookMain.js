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
        this.addressBooks = new Map();
    }
    displayWelcomeMessage() {
        console.log("\n🖐️  Welcome to my Address Book Program");
    }
    start() {
        this.displayWelcomeMessage();
        let exit = false;
        while (!exit) {
            console.log(`\n 📚 Main Menu: 
            1. Add New Address book
            2. Open Existing Address book
            3. Exit `);
            const choice = readline_sync_1.default.question("Enter your choice: ");
            switch (choice) {
                case "1":
                    this.createNewAddressBook();
                    break;
                case "2":
                    this.openExistingAddressbook();
                    break;
                case "3":
                    console.log("\n Exiting the program.....");
                    exit = true;
                    break;
                default:
                    console.warn("\nInvalid Choice! Please enter 1,2 or 3");
            }
        }
    }
    createNewAddressBook() {
        const name = readline_sync_1.default.question("\n Enter a name for the new Address Book:  ");
        if (this.addressBooks.has(name)) {
            console.log("⚠️ Address Book with this name already exists. Please choose a diffrent name : ");
        }
        else {
            this.addressBooks.set(name, new AddressBook_1.AddressBook());
            console.log(`\n✅ Address Book "${name}" created successfully !!`);
        }
    }
    openExistingAddressbook() {
        if (this.addressBooks.size === 0) {
            console.log("\n⚠️  No Address Books available. Please create one first.");
            return;
        }
        console.log("\n📚 Available Address Books:");
        let index = 1;
        for (const name of this.addressBooks.keys()) {
            console.log(`${index++}. ${name}`);
        }
        const name = readline_sync_1.default.question("\nEnter the name of the Address to open: ");
        const addressBook = this.addressBooks.get(name.trim());
        if (!addressBook) {
            console.log("Address Book not found.");
            return;
        }
        let backToMainMenu = false;
        while (!backToMainMenu) {
            console.log(`\n📖 Address Book: "${name}"
            1. Add Contact
            2. Edit contact
            3. Delete Contact 
            4. Display all contacts
            5. Back to Main Menu`);
            const option = readline_sync_1.default.question(" Choose an option: ");
            switch (option) {
                case "1":
                    this.addMultipleContactFromConsole(addressBook);
                    break;
                case "2":
                    const nameToEdit = readline_sync_1.default.question("Enter First Name of the contact to edit: ");
                    if (this.displayAllContacts.length === 0) {
                        console.log("\n⚠️ No contacts found");
                    }
                    addressBook.editContactByName(nameToEdit);
                    break;
                case "3":
                    const nameToDelete = readline_sync_1.default.question("Enter First Name of the Contact to delete: ");
                    addressBook.deleteContactByName(nameToDelete);
                    break;
                case "4":
                    this.displayAllContacts(addressBook);
                    break;
                case "5":
                    backToMainMenu = true;
                    break;
                default:
                    console.warn("Invalid option. Choose between 1-5.");
            }
        }
    }
    displayAllContacts(addressBook) {
        const allContacts = addressBook.getAllContacts();
        console.log("\n📒 All Contacts in Address Book:");
        if (allContacts.length === 0) {
            console.log("\n⚠️ No contacts found");
        }
        else {
            allContacts.forEach((contact, index) => {
                console.log(`\n Contact #${index + 1}`);
                contact.displayContact();
            });
        }
    }
    addMultipleContactFromConsole(addressBook) {
        //* UC5 - Ability to add multiple person to Address Book
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
        addressBook.addContact(contact);
        console.log("\n✅ Contact added successfully.");
    }
}
const app = new AddressBookMain();
app.start();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBook = void 0;
const readline_sync_1 = __importDefault(require("readline-sync"));
class AddressBook {
    constructor() {
        this.contacts = [];
    }
    //* UC2 : Ability to add a new Contact to Address Book
    addContact(contact) {
        this.contacts.push(contact);
        console.log("\n ✅ Contact added successfully!\n");
        contact.displayContact();
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
        contact.lastName = readline_sync_1.default.question("Enter new Last Name: ");
        contact.address = readline_sync_1.default.question("Enter new Address: ");
        contact.city = readline_sync_1.default.question("Enter new City: ");
        contact.state = readline_sync_1.default.question("Enter new State: ");
        contact.zip = parseInt(readline_sync_1.default.question("Enter new Zip Code: "));
        contact.phoneNumber = parseInt(readline_sync_1.default.question("Enter new Phone Number: "));
        contact.email = readline_sync_1.default.question("Enter new Email: ");
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

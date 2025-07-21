"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressBook = void 0;
class AddressBook {
    constructor() {
        this.contacts = [];
    }
    addContact(contact) {
        this.contacts.push(contact);
        console.log("✅ Contact added successfully!\n");
        contact.displayContact();
    }
    getAllContacts() {
        return this.contacts;
    }
}
exports.AddressBook = AddressBook;

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
    //* Uc7 : Ability to ensure there is no dublicate entry of the same person in a particular Address Book
    addContact(contact) {
        const isDublicate = this.contacts.some((c) => c.equals(contact));
        if (isDublicate) {
            console.log(`\n❌ Dublicate contact! "${contact.firstName} ${contact.lastName}" Already exists in the Address Book! "`);
            return;
        }
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
        console.log("(Press Enter to keep the current value)");
        // If user presses Enter → keep old value
        const lastName = (0, input_1.getInput)(`Enter new Last Name [${contact.lastName}]: `, validators_1.isValidName, "❌ Invalid name. Must start with uppercase & have at least 2 letters.", true) || contact.lastName;
        const address = (0, input_1.getInput)(`Enter new Address [${contact.address}]: `, validators_1.isValidAddress, "❌ Invalid address. Must be at least 3 characters.", true) || contact.address;
        const city = (0, input_1.getInput)(`Enter new City [${contact.city}]: `, validators_1.isValidCityOrState, "❌ Invalid city. Must be at least 3 characters.", true) || contact.city;
        const state = (0, input_1.getInput)(`Enter new State [${contact.state}]: `, validators_1.isValidCityOrState, "❌ Invalid state. Must be at least 3 characters.", true) || contact.state;
        let zip = (0, input_1.getNumericInput)(`Enter new Zip Code [${contact.zip}]: `, validators_1.isValidZipCode, "❌ Invalid zip. Must be 5-6 digits.", true);
        if (!zip)
            zip = contact.zip;
        let phone = (0, input_1.getNumericInput)(`Enter new Phone Number [${contact.phoneNumber}]: `, validators_1.isValidPhoneNumber, "❌ Invalid phone. Must be 10 digits starting with 6-9.", true);
        if (!phone)
            phone = contact.phoneNumber;
        const email = (0, input_1.getInput)(`Enter new Email [${contact.email}]: `, validators_1.isValidEmail, "❌ Invalid email format.", true) || contact.email;
        // Update the contact
        contact.lastName = lastName;
        contact.address = address;
        contact.city = city;
        contact.state = state;
        contact.zip = zip;
        contact.phoneNumber = phone;
        contact.email = email;
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
    //* UC8 : Ability to search person in a city or state accross the multiple book
    searchByCity(city) {
        return this.contacts.filter(c => c.city.toLowerCase() === city.toLowerCase());
    }
    searchByState(state) {
        return this.contacts.filter(c => c.state.toLowerCase() === state.toLowerCase());
    }
    //* UC9 : Ability to view Persons by city or state
    getContactsByCity() {
        const cityMap = new Map();
        this.contacts.forEach(contact => {
            const city = contact.city;
            if (!cityMap.has(city)) {
                cityMap.set(city, []);
            }
            cityMap.get(city).push(contact);
        });
        return cityMap;
    }
    getContactsbyState() {
        const stateMap = new Map();
        this.contacts.forEach(contact => {
            const state = contact.state;
            if (!stateMap.has(state)) {
                stateMap.set(state, []);
            }
            stateMap.get(state).push(contact);
        });
        return stateMap;
    }
    getSortedContactsbyName() {
        return [...this.contacts].sort((a, b) => a.firstName.localeCompare(b.firstName));
    }
}
exports.AddressBook = AddressBook;

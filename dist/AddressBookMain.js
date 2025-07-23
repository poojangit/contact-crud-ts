"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const AddressBook_1 = require("./services/AddressBook");
const AddressBookManager_1 = require("./managers/AddressBookManager");
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
            const choice = readline_sync_1.default.question("\nEnter your choice: ");
            switch (choice) {
                case "1":
                    this.createNewAddressBook();
                    break;
                case "2":
                    this.openExistingAddressBook();
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
        const name = readline_sync_1.default.question("\nEnter a name for the new Address Book: ");
        if (this.addressBooks.has(name)) {
            console.log("⚠️ Address Book already exists. Choose a different name.");
        }
        else {
            this.addressBooks.set(name, new AddressBook_1.AddressBook());
            console.log(`\n✅ Address Book "${name}" created successfully!`);
        }
    }
    openExistingAddressBook() {
        if (this.addressBooks.size === 0) {
            console.log("\n⚠️  No Address Books available. Please create one first.");
            return;
        }
        console.log("\n📚 Available Address Books:");
        [...this.addressBooks.keys()].forEach((name, index) => {
            console.log(`${index + 1}. ${name}`);
        });
        const name = readline_sync_1.default.question("\nEnter the name of the Address Book to open: ");
        const addressBook = this.addressBooks.get(name.trim());
        if (!addressBook) {
            console.log("❌ Address Book not found.");
            return;
        }
        const manager = new AddressBookManager_1.AddressBookManager(addressBook, name);
        manager.manage();
    }
}
const app = new AddressBookMain();
app.start();

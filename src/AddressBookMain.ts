import readlineSync from "readline-sync";
import { AddressBook } from "./services/AddressBook";
import { Contact } from "./models/Contact";

class AddressBookMain {
    private addressBook = new AddressBook();

    displayWelcomeMessage(): void {
        console.log("🖐️  Welcome to my Address Book Program");
    }

    start(): void {
        this.displayWelcomeMessage();
        const addressBookName = readlineSync.question("\n Enter a name for your Address book: ")
        console.log(`\nAddress Book "${addressBookName}" created successfully!!"`)
        this.addMultipleContactFromConsole();
    }

    private displayAllContacts() : void {
        const allContacts = this.addressBook.getAllContacts()
        console.log("\n📒 All Contacts in Address Book:");
        if(allContacts.length === 0){
            console.log("No contacts found");
        } else {
            allContacts.forEach((contact, index) => {
                console.log(`\n Contact #${index+1}`);
                contact.displayContact()
            })
        }
        
    }
    private addMultipleContactFromConsole(): void {
    //* UC5 - Ability to add multiple person to Address Book
    let continueAdding = true;

    while (continueAdding) {
        const shouldAdd = readlineSync.question("\n Do you want to add a new contact? (y/n): ");
        if (shouldAdd.toLowerCase() !== "y") {
            continueAdding = false;
            break;
        }

        console.log("\n📝 Add the contact details:");
        const firstName = readlineSync.question("Enter First Name: ");
        const lastName = readlineSync.question("Enter Last Name: ");
        const address = readlineSync.question("Enter Address: ");
        const city = readlineSync.question("Enter City: ");
        const state = readlineSync.question("Enter State: ");
        const zip = parseInt(readlineSync.question("Enter Zip Code: "));
        const phoneNumber = parseInt(readlineSync.question("Enter Phone Number: "));
        const email = readlineSync.question("Enter Email: ");

        const contact = new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
        this.addressBook.addContact(contact);

        //* UC3 - Ability to edit existing contact
        const shouldEdit = readlineSync.question(" Do you want to edit this contact now? (y/n): ");
        if (shouldEdit.toLowerCase() === "y") {
            this.addressBook.editContactByName(firstName);
        }

        //* UC4 - Ability to delete the contact
        const shouldDelete = readlineSync.question(" Do you want to delete this contact? (y/n): ");
        if (shouldDelete.toLowerCase() === "y") {
            this.addressBook.deleteContactByName(firstName);
        }
    }
    this.displayAllContacts();
}

}
const app = new AddressBookMain();
app.start();



import readlineSync from "readline-sync";
import { AddressBook } from "../services/AddressBook";
import { Contact } from "../models/Contact";
import { isValidEmail, isValidPhoneNumber, isValidZipCode } from "../utils/validators";

export class AddressBookManager {
    private addressBook : AddressBook
    private name : string
    constructor(addressBook : AddressBook, name : string){
        this.addressBook = addressBook
        this.name = name
    }
    public manage() : void {
         let backToMainMenu = false
        while(!backToMainMenu){
            console.log(`\n📖 Address Book: "${this.name}"
            1. Add Contact
            2. Edit contact
            3. Delete Contact 
            4. Display all contacts
            5. Back to Main Menu`);

           const option = readlineSync.question("Choose an option: ");
            switch (option) {
                case "1":
                    this.addContact();
                    break;
                case "2":
                    const nameToEdit = readlineSync.question("Enter First Name of the contact to edit: ");
                    this.addressBook.editContactByName(nameToEdit);
                    break;
                case "3":
                    const nameToDelete = readlineSync.question("Enter First Name of the Contact to delete: ");
                    this.addressBook.deleteContactByName(nameToDelete);
                    break;
                case "4":
                    this.displayAllContacts();
                    break;
                case "5":
                    backToMainMenu = true;
                    break;
                default:
                    console.warn("Invalid option. Choose between 1-5.");
            }
        }
    }
   private displayAllContacts(): void {
        const allContacts = this.addressBook.getAllContacts();
        if (allContacts.length === 0) {
            console.log("\n⚠️  No contacts found.");
        } else {
            allContacts.forEach((contact, index) => {
                console.log(`\nContact #${index + 1}`);
                contact.displayContact();
            });
        }
    }

    private addContact(): void {
    //* UC5 - Ability to add multiple person to Address Book

        console.log("\n📝 Add the contact details:");

        const firstName = readlineSync.question("Enter First Name: ");
        const lastName = readlineSync.question("Enter Last Name: ");
        const address = readlineSync.question("Enter Address: ");
        const city = readlineSync.question("Enter City: ");
        const state = readlineSync.question("Enter State: ");

         //* Additional implementation - Regex validations for zip, phonenumber and email
        let zip = parseInt(readlineSync.question("Enter new Zip Code: "));
        while(!isValidZipCode(zip)){
            zip = parseInt(readlineSync.question("Invalid zip. Enter a correct zip code : --> "))
        }

        let phoneNumber = parseInt(readlineSync.question("Enter new Phone Number: "));
        while(!isValidPhoneNumber(phoneNumber)) {
            phoneNumber = parseInt(readlineSync.question("Invalid Phone number. Enter a Valid 10 digit Phone number : --> "))
        }
        let email = readlineSync.question("Enter new Email: ");
        while(!isValidEmail(email)){
            email = readlineSync.question("Invalid email. Enter a valid email : --> ")
        }
        
        const contact = new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
        this.addressBook.addContact(contact);
    }
}

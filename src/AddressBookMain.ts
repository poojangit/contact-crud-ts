import readlineSync from "readline-sync";
import { AddressBook } from "./services/AddressBook";
import { Contact } from "./models/Contact";
import { isValidEmail, isValidPhoneNumber, isValidZipCode } from "./utils/validators";

class AddressBookMain {
    private addressBooks : Map<string , AddressBook> = new Map(); 

    displayWelcomeMessage(): void {
        console.log("\n🖐️  Welcome to my Address Book Program");
    }

    start(): void {
        this.displayWelcomeMessage();
        let exit = false
        while(!exit){
            console.log(`\n 📚 Main Menu: 
            1. Add New Address book
            2. Open Existing Address book
            3. Exit `);    
        const choice = readlineSync.question("\nEnter your choice: ")
        switch(choice) {
            case "1" : 
                this.createNewAddressBook()
                break
            case "2" : 
                this.openExistingAddressbook()
                break
            case "3" :
                console.log("\n Exiting the program.....")
                exit = true
                break
            default: 
                console.warn("\nInvalid Choice! Please enter 1,2 or 3"); 
            }
        }
    }

    private createNewAddressBook() : void {
        const name = readlineSync.question("\n Enter a name for the new Address Book:  ")
        if(this.addressBooks.has(name)){
            console.log("⚠️ Address Book with this name already exists. Please choose a diffrent name : ");
        } else {
            this.addressBooks.set(name, new AddressBook())
            console.log(`\n✅ Address Book "${name}" created successfully !!`);
        }
    }

    private openExistingAddressbook() : void {
        if(this.addressBooks.size === 0){
            console.log("\n⚠️  No Address Books available. Please create one first.");
            return
        }
        console.log("\n📚 Available Address Books:");
        let index = 1
        for(const name of this.addressBooks.keys()){
            console.log(`${index++}. ${name}`);
        }
        
        const name = readlineSync.question("\nEnter the name of the Address to open: ")
        const addressBook = this.addressBooks.get(name.trim())

        if(!addressBook){
            console.log("Address Book not found.");
            return
        }
        let backToMainMenu = false
        while(!backToMainMenu){
            console.log(`\n📖 Address Book: "${name}"
            1. Add Contact
            2. Edit contact
            3. Delete Contact 
            4. Display all contacts
            5. Back to Main Menu`);

            const option = readlineSync.question(" Choose an option: ")
            switch(option) {
                case "1" : 
                    this.addMultipleContactFromConsole(addressBook)
                    break;
                case "2" : 
                    const nameToEdit = readlineSync.question("Enter First Name of the contact to edit: ")
                    if(this.displayAllContacts.length === 0){
                       console.log("\n⚠️ No contacts found");
                    }
                    addressBook.editContactByName(nameToEdit)
                    break;
                case "3" :
                    const nameToDelete = readlineSync.question("Enter First Name of the Contact to delete: ")
                    addressBook.deleteContactByName(nameToDelete)
                    break;
                case "4" :
                    this.displayAllContacts(addressBook)
                    break;
                case "5" :
                    backToMainMenu = true
                    break;
                default:
                    console.warn("Invalid option. Choose between 1-5.");  
            }
        }
    }
    private displayAllContacts(addressBook : AddressBook) : void {
        const allContacts = addressBook.getAllContacts()
        console.log("\n📒 All Contacts in Address Book:");
        if(allContacts.length === 0){
            console.log("\n⚠️  No contacts found");
        } else {
            allContacts.forEach((contact, index) => {
                console.log(`\n Contact #${index+1}`);
                contact.displayContact()
            })
        }
    }
    private addMultipleContactFromConsole(addressBook : AddressBook): void {
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
        addressBook.addContact(contact);
    }
}

const app = new AddressBookMain();
app.start();



import { Contact } from "../models/Contact"
import { isValidEmail, isValidPhoneNumber, isValidZipCode } from "../utils/validators";
import { getInput } from "../utils/input";

export class AddressBook {
    private contacts : Contact[] = []
    //* UC2 : Ability to add a new Contact to Address Book
    addContact(contact : Contact) : void {
        this.contacts.push(contact)
        console.log("\n ✅ Contact added successfully!\n");
    } 
    getAllContacts() : Contact[] {
        return this.contacts
    }
    //* UC3: Ability to edit an existing contact using their name via console input. 
    editContactByName(firstName: string) : boolean {
        const contact = this.contacts.find(c => c.firstName.toLowerCase() === firstName.toLowerCase())
        if(!contact){
            console.log(`❌ Contact with name "${firstName}" not found.`);
            return false;
        }
       console.log(`\n 📝 Editing contact for: ${contact.firstName} ${contact.lastName}`);
        contact.lastName = getInput("Enter new Last Name: ");
        contact.address = getInput("Enter new Address: ");
        contact.city = getInput("Enter new City: ");
        contact.state = getInput("Enter new State: ");

        //* Additional implementation - Regex validations for zip, phonenumber and email
        let zip = parseInt(getInput("Enter new Zip Code: "));
        while(!isValidZipCode(zip)){
            zip = parseInt(getInput("Invalid zip. Enter a correct zip code"))
        }
        contact.zip = zip

        let phone = parseInt(getInput("Enter new Phone Number: "));
        while(!isValidPhoneNumber(phone)) {
            phone = parseInt(getInput("Invalid Phone number. Enter a Valid one !"))
        }
        let email = getInput("Enter new Email: ");
        while(!isValidEmail(email)){
            email = getInput("Invalid email. Enter a valid email : ")
        }
        console.log("\n✅ Contact updated successfully!");
        contact.displayContact();
        return true;
    }
    //* UC4 : Ability to delete the person using a person name

    deleteContactByName(firstName : string ) : boolean {
        const index = this.contacts.findIndex(
            (c) => c.firstName.toLowerCase() === firstName.toLowerCase()
        )
        if(index == -1 ) {
            console.log("The contact detail is not found");
        }
        const removed = this.contacts.splice(index, 1)[0];
        console.log(`\n🗑️  Contact "${removed.firstName} ${removed.lastName}" deleted successfully!\n`);
        return true
    }
 }



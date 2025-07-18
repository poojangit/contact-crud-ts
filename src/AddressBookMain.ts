import { Contact } from "./models/Contact";
class AddressBookMain {
    displayWelcomeMessage() : void{
        console.log("🖐️  Welcome to my Address Book Program");
    }

    start() : void {
        this.displayWelcomeMessage()

        const contact = new Contact (
            "Pooja",
            "N G",
            "Prathanasa 6/2 , Muthurme, Perdoor", 
            "Udupi",
            "Karnataka",
            576124,
            78993573577,
            "Pooja@gmail.com"
        )
        contact.displayContact()
    }
}
const addressBook = new AddressBookMain()
addressBook.start()

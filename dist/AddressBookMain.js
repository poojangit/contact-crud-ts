"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Contact_1 = require("./models/Contact");
class AddressBookMain {
    displayWelcomeMessage() {
        console.log("🖐️  Welcome to my Address Book Program");
    }
    start() {
        this.displayWelcomeMessage();
        const contact = new Contact_1.Contact("Pooja", "N G", "Prathanasa 6/2 , Muthurme, Perdoor", "Udupi", "Karnataka", 576124, 78993573577, "Pooja@gmail.com");
        contact.displayContact();
    }
}
const addressBook = new AddressBookMain();
addressBook.start();

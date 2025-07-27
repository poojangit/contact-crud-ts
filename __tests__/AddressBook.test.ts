import { Contact } from "../src/models/Contact"
import { AddressBook } from "../src/services/AddressBook"

describe("Address Class" , () => {
    let addressBook : AddressBook
    let contact : Contact

    beforeEach(()=> {
        addressBook = new AddressBook()
        contact = new Contact(
            "Deepika",
            "Ramireddy",
            "Raghava Raja Puram",
            "Kodur",
            "Andra Pradesh",
            516506,
            72722772629,
            "deepika@gmail.com"
        )
    })
    test("should add a new contact", () => {
        addressBook.addContact(contact)
        expect(addressBook.getAllContacts().length).toBe(1)
    })

    //Test for checking for dublicate contacts
    test("should not allow dublicate contacts", ()=> {
        addressBook.addContact(contact)
        addressBook.addContact(contact)
        expect(addressBook.getAllContacts().length).toBe(1)
    })

    //Test for deleting a contact
    test("should delete a contact by name", () => {
        addressBook.addContact(contact)
        const result = addressBook.deleteContactByName("Deepika")
        expect(result).toBe(true)
        expect(addressBook.getAllContacts().length).toBe(0)
    })
     
})
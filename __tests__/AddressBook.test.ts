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
     
    //Test for search contacts by city
    test("Should return contacts by city", () => {
        addressBook.addContact(contact)
        const result = addressBook.searchByCity("Kodur")
        expect(result.length).toBe(1)
    })

    //Test for sorting contacts by person name
    test("should sort contacts by name", () => {
        const contact2 = new Contact(
            "Laksmi", 
            "Muthyappa", 
            "Street", 
            "City", 
            "ST", 
            11111, 
            1234567890, 
            "laksmi@example.com"
        );
        addressBook.addContact(contact2);
        addressBook.addContact(contact);
        const sorted = addressBook.getSortedContactsByField("name");
        expect(sorted[0].firstName).toBe("Deepika");
    });
})
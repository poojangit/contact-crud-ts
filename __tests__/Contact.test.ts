
import { Contact } from "../src/models/Contact";

describe("Contact Class", () => {
    let contact: Contact;

    beforeEach(() => {
        contact = new Contact(
            "Pooja",
            "Ganapathi",
            "5/1(Y)4, Prathnasa",
            "New York",
            "NY",
            12345,
            9876543210,
            "john.doe@example.com"
        );
    });

    test("should correctly return formatted string from toString()", () => {
        const result = contact.toString();
        expect(result).toContain("Pooja Ganapathi");
        expect(result).toContain("5/1(Y)4, Prathnasa");
    });

    test("should compare two contacts with equals()", () => {
        const sameContact = new Contact(
            "Pooja",
            "Ganapathi",
            "Somewhere",
            "New York",
            "NY",
            12345,
            9876543210,
            "different@email.com"
        );
        expect(contact.equals(sameContact)).toBe(true);
    });

    test("should not consider contacts with different names as equal", () => {
        const differentContact = new Contact(
            "Pooj",
            "Smith",
            "123 Street",
            "New York",
            "NY",
            12345,
            9876543210,
            "jane@example.com"
        );
        expect(contact.equals(differentContact)).toBe(false);
    });
});

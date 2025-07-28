import { isValidAddress, isValidAddressBookName, isValidCityOrState, isValidEmail, isValidName, isValidPhoneNumber, isValidZipCode } from "../src/utils/validators"

describe("Validation Functions", () => {

    test("isValidAddressBookName - should validate names starting with uppercase and at least 3 characters", () => {
        expect(isValidAddressBookName("MyBook1")).toBe(true)
        expect(isValidAddressBookName("AJ")).toBe(false)
        expect(isValidAddressBookName("Book 2")).toBe(true)
    })

    test("isValidName - should validate names starting with uppercase ans at least 3 letters", ()=> {
        expect(isValidName("Pooja")).toBe(true)
        expect(isValidName("Jo")).toBe(false)
        expect(isValidName("pooja")).toBe(false)
    })

    test("isValidAddress - should allow letter, numbers, and punctuation", ()=> {
        expect(isValidAddress("Pratnasa 655")).toBe(true)
        expect(isValidAddress("K")).toBe(false)
    })

     test("isValidCityOrState - should allow only letters and spaces", () => {
        expect(isValidCityOrState("New York")).toBe(true);
        expect(isValidCityOrState("LA1")).toBe(false); 
    });

    test("isValidEmail - should validate only gmail addresses", () => {
        expect(isValidEmail("test@gmail.com")).toBe(true);
        expect(isValidEmail("test@yahoo.com")).toBe(false); 
    });

    test("isValidPhoneNumber - should validate 10-digit numbers starting with 6-9", () => {
        expect(isValidPhoneNumber(9876543210)).toBe(true);
        expect(isValidPhoneNumber(1234567890)).toBe(false); 
    });

    test("isValidZipCode - should validate 5 or 6 digit zip codes", () => {
        expect(isValidZipCode(560001)).toBe(true);
        expect(isValidZipCode(1234)).toBe(false); 
    });
})
import * as fs from "fs"
import * as path from "path"
import { Contact } from "../src/models/Contact"
import { FileManager } from "../src/utils/FileManager"

jest.mock("fs")

describe("FileManager", () => {
    const mockContacts = [
        new Contact(
            "Vinay",
            "Ganeshappa",
            "Bhadravathi",
            "Shimogga",
            "Karnataka",
            546467,
            8727266367,
            "vinay@gmail.com"
        )
    ]
   const fileName = "test.json";
    const filePath = path.join(process.cwd(), "src", "data", fileName);


    beforeEach(() => {
        jest.clearAllMocks();
    });

    //test for saving contacts to json format file
    test("should save contacts to JSON file", () => {
        FileManager.saveToJSON(fileName, mockContacts);
        expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, JSON.stringify(mockContacts, null, 2), "utf-8");
    });

    //test for loading a contacts 
    test("should read contacts from JSON file", () => {
       (fs.existsSync as jest.Mock).mockReturnValue(true);
       (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockContacts));
       const result = FileManager.readFromJSON(fileName);
       expect(result).toEqual(expect.any(Array));
       expect(result![0].firstName).toBe("Vinay");
    });


    test("Should return null when file does not exist", () => {
        (fs.existsSync as jest.Mock).mockReturnValue(false)
        const result = FileManager.readFromJSON(fileName)
        expect(result).toBeNull()
    })
})
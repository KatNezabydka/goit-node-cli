import fs from "fs/promises";
import path from "path";
import {fileURLToPath} from "url";
import {v4 as uuidv4} from "uuid";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function readContactsFile() {
    try {
        const data = await fs.readFile(contactsPath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Помилка читання файлу:", error.message);
        return [];
    }
}

async function writeContactsFile(contacts) {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    } catch (error) {
        console.error("Помилка запису у файл:", error.message);
    }
}

async function listContacts() {
    return readContactsFile()
}

async function getContactById(contactId) {
    const contacts = await readContactsFile();
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
}

async function removeContact(contactId) {
    const contacts = await readContactsFile();
    const index = contacts.findIndex((c) => c.id === contactId);

    if (index === -1) return null;

    const [removedContact] = contacts.splice(index, 1);
    await writeContactsFile(contacts);
    return removedContact;
}

async function addContact(name, email, phone) {
    const contacts = await readContactsFile();

    const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
    };

    contacts.push(newContact);
    await writeContactsFile(contacts);
    return newContact;
}

export {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};

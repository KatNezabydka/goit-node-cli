import {program} from "commander";
import {
    listContacts,
    getContactById,
    addContact,
    removeContact,
} from "./contacts.js";

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({action, id, name, email, phone}) {
    switch (action) {
        case "list": {
            const contacts = await listContacts();
            console.table(contacts);
            break;
        }

        case "get": {
            const contact = await getContactById(id);
            console.log(contact);
            break;
        }

        case "add": {
            const newContact = await addContact(name, email, phone);
            console.log("Contact added:");
            console.log(newContact);
            break;
        }

        case "remove": {
            const removed = await removeContact(id);
            console.log(removed ? "Contact deleted:" : "Contact did't found");
            console.log(removed);
            break;
        }

        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(options);

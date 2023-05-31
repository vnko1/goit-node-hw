const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath);
    return JSON.parse(response) || null;
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    const contact = contacts.find((contact) => contact.id === contactId);

    return contact || null;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) return null;

    const [result] = contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return result;
  } catch (err) {
    console.log(err);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const newContact = { name, email, phone, id: nanoid() };

    const contacts = await listContacts();

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };

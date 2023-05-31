const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const { program } = require("commander");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const allContacts = await listContacts();
        return console.log(allContacts);

      case "get":
        const contact = await getContactById(id);
        return console.log(contact);

      case "add":
        const newContact = await addContact({ name, email, phone });
        return console.log(newContact);

      case "remove":
        const deleteContact = await removeContact(id);
        return console.log(deleteContact);

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    throw error;
  }
};

invokeAction(options);

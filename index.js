const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contacts");

const { program } = require("commander");

program.options("-a, --action <type>").options("-i, -id <type>").options;

const invokeAction = async ({ action, id, name, email, phone }) => {
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
};

invokeAction({
  action: "list",
});

const { program } = require("commander");
const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      listContacts()
        .then(console.table)
        .catch(console.error);
      break;

    case "get":
      // ... id
      getContactById(id)
        .then(console.log)
        .catch(console.error);
      break;

    case "add":
      // ... name email phone
      addContact(name, email, phone)
        .then(console.log)
        .catch(console.error);
      break;

    case "remove":
      // ... id
      removeContact(id)
        .then(console.log)
        .catch(console.error);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);



//У Node.js "invokeAction" - це назва функції, яка викликається для виконання певних дій залежно від переданих опцій через командний рядок. Вона використовується для виклику відповідних функцій з імпортованого модуля "contacts.js" згідно з опціями, які були передані через командний рядок програми.

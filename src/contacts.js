// contacts.js
const path = require('path');
const fs = require('fs').promises;
const contactsPath = path.join(__dirname, 'db', 'contacts.json');
//для отримання списку контактів з файлу contacts.json
async function listContacts() {
  try {
// Перевірка існування файлу
    await ensureFileExists(contactsPath); 
// Зчитуємо дані з файлу контактів
    const data = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(data);
    return contacts
  } catch (error) {
  throw error;
  }
}

async function getContactById(contactId) {
// спочатку отримуємо всі контакти за допомогою функції listContacts() - отримання всіх контактів з файлу.
  try {
    const contacts = await listContacts();
//Array.find() для пошуку контакту з вказаним contactId. Метод find() повертає перший елемент масиву, для якого функція true, тобто контакт, у якого id співпадає з contactId. Якщо контакт не знайдено, повертається null.
    const contact = contacts.find(({ id }) => id === contactId);
    return contact || null;
  } catch (error) {
  throw error; 
  } 
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updateContacts = contacts.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
    const removeContact = contacts.find(({ id }) => id === contactId);
    return removeContact || null;
  } catch (error) {
    throw error;
  }
}

async function addContact(name, email, phone) {
  try {
//Створюємо новий об'єкт контакту з унікальним ідентифікатором id, який генерується на основі поточного часу
  const newContact = { id: Date.now(), name, email, phone };
    // Отримуємо поточний список контактів
    const contacts = await listContacts();
    // Додаємо новий контакт до списку
    const updateContacts = [...contacts, newContact];
    // Записуємо оновлений список контактів у файл, перетворивши його у рядок JSON
    await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2));
  return newContact;
  } catch (error) {
  throw error;
  }
}

async function ensureFileExists(filePath) {
  try {
    await fs.access(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
// Створення порожнього файлу, якщо він не існує
      await fs.writeFile(filePath, '[]'); 
    } else {
      throw error;
    }
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact }

//===================================
//JSON (JavaScript Object Notation) - це легкий формат обміну даними, який використовується для передачі структурованих даних між системами. JSON базується на синтаксисі мови JavaScript, але він є незалежним від платформи і мови програмування
//===================================
//використовуємо метод Array.filter() для створення нового масиву, в якому будуть тільки ті контакти, чий id не співпадає з contactId, тобто ми фільтруємо контакти і видаляємо той контакт, id якого збігається
// await: Ключове слово await вказує, що ми чекаємо завершення асинхронної операції перед тим, як продовжити виконання програми. У цьому випадку ми чекаємо завершення запису у файл.
// fs: Це модуль Node.js - для роботи з файловою системою.
// writeFile: Це асинхронний метод модуля fs, який використовується для запису даних у файл.
// contactsPath: Це шлях до файлу, в який ми записуємо оновлені контакти.
// JSON.stringify(updateContacts, null, 2): Це перетворення масиву updateContacts у рядок JSON з використанням методу JSON.stringify().
//updateContacts - це масив контактів, який ми хочемо записати у файл.
// null вказує на те, що ми не використовуємо ніяку функцію для перетворення значень. 
// 2 вказує на кількість пробілів, які використовуються для форматування виводу
// Отже, рядок await fs.writeFile(contactsPath, JSON.stringify(updateContacts, null, 2)); виконує запис оновленого масиву контактів у файл, перетворюючи його у рядок JSON і використовуючи асинхронний метод запису файлу writeFile.

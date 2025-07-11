import { ContactsCollection } from '../models/contact.js';

export async function getAllContacts() {
    const contacts = ContactsCollection.find();
    return contacts;
}

export async function getContactById(contactId) {
    const contactById = ContactsCollection.find(contactId);
    return contactById;
}

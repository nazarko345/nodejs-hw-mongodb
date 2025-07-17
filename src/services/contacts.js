import { ContactsCollection } from '../models/contact.js';

export async function getAllContacts() {
    const contacts = ContactsCollection.find();
    return contacts;
}

export async function getContactById(contactId) {
    const contactById = ContactsCollection.findById(contactId);
    return contactById;
}

export async function createContact(payload) {
  const contactById = ContactsCollection.create(payload);
  return contactById;
}

export async function patchContact(contactId) {
  const contactById = ContactsCollection.findOneAndUpdate(contactId);
  return contactById;
}

export async function deleteContact(contactId) {
  const contactById = ContactsCollection.findOneAndDelete(contactId);
  return contactById;
}


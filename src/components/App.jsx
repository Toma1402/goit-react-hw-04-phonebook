import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';
import { ContactsTitle, Phonebook, PhonebookTitle } from './App.styled';

import { useState } from 'react';
import { useEffect } from 'react';

const getLocaleStorageArr = () => {
  const savedContacts = localStorage.getItem('contacts');

  if (savedContacts !== null) {
    const parsedContacts = JSON.parse(savedContacts);
    return parsedContacts;
  }
};

export const App = () => {
  const [contacts, setContacts] = useState(getLocaleStorageArr);
  const [filter, setFilter] = useState('');
  const addContact = (name, number) => {
    const names = contacts.map(contact => contact.name.toLowerCase());
    const lowerCaseName = name.toLowerCase();
    if (names.indexOf(lowerCaseName) >= 0) {
      alert(name + 'is already in contacts');
      return;
    }
    setContacts(prevState => [{ name, number, id: nanoid() }, ...prevState]);
  };
  const removeName = idx => {
    setContacts(prevState => {
      let newContacts = [];
      prevState.forEach(contact => {
        if (contact.id !== idx) {
          newContacts.push(contact);
        }
      });
      return newContacts;
    });
  };
  const handleFilter = e => {
    setFilter(e.currentTarget.value);
  };
  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    const newArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return newArray;
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <Phonebook>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <ContactForm onSubmit={addContact} />
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter onChange={handleFilter} value={filter} />
        <ContactList contacts={getVisibleContacts()} onRemove={removeName} />
      </Phonebook>
    </>
  );
};

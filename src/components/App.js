import { useState, useEffect } from 'react';

import Form from './Form';
import Contacts from './Contacts';
import Filter from './Filter';

import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

// ====== Второй способ работы с localStorage и useState ======
//  == Отдельная функция работы с localStorage и useEffect ==
// const useLocalStorage = (key, defaultValue) => {
//   const [state, setState] = useState(() => {
//     return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
//   });
//   useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(state));
//   }, [key, state]);

//   return [state, setState];
// };
//  == Записи useState в функции ==
// const [contacts, setContacts] = useState('contacts', []);
// const [filter, setFilter] = useState('filter', '');
//
// =============================================================

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const newName = contacts.map(el => el.name.toLowerCase());
    if (newName.includes(data.name.toLowerCase())) {
      return alert(`${data.name} is already in contacts`);
    }
    const input = { id: nanoid(3), name: data.name, number: data.number };
    setContacts(prevState => [...prevState, input]);
  };

  const onFilter = event => {
    console.log(event.currentTarget.value);
    setFilter(event.currentTarget.value);
  };

  const onCheck = () => {
    if (filter) {
      return contacts.filter(el => el.name.includes(filter));
    } else {
      return contacts;
    }
  };

  const onDeleteContact = id => {
    const contactName = contacts.filter(el => el.id !== id);
    setContacts(contactName);
  };

  const filteredContacts = onCheck();

  return (
    <div
      style={{
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
        padding: 50,
      }}
    >
      <h1>Phonebook</h1>
      <Form onSubmit={formSubmitHandler} />
      <Filter filter={filter} onChange={onFilter} />
      <h2>Contacts</h2>
      <Contacts contacts={filteredContacts} deleteContact={onDeleteContact} />
    </div>
  );
};

export default App;

App.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  filter: PropTypes.string,
};

import { Component } from 'react';
import Form from './Form';
import Contacts from './Contacts';
import Filter from './Filter';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

class App extends Component {
  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.string,
    filter: PropTypes.string,
  };

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    const newName = this.state.contacts.map(el => el.name.toLowerCase());
    if (newName.includes(data.name.toLowerCase())) {
      return alert(`${data.name} is already in contacts`);
    }
    const input = { id: nanoid(3), name: data.name, number: data.number };
    this.setState({ contacts: [...this.state.contacts, input] });
  };

  onFilter = event => {
    const { value } = event.currentTarget;
    this.setState({
      filter: value,
    });
  };

  onCheck = () => {
    const { filter, contacts } = this.state;

    if (filter) {
      return contacts.filter(el =>
        el.name.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      return contacts;
    }
  };

  onDeleteContact = id => {
    const contactName = this.state.contacts.filter(el => el.id !== id);
    this.setState({
      contacts: contactName,
    });
  };

  render() {
    const filteredContacts = this.onCheck();
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
        <Form onSubmit={this.formSubmitHandler} />
        <Filter state={this.state} onChange={this.onFilter} />
        <h2>Contacts</h2>
        <Contacts
          contacts={filteredContacts}
          deleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}

export default App;

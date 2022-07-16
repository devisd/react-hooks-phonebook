import propTypes from 'prop-types';

const Contacts = ({ contacts, deleteContact }) => {
  const contactList = contacts;
  const component = contactList.map(el => {
    return (
      <li key={el.id}>
        <p>
          {el.name}: {el.number}
        </p>
        <button
          type="button"
          onClick={() => {
            deleteContact(el.id);
          }}
        >
          Delete
        </button>
      </li>
    );
  });

  return (
    <div>
      <ul>
        {contactList.length >= 1 ? (
          component
        ) : (
          <li>
            <p>Нет сохраненных контактов</p>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Contacts;

Contacts.propTypes = {
  contacts: propTypes.array,
  deleteContact: propTypes.func,
};

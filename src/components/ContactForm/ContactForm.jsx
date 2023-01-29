import { Form, Input, AddBtnContact } from './ContactForm.styled';
import { useState } from 'react';

export const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(name, number);
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    const { value, name } = e.currentTarget;
    console.log(name);

    if (name === 'name') {
      setName(value);
    } else {
      setNumber(value);
    }
  };

  return (
    <Form autoComplete="off" onSubmit={handleSubmit}>
      <label>
        <div>
          Name <span>*</span>
        </div>

        <Input
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={handleChange}
        />
      </label>
      <label>
        <div>
          Phone <span>*</span>
        </div>
        <div>
          <Input
            type="tel"
            name="number"
            value={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleChange}
          />
        </div>
      </label>
      <AddBtnContact type="submit">Add contact</AddBtnContact>
    </Form>
  );
};

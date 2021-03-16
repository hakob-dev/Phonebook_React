import React, { useState } from 'react';
import Contact from './Contact';
import { addGroup } from './Groups';
import baseAxios from '../axios';
import "./Contacts.css";
import CSVReader from 'react-csv-reader';

function Contacts({ contacts, getData, unSelectContact, selectContact, setSearchQuery, DeleteContacts, queryData }) {
  const [error, setError ] = useState('');

  let searchQuery = {
    ...queryData
  }
  return (
    <div className="contacts">
      <h3>Contacts</h3>
      <label>upload CSV</label>
      <CSVReader onFileLoaded={async (data, fileInfo) => {
        try {
          await createContacts(data);
          setTimeout( () => getData(), 1000 );
          setError('')
        } catch (e) {
          setError(e.message)
        }
      }} />
      {error ? <p className="error">{error}</p> : null}
      <div className="search">
        <p>Search:</p>
        <input type="text" placeholder="First name" onChange={(e) => { searchQuery.first_name = e.target.value; setSearchQuery(searchQuery); }} />
        <input type="text" placeholder="Last name" onChange={(e) => { searchQuery.last_name = e.target.value; setSearchQuery(searchQuery) }} />
        <input type="text" placeholder="Phone number" onChange={(e) => { searchQuery.phone_number = e.target.value; setSearchQuery(searchQuery) }} />
      </div>
      <p>double click on contact to change</p>
      <button onClick={async () => { 
        await DeleteContacts(); 
        await getData(); 
      }}>Remove all selected</button>
      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Phone Number</th>
        </tr>
        {contacts.map(contact => (<Contact first_name={contact.first_name}
          last_name={contact.last_name}
          phone_number={contact.phone_number}
          id={contact.id}
          selectContact={selectContact}
          unSelectContact={unSelectContact}
          getData={getData}
          key={contact.id}
        />))}
      </table>
    </div>
  );
}

async function createContacts(data) {
  let filtered_data = data.filter((el, i) => el.length === 4 && i > 0)
  const isValid = isValidData(filtered_data);
  if (isValid) {
    let mapped_data = filtered_data.map(el => {
      return {
        first_name: el[0],
        last_name: el[1],
        phone_number: el[2],
        groups: el[3].split('|')
      }
    })
    let groups_dict = {}
    mapped_data.forEach(el => el.groups.forEach(gr => {if(gr) groups_dict[gr] = true; }))
    await Promise.all(
      Object.keys(groups_dict).map(group_name => {
        return addGroup(group_name)
      })
    )
    try {
      await baseAxios.post('/contact', {
        contacts: mapped_data
      });
    } catch (e) {
      console.log(e)
    }
  } else {
    throw new Error('error in csv, dublicate phone numbers, or same contact in the same group more than once')
  }

}

function isValidData(data) {
  const hasDublicateContactInGroup = data.some(el => { 
    let groups = el[3].split('|');
    return hasDublicates(groups)
  })
  const phone_numbers = data.map(el => el[2])
  let dict = {};
  phone_numbers.forEach(num => dict[num] ? dict[num]++ : dict[num] = 1);
  if (Object.values(dict).some(el => el > 1)) return false;
  if(hasDublicateContactInGroup) return false;
  return true;
}

function hasDublicates(array) {
  return new Set(array).size !== array.length
}

export default Contacts;
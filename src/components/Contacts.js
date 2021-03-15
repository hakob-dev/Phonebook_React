import React from 'react';
import Contact from './Contact';
import "./Contacts.css";
import baseAxios from '../axios';

function Contacts({ contacts, getData, selected_contacts_ids, unSelectContact, selectContact, setSearchQuery}) {
  let searchQuery = {
    first_name: '',
    last_name: '',
    phone_number: '',
  }
  return (
    <div className="contacts">
      <div className="search">
          <p>Search:</p>
          <input type="text" placeholder="First name" onChange={(e)=> { searchQuery.first_name = e.target.value; setSearchQuery(searchQuery);}}/>
          <input type="text" placeholder="Last name" onChange={(e)=> {searchQuery.last_name = e.target.value; setSearchQuery(searchQuery)}}/>
          <input type="text" placeholder="Phone number" onChange={(e)=> {searchQuery.phone_number = e.target.value; setSearchQuery(searchQuery)}}/>
      </div>
      <button onClick={async ()=>{ await DeleteContacts(selected_contacts_ids); await getData();}}>Remove all selected</button>
      <table>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Phone Number</th>
      </tr>
        {contacts.map( contact => (<Contact first_name={contact.first_name} 
                                            last_name={contact.last_name} 
                                            phone_number={contact.phone_number}
                                            id={contact.id}
                                            selectContact={selectContact}
                                            unSelectContact={unSelectContact}
                                            getData={getData}
                                            />))}
      </table>
    </div>
  );
}

async function DeleteContacts(ids){
  await baseAxios.delete('/contact', {
    data: {ids}
  })
}

export default Contacts;
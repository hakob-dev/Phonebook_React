import React, {useState, useEffect} from 'react';
import Contacts from './components/Contacts';
import Groups from './components/Groups';
import './App.css';
import baseAxios from './axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
  });
  let selected_contacts_ids = [];

  useEffect(async ()=>{
    getData();
  },[searchQuery])

  const selectContact = (id)=> selected_contacts_ids.push(id);
  const unSelectContact = (id)=> selected_contacts_ids = selected_contacts_ids.filter(_id => _id !== id);

  async function getGroups(){
    const groups = (await baseAxios.get('/group')).data.data.groups;
    setGroups(groups);
  }

  async function getContacts(){
    let contacts;
    if(Object.values(searchQuery).some(val=>!!val)){
      contacts = (await baseAxios.get('/contact/search', {
        params:{
          ...searchQuery
        }
      })).data.data.contacts;
    }else contacts = (await baseAxios.get('/contact')).data.data.contacts;
    console.log(contacts)
    setContacts(contacts);
  }

  async function getData(){
    getContacts();
    getGroups();
  }

  return (
    <div className="App">
      <Contacts contacts={contacts} getData={getData} 
                selected_contacts_ids={selected_contacts_ids} selectContact={selectContact} unSelectContact={unSelectContact} setSearchQuery={setSearchQuery}/>
      <Groups groups={groups} getData={getData}/>
    </div>
  );
}

export default App;

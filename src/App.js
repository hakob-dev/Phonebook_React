import React, {useState, useEffect} from 'react';
import Contacts from './components/Contacts';
import Groups from './components/Groups';
import './App.css';
import baseAxios from './axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [groups, setGroups] = useState([]);
  const [f_name, setF_name] = useState('');
  const [l_name, setL_name] = useState('');
  const [phone_number, setPhone_number] = useState('');
  let selected_contacts_ids = [];

  function setSearchQuery({ first_name, last_name, phone_number}){
    setF_name(first_name);
    setL_name(last_name);
    setPhone_number(phone_number);
  }

  useEffect(async ()=>{
    getData();
  },[f_name, l_name, phone_number])

  const selectContact = (id)=> selected_contacts_ids.push(id);
  const unSelectContact = (id)=> selected_contacts_ids = selected_contacts_ids.filter(_id => _id !== id);

  async function DeleteContacts(){
    await baseAxios.delete('/contact', {
      data: {ids: selected_contacts_ids}
    })
  }

  async function getGroups(){
    const groups = (await baseAxios.get('/group')).data.data.groups;
    setGroups(groups);
  }

  async function getContacts(){
    let contacts;
    if([f_name, l_name, phone_number].some(val=>!!val)){
      contacts = (await baseAxios.get('/contact/search', {
        params:{
          ...(f_name ? {first_name: f_name} : {}),
          ...(l_name ? {last_name: l_name} : {}),
          ...(phone_number ? {phone_number: phone_number} : {}),
        }
      })).data.data.contacts;
    }else contacts = (await baseAxios.get('/contact')).data.data.contacts;
    setContacts(contacts);
  }

  async function getData(){
    getContacts();
    getGroups();
  }

  return (
    <div className="App">
      <Contacts contacts={contacts} getData={getData} 
                DeleteContacts={DeleteContacts} selectContact={selectContact} unSelectContact={unSelectContact} 
                setSearchQuery={setSearchQuery} queryData={{phone_number, first_name: f_name, last_name: l_name}}/>
      <Groups groups={groups} getData={getData} contacts={contacts}/>
    </div>
  );
}

export default App;

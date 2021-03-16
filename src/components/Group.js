import React,{useState} from 'react';
import baseAxios from '../axios';

function Group(props) {
   let [selected_contact_id, SetSelected_contact_id ]= useState(-1);
   return (
      <div className="group">
         name: {props.name}
         {/* <Contacts contacts={props.contacts} /> */}
         <table>
            <tr>
               <th>First name</th>
               <th>Last name</th>
               <th>Phone Number</th>
               <th><button className="groupDeleteBtn" onClick={async () => {
                  await deleteGroup(props.id);
                  props.getData();
               }}>X</button></th>
            </tr>
            {props.groupContacts.map(contact => {
               return (
                  <tr key={contact.id}>
                     <th>{contact.first_name}</th>
                     <th>{contact.last_name}</th>
                     <th>{contact.phone_number}</th>
                     <th><button onClick={async () => {
                        await deleteGroupContact(contact.id, props.id)
                        props.getData();
                     }}>X</button></th>
                  </tr>
               )
            })}
         </table>
         <select id="contacts" name="contacts" value={selected_contact_id} onChange={(e) => SetSelected_contact_id(e.target.value)}>
            <option value={-1} >Choose contact</option>
            {getAvailableContacts(props.contacts, props.groupContacts).map(contact => {
               return (
                  <option value={contact.id} key={contact.id}>{contact.first_name} {contact.last_name}: {contact.phone_number}</option>
               )
            })}
         </select>
         <button onClick={async ()=> {
            if(selected_contact_id !== -1) {
               await addGroupContact(selected_contact_id, props.id);
               props.getData();
            }
         }}>Add Contact</button>
      </div>
   );
}

async function deleteGroupContact(contact_id, group_id) {
   try {
      await baseAxios.delete('/group/contact', {
         data: {
            contact_id,
            group_id
         }
      });
   } catch (e) {
      console.log(e)
   }

}

async function addGroupContact(contact_id, group_id) {
   try {
      await baseAxios.post('/group/contact', {
            contact_id,
            group_id
      });
   } catch (e) {
      console.log(e)
   }

}

async function deleteGroup(group_id) {
   try {
      await baseAxios.delete('/group', {
         data: {
            ids: [group_id]
         }
      });
   } catch (e) {
      console.log(e)
   }

}

function getAvailableContacts(allContacts, groupContacts) {
   return allContacts.filter(contact => !groupContacts.some(ct => ct.id === contact.id))
}

export default Group;
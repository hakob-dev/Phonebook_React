import React from 'react';

function Group(props) {
  return (
     <div className="group">
        name: {props.name}
        {/* <Contacts contacts={props.contacts} /> */}
        <table>
            <tr>
               <th>First name</th>
               <th>Last name</th>
               <th>Phone Number</th>
            </tr>
            {props.contacts.map( contact => {
               return (
                  <tr>
                     <th>{contact.first_name}</th>
                     <th>{contact.last_name}</th>
                     <th>{contact.phone_number}</th>
                  </tr>
               )
            })}
        </table>
     </div>
  );
}


export default Group;
import React from 'react';
import Group from './Group';
import "./Groups.css";

function Groups({groups}) {
  // setInterval(()=>console.log(selected_contacts_ids), 100)

  return (
    <div className="groups">
      {groups.map( group => <Group name={group.name} contacts={group.contact}/>)}
    </div>
  );
}

export default Groups;
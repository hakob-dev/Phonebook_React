import React, {useState} from 'react';
import Group from './Group';
import "./Groups.css";
import baseAxios from '../axios';

function Groups({groups, getData, contacts}) {
  const [groupName, setGroupName] = useState('')
  const [error, setError] = useState('')

  return (
    <div className="groups">
        <h3>Groups</h3>
        <input type="text" placeholder="group name" value={groupName} onChange={(e)=>setGroupName(e.target.value)}/>
        <button onClick={async () => {
          try{
            await addGroup(groupName);
            setGroupName('');
            getData();
            setError('');
          }catch(e){
            setError(`Group already exists`)
          }
        }}>Add group</button><br /><br />
        <p className="error">{error ? error : null}</p>
      {groups.map( group => <Group name={group.name} groupContacts={group.contact} contacts={contacts} 
                                        key={group.id} id={group.id} getData={getData}/>)}
    </div>
  );
}

export async function addGroup(name){
  try{
    await baseAxios.post('/group',{
      name,
    });
  }catch(e){
    console.log(e)
  }

}

export default Groups;
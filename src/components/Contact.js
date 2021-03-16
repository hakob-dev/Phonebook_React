import React, {useState} from 'react';
import baseAxios from '../axios';

function Contact(props) {
  const [isEdit, setIsEdit] = useState(null);
  const [first_name, setFirst_name] = useState(props.first_name);
  const [last_name, setIsLast_name] = useState(props.last_name);
  const [phone_number, setPhone_number] = useState(props.phone_number);

  return (
      <tr onDoubleClick={()=>{ isEdit === null && setIsEdit(true)}}>
        {props.token}
        <th>{ isEdit ? <input type="text" value={first_name} onChange={(e)=>setFirst_name(e.target.value)}/> : first_name}</th>
        <th>{ isEdit ? <input type="text" value={last_name} onChange={(e)=>setIsLast_name(e.target.value)}/> : last_name}</th>
        <th>{ isEdit ? <input type="text" value={phone_number} onChange={(e)=>setPhone_number(e.target.value)}/> : phone_number}</th>
        { !isEdit ? <th><input type="checkbox" onChange={(e)=> e.target.checked ? props.selectContact(props.id) : props.unSelectContact(props.id)}/></th> : null }
        
        { isEdit ? <th><button onClick={async () => {
              await updateContact(props.id, {first_name,last_name,phone_number }); 
              setIsEdit(null); 
              props.getData();
          }}>save</button></th> : null}
        { isEdit ? <th><button onClick={() => {
              setIsEdit(null);
              setIsLast_name(props.last_name); 
              setFirst_name(props.first_name); 
              setPhone_number(props.phone_number);
            }}>cancel</button></th> : null}
     </tr>
  );
}


async function updateContact(id, data){
  await baseAxios.patch('/contact', {
    id,
    data,
  })
}

export default Contact;
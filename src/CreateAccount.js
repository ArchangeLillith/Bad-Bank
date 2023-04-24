import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import axios from "axios";
import {
    Card,
    Accordion,
    Button,
    Container,
    Row,
    Col,
    Image,
    list,
    ListGroupItem,
    Input
  } from "react-bootstrap";
  import { ReactDOM } from "react";
  import { UserContext } from "./context";

export function CreateAccount(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);  

  function validate(field, label){
    let isValid = true;
    if (!field) {
        setStatus('Error: Please examine the ' + label + ' field.');
        setTimeout(() => setStatus(''),3000);
        return false;
    }
    if (label === 'email') {
      isValid = String(field)
      .toLowerCase()
      .match(/\S+@\S+\.\S+/)
      setStatus(isValid ? '' : "Email is invalid, please use email format.")
    }
    if (label === 'password') {
      isValid = field.length >= 6;
      setStatus(isValid ? '' : "Password is too short, please choose another");
    }
    if (!isValid) {
      return false;
    } else return true;
  }

  function handleCreate(){
    if (!validate(name,     'name'))     return;
    if (!validate(email,    'email'))    return;
    if (!validate(password, 'password')) return;
    ctx.users.push({name,email,password,balance: 0});
    setShow(false);
  }    

  function clearForm(){
    setName('');
    setEmail('');
    setPassword('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="dark"
      header="Create Account"
      status={status}
      body={show ? (  
              <>
              Name<br/>
              <input type="input" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
              Email address<br/>
              <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
              Password<br/>
              <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
              <button type="submit" className="btn btn-secondary" onClick={handleCreate}>Create Account</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-secondary" onClick={clearForm}>Add another account</button>
              </>
            )}
    />
  )
}
export default CreateAccount;
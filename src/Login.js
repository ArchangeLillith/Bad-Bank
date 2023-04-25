import React from "react";
import { Card } from "react-bootstrap";
import { UserContext } from "./context";

export function Login() {
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [name, setName]         = React.useState('');
  const [password, setPassword] = React.useState('');
  const ctx = React.useContext(UserContext);
  
  function validateUserCrid(field, label) {
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''), 2000);
      return false;
    }
    return true;
  }

  function handleLogin() {
    if (!validateUserCrid(email, 'email')) return;
    if (!validateUserCrid(password, 'password')) return;
    const user = ctx.users.find((user) => user.email === email);
    if (!user) {
      setStatus('Invalid User');
      setTimeout(() => setStatus(''), 2000);
      return;
    }
    if (user.password == password) {
      setShow(false);
      ctx.loggedIn.push({ user });
      return;
    } else {
      setStatus('Invalid Password')
      setTimeout(() => setStatus(''), 2000);
    }
  }
  
  function clearForm() {
    setName('');
    setEmail('');
    setPassword('');
    setShow('true');
  }
  
  return (
    <Card
    bgcolor="dark"
    header="Log In"
    status={status}
    body={show ? (
      <>
          Email address<br />
          <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br />
          Password<br />
          <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br />
          <button type="submit" className="btn btn-secondary" onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <h5>Success</h5>
          <button type="submit" className="btn btn-light" onClick={clearForm}>Login</button>
        </>
      )}
      />
      );
    }
export default Login;
import React from "react";
import { Card } from "react-bootstrap";
import { UserContext } from "./context";

export function AllData(){
  const ctx = React.useContext(UserContext);
  const usersData = ctx.users;

  function createCard(user) {
    const { name, email, password, balance } = user
    let emailKey = {email} + 'email';

    return (
      <Card
        key = {emailKey}
        header="User Data"
        bgcolor="dark"
        body={
          <>
            <p className="card-text">Name: {name}</p>
            <p className="card-text">Email: {email}</p>
            <p className="card-text">Password: {password}</p>
            <p className="card-text">Balance: ${balance}</p>
          </>
        }
      />
      );
  }
  

  const cards = usersData.map(createCard);

  return (
    <div>
      {cards}
    </div>
  );
}
export default AllData;

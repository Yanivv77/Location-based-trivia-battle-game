import React, { useState, useEffect, useRef } from "react";

import { v4 as uuid } from "uuid";

const OnlineUsers = () => {
  const [users, setUsers] = useState([]);

  const userId = useRef();

  useEffect(() => {
    userId.current = uuid();
  }, []);

  return (
    <>
      <div>Users online</div>
      <ul>
        {users.length > 0 &&
          users.map((user) => <li key={user.id}>{user.id}</li>)}
      </ul>
    </>
  );
};

export default OnlineUsers;

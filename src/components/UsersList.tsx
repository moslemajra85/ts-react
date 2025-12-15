import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
  website?: string;
  company?: {
    name: string;
  };
}

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="users-container">
      <header className="users-header">
        <p className="eyebrow">User directory</p>
        <h1>Professional profiles</h1>
        <p className="subtitle">
          Clean, card-first layout powered by JSONPlaceholder data.
        </p>
      </header>
      <div className="users-grid">
        {users.map((user) => {
          return <UserCard key={user.id} {...user} />;
        })}
      </div>
    </section>
  );
};

export default UsersList;

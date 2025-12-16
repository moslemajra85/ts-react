import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { ClipLoader } from "react-spinners";
import ErrorMessage from "./ErrorMessage";
import type { User } from "../services/usersService";
import userService from "../services/usersService";


const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUser()
      setUsers(response.data);
    } catch (error) {
      setError("Something Went Wrong While Fetching Users!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <ClipLoader color="blue" />;
  }

  if (error) {
    return <div className="error-container">
      <ErrorMessage>{error}</ErrorMessage>
    </div>;
  }

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
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </section>
  );
};

export default UsersList;

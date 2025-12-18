import { useEffect, useState, type ChangeEvent } from "react";
import UserCard from "./UserCard";
import { ClipLoader } from "react-spinners";
import ErrorMessage from "./ErrorMessage";
import type { User } from "../services/usersService";
import userService from "../services/usersService";
import { AxiosError } from "axios";

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUser();
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
  
  const createUser = async (user: User) => {
    try {
      // update the Ui first
      setUsers([user, ...users]);

      // update The server

      const result = await userService.addUser({ name: userName });

      console.log(result);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.message);
      } else {
        setError("Something Went Wrong!");
      }
    }
  };
  const deleteUser = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  if (loading) {
    return <ClipLoader color="blue" />;
  }

  if (error) {
    return (
      <div className="error-container">
        <ErrorMessage>{error}</ErrorMessage>
      </div>
    );
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

      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            createUser({ id: 0, name: userName });

            setUserName("");
          }}
          className="add-user-form"
        >
          <input
            value={userName}
            onChange={handleChange}
            type="text"
            placeholder="Enter user name"
            className="add-user-input"
          />
          <button className="add-user-button">➕ Add User</button>
        </form>
      </div>
      <div className="users-grid">
        {users.map((user) => {
          return (
            <UserCard
              rollBack={setUsers}
              originalUsers={users}
              onDelete={deleteUser}
              key={user.id}
              user={user}
            />
          );
        })}
      </div>
    </section>
  );
};

export default UsersList;

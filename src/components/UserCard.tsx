import { formatWebsite, getInitials } from "../utils/helper";
import type { User } from "./UsersList";
import userService from "../services/usersService";

interface UserShape {
  user: User;
}

const UserCard = ({ user }: UserShape) => {
  const website = formatWebsite(user.website);

  const handleDelete = (id: number) => {
    userService.deleteUser(id);
  };
  return (
    <article className="user-card" aria-label={`User ${user.name}`}>
      <button
        onClick={() => handleDelete(user.id)}
        className="delete-btn"
        type="button"
      >
        Delete
      </button>
      <div className="card-header">
        <div className="avatar" aria-hidden="true">
          {getInitials(user.name)}
        </div>
        <div className="user-info">
          <h3 className="name">{user.name}</h3>
          <p className="username">@{user.username}</p>
        </div>
      </div>
      <div className="card-body">
        <div className="info-row">
          <span className="label">Email</span>
          <a className="email" href={`mailto:${user.email}`}>
            {user.email}
          </a>
        </div>
        <div className="info-row">
          <span className="label">Website</span>
          {website ? (
            <a
              className="website"
              href={`https://${website}`}
              target="_blank"
              rel="noreferrer"
            >
              {user.website}
            </a>
          ) : (
            <span className="muted-value">No site listed</span>
          )}
        </div>
        <div className="info-row">
          <span className="label">Company</span>
          <span className="value">{user.company?.name ?? "Independent"}</span>
        </div>
        <div className="chip-row" aria-hidden="true">
          <span className="chip">ID {user.id}</span>
          <span className="chip alt">@{user.username}</span>
        </div>
      </div>
    </article>
  );
};

export default UserCard;

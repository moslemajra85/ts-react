import { formatWebsite, getInitials } from "../utils/helper";

type UserShape = {
  id: number;
  name?: string;
  username?: string;
  email?: string;
  website?: string;
  company?: {
    name?: string;
  };
};

type Props = UserShape | { user: UserShape };

const UserCard = (props: Props) => {
  // Normalize props so component accepts either:
  // <UserCard {...user} />  OR  <UserCard user={user} />
  const user: UserShape = "user" in props ? props.user : (props as UserShape);
  const { id, name = "", username = "", email = "", website, company } = user;
  const mywebsite = formatWebsite(website);

  return (
    <article className="user-card" aria-label={`User ${name}`}>
      <button className="delete-btn" type="button">
        Delete
      </button>
      <div className="card-header">
        <div className="avatar" aria-hidden="true">
          {getInitials(name)}
        </div>
        <div className="user-info">
          <h3 className="name">{name}</h3>
          <p className="username">@{username}</p>
        </div>
      </div>
      <div className="card-body">
        <div className="info-row">
          <span className="label">Email</span>
          <a className="email" href={`mailto:${email}`}>
            {email}
          </a>
        </div>
        <div className="info-row">
          <span className="label">Website</span>
          {mywebsite ? (
            <a
              className="website"
              href={`https://${website}`}
              target="_blank"
              rel="noreferrer"
            >
              {website}
            </a>
          ) : (
            <span className="muted-value">No site listed</span>
          )}
        </div>
        <div className="info-row">
          <span className="label">Company</span>
          <span className="value">{company?.name ?? "Independent"}</span>
        </div>
        <div className="chip-row" aria-hidden="true">
          <span className="chip">ID {id}</span>
          <span className="chip alt">@{username}</span>
        </div>
      </div>
    </article>
  );
};

export default UserCard;

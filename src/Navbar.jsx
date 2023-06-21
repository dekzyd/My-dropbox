const Navbar = ({ user, signOut }) => {
  const { username } = user;

  return (
    <nav className="navbar navbar-dark bg-primary">
      <a className="navbar-brand">My Dropbox App</a>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <p
          style={{
            color: "white",
            fontSize: "1.5rem",
            marginTop: "0.7rem",
            textTransform: "capitalize",
          }}
        >
          Hi, {username}
        </p>
        <button className="btn btn-dark" type="button" onClick={signOut}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

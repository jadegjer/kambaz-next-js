import { Button } from "react-bootstrap";

export default function Profile() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div style={{ width: "500px" }}>
        <h1 className="mb-4">Profile</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            defaultValue="alice"
            placeholder="username"
            id="wd-username"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            defaultValue="123"
            placeholder="password"
            id="wd-password"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            defaultValue="Alice"
            placeholder="First Name"
            id="wd-firstname"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            defaultValue="Wonderland"
            placeholder="Last Name"
            id="wd-lastname"
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            defaultValue="2000-01-01"
            id="wd-dob"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            defaultValue="alice@wonderland.com"
            placeholder="email"
            id="wd-email"
          />
        </div>
        <div className="mb-3">
          <select className="form-select" id="wd-role" defaultValue="USER">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
        <Button variant="danger" className="w-100" id="wd-signout-btn">
          Signout
        </Button>
      </div>
    </div>
  );
}
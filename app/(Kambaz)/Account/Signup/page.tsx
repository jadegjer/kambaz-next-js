import Link from "next/link";
import { Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div style={{ width: "400px" }}>
        <h1 className="mb-4">Signup</h1>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="username"
            id="wd-username"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="password"
            id="wd-password"
          />
        </div>
        <Button variant="primary" className="w-100 mb-2" id="wd-signup-btn">
          Signup
        </Button>
        <Link
          href="/Account/Signin"
          className="d-block text-center"
          id="wd-signin-link"
        >
          Signin
        </Link>
      </div>
    </div>
  );
}
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  
  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed");
    }
  };
  
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div style={{ width: "400px" }}>
        <h1 className="mb-4">Signup</h1>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <FormControl
          value={user.username || ""}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="mb-3"
          placeholder="username"
          id="wd-username"
        />
        <FormControl
          value={user.password || ""}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="mb-3"
          placeholder="password"
          type="password"
          id="wd-password"
        />
        <Button 
          onClick={signup}
          variant="primary" 
          className="w-100 mb-2" 
          id="wd-signup-btn"
        >
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
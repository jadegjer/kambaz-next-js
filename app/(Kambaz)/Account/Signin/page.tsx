"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  
  const signin = async () => {
    try {
      console.log("Attempting signin with:", credentials);
      const user = await client.signin(credentials);
      console.log("Signin successful, user:", user);
      if (!user) {
        setError("Login failed");
        return;
      }
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (err: any) {
      console.error("Signin error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div style={{ width: "400px" }}>
        <h1 className="mb-4">Signin</h1>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <FormControl 
          value={credentials.username || ""}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="mb-3" 
          placeholder="username" 
          id="wd-username" 
        />
        <FormControl 
          value={credentials.password || ""}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="mb-3" 
          placeholder="password" 
          type="password" 
          id="wd-password" 
        />
        <Button 
          onClick={signin} 
          variant="primary" 
          className="w-100 mb-2" 
          id="wd-signin-btn"
        >
          Signin
        </Button>
        <Link
          href="/Account/Signup"
          className="d-block text-center"
          id="wd-signup-link"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}
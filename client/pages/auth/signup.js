import { useState } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: { email, password },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    doRequest();
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4 text-center">Sign Up</h2>
      <form
        onSubmit={onSubmit}
        className="p-4 border rounded shadow-sm bg-white"
      >
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            type="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Create a secure password"
          />
        </div>
        {errors}
        <button className="btn btn-primary w-100 mt-3">Sign Up</button>
      </form>
    </div>
  );
}

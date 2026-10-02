import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../utils/userService";
import { useUser } from "../../contexts/UserContext";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import "../LoginPage/LoginPage.css";

function SignupPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConf: "",
  });
  const [error, setError] = useState("");
  const { refreshUser } = useUser();
  const navigate = useNavigate();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (formData.password !== formData.passwordConf) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await userService.signup({
        email: formData.email,
        password: formData.password,
      });
      refreshUser();
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed.");
    }
  }

  return (
    <main className="page auth-page">
      <div className="auth-card">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="auth-form" autoComplete="off">
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Choose a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label htmlFor="passwordConf">Confirm password</label>
            <input
              id="passwordConf"
              type="password"
              name="passwordConf"
              placeholder="Type it again"
              value={formData.passwordConf}
              onChange={handleChange}
              required
            />
          </div>
          {error && <ErrorMessage message={error} />}
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}

export default SignupPage;
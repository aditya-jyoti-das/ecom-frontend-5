import React, { useState, useContext } from "react";
import axios from "../../src/axios"; // Use your custom Axios instance
import AppContext from "../Context/Context";
import Host from "./Host";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const { loginUser } = useContext(AppContext); // From updated AppContext
  const Navigate = useNavigate();
  // State for form toggle
  const [isLogin, setIsLogin] = useState(true);

  // State for form inputs
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  // Handle input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("on login");

    try {
      const response = await axios.post(`${Host}api/login`, loginData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: undefined,
        },
      });
      const { token } = response.data; // Assuming backend returns { token: "jwt-token" }
      loginUser(token); // Store token via context
      alert("Login successful!");
      Navigate("/loginRegister");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // Handle registration submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log("on register");
    try {
      const response = await axios.post(`${Host}api/register`, registerData, {
        headers: {
          "Content-Type": "application/json", // Explicitly set, though default already covers this
          Authorization: undefined,
        },
      });
      alert(response.data.message);
      Navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      Navigate("/loginRegister");
    }
  };

  return (
    <div className="container">
      <div className="center-container">
        <div className="login_register" style={{ padding: "20px" }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              backgroundColor: isLogin ? "rgb(13, 110, 253)" : "whitesmoke",
              borderRadius: "4px",
              color: isLogin ? "white" : "black",
              border: "none",
              padding: "4px",
            }}
          >
            LOG IN{" "}
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              backgroundColor: isLogin ? "whitesmoke" : "rgb(13, 110, 253)",
              borderRadius: "4px",
              color: isLogin ? "black" : "white",
              border: "none",
              padding: "4px",
            }}
          >
            REGISTER
          </button>
        </div>
        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label for="exampleUserName1">Username</label>
              <input
                type="text"
                className="form-control"
                id="exampleUserName1"
                aria-describedby="userNameHelp"
                placeholder="Enter UserName"
                onChange={handleLoginChange}
                value={loginData.username}
                name="username"
                required
              />
              <small id="userNameHelp" className="form-text text-muted">
                We'll never share your username with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                name="password"
                onChange={handleLoginChange}
                value={loginData.password}
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label for="exampleUserName1">Username</label>
              <input
                type="text"
                className="form-control"
                id="exampleUserName1"
                aria-describedby="userNameHelp"
                placeholder="Enter UserName"
                onChange={handleRegisterChange}
                value={registerData.username}
                name="username"
                required
              />
              <small id="userNameHelp" className="form-text text-muted">
                We'll never share your username with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={handleRegisterChange}
                value={registerData.password}
                name="password"
                required
              />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Check me out
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // FIXED: Added navigate to dependencies to prevent linting warnings
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>ChatApp</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  /* Matching the deep radial gradient from your body CSS */
  background: radial-gradient(circle at center, #131324 0%, #080420 100%);

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
      filter: drop-shadow(0 0 10px #00ffd155);
    }
    h1 {
      color: white;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    border: 1px solid #ffffff10;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

    @media screen and (max-width: 480px) {
      padding: 2rem;
      width: 90%;
    }
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #00ffd144; /* Soft cyan border */
    border-radius: 0.6rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    transition: 0.3s ease-in-out;

    &:focus {
      border: 0.1rem solid #00ffd1; /* Bright cyan on focus */
      outline: none;
      box-shadow: 0 0 10px #00ffd133;
    }

    &::placeholder {
      color: #94a3b8;
    }
  }

  button {
    background: linear-gradient(135deg, #00ffd1 0%, #44a0ff 100%);
    color: #080420;
    padding: 1rem 2rem;
    border: none;
    font-weight: 800;
    cursor: pointer;
    border-radius: 0.6rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.4s ease-in-out;
    box-shadow: 0 0 15px #00ffd122;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 25px #00ffd166;
      filter: brightness(1.1);
    }

    &:active {
      transform: translateY(0);
    }
  }

  span {
    color: #94a3b8;
    text-transform: uppercase;
    font-size: 0.8rem;
    text-align: center;
    letter-spacing: 1px;
    
    a {
      color: #00ffd1;
      text-decoration: none;
      font-weight: bold;
      margin-left: 5px;
      transition: 0.3s ease-in-out;

      &:hover {
        color: #44a0ff;
        text-shadow: 0 0 10px #44a0ff55;
      }
    }
  }
`;
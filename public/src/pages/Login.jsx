import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // FIXED: Added 'navigate' to the dependency array
  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Username and Password are required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
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
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>ChatApp</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
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
  /* Deep radial background for consistent atmosphere */
  background: radial-gradient(circle at center, #131324 0%, #080420 100%);

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
      filter: drop-shadow(0 0 8px #00ffd144);
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
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
    border: 1px solid #ffffff10;
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

    /* Responsive padding for smaller devices */
    @media screen and (max-width: 480px) {
      padding: 3rem 2rem;
      width: 90%;
    }
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #00ffd144;
    border-radius: 0.5rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;

    &:focus {
      border: 0.1rem solid #00ffd1;
      outline: none;
      box-shadow: 0 0 12px #00ffd122;
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
    border-radius: 0.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.4s ease-in-out;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 20px #00ffd166;
      filter: brightness(1.1);
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  span {
    color: #94a3b8;
    text-transform: uppercase;
    font-size: 0.85rem;
    text-align: center;
    letter-spacing: 0.5px;

    a {
      color: #00ffd1;
      text-decoration: none;
      font-weight: bold;
      transition: 0.3s ease-in-out;

      &:hover {
        color: #44a0ff;
        text-shadow: 0 0 8px #44a0ff88;
      }
    }
  }
`;
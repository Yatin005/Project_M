import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const id = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    )._id;
    const data = await axios.get(`${logoutRoute}/${id}`);
    if (data.status === 200) {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.6rem;
  /* Glassmorphism background */
  background-color: #ffffff10; 
  border: 1px solid #ffffff15;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  svg {
    font-size: 1.3rem;
    /* Primary Cyan theme color */
    color: #00ffd1; 
    transition: 0.3s ease-in-out;
  }

  &:hover {
    background-color: #ff4d4d22; /* Subtle red glow on hover */
    border: 1px solid #ff4d4d88;
    box-shadow: 0 0 15px #ff4d4d44;
    
    svg {
      color: #ff4d4d; /* Power icon turns red on hover */
      transform: scale(1.1);
    }
  }

  &:active {
    transform: scale(0.95);
  }
`;
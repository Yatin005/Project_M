import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const storageKey = process.env.REACT_APP_LOCALHOST_KEY;
      const data = await JSON.parse(localStorage.getItem(storageKey));
      if (data) {
        setUserName(data.username);
      }
    };
    fetchUser();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e2e8f0; /* Soft off-white */
  flex-direction: column;
  text-align: center;

  img {
    height: 20rem;
    /* Cyan glow effect */
    filter: drop-shadow(0 0 25px rgba(0, 255, 209, 0.3));
    animation: float 4s ease-in-out infinite;
  }

  h1 {
    font-size: 2.5rem;
    margin-top: 1.5rem;
    span {
      color: #00ffd1; /* Bright Cyan color change */
      text-transform: capitalize;
      text-shadow: 0 0 10px rgba(0, 255, 209, 0.5);
    }
  }

  h3 {
    font-weight: 300;
    color: #94a3b8; /* Slate gray for secondary text */
    margin-top: 0.5rem;
    letter-spacing: 0.5px;
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }

  @media screen and (max-width: 720px) {
    img {
      height: 15rem;
    }
    h1 {
      font-size: 1.8rem;
    }
  }
`;
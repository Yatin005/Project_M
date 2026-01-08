import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added for Blog navigation
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(undefined);

  // 1. Fetch Current User safely from localStorage on mount
  useEffect(() => {
    const fetchUser = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      if (data) {
        setCurrentUser(data);
      }
    };
    fetchUser();
  }, []);

  // 2. Fetch Messages when currentChat or currentUser changes
  useEffect(() => {
    const fetchMessages = async () => {
      // GUARD: Only call API if both users are defined
      if (currentChat && currentUser) {
        const response = await axios.post(recieveMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };
    fetchMessages();
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    // GUARD: Prevent crash if data hasn't loaded yet
    if (!currentUser || !currentChat) return;

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });

    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // RENDER GUARD: If user is not loaded yet, show a loader to prevent _id errors
  if (!currentUser) {
    return (
      <Container>
        <div className="loading">
          <h2 style={{ color: "white" }}>Loading...</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <div className="header-buttons">
          {/* BLOG BUTTON: Only shows if you are the admin */}
          {currentUser.isAdmin && (
            <button className="blog-btn" onClick={() => navigate("/add-blog")}>
              Add Blog
            </button>
          )}
          <Logout />
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  background-color: #080420; /* Deep dark background */
  
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #00ffd1;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: #00000076; /* Transparent header */
    backdrop-filter: blur(5px);
    border-bottom: 1px solid #ffffff10;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
          filter: drop-shadow(0 0 5px #00ffd155);
        }
      }
      .username {
        h3 {
          color: white;
          font-weight: 500;
          letter-spacing: 1px;
        }
      }
    }

    .header-buttons {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .blog-btn {
        background: linear-gradient(135deg, #00ffd1 0%, #44a0ff 100%);
        color: #080420;
        border: none;
        padding: 0.6rem 1.2rem;
        border-radius: 2rem;
        cursor: pointer;
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        box-shadow: 0 0 15px #00ffd144;
        transition: 0.3s ease-in-out;
        &:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px #00ffd188;
        }
      }
    }
  }

  .chat-messages {
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    overflow: auto;
    background: radial-gradient(circle at center, #131324 0%, #080420 100%);

    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: #00ffd133;
        border-radius: 1rem;
      }
    }

    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 45%;
        overflow-wrap: break-word;
        padding: 1.1rem;
        font-size: 1rem;
        border-radius: 1.2rem;
        line-height: 1.4;
        backdrop-filter: blur(10px);
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }

    .sended {
      justify-content: flex-end;
      .content {
        background-color: #00ffd115; /* Subly tinted cyan */
        color: #e2e8f0;
        border: 1px solid #00ffd144;
        border-bottom-right-radius: 0.2rem; /* Message tail effect */
      }
    }

    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #ffffff10; /* Glass effect */
        color: #d1d1d1;
        border: 1px solid #ffffff15;
        border-bottom-left-radius: 0.2rem;
      }
    }
  }
`;
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.jpg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
  const fetchData = async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    if (data) {
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    }
  };
  fetchData();
}, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>snappy</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  border-right: 1px solid #ffffff10; /* Adds separation from chat area */

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
      filter: drop-shadow(0 0 5px #00ffd1);
    }
    h3 {
      color: white;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    padding-top: 0.8rem;
    
    &::-webkit-scrollbar {
      width: 0.3rem;
      &-thumb {
        background-color: #00ffd133;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff10; /* Glass effect */
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.8rem; /* Softer corners */
      padding: 0.6rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.3s ease-in-out;
      border: 1px solid transparent;

      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #e2e8f0;
          font-size: 1rem;
        }
      }

      &:hover {
        background-color: #ffffff15;
        border: 1px solid #00ffd144;
      }
    }

    .selected {
      background-color: #00ffd122;
      border: 1px solid #00ffd1;
      box-shadow: 0 0 15px #00ffd133;
      .username {
        h3 {
          color: white;
          text-shadow: 0 0 5px #00ffd188;
        }
      }
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    border-top: 1px solid #ffffff10;
    
    .avatar {
      img {
        height: 3.5rem;
        max-inline-size: 100%;
        border: 2px solid #00ffd144;
        border-radius: 50%;
        padding: 2px;
      }
    }
    .username {
      h2 {
        color: white;
        font-size: 1.2rem;
        letter-spacing: 0.5px;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
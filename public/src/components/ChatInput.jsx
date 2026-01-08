import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}
const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #00ffd1cc; /* Changed yellow to Cyan */
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #00ffd1;
        }
      }
      /* Improved Emoji Picker Styling */
      .EmojiPickerReact, .emoji-picker-react {
        position: absolute;
        top: -460px;
        background-color: #080420 !important;
        box-shadow: 0 5px 20px #00ffd144;
        border: 1px solid #00ffd188 !important;
        --epr-bg-color: #080420;
        --epr-category-label-bg-color: #080420;
        
        .epr-scrollbar::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #00ffd1;
          }
        }
        .epr-search {
          background-color: transparent !important;
          border: 1px solid #00ffd188 !important;
          color: white;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff10; /* Glassmorphism */
    border: 1px solid #ffffff15;
    
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1rem;

      &::selection {
        background-color: #00ffd144;
      }
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #94a3b8;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      /* Vibrant Gradient Button */
      background: linear-gradient(135deg, #00ffd1 0%, #44a0ff 100%);
      border: none;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 1.8rem;
        color: #080420; /* Dark icon on bright button */
      }
      &:hover {
        box-shadow: 0 0 15px #00ffd188;
        transform: scale(1.05);
      }
    }
  }
`;
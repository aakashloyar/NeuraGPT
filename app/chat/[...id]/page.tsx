"use client";
// import React from "react";
// import ReactDOM from "react-dom";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import { useMessageStore } from "@/store/messageStore";

export default function ChatComponent() {
  const { id } = useParams();
  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);
  useEffect(() => {
    if (!id) return;

    const fetchChat = async () => {
      try {
        setMessages([]);
        const res = await axios.get(`/api/chat/${id}`);
        setMessages(res.data.messages);
      } catch (error) {
        console.error("Error fetching chat:", error);
      }
    };

    fetchChat();
  }, [id]);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} className="p-4 border-b">
          <p className="font-bold">Q: {message.question}</p>
          <p>{message.answer}</p>
        </div>
      ))}
    </div>
  );
}

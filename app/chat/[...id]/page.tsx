"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMessageStore } from "@/store/messageStore";
import { useHistoryStore } from "@/store/historyStore"; // Import history store
import MarkdownViewer from "@/components/markdown";
import NotFound from "@/components/not-found";

export default function ChatComponent() {
  const { id } = useParams();
  const messages = useMessageStore((state) => state.messages);
  const setMessages = useMessageStore((state) => state.setMessages);
  const {clearHistory, addHistory } = useHistoryStore(); 
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const [bad, setBad] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;

    const fetchChat = async () => {
      try {
        setMessages([]);
        clearHistory();
        const res = await axios.get(`/api/chat/${id}`);
        if (res.status !== 200) {
          setBad(true);
          return;
        }
        setMessages(res.data.messages);
        res.data.messages.slice(-10).forEach((msg: { question: string; answer: string }) => {
          addHistory({ question: msg.question, answer: msg.answer });
        });
      } catch (error) {
        setBad(true);
        if (axios.isAxiosError(error) && error.response) {
          console.error("Error fetching chat:", error.response.data.error);
        }
      }
    };

    fetchChat();
  }, [id]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      {!bad ? (
        <div>
          {messages.map((message, index) => (
            <div
              key={message.id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className="p-4 border-b border-2 border-b-black px-8"
            >
              <div className="font-bold text-lg text-slate-700">#: {message.question}</div>
              <div className="pl-8 pt-4">
                <MarkdownViewer content={message.answer} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full w-full text-center">Status: 404 Chat Not Found</div>
      )}
    </div>
  );
}

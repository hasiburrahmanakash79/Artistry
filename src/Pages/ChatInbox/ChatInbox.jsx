import  { useState, useRef, useEffect } from "react";
import { PlusIcon, SendIcon } from "lucide-react";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your assistant. Ask me anything." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  /* Auto resize textarea */
  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [input]);

  /* Scroll to bottom */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* Send message */
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Simulate assistant response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: `Simulated AI reply: "${userMessage}"`,
        },
      ]);
      setIsLoading(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-base-200 rounded-lg shadow-lg">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="bg-base-100 px-4 py-2 rounded-2xl shadow max-w-xs whitespace-pre-wrap">
              {msg.content}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce delay-150" />
            <span className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce delay-300" />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="border-t border-base-300 p-3 flex items-center gap-3 bg-base-100 rounded-b-lg"
      >
        <button
          type="button"
          className="btn btn-primary btn-circle btn-sm"
        >
          <PlusIcon className="w-4 h-4" />
        </button>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Type a message..."
          className="flex-1 resize-none bg-transparent outline-none text-sm max-h-32"
        />

        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="btn btn-primary btn-circle btn-sm"
        >
          <SendIcon className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ChatBox;

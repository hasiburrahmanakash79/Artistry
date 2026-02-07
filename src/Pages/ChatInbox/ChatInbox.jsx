import { useState, useRef, useEffect } from "react";
import logo from "../../assets/logo/logo.png";
import { Edit, PlusIcon, SendIcon } from "lucide-react";
import { Logout, Panel } from "../../assets/icons/icons";

const ChatInbox = () => {
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState("light");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "@mention system in flutter",
      messages: [
        { role: "user", content: "Hey, who are you and how can you help me?" },
        {
          role: "assistant",
          content:
            "Hey, Gopika\nI am your personal, Artistry coach, and here is the list of things I can do for you\n- answer question related to arts.\n- generate image related to arts.\n- have normal conversations about other things too.",
        },
      ],
    },
    { id: 2, title: "Free news api options", messages: [] },
    { id: 3, title: "WSL cargo permission fix", messages: [] },
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);
  const messagesEndRef = useRef(null);

  const currentChat = chats.find((c) => c.id === currentChatId) || {
    messages: [],
    title: "",
  };

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  // Auto-scroll to bottom when messages change or loading starts/ends
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentChat.messages, isLoading]);

  const handleNewChat = () => {
    const newId = Date.now();
    const newChat = { id: newId, title: "New Chat", messages: [] };
    setChats([newChat, ...chats]); // Add new chat at the top
    setCurrentChatId(newId);
  };

  const handleSelectChat = (id) => {
    setCurrentChatId(id);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    const newMessages = [
      ...currentChat.messages,
      { role: "user", content: userMessage },
    ];

    setChats((prev) =>
      prev.map((c) =>
        c.id === currentChatId ? { ...c, messages: newMessages } : c,
      ),
    );

    // Update chat title if it's still "New Chat"
    if (currentChat.title === "New Chat") {
      setChats((prev) =>
        prev.map((c) =>
          c.id === currentChatId
            ? {
                ...c,
                title:
                  userMessage.slice(0, 35) +
                  (userMessage.length > 35 ? "..." : ""),
              }
            : c,
        ),
      );
    }

    setMessage("");
    setIsLoading(true);

    // Simulate AI reply
    setTimeout(() => {
      const aiReply = `This is a simulated AI response to: "${userMessage}"\n\nYou can replace this with real API integration later.`;
      setChats((prev) =>
        prev.map((c) =>
          c.id === currentChatId
            ? {
                ...c,
                messages: [
                  ...newMessages,
                  { role: "assistant", content: aiReply },
                ],
              }
            : c,
        ),
      );
      setIsLoading(false);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-white border-r border-gray-200 flex flex-col transition-all duration-300 overflow-hidden`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <div className="w-10 h-10">
            <img src={logo} alt="Logo" />
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Panel className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat */}
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span className="font-medium text-nowrap">New Chat</span>
          </button>
        </div>

        {/* Chat History - Newest First */}
        <div className="flex-1 overflow-y-auto px-3">
          <h3 className="text-xs font-semibold text-gray-500 mb-2 px-1 text-nowrap">
            Recent Chats
          </h3>
          <div className="space-y-1">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all text-nowrap ${
                  chat.id === currentChatId
                    ? "bg-gray-100 font-medium text-gray-900"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {chat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Theme & Logout */}
        <div
          className="p-4
        "
        >
          {/* Theme Selector */}
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 mb-2">Theme</h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {["light", "dark", "system"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  className={`flex-1 py-2 text-xs font-medium rounded-md transition ${
                    theme === t
                      ? "bg-[#9C1E1E] text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Logout */}
          <button className="w-full flex items-center justify-center gap-2 py-2.5 text-[#FE6262] hover:bg-red-50 bg-gray-100 rounded-lg transition-colors">
            <Logout className="w-4 h-4" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          {!isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(true)}>
              <Panel className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1" />
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-300">
            <img
              src="https://images.unsplash.com/photo-1601288496920-b6154fe3626a?fm=jpg&q=60&w=3000&auto=format&fit=crop"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {currentChat.messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-2xl px-6 py-3 rounded-2xl shadow-sm ${
                    msg.role === "user"
                      ? "bg-white rounded-tr-sm"
                      : "bg-white rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-sm px-6 py-4 shadow-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-400"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-700"></span>
                    </div>
                    <span className="text-sm"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area - Buttons aligned to bottom */}
        <div className="px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage}>
              <div className="flex items-end gap-3 bg-white border border-gray-200 rounded-4xl px-4 py-3 shadow-sm">
                <button
                  type="button"
                  className="w-9 h-9 bg-[#9C1E1E] rounded-full flex items-center justify-center hover:bg-[#7a1818] transition-colors self-end mb-0.5"
                >
                  <PlusIcon className="w-4 h-4 text-white" />
                </button>

                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything..."
                  rows={1}
                  className="flex-1 outline-none text-gray-700 text-sm bg-transparent resize-none max-h-32 py-2"
                />

                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="w-9 h-9 bg-[#9C1E1E] rounded-full flex items-center justify-center hover:bg-[#7a1818] transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-end mb-0.5"
                >
                  <SendIcon className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInbox;

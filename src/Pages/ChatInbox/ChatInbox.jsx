import { useState, useRef, useEffect } from "react";
import logo from "../../assets/logo/logo.png";
import { Edit, PanelLeft, PlusIcon, SendIcon } from "lucide-react";
import { Logout } from "../../assets/icons/icons"; 
import ThemeToggle from "../../components/common/ThemeToggle";
import LogoutModal from "../../components/modal/LogoutModal";
import { useNavigate } from "react-router-dom";

const ChatInbox = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "@mention system in flutter",
      messages: [
        { role: "user", content: "Hey, who are you and how can you help me?" },
        {
          role: "assistant",
          content:
            "Hey, Gopika\nI am your personal, Artistry coach.\n- Answer arts questions\n- Generate art images\n- Casual conversations too",
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

  const handleLogout = () => {
    // Implement actual logout logic here, e.g., clear auth tokens, redirect to login page
    console.log("Logging out...");
    navigate('/signin')
  };

  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } bg-base-100  flex flex-col  overflow-hidden`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between">
          <div className="w-10 h-10">
            <img
              src={logo}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-full">
              <PanelLeft className="w-5 h-5 text-base-content" />
            </div>
          </button>
        </div>

        {/* New Chat */}
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-base-300 text-base-content "
          >
            <Edit className="w-4 h-4" />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-3">
          <h3 className="text-xs font-semibold mb-2 px-1 text-base-content opacity-60">
            Recent Chats
          </h3>
          <div className="space-y-1">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => handleSelectChat(chat.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm hover:bg-base-300 text-base-content`}
              >
                {chat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Theme & Logout */}
        <div className="p-4">
          {/* Theme Toggle */}
          <div className="mb-4">
            <ThemeToggle />
          </div>

          {/* Logout */}
          <button 
            onClick={() => setIsLogoutModalOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary hover:bg-red-400/20"
          >
            <Logout className="w-4 h-4" />
            <span className="font-medium text-[#FE6262]">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className=" px-6 py-4 flex items-center justify-between">
          {!isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(true)}>
              <div className="w-10 h-10 bg-primary  flex items-center justify-center rounded-full">
                <PanelLeft className="w-5 h-5 text-base-content" />
              </div>
            </button>
          )}
          <div className="flex-1" />
          <div className="w-10 h-10 rounded-full overflow-hidden bg-base-300">
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
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-2xl px-6 py-3 rounded-2xl shadow-sm ${
                    msg.role === "user"
                      ? "bg-base-100 rounded-tr-sm"
                      : "bg-base-100 rounded-tl-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed text-base-content">
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-base-100 rounded-2xl rounded-tl-sm px-6 py-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce delay-200"></span>
                      <span className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce delay-400"></span>
                      <span className="w-2 h-2 bg-base-content/40 rounded-full animate-bounce delay-700"></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSendMessage}>
              <div className="flex items-end gap-3 bg-base-100  rounded-4xl px-4 py-3 shadow-sm">
                <button
                  type="button"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#9C1E1E] transition-colors"
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
                  className="flex-1 outline-none text-sm resize-none max-h-32 bg-transparent text-base-content py-2"
                />

                <button
                  type="submit"
                  disabled={!message.trim() || isLoading}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#9C1E1E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <SendIcon className="w-4 h-4 text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          handleLogout();
          setIsLogoutModalOpen(false);
        }}
      />
    </div>
  );
};

export default ChatInbox;
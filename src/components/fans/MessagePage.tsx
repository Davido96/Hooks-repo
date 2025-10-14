"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavTabs } from "@/components/fans/NavTabs";
import { StatsBar } from "@/components/fans/StatsBar";
import SendKeysTipModal from "@/components/modals/SendKeysTipModal";
import { X, ChevronLeft, CheckCheck, Key, KeyIcon } from "lucide-react"; // Import necessary icons

export default function MessagePage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Exclusive Content");
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const conversations = [
    {
      id: 1,
      name: "Anita",
      lastMessage: "Baby how are you",
      time: "19:45",
      unread: 1,
      avatar:
        "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600",
      online: true,
    },
    {
      id: 2,
      name: "David O.",
      lastMessage: "See you then!",
      time: "18:30",
      unread: 0,
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
      online: false,
    },
  ];

  const [activeConversation, setActiveConversation] = useState(
    conversations[0]
  );

  const handleConversationClick = (convo: (typeof conversations)[0]) => {
    setActiveConversation(convo);
    setMobileView("chat");
  };

  return (
    <>
      <div className="container mx-auto px-4 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 my-4">
          <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <StatsBar />
        </div>
        <div>
          <button
            onClick={() => router.back()}
            className="absolute top-40 right-4 z-10 text-white hover:text-white transition-colors hidden lg:block"
            title="Close Messages"
          >
            <X size={24} />
          </button>
        </div>
        <main className="relative flex gap-6 h-[calc(100vh-150px)] pb-4">
          {/* Conversation List */}

          <aside
            className={`w-full md:w-80 bg-white/5 rounded-2xl backdrop-blur-lg border border-white/10 flex-col lg:flex ${
              mobileView === "list" ? "flex" : "hidden"
            }`}
          >
            <div className="p-4 border-b border-white/10">
              <Input
                placeholder="Search conversations..."
                className="rounded-lg bg-black/20 border-transparent text-white placeholder:text-white/60 focus:ring-white/50"
              />
            </div>
            <div className="flex-1 overflow-y-auto">
              {conversations.map((convo) => (
                <div
                  key={convo.id}
                  onClick={() => handleConversationClick(convo)}
                  className={`flex items-center p-4 border-b border-white/10 cursor-pointer ${
                    activeConversation.id === convo.id
                      ? "bg-black/10"
                      : "hover:bg-black/5"
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={convo.avatar}
                      alt={convo.name}
                      width={48}
                      height={48}
                      className="rounded-full mr-3 object-cover aspect-square overflow-hidden"
                    />

                    {convo.online && (
                      <span className="absolute bottom-0 right-3 bg-green-500 w-3 h-3 rounded-full border-2 border-white/20"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{convo.name}</h4>
                    <p className="text-sm text-white/70 truncate">
                      {convo.lastMessage}
                    </p>
                  </div>
                  <div className="text-right ml-2">
                    <p className="text-xs text-white/60 mb-1">{convo.time}</p>
                    {convo.unread > 0 && (
                      <span className="bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center ml-auto">
                        {convo.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Chat Window */}
          <div
            className={`flex-1 flex-col bg-white/5 rounded-2xl backdrop-blur-lg border border-white/10 ${
              mobileView === "chat" ? "flex" : "hidden"
            } lg:flex`}
          >
            <div className="flex items-center p-4 border-b border-white/10">
              <button
                onClick={() => setMobileView("list")}
                className="mr-3 lg:hidden text-white"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="relative">
                <Image
                  src={activeConversation.avatar}
                  alt={activeConversation.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-3 object-cover aspect-square overflow-hidden"
                />
                {activeConversation.online && (
                  <span className="absolute bottom-0 right-3 bg-green-500 w-2.5 h-2.5 rounded-full border border-white/20"></span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {activeConversation.name}
                </h3>
                <p className="text-sm text-white/70">Online</p>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="ml-auto bg-gradient-to-r from-orange-400 to-yellow-400 text-black font-semibold py-2 px-4 rounded-full shadow hover:opacity-90 text-xs"
              >
                Send Tips
                <KeyIcon />
              </Button>
            </div>
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              <div className="text-center text-white/60 text-sm my-4">
                <span className="bg-black/10 px-3 py-1 rounded-full">
                  Today
                </span>
              </div>
              <div className="flex justify-start">
                <div className="bg-black/10 p-3 rounded-xl max-w-sm">
                  Hello Dr., I wanted to confirm my appointment tomorrow
                  <div className="text-xs text-white/50 mt-1 text-right">
                    08:21
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-pink-500 text-white p-3 rounded-xl max-w-sm">
                  Yes, you’re scheduled for 2:30 PM. Please arrive 15 minutes
                  early to complete paperwork.
                  <div className="text-xs text-white/70 mt-1 text-right flex items-center justify-end gap-1">
                    08:21 <CheckCheck size={16} />
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-black/10 p-3 rounded-xl max-w-sm">
                  I’ll be there on time.
                  <div className="text-xs text-white/50 mt-1 text-right">
                    08:21
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-green-500 text-white p-3 rounded-xl max-w-xs flex items-center gap-2">
                  250 Keys sent as tip <Key size={16} />
                  <div className="text-xs text-white/70 mt-1 flex items-center justify-end gap-1">
                    08:21 <CheckCheck size={16} />
                  </div>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-black/10 p-3 rounded-xl max-w-sm">
                  Alright, okay...
                  <div className="text-xs text-white/50 mt-1 text-right">
                    08:21
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-white/10 flex items-center">
              <Input
                placeholder="Type your message..."
                className="flex-1 bg-black/20 border-transparent rounded-lg text-white placeholder:text-white/60 focus:ring-white/50"
              />
            </div>
          </div>
        </main>
      </div>
      <SendKeysTipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

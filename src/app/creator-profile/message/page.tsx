// kindly note that each function in here is a component...
"use client";

import Image from "next/image";
import { useProfileStore } from "@/stores/profileStore";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowLeft, ArrowUp, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { toNaira } from "@/utils/currencyConverter";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  senderRole: string;
  content: string;
  // type: "text" | "image" | "file";
  status: "delivered" | "seen" | "sent";
  timestamp: string;
}
interface Chat {
  chatId: string;
  user: {
    id: string;
    username: string;
    displayPic: string;
    lastSeen: string;
    online: boolean;
  };
  admin: {
    id: string;
    username: string;
    displayPic: string;
  };
  messages: Message[];
  // lastSeen: string;
  // timestamp: string;
}

function SidebarChatCard({
  data,
  presentChat,
  setter,
}: {
  data: Chat;
  presentChat: Chat | null;
  setter: Dispatch<SetStateAction<Chat | null>>;
}) {
  // tempoarily using the profile picture of the creator
  const { profile } = useProfileStore();

  const { user, messages } = data;
  const name = user.username;
  const isChosen = name === presentChat?.user.username;
  return (
    <div
      onClick={() => setter(data)}
      className={`${
        isChosen && "bg-white/10 border border-[#6B72800F]/6"
      } text-white flex items-center hover:bg-white/15 rounded-2xl cursor-pointer p-4 justify-between`}
    >
      {profile?.display_pic ? (
        <Image
          className="block rounded-full w-auto h-auto"
          src={profile.display_pic}
          alt={`${name.split(" ")[0]} profile picture`}
          width={55}
          height={55}
        />
      ) : (
        <div className="grid place-items-center bg-black text-white size-[55px] rounded-full">
          {name[0]}
        </div>
      )}
      <div className="flex-1 ml-2">
        <h2 className="text-xl w-[90%] truncate leading-[28px]">
          <strong>{name}</strong>
        </h2>
        <p className="text-sm mt-1 w-[90%] truncate">
          {(messages.at(-1) || messages[0]).content}
        </p>
      </div>
      <div>
        <p className="text-sm">{"19:57"}</p>
        {1 > 0 && (
          <p className="text-xs bg-[#EC4899] mt-1 py-[2px] px-[8px] gap-[10px] w-fit rounded-full grid place-items-center ml-auto">
            {1 < 1000 ? 1 : "999+"}
          </p>
        )}
      </div>
    </div>
  );
}

function SideBar({
  setter,
  presentChat,
}: {
  setter: Dispatch<SetStateAction<Chat | null>>;
  presentChat: Chat | null;
}) {
  // dummy chat data gotten from chatGPT
  const chats: Chat[] = [
    {
      chatId: "chat_001",
      user: {
        id: "user_001",
        username: "John Doe",
        displayPic: "https://example.com/avatars/john.jpg",
        lastSeen: "2025-09-29T10:55:00Z",
        online: true,
      },
      admin: {
        id: "admin_001",
        username: "Support Agent",
        displayPic: "https://example.com/avatars/admin.jpg",
      },
      messages: [
        {
          id: "msg_001",
          senderId: "user_001",
          receiverId: "admin_001",
          senderRole: "user",
          content:
            "Hey man. How you doing, uh... if you ain't too busy with creating content... I really need some help with my account",
          timestamp: "2025-09-27T08:00:00Z",
          status: "seen",
        },
        {
          id: "msg_002",
          senderId: "admin_001",
          receiverId: "user_001",
          senderRole: "admin",
          content: "Hi John 👋 Sure, what issue are you facing?",
          timestamp: "2025-09-27T08:01:10Z",
          status: "seen",
        },
        {
          id: "msg_003",
          senderId: "user_001",
          receiverId: "admin_001",
          senderRole: "user",
          content: "I’m unable to log in after resetting my password.",
          timestamp: "2025-09-28T10:15:00Z",
          status: "delivered",
        },
        {
          id: "msg_004",
          senderId: "admin_001",
          receiverId: "user_001",
          senderRole: "admin",
          content: "Got it. Did you receive the reset confirmation email?",
          timestamp: "2025-09-28T10:16:45Z",
          status: "delivered",
        },
        {
          id: "msg_005",
          senderId: "user_001",
          receiverId: "admin_001",
          senderRole: "user",
          content: "Yes, but when I try the link it says expired.",
          timestamp: "2025-09-29T09:10:00Z",
          status: "sent",
        },
      ],
    },
    {
      chatId: "chat_002",
      user: {
        id: "user_001",
        username: "Alice",
        displayPic: "https://example.com/avatars/john.jpg",
        lastSeen: "2025-09-29T10:55:00Z",
        online: true,
      },
      admin: {
        id: "admin_001",
        username: "Support Agent",
        displayPic: "https://example.com/avatars/admin.jpg",
      },
      messages: [
        {
          id: "msg_001",
          senderId: "user_001",
          receiverId: "admin_001",
          senderRole: "user",
          content: "Heyyy mllll... how are you doing???",
          timestamp: "2025-09-27T08:00:00Z",
          status: "seen",
        },
        {
          id: "msg_002",
          senderId: "admin_001",
          receiverId: "user_001",
          senderRole: "admin",
          content: "Heyyy i'm fineeee... youuu??",
          timestamp: "2025-09-27T08:01:10Z",
          status: "seen",
        },
        {
          id: "msg_003",
          senderId: "user_001",
          receiverId: "admin_001",
          senderRole: "user",
          content: "I’m unable to log in after resetting my password.",
          timestamp: "2025-09-28T10:15:00Z",
          status: "delivered",
        },
        {
          id: "msg_004",
          senderId: "admin_001",
          receiverId: "user_001",
          senderRole: "admin",
          content: "Got it. Did you receive the reset confirmation email?",
          timestamp: "2025-09-28T10:16:45Z",
          status: "delivered",
        },
        {
          id: "msg_005",
          senderId: "user_001",
          receiverId: "admin_001",
          senderRole: "user",
          content: "Yes, but when I try the link it says expired.",
          timestamp: "2025-09-29T09:10:00Z",
          status: "sent",
        },
      ],
    },
  ];

  const [search, setSearch] = useState("");
  return (
    <aside className="h-[90vh] px-4 py-7 rounded-2xl left-12 w-[447px] bg-white/10 backdrop-blur-[4px]">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-white outline-none rounded-[10px] border border-[#E4E4E7] p-4 w-full block placeholder:text-[#71717A] text-sm h-12 bg-white/12"
        placeholder="Search conversations..."
      />
      <div className="flex mt-9 flex-col">
        {chats.map((chat) => (
          <SidebarChatCard
            setter={setter}
            presentChat={presentChat}
            data={chat}
            key={chat.chatId}
          />
        ))}
      </div>
    </aside>
  );
}

function Main({
  presentChat,
  onSendTip,
}: {
  presentChat: Chat | null;
  onSendTip: () => void;
}) {
  const [message, setMessage] = useState("");
  const profile = useProfileStore((state) => state.profile);
  const mediaRef = useRef<HTMLInputElement>(null);

  const handleMediaChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    // setMedia(e.target.files[0]);
  };

  return (
    <main
      className={`${
        !presentChat
          ? "flex items-center justify-center"
          : "bg-white/10 rounded-2xl"
      } flex-grow h-[90vh]`}
    >
      {!presentChat ? (
        <div className="flex flex-col items-center gap-y-4">
          <Image width={55} height={55} src="/message.svg" alt="" />
          <p className="text-center text-sm leading-[20px] text-[#71717A]">
            Your Messages <br /> Select a conversation to start messaging
          </p>
        </div>
      ) : (
        <div className="relative flex flex-col pb-[26px] h-[90vh]">
          {/* header */}
          <div className="flex bg-white/10 rounded-t-2xl p-5 items-end justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={profile?.display_pic || ""}
                alt="profile picture"
                className="w-auto h-auto rounded-full object-cover"
                width={55}
                height={55}
              />
              <div>
                <h2 className="text-xl leading-[28px] font-bold text-white">
                  {presentChat.user.username}
                </h2>
                <p className="text-[#1DAB61] text-sm mt-1">Online</p>
              </div>
            </div>
            {/* tip button */}
            <button
              onClick={onSendTip}
              className="px-4 h-10 gap-3 flex items-center text-white text-xs cursor-pointer bg-gradient-to-r rounded-[6px] from-[#FB923C] to-[#EC4899]"
            >
              <Send size={16} />
              <p>Send Tips 💰</p>
            </button>
          </div>

          {/* message container */}
          <div className="flex-1 px-4 w-full relative overflow-y-auto">
            <button className="font-semibold transform -translate-x-1/2 left-1/2 top-2 sticky text-center rounded-[8px] bg-white text-xs px-3 py-0.5">
              Today
            </button>

            {/* messages */}
            <div>
              {presentChat.messages &&
                presentChat.messages.length > 0 &&
                presentChat.messages.map((msg) => {
                  return (
                    <p
                      className={`text-sm w-fit leading-[20px] rounded-[12px] py-1 px-2 bg-white max-w-[287px] ${
                        msg.senderRole === "admin"
                          ? "ml-auto text-[#EC4899]"
                          : ""
                      }`}
                      key={msg.id}
                    >
                      {msg.content}
                    </p>
                  );
                })}
            </div>
          </div>

          {/* message input */}
          <div className="flex items-center px-5 gap-2">
            <div className="flex flex-1 items-center py-0.5 gap-4 rounded-2xl px-[10px] bg-white">
              <input
                placeholder="Enter your message"
                className="text-base flex-1 leading-[26px] outline-none border-none"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={() => mediaRef.current?.click()}
                title="add image"
                className="cursor-pointer"
              >
                <Image
                  src={"/sticker.svg"}
                  alt="sticker icon"
                  width={24}
                  height={24}
                />
              </button>

              {/* file input */}
              <input type="file" className="" onChange={handleMediaChange} />
            </div>
            <button
              disabled={!message}
              title="send message"
              className="text-white disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center bg-[#F98B44] rounded-full size-8"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function TipModal({
  data: {
    user: { username },
  },
  onCancel,
}: {
  data: Chat;
  onCancel: () => void;
}) {
  const quickAmts = [5, 10, 15, 25];
  const [currentAmount, setCurrentAmount] = useState<number>(5);
  const [message, setMessage] = useState("");

  // key balance
  const keyBalance = 253584;

  const handleCustomInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setCurrentAmount(Number(value));
  };

  return (
    <div className="fixed flex items-center justify-center inset-0 bg-black/50 w-full h-full">
      {/* modal content */}
      <div className="bg-white overflow-y-auto h-[90vh] hide-scrollbar rounded-[8px] w-[384px] p-6">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* logo */}
            <div className="size-6 flex items-center justify-center rounded-full bg-[#FACC15]">
              <div className="size-4 rounded-full bg-white" />
            </div>

            {/* heading */}
            <h2>
              <strong>Send Key Tip</strong>
            </h2>
          </div>
          <Image
            width={24}
            height={24}
            className="w-auto h-auto cursor-pointer"
            src={"/cancelBlack.svg"}
            alt="Cancel Icon"
            onClick={onCancel}
          />
        </header>
        <div className="bg-[#F87171] mt-6 mx-auto size-12 flex items-center justify-center rounded-full text-white">
          <ArrowUp size={24} />
        </div>
        <h3 className="mt-3 text-center truncate w-full leading-[24px]">
          <strong>Sending tip to {username}</strong>
        </h3>
        <p className="text-[#4B5563] text-xs text-center mt-2 leading-[20px]">
          Your current balance: {keyBalance} 🔑
        </p>
        {/* Quick amounts */}
        <div className="mt-7">
          <h4 className="text-sm leading-[20px]">Quick Amounts</h4>

          {/* amounts */}
          <div className="mt-3 grid grid-cols-4 gap-x-2">
            {quickAmts.map((amt, index) => (
              <div
                key={index}
                onClick={() => setCurrentAmount(amt)}
                className={`py-[14px] border ${
                  amt === currentAmount
                    ? "border-[#EF4444]"
                    : "border-[#E2E8F0]"
                } rounded-[6px] cursor-pointer flex gap-1 items-center justify-center`}
              >
                <p className="text-sm">
                  <strong>{amt}</strong>
                </p>
                {/* coin */}
                <div className="size-3 rounded bg-[#FACC15]" />
              </div>
            ))}
          </div>
        </div>

        {/* custom amt */}
        <div className="mt-6">
          <label htmlFor="customAmt" className="leading-[20px]">
            Custom Amount
          </label>
          <input
            type="string"
            placeholder="Enter a custom amount"
            name="customAmt"
            onChange={handleCustomInput}
            value={currentAmount}
            className="block border text-sm border-[#E2E8F0] mt-2 w-full outline-none p-3 rounded-[6px]"
          />
        </div>

        {/* message */}
        <div className="mt-6">
          <label htmlFor="description" className="leading-[20px]">
            Message (Optional)
          </label>
          <textarea
            placeholder="Add a personal message..."
            name="description"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="block border h-20 resize-none text-sm border-[#E2E8F0] mt-2 w-full outline-none p-3 rounded-[6px]"
          />
        </div>

        {/* total */}
        <div className="flex items-center mt-6 justify-between">
          <h2>
            <strong>Total</strong>
          </h2>
          <h4>
            <strong>
              {currentAmount}🔑{" "}
              <span className="text-[#EF4444]">
                ({toNaira(currentAmount * 1000)})
              </span>
            </strong>
          </h4>
        </div>

        {/* call to action button */}
        <button
          disabled={currentAmount === 0 || currentAmount > keyBalance}
          className="bg-gradient-to-r from-[#EC4899] to-[#EF4444] mt-6 rounded-[6px] text-white shadow-md disabled:cursor-not-allowed disabled:opacity-50 h-10 w-full block"
        >
          Send
        </button>

        {/* disclaimer */}
        <p className="text-[#6B7280] text-xs mt-4 text-center">
          Tips are sent instantly and cannot be undone
        </p>
      </div>
    </div>
  );
}

function SuccessModalOverlay() {
  return (
    <div>You successfully send the tip to the user. Thank you and goodbye</div>
  );
}

export default function Message() {
  const { profile } = useProfileStore();

  const router = useRouter();
  const [presentChat, setPresentChat] = useState<Chat | null>(null);
  const [shouldSendTip, setShouldSendTip] = useState(false);
  const [showSucessModal] = useState(false);

  useEffect(() => {
    if (!profile) router.push("/login");
  }, [profile, router]);

  return (
    <div>
      {/* back button */}
      <div
        className="text-white mr-15 cursor-pointer mt-5 ml-auto hover:bg-white/10 border-white/30 border w-fit p-2 rounded-[8px] flex gap-2 items-center"
        onClick={() => router.back()}
      >
        <ArrowLeft />
        <p className="text-sm">Return to Home</p>
      </div>

      {/* main chat ui */}
      <div className="px-15 pb-10 gap-10 mt-5 flex items-center justify-between">
        <SideBar setter={setPresentChat} presentChat={presentChat} />
        <Main
          presentChat={presentChat}
          onSendTip={() => setShouldSendTip(true)}
        />
        {shouldSendTip && presentChat && (
          <TipModal
            onCancel={() => setShouldSendTip(false)}
            data={presentChat}
          />
        )}
        {showSucessModal && <SuccessModalOverlay />}
      </div>
    </div>
  );
}

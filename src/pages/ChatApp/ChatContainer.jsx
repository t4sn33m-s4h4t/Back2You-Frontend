import { useState, useRef, useEffect } from "react";
import { BsChatLeftDots, BsThreeDotsVertical } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { CiCamera, CiVideoOn } from "react-icons/ci";
import { MdCall, MdOutlineAttachFile, MdOutlineEmojiEmotions } from "react-icons/md";
import { format } from "date-fns";
import Dropdown from "./Dropdown";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";


const ChatContainer = ({ socket, sender, receiver, refetchChats }) => {
    const axiosPublic = useAxiosPublic();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const chatEndRef = useRef(null);
    useEffect(() => {
        if (!socket || !sender?._id) return;

        socket.emit("authenticate", sender._id);

    }, [socket, sender?._id]);


    const { data: msgs = [], refetch: refetchMessages } = useQuery({
        queryKey: ['messages', sender.email, receiver.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/messages?sender=${sender._id}&receiver=${receiver._id}`);
            return res.data;
        },
    });
    useEffect(() => {
        msgs.length && setMessages(msgs)
    }, [msgs, setMessages])

    useEffect(() => {
        if (!socket) return;
        const handleReceiveMessage = (message) => {
            if (receiver?._id === message.sender) {
                socket.emit('messageRead', message._id);
                setMessages((prev) => [...prev, message]);
            }
        };
        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
        };
    }, [socket, receiver?._id]);
useEffect(() => {
  if (!socket) return;
  console.log("Socket connected?", socket.connected);
}, [socket]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!newMessage.trim() || !sender?._id || !receiver?._id) return;
        const message = {
            text: newMessage,
            sender: sender._id,
            receiver: receiver._id,
            timestamp: new Date().toISOString()
        };
        setMessages((prev) => [...prev, message]);
        socket.emit("sendMessage", message); 
        setTimeout(() => {
            refetchMessages();
        }, 1000);
        setNewMessage("");
    };
    useEffect(() => {
        receiver && messages.length && refetchChats()
    }, [receiver, messages.length, refetchChats])


    const formatTime = (timestamp) => {
        return format(new Date(timestamp), "h:mm a");
    };
    const deleteMessage = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to recover this message!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosPublic.delete(`/messages/${id}`);
                    if (res.data.success) {
                        Swal.fire("Deleted!", "Your message has been deleted.", "success");
                        refetchMessages();
                    } else {
                        Swal.fire("Error!", "Failed to delete message.", "error");
                    }
                } catch (error) {
                    Swal.fire("Error!", "Failed to delete message.", "error");
                }
            }
        });
    };

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false); // Close the dropdown
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);
    return (
        <div className="flex flex-col w-full bg-white lg:border lg:border-gray-300 p-4 md:p-0  overflow-hidden">
            <div className="bg-green-700 text-white p-4 font-semibold text-lg border-b border-b-gray-200 flex justify-between">
                <div className="flex items-center gap-2">
                    <img src={receiver.photoURL} alt="" className="w-12 h-12 rounded-full" />
                    <div className="flex flex-col">
                        <h3 className="text-lg">{receiver ? `${receiver?.name}` : "Chat"}</h3>
                        <p className="text-[12px]">Active Now</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <CiVideoOn className="w-7 h-7" />
                    <MdCall className="w-7 h-7" />
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="focus:outline-none"
                        >
                            <BsThreeDotsVertical className="cursor-pointer w-7 h-7 mt-2" />
                        </button>
                        {isOpen && (
                            <div className="absolute right-3 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                                <ul className="py-2 text-gray-700">
                                    <li
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        Delete Chat
                                    </li>
                                    <Link to={"/my-profile"}>
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            View Profile
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96 scrollbar-hide bg-gray-200">
                {(messages.length && receiver) ? (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex group ${msg.sender === sender?._id ? "justify-end" : "justify-start"}`}
                        >
                            <div className={`flex min-w-20 max-w-[14rem] md:max-w-[25rem] lg:max-w-[32rem] ${msg.sender === sender?._id ? "justify-end" : "justify-start"}`}>
                                <div className={`relative pl-3  pt-1 pb-4 pr-4 w-full rounded-lg flex flex-col shadow-md
        ${msg.sender === sender?._id ? "bg-green-900 text-white rounded-br-none" : "bg-gray-100 text-black rounded-bl-none"}
    `}>
                                    <BsThreeDotsVertical
                                        className={`w-4 h-4 text-black cursor-pointer absolute top-1/2 -left-7 opacity-0 transition-opacity duration-300 -translate-y-1/2 group-hover:opacity-100 ${(msg.sender === sender?._id) ? "" : "hidden"}`}
                                        onClick={() => deleteMessage(msg._id)}
                                    />
                                    <p className="break-words">{msg.text}</p>

                                    <p className={`text-[10px] absolute bottom-1 right-2 ${msg.sender === sender?._id ? "text-gray-200" : "text-gray-500"}`}>
                                        {formatTime(new Date(msg.timestamp))}
                                    </p>
                                </div>
                            </div>

                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <BsChatLeftDots className="w-16 h-16" />
                        <h3 className="text-xl font-medium mb-2">
                            {(receiver) ? <p className="text-center">No messages yet with <br /> <b>{receiver?.email}</b></p> : "No chat selected"}
                        </h3>
                        <p>{receiver ? "Send your first message!" : "Select a user to chat"}</p>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {receiver && (
                <div className="border-t border-t-gray-200 p-3 flex items-center gap-3 bg-gray-100">
                    <input
                        type="text"
                        className="flex-1 p-3 border rounded-full border-gray-300 outline-none bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <MdOutlineEmojiEmotions className="w-7 h-7 absolute right-42 md:right-37" />
                    <MdOutlineAttachFile className="w-6 h-6 absolute right-34 md:right-29" />
                    <CiCamera className="w-7 h-7 absolute right-25 md:right-20" />
                    <button
                        onClick={sendMessage}
                        className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition disabled:opacity-50"
                        disabled={!newMessage.trim()}
                    >
                        <IoSend className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatContainer;

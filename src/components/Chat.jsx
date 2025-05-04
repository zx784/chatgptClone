"use client"

import { useEffect, useRef } from "react"
import { useChat } from "../context/ChatContext"
import MessageInput from "./MessageInput"
import MessageList from "./MessageList"
import WelcomeScreen from "./WelcomeScreen"

const Chat = () => {
  const { currentChat, isTyping } = useChat()
  const messagesEndRef = useRef(null)

  // Scroll to bottom when messages change or when typing status changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [currentChat?.messages, isTyping])

  if (!currentChat) {
    return <WelcomeScreen />
  }

  return (
    <main className="flex flex-col relative h-full w-full md:w-[80%] overflow-hidden bg-white md:ml-64">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        <MessageList messages={currentChat.messages} isTyping={isTyping} />
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t border-gray-200 p-4">
        <MessageInput />
      </div>
    </main>
  )
}

export default Chat

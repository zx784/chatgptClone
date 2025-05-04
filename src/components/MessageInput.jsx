"use client"

import { useEffect, useRef, useState } from "react"
import { FiSend } from "react-icons/fi"
import { useChat } from "../context/ChatContext"

const MessageInput = () => {
  const [message, setMessage] = useState("")
  const { sendMessage, isTyping } = useChat()
  const textareaRef = useRef(null)

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = "auto"
      // Set the height to the scrollHeight
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [message])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim() || isTyping) return

    sendMessage(message)
    setMessage("")
  }

  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form className="w-full max-w-3xl mx-auto" onSubmit={handleSubmit}>
      <div className="relative">
        <textarea
          ref={textareaRef}
          className="w-full px-6 py-3 pr-12 text-sm bg-white border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message ChatGPT..."
          disabled={isTyping}
          rows={1}
        />
        <button
          className="absolute right-2 bottom-2.5 p-1.5 text-blue-500 rounded-md hover:bg-gray-100 disabled:opacity-20 disabled:cursor-not-allowed"
          type="submit"
          disabled={!message.trim() || isTyping}
          aria-label="Send message"
        >
          <FiSend className="w-5 h-5 mr-5" />
        </button>
      </div>
      <div className="mt-2 text-center">
        <p className="text-xs text-gray-500">ChatGPT can make mistakes. Consider checking important information.</p>
      </div>
    </form>
  )
}

export default MessageInput

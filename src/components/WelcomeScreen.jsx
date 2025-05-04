"use client"

import { useChat } from "../context/ChatContext"

const WelcomeScreen = () => {
  const { createChat } = useChat()

  const examplePrompts = [
    "Explain quantum computing in simple terms",
    "Write a short story about a robot learning to love",
    "How do I make a delicious chocolate cake?",
    "What are some exercises for improving creativity?",
  ]

  const handleExampleClick = (prompt) => {
    const newChatId = createChat()
    setTimeout(() => {
      const textareaElement = document.querySelector("textarea")
      if (textareaElement) {
        textareaElement.value = prompt
        textareaElement.focus()
      }
    }, 100)
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-4 bg-white">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">ChatGPT</h1>
        <p className="text-xl mb-8 text-gray-600">How can I help you today?</p>

        <div className="mt-8">
          <h2 className="text-lg font-medium mb-4 text-gray-700">Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                className="p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                onClick={() => handleExampleClick(prompt)}
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen

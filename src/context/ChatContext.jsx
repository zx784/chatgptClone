import { createContext, useContext, useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

// Chat reducer for managing state
const chatReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_CHAT':
      const newChat = {
        id: uuidv4(),
        title: action.payload?.title || 'New Chat',
        messages: [],
        createdAt: new Date().toISOString(),
      };
      return {
        ...state,
        chats: [newChat, ...state.chats],
        currentChatId: newChat.id,
      };
    
    case 'SELECT_CHAT':
      return {
        ...state,
        currentChatId: action.payload,
      };
    
    case 'DELETE_CHAT':
      const filteredChats = state.chats.filter(chat => chat.id !== action.payload);
      // If deleting the current chat, select the first available or null
      const newCurrentId = state.currentChatId === action.payload 
        ? (filteredChats.length > 0 ? filteredChats[0].id : null)
        : state.currentChatId;
      
      return {
        ...state,
        chats: filteredChats,
        currentChatId: newCurrentId,
      };
    
    case 'ADD_MESSAGE':
      return {
        ...state,
        chats: state.chats.map(chat => {
          if (chat.id === state.currentChatId) {
            // Update chat title after first user message if it's still the default
            const updatedChat = {
              ...chat,
              messages: [...chat.messages, action.payload],
            };
            
            // Update title based on first user message if it's still "New Chat"
            if (chat.title === 'New Chat' && action.payload.role === 'user' && chat.messages.length === 0) {
              const maxTitleLength = 30;
              const newTitle = action.payload.content.length > maxTitleLength
                ? `${action.payload.content.substring(0, maxTitleLength)}...`
                : action.payload.content;
              
              updatedChat.title = newTitle;
            }
            
            return updatedChat;
          }
          return chat;
        }),
      };
    
    default:
      return state;
  }
};

//second part of the code
// Initial state
const initialState = {
  chats: [],
  currentChatId: null,
};

//first part of the code
export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const [isTyping, setIsTyping] = useState(false);
  
  // Get current chat
  const currentChat = state.currentChatId 
    ? state.chats.find(chat => chat.id === state.currentChatId)
    : null;
  
  // Create a new chat
  const createChat = (title) => {
    dispatch({ type: 'CREATE_CHAT', payload: { title } });
  };
  
  // Select a chat
  const selectChat = (chatId) => {
    dispatch({ type: 'SELECT_CHAT', payload: chatId });
  };
  
  // Delete a chat
  const deleteChat = (chatId) => {
    dispatch({ type: 'DELETE_CHAT', payload: chatId });
  };
  
  // Send a message in the current chat
  const sendMessage = async (content) => {
    // Create the user message
    const userMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    
    // If no current chat exists, create one
    if (!state.currentChatId) {
      createChat();
    }
    
    // Add the user message to the chat
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage });
    
    // Show the AI is typing
    setIsTyping(true);
    
    try {
      // Simulate AI response (with delay to mimic network request)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate AI response
      const aiResponse = await generateAIResponse(content);
      
      // Create the AI message
      const aiMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString(),
      };
      
      // Add the AI message to the chat
      dispatch({ type: 'ADD_MESSAGE', payload: aiMessage });
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      const errorMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: 'Sorry, I was unable to generate a response. Please try again.',
        error: true,
        timestamp: new Date().toISOString(),
      };
      
      dispatch({ type: 'ADD_MESSAGE', payload: errorMessage });
    } finally {
      setIsTyping(false);
    }
  };
  
  // Mock AI response generator
  const generateAIResponse = async (prompt) => {
    // Default responses for common greetings
    const greetings = ['hello', 'hi', 'hey', 'greetings'];
    const introductions = ['who are you', 'what are you', 'what can you do', 'your name', 'tell me about yourself'];
    
    // Lowercase prompt for easier matching
    const lowerPrompt = prompt.toLowerCase();
    
    // Simulating AI response based on different prompts
    if (greetings.some(g => lowerPrompt.includes(g))) {
      return "Hello! I'm a ChatGPT clone. How can I assist you today?";
    } 
    
    if (introductions.some(i => lowerPrompt.includes(i))) {
      return "I'm a ChatGPT clone, a simulated AI assistant. I can have conversations and provide information on various topics. This is a demonstration of creating a chat interface similar to OpenAI's ChatGPT.";
    }
    
    if (lowerPrompt.includes('weather')) {
      return "I don't have real-time data access, so I can't check the current weather. This is a simulated response in a ChatGPT clone interface.";
    }
    
    if (lowerPrompt.includes('joke')) {
      const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "How does a computer get drunk? It takes screenshots!",
        "Why did the JavaScript developer wear glasses? Because he couldn't C#!",
        "What do you call a fake noodle? An impasta!",
        "Why did the developer go broke? Because he used up all his cache!"
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    }
    
    // Default response
    return `This is a simulated response to your message: "${prompt}"\n\nIn a real implementation, this would be connected to an actual AI model API. For this demo, I'm providing pre-defined responses to showcase the UI functionality.`;
  };
  
  return (
    <ChatContext.Provider 
      value={{ 
        chats: state.chats,
        currentChat,
        isTyping,
        createChat,
        selectChat,
        deleteChat,
        sendMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
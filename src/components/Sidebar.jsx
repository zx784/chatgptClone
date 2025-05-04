import { useEffect, useRef } from 'react';
import { FiMessageSquare, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useChat } from '../context/ChatContext';

const Sidebar = ({ visible, toggleSidebar }) => {
  const { chats, currentChat, createChat, selectChat, deleteChat } = useChat();
  const sidebarRef = useRef(null);


    // Click outside handler
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (
          visible &&
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target) &&
          window.innerWidth < 768
        ) {
          toggleSidebar();
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [visible, toggleSidebar]); 
 
  const handleChatSelect = (chatId) => {
    selectChat(chatId);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  const handleNewChat = () => {
    createChat();
    // Close sidebar on mobile after creating new chat
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <aside ref={sidebarRef} className={`fixed inset-y-0 left-0 z-20 w-64 transform transition-transform duration-300 ease-in-out bg-gray-900 md:translate-x-0 ${visible ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4">
          {/* Logo or App Name */}
          <h1 className="text-lg font-semibold text-white">ChatGPT</h1>
          <p className="text-sm text-gray-400">Your AI Assistant</p>
          <button 
            className="flex items-center bg-blue-500 justify-center w-full gap-2 px-4 py-3 text-sm font-medium text-white transition-colors rounded-md hover:bg-blue-600"
            onClick={handleNewChat}
          >
            <FiPlus className="w-4 h-4" />
            <span >New chat</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chats.length > 0 ? (
            <ul className="px-2 space-y-1">
              {chats.map((chat) => (
                <li 
                  key={chat.id} 
                  className={`relative group rounded-md ${currentChat?.id === chat.id ? 'bg-gray-800' : 'hover:bg-gray-800'}`}
                >
                  <button
                    className="flex items-center w-full gap-2 px-3 py-2 text-sm text-left text-gray-300 truncate"
                    onClick={() => handleChatSelect(chat.id)}
                  >
                    <FiMessageSquare className="flex-shrink-0 w-4 h-4" />
                    <span className="truncate">{chat.title}</span>
                  </button>                                 
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    aria-label="Delete chat"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-sm text-gray-500">No chats yet</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

import { useEffect, useState } from 'react';
import Chat from './components/Chat';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { useChat } from './context/ChatContext';

function App() {
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 768);
  const { createChat, chats } = useChat();

  // Handle window resize for responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setSidebarVisible(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create initial chat if none exists
  useEffect(() => {
    if (chats.length === 0) {
      createChat();
    }
  }, [chats.length, createChat]);

  const toggleSidebar = () => {
    setSidebarVisible(prev => !prev);
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} sidebarVisible={sidebarVisible} />
      <Sidebar visible={sidebarVisible} toggleSidebar={toggleSidebar} />
      <Chat />
    </div>
  );
}

export default App;
import Message from './Message';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, isTyping }) => {
  return (
    <div className="px-4 py-6 md:px-8">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-sm text-gray-500 dark:text-gray-400">Send a message to start the conversation</p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        </div>
      )}
      
      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default MessageList;

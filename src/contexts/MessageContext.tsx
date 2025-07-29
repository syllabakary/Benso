import React, { createContext, useContext, useState, useEffect } from 'react';
import { Conversation, Message } from '../types';
import { mockConversations } from '../data/mockData';

interface MessageContextType {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  unreadCount: number;
  setSelectedConversation: (conversation: Conversation | null) => void;
  sendMessage: (conversationId: string, content: string, propertyId?: string) => void;
  markAsRead: (conversationId: string) => void;
  createConversation: (participants: string[], propertyId?: string) => Conversation;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const unreadCount = conversations.reduce((total, conv) => total + conv.unreadCount, 0);

  const sendMessage = (conversationId: string, content: string, propertyId?: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId,
      senderId: 'current-user-id',
      receiverId: 'other-user-id',
      content,
      type: 'text',
      read: false,
      createdAt: new Date(),
      propertyId
    };

    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? {
              ...conv,
              lastMessage: newMessage,
              updatedAt: new Date()
            }
          : conv
      )
    );
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const createConversation = (participants: string[], propertyId?: string): Conversation => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      participants: [], // Would be populated with actual user data
      propertyId,
      unreadCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setConversations(prev => [...prev, newConversation]);
    return newConversation;
  };

  return (
    <MessageContext.Provider value={{
      conversations,
      selectedConversation,
      unreadCount,
      setSelectedConversation,
      sendMessage,
      markAsRead,
      createConversation
    }}>
      {children}
    </MessageContext.Provider>
  );
};
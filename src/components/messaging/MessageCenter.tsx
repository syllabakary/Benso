import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  Calendar,
  MapPin,
  Home
} from 'lucide-react';
import { Conversation, Message, Property } from '../../types';

interface MessageCenterProps {
  conversations: Conversation[];
  selectedConversation?: Conversation;
  onConversationSelect: (conversation: Conversation) => void;
}

export default function MessageCenter({ 
  conversations, 
  selectedConversation, 
  onConversationSelect 
}: MessageCenterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.participants.some(p => 
      p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    ) || 
    conv.property?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;
    
    // Here you would send the message
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const mockMessages: Message[] = [
    {
      id: '1',
      conversationId: selectedConversation?.id || '',
      senderId: 'other',
      receiverId: 'me',
      content: 'Bonjour, je suis très intéressée par votre appartement. Serait-il possible de programmer une visite ?',
      type: 'text',
      read: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      conversationId: selectedConversation?.id || '',
      senderId: 'me',
      receiverId: 'other',
      content: 'Bonjour Marie, bien sûr ! Je peux vous proposer une visite demain à 14h ou jeudi à 16h. Qu\'est-ce qui vous conviendrait le mieux ?',
      type: 'text',
      read: true,
      createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000)
    },
    {
      id: '3',
      conversationId: selectedConversation?.id || '',
      senderId: 'other',
      receiverId: 'me',
      content: 'Parfait ! Demain à 14h me convient très bien. Faut-il que j\'apporte des documents particuliers ?',
      type: 'text',
      read: true,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: '4',
      conversationId: selectedConversation?.id || '',
      senderId: 'me',
      receiverId: 'other',
      content: 'Une pièce d\'identité suffira pour la visite. Je vous envoie l\'adresse exacte et mon numéro de téléphone.',
      type: 'text',
      read: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000)
    }
  ];

  return (
    <div className="h-screen bg-white flex">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => {
            const otherParticipant = conversation.participants.find(p => p.id !== 'current-user-id');
            const isSelected = selectedConversation?.id === conversation.id;
            
            return (
              <div
                key={conversation.id}
                onClick={() => onConversationSelect(conversation)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  isSelected ? 'bg-orange-50 border-orange-200' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-medium">
                      {otherParticipant?.firstName.charAt(0)}{otherParticipant?.lastName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {otherParticipant?.firstName} {otherParticipant?.lastName}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conversation.lastMessage?.createdAt.toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    {conversation.property && (
                      <div className="flex items-center space-x-1 mt-1">
                        <Home className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500 truncate">
                          {conversation.property.title}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {conversation.lastMessage?.content}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <div className="flex items-center justify-between mt-2">
                        <div></div>
                        <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                          {conversation.unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {selectedConversation.participants[0]?.firstName.charAt(0)}
                      {selectedConversation.participants[0]?.lastName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {selectedConversation.participants[0]?.firstName} {selectedConversation.participants[0]?.lastName}
                    </h3>
                    {selectedConversation.property && (
                      <p className="text-sm text-gray-600">
                        À propos de: {selectedConversation.property.title}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Property Info Card */}
            {selectedConversation.property && (
              <div className="p-4 bg-orange-50 border-b border-orange-200">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedConversation.property.images[0]?.url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=100'}
                    alt={selectedConversation.property.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{selectedConversation.property.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedConversation.property.address.city}</span>
                      <span>•</span>
                      <span className="font-medium text-orange-600">
                        {selectedConversation.property.price.toLocaleString()} €/mois
                      </span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-1 bg-white px-3 py-2 rounded-lg text-sm font-medium text-orange-600 hover:bg-orange-100 transition-colors">
                    <Calendar className="h-4 w-4" />
                    <span>Programmer visite</span>
                  </button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((message) => {
                const isMe = message.senderId === 'me';
                return (
                  <div key={message.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isMe 
                        ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${isMe ? 'text-orange-100' : 'text-gray-500'}`}>
                        {message.createdAt.toLocaleTimeString('fr-FR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Paperclip className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="p-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg hover:from-orange-500 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez une conversation</h3>
              <p className="text-gray-600">Choisissez une conversation pour commencer à discuter</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
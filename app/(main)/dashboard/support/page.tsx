'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppSelector } from '@/lib/hooks';
import { ChatMessage } from '@/types';
import { Send, MessageCircle } from 'lucide-react';

export default function SupportPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      message: 'Hello! How can I help you today?',
      sender: 'admin',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate admin response
    setTimeout(() => {
      const adminMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: 'Thank you for your message! Our team will get back to you shortly.',
        sender: 'admin',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, adminMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Support Chat</h1>
        <p className="text-muted-foreground">Get real-time help from our support team</p>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>Live Chat Support</span>
            <div className="flex items-center space-x-2 ml-auto">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-normal text-muted-foreground">Online</span>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs md:max-w-md ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="h-8 w-8">
                    {message.sender === 'user' ? (
                      <>
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback>
                          {user?.name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg" alt="Support" />
                        <AvatarFallback>S</AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className={`rounded-lg p-3 ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-xs">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg" alt="Support" />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold">Quick Help</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Order Issues:</strong> Track, modify, or cancel orders</p>
              <p><strong>Product Questions:</strong> Size, color, availability info</p>
              <p><strong>Payment Help:</strong> Billing and refund assistance</p>
              <p><strong>Technical Support:</strong> Website and app issues</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold">Contact Hours</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Live Chat:</strong> 24/7 available</p>
              <p><strong>Email Support:</strong> support@ecomstore.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Response Time:</strong> Usually within 2 hours</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
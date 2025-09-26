import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Send, Search, MoveVertical as MoreVertical } from 'lucide-react-native';

export default function ChatScreen() {
  const { user } = useAuth();
  const isTrainer = user?.type === 'trainer';
  const [selectedChat, setSelectedChat] = useState<number | null>(1);
  const [message, setMessage] = useState('');

  const mockChats = isTrainer 
    ? [
        { id: 1, name: 'María García', lastMessage: 'Perfecto, nos vemos mañana', time: '10:30', unread: 2 },
        { id: 2, name: 'Juan Pérez', lastMessage: '¿Podemos cambiar la hora?', time: '09:15', unread: 0 },
        { id: 3, name: 'Ana Silva', lastMessage: 'Gracias por la rutina', time: 'Ayer', unread: 1 },
      ]
    : [
        { id: 1, name: 'Carlos Martínez', lastMessage: 'Te veo en 30 minutos', time: '10:30', unread: 1 },
        { id: 2, name: 'Ana López', lastMessage: 'Excelente progreso esta semana', time: 'Ayer', unread: 0 },
      ];

  const mockMessages = [
    { id: 1, text: 'Hola! ¿Cómo va todo?', sent: false, time: '10:25' },
    { id: 2, text: 'Todo bien! Listo para la sesión de hoy', sent: true, time: '10:26' },
    { id: 3, text: 'Perfecto, nos vemos en 30 minutos', sent: false, time: '10:30' },
  ];

  const sendMessage = () => {
    if (message.trim()) {
      // Aquí se enviaría el mensaje
      setMessage('');
    }
  };

  if (!selectedChat) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mensajes</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Search color="#84cc16" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.chatsList}>
          {mockChats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              style={styles.chatItem}
              onPress={() => setSelectedChat(chat.id)}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{chat.name.charAt(0)}</Text>
              </View>
              <View style={styles.chatInfo}>
                <View style={styles.chatHeader}>
                  <Text style={styles.chatName}>{chat.name}</Text>
                  <Text style={styles.chatTime}>{chat.time}</Text>
                </View>
                <View style={styles.chatFooter}>
                  <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
                  {chat.unread > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadCount}>{chat.unread}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  const currentChat = mockChats.find(chat => chat.id === selectedChat);

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity 
          onPress={() => setSelectedChat(null)}
          style={styles.backButton}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.chatHeaderInfo}>
          <View style={styles.avatarSmall}>
            <Text style={styles.avatarTextSmall}>{currentChat?.name.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.chatHeaderName}>{currentChat?.name}</Text>
            <Text style={styles.chatHeaderStatus}>En línea</Text>
          </View>
        </View>
        <TouchableOpacity>
          <MoreVertical color="#84cc16" size={24} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer}>
        {mockMessages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageContainer,
              msg.sent ? styles.sentMessage : styles.receivedMessage
            ]}
          >
            <Text style={[
              styles.messageText,
              msg.sent ? styles.sentMessageText : styles.receivedMessageText
            ]}>
              {msg.text}
            </Text>
            <Text style={styles.messageTime}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#6b7280"
          multiline
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Send color="#000000" size={20} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
  },
  searchButton: {
    padding: 8,
  },
  chatsList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#84cc16',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
  },
  chatInfo: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
  },
  chatTime: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
    flex: 1,
  },
  unreadBadge: {
    backgroundColor: '#84cc16',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    fontSize: 24,
    color: '#84cc16',
    fontFamily: 'Poppins-SemiBold',
  },
  chatHeaderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarSmall: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#84cc16',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarTextSmall: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
  },
  chatHeaderName: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#ffffff',
  },
  chatHeaderStatus: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#84cc16',
    marginTop: 2,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  sentMessageText: {
    backgroundColor: '#84cc16',
    color: '#000000',
  },
  receivedMessageText: {
    backgroundColor: '#1f2937',
    color: '#ffffff',
  },
  messageTime: {
    fontSize: 10,
    fontFamily: 'Poppins-Regular',
    color: '#9ca3af',
    marginTop: 4,
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    alignItems: 'flex-end',
  },
  messageInput: {
    flex: 1,
    backgroundColor: '#1f2937',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#ffffff',
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#84cc16',
    padding: 12,
    borderRadius: 20,
  },
});
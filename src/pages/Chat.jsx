import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import io from 'socket.io-client';

const socket = io(); // Conectar al servidor Socket.io en el mismo host

export default function Messenger() {
  const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState([
    { id: 1, name: "Sofia Davis", lastActive: "2h", avatar: "/placeholder-user.jpg" },
    { id: 2, name: "Alex Johnson", lastActive: "45m", avatar: "/placeholder-user.jpg" },
    { id: 3, name: "Maria Gonzalez", lastActive: "1h", avatar: "/placeholder-user.jpg" },
    { id: 4, name: "Kevin Brown", lastActive: "3h", avatar: "/placeholder-user.jpg" },
    { id: 5, name: "Lily White", lastActive: "30m", avatar: "/placeholder-user.jpg" }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [activeChat, setActiveChat] = useState(null); // Estado para almacenar el chat activo
  const [messages, setMessages] = useState({}); // Estado para almacenar los mensajes de cada chat
  const [currentUser, setCurrentUser] = useState({
    username: "John Doe", // Nombre del usuario actual (ajustar según tu lógica)
    lastSeen: "Ahora mismo" // Última conexión del usuario actual (ajustar según tu lógica)
  });
  const messagesEndRef = useRef(null); // Referencia al final del contenedor de mensajes

  useEffect(() => {
    // Recuperar los mensajes guardados del almacenamiento local al cargar la página
    const storedMessages = JSON.parse(localStorage.getItem('storedMessages')) || {};
    setMessages(storedMessages);

    // Inicialmente mostrar todos los contactos
    setFilteredContacts(contacts);
  }, [contacts]); // Agregar 'contacts' como dependencia para actualizar los contactos filtrados

  // Función para guardar los mensajes en el almacenamiento local
  useEffect(() => {
    localStorage.setItem('storedMessages', JSON.stringify(messages));
  }, [messages]);

  // Función para actualizar el estado de los mensajes cuando se envía uno nuevo
  const updateMessages = (userId, newMessage) => {
    setMessages(prevMessages => ({
      ...prevMessages,
      [userId]: [...(prevMessages[userId] || []), newMessage]
    }));

    // Actualizar el último mensaje y la última actividad del contacto
    const updatedContacts = contacts.map(contact => {
      if (contact.id === userId) {
        return {
          ...contact,
          lastMessage: newMessage.messageText,
          lastActive: formatTime(new Date()) // Actualizar la hora actual formateada
        };
      }
      return contact;
    });

    setContacts(updatedContacts);
  };

  // Función para formatear la hora en formato hh:mm
  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  };

  // Función para manejar el envío de mensajes
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!message.trim() || !activeChat) return;

    const newMessage = {
      senderId: 1, // ID del usuario actual (ajústalo según tu lógica)
      receiverId: activeChat,
      messageText: message,
      timestamp: new Date().toISOString()
    };

    // Enviar el mensaje al servidor usando Socket.io
    socket.emit('sendMessage', newMessage);

    // Actualizar el estado local de los mensajes
    updateMessages(activeChat, newMessage);

    // Limpiar el campo de mensaje
    setMessage("");
  };

  // Función para manejar el cambio de chat al hacer clic en un contacto
  const handleContactClick = (userId) => {
    setActiveChat(userId);
  };

  // Función para manejar la búsqueda de contactos
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  // Función para hacer scroll al final del contenedor de mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Efecto para hacer scroll al final del contenedor de mensajes cuando se actualizan los mensajes
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Efecto para recibir mensajes del servidor
  useEffect(() => {
    socket.on('message', (message) => {
      // Manejar el mensaje recibido del servidor
      console.log('Mensaje recibido:', message);

      // Actualizar el estado local de los mensajes
      updateMessages(message.senderId, message);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  // Mostrar el componente
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-[300px_1fr] rounded-lg overflow-hidden border">
      <div className="bg-gray-200 p-3 border-r">
        <div className="flex items-center justify-between space-x-4">
          <div className="font-medium text-sm">Messenger</div>
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
            <PenIcon className="h-4 w-4" />
            <span className="sr-only">New message</span>
          </Button>
        </div>
        <div className="py-4">
          <form>
            <Input
              placeholder="Search"
              className="h-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>
        </div>
        <div className="grid gap-2 overflow-y-auto max-h-96">
          {filteredContacts.map(contact => (
            <div
              key={contact.id}
              className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 cursor-pointer ${activeChat === contact.id ? 'bg-gray-100' : ''}`}
              onClick={() => handleContactClick(contact.id)}
            >
              <Avatar className="border w-10 h-10">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name.substr(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <p className="text-sm font-medium leading-none">{contact.name}</p>
                <p className="text-xs text-gray-600">{contact.lastMessage}</p>
                {activeChat === contact.id && (
                  <p className="text-xs text-gray-600">{contact.lastActive}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col relative">
        <div className="bg-white border-b p-4">
          <h2 className="text-lg font-bold">{activeChat ? contacts.find(contact => contact.id === activeChat).name : "Selecciona un chat"}</h2>
          {activeChat && (
            <p className="text-sm text-gray-500">Última conexión: {currentUser.lastSeen}</p>
          )}
        </div>
        <div className="overflow-y-auto flex-1 p-3">
          {activeChat ? (
            <>
              {messages[activeChat]?.map((msg, index) => (
                <div key={index} className={`flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ${msg.senderId === 1 ? 'ml-auto bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-700'}`}>
                  {msg.messageText}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              Seleccione un chat para empezar
            </div>
          )}
        </div>
        <div className="border-t">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-3">
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" size="icon">
              <span className="sr-only">Send</span>
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Icono de lápiz
function PenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

// Icono de enviar
function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

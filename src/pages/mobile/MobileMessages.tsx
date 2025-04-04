
import React from 'react';
import { Search } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';

const MobileMessages: React.FC = () => {
  // Dados de exemplo para as mensagens
  const conversations = [
    {
      id: 1,
      name: "Dra. Maria Silva",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      lastMessage: "Seus exames estão normais, mas gostaria de discutir alguns detalhes na próxima consulta.",
      time: "10:23",
      unread: true
    },
    {
      id: 2,
      name: "Dr. Carlos Mendes",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      lastMessage: "Lembre-se de aplicar o creme conforme orientado.",
      time: "Ontem",
      unread: false
    },
    {
      id: 3,
      name: "Dra. Ana Beatriz",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      lastMessage: "Podemos remarcar sua consulta para a próxima semana?",
      time: "Seg",
      unread: false
    },
    {
      id: 4,
      name: "Dr. Roberto Almeida",
      avatar: "https://randomuser.me/api/portraits/men/76.jpg",
      lastMessage: "Os resultados dos seus exames já estão disponíveis.",
      time: "23/03",
      unread: false
    }
  ];

  return (
    <MobileLayout title="Mensagens">
      <div className="p-4">
        {/* Barra de pesquisa */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Buscar mensagens"
          />
        </div>

        {/* Lista de conversas */}
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <Link 
              key={conversation.id} 
              to={`/mobile/messages/${conversation.id}`}
              className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="h-12 w-12 rounded-full"
                />
                {conversation.unread && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-medappt-primary rounded-full border-2 border-white"></span>
                )}
              </div>

              <div className="flex-1 min-w-0 ml-4">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {conversation.name}
                  </h4>
                  <span className={`text-xs ${conversation.unread ? 'text-medappt-primary font-medium' : 'text-muted-foreground'}`}>
                    {conversation.time}
                  </span>
                </div>
                <p className={`text-sm truncate mt-1 ${conversation.unread ? 'text-gray-800 font-medium' : 'text-muted-foreground'}`}>
                  {conversation.lastMessage}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileMessages;

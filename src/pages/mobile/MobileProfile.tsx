
import React from 'react';
import { User, Settings, FileText, Bell, Shield, HelpCircle } from 'lucide-react';
import MobileLayout from '@/components/layout/MobileLayout';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom';

const MobileProfile: React.FC = () => {
  const profileSections = [
    {
      title: 'Conta',
      items: [
        { name: 'Informações Pessoais', icon: User, path: '/mobile/profile/personal-info' },
        { name: 'Configurações', icon: Settings, path: '/mobile/profile/settings' },
        { name: 'Meu Prontuário', icon: FileText, path: '/mobile/profile/medical-records' }
      ]
    },
    {
      title: 'Preferências',
      items: [
        { name: 'Notificações', icon: Bell, path: '/mobile/profile/notifications' },
        { name: 'Privacidade', icon: Shield, path: '/mobile/profile/privacy' }
      ]
    },
    {
      title: 'Suporte',
      items: [
        { name: 'Ajuda', icon: HelpCircle, path: '/mobile/help' }
      ]
    }
  ];

  return (
    <MobileLayout title="Meu Perfil">
      <div className="p-4 space-y-6">
        {/* Seção do perfil */}
        <div className="flex flex-col items-center py-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" alt="João Paulo" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">João Paulo Silva</h2>
          <p className="text-muted-foreground">joao@example.com</p>
          <Button variant="outline" size="sm" className="mt-4">
            Editar Perfil
          </Button>
        </div>

        <Separator />
        
        {/* Seções do menu de perfil */}
        {profileSections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">{section.title}</h3>
            <div className="space-y-1 rounded-md bg-white">
              {section.items.map((item) => (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className="flex items-center justify-between py-3 px-4 rounded-md hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <item.icon className="h-5 w-5 text-medappt-primary mr-3" />
                    <span>{item.name}</span>
                  </div>
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <Separator />

        <div className="pt-4">
          <Button variant="destructive" className="w-full">
            Sair da conta
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default MobileProfile;

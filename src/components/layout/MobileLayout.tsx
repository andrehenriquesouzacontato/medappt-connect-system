
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, User, MessageSquare, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MobileLayoutProps {
  children: React.ReactNode;
  title: string;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, title }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Início', path: '/mobile', icon: Home },
    { name: 'Consultas', path: '/mobile/appointments', icon: Calendar },
    { name: 'Perfil', path: '/mobile/profile', icon: User },
    { name: 'Mensagens', path: '/mobile/messages', icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col h-svh bg-gray-50">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 w-full bg-white border-b">
        <div className="flex items-center justify-between h-14 px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px]">
              <SheetHeader className="pb-4 border-b">
                <SheetTitle>MedAppt</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="flex items-center px-2 py-4 mb-2">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>JP</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">João Paulo</p>
                    <p className="text-xs text-muted-foreground">joao@example.com</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center px-3 py-2 rounded-md text-sm ${
                        location.pathname === item.path
                          ? 'bg-medappt-light text-medappt-primary font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    to="/login"
                    className="flex items-center px-3 py-2 mt-4 rounded-md text-sm text-red-600 hover:bg-red-50"
                  >
                    <svg
                      className="h-5 w-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sair
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          
          <h1 className="text-lg font-semibold">{title}</h1>
          
          <Button variant="ghost" size="icon">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="sticky bottom-0 z-40 w-full bg-white border-t">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center text-xs ${
                location.pathname === item.path
                  ? 'text-medappt-primary'
                  : 'text-gray-500 hover:text-medappt-primary'
              }`}
            >
              <item.icon className={`h-5 w-5 mb-1 ${
                location.pathname === item.path ? 'text-medappt-primary' : 'text-gray-500'
              }`} />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;

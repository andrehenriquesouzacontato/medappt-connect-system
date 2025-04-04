
import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, HomeIcon, Settings, Users, UserRound } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isSidebarOpen: boolean;
}

const Sidebar = ({ isSidebarOpen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Consultas",
      href: "/appointments",
      icon: Calendar,
    },
    {
      name: "Médicos",
      href: "/doctors",
      icon: UserRound,
    },
    {
      name: "Pacientes",
      href: "/patients",
      icon: Users,
    },
    {
      name: "Configurações",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-30 h-screen flex-col bg-sidebar border-r transition-all duration-300 ease-in-out",
        isSidebarOpen ? "flex" : "hidden lg:flex",
        isCollapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="h-16 flex items-center justify-between px-4">
        {!isCollapsed && (
          <span className="font-bold text-xl text-primary">MedAppt</span>
        )}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0",
            isCollapsed && "ml-auto mr-auto"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex flex-col gap-1 px-2 py-4 flex-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={location.pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "justify-start h-10",
              location.pathname === item.href && "bg-accent/50"
            )}
            onClick={() => navigate(item.href)}
          >
            <item.icon className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")} />
            {!isCollapsed && <span>{item.name}</span>}
          </Button>
        ))}
      </div>

      <div className="py-4 px-2 border-t">
        <Button 
          variant="outline"
          className="w-full justify-start"
          onClick={() => navigate('/login')}
        >
          <svg
            className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")}
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          {!isCollapsed && <span>Sair</span>}
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;


import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface DeviceRedirectProps {
  children: React.ReactNode;
}

export function DeviceRedirect({ children }: DeviceRedirectProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const path = location.pathname;

    // Se estiver na rota raiz, redirecionar com base no dispositivo
    if (path === '/') {
      if (isMobile) {
        navigate('/mobile', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
      return;
    }

    // Se estiver em rota de admin no mobile
    if (isMobile && !path.startsWith('/mobile') && 
        ['/dashboard', '/doctors', '/appointments', '/patients', '/profile'].some(
          adminRoute => path === adminRoute || path.startsWith(`${adminRoute}/`)
        )) {
      navigate('/mobile', { replace: true });
      return;
    }

    // Se estiver em rota mobile no desktop
    if (!isMobile && path.startsWith('/mobile')) {
      navigate('/dashboard', { replace: true });
      return;
    }
  }, [isMobile, location.pathname, navigate]);

  return <>{children}</>;
}

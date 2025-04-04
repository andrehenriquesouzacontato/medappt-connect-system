
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import MobileHome from "./pages/mobile/MobileHome";
import MobileAppointments from "./pages/mobile/MobileAppointments";
import MobileProfile from "./pages/mobile/MobileProfile";
import MobileMessages from "./pages/mobile/MobileMessages";
import MobileNewAppointment from "./pages/mobile/MobileNewAppointment";
import MobileDoctors from "./pages/mobile/MobileDoctors";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Rotas do painel admin */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* Rotas mobile */}
          <Route path="/mobile" element={<MobileHome />} />
          <Route path="/mobile/appointments" element={<MobileAppointments />} />
          <Route path="/mobile/appointments/new" element={<MobileNewAppointment />} />
          <Route path="/mobile/profile" element={<MobileProfile />} />
          <Route path="/mobile/messages" element={<MobileMessages />} />
          <Route path="/mobile/doctors" element={<MobileDoctors />} />
          
          {/* Rota de fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

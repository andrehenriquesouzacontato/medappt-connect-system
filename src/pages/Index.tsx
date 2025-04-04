
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { doctors } from "@/lib/mockData";
import { CalendarDays, MessageSquare, Phone, ShieldCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-medappt-primary">MedAppt Connect</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium hover:text-medappt-primary">Funcionalidades</a>
            <a href="#doctors" className="text-sm font-medium hover:text-medappt-primary">Médicos</a>
            <a href="#about" className="text-sm font-medium hover:text-medappt-primary">Sobre</a>
            <a href="#contact" className="text-sm font-medium hover:text-medappt-primary">Contato</a>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Cadastrar</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-medappt-primary to-medappt-secondary text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">
                Sistema completo de gestão para sua clínica médica
              </h1>
              <p className="text-muted-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Integre agendamentos, gestão clínica e comunicação com pacientes através do nosso sistema completo para clínicas e consultórios.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full md:w-auto bg-white text-medappt-primary hover:bg-white/90">
                    Acessar Demo
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="w-full md:w-auto text-white border-white hover:bg-white/10">
                    Começar Agora
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 w-full max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" 
                alt="Dashboard do MedAppt" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Funcionalidades principais
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
              Tudo o que você precisa para gerenciar sua clínica médica de forma eficiente
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-medappt-light flex items-center justify-center mb-4">
                <CalendarDays className="h-6 w-6 text-medappt-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Agendamento Online</h3>
              <p className="text-muted-foreground">
                Pacientes podem marcar, reagendar e cancelar consultas diretamente pelo aplicativo móvel.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-medappt-light flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-medappt-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Chatbot WhatsApp</h3>
              <p className="text-muted-foreground">
                Confirmação automática de consultas e lembretes enviados diretamente via WhatsApp.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-medappt-light flex items-center justify-center mb-4">
                <ShieldCheck className="h-6 w-6 text-medappt-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Prontuário Eletrônico</h3>
              <p className="text-muted-foreground">
                Histórico médico completo, receitas e exames organizados e acessíveis de forma segura.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section id="doctors" className="py-12 md:py-24 bg-medappt-light/50">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Nossa equipe médica
            </h2>
            <p className="text-muted-foreground md:text-xl max-w-3xl mx-auto">
              Profissionais qualificados prontos para atender você
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="flex flex-col items-center text-center p-6 rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={doctor.avatar} alt={doctor.name} />
                  <AvatarFallback>{doctor.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-bold">{doctor.name}</h3>
                <p className="text-medappt-primary font-medium mb-2">{doctor.specialty}</p>
                <p className="text-sm text-muted-foreground line-clamp-3">{doctor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Sobre o MedAppt Connect
              </h2>
              <p className="text-muted-foreground md:text-xl">
                O MedAppt Connect é um sistema completo para gestão de clínicas médicas, integrando um aplicativo mobile para pacientes, um painel administrativo web e um chatbot para confirmação de consultas.
              </p>
              <p className="text-muted-foreground">
                Nosso objetivo é facilitar a comunicação entre médicos e pacientes, otimizar o agendamento de consultas e melhorar a experiência dos pacientes.
              </p>
              <p className="text-muted-foreground">
                Desenvolvido com tecnologias modernas como React, Java Spring Boot e Python, garantimos um sistema estável, seguro e eficiente.
              </p>
            </div>
            <div className="mx-auto lg:mx-0 max-w-[500px] aspect-video rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=2070&auto=format&fit=crop" 
                alt="Equipe médica utilizando o sistema" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 md:py-24 bg-medappt-primary text-white">
        <div className="container px-4 md:px-6">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Entre em contato
            </h2>
            <p className="md:text-xl max-w-3xl mx-auto">
              Estamos prontos para ajudar sua clínica a crescer. Entre em contato conosco.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3 items-center max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-4">
              <Phone className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Telefone</h3>
              <p>+55 11 99999-0000</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <MessageSquare className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p>contato@medappt.com</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <CalendarDays className="h-10 w-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">Horário</h3>
              <p>Segunda a Sexta, 8h às 18h</p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/register">
              <Button size="lg" className="bg-white text-medappt-primary hover:bg-white/90">
                Comece agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container px-4 md:px-6 py-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-xl font-bold text-medappt-primary mb-4">MedAppt Connect</div>
              <p className="text-muted-foreground">
                Sistema completo de gestão para clínicas médicas, integrando agendamentos online, gestão administrativa e comunicação com pacientes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground">Funcionalidades</a></li>
                <li><a href="#doctors" className="text-muted-foreground hover:text-foreground">Médicos</a></li>
                <li><a href="#about" className="text-muted-foreground hover:text-foreground">Sobre</a></li>
                <li><a href="#contact" className="text-muted-foreground hover:text-foreground">Contato</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Produtos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Aplicativo Móvel</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Painel Administrativo</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Chatbot WhatsApp</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">API para Integração</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Termos de Serviço</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Política de Privacidade</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center border-t mt-8 pt-8">
            <p className="text-muted-foreground text-sm mb-4 sm:mb-0">
              © 2025 MedAppt Connect. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

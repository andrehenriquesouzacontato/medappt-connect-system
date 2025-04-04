
import { Link } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-medappt-primary to-medappt-secondary">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-medappt-primary">MedAppt Connect</h1>
          <p className="text-gray-600 mt-2">Faça login para acessar o sistema</p>
        </div>
        <LoginForm />
        <div className="mt-6 text-center text-sm text-gray-600">
          <Link to="/" className="text-medappt-primary hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

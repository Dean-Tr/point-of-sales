import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-blue-600 h-screen w-screen p-6">
      <h1 className="text-3xl font-bold uppercase text-center text-white">POINT OF SALES</h1>

      <LoginForm />
    </div>
  );
};

export default LoginPage;

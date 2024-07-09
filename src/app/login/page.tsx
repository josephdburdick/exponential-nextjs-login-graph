import PageHeader from "@/components/global/PageHeader";
import LoginForm from "./_components/LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <PageHeader>Login</PageHeader>

      <LoginForm />
    </div>
  );
};

export default Login;

import PageHeader from "@/components/global/PageHeader"

import LoginForm from "./_components/LoginForm"

const Login = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <PageHeader>Login</PageHeader>
      <LoginForm />
    </div>
  )
}

export default Login

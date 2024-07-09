import PageHeader from "@/components/global/PageHeader"

import DashboardChart from "./_components/DashboardChart"

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <PageHeader>Dashboard</PageHeader>
      <div className="container">
        <DashboardChart />
      </div>
    </div>
  )
}

export default Dashboard

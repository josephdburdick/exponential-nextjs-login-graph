import PageHeader from '@/components/global/PageHeader'

import DashboardChart from './_components/DashboardChart'

const Dashboard = () => {
  return (
    <div className="container">
      <PageHeader>Dashboard</PageHeader>
      <DashboardChart />
    </div>
  )
}

export default Dashboard

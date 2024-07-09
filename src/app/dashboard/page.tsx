import PageHeader from '@/components/global/PageHeader'
import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import DashboardChart from './_components/DashboardChart'

const Dashboard = () => {
  return (
    <div className="container">
      <PageHeader>Dashboard</PageHeader>
      <DashboardChart />

      {/* <ChartContainer children={undefined} config={undefined}>
        <BarChart data={data}>
          <Bar dataKey="value" />
          <ChartTooltip content={<ChartTooltipContent />} />
        </BarChart>
      </ChartContainer> */}
    </div>
  )
}

export default Dashboard

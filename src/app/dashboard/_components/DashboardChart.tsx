'use client'

import { useAuth } from '@/components/context/AuthContext'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useState, useEffect } from 'react'
import { XAxis, Legend, CartesianGrid, BarChart, Bar } from 'recharts'

interface DataPoint {
  date: string
  apy: number
  tvl: number
}

interface GraphData {
  series: DataPoint[]
}

export default function DashboardChart() {
  const { user } = useAuth()
  const [data, setData] = useState<GraphData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/graph-data')
      const { data } = await response.json()
      setData(data)
    }
    if (!user) return

    fetchData()
  }, [user])

  if (!user) return <div>Please log in to view the dashboard.</div>
  if (!data) return <div>Loading...</div>

  const chartData = data.series.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(),
    apy: parseFloat(entry.apy.toString()),
    tvl: parseFloat(entry.tvl.toString()),
  }))

  const chartConfig = {
    desktop: {
      label: 'apy',
      color: '#2563eb',
    },
    mobile: {
      label: 'tvl',
      color: '#60a5fa',
    },
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} strokeDasharray={'3 3'} />

        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <ChartTooltip />
        <Legend />
        <Bar dataKey="apy" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="tvl" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

"use client";

import { useAuth } from "@/components/context/AuthContext";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

interface DataPoint {
  date: string;
  apy: number;
  tvl: number;
}

interface GraphData {
  series: DataPoint[];
}

export default function DashboardChart() {
  const { user } = useAuth();
  const [data, setData] = useState<GraphData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/graph-data");
      const { data } = await response.json();
      setData(data);
    };
    if (!user) return;

    fetchData();
  }, [user]);

  if (!user) return <div>Please log in to view the dashboard.</div>;
  if (!data) return <div>Loading...</div>;

  const chartData = data.series.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(),
    apy: parseFloat(entry.apy.toString()),
    tvl: parseFloat(entry.tvl.toString()),
  }));

  const chartConfig = {} satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <LineChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} strokeDasharray={"3 3"} />

        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis dataKey="apy" />
        <ChartTooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="apy"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="tvl" stroke="#82ca9d" />
      </LineChart>
    </ChartContainer>
  );
}

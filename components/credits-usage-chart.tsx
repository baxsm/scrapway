"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChartColumnStacked } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { getCreditsUsageInPeriod } from "@/actions/analytics";

interface CreditsUsageChartProps {
  data: Awaited<ReturnType<typeof getCreditsUsageInPeriod>>;
  title: string;
  description: string;
}

const CreditsUsageChart: FC<CreditsUsageChartProps> = ({
  data,
  description,
  title,
}) => {
  const chartConfig: ChartConfig = {
    success: {
      label: "Successful Phases Credits",
      color: "hsl(var(--chart-2))",
    },
    failed: {
      label: "Failed Phases Credits",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ChartColumnStacked className="w-6 h-6 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-[200px] w-full" config={chartConfig}>
          <BarChart
            data={data}
            height={200}
            accessibilityLayer
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <ChartTooltip
              content={<ChartTooltipContent className="w-[250px]" />}
            />
            <Bar
              dataKey="success"
              fill="var(--color-success)"
              fillOpacity={0.8}
              stroke="var(--color-success)"
              stackId="a"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="failed"
              fill="var(--color-failed)"
              fillOpacity={0.8}
              stroke="var(--color-failed)"
              stackId="a"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CreditsUsageChart;

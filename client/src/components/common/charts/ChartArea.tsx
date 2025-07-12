import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { MonthlyBreakdown } from '@/types';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import EmptyChartState from './EmptyChartState';

const ChartArea = ({
  monthlyBreakdown,
}: {
  monthlyBreakdown: MonthlyBreakdown[];
}) => {
  const chartData = monthlyBreakdown.map((data) => ({
    date: data.month,
    hours: data.hours,
    activities: data.count,
  }));

  const chartConfig = {
    date: {
      label: 'Activities',
      color: 'var(--chart-5)',
    },
    hours: {
      label: 'Hours',
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;

  const firstDate = chartData?.[0]?.date;
  const lastDate = chartData?.[chartData.length - 1]?.date;

  const formattedFirst = new Date(firstDate).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
  const formattedLast = new Date(lastDate).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-600 font-roboto">
        Monthly Activities Hours
      </h3>
      {!chartData || chartData.length === 0 ? (
        <EmptyChartState
          title="No Activity Data Yet"
          description="Start tracking your activities to see monthly hours and activity
          counts displayed here."
        />
      ) : (
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
                  className="rounded-md border bg-white p-3 shadow-sm text-sm text-gray-600"
                />
              }
            />
            <Area
              type="monotone"
              dataKey="hours"
              fill="var(--chart-1)"
              fillOpacity={0.4}
              stroke="var(--chart-1)"
            />
            <Area
              dataKey="activities"
              type="monotone"
              fill="var(--chart-5)"
              fillOpacity={0.4}
              stroke="var(--chart-5)"
            />
          </AreaChart>
        </ChartContainer>
      )}
      <div
        style={{ color: 'var(--chart-10)' }}
        className=" text-center gap-2 leading-none font-medium font-roboto text-sm mt-6"
      >
        {`Showing data from ${formattedFirst} to ${formattedLast}`}
      </div>
    </div>
  );
};

export default ChartArea;

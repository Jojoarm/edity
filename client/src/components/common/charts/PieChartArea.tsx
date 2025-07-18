import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { Distribution } from '@/types';
import { Pie, PieChart, type PieLabelRenderProps } from 'recharts';
import EmptyChartState from './EmptyChartState';

const PieChartArea = ({
  typeDistribution,
}: {
  typeDistribution: Distribution[];
}) => {
  const chartData = typeDistribution?.map(
    (style: Distribution, index: number) => ({
      option: style.type,
      count: style.percentage,
      fill: `var(--chart-${index})`,
    })
  );

  const chartConfig: ChartConfig = Object.fromEntries(
    typeDistribution.map((style, index) => [
      style.type,
      {
        label: style.type,
        color: `hsl(var(--chart-${index}))`,
      },
    ])
  );

  const renderCustomLabel = (entry: PieLabelRenderProps) =>
    `${entry.option}: ${entry.count.toFixed(0)}%`;

  return (
    <div className="bg-white flex flex-col gap-2 justify-between rounded-lg shadow-sm border border-gray-200 p-2 md:p-6">
      <h3 className="text-lg font-semibold text-gray-600 mb-4 font-roboto">
        Activity Types Distribution
      </h3>
      {!chartData || chartData.length === 0 ? (
        <EmptyChartState
          title="No Activity Data Yet"
          description="Start tracking your activities to see your activity type distribution displayed here."
        />
      ) : (
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="option"
              innerRadius={30}
              label={renderCustomLabel}
            />
            <ChartLegend
              content={<ChartLegendContent nameKey={'option'} />}
              className="mt-7 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      )}
      <div
        style={{ color: 'var(--chart-10)' }}
        className="text-center gap-2 leading-none font-medium font-roboto text-xs sm:text-sm mt-6"
      >
        Visual breakdown of the various types of professional development
        activities completed over time.
      </div>
    </div>
  );
};

export default PieChartArea;

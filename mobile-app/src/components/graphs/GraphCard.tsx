import { ChartDataPoint } from 'components/graphs/chartUtils';
import WlbButtonGroup from 'components/WlbButtonGroup';
import WlbCard from 'components/WlbCard';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

type Period = '3months' | '1year' | '';

const filterDataByPeriod = (
  data: ChartDataPoint[],
  period?: Period,
): ChartDataPoint[] => {
  if (!period) return data;

  const now = Date.now();
  let cutoffDate: number;

  switch (period) {
    case '3months':
      cutoffDate = now - 3 * 30 * 24 * 60 * 60 * 1000;
      break;
    case '1year':
      cutoffDate = now - 365 * 24 * 60 * 60 * 1000;
      break;
    default:
      return data;
  }

  return data.filter((item) => item.date >= cutoffDate);
};

export default function GraphCard({
  data,
  GraphComponent,
  children,
}: {
  data: {
    value: string;
    label: string;
    data: ChartDataPoint[];
    valueFormatter?: (value: number) => string;
  }[];
  GraphComponent: React.ComponentType<{
    data: ChartDataPoint[];
    valueFormatter?: (value: number) => string;
  }>;
  children?: (data: ChartDataPoint[]) => React.ReactNode;
}) {
  const [period, setPeriod] = useState<Period>('3months');
  const [selectedGraph, setSelectedGraph] = useState<string>();

  const selectedData = useMemo(
    () => data.find((graph) => graph.value === selectedGraph) ?? data[0],
    [data, selectedGraph],
  );

  const filteredData = useMemo(() => {
    return filterDataByPeriod(selectedData.data, period);
  }, [selectedData.data, period]);

  return (
    <>
      <WlbCard
        title={selectedData.label}
        titleRight={
          <WlbButtonGroup
            options={
              [
                { label: '3M', value: '3months' },
                { label: '1Y', value: '1year' },
                { label: 'All', value: '' },
              ] as const
            }
            size="small"
            value={period}
            onChange={setPeriod}
          />
        }
      >
        <View style={{ gap: 12 }}>
          <GraphComponent
            data={filteredData}
            valueFormatter={selectedData.valueFormatter}
          />
          <WlbButtonGroup
            options={data.map((graph) => ({
              label: graph.label,
              value: graph.value,
            }))}
            value={selectedGraph ?? data[0].value}
            onChange={setSelectedGraph}
            scrollable
            size="small"
          />
        </View>
      </WlbCard>
      {children?.(filteredData)}
    </>
  );
}

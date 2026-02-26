import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

interface DevicesChartProps {
  devices: { type: string; count: number; percentage: number }[] | undefined;
  browsers: { name: string; count: number; percentage: number }[] | undefined;
  isLoading: boolean;
}

const DEVICE_COLORS = {
  desktop: 'hsl(var(--primary))',
  mobile: 'hsl(var(--chart-2))',
  tablet: 'hsl(var(--chart-3))',
  unknown: 'hsl(var(--muted))',
};

const DEVICE_ICONS = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
};

export function DevicesChart({ devices, browsers, isLoading }: DevicesChartProps) {
  const deviceData = devices?.map(d => ({
    ...d,
    fill: DEVICE_COLORS[d.type as keyof typeof DEVICE_COLORS] || DEVICE_COLORS.unknown,
  })) || [];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Devices */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Devices</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : devices && devices.length > 0 ? (
            <div className="space-y-4">
              {devices.map((device) => {
                const Icon = DEVICE_ICONS[device.type as keyof typeof DEVICE_ICONS] || Monitor;
                return (
                  <div key={device.type} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="text-sm capitalize">{device.type}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{device.percentage.toFixed(1)}%</span>
                      <span className="text-xs text-muted-foreground ml-2">({device.count})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No device data</p>
          )}
        </CardContent>
      </Card>

      {/* Browsers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Browsers</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-[200px] w-full" />
          ) : browsers && browsers.length > 0 ? (
            <div className="space-y-3">
              {browsers.slice(0, 5).map((browser, index) => (
                <div key={browser.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{browser.name}</span>
                    <span className="font-medium">{browser.percentage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${browser.percentage}%`, opacity: 1 - index * 0.15 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No browser data</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

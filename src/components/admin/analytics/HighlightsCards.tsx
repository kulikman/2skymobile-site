import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, Users, FileText, TrendingUp, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HighlightsCardsProps {
  data: {
    totalViews: number;
    totalSessions: number;
    uniquePaths: number;
    totalConversions: number;
    conversionRate: number;
    viewsChange: number;
    sessionsChange: number;
  } | undefined;
  isLoading: boolean;
  period: number;
}

const MetricCard = ({
  title,
  value,
  change,
  icon: Icon,
  subtitle,
  isLoading,
}: {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  subtitle: string;
  isLoading: boolean;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <Skeleton className="h-8 w-24" />
      ) : (
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold">{value}</div>
          {change !== undefined && (
            <span
              className={cn(
                'text-xs font-medium',
                change > 0 ? 'text-green-500' : change < 0 ? 'text-red-500' : 'text-muted-foreground'
              )}
            >
              {change > 0 ? '+' : ''}{change.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </CardContent>
  </Card>
);

export function HighlightsCards({ data, isLoading, period }: HighlightsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <MetricCard
        title="Page Views"
        value={data?.totalViews.toLocaleString() ?? 0}
        change={data?.viewsChange}
        icon={Eye}
        subtitle={`Last ${period} days`}
        isLoading={isLoading}
      />
      <MetricCard
        title="Sessions"
        value={data?.totalSessions.toLocaleString() ?? 0}
        change={data?.sessionsChange}
        icon={Users}
        subtitle="Unique visits"
        isLoading={isLoading}
      />
      <MetricCard
        title="Pages Visited"
        value={data?.uniquePaths ?? 0}
        icon={FileText}
        subtitle="Unique pages"
        isLoading={isLoading}
      />
      <MetricCard
        title="Conversions"
        value={data?.totalConversions ?? 0}
        icon={Target}
        subtitle="Total events"
        isLoading={isLoading}
      />
      <MetricCard
        title="Conversion Rate"
        value={`${(data?.conversionRate ?? 0).toFixed(2)}%`}
        icon={TrendingUp}
        subtitle="Events / sessions"
        isLoading={isLoading}
      />
    </div>
  );
}

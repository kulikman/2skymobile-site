import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Target } from 'lucide-react';

interface ConversionsTableProps {
  data: {
    event_type: string;
    count: number;
    rate: number;
    topSource: string;
  }[] | undefined;
  isLoading: boolean;
}

const EVENT_LABELS: Record<string, string> = {
  cta_click: 'CTA Click',
  contact_submit: 'Contact Form',
  demo_request_submit: 'Demo Request',
  outbound_click: 'Outbound Click',
  download_pdf: 'PDF Download',
};

export function ConversionsTable({ data, isLoading }: ConversionsTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Conversions</CardTitle>
            <CardDescription>Event tracking breakdown</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="space-y-3">
            <div className="grid grid-cols-4 text-xs font-medium text-muted-foreground pb-2 border-b">
              <span>Event</span>
              <span className="text-right">Count</span>
              <span className="text-right">Rate</span>
              <span className="text-right">Top Source</span>
            </div>
            {data.map((conversion) => (
              <div key={conversion.event_type} className="grid grid-cols-4 items-center py-2">
                <span className="text-sm font-medium">
                  {EVENT_LABELS[conversion.event_type] || conversion.event_type}
                </span>
                <span className="text-sm text-right">{conversion.count}</span>
                <span className="text-sm text-right">{conversion.rate.toFixed(2)}%</span>
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs">
                    {conversion.topSource}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No conversion data yet</p>
        )}
      </CardContent>
    </Card>
  );
}

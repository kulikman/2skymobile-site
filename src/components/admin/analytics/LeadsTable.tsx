import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { Users } from 'lucide-react';

interface LeadsTableProps {
  data: {
    id: string;
    name: string | null;
    email: string | null;
    event_type: string;
    utm_source: string | null;
    created_at: string;
  }[] | undefined;
  isLoading: boolean;
}

const EVENT_BADGES: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  cta_click: { label: 'CTA', variant: 'secondary' },
  contact_submit: { label: 'Contact', variant: 'default' },
  demo_request_submit: { label: 'Demo', variant: 'default' },
  outbound_click: { label: 'Outbound', variant: 'outline' },
  download_pdf: { label: 'Download', variant: 'secondary' },
};

export function LeadsTable({ data, isLoading }: LeadsTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <div>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest conversion events</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <div className="space-y-3">
            {data.map((lead) => {
              const badge = EVENT_BADGES[lead.event_type] || { label: lead.event_type, variant: 'outline' as const };
              return (
                <div key={lead.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">
                        {lead.name || lead.email || 'Anonymous'}
                      </span>
                      <Badge variant={badge.variant} className="text-xs">
                        {badge.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {lead.utm_source && (
                        <span>via {lead.utm_source}</span>
                      )}
                      <span>
                        {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No leads yet</p>
        )}
      </CardContent>
    </Card>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRealtimeVisitors } from '@/hooks/use-realtime-visitors';
import { Activity } from 'lucide-react';

export function RealTimeWidget() {
  const { data, isLoading, isLive } = useRealtimeVisitors();

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Real-Time Visitors</CardTitle>
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-muted'}`} />
            <span className="text-xs text-muted-foreground">
              {isLive ? 'Live' : 'Connecting...'}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-20" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-3xl font-bold">{data?.count ?? 0}</div>
                <p className="text-xs text-muted-foreground">visitors now</p>
              </div>
            </div>
            
            {data?.topPages && data.topPages.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Active on:</p>
                {data.topPages.map((page) => (
                  <div key={page.page_path} className="flex items-center justify-between text-sm">
                    <span className="truncate max-w-[150px]" title={page.page_path}>
                      {page.page_path === '/' ? 'Homepage' : page.page_path}
                    </span>
                    <span className="text-muted-foreground">({page.count})</span>
                  </div>
                ))}
              </div>
            )}
            
            {(!data?.topPages || data.topPages.length === 0) && (
              <p className="text-sm text-muted-foreground">No active visitors</p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}

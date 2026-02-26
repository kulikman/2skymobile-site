import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Globe, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SourcesCardsProps {
  topPages: { page_path: string; views: number; sessions: number }[] | undefined;
  topReferrers: { referrer: string; views: number }[] | undefined;
  utmSources: { source: string; views: number }[] | undefined;
  landingPages: { page_path: string; sessions: number; conversions: number }[] | undefined;
  isLoading: boolean;
}

export function SourcesCards({ topPages, topReferrers, utmSources, landingPages, isLoading }: SourcesCardsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Top Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Top Pages</CardTitle>
          <CardDescription>Most visited pages</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : topPages && topPages.length > 0 ? (
            <div className="space-y-3">
              {topPages.map((page, index) => (
                <div key={page.page_path} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-sm font-medium text-muted-foreground w-6">
                      {index + 1}.
                    </span>
                    <span className="text-sm truncate max-w-[200px]" title={page.page_path}>
                      {page.page_path === '/' ? 'Homepage' : page.page_path}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{page.views}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No data yet</p>
          )}
        </CardContent>
      </Card>

      {/* Traffic Sources (Referrers + UTM) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Traffic Sources</CardTitle>
          <CardDescription>Where visitors come from</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* UTM Sources */}
              {utmSources && utmSources.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <LinkIcon className="w-3 h-3" /> Campaigns
                  </p>
                  {utmSources.slice(0, 3).map((source) => (
                    <div key={source.source} className="flex items-center justify-between text-sm">
                      <span className="truncate max-w-[180px]">{source.source}</span>
                      <span className="font-medium">{source.views}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Referrers */}
              {topReferrers && topReferrers.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Referrers
                  </p>
                  {topReferrers.slice(0, 5).map((ref) => (
                    <div key={ref.referrer} className="flex items-center justify-between text-sm">
                      <span className="truncate max-w-[180px]">{ref.referrer}</span>
                      <span className="font-medium">{ref.views}</span>
                    </div>
                  ))}
                </div>
              )}

              {(!topReferrers || topReferrers.length === 0) && (!utmSources || utmSources.length === 0) && (
                <p className="text-sm text-muted-foreground">No referrer data yet</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Landing Pages */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Landing Pages</CardTitle>
          <CardDescription>Entry points with conversions</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          ) : landingPages && landingPages.length > 0 ? (
            <div className="space-y-3">
              <div className="grid grid-cols-3 text-xs font-medium text-muted-foreground pb-2 border-b">
                <span>Page</span>
                <span className="text-right">Sessions</span>
                <span className="text-right">Conv.</span>
              </div>
              {landingPages.map((page) => (
                <div key={page.page_path} className="grid grid-cols-3 items-center text-sm">
                  <span className="truncate" title={page.page_path}>
                    {page.page_path === '/' ? 'Homepage' : page.page_path}
                  </span>
                  <span className="text-right">{page.sessions}</span>
                  <span className="text-right font-medium">{page.conversions}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No landing page data</p>
          )}
        </CardContent>
      </Card>

      {/* News Articles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Top News Articles</CardTitle>
          <CardDescription>Most viewed news</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              News views shown in main analytics hook
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

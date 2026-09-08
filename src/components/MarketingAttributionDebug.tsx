"use client";

import { useState, useEffect } from "react";
import { getStoredAttribution, clearAttribution, type MarketingAttribution } from "@/lib/marketingAttribution";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, RefreshCw, Copy, Check } from "lucide-react";

export function MarketingAttributionDebug() {
  const [attribution, setAttribution] = useState<MarketingAttribution | null>(null);
  const [copied, setCopied] = useState(false);

  const refreshData = () => {
    setAttribution(getStoredAttribution());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleClear = () => {
    clearAttribution();
    setAttribution(null);
  };

  const handleCopy = () => {
    if (attribution) {
      navigator.clipboard.writeText(JSON.stringify(attribution, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString();
  };

  return (
    <Card className="w-full max-w-2xl" data-testid="card-attribution-debug">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Marketing Attribution Debug
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={refreshData} data-testid="button-refresh-attribution">
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={!attribution} data-testid="button-copy-attribution">
              {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button variant="destructive" size="sm" onClick={handleClear} data-testid="button-clear-attribution">
              <Trash2 className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          View and manage stored marketing attribution data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {attribution ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">UTM Parameters</h4>
                <div className="space-y-1">
                  <DataRow label="Source" value={attribution.utm_source} />
                  <DataRow label="Medium" value={attribution.utm_medium} />
                  <DataRow label="Campaign" value={attribution.utm_campaign} />
                  <DataRow label="Term" value={attribution.utm_term} />
                  <DataRow label="Content" value={attribution.utm_content} />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Ad Click IDs</h4>
                <div className="space-y-1">
                  <DataRow label="gclid" value={attribution.gclid} isClickId />
                  <DataRow label="wbraid" value={attribution.wbraid} isClickId />
                  <DataRow label="gbraid" value={attribution.gbraid} isClickId />
                  <DataRow label="msclkid" value={attribution.msclkid} isClickId />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Session Info</h4>
              <div className="space-y-1">
                <DataRow label="Landing Page" value={attribution.landingPage} />
                <DataRow label="Referrer" value={attribution.referrer} />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Timestamps</h4>
              <div className="space-y-1">
                <DataRow label="First Captured" value={formatDate(attribution.firstCaptured)} />
                <DataRow label="Last Updated" value={formatDate(attribution.lastUpdated)} />
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Current URL</h4>
              <code className="text-xs bg-muted p-2 rounded block break-all" data-testid="text-current-url">
                {typeof window !== "undefined" ? window.location.href : "N/A"}
              </code>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground" data-testid="text-no-attribution">
            No attribution data stored yet.
            <br />
            <span className="text-sm">
              Try visiting with UTM parameters: <code>?utm_source=test&utm_medium=debug</code>
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function DataRow({ label, value, isClickId = false }: { label: string; value: string | null; isClickId?: boolean }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}:</span>
      {value ? (
        <Badge variant={isClickId ? "secondary" : "default"} className="font-mono text-xs max-w-[200px] truncate" data-testid={`badge-${label.toLowerCase()}`}>
          {value}
        </Badge>
      ) : (
        <span className="text-muted-foreground/50 text-xs">—</span>
      )}
    </div>
  );
}

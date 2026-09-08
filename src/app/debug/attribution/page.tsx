import { MarketingAttributionDebug } from "@/components/MarketingAttributionDebug";

export default function AttributionDebugPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-page-title">Attribution Debug</h1>
        <p className="text-muted-foreground mb-8" data-testid="text-page-description">
          This page shows the current marketing attribution data stored in your browser.
        </p>
        <MarketingAttributionDebug />
        
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <h2 className="font-semibold mb-2">Testing Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Clear current attribution using the Clear button above</li>
            <li>
              Visit this page with UTM parameters:
              <code className="mx-2 p-1 bg-background rounded text-xs">
                ?utm_source=google&utm_medium=cpc&utm_campaign=test&gclid=abc123
              </code>
            </li>
            <li>Click Refresh to see the captured data</li>
            <li>Navigate to other pages and return - the data persists (first-touch)</li>
            <li>Open browser console and type <code className="p-1 bg-background rounded text-xs">debugMktAttribution()</code> for detailed logs</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

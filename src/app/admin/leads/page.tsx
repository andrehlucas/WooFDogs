"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CalendarDays, Users, Eye, RefreshCw } from "lucide-react";

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  dogName: string;
  strangerReaction: string | null;
  preferredDate: string | null;
  message: string | null;
  source: string;
  medium: string;
  campaign: string | null;
  landingPage: string | null;
  firstVisit: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  gclid: string | null;
  wbraid: string | null;
  gbraid: string | null;
  msclkid: string | null;
  submittedFrom: string | null;
  createdAt: string;
  syncedToCrm: string | null;
  crmRecordId: string | null;
  crmFailureReason: string | null;
  crmSyncAttempts: number;
  crmLastAttemptAt: string | null;
  crmFallbackEmailSentAt: string | null;
}

interface DailyCount {
  date: string;
  count: number;
}

interface ApiResponse {
  submissions: Lead[];
  total: number;
  page: number;
  totalPages: number;
  dailyCounts: DailyCount[];
  recoveryCount: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const strangerReactionLabels: Record<string, string> = {
  "friendly-welcoming": "Friendly and welcoming",
  "excited-jumps": "Excited and jumps on them",
  "barks-calm": "Barks but stays calm",
  "barks-aggressively": "Barks aggressively",
  "hides-runs": "Hides or runs away",
  "indifferent": "Indifferent/ignores them",
  "nervous-shy": "Nervous and/or Shy",
  "growls-teeth": "Growls or shows teeth",
  "protective-controlled": "Protective but controlled",
};

export default function AdminLeadsPage() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [recoveryOnly, setRecoveryOnly] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "50" });
      if (fromDate) params.set("from", fromDate);
      if (toDate) params.set("to", toDate);
      if (recoveryOnly) params.set("recovery", "true");
      const res = await fetch(`/api/admin/leads?${params}`);
      if (res.ok) {
        setData(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch leads:", err);
    } finally {
      setLoading(false);
    }
  }, [page, fromDate, toDate, recoveryOnly]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilter = () => {
    setPage(1);
    fetchData();
  };

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setRecoveryOnly(false);
    setPage(1);
  };

  const todayCount = data?.dailyCounts?.find(
    (d) => d.date === new Date().toISOString().split("T")[0]
  )?.count || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-admin-title">
              Lead Submissions
            </h1>
            <p className="text-gray-500 mt-1">
              Track all form submissions and CRM sync status
            </p>
          </div>
          <Button
            variant="outline"
            onClick={fetchData}
            disabled={loading}
            data-testid="button-refresh"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card data-testid="card-total-submissions">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold" data-testid="text-total-count">
                  {data?.total ?? "—"}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-today-submissions">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold" data-testid="text-today-count">
                  {todayCount}
                </span>
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-daily-breakdown">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Daily Breakdown (Last 30 days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1.5">
                {data?.dailyCounts?.slice(0, 14).map((d) => (
                  <span
                    key={d.date}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full"
                    data-testid={`badge-daily-${d.date}`}
                  >
                    {formatShortDate(d.date)}: {d.count}
                  </span>
                ))}
                {(!data?.dailyCounts || data.dailyCounts.length === 0) && (
                  <span className="text-xs text-gray-400">No data yet</span>
                )}
              </div>
            </CardContent>
          </Card>
          <Card data-testid="card-needs-recovery">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Needs Recovery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className={`text-2xl font-bold ${data?.recoveryCount ? "text-amber-600" : "text-green-600"}`} data-testid="text-recovery-count">
                  {data?.recoveryCount ?? "—"}
                </span>
                <span className="text-xs text-gray-500">not confirmed in CRM</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-end gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">From</label>
                <Input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-44"
                  data-testid="input-from-date"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">To</label>
                <Input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-44"
                  data-testid="input-to-date"
                />
              </div>
              <Button onClick={handleFilter} data-testid="button-filter">
                Filter
              </Button>
              <Button variant="ghost" onClick={clearFilters} data-testid="button-clear-filters">
                Clear
              </Button>
              <Button
                variant={recoveryOnly ? "default" : "outline"}
                onClick={() => {
                  setPage(1);
                  setRecoveryOnly((value) => !value);
                }}
                data-testid="button-recovery-filter"
              >
                {recoveryOnly ? "Showing recovery leads" : "Needs recovery"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">#</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Dog</TableHead>
                    <TableHead>Source / Medium</TableHead>
                    <TableHead>CRM</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-gray-400">
                        Loading...
                      </TableCell>
                    </TableRow>
                  )}
                  {!loading && (!data?.submissions || data.submissions.length === 0) && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8 text-gray-400" data-testid="text-no-submissions">
                        No submissions found
                      </TableCell>
                    </TableRow>
                  )}
                  {!loading &&
                    data?.submissions?.map((lead) => (
                      <TableRow key={lead.id} data-testid={`row-lead-${lead.id}`}>
                        <TableCell className="text-gray-400 text-xs">{lead.id}</TableCell>
                        <TableCell className="text-sm whitespace-nowrap">
                          {formatDate(lead.createdAt)}
                        </TableCell>
                        <TableCell className="font-medium">{lead.name}</TableCell>
                        <TableCell className="text-sm">{lead.email}</TableCell>
                        <TableCell className="text-sm">{lead.phone}</TableCell>
                        <TableCell className="text-sm">{lead.dogName}</TableCell>
                        <TableCell className="text-sm">
                          <span className="text-gray-700">{lead.source}</span>
                          <span className="text-gray-400"> / </span>
                          <span className="text-gray-500">{lead.medium}</span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={lead.syncedToCrm === "synced" || lead.syncedToCrm === "success" ? "default" : "secondary"}
                            className={`text-xs ${
                              lead.syncedToCrm === "failed" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                              lead.syncedToCrm === "fallback_sent" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" :
                              lead.syncedToCrm === "pending" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" : ""
                            }`}
                            data-testid={`badge-crm-${lead.id}`}
                          >
                            {lead.syncedToCrm || "—"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => setSelectedLead(lead)}
                            data-testid={`button-view-${lead.id}`}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Page {data.page} of {data.totalPages} ({data.total} total)
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                data-testid="button-prev-page"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= data.totalPages}
                onClick={() => setPage((p) => p + 1)}
                data-testid="button-next-page"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              Full details for this form submission
            </DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4" data-testid="dialog-lead-details">
              <DetailSection title="Contact Info">
                <DetailRow label="Name" value={selectedLead.name} />
                <DetailRow label="Email" value={selectedLead.email} />
                <DetailRow label="Phone" value={selectedLead.phone} />
                <DetailRow label="Zip Code" value={selectedLead.zipCode} />
              </DetailSection>
              <DetailSection title="Dog Info">
                <DetailRow label="Dog Name" value={selectedLead.dogName} />
                <DetailRow
                  label="Stranger Reaction"
                  value={
                    selectedLead.strangerReaction
                      ? strangerReactionLabels[selectedLead.strangerReaction] || selectedLead.strangerReaction
                      : null
                  }
                />
                <DetailRow label="Preferred Date" value={selectedLead.preferredDate} />
                <DetailRow label="Message" value={selectedLead.message} />
              </DetailSection>
              <DetailSection title="Marketing Attribution">
                <DetailRow label="Source" value={selectedLead.source} />
                <DetailRow label="Medium" value={selectedLead.medium} />
                <DetailRow label="Campaign" value={selectedLead.campaign} />
                <DetailRow label="UTM Content" value={selectedLead.utmContent} />
                <DetailRow label="UTM Term" value={selectedLead.utmTerm} />
                <DetailRow label="Landing Page" value={selectedLead.landingPage} />
                <DetailRow label="Submitted From" value={selectedLead.submittedFrom} />
              </DetailSection>
              <DetailSection title="Ad Click IDs">
                <DetailRow label="GCLID" value={selectedLead.gclid} />
                <DetailRow label="WBRAID" value={selectedLead.wbraid} />
                <DetailRow label="GBRAID" value={selectedLead.gbraid} />
                <DetailRow label="MSCLKID" value={selectedLead.msclkid} />
              </DetailSection>
              <DetailSection title="System">
                <DetailRow label="Submitted" value={formatDate(selectedLead.createdAt)} />
                <DetailRow label="First Visit" value={selectedLead.firstVisit ? formatDate(selectedLead.firstVisit) : null} />
                <DetailRow label="CRM Sync" value={selectedLead.syncedToCrm} />
                <DetailRow label="CRM Record ID" value={selectedLead.crmRecordId} />
                <DetailRow label="Sync Attempts" value={String(selectedLead.crmSyncAttempts)} />
                <DetailRow label="Last CRM Attempt" value={selectedLead.crmLastAttemptAt ? formatDate(selectedLead.crmLastAttemptAt) : null} />
                <DetailRow label="Recovery Email Sent" value={selectedLead.crmFallbackEmailSentAt ? formatDate(selectedLead.crmFallbackEmailSentAt) : null} />
                <DetailRow label="CRM Failure Reason" value={selectedLead.crmFailureReason} />
              </DetailSection>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 border-b pb-1">
        {title}
      </h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-gray-500 min-w-[120px] shrink-0">{label}:</span>
      <span className="text-gray-900 break-all">{value}</span>
    </div>
  );
}

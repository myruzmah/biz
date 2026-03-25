import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Loader2, LogOut, ArrowLeft, Shield, Eye, Users, Activity,
  BarChart3, Clock, CheckCircle2, AlertCircle, FileText, UserCog,
  TrendingUp, Building2, Briefcase, ClipboardList,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useLocation, Link } from "wouter";
import { toast } from "sonner";
import { formatNaira } from "@shared/commission";

type HubTab = "overview" | "staff" | "audit" | "reports";

export default function FederalHub() {
  const { user, loading, logout } = useAuth({ redirectOnUnauthenticated: true });
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<HubTab>("overview");

  const statsQuery = trpc.institutional.stats.useQuery(undefined, { refetchInterval: 15000 });
  const taskStatsQuery = trpc.tasks.stats.useQuery();
  const staffQuery = trpc.staff.list.useQuery();
  const auditQuery = trpc.audit.list.useQuery({ limit: 100 });
  const reportsQuery = trpc.reports.list.useQuery();
  const commissionsQuery = trpc.commissions.list.useQuery();
  const leadsQuery = trpc.leads.list.useQuery();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F8F5F0" }}>
        <Loader2 className="animate-spin" size={32} style={{ color: "#C9A97E" }} />
      </div>
    );
  }
  if (!user) return null;

  const iStats = statsQuery.data;
  const tStats = taskStatsQuery.data;
  const staff = staffQuery.data || [];
  const auditLogs = auditQuery.data || [];
  const reports = reportsQuery.data || [];
  const commissions = commissionsQuery.data || [];
  const leads = leadsQuery.data || [];

  const roleName = user.hamzuryRole || "department_staff";
  const roleLabel: Record<string, string> = {
    founder: "Founder", ceo: "CEO", hr: "HR", bizdev: "BizDev",
    cso: "CSO", finance: "Finance", department_staff: "Staff",
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FAFAFA" }}>
      <PageMeta title="Federal Hub — HAMZURY" description="Federal-level oversight dashboard for HAMZURY operations." />
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 px-4 md:px-8 py-3 bg-[#0A1F1C] z-50 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[13px] font-semibold flex items-center gap-1" style={{ color: "#C9A97E" }}>
            <ArrowLeft size={14} /> HAMZURY
          </Link>
          <span className="text-[#F8F5F0]/20">|</span>
          <div className="flex items-center gap-2">
            <Shield size={18} style={{ color: "#C9A97E" }} />
            <span className="text-lg font-bold" style={{ color: "#F8F5F0" }}>Federal Hub</span>
            <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#C9A97E]/20" style={{ color: "#C9A97E" }}>
              {roleLabel[roleName] || roleName}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[13px] hidden md:block" style={{ color: "#C9A97E" }}>{user.name || user.email}</span>
          <button onClick={logout} className="flex items-center gap-1 text-[13px]" style={{ color: "#F8F5F0" }}>
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      <div className="pt-[56px] p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* Top-level stats */}
        {iStats && tStats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <HubStatCard label="Total Staff" value={iStats.totalStaff} icon={<Users size={16} />} color="#3B82F6" />
            <HubStatCard label="Total Leads" value={iStats.totalLeads} icon={<TrendingUp size={16} />} color="#C9A97E" />
            <HubStatCard label="Active Tasks" value={iStats.totalTasks - iStats.completedTasks} icon={<ClipboardList size={16} />} color="#8B5CF6" />
            <HubStatCard label="Completed" value={iStats.completedTasks} icon={<CheckCircle2 size={16} />} color="#22C55E" />
            <HubStatCard label="Revenue" value={formatNaira(iStats.totalRevenue)} icon={<BarChart3 size={16} />} color="#C9A97E" isText />
            <HubStatCard label="Pending Commissions" value={iStats.pendingCommissions} icon={<Clock size={16} />} color="#EAB308" />
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as HubTab)} className="w-full">
          <TabsList className="mb-6 bg-white border border-[#0A1F1C]/10">
            <TabsTrigger value="overview" className="gap-1.5"><Eye size={14} /> Overview</TabsTrigger>
            <TabsTrigger value="staff" className="gap-1.5"><UserCog size={14} /> Staff ({staff.length})</TabsTrigger>
            <TabsTrigger value="audit" className="gap-1.5"><Shield size={14} /> Audit Log</TabsTrigger>
            <TabsTrigger value="reports" className="gap-1.5"><FileText size={14} /> Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewPanel
              tStats={tStats}
              leads={leads}
              commissions={commissions}
              staff={staff}
            />
          </TabsContent>

          <TabsContent value="staff">
            <StaffManagement staff={staff} onRefresh={() => staffQuery.refetch()} />
          </TabsContent>

          <TabsContent value="audit">
            <AuditLogPanel logs={auditLogs} />
          </TabsContent>

          <TabsContent value="reports">
            <ReportsPanel reports={reports} userId={user.id} department={user.department || "general"} onRefresh={() => reportsQuery.refetch()} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// ─── Overview Panel ─────────────────────────────────────────────────────────

function OverviewPanel({ tStats, leads, commissions, staff }: { tStats: any; leads: any[]; commissions: any[]; staff: any[] }) {
  const recentLeads = leads.slice(0, 8);
  const departmentBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    staff.forEach(s => {
      const dept = s.department || "unassigned";
      counts[dept] = (counts[dept] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [staff]);

  const roleBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    staff.forEach(s => {
      const role = s.hamzuryRole || "department_staff";
      counts[role] = (counts[role] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [staff]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Task Status Breakdown */}
      {tStats && (
        <div className="bg-white rounded-2xl border border-[#0A1F1C]/10 shadow-sm p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#0A1F1C" }}>
            <BarChart3 size={16} style={{ color: "#C9A97E" }} /> Task Pipeline
          </h3>
          <div className="space-y-3">
            <PipelineBar label="Not Started" count={tStats.notStarted} total={tStats.totalTasks} color="#9CA3AF" />
            <PipelineBar label="In Progress" count={tStats.inProgress} total={tStats.totalTasks} color="#3B82F6" />
            <PipelineBar label="Waiting on Client" count={tStats.waitingOnClient} total={tStats.totalTasks} color="#EAB308" />
            <PipelineBar label="Submitted" count={tStats.submitted} total={tStats.totalTasks} color="#8B5CF6" />
            <PipelineBar label="Completed" count={tStats.completed} total={tStats.totalTasks} color="#22C55E" />
          </div>
        </div>
      )}

      {/* Department & Role Breakdown */}
      <div className="bg-white rounded-2xl border border-[#0A1F1C]/10 shadow-sm p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#0A1F1C" }}>
          <Building2 size={16} style={{ color: "#C9A97E" }} /> Organization Structure
        </h3>
        <div className="space-y-4">
          {staff.length === 0 ? (
            <p className="text-[13px] opacity-30 text-center py-8">Staff structure will appear once members are onboarded.</p>
          ) : (
          <>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-bold opacity-40 mb-2">By Department</p>
              {departmentBreakdown.map(([dept, count]) => (
                <div key={dept} className="flex justify-between items-center py-1.5">
                  <span className="text-[14px] font-medium capitalize" style={{ color: "#0A1F1C" }}>{dept}</span>
                  <span className="text-[13px] font-bold" style={{ color: "#C9A97E" }}>{count}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#0A1F1C]/5 pt-3">
              <p className="text-[11px] uppercase tracking-wider font-bold opacity-40 mb-2">By Role</p>
              {roleBreakdown.map(([role, count]) => (
                <div key={role} className="flex justify-between items-center py-1.5">
                  <span className="text-[14px] font-medium capitalize" style={{ color: "#0A1F1C" }}>{role.replace(/_/g, " ")}</span>
                  <span className="text-[13px] font-bold" style={{ color: "#C9A97E" }}>{count}</span>
                </div>
              ))}
            </div>
          </>
          )}
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-2xl border border-[#0A1F1C]/10 shadow-sm p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#0A1F1C" }}>
          <TrendingUp size={16} style={{ color: "#C9A97E" }} /> Recent Leads
        </h3>
        <div className="space-y-2">
          {recentLeads.map(l => (
            <div key={l.id} className="flex items-center justify-between py-2 border-b border-[#0A1F1C]/5 last:border-0">
              <div>
                <span className="text-[11px] font-mono font-bold mr-2" style={{ color: "#C9A97E" }}>{l.ref}</span>
                <span className="text-[14px] font-medium" style={{ color: "#0A1F1C" }}>{l.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] opacity-50">{l.service}</span>
                <StatusDot status={l.status} />
              </div>
            </div>
          ))}
          {recentLeads.length === 0 && <p className="text-sm opacity-40 text-center p-4">No leads yet</p>}
        </div>
      </div>

      {/* Commission Summary */}
      <div className="bg-white rounded-2xl border border-[#0A1F1C]/10 shadow-sm p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#0A1F1C" }}>
          <Briefcase size={16} style={{ color: "#C9A97E" }} /> Commission Summary
        </h3>
        <div className="space-y-3">
          {commissions.slice(0, 8).map(c => (
            <div key={c.id} className="flex items-center justify-between py-2 border-b border-[#0A1F1C]/5 last:border-0">
              <div>
                <span className="text-[11px] font-mono font-bold mr-2">{c.taskRef}</span>
                <span className="text-[13px]">{c.clientName}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[14px] font-bold" style={{ color: "#C9A97E" }}>{formatNaira(Number(c.quotedPrice))}</span>
                <CommissionStatusBadge status={c.status} />
              </div>
            </div>
          ))}
          {commissions.length === 0 && <p className="text-sm opacity-40 text-center p-4">No commissions yet</p>}
        </div>
      </div>
    </div>
  );
}

function PipelineBar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[13px] font-medium" style={{ color: "#0A1F1C" }}>{label}</span>
        <span className="text-[13px] font-bold" style={{ color }}>{count}</span>
      </div>
      <div className="h-2 rounded-full bg-[#F8F5F0] overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = { new: "#3B82F6", contacted: "#EAB308", converted: "#22C55E", archived: "#9CA3AF" };
  return <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: colors[status] || "#9CA3AF" }} />;
}

function CommissionStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = { pending: "#EAB308", approved: "#3B82F6", paid: "#22C55E" };
  return (
    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ backgroundColor: `${colors[status]}15`, color: colors[status] }}>
      {status}
    </span>
  );
}

// ─── Staff Management ───────────────────────────────────────────────────────

function StaffManagement({ staff, onRefresh }: { staff: any[]; onRefresh: () => void }) {
  const updateRoleMutation = trpc.staff.updateRole.useMutation({
    onSuccess: () => { toast.success("Staff role updated"); onRefresh(); },
    onError: () => toast.error("Failed to update role"),
  });

  const ROLES = ["founder", "ceo", "cso", "finance", "hr", "bizdev", "department_staff"];
  const DEPTS = ["bizdoc", "systemise", "skills", "general"];

  return (
    <div className="bg-white rounded-2xl border border-[#0A1F1C]/10 shadow-sm">
      <div className="p-4 border-b border-[#0A1F1C]/5">
        <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: "#0A1F1C" }}>
          <UserCog size={16} style={{ color: "#C9A97E" }} /> Staff Directory & Role Management
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#0A1F1C]/5 text-[11px] uppercase tracking-wider opacity-50">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">HAMZURY Role</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Last Sign-In</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0A1F1C]/5">
            {staff.length === 0 && (
              <tr>
                <td colSpan={5} className="p-10 text-center text-sm opacity-40" style={{ color: "#0A1F1C" }}>
                  No staff members onboarded yet.
                </td>
              </tr>
            )}
            {staff.map(s => (
              <tr key={s.id} className="hover:bg-[#F8F5F0]/50">
                <td className="p-3 font-semibold" style={{ color: "#0A1F1C" }}>{s.name || "—"}</td>
                <td className="p-3 text-[13px] opacity-60">{s.email || "—"}</td>
                <td className="p-3">
                  <Select
                    value={s.hamzuryRole || "department_staff"}
                    onValueChange={(v) => updateRoleMutation.mutate({ userId: s.id, hamzuryRole: v as any, department: s.department || undefined })}
                  >
                    <SelectTrigger className="w-[160px] h-8 text-[12px] bg-[#F8F5F0] border-[#0A1F1C]/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map(r => (
                        <SelectItem key={r} value={r}>{r.replace(/_/g, " ")}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-3">
                  <Select
                    value={s.department || "general"}
                    onValueChange={(v) => updateRoleMutation.mutate({ userId: s.id, hamzuryRole: (s.hamzuryRole || "department_staff") as any, department: v })}
                  >
                    <SelectTrigger className="w-[140px] h-8 text-[12px] bg-[#F8F5F0] border-[#0A1F1C]/10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DEPTS.map(d => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
                <td className="p-3 text-[12px] opacity-40">{new Date(s.lastSignedIn).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Audit Log Panel ────────────────────────────────────────────────────────

const AUDIT_PAGE_SIZE = 20;

function AuditLogPanel({ logs }: { logs: any[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(logs.length / AUDIT_PAGE_SIZE));
  const paged = logs.slice((page - 1) * AUDIT_PAGE_SIZE, page * AUDIT_PAGE_SIZE);

  return (
    <div className="bg-white rounded-2xl border border-[#0A1F1C]/10 shadow-sm">
      <div className="p-4 border-b border-[#0A1F1C]/5 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: "#0A1F1C" }}>
          <Shield size={16} style={{ color: "#C9A97E" }} /> Institutional Audit Trail
        </h3>
        {logs.length > 0 && (
          <span className="text-xs text-gray-400">{logs.length} entries</span>
        )}
      </div>
      <div className="divide-y divide-[#0A1F1C]/5">
          {logs.length === 0 ? (
            <p className="text-center text-sm opacity-40 p-8">No audit entries yet</p>
          ) : (
            paged.map(log => (
              <div key={log.id} className="p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#0A1F1C]/5">
                  <Shield size={14} style={{ color: "#C9A97E" }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[14px] font-semibold" style={{ color: "#0A1F1C" }}>{log.action.replace(/_/g, " ")}</span>
                    {log.resource && (
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#0A1F1C]/5">{log.resource}</span>
                    )}
                  </div>
                  <p className="text-[13px] opacity-60">{log.details}</p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] opacity-40">
                    <span>{log.userName || "System"}</span>
                    <span>{new Date(log.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      {logs.length > AUDIT_PAGE_SIZE && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#0A1F1C]/5 text-xs text-gray-500">
          <span>Showing {(page - 1) * AUDIT_PAGE_SIZE + 1}–{Math.min(page * AUDIT_PAGE_SIZE, logs.length)} of {logs.length}</span>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors">
              ← Prev
            </button>
            <span className="px-3 py-1.5 font-medium">{page} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition-colors">
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Reports Panel ──────────────────────────────────────────────────────────

function ReportsPanel({ reports, userId, department, onRefresh }: { reports: any[]; userId: number; department: string; onRefresh: () => void }) {
  const [summary, setSummary] = useState("");
  const [blockers, setBlockers] = useState("");
  const [completed, setCompleted] = useState("");
  const [pending, setPending] = useState("");

  const submitMutation = trpc.reports.submit.useMutation({
    onSuccess: () => {
      toast.success("Weekly report submitted");
      setSummary(""); setBlockers(""); setCompleted(""); setPending("");
      onRefresh();
    },
    onError: () => toast.error("Failed to submit report"),
  });

  const today = new Date();
  const dayOfWeek = today.getDay();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  const weekStartStr = weekStart.toISOString().split("T")[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Submit Report */}
      <div className="bg-white rounded-2xl border border-[#0A1F1C]/10 shadow-sm p-6">
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "#0A1F1C" }}>
          <FileText size={16} style={{ color: "#C9A97E" }} /> Submit Weekly Report
        </h3>
        <p className="text-[12px] opacity-40 mb-4">Week of {weekStartStr}</p>
        <div className="space-y-4">
          <Textarea
            placeholder="Summary of work done this week..."
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="bg-[#F8F5F0] border-[#0A1F1C]/10 min-h-[100px]"
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Tasks completed"
              value={completed}
              onChange={(e) => setCompleted(e.target.value)}
              className="bg-[#F8F5F0] border-[#0A1F1C]/10"
            />
            <Input
              type="number"
              placeholder="Tasks pending"
              value={pending}
              onChange={(e) => setPending(e.target.value)}
              className="bg-[#F8F5F0] border-[#0A1F1C]/10"
            />
          </div>
          <Textarea
            placeholder="Blockers or challenges (optional)..."
            value={blockers}
            onChange={(e) => setBlockers(e.target.value)}
            className="bg-[#F8F5F0] border-[#0A1F1C]/10"
          />
          <Button
            onClick={() => submitMutation.mutate({
              department,
              weekStart: weekStartStr,
              summary,
              completedTasks: parseInt(completed) || 0,
              pendingTasks: parseInt(pending) || 0,
              blockers: blockers || undefined,
            })}
            disabled={submitMutation.isPending || !summary.trim()}
            className="w-full"
            style={{ backgroundColor: "#0A1F1C", color: "#C9A97E" }}
          >
            {submitMutation.isPending ? <Loader2 size={14} className="animate-spin mr-2" /> : null}
            Submit Report
          </Button>
        </div>
      </div>

      {/* Report History */}
      <div className="bg-white rounded-2xl border border-[#0A1F1C]/10 shadow-sm">
        <div className="p-4 border-b border-[#0A1F1C]/5">
          <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#0A1F1C" }}>Report History</h3>
        </div>
        <ScrollArea className="max-h-[500px]">
          <div className="divide-y divide-[#0A1F1C]/5">
            {reports.length === 0 ? (
              <p className="text-center text-sm opacity-40 p-8">No reports submitted yet</p>
            ) : (
              reports.map(r => (
                <div key={r.id} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-[#C9A97E]/10" style={{ color: "#C9A97E" }}>{r.department}</span>
                      <span className="text-[12px] opacity-40">Week of {r.weekStart}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px]">
                      <span className="text-green-600 font-semibold">{r.completedTasks} done</span>
                      <span className="opacity-30">|</span>
                      <span className="text-amber-600 font-semibold">{r.pendingTasks} pending</span>
                    </div>
                  </div>
                  <p className="text-[14px]" style={{ color: "#0A1F1C" }}>{r.summary}</p>
                  {r.blockers && <p className="text-[13px] opacity-50 mt-1">Blockers: {r.blockers}</p>}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

// ─── Stat Card ──────────────────────────────────────────────────────────────

function HubStatCard({ label, value, icon, color, isText }: { label: string; value: number | string; icon: React.ReactNode; color: string; isText?: boolean }) {
  return (
    <div className="bg-white rounded-xl border border-[#0A1F1C]/5 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-2" style={{ color }}>
        {icon}
        <span className="text-[10px] uppercase tracking-wider font-bold opacity-60">{label}</span>
      </div>
      <p className={`font-bold ${isText ? "text-[15px]" : "text-xl"}`} style={{ color: "#0A1F1C" }}>{value}</p>
    </div>
  );
}

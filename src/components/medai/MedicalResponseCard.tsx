import {
  AlertTriangle,
  Heart,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Pill,
  Activity,
  TriangleAlert,
} from "lucide-react";

export type MedicalResponse = {
  summary: string;
  possible_conditions: { name: string; likelihood: "low" | "moderate" | "high"; note: string }[];
  confidence: number;
  severity: "low" | "medium" | "high" | "emergency";
  precautions: string[];
  otc_suggestions: string[];
  lifestyle: string[];
  consult_doctor: string;
  emergency_warning: string;
  follow_up_question: string;
  disclaimer: string;
};

const sevConfig = {
  low: { label: "Low severity", color: "bg-severity-low/15 text-severity-low border-severity-low/30", bar: "bg-severity-low" },
  medium: { label: "Medium severity", color: "bg-severity-medium/15 text-severity-medium border-severity-medium/30", bar: "bg-severity-medium" },
  high: { label: "High severity", color: "bg-severity-high/15 text-severity-high border-severity-high/30", bar: "bg-severity-high" },
  emergency: { label: "EMERGENCY", color: "bg-severity-emergency/15 text-severity-emergency border-severity-emergency/40", bar: "bg-severity-emergency" },
};

const likelihoodColor: Record<string, string> = {
  low: "bg-severity-low/15 text-severity-low",
  moderate: "bg-severity-medium/15 text-severity-medium",
  high: "bg-severity-high/15 text-severity-high",
};

function Section({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl glass p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary/15 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <h4 className="text-sm font-semibold tracking-tight">{title}</h4>
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}

export function MedicalResponseCard({ data }: { data: MedicalResponse }) {
  const sev = sevConfig[data.severity];

  return (
    <div className="space-y-4">
      {/* Emergency banner */}
      {data.severity === "emergency" && data.emergency_warning && (
        <div className="rounded-2xl border border-severity-emergency/40 bg-severity-emergency/10 p-4 flex gap-3 animate-pulse-glow">
          <TriangleAlert className="h-6 w-6 text-severity-emergency shrink-0" />
          <div>
            <div className="font-semibold text-severity-emergency mb-1">Possible emergency</div>
            <div className="text-sm">{data.emergency_warning}</div>
          </div>
        </div>
      )}

      {/* Header card */}
      <div className="rounded-2xl glass-strong p-5 shadow-elegant">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${sev.color}`}>
              <Activity className="h-3 w-3" />
              {sev.label}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Confidence</span>
            <div className="h-1.5 w-28 overflow-hidden rounded-full bg-white/10">
              <div className={`h-full ${sev.bar} transition-all`} style={{ width: `${Math.max(5, Math.min(100, data.confidence))}%` }} />
            </div>
            <span className="font-mono">{Math.round(data.confidence)}%</span>
          </div>
        </div>
        <p className="text-base leading-relaxed">{data.summary}</p>
      </div>

      {/* Conditions */}
      {data.possible_conditions?.length > 0 && (
        <div className="rounded-2xl glass p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-accent/20 text-accent">
              <Stethoscope className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-semibold tracking-tight">Possible considerations</h4>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {data.possible_conditions.map((c, i) => (
              <div key={i} className="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="font-medium text-sm">{c.name}</div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${likelihoodColor[c.likelihood]}`}>
                    {c.likelihood}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
        {data.precautions?.length > 0 && (
          <Section icon={ShieldCheck} title="Precautions">
            <ul className="space-y-1.5 list-disc pl-4">
              {data.precautions.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </Section>
        )}
        {data.otc_suggestions?.length > 0 && (
          <Section icon={Pill} title="Safe OTC suggestions">
            <ul className="space-y-1.5 list-disc pl-4">
              {data.otc_suggestions.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </Section>
        )}
        {data.lifestyle?.length > 0 && (
          <Section icon={Heart} title="Lifestyle recommendations">
            <ul className="space-y-1.5 list-disc pl-4">
              {data.lifestyle.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </Section>
        )}
        {data.consult_doctor && (
          <Section icon={Sparkles} title="When to consult a doctor">
            <p>{data.consult_doctor}</p>
          </Section>
        )}
      </div>

      {data.follow_up_question && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm">
          <span className="font-medium text-primary">MedAI asks: </span>
          {data.follow_up_question}
        </div>
      )}

      <div className="flex items-start gap-2 text-xs text-muted-foreground">
        <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
        <p>{data.disclaimer}</p>
      </div>
    </div>
  );
}

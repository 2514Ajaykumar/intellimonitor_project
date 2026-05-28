import { Link } from "react-router-dom";
import { ArrowRight, Activity, Shield, Zap, Globe, BarChart3, Bell } from "lucide-react";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-[rgba(255,255,255,0.04)] bg-[rgba(5,5,5,0.86)] px-4 py-2.5 backdrop-blur-xl sm:px-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.12)]">
            <Activity size={12} className="text-[#22c55e]" />
          </div>
          <span className="text-sm font-bold font-display">IntelliMonitor</span>
        </div>

        <div className="hidden items-center gap-7 md:flex">
          {['Features', 'Pricing', 'Docs', 'Blog'].map((item) => (
            <a key={item} href="#" className="text-[11px] uppercase tracking-[0.2em] text-[#3d3d3d] transition-colors hover:text-[#8a8a8a]">
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login" className="text-[11px] uppercase tracking-[0.18em] text-[#555] transition-colors hover:text-[#f0f0f0]">
            Sign In
          </Link>
          <Link
            to="/register"
            className="rounded-[18px] bg-[#22c55e] px-4.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-all duration-200 hover:bg-[#4ade80] hover:shadow-[0_8px_24px_rgba(34,197,94,0.3)]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

function DashboardPreview() {
  return (
    <div className="relative w-full overflow-hidden rounded-[28px] border border-[rgba(255,255,255,0.08)] bg-[#0a0a0a] shadow-[0_28px_80px_rgba(0,0,0,0.45)]">
      <div className="flex min-h-[420px]">
        <div className="w-[160px] shrink-0 border-r border-[rgba(255,255,255,0.05)] p-4">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[rgba(34,197,94,0.15)]">
              <Activity size={10} className="text-[#22c55e]" />
            </div>
            <span className="text-[10px] font-bold">IntelliMonitor</span>
          </div>

          <div className="space-y-2">
            {[
              { label: 'Dashboard', active: true },
              { label: 'Monitors', active: false },
              { label: 'Alerts', active: false },
              { label: 'Analytics', active: false },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-[9px] font-medium ${
                  item.active
                    ? 'border border-[rgba(34,197,94,0.15)] bg-[rgba(34,197,94,0.08)] text-[#4ade80]'
                    : 'text-[#333]'
                }`}
              >
                <div className={`h-1.5 w-1.5 rounded-full ${item.active ? 'bg-[#22c55e]' : 'bg-[#222]'}`} />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: 'Total', value: '24', color: '#f5f5f5' },
              { label: 'Online', value: '21', color: '#4ade80' },
              { label: 'Offline', value: '3', color: '#f87171' },
              { label: 'Avg ms', value: '142', color: '#f5f5f5' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[#111111] p-3">
                <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-[#333]">{s.label}</p>
                <p className="text-lg font-bold" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-[24px] border border-[rgba(255,255,255,0.05)] bg-[#111111] p-4">
            <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-[#333]">Response Time</p>
            <svg viewBox="0 0 280 70" className="w-full" fill="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,50 L30,40 L60,45 L90,30 L120,35 L150,20 L180,25 L210,15 L240,20 L280,10" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M0,50 L30,40 L60,45 L90,30 L120,35 L150,20 L180,25 L210,15 L240,20 L280,10 L280,70 L0,70 Z" fill="url(#chartGrad)" />
            </svg>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { name: 'API Gateway', status: 'UP', ms: '89ms' },
              { name: 'Auth Service', status: 'UP', ms: '45ms' },
              { name: 'DB Cluster', status: 'DOWN', ms: '—' },
              { name: 'CDN Edge', status: 'UP', ms: '12ms' },
            ].map((m) => (
              <div key={m.name} className="flex items-center justify-between rounded-2xl border border-[rgba(255,255,255,0.05)] bg-[#111111] px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${m.status === 'UP' ? 'bg-[#22c55e]' : 'bg-[#ef4444]'}`} />
                  <span className="text-[9px] text-[#666]">{m.name}</span>
                </div>
                <span className={`text-[9px] font-mono ${m.status === 'UP' ? 'text-[#4ade80]' : 'text-[#f87171]'}`}>{m.ms}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Activity,
    title: 'Real-time Monitoring',
    desc: 'Continuous surveillance of your endpoints with sub-minute check intervals and instant status updates.',
  },
  {
    icon: Bell,
    title: 'Intelligent Alerts',
    desc: 'Smart alerting with configurable thresholds to reduce noise and surface only what matters.',
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    desc: 'Deep response time analytics, trend analysis, and historical uptime reporting.',
  },
  {
    icon: Globe,
    title: 'Global Coverage',
    desc: 'Monitor from multiple geographic locations to ensure worldwide availability and performance.',
  },
  {
    icon: Shield,
    title: 'SSL Monitoring',
    desc: 'Automated certificate expiry tracking and security validation for all HTTPS endpoints.',
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    desc: 'From zero to monitoring in under 60 seconds. No complex configuration or DevOps expertise needed.',
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 grid-texture opacity-30" />
        <div className="pointer-events-none absolute left-1/4 top-1/4 h-[720px] w-[720px] rounded-full bg-[rgba(34,197,94,0.04)] blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[440px] w-[440px] rounded-full bg-[rgba(74,222,128,0.03)] blur-[120px]" />

        <div className="mx-auto flex max-w-[1440px] items-center">
          <div className="grid w-full items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            <div className="self-center">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[rgba(34,197,94,0.15)] bg-[rgba(34,197,94,0.07)] px-4 py-2 animate-fadeUp">
                <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse-dot" />
                <span className="text-[11px] font-medium text-[#4ade80]">Now with AI-powered anomaly detection</span>
              </div>

              <h1 className="mb-5 max-w-[580px] font-display text-[clamp(3.3rem,6vw,4.8rem)] font-black leading-[0.93] tracking-[-0.08em] animate-fadeUp delay-1">
                Your infra.
                <br />
                <span className="text-[#1d1d1d]">Always</span>
                <br />
                <span className="gradient-text">watching.</span>
              </h1>

              <p className="mb-8 max-w-[520px] text-[1rem] leading-relaxed text-[#3d3d3d] animate-fadeUp delay-2">
                IntelliMonitor helps engineering teams track uptime, latency, and service health with a calm, high-signal dashboard built for modern operations.
              </p>

              <div className="flex flex-wrap gap-3 animate-fadeUp delay-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-[18px] bg-[#22c55e] px-7 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4ade80] hover:shadow-[0_8px_28px_rgba(34,197,94,0.3)]"
                >
                  Start Monitoring Free
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-[18px] border border-[rgba(255,255,255,0.08)] px-7 py-3.5 text-sm font-medium text-[#666] transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.15)] hover:text-[#888]"
                >
                  Sign In
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-5 animate-fadeUp delay-4">
                {[
                  { value: '99.9%', label: 'Uptime SLA' },
                  { value: '30s', label: 'Check interval' },
                  { value: '24/7', label: 'Monitoring' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-xl font-bold">{s.value}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-[#2e2e2e]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="self-center">
              <div className="relative mx-auto max-w-[600px] animate-float">
                <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[rgba(34,197,94,0.08)] to-transparent blur-2xl" />
                <DashboardPreview />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 max-w-2xl">
            <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-[#22c55e]">Platform Capabilities</p>
            <h2 className="mb-4 font-display text-3xl font-black tracking-[-0.05em] sm:text-4xl">
              Built for calm, high-clarity operations.
            </h2>
            <p className="text-[15px] leading-relaxed text-[#2d2d2d]">
              Every view is tuned for observability teams that need speed, signal, and confidence in one place.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-[24px] border border-[rgba(255,255,255,0.05)] bg-[rgba(12,12,12,0.92)] p-6 card-hover"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(34,197,94,0.15)] bg-[rgba(34,197,94,0.08)]">
                    <Icon size={16} className="text-[#22c55e]" />
                  </div>
                  <h3 className="mb-2 font-display text-sm font-bold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-[#3d3d3d]">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[860px]">
          <div className="overflow-hidden rounded-[28px] border border-[rgba(34,197,94,0.12)] bg-[rgba(12,12,12,0.92)] px-6 py-10 sm:px-8 sm:py-12">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(34,197,94,0.04)] to-transparent pointer-events-none" />
            <p className="mb-4 text-[10px] uppercase tracking-[0.4em] text-[#22c55e]">Get Started Today</p>
            <h2 className="mb-4 font-display text-3xl font-black tracking-[-0.05em] sm:text-4xl">
              Monitor everything.
              <br />
              <span className="gradient-text">Miss nothing.</span>
            </h2>
            <p className="mb-8 max-w-[560px] text-[15px] leading-relaxed text-[#3d3d3d]">
              Join modern engineering teams who rely on IntelliMonitor to keep infrastructure healthy and response times predictable.
            </p>

            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#22c55e] px-7 py-3.5 text-sm font-semibold text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4ade80] hover:shadow-[0_8px_28px_rgba(34,197,94,0.3)]"
            >
              Start for free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[rgba(255,255,255,0.04)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[rgba(34,197,94,0.12)]">
              <Activity size={10} className="text-[#22c55e]" />
            </div>
            <span className="text-xs font-bold font-display">IntelliMonitor</span>
          </div>
          <p className="text-[10px] text-[#2b2b2b]">© 2025 IntelliMonitor. All systems operational.</p>
          <div className="flex gap-5">
            {['Privacy', 'Terms', 'Status'].map((item) => (
              <a key={item} href="#" className="text-[10px] uppercase tracking-[0.2em] text-[#2a2a2a] transition-colors hover:text-[#555]">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
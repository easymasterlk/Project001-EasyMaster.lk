export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#eef4ff_45%,_#f8fafc_100%)] text-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45" />
      <main className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-10 sm:px-10 lg:px-12">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-10">
          <section className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white/80 px-4 py-2 text-sm font-medium text-sky-800 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-sky-500" />
              EasyMaster business dashboard for modern teams
            </div>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Run your operations with a cleaner, faster landing experience.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Present your product with confidence. EasyMaster keeps the first
              impression focused, polished, and ready to convert visitors into
              customers.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#get-started"
                className="inline-flex h-14 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white shadow-lg shadow-slate-950/20 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Get started
              </a>
              <a
                href="#features"
                className="inline-flex h-14 items-center justify-center rounded-full border border-slate-300 bg-white/80 px-6 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur transition-colors duration-200 hover:border-slate-400 hover:bg-white"
              >
                Explore features
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {[
                ["24/7", "support coverage"],
                ["10x", "clearer workflows"],
                ["99.9%", "uptime visibility"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <div className="text-2xl font-semibold tracking-tight text-slate-950">
                    {value}
                  </div>
                  <div className="mt-1 text-sm text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="relative">
            <div className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-sky-300/40 blur-3xl" />
            <div className="absolute bottom-8 right-0 h-40 w-40 rounded-full bg-indigo-300/35 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950 p-5 text-white shadow-[0_30px_100px_rgba(15,23,42,0.25)]">
              <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    Live overview
                  </p>
                  <p className="mt-2 text-lg font-medium">Today&apos;s performance</p>
                </div>
                <div className="rounded-full border border-emerald-400/30 bg-emerald-400/15 px-3 py-1 text-sm font-medium text-emerald-300">
                  +18.4%
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white/8 p-5 ring-1 ring-white/10">
                  <p className="text-sm text-slate-300">Active leads</p>
                  <p className="mt-4 text-4xl font-semibold tracking-tight">1,284</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Up from yesterday&apos;s traffic spike.
                  </p>
                </div>
                <div className="rounded-3xl bg-white/8 p-5 ring-1 ring-white/10">
                  <p className="text-sm text-slate-300">Conversion rate</p>
                  <p className="mt-4 text-4xl font-semibold tracking-tight">32%</p>
                  <p className="mt-2 text-sm text-slate-400">
                    Strong intent from the landing page.
                  </p>
                </div>
              </div>

              <div
                id="features"
                className="mt-5 grid gap-3 rounded-3xl bg-white/6 p-4 ring-1 ring-white/10"
              >
                {[
                  "Brand-led hero sections",
                  "High-contrast CTA blocks",
                  "Simple analytics snapshot",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl bg-slate-900/70 px-4 py-3 text-sm text-slate-200"
                  >
                    <span>{item}</span>
                    <span className="text-sky-300">Ready</span>
                  </div>
                ))}
              </div>

              <div
                id="get-started"
                className="mt-5 rounded-3xl border border-sky-400/20 bg-gradient-to-r from-sky-500/15 to-indigo-500/15 p-5"
              >
                <p className="text-sm font-medium text-sky-100">
                  Launch-ready landing page
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Keep the structure simple, persuasive, and easy to extend when
                  the product grows.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

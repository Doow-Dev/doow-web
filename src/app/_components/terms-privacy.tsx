export function AboutTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-left text-xl font-semibold tracking-tight text-zinc-950 md:text-2xl">{children}</h2>;
}

export function AboutSubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-left text-sm font-semibold leading-7 text-zinc-900 md:text-lg">{children}</h3>;
}

export function AboutBody({ children }: { children: React.ReactNode }) {
  return <div className="text-left text-sm leading-7 text-zinc-600 md:text-base">{children}</div>;
}

export function AboutSection({ children }: { children: React.ReactNode }) {
  return <section className="space-y-4">{children}</section>;
}

export function AboutWrapper({ children }: { children: React.ReactNode }) {
  return <div className="w-full space-y-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">{children}</div>;
}

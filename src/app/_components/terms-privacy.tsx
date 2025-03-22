export function AboutTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-left mb-2 text-sub-heading text-doow_zinc">{children}</div>;
}

export function AboutSubHeading({ children }: { children: React.ReactNode }) {
  return <div className="text-left font-bold text-2xl md:text-xl mb-2 leading-8 md:leading-6">{children}</div>;
}

export function AboutBody({ children }: { children: React.ReactNode }) {
  return <div className="text-left text-lg md:text-base leading-8 md:leading-6 mb-2">{children}</div>;
}

export function AboutSection({ children }: { children: React.ReactNode }) {
  return <div className="my-6">{children}</div>;
}

export function AboutSubtitle({ children }: { children: React.ReactNode }) {
  return <div className="text-center text-3xl md:text-2xl font-medium mb-2 text-doow_zinc">{children}</div>;
}

export function TopSection({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-white p-12 md:p-8">
      <div className="flx flex-col items-center justify-center w-3/4 md:w-11/12 space-y-4">
        <div className=" text-doow_zinc">
          <h1 className="text-heading text-center">{title}</h1>
        </div>
        <div className=" text-doow_grey text-center">
          <p className="w-4/5 md:w-full text-riding pb-8 text-center">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

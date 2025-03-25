import { ReactNode } from "react";

export function TopSection({ title, subtitle, icon }: { title: string; subtitle: string; icon: ReactNode }) {
  return (
    <div className=" bg-white p-12 md:p-8">
      <div className="flex flex-col items-center justify-center w-3/4 md:w-5/12 text-pretty mx-auto space-y-1">
        <div className="opacity-70 bg-doow_card text-doow_primary p-2 rounded-full w-fit-content mx-auto mb-2">
          {icon}
        </div>
        <div className=" text-doow_zinc">
          <h1 className="text-[22px] md:text-3xl font-bold tracking-tighter text-center">{title}</h1>
        </div>
        <div className=" text-doow_grey">
          <p className=" text-xs md:text-sm text-center">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export function AboutTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-left text-[20px] md:text-[24px] font-bold mb-2">{children}</div>;
}

export function AboutSubHeading({ children }: { children: React.ReactNode }) {
  return <div className="text-left font-bold text-sm md:text-lg mb-2 leading-8 md:leading-6 text-doow_zinc">{children}</div>;
}

export function AboutBody({ children }: { children: React.ReactNode }) {
  return <div className="text-left text-xs md:text-sm font-semibold leading-8 md:leading-6 mb-2 tracking-normal">{children}</div>;
}

export function AboutSection({ children }: { children: React.ReactNode }) {
  return <div className="my-7">{children}</div>;
}

// export function AboutSubtitle({ children }: { children: React.ReactNode }) {
//   return <div className="text-center text-3xl md:text-2xl font-medium mb-2 text-doow_zinc border">{children}</div>;
// }

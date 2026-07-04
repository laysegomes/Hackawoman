import type { ReactNode } from "react";
import { Home, Calendar, Flower2, BarChart3, MoreHorizontal } from "lucide-react";
import type { GoToScreen, Screen } from "../types";

type HealthModuleProps = {
  children: ReactNode;
  onFlowerTap: () => void;
  screen: Screen;
  go: GoToScreen;
};

const HEALTH_NAV_SCREENS: Screen[] = [
  "cycle-home",
  "cycle-calendar",
  "cycle-analytics",
  "cycle-more",
  "cycle-health",
];

export function HealthModule({ children, onFlowerTap, screen, go }: HealthModuleProps) {
  return (
    <>
      {children}
      {HEALTH_NAV_SCREENS.includes(screen) && (
        <CycleBottomNav current={screen} go={go} onFlowerTap={onFlowerTap} />
      )}
    </>
  );
}

function CycleBottomNav({
  current,
  go,
  onFlowerTap,
}: {
  current: Screen;
  go: GoToScreen;
  onFlowerTap: () => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-[#f7e7f0] px-5 py-2 flex items-center justify-between">
      <NavBtn icon={Home} label="Início" active={current === "cycle-home"} onClick={() => go("cycle-home")} />
      <NavBtn icon={Calendar} label="Agenda" active={current === "cycle-calendar"} onClick={() => go("cycle-calendar")} />
      <button
        onClick={onFlowerTap}
        className="h-14 w-14 -mt-6 rounded-full bg-gradient-to-br from-[#f75ca2] to-[#c66bff] grid place-items-center shadow-lg shadow-pink-300 text-white active:scale-95 transition"
        aria-label="Flor"
      >
        <Flower2 className="h-6 w-6" />
      </button>
      <NavBtn icon={BarChart3} label="Análises" active={current === "cycle-analytics"} onClick={() => go("cycle-analytics")} />
      <NavBtn icon={MoreHorizontal} label="Mais" active={current === "cycle-more"} onClick={() => go("cycle-more")} />
    </div>
  );
}

function NavBtn({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: any;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-0.5 py-1 px-2">
      <Icon className={`h-5 w-5 ${active ? "text-[#f75ca2]" : "text-[#a5a5b5]"}`} />
      <span className={`text-[10px] font-semibold ${active ? "text-[#f75ca2]" : "text-[#a5a5b5]"}`}>{label}</span>
    </button>
  );
}

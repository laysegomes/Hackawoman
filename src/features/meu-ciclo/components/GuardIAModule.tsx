import type { ReactNode } from "react";
import { Home, BookOpen, Plus, FolderLock, MoreHorizontal } from "lucide-react";
import type { GoToScreen, Screen } from "../types";

type GuardIAModuleProps = {
  children: ReactNode;
  screen: Screen;
  go: GoToScreen;
};

const GUARD_NAV_SCREENS: Screen[] = [
  "guardia-home",
  "guardia-rights",
  "guardia-proofs",
  "guardia-more",
];

export function GuardIAModule({ children, screen, go }: GuardIAModuleProps) {
  return (
    <>
      {children}
      {GUARD_NAV_SCREENS.includes(screen) && <GuardBottomNav current={screen} go={go} />}
    </>
  );
}

function GuardBottomNav({ current, go }: { current: Screen; go: GoToScreen }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#211039]/95 backdrop-blur border-t border-white/10 px-5 py-2 flex items-center justify-between">
      <GNav icon={Home} label="Início" active={current === "guardia-home"} onClick={() => go("guardia-home")} />
      <GNav icon={BookOpen} label="Direitos" active={current === "guardia-rights"} onClick={() => go("guardia-rights")} />
      <button
        onClick={() => go("guardia-proofs")}
        className="h-14 w-14 -mt-6 rounded-full bg-gradient-to-br from-[#f75ca2] to-[#6c35d8] grid place-items-center shadow-lg shadow-purple-900/50 text-white"
      >
        <Plus className="h-6 w-6" />
      </button>
      <GNav icon={FolderLock} label="Provas" active={current === "guardia-proofs"} onClick={() => go("guardia-proofs")} />
      <GNav icon={MoreHorizontal} label="Mais" active={current === "guardia-more"} onClick={() => go("guardia-more")} />
    </div>
  );
}

function GNav({
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
      <Icon className={`h-5 w-5 ${active ? "text-[#f75ca2]" : "text-white/50"}`} />
      <span className={`text-[10px] font-semibold ${active ? "text-[#f75ca2]" : "text-white/50"}`}>{label}</span>
    </button>
  );
}

import { useState, useRef, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import {
  Home, Calendar, Flower2, BarChart3, MoreHorizontal, ChevronRight, ChevronLeft,
  Bell, Pill, FileText, Target, Lock, Shield, Check, Fingerprint,
  MessageCircle, BookOpen, FolderLock, ShieldCheck, Scale, PiggyBank,
  Plus, Image as ImageIcon, Mic, FileText as FileIcon, Camera, Pencil,
  ArrowLeft, LogOut, Send, X, Sparkles, User, HeartPulse, GraduationCap,
  Settings, HelpCircle, Info, Droplet, Dumbbell, Apple, Smile, Frown, Meh,
  TrendingUp, Activity, CalendarDays, Cloud, Sun, Moon, KeyRound, HardDrive,
  Building2, HandHeart, Gavel, PhoneCall, MapPin, Clock, FileCheck,
} from "lucide-react";

type Screen =
  // Public
  | "cycle-home" | "cycle-calendar" | "cycle-health" | "cycle-analytics" | "cycle-more"
  | "cycle-privacy"
  | "cycle-profile" | "cycle-my-health" | "cycle-reminders" | "cycle-medications"
  | "cycle-goals" | "cycle-educational" | "cycle-settings" | "cycle-help" | "cycle-about"
  // Setup
  | "create-pin" | "create-decoy-pin" | "gesture" | "confirm-setup"
  // GuardIA
  | "guardia-pin" | "guardia-home" | "guardia-chat" | "guardia-rights"
  | "guardia-proofs" | "guardia-plan" | "guardia-legal" | "guardia-legal-detail"
  | "guardia-reserve" | "guardia-more"
  | "guardia-profile" | "guardia-change-pin" | "guardia-change-decoy"
  | "guardia-change-gesture" | "guardia-security" | "guardia-backup"
  | "guardia-help-center" | "guardia-faq" | "guardia-about";

const MAIN_PIN = "1234";
const DECOY_PIN = "0000";

// Cycle simulation constants (mocked)
const CYCLE_LENGTH = 28;
const PERIOD_LENGTH = 5;
// Anchor: today = day 5 of current cycle → period started 4 days ago
function useCycleModel(today = new Date()) {
  return useMemo(() => {
    const cycleDay = 5;
    const periodStart = new Date(today);
    periodStart.setDate(today.getDate() - (cycleDay - 1));
    const nextPeriod = new Date(periodStart);
    nextPeriod.setDate(periodStart.getDate() + CYCLE_LENGTH);
    const ovulation = new Date(periodStart);
    ovulation.setDate(periodStart.getDate() + 13);
    const fertileStart = new Date(ovulation); fertileStart.setDate(ovulation.getDate() - 4);
    const fertileEnd = new Date(ovulation); fertileEnd.setDate(ovulation.getDate() + 1);
    return { today, cycleDay, periodStart, nextPeriod, ovulation, fertileStart, fertileEnd };
  }, [today.toDateString()]);
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function inRange(d: Date, s: Date, e: Date) {
  const x = d.getTime(); return x >= new Date(s.getFullYear(), s.getMonth(), s.getDate()).getTime() && x <= new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime();
}

export function MeuCicloApp() {
  const [screen, setScreen] = useState<Screen>("cycle-home");
  const [flowerTaps, setFlowerTaps] = useState(0);
  const flowerTimer = useRef<number | null>(null);
  const [legalOption, setLegalOption] = useState<string>("");

  const go = (s: Screen) => setScreen(s);

  const handleFlowerTap = () => {
    setFlowerTaps((t) => t + 1);
    if (flowerTimer.current) window.clearTimeout(flowerTimer.current);
    flowerTimer.current = window.setTimeout(() => setFlowerTaps(0), 900);
  };

  useEffect(() => {
    if (flowerTaps >= 3) {
      setFlowerTaps(0);
      go("guardia-pin");
    } else if (flowerTaps === 1) {
      // Delay slightly to allow multi-tap detection
      const t = window.setTimeout(() => {
        if (flowerTaps === 1) go("cycle-health");
        setFlowerTaps(0);
      }, 400);
      return () => window.clearTimeout(t);
    }
  }, [flowerTaps]);

  const isGuard = screen.startsWith("guardia-") && screen !== "guardia-pin";
  const isPinScreen = screen === "guardia-pin";
  const showCycleNav = [
    "cycle-home","cycle-calendar","cycle-analytics","cycle-more","cycle-health",
  ].includes(screen);
  const showGuardNav = [
    "guardia-home","guardia-rights","guardia-proofs","guardia-more",
  ].includes(screen);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#ffeaf4] via-white to-[#f4e9ff] p-0 sm:p-6">
      <div
        className={`relative w-full max-w-[430px] min-h-screen sm:min-h-[900px] sm:h-[900px] sm:rounded-[40px] sm:shadow-2xl overflow-hidden transition-colors duration-500 ${
          isGuard || isPinScreen ? "bg-[#12091f]" : "bg-[#fffafd]"
        }`}
      >
        <div className="h-full overflow-y-auto pb-28">
          {screen === "cycle-home" && <CycleHome go={go} />}
          {screen === "cycle-calendar" && <CycleCalendar />}
          {screen === "cycle-health" && <CycleHealth go={go} />}
          {screen === "cycle-analytics" && <CycleAnalytics />}
          {screen === "cycle-more" && <CycleMore go={go} />}
          {screen === "cycle-privacy" && <CyclePrivacy go={go} />}
          {screen === "cycle-profile" && <SimplePage go={go} back="cycle-more" title="Meu perfil" icon={User} sections={[
            { t: "Nome", d: "Júlia Almeida" },
            { t: "Idade", d: "27 anos" },
            { t: "E-mail", d: "julia@exemplo.com" },
            { t: "Objetivo atual", d: "Cuidar da saúde integral" },
          ]} />}
          {screen === "cycle-my-health" && <SimplePage go={go} back="cycle-more" title="Minha saúde" icon={HeartPulse} sections={[
            { t: "Altura", d: "1,68 m" },
            { t: "Peso", d: "62 kg" },
            { t: "Alergias", d: "Nenhuma registrada" },
            { t: "Condições", d: "Nenhuma" },
          ]} />}
          {screen === "cycle-reminders" && <RemindersPage go={go} />}
          {screen === "cycle-medications" && <MedicationsPage go={go} />}
          {screen === "cycle-goals" && <GoalsPage go={go} />}
          {screen === "cycle-educational" && <EducationalPage go={go} />}
          {screen === "cycle-settings" && <SettingsPage go={go} />}
          {screen === "cycle-help" && <SimplePage go={go} back="cycle-more" title="Ajuda" icon={HelpCircle} sections={[
            { t: "Central de suporte", d: "Fale conosco pelo e-mail suporte@cuidadelas.app" },
            { t: "Perguntas frequentes", d: "Encontre respostas rápidas sobre uso do aplicativo." },
            { t: "Termos de uso", d: "Leia nossos termos e política de privacidade." },
          ]} />}
          {screen === "cycle-about" && <SimplePage go={go} back="cycle-more" title="Sobre o aplicativo" icon={Info} sections={[
            { t: "CuidaDelas", d: "Versão 1.0.0 — Protótipo" },
            { t: "Missão", d: "Apoiar a saúde da mulher com informação, autocuidado e proteção." },
            { t: "Feito com 💜", d: "Projeto de hackathon." },
          ]} />}
          {screen === "create-pin" && <CreatePin go={go} />}
          {screen === "create-decoy-pin" && <CreateDecoyPin go={go} />}
          {screen === "gesture" && <GestureScreen go={go} />}
          {screen === "confirm-setup" && <ConfirmSetup go={go} />}
          {screen === "guardia-pin" && <GuardPin go={go} />}
          {screen === "guardia-home" && <GuardHome go={go} />}
          {screen === "guardia-chat" && <GuardChat go={go} />}
          {screen === "guardia-rights" && <GuardRights go={go} />}
          {screen === "guardia-proofs" && <GuardProofs go={go} />}
          {screen === "guardia-plan" && <GuardPlan go={go} />}
          {screen === "guardia-legal" && <GuardLegal go={go} openDetail={(t) => { setLegalOption(t); go("guardia-legal-detail"); }} />}
          {screen === "guardia-legal-detail" && <GuardLegalDetail go={go} option={legalOption} />}
          {screen === "guardia-reserve" && <GuardReserve go={go} />}
          {screen === "guardia-more" && <GuardMore go={go} />}
          {screen === "guardia-profile" && <GuardSimplePage go={go} title="Meu perfil" icon={User} sections={[
            { t: "Nome discreto", d: "Júlia" },
            { t: "Cadastro", d: "Ativo desde maio de 2025" },
            { t: "Contato de confiança", d: "Nenhum registrado" },
          ]} />}
          {screen === "guardia-change-pin" && <ChangePinScreen go={go} title="Alterar PIN principal" />}
          {screen === "guardia-change-decoy" && <ChangePinScreen go={go} title="Alterar PIN de disfarce" decoy />}
          {screen === "guardia-change-gesture" && <ChangeGestureScreen go={go} />}
          {screen === "guardia-security" && <GuardSimplePage go={go} title="Configurações de segurança" icon={Shield} sections={[
            { t: "Bloqueio automático", d: "Ativo — após 30 segundos" },
            { t: "Ocultar notificações", d: "Ativado" },
            { t: "Apagar após 5 tentativas erradas", d: "Ativado" },
            { t: "Modo pânico", d: "Toque duplo no botão de energia" },
          ]} />}
          {screen === "guardia-backup" && <GuardSimplePage go={go} title="Backup seguro" icon={HardDrive} sections={[
            { t: "Backup criptografado", d: "Último backup: hoje, 09:12" },
            { t: "Recuperação por frase secreta", d: "Configurada" },
            { t: "Exportar dados criptografados", d: "Disponível quando conectada à rede segura" },
          ]} />}
          {screen === "guardia-help-center" && <GuardSimplePage go={go} title="Central de ajuda" icon={HelpCircle} sections={[
            { t: "Ligue 180", d: "Central de atendimento à mulher (24h, gratuito)." },
            { t: "Ligue 190", d: "Emergência policial." },
            { t: "Defensoria Pública", d: "Atendimento jurídico gratuito." },
          ]} />}
          {screen === "guardia-faq" && <GuardSimplePage go={go} title="Perguntas frequentes" icon={BookOpen} sections={[
            { t: "O que é violência patrimonial?", d: "É o controle, retenção ou destruição de bens, documentos e recursos financeiros." },
            { t: "Meus dados ficam seguros?", d: "Sim, tudo é criptografado e protegido por PIN." },
            { t: "Alguém pode descobrir a GuardIA?", d: "O acesso é oculto por gesto e PIN de disfarce." },
          ]} />}
          {screen === "guardia-about" && <GuardSimplePage go={go} title="Sobre a GuardIA" icon={Info} sections={[
            { t: "GuardIA", d: "Versão 1.0.0 — Protótipo hackathon" },
            { t: "Propósito", d: "Apoiar mulheres em situação de violência patrimonial com discrição e segurança." },
            { t: "Feito com 💜", d: "Este é um protótipo educativo." },
          ]} />}
        </div>

        {/* Bottom navigation */}
        {showCycleNav && (
          <CycleBottomNav current={screen} go={go} onFlowerTap={handleFlowerTap} />
        )}
        {showGuardNav && <GuardBottomNav current={screen} go={go} />}
      </div>
    </div>
  );
}

/* ---------- Shared ---------- */

function ScreenHeader({
  title, onBack, right, dark,
}: { title?: string; onBack?: () => void; right?: ReactNode; dark?: boolean }) {
  return (
    <div className="flex items-center justify-between px-5 pt-6 pb-2">
      <div className="flex items-center gap-2">
        {onBack && (
          <button
            onClick={onBack}
            className={`grid h-10 w-10 place-items-center rounded-full ${
              dark ? "bg-white/10 text-white" : "bg-[#ffeaf4] text-[#f75ca2]"
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        {title && (
          <h1 className={`text-xl font-extrabold ${dark ? "text-white" : "text-[#211039]"}`}>
            {title}
          </h1>
        )}
      </div>
      {right}
    </div>
  );
}

function SimplePage({
  go, back, title, icon: Icon, sections,
}: { go: (s: Screen) => void; back: Screen; title: string; icon: any; sections: { t: string; d: string }[] }) {
  return (
    <div>
      <ScreenHeader title={title} onBack={() => go(back)} />
      <div className="px-5 mt-2">
        <div className="rounded-3xl bg-gradient-to-br from-[#ffeaf4] to-[#f4e9ff] p-5 flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white grid place-items-center text-[#f75ca2]">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <p className="font-extrabold text-[#211039]">{title}</p>
            <p className="text-xs text-[#7a7a8c]">Informações e configurações</p>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {sections.map((s, i) => (
            <div key={i} className="rounded-2xl bg-white border border-[#f7e7f0] p-4">
              <p className="font-bold text-[#211039]">{s.t}</p>
              <p className="text-sm text-[#7a7a8c] mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Cycle (Public) Screens ---------- */

function CycleHome({ go }: { go: (s: Screen) => void }) {
  const alerts = [
    {
      icon: Bell,
      eyebrow: "Aviso importante",
      title: "Governo anuncia campanha de vacinação feminina",
      text: "Confira calendário, público-alvo e postos de atendimento da sua região.",
      tone: "bg-[#fff4d9] text-[#7a5710]",
    },
    {
      icon: FileText,
      eyebrow: "Prevenção",
      title: "Como saber se você precisa de exame preventivo",
      text: "Entenda sinais de atenção e a frequência recomendada para acompanhamento.",
      tone: "bg-[#eaf7ff] text-[#175b7a]",
    },
    {
      icon: Shield,
      eyebrow: "Saúde pública",
      title: "Nova ação de cuidado integral para mulheres",
      text: "Programas com orientação, exames e acolhimento podem estar disponíveis no seu município.",
      tone: "bg-[#f3ebff] text-[#5f3e92]",
    },
  ];

  return (
    <div className="px-5 pt-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#7a7a8c]">Bem-vinda de volta</p>
          <h1 className="text-2xl font-extrabold text-[#211039]">Olá, Júlia 🌸</h1>
          <p className="text-sm text-[#7a7a8c] mt-1">Acompanhe seus registros de forma simples.</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#f75ca2] to-[#c66bff] grid place-items-center text-white font-bold">
          J
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-gradient-to-br from-[#f75ca2] to-[#c66bff] p-6 text-white shadow-lg shadow-pink-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/80 text-sm">Sua jornada de cuidado</p>
            <h2 className="text-xl font-extrabold">Agenda de cuidados</h2>
            <p className="text-white/90 text-sm mt-1">Organize seus registros e lembretes em um só lugar</p>
          </div>
          <CycleRing />
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm bg-white/15 rounded-full px-4 py-2">
          <Calendar className="h-4 w-4" />
          <span>Próximo lembrete importante em 13 dias</span>
        </div>
      </div>

      <button className="mt-4 w-full rounded-2xl bg-[#211039] text-white py-4 font-bold flex items-center justify-center gap-2 active:scale-[.98] transition">
        <HeartPulse className="h-5 w-5" /> Registrar check-in
      </button>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white border border-[#f7e7f0] p-4">
          <p className="text-[11px] text-[#7a7a8c] uppercase tracking-wide">Calendario</p>
          <p className="text-lg font-extrabold text-[#211039] mt-1">Visualize datas</p>
          <p className="text-[11px] text-[#7a7a8c]">lembretes e registros</p>
        </div>
        <div className="rounded-2xl bg-white border border-[#f7e7f0] p-4">
          <p className="text-[11px] text-[#7a7a8c] uppercase tracking-wide">Check-ins</p>
          <p className="text-lg font-extrabold text-[#211039] mt-1">Marque facilmente</p>
          <p className="text-[11px] text-[#7a7a8c]">suas atualizacoes do dia</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-[#211039]">Avisos e orientações</h3>
          <span className="text-xs font-semibold text-[#f75ca2]">Atualizado hoje</span>
        </div>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.title} className="rounded-2xl bg-white border border-[#f7e7f0] p-4">
              <div className="flex gap-3 items-start">
                <div className={`h-11 w-11 rounded-xl grid place-items-center ${alert.tone}`}>
                  <alert.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-extrabold uppercase tracking-wide text-[#7a7a8c]">
                    {alert.eyebrow}
                  </p>
                  <p className="font-semibold text-[#211039] mt-1">{alert.title}</p>
                  <p className="text-sm text-[#4b4b5c] mt-1">{alert.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold text-[#211039] mb-3">Cuidados para hoje</h3>
        <div className="rounded-2xl bg-[#ffeaf4] p-4 flex gap-3 items-start">
          <div className="h-10 w-10 rounded-xl bg-white grid place-items-center">
            <Sparkles className="h-5 w-5 text-[#f75ca2]" />
          </div>
          <div>
            <p className="font-semibold text-[#211039]">Seu autocuidado merece espaço</p>
            <p className="text-sm text-[#4b4b5c]">Reserve alguns minutos para hidratação, alongamento e uma refeição completa.</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => go("cycle-more")}
        className="mt-4 w-full text-center text-sm text-[#7a7a8c] py-2"
      >
        Ver mais opções
      </button>
    </div>
  );
}

function CycleRing() {
  return (
    <div className="relative h-20 w-20">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.25)" strokeWidth="8" fill="none" />
        <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="8" fill="none" strokeDasharray="264" strokeDashoffset="180" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-white">
        <div className="text-center leading-none">
          <div className="text-xl font-extrabold">13</div>
          <div className="text-[10px] opacity-80">para revisão</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-2xl bg-white border border-[#f7e7f0] p-3 text-center">
      <p className="text-[11px] text-[#7a7a8c] uppercase tracking-wide">{label}</p>
      <p className="text-lg font-extrabold text-[#211039]">{value}</p>
      <p className="text-[11px] text-[#7a7a8c]">{unit}</p>
    </div>
  );
}

/* ---------- Calendar ---------- */

const MONTHS_PT = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const WEEKDAYS_PT = ["D","S","T","Q","Q","S","S"];

function CycleCalendar() {
  const model = useCycleModel();
  const [cursor, setCursor] = useState<Date>(new Date(model.today.getFullYear(), model.today.getMonth(), 1));
  const [selected, setSelected] = useState<Date>(model.today);

  const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const firstDay = new Date(cursor.getFullYear(), cursor.getMonth(), 1).getDay();

  const periodEnd = new Date(model.periodStart); periodEnd.setDate(model.periodStart.getDate() + PERIOD_LENGTH - 1);
  const nextPeriodEnd = new Date(model.nextPeriod); nextPeriodEnd.setDate(model.nextPeriod.getDate() + PERIOD_LENGTH - 1);

  const classify = (d: Date) => {
    if (inRange(d, model.periodStart, periodEnd)) return "period";
    if (inRange(d, model.nextPeriod, nextPeriodEnd)) return "next";
    if (sameDay(d, model.ovulation)) return "ovulation";
    if (inRange(d, model.fertileStart, model.fertileEnd)) return "fertile";
    return "";
  };

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));

  const diffDays = Math.floor((selected.getTime() - model.periodStart.getTime()) / 86400000);
  const careDay = ((diffDays % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH + 1;
  const phase = careDay <= 5 ? "Atenção ao corpo" : careDay <= 13 ? "Rotina ativa" : careDay <= 15 ? "Avaliação" : "Recuperação";

  return (
    <div>
      <ScreenHeader title="Agenda de cuidados" />
      <div className="px-5">
        <div className="flex items-center justify-between mt-2">
          <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} className="h-10 w-10 grid place-items-center rounded-full bg-[#ffeaf4] text-[#f75ca2]"><ChevronLeft className="h-5 w-5" /></button>
          <p className="font-extrabold text-[#211039]">{MONTHS_PT[cursor.getMonth()]} {cursor.getFullYear()}</p>
          <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} className="h-10 w-10 grid place-items-center rounded-full bg-[#ffeaf4] text-[#f75ca2]"><ChevronRight className="h-5 w-5" /></button>
        </div>

        <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] text-[#7a7a8c]">
          {WEEKDAYS_PT.map((w, i) => <div key={i} className="py-1 font-semibold">{w}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (!d) return <div key={i} className="aspect-square" />;
            const cls = classify(d);
            const isToday = sameDay(d, model.today);
            const isSel = sameDay(d, selected);
            const bg =
              cls === "period" ? "bg-[#f75ca2] text-white" :
              cls === "next" ? "bg-[#f75ca2]/25 text-[#f75ca2] border border-dashed border-[#f75ca2]" :
              cls === "ovulation" ? "bg-[#6c35d8] text-white" :
              cls === "fertile" ? "bg-[#e9d8ff] text-[#6c35d8]" : "bg-white text-[#211039]";
            return (
              <button
                key={i}
                onClick={() => setSelected(d)}
                className={`aspect-square rounded-xl text-sm font-semibold relative ${bg} ${isSel ? "ring-2 ring-[#211039]" : ""}`}
              >
                {d.getDate()}
                {isToday && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-current" />}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
          <LegendDot color="bg-[#f75ca2]" label="Check-ins prioritários" />
          <LegendDot color="bg-[#f75ca2]/25 border border-dashed border-[#f75ca2]" label="Lembretes futuros" />
          <LegendDot color="bg-[#e9d8ff]" label="Autocuidado" />
          <LegendDot color="bg-[#6c35d8]" label="Consulta ou exame" />
        </div>

        <div className="mt-5 rounded-3xl bg-gradient-to-br from-[#ffeaf4] to-[#f4e9ff] p-5">
          <p className="text-xs text-[#7a7a8c]">{selected.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</p>
          <div className="flex items-center justify-between mt-1">
            <div>
              <p className="text-lg font-extrabold text-[#211039]">Dia {careDay} da jornada</p>
              <p className="text-sm text-[#6c35d8] font-semibold">{phase}</p>
            </div>
            <div className="h-14 w-14 rounded-2xl bg-white grid place-items-center">
              <HeartPulse className="h-6 w-6 text-[#f75ca2]" />
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-white p-4">
            <p className="text-[11px] text-[#7a7a8c] uppercase tracking-wide">Prevenção</p>
            <p className="mt-1 text-sm font-semibold text-[#211039]">Sua última prevenção foi em 12 de março.</p>
            <p className="mt-1 text-sm text-[#4b4b5c]">O ideal é repetir em até 180 dias.</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-[#6c35d8] font-semibold">
              <Calendar className="h-4 w-4" />
              <span>Próximo lembrete sugerido em 13 dias</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${color}`} />
      <span className="text-[#4b4b5c]">{label}</span>
    </div>
  );
}
/* ---------- Health (Flower single tap) ---------- */

function CycleHealth({ go }: { go: (s: Screen) => void }) {
  const phases = [
    { t: "Saúde hormonal", d: "Acompanhe sinais do corpo, energia, pele e mudanças de humor.", icon: Droplet, color: "from-[#f75ca2] to-[#c66bff]" },
    { t: "Corpo em movimento", d: "Atividade física e mobilidade ajudam na disposição e no bem-estar.", icon: Sun, color: "from-[#c66bff] to-[#a855f7]" },
    { t: "Saúde mental", d: "Rotina emocional, pausas e rede de apoio também fazem parte do cuidado.", icon: Sparkles, color: "from-[#6c35d8] to-[#f75ca2]" },
    { t: "Prevenção", d: "Check-ups, exames e acompanhamento médico fortalecem o cuidado contínuo.", icon: Moon, color: "from-[#211039] to-[#6c35d8]" },
  ];
  const tips = [
    { icon: Apple, t: "Alimentação", d: "Priorize verduras, frutas, grãos integrais, ferro e proteínas." },
    { icon: Droplet, t: "Hidratação", d: "Água ao longo do dia ajuda energia, pele e equilíbrio do corpo." },
    { icon: Dumbbell, t: "Exercícios", d: "Inclua caminhadas, alongamento e fortalecimento na sua rotina." },
    { icon: HeartPulse, t: "Saúde íntima", d: "Observe desconfortos, mantenha higiene adequada e busque orientação quando necessário." },
    { icon: Activity, t: "Check-ups", d: "Mantenha em dia exames preventivos, consultas e vacinas." },
  ];
  const symptoms = ["Cansaço persistente", "Dor de cabeça", "Estresse", "Alterações no sono", "Inchaço", "Oscilações de humor"];
  return (
    <div>
      <ScreenHeader title="Saúde da mulher" onBack={() => go("cycle-home")} />
      <div className="px-5 mt-2">
        <div className="rounded-3xl p-5 bg-gradient-to-br from-[#f75ca2] to-[#c66bff] text-white">
          <p className="text-white/80 text-xs">Conteúdo educativo</p>
          <h2 className="text-lg font-extrabold">Cuidado integral em um só lugar</h2>
          <p className="text-white/90 text-sm mt-1">Informação prática para saúde física, emocional, íntima e preventiva.</p>
        </div>

        <h3 className="font-bold text-[#211039] mt-6 mb-2">Pilares do cuidado</h3>
        <div className="space-y-2">
          {phases.map((p, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-[#f7e7f0]">
              <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${p.color} grid place-items-center text-white`}><p.icon className="h-5 w-5" /></div>
              <div className="flex-1"><p className="font-bold text-[#211039]">{p.t}</p><p className="text-xs text-[#7a7a8c]">{p.d}</p></div>
            </div>
          ))}
        </div>

        <h3 className="font-bold text-[#211039] mt-6 mb-2">Sinais para observar</h3>
        <div className="flex flex-wrap gap-2">
          {symptoms.map((s) => <span key={s} className="text-xs bg-[#ffeaf4] text-[#f75ca2] px-3 py-1.5 rounded-full font-semibold">{s}</span>)}
        </div>

        <h3 className="font-bold text-[#211039] mt-6 mb-2">Dicas de cuidado</h3>
        <div className="space-y-2">
          {tips.map((t, i) => (
            <div key={i} className="flex gap-3 p-4 rounded-2xl bg-[#f4e9ff]/60">
              <div className="h-10 w-10 rounded-xl bg-white grid place-items-center text-[#6c35d8]"><t.icon className="h-5 w-5" /></div>
              <div><p className="font-semibold text-[#211039]">{t.t}</p><p className="text-xs text-[#4b4b5c]">{t.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Analytics ---------- */

function CycleAnalytics() {
  const bars = [28, 29, 27, 28, 30, 28]; // last cycles length
  const moods = [Smile, Smile, Meh, Frown, Smile, Meh, Smile];
  return (
    <div>
      <ScreenHeader title="Análises" />
      <div className="px-5 mt-2">
        <div className="rounded-3xl p-5 bg-gradient-to-br from-[#f75ca2] to-[#6c35d8] text-white">
          <p className="text-white/80 text-xs">Últimos 6 meses</p>
          <h2 className="text-lg font-extrabold">Seu bem-estar está sendo acompanhado</h2>
          <p className="text-white/90 text-sm mt-1">Há bons sinais de constância nos seus hábitos de saúde.</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <BigStat label="Check-ins" value="24" unit="registrados" icon={CalendarDays} />
          <BigStat label="Sono" value="7,8" unit="horas médias" icon={Moon} />
          <BigStat label="Constância" value="94%" unit="na rotina" icon={TrendingUp} />
          <BigStat label="Energia" value="Boa" unit="predominante" icon={Activity} />
        </div>

        <div className="mt-5 rounded-2xl bg-white border border-[#f7e7f0] p-4">
          <p className="font-bold text-[#211039]">Rotina de autocuidado por mês</p>
          <div className="mt-4 flex items-end justify-between h-32 gap-2">
            {bars.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-[#f75ca2] to-[#c66bff]" style={{ height: `${(b / 32) * 100}%` }} />
                <span className="text-[10px] text-[#7a7a8c]">{b}d</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white border border-[#f7e7f0] p-4">
          <p className="font-bold text-[#211039]">Frequência de alertas registrados</p>
          <div className="mt-3 space-y-2">
            {[
              { s: "Cansaço", p: 62 }, { s: "Dor de cabeça", p: 35 }, { s: "Estresse", p: 48 }, { s: "Baixa energia", p: 41 },
            ].map((it) => (
              <div key={it.s}>
                <div className="flex justify-between text-xs text-[#4b4b5c]"><span>{it.s}</span><span className="font-semibold">{it.p}%</span></div>
                <div className="h-2 rounded-full bg-[#f4e9ff] overflow-hidden mt-1"><div className="h-full bg-gradient-to-r from-[#f75ca2] to-[#6c35d8]" style={{ width: `${it.p}%` }} /></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white border border-[#f7e7f0] p-4">
          <p className="font-bold text-[#211039]">Evolução do humor</p>
          <div className="mt-3 flex justify-between">
            {moods.map((M, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <M className="h-6 w-6 text-[#f75ca2]" />
                <span className="text-[10px] text-[#7a7a8c]">S{i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white border border-[#f7e7f0] p-4">
          <p className="font-bold text-[#211039]">Nível de energia</p>
          <div className="mt-3 flex items-end gap-1 h-20">
            {[3,4,2,5,3,2,1,2,3,4].map((v, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-[#6c35d8] to-[#c66bff] rounded" style={{ height: `${(v/5)*100}%` }} />
            ))}
          </div>
          <p className="text-xs text-[#7a7a8c] mt-2">Média: 2.9 / 5</p>
        </div>

        <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#f4e9ff] to-[#ffeaf4] p-4">
          <p className="font-bold text-[#211039]">Próximos lembretes</p>
          <ul className="mt-2 text-sm text-[#4b4b5c] space-y-1">
            <li>• Reforçar hidratação e sono nos próximos <b>3 dias</b></li>
            <li>• Consulta preventiva prevista em <b>13 dias</b></li>
            <li>• Atualizar exames e histórico de saúde este mês</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function BigStat({ label, value, unit, icon: Icon }: { label: string; value: string; unit: string; icon: any }) {
  return (
    <div className="rounded-2xl bg-white border border-[#f7e7f0] p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#7a7a8c]">{label}</p>
        <Icon className="h-4 w-4 text-[#f75ca2]" />
      </div>
      <p className="text-2xl font-extrabold text-[#211039] mt-1">{value}</p>
      <p className="text-[11px] text-[#7a7a8c]">{unit}</p>
    </div>
  );
}

/* ---------- More (Cycle) ---------- */

function CycleMore({ go }: { go: (s: Screen) => void }) {
  const items = [
    { icon: User, label: "Meu perfil", to: "cycle-profile" as Screen },
    { icon: HeartPulse, label: "Minha saúde", to: "cycle-my-health" as Screen },
    { icon: Bell, label: "Lembretes", to: "cycle-reminders" as Screen },
    { icon: Pill, label: "Medicamentos", to: "cycle-medications" as Screen },
    { icon: Target, label: "Objetivos", to: "cycle-goals" as Screen },
    { icon: GraduationCap, label: "Conteúdos educativos", to: "cycle-educational" as Screen },
    { icon: Settings, label: "Configurações", to: "cycle-settings" as Screen },
    { icon: Lock, label: "Privacidade", to: "cycle-privacy" as Screen },
    { icon: HelpCircle, label: "Ajuda", to: "cycle-help" as Screen },
    { icon: Info, label: "Sobre o aplicativo", to: "cycle-about" as Screen },
  ];
  return (
    <div>
      <ScreenHeader title="Mais" />
      <div className="px-5 mt-2 space-y-2">
        {items.map((it, i) => (
          <button key={i} onClick={() => go(it.to)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#f7e7f0] hover:bg-[#ffeaf4] transition">
            <div className="h-10 w-10 rounded-xl bg-[#ffeaf4] grid place-items-center text-[#f75ca2]">
              <it.icon className="h-5 w-5" />
            </div>
            <span className="flex-1 text-left font-semibold text-[#211039]">{it.label}</span>
            <ChevronRight className="h-5 w-5 text-[#c9c9d4]" />
          </button>
        ))}
      </div>
    </div>
  );
}

function RemindersPage({ go }: { go: (s: Screen) => void }) {
  const [items, setItems] = useState([
    { t: "Tomar medicação contínua", h: "21:00", on: true },
    { t: "Beber água", h: "A cada 2h", on: true },
    { t: "Registrar humor", h: "20:00", on: false },
    { t: "Agendar consulta anual", h: "Este mês", on: true },
  ]);
  return (
    <div>
      <ScreenHeader title="Lembretes" onBack={() => go("cycle-more")} />
      <div className="px-5 mt-2 space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#f7e7f0]">
            <div className="h-10 w-10 rounded-xl bg-[#ffeaf4] grid place-items-center text-[#f75ca2]"><Bell className="h-5 w-5" /></div>
            <div className="flex-1"><p className="font-bold text-[#211039]">{it.t}</p><p className="text-xs text-[#7a7a8c]">{it.h}</p></div>
            <button onClick={() => setItems((xs) => xs.map((x, j) => j === i ? { ...x, on: !x.on } : x))}
              className={`h-6 w-11 rounded-full transition relative ${it.on ? "bg-[#f75ca2]" : "bg-[#e9d8ff]"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${it.on ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function MedicationsPage({ go }: { go: (s: Screen) => void }) {
  const meds = [
    { t: "Anticoncepcional", d: "1 comprimido • 21:00" },
    { t: "Vitamina D", d: "1 gota • Manhã" },
    { t: "Ferro", d: "1 comprimido • Após almoço" },
  ];
  return (
    <div>
      <ScreenHeader title="Medicamentos" onBack={() => go("cycle-more")} />
      <div className="px-5 mt-2 space-y-2">
        {meds.map((m, i) => (
          <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#f7e7f0]">
            <div className="h-10 w-10 rounded-xl bg-[#f4e9ff] grid place-items-center text-[#6c35d8]"><Pill className="h-5 w-5" /></div>
            <div className="flex-1"><p className="font-bold text-[#211039]">{m.t}</p><p className="text-xs text-[#7a7a8c]">{m.d}</p></div>
            <ChevronRight className="h-5 w-5 text-[#c9c9d4]" />
          </div>
        ))}
        <button className="w-full mt-2 rounded-2xl bg-[#f75ca2] text-white py-3 font-bold">+ Adicionar medicamento</button>
      </div>
    </div>
  );
}

function GoalsPage({ go }: { go: (s: Screen) => void }) {
  const goals = [
    { t: "Beber 2L de água/dia", p: 65 },
    { t: "Dormir 8h por noite", p: 80 },
    { t: "3x exercícios na semana", p: 40 },
    { t: "Registrar humor diário", p: 90 },
  ];
  return (
    <div>
      <ScreenHeader title="Objetivos" onBack={() => go("cycle-more")} />
      <div className="px-5 mt-2 space-y-3">
        {goals.map((g, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white border border-[#f7e7f0]">
            <div className="flex justify-between"><p className="font-bold text-[#211039]">{g.t}</p><span className="text-sm font-bold text-[#f75ca2]">{g.p}%</span></div>
            <div className="mt-2 h-2 rounded-full bg-[#f4e9ff] overflow-hidden"><div className="h-full bg-gradient-to-r from-[#f75ca2] to-[#6c35d8]" style={{ width: `${g.p}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationalPage({ go }: { go: (s: Screen) => void }) {
  const arts = [
    { t: "Saúde hormonal na prática", d: "Como perceber sinais do corpo no dia a dia" },
    { t: "Alimentação e energia", d: "Hábitos que ajudam disposição e imunidade" },
    { t: "Saúde mental da mulher", d: "Estratégias simples para reduzir sobrecarga" },
    { t: "Prevenção e exames", d: "Cuidados anuais que valem atenção" },
  ];
  return (
    <div>
      <ScreenHeader title="Conteúdos educativos" onBack={() => go("cycle-more")} />
      <div className="px-5 mt-2 space-y-3">
        {arts.map((a, i) => (
          <div key={i} className="p-4 rounded-2xl bg-gradient-to-br from-[#ffeaf4] to-[#f4e9ff]">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-white grid place-items-center"><BookOpen className="h-5 w-5 text-[#f75ca2]" /></div>
              <div><p className="font-bold text-[#211039]">{a.t}</p><p className="text-xs text-[#7a7a8c]">{a.d}</p></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage({ go }: { go: (s: Screen) => void }) {
  const items = [
    "Idioma", "Notificações", "Aparência", "Unidade de peso", "Semana começa em", "Sincronizar dispositivos", "Sair da conta",
  ];
  return (
    <div>
      <ScreenHeader title="Configurações" onBack={() => go("cycle-more")} />
      <div className="px-5 mt-2 space-y-2">
        {items.map((it) => (
          <div key={it} className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#f7e7f0]">
            <span className="font-semibold text-[#211039]">{it}</span>
            <ChevronRight className="h-5 w-5 text-[#c9c9d4]" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Privacy + Setup (unchanged) ---------- */

function CyclePrivacy({ go }: { go: (s: Screen) => void }) {
  return (
    <div>
      <ScreenHeader title="Privacidade" onBack={() => go("cycle-more")} />
      <div className="px-5 mt-2">
        <p className="text-sm text-[#7a7a8c]">Configure recursos privados para proteger informações sensíveis.</p>
        <div className="mt-6 rounded-3xl bg-gradient-to-br from-[#f4e9ff] to-[#ffeaf4] p-5">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-white grid place-items-center"><Shield className="h-5 w-5 text-[#6c35d8]" /></div>
            <div>
              <h3 className="font-extrabold text-[#211039]">Ativar área protegida</h3>
              <p className="text-xs text-[#7a7a8c]">Camada de segurança para informações privadas e recursos de apoio.</p>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <ConfigCard icon={Lock} title="Criar PIN" desc="Defina um PIN principal para acessar sua área protegida." onClick={() => go("create-pin")} />
          <ConfigCard icon={Fingerprint} title="PIN de disfarce" desc="Abre uma tela neutra caso você precise manter discrição." onClick={() => go("create-decoy-pin")} />
          <ConfigCard icon={Flower2} title="Gesto secreto" desc="Escolha uma forma rápida e discreta de acesso." onClick={() => go("gesture")} />
        </div>
        <button onClick={() => go("create-pin")} className="mt-6 w-full rounded-2xl bg-[#f75ca2] text-white py-4 font-bold shadow-lg shadow-pink-200 active:scale-[.98] transition">
          Configurar agora
        </button>
      </div>
    </div>
  );
}

function ConfigCard({ icon: Icon, title, desc, onClick }: { icon: any; title: string; desc: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#f7e7f0] text-left hover:border-[#f75ca2] transition">
      <div className="h-10 w-10 rounded-xl bg-[#f4e9ff] grid place-items-center text-[#6c35d8] shrink-0"><Icon className="h-5 w-5" /></div>
      <div className="flex-1 min-w-0"><p className="font-bold text-[#211039]">{title}</p><p className="text-xs text-[#7a7a8c] mt-0.5">{desc}</p></div>
      <ChevronRight className="h-5 w-5 text-[#c9c9d4] mt-2" />
    </button>
  );
}

function PinKeyboard({ onKey, dark }: { onKey: (v: string) => void; dark?: boolean }) {
  const keys = ["1","2","3","4","5","6","7","8","9","","0","⌫"];
  return (
    <div className="grid grid-cols-3 gap-3">
      {keys.map((k, i) => (
        <button key={i} disabled={k === ""} onClick={() => k && onKey(k)}
          className={`h-16 rounded-2xl text-2xl font-bold transition active:scale-95 ${
            k === "" ? "opacity-0 pointer-events-none" :
            dark ? "bg-white/5 text-white hover:bg-white/10" : "bg-white border border-[#f7e7f0] text-[#211039] hover:bg-[#ffeaf4]"
          }`}>{k}</button>
      ))}
    </div>
  );
}

function PinDots({ length, dark, error }: { length: number; dark?: boolean; error?: boolean }) {
  return (
    <div className="flex justify-center gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className={`h-4 w-4 rounded-full transition ${
          error ? "bg-red-400" : i < length ? (dark ? "bg-white" : "bg-[#f75ca2]") : (dark ? "bg-white/20" : "bg-[#f4e9ff]")
        }`} />
      ))}
    </div>
  );
}

function CreatePin({ go }: { go: (s: Screen) => void }) {
  const [pin, setPin] = useState("");
  const onKey = (k: string) => { if (k === "⌫") setPin((p) => p.slice(0, -1)); else if (pin.length < 4) setPin((p) => p + k); };
  return (
    <div>
      <ScreenHeader onBack={() => go("cycle-privacy")} />
      <div className="px-6 mt-4 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-[#f4e9ff] grid place-items-center"><Lock className="h-6 w-6 text-[#6c35d8]" /></div>
        <h1 className="text-2xl font-extrabold text-[#211039] mt-4">Crie seu PIN</h1>
        <p className="text-sm text-[#7a7a8c] mt-2">Escolha uma senha de 4 dígitos. Evite datas óbvias.</p>
        <div className="mt-8"><PinDots length={pin.length} /></div>
        <div className="mt-8"><PinKeyboard onKey={onKey} /></div>
        <button disabled={pin.length < 4} onClick={() => go("create-decoy-pin")} className="mt-6 w-full rounded-2xl bg-[#f75ca2] text-white py-4 font-bold disabled:opacity-40">Continuar</button>
      </div>
    </div>
  );
}

function CreateDecoyPin({ go }: { go: (s: Screen) => void }) {
  const [pin, setPin] = useState("");
  const onKey = (k: string) => { if (k === "⌫") setPin((p) => p.slice(0, -1)); else if (pin.length < 4) setPin((p) => p + k); };
  return (
    <div>
      <ScreenHeader onBack={() => go("create-pin")} />
      <div className="px-6 mt-4 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-[#ffeaf4] grid place-items-center"><Fingerprint className="h-6 w-6 text-[#f75ca2]" /></div>
        <h1 className="text-2xl font-extrabold text-[#211039] mt-4">PIN de disfarce</h1>
        <p className="text-sm text-[#7a7a8c] mt-2 px-2">Esse PIN abre uma tela comum do aplicativo. Use em situações em que precise manter discrição.</p>
        <div className="mt-8"><PinDots length={pin.length} /></div>
        <div className="mt-8"><PinKeyboard onKey={onKey} /></div>
        <button onClick={() => go("gesture")} className="mt-6 w-full rounded-2xl bg-[#f75ca2] text-white py-4 font-bold">Salvar PIN de disfarce</button>
        <button onClick={() => go("gesture")} className="mt-3 text-sm text-[#7a7a8c] underline">Pular por enquanto</button>
      </div>
    </div>
  );
}

function GestureScreen({ go }: { go: (s: Screen) => void }) {
  const [sel, setSel] = useState(0);
  const opts = ["Tocar 3x no ícone da flor","Segurar o botão + por 3 segundos","Tocar 5x no título CuidaDelas"];
  return (
    <div>
      <ScreenHeader onBack={() => go("create-decoy-pin")} />
      <div className="px-6 mt-4">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-[#f4e9ff] grid place-items-center"><Flower2 className="h-6 w-6 text-[#6c35d8]" /></div>
          <h1 className="text-2xl font-extrabold text-[#211039] mt-4">Gesto secreto</h1>
          <p className="text-sm text-[#7a7a8c] mt-2">Escolha uma forma discreta de acessar a área protegida.</p>
        </div>
        <div className="mt-8 space-y-3">
          {opts.map((o, i) => (
            <button key={i} onClick={() => setSel(i)}
              className={`w-full p-4 rounded-2xl border-2 text-left font-semibold transition ${
                sel === i ? "border-[#f75ca2] bg-[#ffeaf4] text-[#211039]" : "border-[#f7e7f0] bg-white text-[#4b4b5c]"
              }`}>
              <div className="flex items-center gap-3">
                <div className={`h-5 w-5 rounded-full border-2 ${sel===i ? "border-[#f75ca2] bg-[#f75ca2]" : "border-[#c9c9d4]"} grid place-items-center`}>
                  {sel===i && <Check className="h-3 w-3 text-white" />}
                </div>
                {o}
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => go("confirm-setup")} className="mt-8 w-full rounded-2xl bg-[#f75ca2] text-white py-4 font-bold">Finalizar configuração</button>
      </div>
    </div>
  );
}

function ConfirmSetup({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="px-6 pt-16 text-center">
      <div className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-[#f75ca2] to-[#6c35d8] grid place-items-center shadow-xl">
        <Check className="h-10 w-10 text-white" strokeWidth={3} />
      </div>
      <h1 className="text-2xl font-extrabold text-[#211039] mt-6">Área protegida ativada</h1>
      <p className="text-sm text-[#7a7a8c] mt-2">Sua área protegida está pronta.</p>
      <div className="mt-6 rounded-2xl bg-[#f4e9ff] p-5 text-left space-y-3">
        <InfoRow n="1" t="Toque 3x no ícone da flor ou vá em Mais > Privacidade." />
        <InfoRow n="2" t="Digite seu PIN principal." />
        <InfoRow n="3" t="Use o PIN de disfarce se precisar manter discrição." />
      </div>
      <button onClick={() => go("cycle-home")} className="mt-8 w-full rounded-2xl bg-[#f75ca2] text-white py-4 font-bold">Entendi</button>
      <p className="text-xs text-[#7a7a8c] mt-4">Dica: para testar, toque 3x no ícone da flor na barra inferior. PIN: 1234</p>
    </div>
  );
}

function InfoRow({ n, t }: { n: string; t: string }) {
  return (
    <div className="flex gap-3">
      <div className="h-6 w-6 shrink-0 rounded-full bg-[#6c35d8] text-white grid place-items-center text-xs font-bold">{n}</div>
      <p className="text-sm text-[#4b4b5c]">{t}</p>
    </div>
  );
}

/* ---------- GuardIA ---------- */

function GuardPin({ go }: { go: (s: Screen) => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const onKey = (k: string) => {
    setError(false);
    if (k === "⌫") { setPin((p) => p.slice(0, -1)); return; }
    if (pin.length >= 4) return;
    const next = pin + k;
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === MAIN_PIN) go("guardia-home");
        else if (next === DECOY_PIN) go("cycle-home");
        else { setError(true); setTimeout(() => { setPin(""); setError(false); }, 600); }
      }, 200);
    }
  };
  return (
    <div className="px-6 pt-10 text-center text-white">
      <button onClick={() => go("cycle-home")} className="absolute top-6 left-6 text-white/60 text-sm">Cancelar</button>
      <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-[#6c35d8] to-[#f75ca2] grid place-items-center shadow-lg shadow-purple-900/50">
        <ShieldCheck className="h-8 w-8 text-white" />
      </div>
      <h1 className="text-3xl font-extrabold mt-4 tracking-tight">GuardIA</h1>
      <p className="text-white/60 text-sm mt-6">Digite seu PIN</p>
      <div className="mt-6"><PinDots length={pin.length} dark error={error} /></div>
      <div className="mt-10"><PinKeyboard onKey={onKey} dark /></div>
      <button className="mt-6 text-sm text-white/60 underline">Esqueci meu PIN</button>
      <p className="text-[11px] text-white/30 mt-6">Protótipo — PIN principal 1234 · disfarce 0000</p>
    </div>
  );
}

function QuickExit({ go }: { go: (s: Screen) => void }) {
  return (
    <button onClick={() => go("cycle-home")}
      className="flex items-center gap-1.5 text-xs font-semibold text-white/70 bg-white/10 rounded-full px-3 py-1.5 hover:bg-white/20">
      <LogOut className="h-3.5 w-3.5" /> Voltar ao CuidaDelas
    </button>
  );
}

function GuardHeader({ go, title, back }: { go: (s: Screen) => void; title?: string; back?: Screen }) {
  return (
    <div className="flex items-center justify-between px-5 pt-6">
      <div className="flex items-center gap-2">
        {back && (
          <button onClick={() => go(back)} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white">
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        {title && <h1 className="text-xl font-extrabold text-white">{title}</h1>}
      </div>
      <QuickExit go={go} />
    </div>
  );
}

function GuardHome({ go }: { go: (s: Screen) => void }) {
  const cards = [
    { icon: MessageCircle, title: "Converse com a IA", desc: "Fale sobre o que está acontecendo.", to: "guardia-chat" as Screen, color: "from-[#6c35d8] to-[#a855f7]" },
    { icon: BookOpen, title: "Entenda seus direitos", desc: "Informações simples sobre violência patrimonial.", to: "guardia-rights" as Screen, color: "from-[#f75ca2] to-[#c66bff]" },
    { icon: FolderLock, title: "Organize suas provas", desc: "Guarde documentos, prints, áudios e anotações.", to: "guardia-proofs" as Screen, color: "from-[#4c1d95] to-[#6c35d8]" },
    { icon: ShieldCheck, title: "Plano de segurança", desc: "Dicas personalizadas para sua proteção.", to: "guardia-plan" as Screen, color: "from-[#c66bff] to-[#f75ca2]" },
    { icon: Scale, title: "Apoio jurídico", desc: "Encontre atendimento próximo de você.", to: "guardia-legal" as Screen, color: "from-[#6c35d8] to-[#f75ca2]" },
    { icon: PiggyBank, title: "Reserva de segurança", desc: "Comece uma pequena reserva possível.", to: "guardia-reserve" as Screen, color: "from-[#a855f7] to-[#6c35d8]" },
  ];
  return (
    <div>
      <GuardHeader go={go} />
      <div className="px-5 mt-4 text-white">
        <p className="text-sm text-white/60">Você está segura aqui</p>
        <h1 className="text-3xl font-extrabold mt-1">Olá, Júlia 💜</h1>
        <p className="text-white/70 mt-1">Como posso te apoiar hoje?</p>
        <div className="mt-6 space-y-3">
          {cards.map((c, i) => (
            <button key={i} onClick={() => go(c.to)}
              className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-left">
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${c.color} grid place-items-center shrink-0`}>
                <c.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0"><p className="font-bold text-white">{c.title}</p><p className="text-xs text-white/60 mt-0.5">{c.desc}</p></div>
              <ChevronRight className="h-5 w-5 text-white/40" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function GuardChat({ go }: { go: (s: Screen) => void }) {
  type Msg = { role: "ai" | "me"; text: string };
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "ai", text: "Olá, Júlia. Estou aqui para te ouvir e te ajudar. 💜" },
    { role: "ai", text: "Antes de começarmos: você está em um lugar seguro para conversar agora?" },
  ]);
  const [input, setInput] = useState("");

  const quicks: { label: string; reply: string; to?: Screen }[] = [
    { label: "Entender meus direitos", reply: "Ótimo. Vou te levar para uma explicação simples sobre seus direitos.", to: "guardia-rights" },
    { label: "Organizar provas", reply: "Vamos organizar suas provas com segurança e sigilo.", to: "guardia-proofs" },
    { label: "Plano de segurança", reply: "Vou te ajudar a montar um plano personalizado agora.", to: "guardia-plan" },
    { label: "Falar com apoio jurídico", reply: "Vou te mostrar as opções de apoio jurídico disponíveis.", to: "guardia-legal" },
  ];

  const send = (t: string) => {
    if (!t.trim()) return;
    setMsgs((m) => [...m, { role: "me", text: t }, { role: "ai", text: "Obrigada por compartilhar. Vou te ajudar com o próximo passo com cuidado e segurança." }]);
    setInput("");
  };

  const chooseQuick = (q: { label: string; reply: string; to?: Screen }) => {
    setMsgs((m) => [...m, { role: "me", text: q.label }, { role: "ai", text: q.reply }]);
    if (q.to) setTimeout(() => go(q.to!), 700);
  };

  return (
    <div className="flex flex-col h-full">
      <GuardHeader go={go} title="Converse com a IA" back="guardia-home" />
      <div className="flex-1 px-5 pt-4 space-y-3 overflow-y-auto">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
              m.role === "me" ? "bg-[#f75ca2] text-white rounded-br-sm" : "bg-white/10 text-white rounded-bl-sm"
            }`}>{m.text}</div>
          </div>
        ))}
        <div className="flex flex-wrap gap-2 pt-2">
          {quicks.map((c) => (
            <button key={c.label} onClick={() => chooseQuick(c)}
              className="text-xs bg-white/10 text-white rounded-full px-3 py-2 border border-white/10 hover:bg-white/20">
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-5 py-3 border-t border-white/10 bg-[#12091f] flex items-center gap-2 mb-16">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Digite sua mensagem..."
          className="flex-1 bg-white/5 text-white placeholder:text-white/40 rounded-full px-4 py-3 text-sm outline-none border border-white/10" />
        <button onClick={() => send(input)} className="h-11 w-11 rounded-full bg-[#f75ca2] grid place-items-center text-white">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function GuardRights({ go }: { go: (s: Screen) => void }) {
  const items = [
    { t: "Controle financeiro", d: "Quando alguém controla seu salário, cartão, Pix, benefício ou impede você de usar seu próprio dinheiro." },
    { t: "Retenção de documentos", d: "Quando alguém esconde ou retém RG, CPF, carteira de trabalho, cartões ou documentos dos filhos." },
    { t: "Dívidas em seu nome", d: "Quando alguém usa seu CPF, cartão ou nome para fazer dívidas sem sua vontade." },
    { t: "Destruição de bens", d: "Quando alguém quebra, vende, esconde ou toma seus objetos, celular, documentos ou ferramentas de trabalho." },
  ];
  return (
    <div>
      <GuardHeader go={go} title="Seus direitos" back="guardia-home" />
      <div className="px-5 mt-4 text-white">
        <p className="text-sm text-white/70">
          Violência patrimonial acontece quando alguém controla, retém, destrói ou usa seus bens, documentos, dinheiro ou recursos financeiros sem consentimento.
        </p>
        <div className="mt-5 space-y-3">
          {items.map((it, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="font-bold text-white">{it.t}</p>
              <p className="text-sm text-white/70 mt-1">{it.d}</p>
            </div>
          ))}
        </div>
        <button onClick={() => go("guardia-proofs")} className="mt-6 w-full rounded-2xl bg-[#f75ca2] text-white py-4 font-bold">
          Quero organizar meu caso
        </button>
      </div>
    </div>
  );
}

function GuardProofs({ go }: { go: (s: Screen) => void }) {
  type Kind = "Print" | "Áudio" | "Documento" | "Foto";
  const [tab, setTab] = useState<"Tudo" | Kind>("Tudo");
  const [modal, setModal] = useState(false);
  const files: { kind: Kind; icon: any; name: string; meta: string }[] = [
    { kind: "Documento", icon: FileIcon, name: "Extrato bancário", meta: "12/05/2025 • PDF" },
    { kind: "Print", icon: MessageCircle, name: "Conversa WhatsApp", meta: "11/05/2025 • Print" },
    { kind: "Áudio", icon: Mic, name: "Áudio da discussão", meta: "10/05/2025 • 02:15" },
    { kind: "Foto", icon: ImageIcon, name: "Foto do cartão retido", meta: "09/05/2025 • Imagem" },
    { kind: "Documento", icon: FileIcon, name: "Comprovante de renda", meta: "08/05/2025 • PDF" },
    { kind: "Print", icon: MessageCircle, name: "Print do Pix bloqueado", meta: "07/05/2025 • Print" },
  ];
  const tabs: ("Tudo" | Kind)[] = ["Tudo", "Print", "Áudio", "Documento", "Foto"];
  const labelPlural: Record<string, string> = { "Tudo":"Tudo","Print":"Prints","Áudio":"Áudios","Documento":"Documentos","Foto":"Fotos" };

  const filtered = tab === "Tudo" ? files : files.filter((f) => f.kind === tab);
  const count = (k: "Tudo" | Kind) => k === "Tudo" ? files.length : files.filter((f) => f.kind === k).length;

  const iconColor: Record<Kind, string> = {
    "Print": "from-[#6c35d8] to-[#a855f7]",
    "Áudio": "from-[#a855f7] to-[#f75ca2]",
    "Documento": "from-[#4c1d95] to-[#6c35d8]",
    "Foto": "from-[#f75ca2] to-[#c66bff]",
  };

  return (
    <div>
      <GuardHeader go={go} title="Minhas provas" back="guardia-home" />
      <div className="px-5 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 ${
                tab === t ? "bg-[#f75ca2] text-white" : "bg-white/5 text-white/70 border border-white/10"
              }`}>
              {labelPlural[t]}
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab === t ? "bg-white/25" : "bg-white/10"}`}>{count(t)}</span>
            </button>
          ))}
        </div>

        <p className="text-xs text-white/50 mt-2">{filtered.length} {filtered.length === 1 ? "arquivo" : "arquivos"}</p>

        <div className="mt-2 space-y-2">
          {filtered.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${iconColor[f.kind]} grid place-items-center shrink-0`}>
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{f.name}</p>
                <p className="text-xs text-white/50">{f.meta}</p>
              </div>
              <span className="text-[10px] uppercase tracking-wide text-white/40">{f.kind}</span>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-10 text-white/50 text-sm">Nenhum arquivo nesta categoria ainda.</div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-white/60 justify-center">
          <ShieldCheck className="h-4 w-4" /> Seus arquivos estão protegidos e criptografados.
        </div>
      </div>

      <button onClick={() => setModal(true)}
        className="absolute bottom-24 right-6 h-14 w-14 rounded-full bg-[#f75ca2] grid place-items-center shadow-xl shadow-pink-900/50 text-white">
        <Plus className="h-6 w-6" />
      </button>

      {modal && (
        <div className="absolute inset-0 bg-black/60 grid items-end z-20" onClick={() => setModal(false)}>
          <div className="bg-[#211039] rounded-t-3xl p-5 pb-8 w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-lg">Adicionar prova</h3>
              <button onClick={() => setModal(false)} className="text-white/60"><X className="h-5 w-5" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { i: FileIcon, l: "Documento" }, { i: ImageIcon, l: "Print" },
                { i: Camera, l: "Foto" }, { i: Mic, l: "Áudio" }, { i: Pencil, l: "Anotação" },
              ].map((o, i) => (
                <button key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-2 text-white">
                  <o.i className="h-6 w-6 text-[#f75ca2]" />
                  <span className="text-sm font-semibold">{o.l}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GuardPlan({ go }: { go: (s: Screen) => void }) {
  const [ans, setAns] = useState<Record<number, string>>({});
  const qs = [
    { q: "Você está em um lugar seguro agora?", opts: ["Sim","Não","Não tenho certeza"] },
    { q: "A pessoa tem acesso ao seu celular?", opts: ["Sim","Não","Talvez"] },
    { q: "Você tem alguém de confiança?", opts: ["Sim","Não"] },
    { q: "Você possui algum dinheiro ou renda própria?", opts: ["Sim","Não","Parcialmente"] },
  ];
  const answered = Object.keys(ans).length === qs.length;

  // Dynamic plan
  const plan: string[] = [];
  if (ans[0] === "Não" || ans[0] === "Não tenho certeza") plan.push("Identifique um cômodo ou local seguro para onde ir em caso de risco.");
  if (ans[0] === "Sim") plan.push("Aproveite este momento seguro para organizar informações importantes.");
  if (ans[1] === "Sim" || ans[1] === "Talvez") {
    plan.push("Use este app com o PIN de disfarce (0000) quando estiver perto da pessoa.");
    plan.push("Ative o bloqueio automático e ocultação de notificações da GuardIA.");
    plan.push("Evite salvar prints no rolo da câmera — use apenas 'Minhas Provas'.");
  } else if (ans[1] === "Não") {
    plan.push("Faça backup criptografado dos seus documentos agora que tem acesso livre ao celular.");
  }
  if (ans[2] === "Não") {
    plan.push("Ligue 180 (Central da Mulher) — atendimento gratuito e sigiloso 24h.");
    plan.push("Procure uma ONG parceira para apoio emocional e encaminhamento.");
  } else if (ans[2] === "Sim") {
    plan.push("Combine uma palavra-código com sua pessoa de confiança para pedir ajuda.");
  }
  if (ans[3] === "Não") {
    plan.push("Procure a Defensoria Pública para orientação sobre pensão e patrimônio.");
    plan.push("Comece uma reserva mínima possível (mesmo R$ 5 por semana) na aba Reserva.");
    plan.push("Verifique benefícios sociais disponíveis (Bolsa Família, auxílio, CRAS).");
  } else if (ans[3] === "Parcialmente") {
    plan.push("Abra uma conta digital em seu nome (sem tarifas) para separar seu dinheiro.");
    plan.push("Documente comprovantes de renda e gastos como prova patrimonial.");
  } else if (ans[3] === "Sim") {
    plan.push("Mantenha comprovantes da sua renda separados como prova de autonomia.");
  }
  plan.push("Guarde cópias digitais de RG, CPF e certidões em Minhas Provas.");

  return (
    <div>
      <GuardHeader go={go} title="Plano de segurança" back="guardia-home" />
      <div className="px-5 mt-4 text-white">
        <p className="text-sm text-white/70">Responda às perguntas para gerar um plano personalizado.</p>
        <div className="mt-5 space-y-3">
          {qs.map((it, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="font-semibold text-white">{it.q}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {it.opts.map((o) => (
                  <button key={o} onClick={() => setAns((a) => ({ ...a, [i]: o }))}
                    className={`text-xs px-3 py-2 rounded-full border ${
                      ans[i] === o ? "bg-[#f75ca2] text-white border-[#f75ca2]" : "bg-white/5 text-white/80 border-white/10"
                    }`}>{o}</button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {answered ? (
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-[#6c35d8]/40 to-[#f75ca2]/30 border border-white/10 p-4">
            <h3 className="font-bold text-white">Seu plano personalizado</h3>
            <p className="text-xs text-white/70 mt-1">Gerado com base nas suas respostas</p>
            <ul className="mt-3 space-y-2">
              {plan.map((s, i) => (
                <PlanCheckItem key={i} text={s} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-white/5 border border-white/10 p-4 text-center text-sm text-white/60">
            Responda todas as perguntas para gerar seu plano.
          </div>
        )}

        <button onClick={() => go("guardia-legal")} className="mt-6 w-full rounded-2xl bg-[#f75ca2] text-white py-4 font-bold">
          Ver apoio jurídico
        </button>
      </div>
    </div>
  );
}

function PlanCheckItem({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <li>
      <button onClick={() => setDone((d) => !d)} className="w-full flex items-start gap-3 text-left text-sm text-white/90">
        <div className={`h-5 w-5 rounded-md border grid place-items-center shrink-0 mt-0.5 ${done ? "bg-[#f75ca2] border-[#f75ca2]" : "border-white/40"}`}>
          {done && <Check className="h-3 w-3 text-white" />}
        </div>
        <span className={done ? "line-through text-white/50" : ""}>{text}</span>
      </button>
    </li>
  );
}

function GuardLegal({ go, openDetail }: { go: (s: Screen) => void; openDetail: (t: string) => void }) {
  const cards = [
    { t: "Defensoria Pública", d: "Atendimento gratuito", cta: "Ver orientações", icon: Building2 },
    { t: "ONG parceira", d: "Apoio social e encaminhamento", cta: "Solicitar contato", icon: HandHeart },
    { t: "Advogada voluntária", d: "Disponível para triagem inicial", cta: "Pedir atendimento", icon: Gavel },
  ];
  return (
    <div>
      <GuardHeader go={go} title="Apoio jurídico" back="guardia-home" />
      <div className="px-5 mt-4 text-white">
        <p className="text-sm text-white/70">
          Podemos te ajudar a encontrar apoio jurídico, social ou institucional próximo de você.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none">
            <option className="bg-[#211039]">Estado</option>
            <option className="bg-[#211039]">SP</option><option className="bg-[#211039]">RJ</option>
            <option className="bg-[#211039]">MG</option><option className="bg-[#211039]">BA</option>
          </select>
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none">
            <option className="bg-[#211039]">Cidade</option>
            <option className="bg-[#211039]">São Paulo</option><option className="bg-[#211039]">Campinas</option>
          </select>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Jurídico","Social","Psicológico","Financeiro"].map((t) => (
            <button key={t} className="text-xs px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/80">{t}</button>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {cards.map((c, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-start gap-3">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#6c35d8] to-[#f75ca2] grid place-items-center">
                  <c.icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-white">{c.t}</p>
                  <p className="text-xs text-white/60 mt-0.5">{c.d}</p>
                </div>
              </div>
              <button onClick={() => openDetail(c.t)}
                className="mt-3 w-full rounded-xl bg-white/10 text-white py-2.5 text-sm font-semibold hover:bg-white/20">
                {c.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-[#f75ca2]/15 border border-[#f75ca2]/30 p-4 flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-[#f75ca2] mt-0.5 shrink-0" />
          <p className="text-xs text-white/80">Antes de solicitar contato, escolha uma forma segura para ser chamada.</p>
        </div>
      </div>
    </div>
  );
}

function GuardLegalDetail({ go, option }: { go: (s: Screen) => void; option: string }) {
  const data: Record<string, { desc: string; how: string; docs: string[]; hours: string; icon: any }> = {
    "Defensoria Pública": {
      desc: "Serviço público gratuito de assistência jurídica para quem não pode pagar advogado.",
      how: "Atende presencialmente e por telefone. Faz encaminhamento, orientação e representação judicial.",
      docs: ["RG e CPF", "Comprovante de residência", "Documentos do caso (se houver)", "Comprovante de renda"],
      hours: "Segunda a sexta, das 09h às 17h",
      icon: Building2,
    },
    "ONG parceira": {
      desc: "Organização social especializada em acolhimento de mulheres em situação de violência.",
      how: "Oferece acolhimento, apoio psicológico, orientação jurídica e encaminhamento para rede de proteção.",
      docs: ["Documento de identificação (se possível)", "Nenhum documento é obrigatório para atendimento inicial"],
      hours: "Segunda a sábado, das 08h às 20h",
      icon: HandHeart,
    },
    "Advogada voluntária": {
      desc: "Advogada cadastrada no programa de apoio voluntário para triagem inicial e orientação.",
      how: "Atende por videochamada agendada. Faz avaliação do caso e recomenda próximos passos.",
      docs: ["Documento de identificação", "Descrição breve do caso", "Provas já organizadas (se houver)"],
      hours: "Terça e quinta, das 18h às 21h",
      icon: Gavel,
    },
  };
  const info = data[option] ?? data["Defensoria Pública"];
  const Icon = info.icon;
  return (
    <div>
      <GuardHeader go={go} title={option || "Detalhes"} back="guardia-legal" />
      <div className="px-5 mt-4 text-white space-y-4">
        <div className="rounded-3xl p-5 bg-gradient-to-br from-[#6c35d8] to-[#f75ca2]">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/20 grid place-items-center"><Icon className="h-6 w-6 text-white" /></div>
            <div><p className="text-white/80 text-xs">Apoio jurídico</p><p className="font-extrabold text-lg">{option}</p></div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <p className="font-bold text-white">Descrição</p>
          <p className="text-sm text-white/70 mt-1">{info.desc}</p>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <p className="font-bold text-white">Como funciona</p>
          <p className="text-sm text-white/70 mt-1">{info.how}</p>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
          <p className="font-bold text-white">Documentos necessários</p>
          <ul className="mt-2 space-y-1 text-sm text-white/80">
            {info.docs.map((d, i) => (
              <li key={i} className="flex items-center gap-2"><FileCheck className="h-4 w-4 text-[#f75ca2]" /> {d}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center gap-3">
          <Clock className="h-5 w-5 text-[#f75ca2]" />
          <div><p className="font-bold text-white text-sm">Horário de atendimento</p><p className="text-xs text-white/70">{info.hours}</p></div>
        </div>

        <button className="w-full rounded-2xl bg-[#f75ca2] text-white py-4 font-bold flex items-center justify-center gap-2">
          <PhoneCall className="h-5 w-5" /> Solicitar encaminhamento
        </button>
      </div>
    </div>
  );
}

function GuardReserve({ go }: { go: (s: Screen) => void }) {
  const [val, setVal] = useState<number>(10);
  const [custom, setCustom] = useState("");
  const options = [5, 10, 20];
  const goal = val * 10; // 10 semanas
  const [saved, setSaved] = useState(0);
  const progress = Math.min(100, Math.round((saved / goal) * 100));

  const [checks, setChecks] = useState<Record<number, boolean>>({});
  const items = [
    "Separar valor pequeno quando for seguro",
    "Evitar movimentações que gerem risco",
    "Priorizar dinheiro para transporte e documentos",
    "Guardar contatos importantes",
    "Abrir conta digital em meu nome (sem tarifas)",
  ];

  return (
    <div>
      <GuardHeader go={go} title="Reserva de segurança" back="guardia-home" />
      <div className="px-5 mt-4 text-white">
        <p className="text-sm text-white/70">
          Vamos criar uma meta possível para que você tenha um pequeno apoio financeiro em caso de necessidade.
        </p>

        <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-4">
          <p className="text-sm font-semibold text-white">Você consegue guardar algum valor por semana?</p>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {options.map((v) => (
              <button key={v} onClick={() => { setVal(v); setCustom(""); }}
                className={`py-3 rounded-xl text-sm font-bold border ${
                  val === v && !custom ? "bg-[#f75ca2] text-white border-[#f75ca2]" : "bg-white/5 text-white/80 border-white/10"
                }`}>R$ {v}</button>
            ))}
            <input
              value={custom}
              onChange={(e) => { const n = e.target.value.replace(/\D/g,""); setCustom(n); if (n) setVal(Number(n) || 0); }}
              placeholder="Outro"
              className={`py-3 rounded-xl text-sm font-bold border text-center outline-none ${
                custom ? "bg-[#f75ca2] text-white border-[#f75ca2] placeholder:text-white/70" : "bg-white/5 text-white/80 border-white/10 placeholder:text-white/50"
              }`}
            />
          </div>
        </div>

        <div className="mt-4 rounded-3xl p-5 bg-gradient-to-br from-[#f75ca2] to-[#6c35d8] text-white">
          <p className="text-white/80 text-xs">Meta em 10 semanas</p>
          <p className="text-3xl font-extrabold mt-1">R$ {goal}</p>
          <p className="text-white/80 text-xs mt-2">Guardando R$ {val} por semana.</p>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-white/80">R$ {saved} guardados de R$ {goal}</p>
            <div className="flex gap-2">
              <button onClick={() => setSaved((s) => Math.max(0, s - val))} className="text-xs bg-white/20 rounded-full px-3 py-1">−</button>
              <button onClick={() => setSaved((s) => Math.min(goal, s + val))} className="text-xs bg-white/20 rounded-full px-3 py-1">+ R$ {val}</button>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white">Checklist</h3>
            <span className="text-xs text-white/60">{Object.values(checks).filter(Boolean).length}/{items.length}</span>
          </div>
          <ul className="space-y-2">
            {items.map((t, i) => (
              <li key={i}>
                <button onClick={() => setChecks((c) => ({ ...c, [i]: !c[i] }))}
                  className="w-full flex items-start gap-3 text-sm text-white/90 text-left">
                  <div className={`h-5 w-5 rounded-md border grid place-items-center shrink-0 mt-0.5 ${checks[i] ? "bg-[#f75ca2] border-[#f75ca2]" : "border-white/40"}`}>
                    {checks[i] && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className={checks[i] ? "line-through text-white/50" : ""}>{t}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- GuardIA More ---------- */

function GuardSimplePage({
  go, title, icon: Icon, sections,
}: { go: (s: Screen) => void; title: string; icon: any; sections: { t: string; d: string }[] }) {
  return (
    <div>
      <GuardHeader go={go} title={title} back="guardia-more" />
      <div className="px-5 mt-4 text-white">
        <div className="rounded-3xl bg-gradient-to-br from-[#6c35d8]/40 to-[#f75ca2]/30 border border-white/10 p-5 flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-white/10 grid place-items-center"><Icon className="h-6 w-6 text-white" /></div>
          <div><p className="font-extrabold">{title}</p><p className="text-xs text-white/60">Área protegida</p></div>
        </div>
        <div className="mt-4 space-y-3">
          {sections.map((s, i) => (
            <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="font-bold text-white">{s.t}</p>
              <p className="text-sm text-white/70 mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GuardMore({ go }: { go: (s: Screen) => void }) {
  const items: { icon: any; label: string; to: Screen }[] = [
    { icon: User, label: "Meu perfil", to: "guardia-profile" },
    { icon: KeyRound, label: "Alterar PIN", to: "guardia-change-pin" },
    { icon: Fingerprint, label: "Alterar PIN de disfarce", to: "guardia-change-decoy" },
    { icon: Flower2, label: "Alterar gesto secreto", to: "guardia-change-gesture" },
    { icon: Shield, label: "Configurações de segurança", to: "guardia-security" },
    { icon: HardDrive, label: "Backup seguro", to: "guardia-backup" },
    { icon: HelpCircle, label: "Central de ajuda", to: "guardia-help-center" },
    { icon: BookOpen, label: "Perguntas frequentes", to: "guardia-faq" },
    { icon: Info, label: "Sobre a GuardIA", to: "guardia-about" },
  ];
  return (
    <div>
      <GuardHeader go={go} title="Mais" />
      <div className="px-5 mt-4 space-y-2">
        {items.map((it, i) => (
          <button key={i} onClick={() => go(it.to)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-left">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#6c35d8] to-[#f75ca2] grid place-items-center text-white">
              <it.icon className="h-5 w-5" />
            </div>
            <span className="flex-1 font-semibold text-white">{it.label}</span>
            <ChevronRight className="h-5 w-5 text-white/40" />
          </button>
        ))}
      </div>
    </div>
  );
}

function ChangePinScreen({ go, title, decoy }: { go: (s: Screen) => void; title: string; decoy?: boolean }) {
  const [pin, setPin] = useState("");
  const [saved, setSaved] = useState(false);
  const onKey = (k: string) => {
    if (k === "⌫") setPin((p) => p.slice(0, -1));
    else if (pin.length < 4) setPin((p) => p + k);
  };
  return (
    <div>
      <GuardHeader go={go} title={title} back="guardia-more" />
      <div className="px-6 mt-4 text-center text-white">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-white/10 grid place-items-center">
          {decoy ? <Fingerprint className="h-6 w-6 text-[#f75ca2]" /> : <KeyRound className="h-6 w-6 text-[#f75ca2]" />}
        </div>
        <p className="text-sm text-white/70 mt-4">Digite o novo PIN de 4 dígitos.</p>
        <div className="mt-6"><PinDots length={pin.length} dark /></div>
        <div className="mt-8"><PinKeyboard onKey={onKey} dark /></div>
        <button disabled={pin.length < 4} onClick={() => { setSaved(true); setTimeout(() => go("guardia-more"), 800); }}
          className="mt-6 w-full rounded-2xl bg-[#f75ca2] text-white py-4 font-bold disabled:opacity-40">
          {saved ? "PIN atualizado ✓" : "Salvar novo PIN"}
        </button>
      </div>
    </div>
  );
}

function ChangeGestureScreen({ go }: { go: (s: Screen) => void }) {
  const [sel, setSel] = useState(0);
  const opts = ["Tocar 3x no ícone da flor", "Segurar o botão + por 3 segundos", "Tocar 5x no título CuidaDelas"];
  return (
    <div>
      <GuardHeader go={go} title="Alterar gesto secreto" back="guardia-more" />
      <div className="px-6 mt-4 text-white">
        <p className="text-sm text-white/70">Escolha uma nova forma discreta de acessar a GuardIA.</p>
        <div className="mt-6 space-y-3">
          {opts.map((o, i) => (
            <button key={i} onClick={() => setSel(i)}
              className={`w-full p-4 rounded-2xl border-2 text-left font-semibold transition ${
                sel === i ? "border-[#f75ca2] bg-[#f75ca2]/15 text-white" : "border-white/10 bg-white/5 text-white/80"
              }`}>
              <div className="flex items-center gap-3">
                <div className={`h-5 w-5 rounded-full border-2 ${sel===i ? "border-[#f75ca2] bg-[#f75ca2]" : "border-white/40"} grid place-items-center`}>
                  {sel===i && <Check className="h-3 w-3 text-white" />}
                </div>{o}
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => go("guardia-more")} className="mt-8 w-full rounded-2xl bg-[#f75ca2] text-white py-4 font-bold">Salvar gesto</button>
      </div>
    </div>
  );
}

/* ---------- Bottom navs ---------- */

function CycleBottomNav({
  current, go, onFlowerTap,
}: { current: Screen; go: (s: Screen) => void; onFlowerTap: () => void }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-[#f7e7f0] px-5 py-2 flex items-center justify-between">
      <NavBtn icon={Home} label="Início" active={current==="cycle-home"} onClick={() => go("cycle-home")} />
      <NavBtn icon={Calendar} label="Agenda" active={current==="cycle-calendar"} onClick={() => go("cycle-calendar")} />
      <button onClick={onFlowerTap}
        className="h-14 w-14 -mt-6 rounded-full bg-gradient-to-br from-[#f75ca2] to-[#c66bff] grid place-items-center shadow-lg shadow-pink-300 text-white active:scale-95 transition"
        aria-label="Flor">
        <Flower2 className="h-6 w-6" />
      </button>
      <NavBtn icon={BarChart3} label="Análises" active={current==="cycle-analytics"} onClick={() => go("cycle-analytics")} />
      <NavBtn icon={MoreHorizontal} label="Mais" active={current==="cycle-more"} onClick={() => go("cycle-more")} />
    </div>
  );
}

function NavBtn({ icon: Icon, label, active, onClick }: { icon: any; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-0.5 py-1 px-2">
      <Icon className={`h-5 w-5 ${active ? "text-[#f75ca2]" : "text-[#a5a5b5]"}`} />
      <span className={`text-[10px] font-semibold ${active ? "text-[#f75ca2]" : "text-[#a5a5b5]"}`}>{label}</span>
    </button>
  );
}

function GuardBottomNav({ current, go }: { current: Screen; go: (s: Screen) => void }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#211039]/95 backdrop-blur border-t border-white/10 px-5 py-2 flex items-center justify-between">
      <GNav icon={Home} label="Início" active={current==="guardia-home"} onClick={() => go("guardia-home")} />
      <GNav icon={BookOpen} label="Direitos" active={current==="guardia-rights"} onClick={() => go("guardia-rights")} />
      <button onClick={() => go("guardia-proofs")}
        className="h-14 w-14 -mt-6 rounded-full bg-gradient-to-br from-[#f75ca2] to-[#6c35d8] grid place-items-center shadow-lg shadow-purple-900/50 text-white">
        <Plus className="h-6 w-6" />
      </button>
      <GNav icon={FolderLock} label="Provas" active={current==="guardia-proofs"} onClick={() => go("guardia-proofs")} />
      <GNav icon={MoreHorizontal} label="Mais" active={current==="guardia-more"} onClick={() => go("guardia-more")} />
    </div>
  );
}

function GNav({ icon: Icon, label, active, onClick }: { icon: any; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-0.5 py-1 px-2">
      <Icon className={`h-5 w-5 ${active ? "text-[#f75ca2]" : "text-white/50"}`} />
      <span className={`text-[10px] font-semibold ${active ? "text-[#f75ca2]" : "text-white/50"}`}>{label}</span>
    </button>
  );
}

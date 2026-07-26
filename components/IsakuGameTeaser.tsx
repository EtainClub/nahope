"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "../lib/i18n";

// Web Audio API for retro-horror sound synthesizers
const playSound = (type: "beep" | "dissonant" | "unlock" | "ambient") => {
  if (typeof window === "undefined") return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === "beep") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === "dissonant") {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(90, ctx.currentTime);
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(92.5, ctx.currentTime);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 0.5);
      osc2.stop(ctx.currentTime + 0.5);
    } else if (type === "unlock") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(330, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (e) {
    console.warn("Audio Context blocked or unsupported:", e);
  }
};

interface Hotspot {
  id: string;
  name: string;
  top: string;
  left: string;
  width: string;
  height: string;
  lore: string;
  glitchLabel: string;
  investigationText: string;
  nameKo: string;
  loreKo: string;
  glitchLabelKo: string;
  investigationTextKo: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "carbine",
    name: "Lost Carbine Rifle",
    nameKo: "분실된 카빈 소총",
    top: "70%",
    left: "15%",
    width: "15%",
    height: "15%",
    glitchLabel: "!! WEAPON DETECTED !!",
    glitchLabelKo: "!! 무기 감지 !!",
    investigationText: "Bum-seok: 'An illegal military M1 Carbine. The youth were using it to hunt the beast, but dropped it in the mud. The barrel is still warm... and there is a faint smell of burnt ozone.'",
    investigationTextKo: "범석: '불법 군용 M1 카빈이군. 청년들이 짐승을 사냥하려다 진흙에 떨어뜨린 모양이야. 총열이 아직 따뜻해… 타버린 오존 냄새도 희미하게 난다.'",
    lore: "A modified Carbine rifle, illegally kept by village hunters. Found discarded in the wild grass. Smells of unknown cosmic discharge.",
    loreKo: "마을 사냥꾼들이 불법으로 보관한 개조 카빈 소총. 들풀 사이에 버려진 채 발견되었으며, 정체불명의 우주 방전 냄새가 난다.",
  },
  {
    id: "carcass",
    name: "Mutated Livestock Carcass",
    nameKo: "변이된 가축 사체",
    top: "78%",
    left: "45%",
    width: "18%",
    height: "14%",
    glitchLabel: "!! ANOMALOUS BIOMASS !!",
    glitchLabelKo: "!! 이상 생체 물질 !!",
    investigationText: "Bum-seok: 'A cow carcass from the Kim family farm. Ripped open with savage force. The blood is strangely warm and fluoresces under our flashlights.'",
    investigationTextKo: "범석: '김씨네 농장의 소다. 엄청난 힘으로 찢겨 나갔어. 피가 이상할 정도로 따뜻하고 손전등 아래에서 형광을 띤다.'",
    lore: "A mutilated cow carcass showing severe dimensional warping and cellular disintegration, emitting a faint radioactive violet glow.",
    loreKo: "심각한 차원 왜곡과 세포 붕괴 흔적이 남은 훼손된 소 사체. 희미한 방사성 보랏빛을 방출한다.",
  },
  {
    id: "tag",
    name: "Torn ID Tag of a Defense Soldier",
    nameKo: "찢어진 방위병 인식표",
    top: "35%",
    left: "75%",
    width: "8%",
    height: "15%",
    glitchLabel: "!! MILITARY ARTIFACT !!",
    glitchLabelKo: "!! 군용 유물 !!",
    investigationText: "Sung-ae: 'A local defense reservist's ID tag. Snagged on the barbed wire. The metal is warped and carbonized with bright violet carbon residue.'",
    investigationTextKo: "성해: '지역 방위 예비군의 인식표예요. 철조망에 걸려 있었어요. 금속이 뒤틀리고 탄화됐는데 밝은 보라색 탄소 잔여물이 묻어 있어요.'",
    lore: "A shredded ID tag belonging to a missing local reservist. The tags are crusted with a bright, glassy purple residue.",
    loreKo: "실종된 지역 예비군의 찢어진 인식표. 밝고 유리 같은 보라색 잔여물이 표면에 굳어 있다.",
  },
];

type LocalizedLog = {
  ko: string;
  en: string;
};

const INITIAL_LOGS: LocalizedLog[] = [
  {
    ko: "[시스템 초기화] 연결이 수립되었습니다.",
    en: "[SYSTEM INITIALIZED] connection established.",
  },
  {
    ko: "[기록 12:00] 범석: '어부가 숲에서 거대한 호랑이를 봤다고 했다. 말도 안 되지. 그런데 이제 농부들이 길 위에서 훼손된 소를 발견했다고 신고하고 있어.'",
    en: "[LOG 12:00] Bum-seok: 'A fisherman reported seeing a giant tiger in the forest. Ridiculous. But now local farmers are reporting mutilated cattle on the road.'",
  },
  {
    ko: "[도움말] 아래 화면 위로 커서를 움직여 이상 지점을 탐색하세요.",
    en: "[TUTORIAL] Move your cursor over the screen below to search for anomalous hotspots.",
  },
];

interface IsakuGameTeaserProps {
  onScenarioSubmit?: (newScen: { items: string[]; text: string; id: number }) => void;
}

export default function IsakuGameTeaser({ onScenarioSubmit }: IsakuGameTeaserProps) {
  const { language, tr } = useLanguage();
  const [logs, setLogs] = useState<LocalizedLog[]>(INITIAL_LOGS);

  const [inventory, setInventory] = useState<string[]>([]);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [mobileTab, setMobileTab] = useState<"logs" | "canvas" | "inventory">("canvas");
  const [scenarioText, setScenarioText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showScenarioForm, setShowScenarioForm] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [logs]);

  const handleHotspotHover = () => {
    playSound("beep");
  };

  const handleHotspotClick = (h: Hotspot) => {
    playSound("dissonant");
    setSelectedHotspot(h);
  };

  const handleSecureArtifact = () => {
    if (selectedHotspot) {
      const item = selectedHotspot.name;
      if (!inventory.includes(item)) {
        setInventory((prev) => [...prev, item]);
        setLogs((prev) => [
          ...prev,
          {
            ko: `[확보] ${selectedHotspot.nameKo} 항목이 UGC 슬롯에 추가되었습니다.`,
            en: `[SECURED] ${item} added to UGC slots.`,
          },
          {
            ko: `[기록] ${selectedHotspot.investigationTextKo}`,
            en: `[LOG] ${selectedHotspot.investigationText}`,
          },
        ]);
        playSound("unlock");
      }
      setSelectedHotspot(null);
    }
  };

  const handleShareOnX = (itemName: string) => {
    playSound("beep");
    let tweetText = "";
    if (itemName === "Lost Carbine Rifle") {
      tweetText = language === "ko"
        ? `"이 총, 신고는 되는 건가?!" 호포 초소: 오메가 프로토콜에서 분실된 카빈 소총을 확보했다! nahope.com에서 나홍진의 오메가 프로토콜을 복호화 중 %23NAHOPE %23Solana %23NaHongJin`
        : `"Is this gun even reportable?!" I secured the Lost Carbine Rifle in Hopo Outpost: Omega Protocol! Decrypting Na Hong-jin's OMEGA PROTOCOL at nahope.com %23NAHOPE %23Solana %23NaHongJin`;
    } else {
      const hotspot = HOTSPOTS.find((spot) => spot.name === itemName);
      tweetText = language === "ko"
        ? `호포 초소에서 [${hotspot?.nameKo ?? itemName}]을 확보했다! nahope.com에서 나홍진의 오메가 프로토콜을 복호화 중 %23NAHOPE %23Solana %23NaHongJin`
        : `I secured the [${itemName}] at Hopo Outpost! Decrypting Na Hong-jin's OMEGA PROTOCOL at nahope.com %23NAHOPE %23Solana %23NaHongJin`;
    }
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, "_blank");
  };

  const handleReset = () => {
    playSound("dissonant");
    setInventory([]);
    setLogs(INITIAL_LOGS);
    setSelectedHotspot(null);
    setScenarioText("");
    setSubmitted(false);
    setShowScenarioForm(false);
  };

  const handleSubmitScenario = (e: React.FormEvent) => {
    e.preventDefault();
    if (inventory.length < 3) return;
    if (onScenarioSubmit) {
      onScenarioSubmit({
        items: inventory,
        text: scenarioText,
        id: Date.now(),
      });
    }
    setLogs((prev) => [
      ...prev,
      {
        ko: "[전송 완료] 시나리오가 공개 대시보드 피드에 제출되었습니다.",
        en: "[TRANSMITTED] Scenario submitted to the public dashboard feed.",
      },
    ]);
    setSubmitted(true);
    playSound("unlock");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-0 mb-12">
      <div className="text-center mb-6">
        <h2 className="display text-3xl uppercase" style={{ color: "var(--ink-0)", letterSpacing: "0.1em" }}>
          {tr("호포 초소 수색 단말기", "HOPO OUTPOST SEARCH TERMINAL")}
        </h2>
        <p className="eyebrow mt-1">
          {tr("// 에피소드 1 인터랙티브 포인트 앤 클릭 티저 (이사쿠 스타일)", "// Episode 1 Interactive Point-and-Click Teaser (Isaku Style)")}
        </p>
        <div className="w-24 h-[2px] mx-auto mt-2" style={{ background: "var(--acc-primary)" }} />
      </div>

      {/* Mobile tab switcher — hidden on lg+ */}
      <div className="lg:hidden flex gap-1 mb-3" style={{ borderBottom: "1px solid var(--line)" }}>
        {([
          { id: "logs", label: `${tr("기록", "LOGS")} (${logs.length})` },
          { id: "canvas", label: tr("수색", "SEARCH") },
          { id: "inventory", label: `${tr("아이템", "ITEMS")} (${inventory.length}/3)` },
        ] as const).map((t) => {
          const isActive = mobileTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => { playSound("beep"); setMobileTab(t.id); }}
              className="flex-1 py-2 px-2 font-mono uppercase transition-all"
              style={{
                fontSize: 10,
                letterSpacing: "0.14em",
                color: isActive ? "var(--acc-primary)" : "var(--ink-3)",
                background: isActive ? "color-mix(in srgb, var(--acc-primary) 8%, transparent)" : "transparent",
                borderBottom: `2px solid ${isActive ? "var(--acc-primary)" : "transparent"}`,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* 4-Panel Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

        {/* Panel 1: Left Story Log (3 columns) */}
        <div className={`${mobileTab === "logs" ? "flex" : "hidden"} lg:flex panel panel-bracket lg:col-span-3 crt-scan p-4 flex-col justify-between h-[450px] lg:h-[550px]`} style={{ position: "relative" }}>
          <span className="br-bl" /><span className="br-br" />
          
          <div ref={logContainerRef} className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
            <div className="pb-2 eyebrow" style={{ borderBottom: "1px solid var(--line-bright)" }}>
              {tr("// 수사 일지", "// INVESTIGATION DIARIES")}
            </div>

            <div className="flex flex-col gap-2 font-mono leading-relaxed" style={{ fontSize: 11, color: "var(--acc-primary)" }}>
              {logs.map((log, idx) => (
                <div key={idx} className="pb-1.5" style={{ borderBottom: "1px solid var(--line)" }}>
                  {language === "ko" ? log.ko : log.en}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-center eyebrow" style={{ borderTop: "1px solid var(--line-bright)" }}>
            {tr("시스템 상태: 기록 전송 중", "SYS STATUS: TRANSMITTING LOGS")}
          </div>
        </div>

        {/* Panel 2: Center Search Canvas (6 columns) */}
        <div className={`${mobileTab === "canvas" ? "flex" : "hidden"} lg:flex lg:col-span-6 panel crt-scan crt-vignette relative h-[450px] lg:h-[550px] items-center justify-center cursor-crosshair-target group`} style={{ overflow: "hidden" }}>

          {/* Eerie Backdrop Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hopo_farm_road_bg.png"
              alt={tr("호포 농로", "Hopo Farm Road")}
              fill
              className="object-cover opacity-90 group-hover:scale-[1.01] transition-transform duration-700"
              priority
            />
            {/* Dark vignette overlay */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#090010]/70 to-[#090010] mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/35 pointer-events-none" />
          </div>

          {/* Interactive Hotspots */}
          <div className="absolute inset-0 z-10">
            {HOTSPOTS.map((spot) => (
              <button
                key={spot.id}
                onMouseEnter={handleHotspotHover}
                onClick={() => handleHotspotClick(spot)}
                className="absolute cursor-crosshair-target flex items-center justify-center group/spot"
                style={{
                  top: spot.top,
                  left: spot.left,
                  width: spot.width,
                  height: spot.height,
                  background: "transparent",
                  border: "none",
                }}
              >
                {/* SVG crosshair marker */}
                <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" className="absolute inset-0" style={{ opacity: 0.5 }}>
                  {/* Corner brackets */}
                  <path d="M0 12 L0 0 L12 0" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <path d="M48 0 L60 0 L60 12" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <path d="M0 48 L0 60 L12 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <path d="M60 48 L60 60 L48 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <circle cx="30" cy="30" r="6" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <circle cx="30" cy="30" r="1.5" fill="rgba(255,255,255,0.4)" />
                </svg>
                <svg width="100%" height="100%" viewBox="0 0 60 60" fill="none" className="absolute inset-0 opacity-0 group-hover/spot:opacity-100 transition-opacity duration-150">
                  <path d="M0 12 L0 0 L12 0" strokeWidth="1.5" stroke="var(--acc-primary)" />
                  <path d="M48 0 L60 0 L60 12" strokeWidth="1.5" stroke="var(--acc-primary)" />
                  <path d="M0 48 L0 60 L12 60" strokeWidth="1.5" stroke="var(--acc-primary)" />
                  <path d="M60 48 L60 60 L48 60" strokeWidth="1.5" stroke="var(--acc-primary)" />
                  <circle cx="30" cy="30" r="6" stroke="var(--acc-primary)" strokeWidth="1" />
                  <line x1="30" y1="20" x2="30" y2="24" stroke="var(--acc-primary)" strokeWidth="1" />
                  <line x1="30" y1="36" x2="30" y2="40" stroke="var(--acc-primary)" strokeWidth="1" />
                  <line x1="20" y1="30" x2="24" y2="30" stroke="var(--acc-primary)" strokeWidth="1" />
                  <line x1="36" y1="30" x2="40" y2="30" stroke="var(--acc-primary)" strokeWidth="1" />
                  <circle cx="30" cy="30" r="1.5" fill="var(--acc-primary)" />
                </svg>
                {/* Label */}
                <span
                  className="hidden group-hover/spot:inline font-mono absolute -top-7 whitespace-nowrap px-1.5 py-0.5"
                  style={{ fontSize: 9, color: "var(--acc-primary)", border: "1px solid var(--acc-primary)", background: "var(--bg-0)", boxShadow: "var(--glow-primary)" }}
                >
                  {language === "ko" ? spot.glitchLabelKo : spot.glitchLabel}
                </span>
              </button>
            ))}
          </div>

          {/* Floating write scenario button when 3 items collected */}
          {inventory.length === 3 && !showScenarioForm && !submitted && (
            <div className="absolute inset-x-0 bottom-8 z-20 flex justify-center px-4 pointer-events-auto">
              <button
                onClick={() => {
                  playSound("unlock");
                  setShowScenarioForm(true);
                }}
                className="display font-bold px-6 py-3.5 text-xs uppercase tracking-widest hover:scale-[1.03] transition-all"
                style={{ background: "var(--acc-primary)", color: "var(--bg-0)", boxShadow: "var(--glow-primary)", animation: "pulse-glow 1.5s ease infinite" }}
              >
                {tr("오메가 프로토콜 가동: 시나리오 작성", "OMEGA PROTOCOL ACTIVE: WRITE SCENARIO")}
              </button>
            </div>
          )}

          {/* Investigative Popup */}
          {selectedHotspot && !showScenarioForm && !submitted && (
            <div className="absolute inset-0 z-20 flex items-center justify-center p-6 transition-all" style={{ background: "rgba(0,0,0,0.85)" }}>
              <div className="panel panel-bracket w-full max-w-[360px] p-5 relative flex flex-col gap-4 font-mono text-xs" style={{ boxShadow: "var(--glow-primary)" }}>
                <span className="br-bl" /><span className="br-br" />

                <div className="flex justify-between items-center pb-2" style={{ borderBottom: "1px solid var(--line-bright)" }}>
                  <span className="font-bold uppercase tracking-wider" style={{ color: "var(--acc-primary)" }}>
                    {tr("// 유물 조사 중", "// EXAMINING ARTIFACT")}
                  </span>
                  <button
                    onClick={() => { playSound("beep"); setSelectedHotspot(null); }}
                    className="font-bold transition-colors"
                    style={{ color: "var(--ink-3)" }}
                  >
                    {tr("닫기 [X]", "CLOSE [X]")}
                  </button>
                </div>

                <div className="display text-sm" style={{ color: "var(--ink-0)", letterSpacing: "0.05em" }}>
                  {language === "ko" ? selectedHotspot.nameKo : selectedHotspot.name}
                </div>

                <p className="font-sans leading-relaxed" style={{ fontSize: 11, color: "var(--ink-2)" }}>
                  {language === "ko" ? selectedHotspot.loreKo : selectedHotspot.lore}
                </p>

                <div className="p-2.5 italic" style={{ background: "var(--bg-0)", border: "1px solid var(--line)", color: "var(--acc-primary)", fontSize: 10, lineHeight: 1.6 }}>
                  {language === "ko" ? selectedHotspot.investigationTextKo : selectedHotspot.investigationText}
                </div>

                <button
                  onClick={handleSecureArtifact}
                  className="w-full font-bold py-2.5 text-xs tracking-wider hover:scale-[1.02] transition-transform"
                  style={{ background: "var(--acc-primary)", color: "var(--bg-0)", boxShadow: "var(--glow-primary)" }}
                >
                  {inventory.includes(selectedHotspot.name)
                    ? tr("이미 확보됨", "ALREADY SECURED")
                    : tr("확보 후 인벤토리에 잠금", "SECURE & LOCK TO INVENTORY")}
                </button>
              </div>
            </div>
          )}

          {/* Scenario Submission Form Overlay */}
          {showScenarioForm && !submitted && (
            <div className="absolute inset-0 z-20 flex items-center justify-center p-6" style={{ background: "rgba(0,0,0,0.9)" }}>
              <form
                onSubmit={handleSubmitScenario}
                className="panel panel-bracket w-full max-w-[420px] p-5 relative flex flex-col gap-4 font-mono text-xs"
                style={{ borderColor: "var(--acc-violet)", boxShadow: "var(--glow-violet)", "--acc-primary": "var(--acc-violet)" } as React.CSSProperties}
              >
                <span className="br-bl" /><span className="br-br" />

                <div className="flex justify-between items-center pb-2" style={{ borderBottom: "1px solid var(--line-bright)" }}>
                  <span className="font-bold uppercase tracking-wider" style={{ color: "var(--acc-violet)" }}>
                    {tr("// 오메가 시나리오 송신기", "// OMEGA SCENARIO TRANSMITTER")}
                  </span>
                  <button
                    type="button"
                    onClick={() => { playSound("beep"); setShowScenarioForm(false); }}
                    className="font-bold"
                    style={{ color: "var(--ink-3)" }}
                  >
                    {tr("취소 [X]", "CANCEL [X]")}
                  </button>
                </div>

                <p className="text-gray-400 font-sans text-[11px] leading-relaxed">
                  {tr(
                    `확보한 아이템 (${inventory.map((item) => HOTSPOTS.find((spot) => spot.name === item)?.nameKo ?? item).join(", ")})을 이용해 파트 2에서 생존자들이 우주적 위협에 맞서는 방법을 제안하세요.`,
                    `Use the secured items (${inventory.join(", ")}) to propose how the survivors fight the cosmic threat in Part 2.`,
                  )}
                </p>

                <textarea
                  required
                  value={scenarioText}
                  onChange={(e) => setScenarioText(e.target.value)}
                  placeholder={tr(
                    "《HOPE 파트 2》 시나리오 제안서를 작성하세요. 예: 성기가 군의 지하 벙커를 발견하고 회수한 번역기 주파수를 활용한다…",
                    "Write your English proposal for 'HOPE Part 2' scenario (e.g. Sung-ki discovers the military's underground bunker, utilizing salvaged translator frequencies...)",
                  )}
                  rows={6}
                  maxLength={1000}
                  className="w-full p-3 font-sans text-xs resize-none leading-relaxed focus:outline-none"
                  style={{ background: "var(--bg-0)", border: "1px solid var(--line-bright)", color: "var(--ink-0)" }}
                />

                <div className="flex justify-between items-center mt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="font-mono hover:underline"
                    style={{ fontSize: 10, color: "var(--acc-danger)" }}
                  >
                    {tr("전체 초기화", "RESET ALL")}
                  </button>
                  <button
                    type="submit"
                    className="font-bold px-4 py-2 font-mono tracking-wider hover:scale-[1.02] transition-transform"
                    style={{ fontSize: 10, background: "var(--acc-violet)", color: "var(--bg-0)", boxShadow: "var(--glow-violet)" }}
                  >
                    {tr("피드로 전송", "TRANSMIT TO FEED")}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Submitted Success Screen Overlay */}
          {submitted && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center gap-4" style={{ background: "rgba(0,0,0,0.9)" }}>
              <div className="display text-2xl uppercase tracking-widest" style={{ color: "var(--acc-cyan)", animation: "pulse-glow 1.5s ease infinite" }}>
                {tr("시나리오 전송 완료", "SCENARIO TRANSMITTED")}
              </div>
              <p className="max-w-md font-sans leading-relaxed" style={{ fontSize: 11, color: "var(--ink-2)" }}>
                {tr(
                  "《HOPE 파트 2》 시나리오 제안서가 성공적으로 암호화되어 공개 대시보드 피드에 게시되었습니다. 커뮤니티가 여러분의 이론을 검토하도록 공유하세요!",
                  "Your scenario proposal for \"HOPE Part 2\" has been successfully encrypted and posted to the public dashboard feed. Let the community review your theory!",
                )}
              </p>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 font-mono text-xs transition-colors"
                  style={{ border: "1px solid var(--line-bright)", color: "var(--ink-2)" }}
                >
                  {tr("구역 초기화", "RESET AREA")}
                </button>
                <a
                  href="#feed"
                  className="px-6 py-2 font-mono font-bold text-xs transition-colors"
                  style={{ background: "var(--bg-1)", border: "1px solid color-mix(in srgb, var(--acc-violet) 40%, transparent)", color: "var(--ink-0)" }}
                >
                  {tr("공개 피드 보기", "VIEW PUBLIC FEED")}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Panel 3: Right UGC Inventory (3 columns) */}
        <div className={`${mobileTab === "inventory" ? "flex" : "hidden"} lg:flex panel panel-bracket lg:col-span-3 p-4 flex-col justify-between h-[450px] lg:h-[550px]`} style={{ position: "relative" }}>
          <span className="br-bl" /><span className="br-br" />
          <div className="flex flex-col gap-4">
            <div>
              <div className="eyebrow mb-1" style={{ color: "var(--acc-violet)" }}>
                {tr("// 확보된 유물", "// SECURED ARTIFACTS")}
              </div>
              <h3 className="display text-lg uppercase" style={{ color: "var(--ink-0)" }}>
                {tr("UGC 인벤토리", "UGC INVENTORY")}
              </h3>
            </div>

            {/* Inventory Slots list */}
            <div className="flex flex-col gap-2">
              {HOTSPOTS.map((spot, idx) => {
                const isSecured = inventory.includes(spot.name);
                return (
                  <div
                    key={idx}
                    className="p-3 flex flex-col gap-2 transition-all"
                    style={isSecured ? {
                      border: "1px solid color-mix(in srgb, var(--acc-violet) 30%, transparent)",
                      background: "var(--bg-0)",
                      boxShadow: "0 0 10px color-mix(in srgb, var(--acc-violet) 8%, transparent)",
                    } : {
                      border: "1px dashed var(--line-bright)",
                      background: "transparent",
                      opacity: 0.5,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold truncate max-w-[150px]" style={{ fontSize: 11, color: "var(--ink-0)" }}>
                        {isSecured
                          ? language === "ko"
                            ? spot.nameKo
                            : spot.name
                          : `${tr("잠긴 슬롯", "LOCKED SLOT")} 0${idx + 1}`}
                      </span>
                      <span className="font-mono font-bold" style={{ fontSize: 9, color: "var(--acc-primary)" }}>
                        {isSecured ? tr("확보", "SECURED") : tr("비어 있음", "EMPTY")}
                      </span>
                    </div>

                    {isSecured && (
                      <button
                        onClick={() => handleShareOnX(spot.name)}
                        className="w-full font-mono py-1 transition-all flex items-center justify-center gap-1.5"
                        style={{ fontSize: 10, background: "color-mix(in srgb, var(--acc-violet) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--acc-violet) 30%, transparent)", color: "var(--acc-violet)" }}
                      >
                        <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        {tr("X에 밈 공유", "SHARE MEME ON X")}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-3 font-mono flex justify-between eyebrow" style={{ borderTop: "1px solid var(--line-bright)" }}>
            <span>{tr("확보", "SECURED")}: {inventory.length} / 3</span>
            <span>{tr("UGC 슬롯 준비", "UGC SLOTS READY")}</span>
          </div>
        </div>

      </div>

      {/* Panel 4: Bottom Status Bar */}
      <div className="w-full px-4 py-2 mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 font-mono relative overflow-hidden" style={{ background: "var(--bg-1)", border: "1px solid var(--line-bright)", fontSize: 10, color: "var(--ink-2)" }}>
        <div className="flex items-center gap-2 relative z-10">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--acc-primary)", animation: "pulse-glow 1s ease infinite" }} />
          <span>
            {tr("시스템 상태", "SYS STATE")}: <span className="font-bold" style={{ color: "var(--acc-primary)" }}>{tr("SOLANA 로그인됨", "SOLANA LOGGED IN")}</span>
          </span>
        </div>

        <div className="relative z-10 text-center sm:text-left">
          {tr("현재 위치", "CURRENT LOCATION")}: <span className="font-bold uppercase" style={{ color: "var(--ink-0)" }}>{tr("호포 농로 - 구역 01", "HOPO FARM ROAD - SECTION 01")}</span>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <span>{tr("잔액", "BALANCE")}: <span className="font-bold" style={{ color: "var(--acc-cyan)" }}>25,000 $NAHOPE</span></span>
          <span style={{ color: "var(--line-bright)" }}>|</span>
          <span className="font-bold" style={{ color: "var(--acc-primary)" }}>{tr("에피소드 1 스테이지 해제", "EPISODE 1 STAGE UNLOCKED")}</span>
        </div>
      </div>
    </div>
  );
}

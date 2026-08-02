import Link from "next/link";

const episodes = [
  {
    number: 1,
    title: "호포의 호랑이",
    subtitle: "잘못된 이름을 의심하는 수사",
    access: "공개 플레이",
    turns: 30,
    color: "var(--acc-primary)",
    premise: "소 사체를 호랑이의 소행으로 단정하기 전에 물증을 모으고, 숲의 존재에게 총을 쏘지 않은 채 눈물을 기록한다. 기존 시나리오와 퍼즐 구조는 그대로 유지된다.",
    route: ["현장 장비 확보", "성기의 성급한 사냥 지연", "소 사체와 발자국 기록", "호랑이 가설 반박", "바미기르 조우와 사격 보류"],
    endings: "A 시간 초과 · B 성급한 사격 · C 사냥 지연 · D 미지의 존재 기록",
  },
  {
    number: 2,
    title: "열두 존재를 부르다",
    subtitle: "순행 호명으로 굿판을 여는 수사",
    access: "에피소드 1 클리어",
    turns: 34,
    color: "var(--acc-violet)",
    premise: "소부터 쥐까지 12간지 표식을 사건의 실제 인과에 맞춰 호명한다. 사건의 장소들은 영화 장면이면서 동시에 저쪽 존재를 이쪽으로 부르는 굿의 열두 장단이 된다.",
    route: ["축·인: 소 사체와 잘못된 호랑이 이름", "묘·진: 토끼 가죽길과 추락선", "사·오: 몸속 지렁이와 살아 있는 말", "미·신: 양배의 총성과 몽치의 이름", "유·술·해·자: 장닭, 개, 해술, 영시"],
    endings: "A 반복되는 사냥 · B 잘못 부른 존재 · C 열두 시간의 굿 · D 해술의 역행",
  },
  {
    number: 3,
    title: "역굿",
    subtitle: "살아 있는 양기를 지키며 통로를 닫는 의식",
    access: "에피소드 2 클리어",
    turns: 38,
    color: "var(--acc-danger)",
    premise: "해에서 자까지 원판을 거꾸로 돌리며 열두 증거를 고정한다. 장닭의 울음과 말이 지난 길은 외계 존재가 끊지 못한 양기의 닻이며, 이를 희생하면 결계도 무너진다.",
    route: ["해·술: 해술의 역문과 생존자의 길", "유·신: 장닭 울음과 몽치의 이름", "미·오: 인간의 첫 총성과 말의 통로", "사·진: 몸속 시간과 추락 구조 신호", "묘·인·축·자: 사냥 이전의 공백 고정"],
    endings: "A 닫히지 않는 원 · B 양기의 소멸 · C 살아 있는 철수선 · D 영시의 구조 신호",
  },
  {
    number: 4,
    title: "열세 번째 목격자",
    subtitle: "기록을 현존으로 바꾸고 굿을 끝내는 송신",
    access: "에피소드 3 클리어",
    turns: 42,
    color: "var(--acc-cyan)",
    premise: "복제된 사건 기록을 고정 증거, 현현 증언, 창작 제안으로 분리한다. 열두 존재 바깥의 마지막 자리는 화면 앞 플레이어이며, 공동체에 책임 있는 제안을 송신해야 굿이 끝난다.",
    route: ["영시 기록의 고정점 분리", "가변 인과와 현현 증언 분류", "삼층 의식 기록 완성", "열세 번째 시나리오 제안", "공개 기록과 송별 의식 송신"],
    endings: "A 무구의 파괴 · B 영구 전시 · C 밀봉된 굿 · D 열세 번째 목격자",
  },
] as const;

export default function GuidePage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-0)", color: "var(--ink-1)", padding: "48px 20px 96px", fontFamily: "var(--font-mono)" }}>
      <div style={{ width: "min(1080px, 100%)", margin: "0 auto" }}>
        <header style={{ borderBottom: "1px solid var(--line-bright)", paddingBottom: 24, marginBottom: 28 }}>
          <div className="eyebrow" style={{ color: "var(--acc-primary)", marginBottom: 10 }}>{"// 호포 사건 현장 안내서"}</div>
          <h1 style={{ margin: 0, color: "var(--ink-0)", fontSize: "clamp(28px, 5vw, 52px)", letterSpacing: "-0.04em" }}>
            네 번의 수사, 하나의 굿판
          </h1>
          <p style={{ maxWidth: 780, color: "var(--ink-2)", lineHeight: 1.8, fontSize: 13, margin: "14px 0 0" }}>
            에피소드 1은 기존 수사 구조를 유지합니다. 에피소드 2–4는 12간지의 순행 호명, 역행 해원, 열세 번째 목격자의 송신으로 이어집니다. 총보다 순서가 중요하며, 수집한 증거를 언제 어떤 존재 앞에 놓는지가 결말을 결정합니다.
          </p>
        </header>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 10, marginBottom: 32 }}>
          <Rule title="의식 원판">현재 간지와 호명한 표식을 확인하세요. 정해진 순서를 건너뛰면 원판이 움직이지 않습니다.</Rule>
          <Rule title="경계 온전도">잘못된 사용과 파괴적 선택은 이쪽과 저쪽 사이의 결계를 약화시킵니다.</Rule>
          <Rule title="양기의 닻">장닭과 말은 처치 대상이 아닙니다. 살아 있는 시간의 방향을 유지하는 존재입니다.</Rule>
          <Rule title="현현 기록">화면과 소리의 이상은 장식이 아니라 증언입니다. 최신 현현은 상단 의식 상태에서 확인합니다.</Rule>
        </section>

        <div style={{ display: "grid", gap: 16 }}>
          {episodes.map((episode) => (
            <article key={episode.number} style={{ border: `1px solid ${episode.color}`, background: "var(--bg-1)", padding: "clamp(18px, 3vw, 28px)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
                <div>
                  <div style={{ color: episode.color, fontSize: 10, letterSpacing: "0.2em", marginBottom: 7 }}>에피소드 {episode.number} · {episode.turns}턴</div>
                  <h2 style={{ color: "var(--ink-0)", margin: 0, fontSize: 24 }}>{episode.title}</h2>
                  <div style={{ color: "var(--ink-3)", fontSize: 11, marginTop: 5 }}>{episode.subtitle}</div>
                </div>
                <div style={{ alignSelf: "start", border: "1px solid var(--line-bright)", padding: "7px 10px", color: "var(--ink-2)", fontSize: 9, maxWidth: 330 }}>
                  접근 조건 · {episode.access}
                </div>
              </div>
              <p style={{ color: "var(--ink-2)", lineHeight: 1.75, fontSize: 12 }}>{episode.premise}</p>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(220px, 0.65fr)", gap: 14 }} className="guide-detail-grid">
                <div>
                  <div style={{ color: episode.color, fontSize: 9, letterSpacing: "0.16em", marginBottom: 8 }}>핵심 진행 순서</div>
                  <ol style={{ margin: 0, paddingLeft: 20, color: "var(--ink-2)", fontSize: 11, lineHeight: 1.9 }}>
                    {episode.route.map((step) => <li key={step}>{step}</li>)}
                  </ol>
                </div>
                <div style={{ borderLeft: "1px dashed var(--line-bright)", paddingLeft: 14 }}>
                  <div style={{ color: episode.color, fontSize: 9, letterSpacing: "0.16em", marginBottom: 8 }}>엔딩 분기</div>
                  <p style={{ margin: 0, color: "var(--ink-2)", fontSize: 11, lineHeight: 1.8 }}>{episode.endings}</p>
                </div>
              </div>
              <Link href={episode.number === 1 ? "/game" : `/game?episode=${episode.number}`} style={{ display: "inline-block", marginTop: 18, border: `1px solid ${episode.color}`, color: episode.color, padding: "9px 14px", textDecoration: "none", fontSize: 10, letterSpacing: "0.16em" }}>
                에피소드 {episode.number} 시작
              </Link>
            </article>
          ))}
        </div>

        <section id="troubleshoot" style={{ marginTop: 28, border: "1px solid var(--line-bright)", padding: 22 }}>
          <h2 style={{ margin: "0 0 12px", color: "var(--ink-0)", fontSize: 18 }}>문제 해결</h2>
          <p style={{ margin: 0, color: "var(--ink-2)", fontSize: 11, lineHeight: 1.9 }}>
            장착한 물건이 대상과 맞지 않으면 붉은 표시가 나타납니다. 먼저 장착을 해제하고 맨손으로 조사하세요. 다음 에피소드 접근이 잠겼다면 직전 에피소드의 C 또는 D 엔딩 클리어 기록을 확인하세요. 지갑과 토큰 잔액은 진입 조건이 아닙니다. 저장 상태가 꼬였다면 게임 상단의 초기화 버튼으로 해당 에피소드만 다시 시작할 수 있습니다.
          </p>
        </section>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .guide-detail-grid { grid-template-columns: 1fr !important; }
          .guide-detail-grid > div:last-child { border-left: 0 !important; border-top: 1px dashed var(--line-bright); padding: 12px 0 0 !important; }
        }
      `}</style>
    </main>
  );
}

function Rule({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid var(--line)", background: "var(--bg-1)", padding: 16 }}>
      <div style={{ color: "var(--acc-primary)", fontSize: 10, letterSpacing: "0.14em", marginBottom: 7 }}>{title}</div>
      <div style={{ color: "var(--ink-3)", fontSize: 10, lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

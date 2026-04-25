import React, { useMemo, useState } from "react";

const GROUPS = {
  A: ["MEX", "RSA", "KOR", "CZE"],
  B: ["CAN", "BIH", "QAT", "SUI"],
  C: ["BRA", "MAR", "HAI", "SCO"],
  D: ["USA", "PAR", "AUS", "TUR"],
  E: ["GER", "CUW", "CIV", "ECU"],
  F: ["NED", "JPN", "SWE", "TUN"],
  G: ["BEL", "EGY", "IRN", "NZL"],
  H: ["ESP", "CPV", "KSA", "URU"],
  I: ["FRA", "SEN", "IRQ", "NOR"],
  J: ["ARG", "ALG", "AUT", "JOR"],
  K: ["POR", "COD", "UZB", "COL"],
  L: ["ENG", "CRO", "GHA", "PAN"],
};

const TEAM = {
  MEX: { name: "Mexico", flag: "🇲🇽", strength: 78 }, RSA: { name: "South Africa", flag: "🇿🇦", strength: 64 }, KOR: { name: "Korea Republic", flag: "🇰🇷", strength: 75 }, CZE: { name: "Czechia", flag: "🇨🇿", strength: 72 },
  CAN: { name: "Canada", flag: "🇨🇦", strength: 74 }, BIH: { name: "Bosnia & Herzegovina", flag: "🇧🇦", strength: 70 }, QAT: { name: "Qatar", flag: "🇶🇦", strength: 66 }, SUI: { name: "Switzerland", flag: "🇨🇭", strength: 81 },
  BRA: { name: "Brazil", flag: "🇧🇷", strength: 91 }, MAR: { name: "Morocco", flag: "🇲🇦", strength: 84 }, HAI: { name: "Haiti", flag: "🇭🇹", strength: 61 }, SCO: { name: "Scotland", flag: "🏴", strength: 74 },
  USA: { name: "USA", flag: "🇺🇸", strength: 79 }, PAR: { name: "Paraguay", flag: "🇵🇾", strength: 73 }, AUS: { name: "Australia", flag: "🇦🇺", strength: 72 }, TUR: { name: "Türkiye", flag: "🇹🇷", strength: 80 },
  GER: { name: "Germany", flag: "🇩🇪", strength: 87 }, CUW: { name: "Curaçao", flag: "🇨🇼", strength: 59 }, CIV: { name: "Côte d’Ivoire", flag: "🇨🇮", strength: 76 }, ECU: { name: "Ecuador", flag: "🇪🇨", strength: 78 },
  NED: { name: "Netherlands", flag: "🇳🇱", strength: 88 }, JPN: { name: "Japan", flag: "🇯🇵", strength: 82 }, SWE: { name: "Sweden", flag: "🇸🇪", strength: 79 }, TUN: { name: "Tunisia", flag: "🇹🇳", strength: 73 },
  BEL: { name: "Belgium", flag: "🇧🇪", strength: 85 }, EGY: { name: "Egypt", flag: "🇪🇬", strength: 77 }, IRN: { name: "IR Iran", flag: "🇮🇷", strength: 78 }, NZL: { name: "New Zealand", flag: "🇳🇿", strength: 65 },
  ESP: { name: "Spain", flag: "🇪🇸", strength: 90 }, CPV: { name: "Cabo Verde", flag: "🇨🇻", strength: 69 }, KSA: { name: "Saudi Arabia", flag: "🇸🇦", strength: 72 }, URU: { name: "Uruguay", flag: "🇺🇾", strength: 84 },
  FRA: { name: "France", flag: "🇫🇷", strength: 92 }, SEN: { name: "Senegal", flag: "🇸🇳", strength: 82 }, IRQ: { name: "Iraq", flag: "🇮🇶", strength: 68 }, NOR: { name: "Norway", flag: "🇳🇴", strength: 81 },
  ARG: { name: "Argentina", flag: "🇦🇷", strength: 93 }, ALG: { name: "Algeria", flag: "🇩🇿", strength: 77 }, AUT: { name: "Austria", flag: "🇦🇹", strength: 80 }, JOR: { name: "Jordan", flag: "🇯🇴", strength: 66 },
  POR: { name: "Portugal", flag: "🇵🇹", strength: 89 }, COD: { name: "Congo DR", flag: "🇨🇩", strength: 70 }, UZB: { name: "Uzbekistan", flag: "🇺🇿", strength: 71 }, COL: { name: "Colombia", flag: "🇨🇴", strength: 83 },
  ENG: { name: "England", flag: "🏴", strength: 90 }, CRO: { name: "Croatia", flag: "🇭🇷", strength: 82 }, GHA: { name: "Ghana", flag: "🇬🇭", strength: 74 }, PAN: { name: "Panama", flag: "🇵🇦", strength: 67 },
};

function makeGroupMatches() {
  const rows = [];
  let id = 1;
  const dates = ["Thu 11 Jun", "Fri 12 Jun", "Sat 13 Jun", "Sun 14 Jun", "Mon 15 Jun", "Tue 16 Jun", "Wed 17 Jun", "Thu 18 Jun", "Fri 19 Jun", "Sat 20 Jun", "Sun 21 Jun", "Mon 22 Jun"];
  const times = ["15:00 ET", "18:00 ET", "21:00 ET", "13:00 ET", "16:00 ET", "19:00 ET"];
  const pairings = [[0, 1], [2, 3], [0, 2], [1, 3], [0, 3], [1, 2]];
  Object.entries(GROUPS).forEach(([group, teams], groupIndex) => {
    pairings.forEach(([aIndex, bIndex], pairIndex) => {
      rows.push({ id: id++, group, round: "Group Stage", date: dates[(groupIndex + pairIndex) % dates.length], time: times[(groupIndex + pairIndex) % times.length], a: teams[aIndex], b: teams[bIndex] });
    });
  });
  return rows;
}

const GROUP_MATCHES = makeGroupMatches();

const R32 = [
  [73, "2A", "2B", "Sun 28 Jun", "15:00 ET"], [74, "1E", "3 A/B/C/D/F", "Sun 28 Jun", "16:30 ET"], [75, "1F", "2C", "Mon 29 Jun", "21:00 ET"], [76, "1C", "2F", "Mon 29 Jun", "13:00 ET"],
  [77, "1I", "3 C/D/F/G/H", "Tue 30 Jun", "17:00 ET"], [78, "2E", "2I", "Tue 30 Jun", "13:00 ET"], [79, "1A", "3 C/E/F/H/I", "Wed 1 Jul", "21:00 ET"], [80, "1L", "3 E/H/I/J/K", "Wed 1 Jul", "12:00 ET"],
  [81, "1D", "3 B/E/F/I/J", "Thu 2 Jul", "20:00 ET"], [82, "1G", "3 A/E/H/I/J", "Thu 2 Jul", "16:00 ET"], [83, "2K", "2L", "Fri 3 Jul", "19:00 ET"], [84, "1H", "2J", "Fri 3 Jul", "15:00 ET"],
  [85, "1B", "3 E/F/G/I/J", "Fri 3 Jul", "23:00 ET"], [86, "1J", "2H", "Fri 3 Jul", "18:00 ET"], [87, "1K", "3 D/E/I/J/L", "Fri 3 Jul", "21:30 ET"], [88, "2D", "2G", "Fri 3 Jul", "14:00 ET"],
];

const BRACKET = {
  r16: [[89, 74, 77, "Sat 4 Jul", "17:00 ET"], [90, 73, 75, "Sat 4 Jul", "13:00 ET"], [91, 76, 78, "Sun 5 Jul", "16:00 ET"], [92, 79, 80, "Sun 5 Jul", "20:00 ET"], [93, 83, 84, "Mon 6 Jul", "15:00 ET"], [94, 81, 82, "Mon 6 Jul", "20:00 ET"], [95, 86, 88, "Tue 7 Jul", "12:00 ET"], [96, 85, 87, "Tue 7 Jul", "16:00 ET"]],
  qf: [[97, 89, 90, "Thu 9 Jul", "16:00 ET"], [98, 91, 92, "Fri 10 Jul", "15:00 ET"], [99, 93, 94, "Sat 11 Jul", "17:00 ET"], [100, 95, 96, "Sat 11 Jul", "21:00 ET"]],
  sf: [[101, 97, 98, "Tue 14 Jul", "15:00 ET"], [102, 99, 100, "Wed 15 Jul", "15:00 ET"]],
  final: [[104, 101, 102, "Sun 19 Jul", "15:00 ET"]],
};

const TABS = [["home", "🏠", "Home"], ["groups", "🧩", "Groups"], ["matches", "⚽", "Matches"], ["tables", "📊", "Tables"], ["knockout", "🏆", "Knockout"], ["schedule", "📅", "Schedule"]];

const defaultPositions = () => Object.fromEntries(Object.entries(GROUPS).map(([group, teams]) => [group, [...teams]]));
const emptyPicks = () => Object.fromEntries(GROUP_MATCHES.map((match) => [match.id, ""]));
const teamLabel = (code) => (code && TEAM[code] ? `${TEAM[code].flag} ${code}` : code || "TBD");
const fullTeam = (code) => (code && TEAM[code] ? `${TEAM[code].flag} ${code} — ${TEAM[code].name}` : code || "TBD");

function winChance(a, b) {
  const sa = TEAM[a]?.strength || 70;
  const sb = TEAM[b]?.strength || 70;
  return Math.max(18, Math.min(82, Math.round(100 / (1 + Math.pow(10, (sb - sa) / 18)))));
}

function calculateTables(picks, manualPositions = null) {
  if (manualPositions) {
    return Object.fromEntries(Object.entries(GROUPS).map(([group, teams]) => [group, (manualPositions[group] || teams).map((team, index) => ({ team, p: 3, w: [2, 1, 0, 0][index], d: [1, 2, 3, 1][index], l: [0, 0, 0, 2][index], gf: 7 - index * 2, ga: 2 + index, gd: 7 - index * 2 - (2 + index), pts: [7, 5, 3, 1][index] }))]));
  }

  const tables = Object.fromEntries(Object.entries(GROUPS).map(([group, teams]) => [group, teams.map((team) => ({ team, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }))]));
  const rowsByTeam = Object.fromEntries(Object.values(tables).flat().map((row) => [row.team, row]));

  GROUP_MATCHES.forEach((match) => {
    const pick = picks[match.id];
    if (!pick) return;
    const home = rowsByTeam[match.a];
    const away = rowsByTeam[match.b];
    if (!home || !away) return;
    home.p += 1;
    away.p += 1;
    if (pick === "draw") {
      home.d += 1; away.d += 1; home.gf += 1; away.gf += 1; home.ga += 1; away.ga += 1; home.pts += 1; away.pts += 1;
    } else if (pick === match.a) {
      home.w += 1; away.l += 1; home.gf += 2; home.ga += 1; away.gf += 1; away.ga += 2; home.pts += 3;
    } else if (pick === match.b) {
      away.w += 1; home.l += 1; away.gf += 2; away.ga += 1; home.gf += 1; home.ga += 2; away.pts += 3;
    }
    home.gd = home.gf - home.ga;
    away.gd = away.gf - away.ga;
  });

  Object.keys(tables).forEach((group) => {
    tables[group].sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || TEAM[b.team].strength - TEAM[a.team].strength);
  });
  return tables;
}

function resolveBracketSlot(slot, tables) {
  if (/^[12][A-L]$/.test(slot)) return tables[slot[1]]?.[Number(slot[0]) - 1]?.team;
  if (slot.startsWith("3")) {
    const groups = slot.replace("3 ", "").split("/");
    return groups.map((group) => tables[group]?.[2]).filter(Boolean).sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf || TEAM[b.team].strength - TEAM[a.team].strength)[0]?.team;
  }
  return undefined;
}

function runDataTests() {
  const teams = Object.values(GROUPS).flat();
  console.assert(Object.keys(GROUPS).length === 12, "Expected 12 groups.");
  console.assert(teams.length === 48 && new Set(teams).size === 48, "Expected 48 unique teams.");
  console.assert(GROUP_MATCHES.length === 72, "Expected 72 group matches.");
  console.assert(R32.length === 16, "Expected 16 Round of 32 matches.");
  console.assert(BRACKET.r16.length === 8 && BRACKET.qf.length === 4 && BRACKET.sf.length === 2 && BRACKET.final.length === 1, "Expected full bracket sizes.");
}
runDataTests();

export default function WorldCupSimulatorApp() {
  const [tab, setTab] = useState("home");
  const [mode, setMode] = useState("positions");
  const [positions, setPositions] = useState(defaultPositions());
  const [picks, setPicks] = useState(emptyPicks());
  const [knockout, setKnockout] = useState({});
  const [selectedGroup, setSelectedGroup] = useState("A");

  const tables = useMemo(() => calculateTables(picks, mode === "positions" ? positions : null), [picks, positions, mode]);
  const completed = Object.values(picks).filter(Boolean).length;

  const r32 = R32.map(([id, slotA, slotB, date, time]) => ({ id, round: "Round of 32", slotA, slotB, date, time, a: resolveBracketSlot(slotA, tables), b: resolveBracketSlot(slotB, tables) }));
  const makeRound = (key, label) => BRACKET[key].map(([id, left, right, date, time]) => ({ id, round: label, slotA: `W${left}`, slotB: `W${right}`, date, time, a: knockout[left], b: knockout[right] }));
  const r16 = makeRound("r16", "Round of 16");
  const qf = makeRound("qf", "Quarter-final");
  const sf = makeRound("sf", "Semi-final");
  const final = makeRound("final", "Final");
  const allKnockout = [...r32, ...r16, ...qf, ...sf, ...final];
  const champion = knockout[104];

  const updatePosition = (group, index, team) => {
    setPositions((current) => {
      const nextGroup = [...current[group]];
      const previousIndex = nextGroup.indexOf(team);
      if (previousIndex >= 0) [nextGroup[index], nextGroup[previousIndex]] = [nextGroup[previousIndex], nextGroup[index]];
      return { ...current, [group]: nextGroup };
    });
    setKnockout({});
  };

  const chooseWinner = (matchId, team) => {
    setKnockout((current) => {
      const next = { ...current, [matchId]: team };
      Object.keys(next).forEach((key) => { if (Number(key) > matchId) delete next[key]; });
      return next;
    });
  };

  const resetAll = () => { setPositions(defaultPositions()); setPicks(emptyPicks()); setKnockout({}); };
  const autoFill = () => {
    if (mode === "positions") {
      setPositions(Object.fromEntries(Object.entries(GROUPS).map(([group, teams]) => [group, [...teams].sort((a, b) => TEAM[b].strength - TEAM[a].strength)])));
    } else {
      const next = { ...picks };
      GROUP_MATCHES.forEach((match) => {
        if (!next[match.id]) {
          const chance = winChance(match.a, match.b);
          next[match.id] = chance > 56 ? match.a : chance < 44 ? match.b : "draw";
        }
      });
      setPicks(next);
    }
    setKnockout({});
  };

  return (
    <div className="min-h-[100svh] bg-[#061018] text-white overflow-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,#1fd1a544,transparent_32%),radial-gradient(circle_at_90%_8%,#ffb70333,transparent_26%),linear-gradient(180deg,#07111d,#061018_55%,#04070b)]" />
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-md flex-col overflow-hidden bg-[#061018]/80 shadow-2xl ring-1 ring-white/10 lg:max-w-6xl">
        <NativeHeader tab={tab} champion={champion} mode={mode} setMode={setMode} autoFill={autoFill} resetAll={resetAll} completed={completed} />
        <main className="flex-1 overflow-y-auto px-4 pb-[calc(92px+env(safe-area-inset-bottom))] pt-4 lg:px-6">
          {tab === "home" && <HomeScreen champion={champion} completed={completed} tables={tables} setTab={setTab} />}
          {tab === "groups" && <GroupsScreen positions={positions} updatePosition={updatePosition} />}
          {tab === "matches" && <MatchesScreen selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} picks={picks} setPicks={setPicks} tables={tables} />}
          {tab === "tables" && <TablesScreen tables={tables} />}
          {tab === "knockout" && <KnockoutScreen allKnockout={allKnockout} r32={r32} r16={r16} qf={qf} sf={sf} final={final} knockout={knockout} chooseWinner={chooseWinner} />}
          {tab === "schedule" && <ScheduleScreen groupMatches={GROUP_MATCHES} knockoutMatches={allKnockout} />}
        </main>
        <BottomNav active={tab} setTab={setTab} />
      </div>
    </div>
  );
}

function NativeHeader({ tab, champion, mode, setMode, autoFill, resetAll, completed }) {
  const current = TABS.find(([key]) => key === tab) || TABS[0];
  return <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07111d]/95 px-4 pb-3 pt-[max(env(safe-area-inset-top),12px)] backdrop-blur-2xl lg:px-6"><div className="flex items-center justify-between gap-3"><div className="flex min-w-0 items-center gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-300 text-xl text-emerald-950 shadow-lg shadow-emerald-500/20">{current[1]}</div><div className="min-w-0"><p className="truncate text-xs font-bold uppercase tracking-[0.25em] text-emerald-200">World Cup 2026</p><h1 className="truncate text-xl font-black leading-tight">{current[2]}</h1></div></div><div className="rounded-2xl border border-white/10 bg-white/10 px-3 py-2 text-right"><p className="text-[10px] font-bold uppercase text-white/40">Champion</p><p className="max-w-[86px] truncate text-sm font-black">{champion ? teamLabel(champion) : "—"}</p></div></div><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"><button onClick={() => setMode("positions")} className={segmentClass(mode === "positions")}>Positions</button><button onClick={() => setMode("matches")} className={segmentClass(mode === "matches")}>Matches {completed ? `(${completed})` : ""}</button><button onClick={autoFill} className="min-h-[42px] rounded-2xl bg-amber-300 px-3 text-sm font-black text-amber-950">AI Fill</button><button onClick={resetAll} className="min-h-[42px] rounded-2xl border border-white/10 bg-white/10 px-3 text-sm font-black text-white/80">Reset</button></div></header>;
}
function segmentClass(active) { return `min-h-[42px] rounded-2xl border px-3 text-sm font-black transition ${active ? "border-emerald-200 bg-emerald-300 text-emerald-950" : "border-white/10 bg-white/10 text-white/70"}`; }
function BottomNav({ active, setTab }) { return <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-white/10 bg-[#07111d]/95 px-2 pb-[max(env(safe-area-inset-bottom),8px)] pt-2 backdrop-blur-2xl lg:max-w-6xl"><div className="grid grid-cols-6 gap-1.5">{TABS.map(([key, icon, label]) => <button key={key} onClick={() => setTab(key)} className={`flex min-h-[58px] flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-black transition active:scale-95 ${active === key ? "bg-emerald-300 text-emerald-950 shadow-lg shadow-emerald-500/20" : "bg-white/5 text-white/65"}`}><span className="text-base">{icon}</span><span className="truncate">{label}</span></button>)}</div></nav>; }
function Screen({ children }) { return <div className="min-h-[calc(100svh-180px)] space-y-4">{children}</div>; }
function Card({ children, className = "" }) { return <section className={`rounded-[1.75rem] border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/20 backdrop-blur-xl ${className}`}>{children}</section>; }
function SectionTitle({ title, sub }) { return <div className="mb-4"><h2 className="text-xl font-black tracking-tight">{title}</h2>{sub && <p className="mt-1 text-sm text-white/50">{sub}</p>}</div>; }
function HomeScreen({ champion, completed, tables, setTab }) { return <Screen><Card className="bg-gradient-to-br from-emerald-300/20 to-cyan-300/10"><p className="text-xs font-black uppercase tracking-[0.28em] text-emerald-200">Road to Final</p><h2 className="mt-2 text-3xl font-black leading-none">Build your 2026 bracket</h2><p className="mt-3 text-sm text-white/60">Choose group positions, generate knockout matches, pick winners, and reveal your champion.</p><div className="mt-4 grid grid-cols-2 gap-3"><button onClick={() => setTab("groups")} className="h-12 rounded-2xl bg-emerald-300 font-black text-emerald-950">Start</button><button onClick={() => setTab("knockout")} className="h-12 rounded-2xl border border-white/10 bg-white/10 font-black">Knockout</button></div></Card><div className="grid grid-cols-3 gap-3"><StatPill label="Picked" value={`${completed}/72`} icon="⚽" /><StatPill label="Tables" value="12" icon="📊" /><StatPill label="Winner" value={champion || "—"} icon="🏆" /></div><Card><SectionTitle title="Group leaders" sub="Top two preview from every group" /><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{Object.entries(tables).map(([group, rows]) => <button key={group} onClick={() => setTab("tables")} className="rounded-2xl bg-black/20 p-3 text-left"><div className="mb-2 font-black text-emerald-200">Group {group}</div>{rows.slice(0, 2).map((row, index) => <div key={row.team} className="flex justify-between py-1 text-sm"><span>{index + 1}. {teamLabel(row.team)}</span><span className="text-white/40">{row.pts}</span></div>)}</button>)}</div></Card></Screen>; }
function StatPill({ label, value, icon }) { return <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4"><div className="mb-2 text-emerald-200">{icon}</div><div className="truncate text-2xl font-black">{value}</div><div className="text-xs text-white/45">{label}</div></div>; }
function GroupsScreen({ positions, updatePosition }) { return <Screen><Card><SectionTitle title="Group positions" sub="Set 1st to 4th. Round of 32 updates instantly." /><div className="grid gap-4 lg:grid-cols-3">{Object.keys(GROUPS).map((group) => <GroupCard key={group} group={group} positions={positions[group]} onChange={updatePosition} />)}</div></Card></Screen>; }
function GroupCard({ group, positions, onChange }) { return <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20"><div className="flex items-center justify-between bg-white/5 px-4 py-3"><b>Group {group}</b><span className="text-xs text-white/40">Rank teams</span></div><div className="space-y-2 p-3">{positions.map((team, index) => <div key={`${group}-${index}`} className="grid grid-cols-[3rem_1fr] gap-2"><div className={`grid min-h-[48px] place-items-center rounded-2xl text-sm font-black ${index < 2 ? "bg-emerald-300 text-emerald-950" : index === 2 ? "bg-amber-300 text-amber-950" : "bg-white/10 text-white/60"}`}>{index + 1}</div><select value={team} onChange={(event) => onChange(group, index, event.target.value)} className="min-h-[48px] min-w-0 rounded-2xl border border-white/10 bg-white/10 px-3 text-sm font-black text-white outline-none">{GROUPS[group].map((option) => <option key={option} value={option} className="bg-slate-950 text-white">{fullTeam(option)}</option>)}</select></div>)}</div></div>; }
function MatchesScreen({ selectedGroup, setSelectedGroup, picks, setPicks, tables }) { const matches = GROUP_MATCHES.filter((match) => match.group === selectedGroup); return <Screen><Card><SectionTitle title="Match picks" sub="Choose winners or draw by group." /><div className="-mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-2">{Object.keys(GROUPS).map((group) => <button key={group} onClick={() => setSelectedGroup(group)} className={`min-h-[42px] min-w-[78px] rounded-2xl px-3 text-sm font-black ${selectedGroup === group ? "bg-emerald-300 text-emerald-950" : "bg-white/10 text-white/70"}`}>Group {group}</button>)}</div><div className="grid gap-3 lg:grid-cols-2">{matches.map((match) => <MatchCard key={match.id} match={match} pick={picks[match.id]} onPick={(value) => setPicks((current) => ({ ...current, [match.id]: value }))} />)}</div></Card><Card><SectionTitle title={`Group ${selectedGroup} table`} /><TableCard group={selectedGroup} rows={tables[selectedGroup]} /></Card></Screen>; }
function MatchCard({ match, pick, onPick }) { const chance = winChance(match.a, match.b); return <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-3"><div className="mb-3 flex justify-between gap-2 text-xs text-white/45"><span>M{match.id} · Group {match.group}</span><span>{match.date} · {match.time}</span></div><div className="space-y-2"><TeamButton code={match.a} active={pick === match.a} onClick={() => onPick(match.a)} chance={chance} /><button onClick={() => onPick("draw")} className={`min-h-[44px] w-full rounded-2xl border text-sm font-black ${pick === "draw" ? "border-cyan-200 bg-cyan-300 text-cyan-950" : "border-white/10 bg-white/5 text-white/65"}`}>Draw</button><TeamButton code={match.b} active={pick === match.b} onClick={() => onPick(match.b)} chance={100 - chance} /></div></div>; }
function TablesScreen({ tables }) { return <Screen><Card><SectionTitle title="Live tables" sub="All groups update from your predictions." /><div className="grid gap-4 lg:grid-cols-3">{Object.entries(tables).map(([group, rows]) => <TableCard key={group} group={group} rows={rows} />)}</div></Card></Screen>; }
function TableCard({ group, rows }) { return <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/20"><div className="bg-white/5 px-4 py-3 font-black">Group {group}</div><table className="w-full text-sm"><thead className="text-white/35"><tr><th className="px-4 py-2 text-left">Team</th><th>Pts</th><th>GD</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.team} className={index < 2 ? "text-emerald-200" : index === 2 ? "text-amber-200" : "text-white/60"}><td className="px-4 py-2 font-bold">{index + 1}. {teamLabel(row.team)}</td><td className="text-center font-black">{row.pts}</td><td className="text-center">{row.gd}</td></tr>)}</tbody></table></div>; }
function KnockoutScreen({ allKnockout, r32, r16, qf, sf, final, knockout, chooseWinner }) { return <Screen><Card><div className="mb-4 flex items-start justify-between gap-3"><SectionTitle title="Knockout" sub="Pick winners to unlock next rounds." /><button className="h-11 shrink-0 rounded-2xl bg-amber-300 px-4 text-sm font-black text-amber-950">📤 Share</button></div><KnockoutSchedule matches={allKnockout} knockout={knockout} /><BracketRound title="Round of 32" matches={r32} knockout={knockout} onPick={chooseWinner} /><BracketRound title="Round of 16" matches={r16} knockout={knockout} onPick={chooseWinner} /><BracketRound title="Quarter-finals" matches={qf} knockout={knockout} onPick={chooseWinner} /><BracketRound title="Semi-finals" matches={sf} knockout={knockout} onPick={chooseWinner} /><BracketRound title="Final" matches={final} knockout={knockout} onPick={chooseWinner} featured /></Card></Screen>; }
function KnockoutSchedule({ matches, knockout }) { return <div className="mb-5"><h3 className="mb-3 font-black text-cyan-200">Generated schedule</h3><div className="flex gap-3 overflow-x-auto pb-2">{matches.map((match) => <ScheduleRailCard key={match.id} match={match} winner={knockout[match.id]} />)}</div></div>; }
function ScheduleRailCard({ match, winner }) { return <div className="min-w-[190px] rounded-[1.25rem] border border-white/10 bg-white/5 p-3"><div className="flex justify-between text-xs text-white/45"><span>M{match.id}</span><span>{match.time}</span></div><div className="mt-1 text-xs text-cyan-200">{match.round}</div><div className="mt-2 text-sm font-black">{match.a ? teamLabel(match.a) : match.slotA}</div><div className="text-xs text-white/35">vs</div><div className="text-sm font-black">{match.b ? teamLabel(match.b) : match.slotB}</div><div className="mt-2 text-xs text-white/45">{winner ? `Winner: ${teamLabel(winner)}` : match.a && match.b ? "Ready" : "Waiting"}</div></div>; }
function BracketRound({ title, matches, knockout, onPick, featured = false }) { return <div className="mb-5"><h3 className="mb-3 text-lg font-black">{title}</h3><div className={`grid gap-3 ${featured ? "" : "lg:grid-cols-2"}`}>{matches.map((match) => <KnockoutCard key={match.id} match={match} pick={knockout[match.id]} onPick={onPick} />)}</div></div>; }
function KnockoutCard({ match, pick, onPick }) { const ready = match.a && match.b; return <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-3"><div className="mb-3 flex justify-between gap-2"><div><div className="font-black text-amber-200">M{match.id}</div><div className="text-xs text-white/45">{match.date} · {match.time}</div></div><span>›</span></div>{!ready ? <div className="text-sm text-white/45">Waiting for {match.slotA} vs {match.slotB}</div> : <div className="space-y-2"><TeamButton code={match.a} active={pick === match.a} onClick={() => onPick(match.id, match.a)} chance={winChance(match.a, match.b)} /><TeamButton code={match.b} active={pick === match.b} onClick={() => onPick(match.id, match.b)} chance={100 - winChance(match.a, match.b)} /></div>}</div>; }
function TeamButton({ code, active, onClick, chance }) { return <button onClick={onClick} className={`flex min-h-[48px] w-full items-center justify-between gap-3 rounded-2xl border px-3 text-left transition active:scale-[0.99] ${active ? "border-emerald-200 bg-emerald-300 text-emerald-950" : "border-white/10 bg-white/5 text-white hover:bg-white/10"}`}><span className="font-black">{teamLabel(code)} <span className="font-medium opacity-70">{TEAM[code]?.name}</span></span><span className="rounded-full bg-black/15 px-2 py-1 text-xs font-black">{chance}%</span></button>; }
function ScheduleScreen({ groupMatches, knockoutMatches }) { const [filter, setFilter] = useState("all"); const visible = [...(filter === "all" || filter === "group" ? groupMatches : []), ...(filter === "all" || filter === "knockout" ? knockoutMatches : [])]; return <Screen><Card><SectionTitle title="Schedule" sub="Full match list with generated knockout teams." /><div className="mb-4 grid grid-cols-3 gap-2"><button className={filterButton(filter === "all")} onClick={() => setFilter("all")}>All</button><button className={filterButton(filter === "group")} onClick={() => setFilter("group")}>Groups</button><button className={filterButton(filter === "knockout")} onClick={() => setFilter("knockout")}>KO</button></div><div className="grid gap-3 lg:grid-cols-3">{visible.map((match) => <ScheduleCard key={`s-${match.id}`} match={match} />)}</div></Card></Screen>; }
function filterButton(active) { return `min-h-[42px] rounded-2xl border px-3 text-sm font-black ${active ? "border-emerald-200 bg-emerald-300 text-emerald-950" : "border-white/10 bg-white/10 text-white/70"}`; }
function ScheduleCard({ match }) { return <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4"><div className="mb-3 flex justify-between gap-3"><div><div className="font-black text-cyan-200">Match {match.id}</div><div className="text-xs text-white/45">{match.round}</div></div><div className="text-right text-xs text-white/55"><div>{match.date}</div><div className="font-bold text-white/75">{match.time}</div></div></div><div className="rounded-2xl border border-white/10 bg-white/5 p-3"><div className="font-bold">{match.a ? fullTeam(match.a) : match.slotA || "TBD"}</div><div className="my-1 text-xs text-white/35">vs</div><div className="font-bold">{match.b ? fullTeam(match.b) : match.slotB || "TBD"}</div></div></div>; }

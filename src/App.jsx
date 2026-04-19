import { useState, useEffect, useRef } from "react";

const QUOTES = [
  "Small steps every day beat giant leaps once in a while.",
  "Your body can handle almost anything. It's your mind you have to convince.",
  "Progress is progress, no matter how small.",
  "Discipline is choosing what you want most over what you want now.",
  "Every rep, every stretch — you're building a version of yourself you'll thank later.",
  "Rest when you need to. But always come back.",
  "You don't have to be great to start, but you have to start to be great.",
  "One year from now, you'll wish you had started today.",
  "Consistency beats perfection every single time.",
  "The pain you feel today is the strength you feel tomorrow.",
];

const PHASES = {
  1: { name: "Phase 1", label: "Warm-Up & Flexibility", desc: "Opening the body. Full stretching & mobility.", color: "#00E5FF", months: "Month 1–2" },
  2: { name: "Phase 2", label: "Core & Belly Fat", desc: "Targeted core, cardio, side & belly fat.", color: "#00FF88", months: "Month 3–5" },
  3: { name: "Phase 3", label: "Full Body Strength", desc: "Muscle strength, toning & tightening.", color: "#FF4D6D", months: "Month 6+" },
};

// ---- Stick Figure Illustrations ----
const FIG = ({ children, w = 80, h = 130 }) => (
  <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>{children}</svg>
);

function useOsc(speed = 0.07) {
  const [t, setT] = useState(0);
  useEffect(() => { const id = setInterval(() => setT(v => v + speed), 50); return () => clearInterval(id); }, [speed]);
  return t;
}

const IllustrationWrap = ({ children }) => (
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 140, padding: "0 10px" }}>
    {children}
  </div>
);

function NeckRollIll() {
  const t = useOsc(0.08);
  const cx = 40 + Math.sin(t) * 4, cy = 18 + Math.cos(t) * 2;
  return <IllustrationWrap><FIG><circle cx={cx} cy={cy} r="11" fill="none" stroke="#00E5FF" strokeWidth="2.5"/><line x1={cx} y1={cy+11} x2="40" y2="65" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="40" x2="20" y2="58" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="40" x2="60" y2="58" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="65" x2="28" y2="95" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="65" x2="52" y2="95" stroke="#aaa" strokeWidth="2.5"/></FIG></IllustrationWrap>;
}

function ShoulderRollIll() {
  const t = useOsc(0.08);
  const ly = 38 + Math.sin(t) * 9, ry = 38 + Math.sin(t + Math.PI) * 9;
  return <IllustrationWrap><FIG><circle cx="40" cy="18" r="11" fill="none" stroke="#00E5FF" strokeWidth="2.5"/><line x1="40" y1="29" x2="40" y2="65" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="38" x2="20" y2={ly} stroke="#00E5FF" strokeWidth="2.5"/><line x1="40" y1="38" x2="60" y2={ry} stroke="#00E5FF" strokeWidth="2.5"/><line x1="40" y1="65" x2="28" y2="95" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="65" x2="52" y2="95" stroke="#aaa" strokeWidth="2.5"/></FIG></IllustrationWrap>;
}

function HipCircleIll() {
  const t = useOsc(0.07);
  const hx = 40 + Math.sin(t) * 8, hy = 65 + Math.cos(t) * 5;
  return <IllustrationWrap><FIG><circle cx="40" cy="18" r="11" fill="none" stroke="#00E5FF" strokeWidth="2.5"/><line x1="40" y1="29" x2={hx} y2={hy} stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="38" x2="20" y2="55" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="38" x2="60" y2="55" stroke="#aaa" strokeWidth="2.5"/><line x1={hx} y1={hy} x2={hx-10} y2="95" stroke="#aaa" strokeWidth="2.5"/><line x1={hx} y1={hy} x2={hx+10} y2="95" stroke="#aaa" strokeWidth="2.5"/><circle cx={hx} cy={hy} r="4" fill="#00E5FF" opacity="0.4"/></FIG></IllustrationWrap>;
}

function TorsoTwistIll() {
  const t = useOsc(0.06);
  const twist = Math.sin(t) * 16;
  return <IllustrationWrap><FIG><circle cx="40" cy="18" r="11" fill="none" stroke="#00E5FF" strokeWidth="2.5"/><line x1="40" y1="29" x2="40" y2="65" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="40" x2={20+twist} y2="46" stroke="#00E5FF" strokeWidth="2.5"/><line x1="40" y1="40" x2={60+twist} y2="46" stroke="#00E5FF" strokeWidth="2.5"/><line x1="40" y1="65" x2="28" y2="95" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="65" x2="52" y2="95" stroke="#aaa" strokeWidth="2.5"/></FIG></IllustrationWrap>;
}

function SideBendIll() {
  const t = useOsc(0.05);
  const b = Math.sin(t) * 10;
  return <IllustrationWrap><FIG><circle cx={40+b} cy="18" r="11" fill="none" stroke="#00E5FF" strokeWidth="2.5"/><line x1={40+b} y1="29" x2="40" y2="65" stroke="#aaa" strokeWidth="2.5"/><line x1={40+b} y1="38" x2={20+b*2} y2="54" stroke="#00E5FF" strokeWidth="2.5"/><line x1={40+b} y1="38" x2={62+b*0.4} y2="30" stroke="#00E5FF" strokeWidth="2.5"/><line x1="40" y1="65" x2="28" y2="95" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="65" x2="52" y2="95" stroke="#aaa" strokeWidth="2.5"/></FIG></IllustrationWrap>;
}

function LungeIll() {
  return <IllustrationWrap><FIG><circle cx="40" cy="20" r="11" fill="none" stroke="#00E5FF" strokeWidth="2.5"/><line x1="40" y1="31" x2="40" y2="62" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="42" x2="22" y2="55" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="42" x2="55" y2="50" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="62" x2="24" y2="92" stroke="#00E5FF" strokeWidth="2.5"/><line x1="24" y1="92" x2="14" y2="112" stroke="#aaa" strokeWidth="2" strokeDasharray="3,2"/><line x1="40" y1="62" x2="58" y2="76" stroke="#aaa" strokeWidth="2.5"/><line x1="58" y1="76" x2="64" y2="98" stroke="#aaa" strokeWidth="2.5"/></FIG></IllustrationWrap>;
}

function ButterflyIll() {
  return <IllustrationWrap><FIG><circle cx="40" cy="28" r="11" fill="none" stroke="#00E5FF" strokeWidth="2.5"/><line x1="40" y1="39" x2="40" y2="68" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="50" x2="20" y2="62" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="50" x2="60" y2="62" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="68" x2="18" y2="90" stroke="#00E5FF" strokeWidth="2.5"/><line x1="40" y1="68" x2="62" y2="90" stroke="#00E5FF" strokeWidth="2.5"/><line x1="18" y1="90" x2="40" y2="96" stroke="#00E5FF" strokeWidth="2"/><line x1="62" y1="90" x2="40" y2="96" stroke="#00E5FF" strokeWidth="2"/></FIG></IllustrationWrap>;
}

function CatCowIll() {
  const t = useOsc(0.06);
  const arch = Math.sin(t) * 10;
  return <IllustrationWrap><FIG w={90} h={100}><circle cx="15" cy={52+arch} r="10" fill="none" stroke="#00E5FF" strokeWidth="2.5"/><path d={`M 25 ${52+arch} Q 52 ${42-arch} 78 ${52+arch}`} fill="none" stroke="#aaa" strokeWidth="2.5"/><line x1="32" y1={50+arch} x2="26" y2="78" stroke="#aaa" strokeWidth="2"/><line x1="52" y1={44+arch} x2="50" y2="78" stroke="#aaa" strokeWidth="2"/><line x1="68" y1={50+arch} x2="68" y2="78" stroke="#aaa" strokeWidth="2"/><line x1="78" y1={52+arch} x2="84" y2="38" stroke="#00E5FF" strokeWidth="2"/></FIG></IllustrationWrap>;
}

function BridgeIll() {
  const t = useOsc(0.05);
  const hip = 55 + Math.sin(t) * 8;
  return <IllustrationWrap><FIG w={90} h={110}><circle cx="12" cy="65" r="10" fill="none" stroke="#00E5FF" strokeWidth="2.5"/><line x1="22" y1="65" x2="50" y2={hip} stroke="#aaa" strokeWidth="2.5"/><line x1="50" y1={hip} x2="74" y2="82" stroke="#aaa" strokeWidth="2.5"/><line x1="74" y1="82" x2="76" y2="100" stroke="#aaa" strokeWidth="2.5"/><line x1="34" y1={hip+3} x2="28" y2="38" stroke="#aaa" strokeWidth="2"/><line x1="34" y1={hip+3} x2="54" y2="38" stroke="#aaa" strokeWidth="2"/><circle cx="50" cy={hip} r="5" fill="#00E5FF" opacity="0.4"/></FIG></IllustrationWrap>;
}

function JumpingJackIll() {
  const t = useOsc(0.12);
  const open = Math.abs(Math.sin(t));
  return <IllustrationWrap><FIG w={90} h={130}><circle cx="45" cy="15" r="11" fill="none" stroke="#00FF88" strokeWidth="2.5"/><line x1="45" y1="26" x2="45" y2="65" stroke="#aaa" strokeWidth="2.5"/><line x1="45" y1="38" x2={45-26*open} y2={38-18*open} stroke="#00FF88" strokeWidth="2.5"/><line x1="45" y1="38" x2={45+26*open} y2={38-18*open} stroke="#00FF88" strokeWidth="2.5"/><line x1="45" y1="65" x2={45-22*open} y2="100" stroke="#00FF88" strokeWidth="2.5"/><line x1="45" y1="65" x2={45+22*open} y2="100" stroke="#00FF88" strokeWidth="2.5"/></FIG></IllustrationWrap>;
}

function HighKneesIll() {
  const t = useOsc(0.14);
  const l = Math.max(0, Math.sin(t)), r2 = Math.max(0, Math.sin(t+Math.PI));
  return <IllustrationWrap><FIG><circle cx="40" cy="15" r="11" fill="none" stroke="#00FF88" strokeWidth="2.5"/><line x1="40" y1="26" x2="40" y2="65" stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="38" x2={22+r2*8} y2={44+r2*4} stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="38" x2={56-l*6} y2={42+l*4} stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="65" x2="30" y2={65+28*(1-l)} stroke="#aaa" strokeWidth="2.5"/><line x1="30" y1={65+28*(1-l)} x2="28" y2={93+l*8} stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1="65" x2="52" y2={65+22-r2*18} stroke="#00FF88" strokeWidth="2.5"/><line x1="52" y1={65+22-r2*18} x2="54" y2={87+r2*8} stroke="#00FF88" strokeWidth="2.5"/></FIG></IllustrationWrap>;
}

function PlankIll() {
  return <IllustrationWrap><FIG w={100} h={100}><circle cx="14" cy="44" r="10" fill="none" stroke="#00FF88" strokeWidth="2.5"/><line x1="24" y1="44" x2="78" y2="50" stroke="#aaa" strokeWidth="2.5"/><line x1="27" y1="45" x2="22" y2="66" stroke="#aaa" strokeWidth="2"/><line x1="22" y1="66" x2="38" y2="66" stroke="#00FF88" strokeWidth="3"/><line x1="52" y1="49" x2="50" y2="70" stroke="#aaa" strokeWidth="2"/><line x1="50" y1="70" x2="65" y2="70" stroke="#00FF88" strokeWidth="3"/><line x1="78" y1="50" x2="80" y2="72" stroke="#aaa" strokeWidth="2"/><line x1="78" y1="50" x2="88" y2="64" stroke="#aaa" strokeWidth="2"/></FIG></IllustrationWrap>;
}

function BicycleCrunchIll() {
  const t = useOsc(0.09);
  const k = Math.sin(t) * 15;
  return <IllustrationWrap><FIG w={90} h={120}><circle cx="45" cy="38" r="11" fill="none" stroke="#00FF88" strokeWidth="2.5"/><line x1="45" y1="49" x2="45" y2="76" stroke="#aaa" strokeWidth="2.5"/><line x1="45" y1="60" x2={24+k} y2={50-Math.abs(k)*0.4} stroke="#00FF88" strokeWidth="2.5"/><line x1="45" y1="60" x2={66-k} y2={50+Math.abs(k)*0.4} stroke="#00FF88" strokeWidth="2.5"/><line x1="45" y1="76" x2={32+k*0.5} y2="102" stroke="#aaa" strokeWidth="2.5"/><line x1="45" y1="76" x2={58-k*0.5} y2="98" stroke="#aaa" strokeWidth="2.5"/></FIG></IllustrationWrap>;
}

function LegRaiseIll() {
  const t = useOsc(0.07);
  const legH = 68 + Math.sin(t) * 24;
  return <IllustrationWrap><FIG w={90} h={110}><circle cx="14" cy="52" r="10" fill="none" stroke="#00FF88" strokeWidth="2.5"/><line x1="24" y1="52" x2="65" y2="58" stroke="#aaa" strokeWidth="2.5"/><line x1="34" y1="50" x2="28" y2="32" stroke="#aaa" strokeWidth="2"/><line x1="52" y1="55" x2="56" y2="34" stroke="#aaa" strokeWidth="2"/><line x1="65" y1="58" x2={68} y2={legH} stroke="#00FF88" strokeWidth="2.5"/><line x1="65" y1="58" x2={74} y2="82" stroke="#aaa" strokeWidth="2" strokeDasharray="3,2"/></FIG></IllustrationWrap>;
}

function RussianTwistIll() {
  const t = useOsc(0.07);
  const tw = Math.sin(t) * 20;
  return <IllustrationWrap><FIG w={90} h={120}><circle cx="45" cy="38" r="11" fill="none" stroke="#00FF88" strokeWidth="2.5"/><line x1="45" y1="49" x2="45" y2="77" stroke="#aaa" strokeWidth="2.5"/><line x1="45" y1="60" x2={24+tw} y2={54+Math.abs(tw)*0.3} stroke="#00FF88" strokeWidth="2.5"/><line x1="45" y1="60" x2={66+tw} y2={54+Math.abs(tw)*0.3} stroke="#00FF88" strokeWidth="2.5"/><line x1="45" y1="77" x2="30" y2="100" stroke="#aaa" strokeWidth="2.5"/><line x1="45" y1="77" x2="60" y2="100" stroke="#aaa" strokeWidth="2.5"/></FIG></IllustrationWrap>;
}
function SquatIll() {
  const t = useOsc(0.07);
  const sq = Math.abs(Math.sin(t)) * 18;
  return <IllustrationWrap><FIG><circle cx="40" cy={18+sq*0.3} r="11" fill="none" stroke="#FF4D6D" strokeWidth="2.5"/><line x1="40" y1={29+sq*0.3} x2="40" y2={65+sq*0.2} stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1={42+sq*0.2} x2={20-sq*0.3} y2={55+sq*0.4} stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1={42+sq*0.2} x2={60+sq*0.3} y2={55+sq*0.4} stroke="#aaa" strokeWidth="2.5"/><line x1="40" y1={65+sq*0.2} x2={28-sq*0.2} y2={90+sq} stroke="#FF4D6D" strokeWidth="2.5"/><line x1="40" y1={65+sq*0.2} x2={52+sq*0.2} y2={90+sq} stroke="#FF4D6D" strokeWidth="2.5"/></FIG></IllustrationWrap>;
}

function FistPushupIll() {
  const t = useOsc(0.07);
  const dip = Math.abs(Math.sin(t)) * 12;
  return <IllustrationWrap><FIG w={100} h={110}><circle cx="18" cy={42+dip} r="10" fill="none" stroke="#FF4D6D" strokeWidth="2.5"/><line x1="28" y1={42+dip} x2="75" y2="55" stroke="#aaa" strokeWidth="2.5"/><line x1="32" y1={44+dip} x2="24" y2={65+dip} stroke="#aaa" strokeWidth="2"/><rect x="16" y={68+dip} width="10" height="6" rx="2" fill="#FF4D6D" opacity="0.8"/><line x1="54" y1="51" x2="50" y2="72" stroke="#aaa" strokeWidth="2"/><rect x="43" y="75" width="10" height="6" rx="2" fill="#FF4D6D" opacity="0.8"/><line x1="75" y1="55" x2="78" y2="75" stroke="#aaa" strokeWidth="2"/><line x1="75" y1="55" x2="88" y2="68" stroke="#aaa" strokeWidth="2"/></FIG></IllustrationWrap>;
}

function TricepDipIll() {
  const t = useOsc(0.07);
  const dip = Math.abs(Math.sin(t)) * 12;
  return <IllustrationWrap><FIG w={90} h={120}><rect x="5" y="56" width="28" height="7" rx="3" fill="#222" stroke="#444" strokeWidth="1.5"/><rect x="57" y="56" width="28" height="7" rx="3" fill="#222" stroke="#444" strokeWidth="1.5"/><circle cx="45" cy={40+dip} r="11" fill="none" stroke="#FF4D6D" strokeWidth="2.5"/><line x1="45" y1={51+dip} x2="45" y2={70+dip} stroke="#aaa" strokeWidth="2.5"/><line x1="45" y1={60+dip} x2="20" y2="57" stroke="#FF4D6D" strokeWidth="2.5"/><line x1="45" y1={60+dip} x2="70" y2="57" stroke="#FF4D6D" strokeWidth="2.5"/><line x1="45" y1={70+dip} x2="34" y2="100" stroke="#aaa" strokeWidth="2.5"/><line x1="45" y1={70+dip} x2="56" y2="100" stroke="#aaa" strokeWidth="2.5"/></FIG></IllustrationWrap>;
}

function SupermanIll() {
  const t = useOsc(0.07);
  const lift = Math.abs(Math.sin(t)) * 10;
  return <IllustrationWrap><FIG w={100} h={100}><circle cx="50" cy={56-lift} r="10" fill="none" stroke="#FF4D6D" strokeWidth="2.5"/><line x1="50" y1={66-lift} x2="50" y2="80" stroke="#aaa" strokeWidth="2.5"/><line x1="50" y1={70-lift} x2={18-lift} y2={63-lift} stroke="#FF4D6D" strokeWidth="2.5"/><line x1="50" y1={70-lift} x2={82+lift} y2={63-lift} stroke="#FF4D6D" strokeWidth="2.5"/><line x1="50" y1="80" x2={34-lift*0.4} y2="98" stroke="#FF4D6D" strokeWidth="2.5"/><line x1="50" y1="80" x2={66+lift*0.4} y2="98" stroke="#FF4D6D" strokeWidth="2.5"/></FIG></IllustrationWrap>;
}

function GluteBridgeIll() {
  const t = useOsc(0.06);
  const hip = 55 + Math.sin(t) * 10;
  return <IllustrationWrap><FIG w={90} h={110}><circle cx="12" cy="65" r="10" fill="none" stroke="#FF4D6D" strokeWidth="2.5"/><line x1="22" y1="65" x2="52" y2={hip} stroke="#aaa" strokeWidth="2.5"/><line x1="52" y1={hip} x2="76" y2="80" stroke="#aaa" strokeWidth="2.5"/><line x1="76" y1="80" x2="78" y2="98" stroke="#aaa" strokeWidth="2.5"/><line x1="34" y1={hip+2} x2="30" y2="38" stroke="#aaa" strokeWidth="2"/><line x1="34" y1={hip+2} x2="54" y2="38" stroke="#aaa" strokeWidth="2"/><circle cx="52" cy={hip} r="5" fill="#FF4D6D" opacity="0.4"/></FIG></IllustrationWrap>;
}

function DefaultIll({ color = "#888" }) {
  return <IllustrationWrap><FIG><circle cx="40" cy="18" r="11" fill="none" stroke={color} strokeWidth="2.5"/><line x1="40" y1="29" x2="40" y2="65" stroke={color} strokeWidth="2.5"/><line x1="40" y1="38" x2="20" y2="55" stroke={color} strokeWidth="2.5"/><line x1="40" y1="38" x2="60" y2="55" stroke={color} strokeWidth="2.5"/><line x1="40" y1="65" x2="28" y2="95" stroke={color} strokeWidth="2.5"/><line x1="40" y1="65" x2="52" y2="95" stroke={color} strokeWidth="2.5"/></FIG></IllustrationWrap>;
}

function ExIll({ name, color }) {
  const map = {
    "Neck Rolls": <NeckRollIll/>, "Shoulder Rolls": <ShoulderRollIll/>,
    "Hip Circles": <HipCircleIll/>, "Torso Twist": <TorsoTwistIll/>,
    "Standing Side Bend": <SideBendIll/>, "Hip Flexor Lunge Stretch": <LungeIll/>,
    "Butterfly Stretch": <ButterflyIll/>, "Cat-Cow on Fists": <CatCowIll/>,
    "Bridge Hold": <BridgeIll/>, "Jumping Jacks": <JumpingJackIll/>,
    "High Knees": <HighKneesIll/>, "Plank on Forearms": <PlankIll/>,
    "Forearm Plank": <PlankIll/>, "Bicycle Crunches": <BicycleCrunchIll/>,
    "Leg Raises": <LegRaiseIll/>, "Russian Twists": <RussianTwistIll/>,
    "Fist Push-Ups": <FistPushupIll/>, "Bodyweight Squats": <SquatIll/>,
    "Jump Squats": <SquatIll/>, "Glute Bridges": <GluteBridgeIll/>,
    "Tricep Dips (Chair)": <TricepDipIll/>, "Superman Hold": <SupermanIll/>,
  };
  return map[name] || <DefaultIll color={color}/>;
}

// ---- Exercise Data ----
const EXERCISE_POOL = {
  1: {
    short: [
      { name: "Neck Rolls", duration: 45, desc: "Slow circles each direction, 5 each side", target: "Neck & Traps", met: 2.5 },
      { name: "Shoulder Rolls", duration: 45, desc: "Big backward then forward rolls", target: "Shoulders", met: 2.5 },
      { name: "Hip Circles", duration: 50, desc: "Hands on hips, big slow circles both ways", target: "Hips & Lower Back", met: 3.0 },
      { name: "Torso Twist", duration: 50, desc: "Arms out, slow twist left and right steadily", target: "Core & Spine", met: 3.0 },
      { name: "Standing Side Bend", duration: 45, desc: "Arms up, lean to each side slowly", target: "Obliques", met: 2.8 },
      { name: "Standing Quad Stretch", duration: 45, desc: "Hold ankle to glute, switch sides, use wall if needed", target: "Quads", met: 2.5 },
      { name: "Standing Hamstring Stretch", duration: 45, desc: "One leg forward heel on floor, lean forward gently", target: "Hamstrings", met: 2.5 },
      { name: "Hip Flexor Lunge Stretch", duration: 50, desc: "Lunge, drop back knee, push hips forward slowly", target: "Hip Flexors", met: 3.0 },
      { name: "Butterfly Stretch", duration: 60, desc: "Sit, soles together, gently press knees down", target: "Inner Thighs", met: 2.5 },
      { name: "Seated Forward Fold", duration: 60, desc: "Legs straight, reach toward toes, breathe into it", target: "Hamstrings & Back", met: 2.5 },
      { name: "Arm Cross Stretch", duration: 40, desc: "Pull arm across chest, hold each side 20 seconds", target: "Shoulders", met: 2.5 },
      { name: "Overhead Tricep Stretch", duration: 40, desc: "Arm behind head, push elbow down gently", target: "Triceps", met: 2.5 },
    ],
    long: [
      { name: "Cat-Cow on Fists", duration: 60, desc: "On fists and knees, arch then curve spine slowly", target: "Spine", met: 3.0 },
      { name: "Child's Pose on Fists", duration: 60, desc: "Kneel, sit back on heels, fists forward on floor", target: "Back & Hips", met: 2.3 },
      { name: "Bridge Hold", duration: 45, desc: "On back, feet flat, push hips up and hold steady", target: "Glutes & Lower Back", met: 3.5 },
      { name: "Lying Spinal Twist", duration: 60, desc: "On back, one knee across body, arms out flat", target: "Lower Back", met: 2.3 },
      { name: "Supine Hamstring Stretch", duration: 50, desc: "Lie on back, pull one leg straight toward chest", target: "Hamstrings", met: 2.5 },
      { name: "Deep Breathing & Cool Down", duration: 90, desc: "Lie flat, 4-count inhale, 6-count exhale, relax", target: "Recovery", met: 1.5 },
    ],
  },
  2: {
    short: [
      { name: "Jumping Jacks", duration: 60, desc: "Steady pace, land softly on every rep", target: "Full Body Cardio", met: 8.0 },
      { name: "High Knees", duration: 45, desc: "Drive knees up fast, pump arms with rhythm", target: "Core & Cardio", met: 8.0 },
      { name: "Bicycle Crunches", duration: 50, desc: "Hands behind head, elbow to opposite knee", target: "Obliques & Abs", met: 5.0 },
      { name: "Leg Raises", duration: 45, desc: "Lie flat, legs straight, raise to 90° and lower slow", target: "Lower Abs", met: 4.0 },
      { name: "Russian Twists", duration: 45, desc: "Sit, lean back 45°, rotate side to side", target: "Obliques", met: 4.0 },
      { name: "Plank on Forearms", duration: 40, desc: "Elbows under shoulders, hold body perfectly straight", target: "Core", met: 4.0 },
      { name: "Side Plank on Forearm", duration: 35, desc: "Elbow below shoulder, body in line, each side", target: "Obliques", met: 4.0 },
      { name: "Flutter Kicks", duration: 40, desc: "Lie flat, small fast leg kicks, keep lower back down", target: "Lower Abs", met: 4.5 },
      { name: "Standing Oblique Crunch", duration: 45, desc: "Hands behind head, drive knee to same-side elbow", target: "Obliques", met: 4.5 },
      { name: "Burpees (No Pushup)", duration: 40, desc: "Squat down, jump feet back, jump feet in, jump up", target: "Full Body Cardio", met: 8.0 },
      { name: "Squat Jumps", duration: 40, desc: "Squat deep then explode up, land soft and quiet", target: "Legs & Cardio", met: 7.0 },
      { name: "Mountain Climbers (Fists)", duration: 40, desc: "On fists, drive knees to chest alternating fast", target: "Core & Cardio", met: 8.0 },
    ],
    long: [
      { name: "Jumping Jacks", duration: 60, desc: "Steady pace warm-up cardio", target: "Cardio", met: 8.0 },
      { name: "High Knees", duration: 60, desc: "Push the pace, stay light on feet", target: "Cardio", met: 8.0 },
      { name: "Bicycle Crunches", duration: 60, desc: "Slow and controlled, full rotation each rep", target: "Obliques", met: 5.0 },
      { name: "Burpees (No Pushup)", duration: 50, desc: "Full effort, breathe steadily", target: "Full Body", met: 8.0 },
      { name: "Russian Twists", duration: 60, desc: "Add a pause at each side for full activation", target: "Obliques", met: 4.0 },
      { name: "Plank on Forearms", duration: 60, desc: "Squeeze core and glutes, breathe", target: "Core", met: 4.0 },
    ],
  },
  3: {
    short: [
      { name: "Fist Push-Ups", duration: 50, desc: "On fists, full push-up or knee-assisted if needed", target: "Chest & Arms", met: 8.0 },
      { name: "Bodyweight Squats", duration: 50, desc: "Feet shoulder-width, sit back and down", target: "Quads & Glutes", met: 5.0 },
      { name: "Reverse Lunges", duration: 50, desc: "Step back into lunge, alternate legs steadily", target: "Legs & Glutes", met: 5.0 },
      { name: "Glute Bridges", duration: 50, desc: "On back, feet flat, drive hips up and squeeze at top", target: "Glutes & Hamstrings", met: 4.5 },
      { name: "Forearm Plank", duration: 45, desc: "Hold perfectly straight body on forearms", target: "Core", met: 4.0 },
      { name: "Superman Hold", duration: 45, desc: "Lie face down, lift arms and legs off floor, hold", target: "Lower Back & Glutes", met: 4.0 },
      { name: "Tricep Dips (Chair)", duration: 45, desc: "Hands on chair behind you, dip down and push up", target: "Triceps", met: 6.0 },
      { name: "Jump Squats", duration: 40, desc: "Deep squat, explode upward, land softly", target: "Power & Legs", met: 7.0 },
      { name: "Burpees (No Pushup)", duration: 40, desc: "Full pace burpees, breathe", target: "Full Body", met: 8.0 },
      { name: "Bicycle Crunches", duration: 45, desc: "Full rotation, slow and controlled, each side", target: "Abs & Obliques", met: 5.0 },
      { name: "Pike Push-Ups on Fists", duration: 40, desc: "Hips high, lower head toward floor on fists", target: "Shoulders", met: 7.0 },
      { name: "Mountain Climbers (Fists)", duration: 45, desc: "On fists, drive knees fast, keep hips level", target: "Core & Cardio", met: 8.0 },
    ],
    long: [
      { name: "Fist Push-Ups", duration: 60, desc: "Max reps, rest when needed within the set", target: "Chest", met: 8.0 },
      { name: "Jump Squats", duration: 55, desc: "Explosive and controlled, every single rep", target: "Power", met: 7.0 },
      { name: "Tricep Dips (Chair)", duration: 55, desc: "Full range of motion, slow at bottom", target: "Triceps", met: 6.0 },
      { name: "Superman Hold", duration: 55, desc: "Hold at top for 2 counts, lower slow", target: "Back", met: 4.0 },
      { name: "Burpees (No Pushup)", duration: 55, desc: "Maximum effort throughout", target: "Full Body", met: 8.0 },
      { name: "Glute Bridges", duration: 55, desc: "Single leg alternating, slow and controlled", target: "Glutes", met: 4.5 },
    ],
  },
};

function getTodayExercises(phase, sessionType) {
  const pool = EXERCISE_POOL[phase];
  const seed = new Date().getDate() + new Date().getMonth() * 31;
  const shuffle = (arr, s) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = (s + i * 7) % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  };
  if (sessionType === "short") return shuffle([...pool.short], seed).slice(0, 10);
  return [...shuffle([...pool.short], seed).slice(0, 9), ...shuffle([...pool.long], seed).slice(0, 6)];
}

function formatTime(s) {
  return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
}

function gs(key, def) { try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : def; } catch { return def; } }
function ss(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }

const ACTIVITY_OPTIONS = [
  { id: "walk_slow", label: "Slow Walk", unit: "minutes", met: 2.8 },
  { id: "walk_brisk", label: "Brisk Walk", unit: "minutes", met: 4.3 },
  { id: "steps", label: "Steps (per 1000)", unit: "thousands", met: 3.5 },
  { id: "jog", label: "Light Jog", unit: "minutes", met: 7.0 },
  { id: "stairs", label: "Climbing Stairs", unit: "minutes", met: 8.0 },
  { id: "housework", label: "Housework / Chores", unit: "minutes", met: 3.0 },
  { id: "standing", label: "Standing / Light Activity", unit: "minutes", met: 1.8 },
];

export default function NikhilFit() {
  const [screen, setScreen] = useState("home");
  const [phase, setPhase] = useState(() => gs("nf_phase", 1));
  const [sessionType, setSessionType] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [currentEx, setCurrentEx] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [history, setHistory] = useState(() => gs("nf_history", []));
  const [streak, setStreak] = useState(() => gs("nf_streak", 0));
  const [lastWorkout, setLastWorkout] = useState(() => gs("nf_lastworkout", null));
  const [sessionDone, setSessionDone] = useState(false);
  const timerRef = useRef(null);

  // Calorie state
  const [workoutDone, setWorkoutDone] = useState(false);
  const [workoutMins, setWorkoutMins] = useState(35);
  const [workoutPhaseInput, setWorkoutPhaseInput] = useState(1);
  const [calorieInputs, setCalorieInputs] = useState({});
  const [calorieResult, setCalorieResult] = useState(null);

  useEffect(() => { ss("nf_phase", phase); }, [phase]);
  useEffect(() => { ss("nf_history", history); }, [history]);
  useEffect(() => { ss("nf_streak", streak); }, [streak]);
  useEffect(() => { ss("nf_lastworkout", lastWorkout); }, [lastWorkout]);

  useEffect(() => {
    if (timerRunning && timer > 0) { timerRef.current = setTimeout(() => setTimer(t => t - 1), 1000); }
    else if (timerRunning && timer === 0) { setTimerRunning(false); }
    return () => clearTimeout(timerRef.current);
  }, [timerRunning, timer]);

  const startSession = (type) => {
    const exs = getTodayExercises(phase, type);
    setSessionType(type); setExercises(exs); setCurrentEx(0);
    setCompleted([]); setTimer(exs[0].duration);
    setTimerRunning(false); setSessionDone(false); setScreen("workout");
  };

  const markDone = () => {
    setCompleted(c => [...c, currentEx]);
    setTimerRunning(false); clearTimeout(timerRef.current);
    if (currentEx + 1 < exercises.length) {
      const next = currentEx + 1; setCurrentEx(next); setTimer(exercises[next].duration);
    } else {
      const today = new Date().toDateString();
      const avgMet = exercises.reduce((s, e) => s + (e.met || 3.5), 0) / exercises.length;
      const mins = sessionType === "short" ? 35 : 60;
      const cals = Math.round(avgMet * 65 * (mins / 60));
      setHistory(h => [{ date: today, phase, sessionType, count: exercises.length, calories: cals, ts: Date.now() }, ...h.slice(0, 49)]);
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      if (lastWorkout === yesterday.toDateString() || lastWorkout === today) { if (lastWorkout !== today) setStreak(s => s + 1); } else setStreak(1);
      setLastWorkout(today); setSessionDone(true);
    }
  };

  const skipEx = () => {
    setTimerRunning(false); clearTimeout(timerRef.current);
    if (currentEx + 1 < exercises.length) { const next = currentEx + 1; setCurrentEx(next); setTimer(exercises[next].duration); }
  };

  const computeCalories = () => {
    let burned = 0;
    if (workoutDone) {
      const avgMet = workoutPhaseInput === 1 ? 2.8 : workoutPhaseInput === 2 ? 5.5 : 6.5;
      burned += avgMet * 65 * (workoutMins / 60);
    }
    ACTIVITY_OPTIONS.forEach(opt => {
      const val = Number(calorieInputs[opt.id] || 0);
      if (val > 0) {
        if (opt.id === "steps") burned += opt.met * 65 * (val * 1000 * 0.0008 / 60);
        else burned += opt.met * 65 * (val / 60);
      }
    });
    const bmr = Math.round(10 * 65 + 6.25 * 166 - 5 * 20 + 5);
    const tdee = Math.round(bmr * 1.375);
    setCalorieResult({ burned: Math.round(burned), bmr, tdee, eatTarget: tdee - Math.round(tdee * 0.15) });
  };

  const todayDone = lastWorkout === new Date().toDateString();
  const totalCals = history.reduce((s, h) => s + (h.calories || 0), 0);
  const phaseColor = [, "#00E5FF", "#00FF88", "#FF4D6D"][phase];

  // Tokens
  const C = { bg: "#080808", s1: "#111", s2: "#181818", border: "#1e1e1e", text: "#f0f0f0", muted: "#555", warn: "#FFB347" };
  const card = { background: C.s1, border: `1px solid ${C.border}`, borderRadius: 18, padding: "18px 20px", marginBottom: 12 };
  const pill = (c) => ({ display: "inline-flex", alignItems: "center", background: c + "18", color: c, border: `1px solid ${c}33`, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700, letterSpacing: 0.8 });
  const btn = (bg, fg = "#000") => ({ background: bg, color: fg, border: "none", borderRadius: 14, padding: "15px 20px", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%", letterSpacing: 0.2 });
  const ghost = (c) => ({ background: "transparent", color: c, border: `1.5px solid ${c}44`, borderRadius: 14, padding: "13px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%", letterSpacing: 0.2 });
  const input = { background: C.s2, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.text, fontSize: 14, width: "100%", boxSizing: "border-box" };

  // WORKOUT SCREEN
  if (screen === "workout") {
    if (sessionDone) {
      const lastCals = history[0]?.calories || 0;
      return (
        <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans','Segoe UI',sans-serif", maxWidth: 430, margin: "0 auto" }}>
          <div style={{ padding: "60px 20px 40px", textAlign: "center" }}>
            <div style={{ fontSize: 72, marginBottom: 10 }}>🏆</div>
            <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 4, background: `linear-gradient(135deg, ${phaseColor} 0%, #fff 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Session Complete!</h2>
            <p style={{ color: C.muted, marginBottom: 28, fontSize: 14 }}>{exercises.length} exercises done. You showed up — that's everything.</p>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
              <div style={{ ...card, flex: 1, textAlign: "center", marginBottom: 0, border: `1px solid ${C.warn}33` }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: C.warn }}>🔥 {streak}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>Day Streak</div>
              </div>
              <div style={{ ...card, flex: 1, textAlign: "center", marginBottom: 0, border: `1px solid ${phaseColor}33` }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: phaseColor }}>~{lastCals}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>kcal burned</div>
              </div>
            </div>
            <button style={btn(phaseColor)} onClick={() => setScreen("home")}>← Back to Home</button>
          </div>
        </div>
      );
    }

    const ex = exercises[currentEx];
    const progress = (currentEx / exercises.length) * 100;
    const timerPct = ex ? (timer / ex.duration) * 100 : 0;
    const R = 52, circ = 2 * Math.PI * R;

    return (
      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans','Segoe UI',sans-serif", maxWidth: 430, margin: "0 auto" }}>
        <div style={{ padding: "20px 20px 100px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <button onClick={() => setScreen("home")} style={{ background: C.s2, border: "none", color: C.muted, width: 38, height: 38, borderRadius: 10, cursor: "pointer", fontSize: 18 }}>←</button>
            <span style={{ fontSize: 12, color: C.muted, letterSpacing: 1 }}>{currentEx + 1} / {exercises.length}</span>
            <span style={pill(phaseColor)}>{PHASES[phase].name}</span>
          </div>

          <div style={{ background: C.s2, borderRadius: 8, height: 3, marginBottom: 20, overflow: "hidden" }}>
            <div style={{ background: phaseColor, height: 3, width: `${progress}%`, transition: "width 0.4s ease", borderRadius: 8 }} />
          </div>

          {/* Illustration card */}
          <div style={{ background: C.s1, border: `1px solid ${phaseColor}22`, borderRadius: 20, marginBottom: 16, overflow: "hidden" }}>
            <div style={{ background: `radial-gradient(ellipse at center, ${phaseColor}0a 0%, transparent 70%)`, padding: "8px 0 0" }}>
              <ExIll name={ex.name} color={phaseColor} />
            </div>
            <div style={{ textAlign: "center", paddingBottom: 10 }}>
              <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1.5 }}>MOVEMENT GUIDE</div>
            </div>
          </div>

          <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 6, letterSpacing: -0.3 }}>{ex.name}</h2>
          <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <span style={pill(phaseColor)}>{ex.target}</span>
            <span style={pill(C.muted)}>{ex.duration}s</span>
          </div>
          <p style={{ color: "#999", fontSize: 13, marginBottom: 20, lineHeight: 1.65 }}>{ex.desc}</p>

          {/* Timer ring */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
            <div style={{ position: "relative", width: 126, height: 126 }}>
              <svg width="126" height="126" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="63" cy="63" r={R} fill="none" stroke={C.s2} strokeWidth="6" />
                <circle cx="63" cy="63" r={R} fill="none" stroke={phaseColor} strokeWidth="6"
                  strokeDasharray={circ} strokeDashoffset={circ * (1 - timerPct / 100)}
                  strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.5s linear" }} />
              </svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: phaseColor, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>{formatTime(timer)}</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 2, letterSpacing: 0.5 }}>LEFT</div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
            <button style={ghost(phaseColor)} onClick={() => { setTimerRunning(r => !r); if (!timerRunning && timer === 0) setTimer(ex.duration); }}>
              {timerRunning ? "⏸  Pause" : timer === 0 ? "↺  Reset" : "▶  Start"}
            </button>
            <button style={ghost("#666")} onClick={skipEx}>Skip  →</button>
          </div>
          <button style={btn(phaseColor)} onClick={markDone}>✓  Done — Next</button>

          {currentEx + 1 < exercises.length && (
            <div style={{ marginTop: 16 }}>
              <div style={{ fontSize: 10, color: C.muted, marginBottom: 8, letterSpacing: 1.2 }}>UP NEXT</div>
              <div style={{ ...card, marginBottom: 0, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: phaseColor + "18", display: "flex", alignItems: "center", justifyContent: "center", color: phaseColor, fontSize: 18, flexShrink: 0, fontWeight: 700 }}>→</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{exercises[currentEx + 1].name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{exercises[currentEx + 1].duration}s · {exercises[currentEx + 1].target}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // SESSION SELECT
  if (screen === "session") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans','Segoe UI',sans-serif", maxWidth: 430, margin: "0 auto" }}>
        <div style={{ padding: "24px 20px 100px" }}>
          <button onClick={() => setScreen("home")} style={{ background: C.s2, border: "none", color: C.muted, width: 38, height: 38, borderRadius: 10, cursor: "pointer", fontSize: 18, marginBottom: 20 }}>←</button>
          <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 4 }}>Choose Session</h2>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 24 }}>How long do you want to train today?</p>

          {[
            { type: "short", title: "30 – 40 min", label: "SHORT SESSION", desc: "10 focused exercises · Daily consistency", emoji: "⚡", count: 10, color: "#00E5FF" },
            { type: "long", title: "1 Hour", label: "FULL SESSION", desc: "15 exercises · Push deeper today", emoji: "🔥", count: 15, color: "#00FF88" },
          ].map(opt => (
            <div key={opt.type} onClick={() => startSession(opt.type)}
              style={{ ...card, border: `1.5px solid ${opt.color}33`, cursor: "pointer", background: opt.color + "05", marginBottom: 14, transition: "all 0.2s" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 11, color: opt.color, fontWeight: 700, letterSpacing: 1.2, marginBottom: 6 }}>{opt.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 900 }}>{opt.title}</div>
                  <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>{opt.desc}</div>
                </div>
                <div style={{ fontSize: 36 }}>{opt.emoji}</div>
              </div>
              <div style={{ background: opt.color + "12", borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ fontSize: 12, color: opt.color }}>{PHASES[phase].label} exercises · {opt.count} exercises loaded</div>
              </div>
            </div>
          ))}

          <div style={{ ...card, background: "#111", border: "1px solid #1a1a1a" }}>
            <div style={{ fontSize: 11, color: "#444", marginBottom: 6, letterSpacing: 1 }}>⚠ WRIST NOTE</div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>All exercises use fist or forearm position only. Zero flat-palm pressure anywhere.</div>
          </div>
        </div>
        <Nav screen={screen} setScreen={setScreen} C={C} phaseColor={phaseColor} />
      </div>
    );
  }

  // CALORIE TRACKER
  if (screen === "calories") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans','Segoe UI',sans-serif", maxWidth: 430, margin: "0 auto" }}>
        <div style={{ padding: "26px 20px 100px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 4 }}>Calorie Tracker</h2>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>Tell me your day — I'll estimate your burn</p>

          <div style={card}>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1, marginBottom: 10 }}>DID YOU WORKOUT TODAY?</div>
            <div style={{ display: "flex", gap: 8, marginBottom: workoutDone ? 14 : 0 }}>
              <button onClick={() => setWorkoutDone(true)} style={{ ...btn(workoutDone ? "#00FF88" : C.s2, workoutDone ? "#000" : C.muted), flex: 1, padding: "11px 0", fontSize: 13 }}>Yes ✓</button>
              <button onClick={() => setWorkoutDone(false)} style={{ ...btn(!workoutDone ? "#FF4D6D" : C.s2, !workoutDone ? "#fff" : C.muted), flex: 1, padding: "11px 0", fontSize: 13 }}>No</button>
            </div>
            {workoutDone && (
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>DURATION (mins)</div>
                  <input type="number" value={workoutMins} min="5" max="120" onChange={e => setWorkoutMins(Number(e.target.value))} style={input} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>PHASE</div>
                  <select value={workoutPhaseInput} onChange={e => setWorkoutPhaseInput(Number(e.target.value))} style={{ ...input }}>
                    <option value={1}>Phase 1 — Stretch</option>
                    <option value={2}>Phase 2 — Core/Cardio</option>
                    <option value={3}>Phase 3 — Strength</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div style={card}>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1, marginBottom: 14 }}>OTHER ACTIVITIES TODAY</div>
            {ACTIVITY_OPTIONS.map(opt => (
              <div key={opt.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 13 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{opt.label}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{opt.unit}</div>
                </div>
                <input type="number" min="0" placeholder="0"
                  value={calorieInputs[opt.id] || ""}
                  onChange={e => setCalorieInputs(p => ({ ...p, [opt.id]: e.target.value }))}
                  style={{ ...input, width: 74, textAlign: "center", padding: "9px 10px" }} />
              </div>
            ))}
          </div>

          <button style={btn(phaseColor)} onClick={computeCalories}>Calculate →</button>

          {calorieResult && (
            <div style={{ ...card, border: `1px solid ${phaseColor}33`, marginTop: 4 }}>
              <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1, marginBottom: 14 }}>TODAY'S ESTIMATE</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                <div style={{ background: C.s2, borderRadius: 12, padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: phaseColor }}>~{calorieResult.burned}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>kcal burned</div>
                </div>
                <div style={{ background: C.s2, borderRadius: 12, padding: "14px", textAlign: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: C.warn }}>~{calorieResult.tdee}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>daily need</div>
                </div>
              </div>
              <div style={{ background: C.s2, borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 8, letterSpacing: 0.8 }}>YOUR GUIDE</div>
                <div style={{ fontSize: 13, lineHeight: 1.9, color: "#ccc" }}>
                  🔥 Burned approx <span style={{ color: phaseColor, fontWeight: 700 }}>{calorieResult.burned} kcal</span> today<br />
                  📊 Body needs ~<span style={{ color: C.warn, fontWeight: 700 }}>{calorieResult.tdee} kcal/day</span> to maintain weight<br />
                  🎯 For gradual fat loss, eat around <span style={{ color: "#00FF88", fontWeight: 700 }}>{calorieResult.eatTarget} kcal/day</span><br />
                  💡 Your base metabolic rate is ~<span style={{ fontWeight: 600 }}>{calorieResult.bmr} kcal</span>
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#333", marginTop: 10, lineHeight: 1.6 }}>* Estimates vary with body composition and effort. Use as a guide, not exact numbers.</div>
            </div>
          )}
        </div>
        <Nav screen={screen} setScreen={setScreen} C={C} phaseColor={phaseColor} />
      </div>
    );
  }

  // HISTORY
  if (screen === "history") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans','Segoe UI',sans-serif", maxWidth: 430, margin: "0 auto" }}>
        <div style={{ padding: "26px 20px 100px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 4 }}>History</h2>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 18 }}>Every session you've put in</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 18 }}>
            {[{ val: `🔥 ${streak}`, label: "Streak", c: C.warn }, { val: history.length, label: "Sessions", c: "#00FF88" }, { val: totalCals, label: "Total kcal", c: phaseColor }].map((x, i) => (
              <div key={i} style={{ ...card, marginBottom: 0, textAlign: "center", border: `1px solid ${x.c}22` }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: x.c }}>{x.val}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{x.label}</div>
              </div>
            ))}
          </div>
          {history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px 0", color: C.muted }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>📋</div>
              <div>No sessions yet. Start your first workout!</div>
            </div>
          ) : history.map((h, i) => (
            <div key={i} style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{h.date}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{h.sessionType === "short" ? "30–40 min" : "1 hr"} · {h.count} exercises{h.calories ? ` · ~${h.calories} kcal` : ""}</div>
              </div>
              <span style={pill([, "#00E5FF", "#00FF88", "#FF4D6D"][h.phase])}>P{h.phase}</span>
            </div>
          ))}
        </div>
        <Nav screen={screen} setScreen={setScreen} C={C} phaseColor={phaseColor} />
      </div>
    );
  }

  // SETTINGS
  if (screen === "settings") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans','Segoe UI',sans-serif", maxWidth: 430, margin: "0 auto" }}>
        <div style={{ padding: "26px 20px 100px" }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 4 }}>Settings</h2>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 20 }}>Switch phases when your body is ready — you decide</p>
          {Object.entries(PHASES).map(([key, p]) => {
            const col = [, "#00E5FF", "#00FF88", "#FF4D6D"][parseInt(key)];
            const active = parseInt(key) === phase;
            return (
              <div key={key} onClick={() => setPhase(parseInt(key))}
                style={{ ...card, border: `1.5px solid ${active ? col : C.border}`, cursor: "pointer", background: active ? col + "08" : C.s1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span style={pill(col)}>{p.months}</span>
                    <div style={{ fontWeight: 800, fontSize: 16, marginTop: 8, marginBottom: 3 }}>{p.name} — {p.label}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>{p.desc}</div>
                  </div>
                  {active && <div style={{ color: col, fontSize: 22, marginLeft: 10 }}>✓</div>}
                </div>
              </div>
            );
          })}
          <p style={{ fontSize: 12, color: "#2a2a2a", lineHeight: 1.7, marginTop: 12, padding: "0 4px" }}>No timers. No pressure. Switch when you feel ready — that's the right way.</p>
          <button style={{ ...ghost("#FF4D6D"), marginTop: 28 }} onClick={() => { if (window.confirm("Reset all history and streak?")) { setHistory([]); setStreak(0); setLastWorkout(null); } }}>
            Reset All Data
          </button>
        </div>
        <Nav screen={screen} setScreen={setScreen} C={C} phaseColor={phaseColor} />
      </div>
    );
  }

  // HOME
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'DM Sans','Segoe UI',sans-serif", maxWidth: 430, margin: "0 auto" }}>
      <div style={{ padding: "28px 20px 100px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: 1.5, marginBottom: 4 }}>
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }).toUpperCase()}
            </div>
            <h1 style={{ fontSize: 27, fontWeight: 900, lineHeight: 1.15, margin: 0 }}>
              {greeting},<br />
              <span style={{ color: phaseColor }}>Nikhil 💪</span>
            </h1>
          </div>
          <div style={{ background: C.s1, border: `1px solid ${C.warn}22`, borderRadius: 14, padding: "10px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: C.warn }}>🔥{streak}</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>streak</div>
          </div>
        </div>

        {/* Quote */}
        <div style={{ ...card, border: `1px solid ${phaseColor}18`, background: phaseColor + "06" }}>
          <div style={{ fontSize: 10, color: phaseColor, letterSpacing: 1.5, marginBottom: 6, fontWeight: 700 }}>TODAY'S MOTIVATION</div>
          <p style={{ fontSize: 13, color: "#bbb", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>"{QUOTES[new Date().getDate() % QUOTES.length]}"</p>
        </div>

        {/* Phase */}
        <div style={{ ...card, border: `1px solid ${phaseColor}28`, background: phaseColor + "05" }}>
          <span style={pill(phaseColor)}>{PHASES[phase].name} · {PHASES[phase].months}</span>
          <div style={{ fontSize: 17, fontWeight: 800, marginTop: 8, marginBottom: 3 }}>{PHASES[phase].label}</div>
          <div style={{ fontSize: 12, color: C.muted }}>{PHASES[phase].desc}</div>
        </div>

        {/* CTA */}
        {todayDone ? (
          <div style={{ ...card, textAlign: "center", border: `1px solid #00FF8833`, background: "#00FF8806" }}>
            <div style={{ fontSize: 36, marginBottom: 6 }}>✅</div>
            <div style={{ fontWeight: 800, fontSize: 17, color: "#00FF88", marginBottom: 4 }}>You trained today!</div>
            <div style={{ fontSize: 13, color: C.muted, marginBottom: 14 }}>Rest up, or go again if the body says yes.</div>
            <button style={ghost("#00FF88")} onClick={() => setScreen("session")}>Train Again</button>
          </div>
        ) : (
          <button style={{ ...btn(phaseColor), fontSize: 16, padding: "17px 20px", borderRadius: 16 }} onClick={() => setScreen("session")}>
            Start Today's Session  →
          </button>
        )}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[{ val: history.length, label: "Sessions", c: "#00FF88" }, { val: `P${phase}`, label: "Phase", c: phaseColor }, { val: totalCals, label: "kcal total", c: C.warn }].map((x, i) => (
            <div key={i} style={{ ...card, marginBottom: 0, textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: x.c }}>{x.val}</div>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>{x.label}</div>
            </div>
          ))}
        </div>

        {/* Last session */}
        {history.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: C.muted, marginBottom: 8, letterSpacing: 1.2 }}>LAST SESSION</div>
            <div style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 3 }}>{history[0].date}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{history[0].sessionType === "short" ? "30–40 min" : "1 hr"} · {history[0].count} exercises{history[0].calories ? ` · ~${history[0].calories} kcal` : ""}</div>
              </div>
              <span style={pill([, "#00E5FF", "#00FF88", "#FF4D6D"][history[0].phase])}>P{history[0].phase}</span>
            </div>
          </div>
        )}
      </div>
      <Nav screen={screen} setScreen={setScreen} C={C} phaseColor={phaseColor} />
    </div>
  );
}

function Nav({ screen, setScreen, C, phaseColor }) {
  const items = [
    { key: "home", icon: "⊞", label: "Home" },
    { key: "session", icon: "▶", label: "Train" },
    { key: "calories", icon: "◎", label: "Calories" },
    { key: "history", icon: "≡", label: "History" },
    { key: "settings", icon: "⚙", label: "Settings" },
  ];
  return (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "#090909", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-around", padding: "10px 0 16px", zIndex: 100 }}>
      {items.map(item => (
        <div key={item.key} onClick={() => setScreen(item.key)}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", color: screen === item.key ? phaseColor : "#3a3a3a" }}>
          <span style={{ fontSize: 18, fontWeight: 900 }}>{item.icon}</span>
          <span style={{ fontSize: 10, fontWeight: screen === item.key ? 700 : 400 }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

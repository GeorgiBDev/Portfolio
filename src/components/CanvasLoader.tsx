import { Html, useProgress } from "@react-three/drei";
import { useMemo } from "react";

const HINTS = [
  "Aligning platforms…",
  "Raising pillars…",
  "Chiseling edges…",
  "Catching stardust…",
  "Calibrating echoes…",
  "Unfolding the path…",
];

export function CanvasLoader() {
  const { progress, active } = useProgress(); // 0..100
  const hint = useMemo(
    () =>
      HINTS[
        Math.min(HINTS.length - 1, Math.floor(progress / (100 / HINTS.length)))
      ],
    [progress]
  );

  const steps = Math.max(0, Math.min(6, Math.round((progress / 100) * 6)));

  return (
    <Html style={{ width: "100%", height: "100%" }}>
      <div className="fixed inset-0 flex items-center justify-center select-none">
        <div className="relative">
          <div className="absolute -inset-8 rounded-2xl bg-gradient-to-b from-[#120a1f]/80 via-[#1b1232]/70 to-[#120a1f]/80 backdrop-blur-md shadow-2xl" />

          <div className="relative z-10 flex flex-col items-center gap-4 p-6 min-w-[280px]">
            <div className="relative">
              <div
                className="absolute inset-0 -z-10 blur-2xl opacity-70"
                style={{
                  background:
                    "radial-gradient(60% 60% at 50% 50%, rgba(199,125,255,.35), rgba(125,211,252,.2) 40%, rgba(134,239,172,.15) 70%, transparent 80%)",
                }}
              />
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-3 w-28 rounded-full bg-black/30 blur-md" />

              <div className="isometric-stack animate-float-slow">
                <div className="iso-level iso-1" />
                <div className="iso-level iso-2" />
                <div className="iso-level iso-3" />
                <div className="iso-diamond animate-slow-spin" />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className={[
                    "inline-block h-3 w-3 rotate-45 rounded-[2px] transition-all",
                    i < steps
                      ? "bg-[#C77DFF] shadow-[0_0_8px_rgba(199,125,255,0.8)]"
                      : "bg-white/15",
                  ].join(" ")}
                />
              ))}
            </div>

            <div className="text-center">
              <div className="text-white/90 font-medium tracking-wide">
                Loading… {Math.floor(progress)}%
              </div>
              <div className="text-white/60 text-sm mt-1">{hint}</div>
            </div>

            {!active && (
              <div className="text-xs text-emerald-200/80">Ready.</div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .isometric-stack { position: relative; width: 120px; height: 120px; transform: rotateX(55deg) rotateZ(45deg); transform-style: preserve-3d; }
        .iso-level { position: absolute; left: 50%; top: 50%; width: 110px; height: 110px; transform: translate(-50%, -50%); border-radius: 12px; }
        .iso-1 { background: linear-gradient(180deg, #2a1b42, #1a0f2e); box-shadow: 0 10px 0 #0c0616, inset 0 1px 0 rgba(255,255,255,.05); transform: translate(-50%, -50%) translateZ(-16px); }
        .iso-2 { background: linear-gradient(180deg, #3b255f, #25173d); box-shadow: 0 10px 0 #120a1f, inset 0 1px 0 rgba(255,255,255,.06); transform: translate(-50%, -50%) translateZ(0px) scale(0.82); }
        .iso-3 { background: linear-gradient(180deg, #5a3492, #3a2470); box-shadow: 0 10px 0 #1e1440, inset 0 1px 0 rgba(255,255,255,.08); transform: translate(-50%, -50%) translateZ(16px) scale(0.62); }
        .iso-diamond {
          position: absolute; left: 50%; top: 50%; width: 26px; height: 26px;
          transform: translate(-50%, -50%) translateZ(36px) rotateZ(45deg);
          background: conic-gradient(from 0deg, #C77DFF, #7DD3FC, #86EFAC, #C77DFF);
          box-shadow: 0 0 12px rgba(199,125,255,.8), inset 0 0 12px rgba(255,255,255,.35);
          border-radius: 4px;
        }
        @keyframes float-slow { 0% { transform: translateY(0) rotateX(55deg) rotateZ(45deg); } 50% { transform: translateY(-6px) rotateX(55deg) rotateZ(45deg); } 100% { transform: translateY(0) rotateX(55deg) rotateZ(45deg); } }
        .animate-float-slow { animation: float-slow 3.6s ease-in-out infinite; }
        @keyframes slow-spin { from { transform: translate(-50%, -50%) translateZ(36px) rotateZ(45deg); } to { transform: translate(-50%, -50%) translateZ(36px) rotateZ(405deg); } }
        .animate-slow-spin { animation: slow-spin 8s linear infinite; }
      `}</style>
    </Html>
  );
}

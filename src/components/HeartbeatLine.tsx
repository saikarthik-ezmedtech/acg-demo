interface HeartbeatLineProps {
  color?: string
  className?: string
}

export default function HeartbeatLine({
  color = 'rgba(255,255,255,0.22)',
  className = '',
}: HeartbeatLineProps) {
  // 3 PQRST cycles across a 1440px viewBox at y=45 baseline (viewBox height 80)
  // P wave: gentle bezier bump
  // QRS: sharp spike up then down
  // T wave: smooth bezier bump
  // Long flat baselines between beats
  const path = [
    'M 0,45',
    'L 95,45',
    // Beat 1 — P wave
    'C 106,45 114,32 124,32 C 134,32 142,45 152,45',
    'L 165,45',
    // Beat 1 — QRS complex
    'L 168,42 L 172,8 L 176,74 L 180,43 L 184,45',
    'L 196,45',
    // Beat 1 — T wave
    'C 208,45 216,28 226,28 C 236,28 244,45 256,45',
    'L 480,45',
    // Beat 2 — P wave
    'C 491,45 499,32 509,32 C 519,32 527,45 537,45',
    'L 550,45',
    // Beat 2 — QRS complex
    'L 553,42 L 557,8 L 561,74 L 565,43 L 569,45',
    'L 581,45',
    // Beat 2 — T wave
    'C 593,45 601,28 611,28 C 621,28 629,45 641,45',
    'L 960,45',
    // Beat 3 — P wave
    'C 971,45 979,32 989,32 C 999,32 1007,45 1017,45',
    'L 1030,45',
    // Beat 3 — QRS complex
    'L 1033,42 L 1037,8 L 1041,74 L 1045,43 L 1049,45',
    'L 1061,45',
    // Beat 3 — T wave
    'C 1073,45 1081,28 1091,28 C 1101,28 1109,45 1121,45',
    'L 1440,45',
  ].join(' ')

  return (
    <div className={`heartbeat-wrap ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={path}
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="heartbeat-path"
        />
      </svg>
    </div>
  )
}

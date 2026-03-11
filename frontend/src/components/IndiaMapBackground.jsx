import React, { useEffect, useState } from 'react'

const STATES = [
  { id: 'jk',  name: 'Jammu & Kashmir',   d: 'M155,18 L175,12 L205,15 L225,22 L235,35 L228,52 L215,58 L200,62 L182,55 L165,48 L155,35 Z',              dot: [195,38]  },
  { id: 'ldk', name: 'Ladakh',            d: 'M228,18 L260,12 L285,18 L295,30 L288,50 L270,58 L250,55 L235,45 L228,35 Z',                                dot: [258,33]  },
  { id: 'hp',  name: 'Himachal Pradesh',  d: 'M182,62 L200,58 L215,62 L220,75 L210,85 L195,88 L182,80 Z',                                                dot: [200,73]  },
  { id: 'pb',  name: 'Punjab',            d: 'M155,65 L175,62 L182,68 L182,80 L172,88 L158,85 L150,75 Z',                                                dot: [165,75]  },
  { id: 'uk',  name: 'Uttarakhand',       d: 'M215,72 L235,68 L248,75 L245,90 L228,95 L215,88 L210,80 Z',                                                dot: [228,82]  },
  { id: 'hr',  name: 'Haryana',           d: 'M158,88 L175,85 L185,90 L188,105 L175,110 L160,108 L152,98 Z',                                             dot: [170,98]  },
  { id: 'dl',  name: 'Delhi',             d: 'M178,100 L188,98 L192,108 L182,112 L175,107 Z',                                                             dot: [184,106] },
  { id: 'up',  name: 'Uttar Pradesh',     d: 'M188,95 L248,88 L268,100 L272,118 L255,135 L220,140 L188,132 L185,115 Z',                                   dot: [228,115] },
  { id: 'rj',  name: 'Rajasthan',         d: 'M118,92 L152,88 L158,108 L165,130 L158,158 L138,168 L108,162 L95,142 L100,115 Z',                           dot: [132,130] },
  { id: 'br',  name: 'Bihar',             d: 'M272,110 L305,108 L318,120 L312,138 L290,145 L268,140 L268,120 Z',                                          dot: [290,125] },
  { id: 'sk',  name: 'Sikkim',            d: 'M318,105 L328,102 L332,112 L322,118 L316,112 Z',                                                            dot: [324,110] },
  { id: 'ar',  name: 'Arunachal Pradesh', d: 'M340,88 L395,82 L405,95 L395,110 L355,115 L338,105 Z',                                                      dot: [372,98]  },
  { id: 'as',  name: 'Assam',             d: 'M332,112 L362,108 L375,118 L368,132 L342,135 L328,125 Z',                                                   dot: [350,122] },
  { id: 'ng',  name: 'Nagaland',          d: 'M375,118 L392,115 L398,128 L385,138 L372,132 Z',                                                            dot: [384,126] },
  { id: 'mn',  name: 'Manipur',           d: 'M382,138 L395,135 L400,150 L388,158 L378,150 Z',                                                            dot: [388,146] },
  { id: 'mz',  name: 'Mizoram',           d: 'M368,155 L380,152 L382,168 L370,172 L362,162 Z',                                                            dot: [372,162] },
  { id: 'tr',  name: 'Tripura',           d: 'M352,148 L364,145 L368,158 L356,162 L348,155 Z',                                                            dot: [358,153] },
  { id: 'ml',  name: 'Meghalaya',         d: 'M328,132 L355,130 L358,145 L338,148 L325,142 Z',                                                            dot: [340,139] },
  { id: 'wb',  name: 'West Bengal',       d: 'M308,138 L325,135 L332,150 L328,178 L315,188 L305,175 L302,155 Z',                                          dot: [315,160] },
  { id: 'jh',  name: 'Jharkhand',         d: 'M272,142 L305,140 L312,155 L305,175 L282,178 L268,162 Z',                                                   dot: [288,158] },
  { id: 'or',  name: 'Odisha',            d: 'M268,175 L305,172 L315,192 L305,218 L282,225 L262,210 L260,190 Z',                                          dot: [285,198] },
  { id: 'cg',  name: 'Chhattisgarh',      d: 'M225,148 L268,145 L275,168 L268,198 L245,205 L222,192 L218,168 Z',                                          dot: [245,175] },
  { id: 'mp',  name: 'Madhya Pradesh',    d: 'M158,152 L225,148 L235,162 L228,192 L205,202 L168,198 L150,178 L152,158 Z',                                 dot: [192,172] },
  { id: 'gj',  name: 'Gujarat',           d: 'M82,148 L118,145 L128,162 L122,188 L100,205 L75,198 L65,178 L72,158 Z',                                     dot: [95,175]  },
  { id: 'mh',  name: 'Maharashtra',       d: 'M108,198 L205,195 L215,218 L205,248 L172,262 L135,255 L108,238 L100,215 Z',                                 dot: [158,225] },
  { id: 'tg',  name: 'Telangana',         d: 'M215,215 L255,212 L265,232 L258,255 L232,262 L212,248 Z',                                                   dot: [238,238] },
  { id: 'ap',  name: 'Andhra Pradesh',    d: 'M205,252 L262,248 L275,272 L262,302 L238,312 L208,305 L195,282 Z',                                          dot: [235,278] },
  { id: 'ka',  name: 'Karnataka',         d: 'M138,258 L205,255 L215,278 L205,308 L178,322 L148,318 L128,295 L130,270 Z',                                 dot: [172,288] },
  { id: 'ga',  name: 'Goa',               d: 'M128,295 L142,292 L145,305 L132,308 Z',                                                                     dot: [136,300] },
  { id: 'kl',  name: 'Kerala',            d: 'M155,320 L175,318 L180,345 L172,378 L158,385 L145,368 L142,342 Z',                                          dot: [162,350] },
  { id: 'tn',  name: 'Tamil Nadu',        d: 'M178,318 L215,312 L228,335 L222,368 L200,388 L178,378 L172,352 Z',                                          dot: [198,348] },
]

const HIGH_CRIME    = ['Uttar Pradesh','Bihar','Madhya Pradesh','Maharashtra','Rajasthan','West Bengal','Delhi']
const MEDIUM_CRIME  = ['Telangana','Andhra Pradesh','Karnataka','Gujarat','Jharkhand','Assam']

export default function IndiaMapBackground({ comparisonData = [] }) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 50)
    return () => clearInterval(id)
  }, [])

  const t = tick * 0.04

  const getLevel = (name) => {
    if (comparisonData.length) {
      const found = comparisonData.find(d => d.state === name)
      if (found) {
        const max = Math.max(...comparisonData.map(d => d.totalCrimes || 0))
        const ratio = (found.totalCrimes || 0) / max
        if (ratio > 0.6) return 'critical'
        if (ratio > 0.25) return 'high'
        return 'low'
      }
    }
    if (HIGH_CRIME.includes(name))   return 'critical'
    if (MEDIUM_CRIME.includes(name)) return 'high'
    return 'low'
  }

  const colors = {
    critical: { fill: 'rgba(239,68,68,',   dot: '239,68,68',   stroke: 'rgba(239,68,68,0.35)'  },
    high:     { fill: 'rgba(249,115,22,',  dot: '249,115,22',  stroke: 'rgba(249,115,22,0.28)' },
    low:      { fill: 'rgba(80,100,130,',  dot: '100,180,220', stroke: 'rgba(100,150,200,0.15)'},
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none',
      zIndex: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <svg
        viewBox="55 10 360 390"
        style={{ width: '52vh', height: '62vh', maxWidth: 500, maxHeight: 600, opacity: 0.55 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {STATES.map((s, i) => {
            const level = getLevel(s.name)
            const c = colors[level]
            const p = (Math.sin(t * (0.7 + i * 0.04) + i) + 1) / 2
            return (
              <radialGradient key={s.id} id={`rg-${s.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor={`rgb(${c.dot})`} stopOpacity={0.55 * p} />
                <stop offset="100%" stopColor={`rgb(${c.dot})`} stopOpacity={0}        />
              </radialGradient>
            )
          })}
        </defs>

        {/* State fills */}
        {STATES.map((s, i) => {
          const level = getLevel(s.name)
          const c = colors[level]
          const p = (Math.sin(t * (0.7 + i * 0.04) + i) + 1) / 2
          const baseAlpha = level === 'critical' ? 0.14 : level === 'high' ? 0.10 : 0.05
          return (
            <path
              key={s.id}
              d={s.d}
              fill={`${c.fill}${(baseAlpha + 0.06 * p).toFixed(3)})`}
              stroke={c.stroke}
              strokeWidth={level === 'low' ? '0.6' : '0.9'}
            />
          )
        })}

        {/* Blinking dots */}
        {STATES.map((s, i) => {
          const level = getLevel(s.name)
          const c = colors[level]
          const p = (Math.sin(t * (0.9 + i * 0.05) + i * 0.8) + 1) / 2
          const coreR = level === 'critical' ? 3.8 : level === 'high' ? 3.0 : 2.2
          const ringR = coreR + 2 + p * (level === 'critical' ? 9 : 5)
          const [cx, cy] = s.dot
          return (
            <g key={`d-${s.id}`}>
              <circle cx={cx} cy={cy} r={ringR}        fill={`url(#rg-${s.id})`} />
              <circle cx={cx} cy={cy} r={coreR}        fill={`rgba(${c.dot},${0.65 + 0.35 * p})`} />
              <circle cx={cx} cy={cy} r={coreR * 0.38} fill={`rgba(255,255,255,${0.75 + 0.25 * p})`} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
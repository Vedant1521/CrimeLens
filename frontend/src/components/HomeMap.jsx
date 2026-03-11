import React, { useEffect, useState } from 'react'

const STATES = [
  { id:'jk',  name:'Jammu & Kashmir',   d:'M155,18 L175,12 L205,15 L225,22 L235,35 L228,52 L215,58 L200,62 L182,55 L165,48 L155,35 Z',             dot:[195,38],  label:[190,40]  },
  { id:'ldk', name:'Ladakh',            d:'M228,18 L260,12 L285,18 L295,30 L288,50 L270,58 L250,55 L235,45 L228,35 Z',                               dot:[258,33],  label:[258,33]  },
  { id:'hp',  name:'Himachal Pradesh',  d:'M182,62 L200,58 L215,62 L220,75 L210,85 L195,88 L182,80 Z',                                               dot:[200,73],  label:[200,74]  },
  { id:'pb',  name:'Punjab',            d:'M155,65 L175,62 L182,68 L182,80 L172,88 L158,85 L150,75 Z',                                               dot:[165,75],  label:[163,76]  },
  { id:'uk',  name:'Uttarakhand',       d:'M215,72 L235,68 L248,75 L245,90 L228,95 L215,88 L210,80 Z',                                               dot:[228,82],  label:[228,83]  },
  { id:'hr',  name:'Haryana',           d:'M158,88 L175,85 L185,90 L188,105 L175,110 L160,108 L152,98 Z',                                            dot:[170,98],  label:[168,99]  },
  { id:'dl',  name:'Delhi',             d:'M178,100 L188,98 L192,108 L182,112 L175,107 Z',                                                            dot:[184,106], label:[184,107] },
  { id:'up',  name:'Uttar Pradesh',     d:'M188,95 L248,88 L268,100 L272,118 L255,135 L220,140 L188,132 L185,115 Z',                                  dot:[228,115], label:[225,116] },
  { id:'rj',  name:'Rajasthan',         d:'M118,92 L152,88 L158,108 L165,130 L158,158 L138,168 L108,162 L95,142 L100,115 Z',                          dot:[132,130], label:[128,131] },
  { id:'br',  name:'Bihar',             d:'M272,110 L305,108 L318,120 L312,138 L290,145 L268,140 L268,120 Z',                                         dot:[290,125], label:[288,126] },
  { id:'sk',  name:'Sikkim',            d:'M318,105 L328,102 L332,112 L322,118 L316,112 Z',                                                           dot:[324,110], label:[324,111] },
  { id:'ar',  name:'Arunachal Pradesh', d:'M340,88 L395,82 L405,95 L395,110 L355,115 L338,105 Z',                                                     dot:[372,98],  label:[368,99]  },
  { id:'as',  name:'Assam',             d:'M332,112 L362,108 L375,118 L368,132 L342,135 L328,125 Z',                                                  dot:[350,122], label:[348,123] },
  { id:'ng',  name:'Nagaland',          d:'M375,118 L392,115 L398,128 L385,138 L372,132 Z',                                                           dot:[384,126], label:[382,127] },
  { id:'mn',  name:'Manipur',           d:'M382,138 L395,135 L400,150 L388,158 L378,150 Z',                                                           dot:[388,146], label:[386,147] },
  { id:'mz',  name:'Mizoram',           d:'M368,155 L380,152 L382,168 L370,172 L362,162 Z',                                                           dot:[372,162], label:[370,163] },
  { id:'tr',  name:'Tripura',           d:'M352,148 L364,145 L368,158 L356,162 L348,155 Z',                                                           dot:[358,153], label:[356,154] },
  { id:'ml',  name:'Meghalaya',         d:'M328,132 L355,130 L358,145 L338,148 L325,142 Z',                                                           dot:[340,139], label:[338,140] },
  { id:'wb',  name:'West Bengal',       d:'M308,138 L325,135 L332,150 L328,178 L315,188 L305,175 L302,155 Z',                                         dot:[315,160], label:[313,161] },
  { id:'jh',  name:'Jharkhand',         d:'M272,142 L305,140 L312,155 L305,175 L282,178 L268,162 Z',                                                  dot:[288,158], label:[286,159] },
  { id:'or',  name:'Odisha',            d:'M268,175 L305,172 L315,192 L305,218 L282,225 L262,210 L260,190 Z',                                         dot:[285,198], label:[282,199] },
  { id:'cg',  name:'Chhattisgarh',      d:'M225,148 L268,145 L275,168 L268,198 L245,205 L222,192 L218,168 Z',                                         dot:[245,175], label:[242,176] },
  { id:'mp',  name:'Madhya Pradesh',    d:'M158,152 L225,148 L235,162 L228,192 L205,202 L168,198 L150,178 L152,158 Z',                                dot:[192,172], label:[188,173] },
  { id:'gj',  name:'Gujarat',           d:'M82,148 L118,145 L128,162 L122,188 L100,205 L75,198 L65,178 L72,158 Z',                                    dot:[95,175],  label:[92,176]  },
  { id:'mh',  name:'Maharashtra',       d:'M108,198 L205,195 L215,218 L205,248 L172,262 L135,255 L108,238 L100,215 Z',                                dot:[158,225], label:[154,226] },
  { id:'tg',  name:'Telangana',         d:'M215,215 L255,212 L265,232 L258,255 L232,262 L212,248 Z',                                                  dot:[238,238], label:[235,239] },
  { id:'ap',  name:'Andhra Pradesh',    d:'M205,252 L262,248 L275,272 L262,302 L238,312 L208,305 L195,282 Z',                                         dot:[235,278], label:[230,279] },
  { id:'ka',  name:'Karnataka',         d:'M138,258 L205,255 L215,278 L205,308 L178,322 L148,318 L128,295 L130,270 Z',                                dot:[172,288], label:[168,289] },
  { id:'ga',  name:'Goa',               d:'M128,295 L142,292 L145,305 L132,308 Z',                                                                    dot:[136,300], label:[136,301] },
  { id:'kl',  name:'Kerala',            d:'M155,320 L175,318 L180,345 L172,378 L158,385 L145,368 L142,342 Z',                                         dot:[162,350], label:[160,351] },
  { id:'tn',  name:'Tamil Nadu',        d:'M178,318 L215,312 L228,335 L222,368 L200,388 L178,378 L172,352 Z',                                         dot:[198,348], label:[194,349] },
]

const RISK_LEVELS = {
  critical: { label:'High Risk',   fill:'rgba(220,38,38,0.22)',  stroke:'rgba(220,38,38,0.7)',  dot:'220,38,38',  text:'#dc2626', badge:'#dc2626' },
  high:     { label:'Concerning',  fill:'rgba(234,88,12,0.18)',  stroke:'rgba(234,88,12,0.65)', dot:'234,88,12',  text:'#ea580c', badge:'#ea580c' },
  moderate: { label:'Moderate',    fill:'rgba(6,182,212,0.15)',  stroke:'rgba(6,182,212,0.55)', dot:'6,182,212',  text:'#0891b2', badge:'#0891b2' },
  safe:     { label:'Safe',        fill:'rgba(22,163,74,0.15)',  stroke:'rgba(22,163,74,0.5)',  dot:'22,163,74',  text:'#16a34a', badge:'#16a34a' },
}

const DEFAULT_LEVELS = {
  'Uttar Pradesh':'critical', 'Bihar':'critical', 'Madhya Pradesh':'critical',
  'Maharashtra':'critical',   'Rajasthan':'high',  'West Bengal':'high',
  'Delhi':'high',             'Telangana':'high',  'Andhra Pradesh':'high',
  'Haryana':'high',           'Gujarat':'moderate','Karnataka':'moderate',
  'Odisha':'moderate',        'Jharkhand':'moderate','Chhattisgarh':'moderate',
  'Assam':'moderate',         'Tamil Nadu':'moderate',
}

const DEFAULT_CRIMES = {
  'Uttar Pradesh':159063, 'Bihar':79757, 'Maharashtra':70823, 'Madhya Pradesh':54187,
  'West Bengal':46028,    'Rajasthan':45877, 'Karnataka':38420, 'Gujarat':35210,
  'Delhi':32890,          'Andhra Pradesh':28450, 'Telangana':26780, 'Haryana':24560,
  'Tamil Nadu':22340,     'Odisha':18920, 'Jharkhand':15670, 'Chhattisgarh':14230,
  'Assam':13450,          'Punjab':12890, 'Uttarakhand':8920, 'Kerala':8340,
  'Himachal Pradesh':4230,'Jammu & Kashmir':3890,'Meghalaya':2340,'Tripura':2120,
  'Nagaland':1230,        'Manipur':1180, 'Arunachal Pradesh':980,'Mizoram':870,
  'Sikkim':420,           'Goa':980,      'Ladakh':320,
}

function getRiskLevel(name, comparisonData) {
  if (comparisonData && comparisonData.length) {
    const found = comparisonData.find(d => d.state === name)
    if (found) {
      const max = Math.max(...comparisonData.map(d => d.totalCrimes || 0))
      const ratio = (found.totalCrimes || 0) / max
      if (ratio > 0.55) return 'critical'
      if (ratio > 0.28) return 'high'
      if (ratio > 0.10) return 'moderate'
      return 'safe'
    }
  }
  return DEFAULT_LEVELS[name] || 'safe'
}

function getCrimeCount(name, comparisonData) {
  if (comparisonData && comparisonData.length) {
    const found = comparisonData.find(d => d.state === name)
    if (found) return (found.totalCrimes || 0).toLocaleString()
  }
  return (DEFAULT_CRIMES[name] || 0).toLocaleString()
}

export default function HomeMap({ comparisonData = [] }) {
  const [tick,     setTick]     = useState(0)
  const [hovered,  setHovered]  = useState(null)
  const [tooltip,  setTooltip]  = useState({ x:0, y:0 })

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60)
    return () => clearInterval(id)
  }, [])

  const t = tick * 0.04

  const legend = [
    { level:'safe',     label:'Safe',      color:'#16a34a' },
    { level:'moderate', label:'Moderate',  color:'#0891b2' },
    { level:'high',     label:'Concerning',color:'#ea580c' },
    { level:'critical', label:'High Risk', color:'#dc2626' },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
        <div>
          <h2 style={{ fontFamily:'var(--font-display)', fontSize:32, letterSpacing:3, color:'var(--text-primary)' }}>INDIA CRIME MAP</h2>
          <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:11, marginTop:4 }}>Hover over a state to see details · Crime risk by state</p>
        </div>
        {/* Legend */}
        <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
          {legend.map(l => (
            <div key={l.level} style={{ display:'flex', alignItems:'center', gap:6 }}>
              <div style={{ width:12, height:12, borderRadius:'50%', background:l.color, boxShadow:`0 0 6px ${l.color}` }} />
              <span style={{ color:'var(--text-secondary)', fontFamily:'var(--font-mono)', fontSize:11 }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map + Stats side by side */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:24, alignItems:'start' }}>

        {/* SVG Map */}
        <div style={{
          background:'var(--bg-card)', border:'1px solid var(--border)',
          borderRadius:'var(--radius-lg)', padding:'24px',
          position:'relative', overflow:'hidden',
        }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg, var(--accent) 0%, transparent 55%)', opacity:0.45 }} />

          <svg
            viewBox="60 10 360 390"
            style={{ width:'100%', maxHeight:520 }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {STATES.map((s, i) => {
                const level = getRiskLevel(s.name, comparisonData)
                const c = RISK_LEVELS[level]
                const p = (Math.sin(t * (0.6 + i * 0.04) + i) + 1) / 2
                return (
                  <radialGradient key={s.id} id={`hg-${s.id}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stopColor={`rgb(${c.dot})`} stopOpacity={0.6 * p} />
                    <stop offset="100%" stopColor={`rgb(${c.dot})`} stopOpacity={0}       />
                  </radialGradient>
                )
              })}
            </defs>

            {/* State paths */}
            {STATES.map((s, i) => {
              const level = getRiskLevel(s.name, comparisonData)
              const c     = RISK_LEVELS[level]
              const p     = (Math.sin(t * (0.6 + i * 0.04) + i) + 1) / 2
              const isHov = hovered === s.id
              return (
                <path
                  key={s.id}
                  d={s.d}
                  fill={isHov ? c.fill.replace('0.22','0.38').replace('0.18','0.32').replace('0.15','0.28') : c.fill}
                  stroke={c.stroke}
                  strokeWidth={isHov ? 1.4 : 0.8}
                  style={{ cursor:'pointer', transition:'all 0.2s' }}
                  onMouseEnter={(e) => {
                    setHovered(s.id)
                    const rect = e.currentTarget.closest('svg').getBoundingClientRect()
                    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top })
                  }}
                  onMouseLeave={() => setHovered(null)}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.closest('svg').getBoundingClientRect()
                    setTooltip({ x: e.clientX - rect.left, y: e.clientY - rect.top })
                  }}
                />
              )
            })}

            {/* Blinking dots */}
            {STATES.map((s, i) => {
              const level = getRiskLevel(s.name, comparisonData)
              const c     = RISK_LEVELS[level]
              const p     = (Math.sin(t * (0.9 + i * 0.05) + i * 0.8) + 1) / 2
              const coreR = level === 'critical' ? 3.2 : level === 'high' ? 2.8 : 2.2
              const ringR = coreR + 2 + p * (level === 'critical' ? 7 : 4)
              const [cx, cy] = s.dot
              return (
                <g key={`dot-${s.id}`} style={{ pointerEvents:'none' }}>
                  <circle cx={cx} cy={cy} r={ringR}         fill={`url(#hg-${s.id})`} />
                  <circle cx={cx} cy={cy} r={coreR}         fill={`rgba(${c.dot},${0.7 + 0.3 * p})`} />
                  <circle cx={cx} cy={cy} r={coreR * 0.38}  fill={`rgba(255,255,255,${0.8 + 0.2 * p})`} />
                </g>
              )
            })}
          </svg>

          {/* Tooltip */}
          {hovered && (() => {
            const s     = STATES.find(s => s.id === hovered)
            const level = getRiskLevel(s.name, comparisonData)
            const c     = RISK_LEVELS[level]
            const count = getCrimeCount(s.name, comparisonData)
            return (
              <div style={{
                position:'absolute',
                left: Math.min(tooltip.x + 12, 380),
                top:  Math.max(tooltip.y - 60, 10),
                background:'var(--bg-elevated)',
                border:`1px solid ${c.badge}`,
                borderRadius: 8,
                padding:'10px 14px',
                pointerEvents:'none',
                zIndex:10,
                minWidth:160,
                boxShadow:`0 4px 20px rgba(0,0,0,0.3), 0 0 12px ${c.badge}33`,
              }}>
                <p style={{ fontFamily:'var(--font-display)', fontSize:14, letterSpacing:1.5, color:'var(--text-primary)', marginBottom:4 }}>{s.name}</p>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:11, color:c.text, marginBottom:2 }}>⚠ {c.label}</p>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text-secondary)' }}>Crimes: <span style={{ color:c.text, fontWeight:600 }}>{count}</span></p>
              </div>
            )
          })()}
        </div>

        {/* State list */}
        <div style={{
          background:'var(--bg-card)', border:'1px solid var(--border)',
          borderRadius:'var(--radius-lg)', padding:'20px',
          maxHeight:560, overflowY:'auto',
          position:'relative',
        }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg, var(--accent) 0%, transparent 55%)', opacity:0.45 }} />
          <h3 style={{ fontFamily:'var(--font-display)', fontSize:14, letterSpacing:2, color:'var(--text-secondary)', marginBottom:16 }}>STATE RANKINGS</h3>

          {STATES
            .slice()
            .sort((a, b) => {
              const ca = parseInt((getCrimeCount(a.name, comparisonData) || '0').replace(/,/g,''))
              const cb = parseInt((getCrimeCount(b.name, comparisonData) || '0').replace(/,/g,''))
              return cb - ca
            })
            .map((s, i) => {
              const level = getRiskLevel(s.name, comparisonData)
              const c     = RISK_LEVELS[level]
              const count = getCrimeCount(s.name, comparisonData)
              return (
                <div
                  key={s.id}
                  onMouseEnter={() => setHovered(s.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                    padding:'8px 10px', borderRadius:6, marginBottom:4,
                    background: hovered === s.id ? 'var(--bg-elevated)' : 'transparent',
                    cursor:'pointer', transition:'background 0.15s',
                  }}
                >
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9, minWidth:18 }}>{String(i+1).padStart(2,'0')}</span>
                    <div style={{ width:8, height:8, borderRadius:'50%', background:c.text, boxShadow:`0 0 5px ${c.text}` }} />
                    <span style={{ color:'var(--text-primary)', fontFamily:'var(--font-body)', fontSize:12 }}>{s.name}</span>
                  </div>
                  <span style={{ color:c.text, fontFamily:'var(--font-mono)', fontSize:11, fontWeight:600 }}>{count}</span>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* Bottom risk summary */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
        {legend.map(l => {
          const count = STATES.filter(s => getRiskLevel(s.name, comparisonData) === l.level).length
          return (
            <div key={l.level} style={{
              background:'var(--bg-card)', border:`1px solid ${l.color}33`,
              borderRadius:'var(--radius-md)', padding:'16px 20px',
              borderLeft:`3px solid ${l.color}`,
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                <div style={{ width:10, height:10, borderRadius:'50%', background:l.color, boxShadow:`0 0 6px ${l.color}` }} />
                <span style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10, textTransform:'uppercase', letterSpacing:1 }}>{l.label}</span>
              </div>
              <p style={{ color:l.color, fontFamily:'var(--font-display)', fontSize:36, letterSpacing:2, lineHeight:1 }}>{count}</p>
              <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10, marginTop:4 }}>states / UTs</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
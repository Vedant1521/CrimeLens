import React, { useState, useEffect } from 'react'

const NEWS = [
  { title:'NCRB Report 2024: Cybercrime cases surge 35% across metro cities', category:'Cybercrime', state:'Delhi', time:'2h ago', severity:'high', source:'NCRB' },
  { title:'Maharashtra records highest theft cases in Q3 2024, Mumbai leads', category:'Theft', state:'Maharashtra', time:'4h ago', severity:'medium', source:'Times of India' },
  { title:'UP government launches anti-crime drive, 1200 arrests in 48 hours', category:'Homicide', state:'Uttar Pradesh', time:'6h ago', severity:'high', source:'Hindustan Times' },
  { title:'Kerala maintains lowest crime rate among large states for 3rd year', category:'General', state:'Kerala', time:'8h ago', severity:'low', source:'The Hindu' },
  { title:'Rajasthan records spike in kidnapping cases near border districts', category:'Kidnapping', state:'Rajasthan', time:'10h ago', severity:'high', source:'Rajasthan Patrika' },
  { title:'Delhi Police cyber cell cracks ₹50 Cr online fraud network', category:'Cybercrime', state:'Delhi', time:'12h ago', severity:'medium', source:'NDTV' },
  { title:'Chhattisgarh reports 18% decline in robbery cases in 2024', category:'Robbery', state:'Chhattisgarh', time:'14h ago', severity:'low', source:'Dainik Bhaskar' },
  { title:'Karnataka high court orders review of assault case backlog', category:'Assault', state:'Karnataka', time:'1d ago', severity:'medium', source:'Deccan Herald' },
  { title:'West Bengal anti-trafficking unit rescues 84 victims in single operation', category:'Human Trafficking', state:'West Bengal', time:'1d ago', severity:'high', source:'Telegraph India' },
  { title:'Tamil Nadu introduces AI-powered crime prediction system in Chennai', category:'General', state:'Tamil Nadu', time:'2d ago', severity:'low', source:'The Hindu' },
  { title:'Bihar launches fast-track courts for rape cases, 500 cases cleared', category:'Rape', state:'Bihar', time:'2d ago', severity:'medium', source:'Hindustan' },
  { title:'Telangana cybercrime helpline receives 10,000 calls in October 2024', category:'Cybercrime', state:'Telangana', time:'3d ago', severity:'medium', source:'Deccan Chronicle' },
]

const SEVERITY_STYLE = {
  high:   { color:'var(--red)',    bg:'rgba(239,68,68,0.1)',  border:'rgba(239,68,68,0.3)',  label:'HIGH'   },
  medium: { color:'var(--accent)', bg:'var(--accent-glow)',   border:'rgba(249,115,22,0.3)', label:'MEDIUM' },
  low:    { color:'var(--green)',  bg:'rgba(16,185,129,0.1)', border:'rgba(16,185,129,0.3)', label:'LOW'    },
}

const CAT_COLOR = {
  Cybercrime:'var(--cyan)', Theft:'var(--accent)', Homicide:'var(--red)',
  Kidnapping:'var(--red)', Robbery:'var(--purple)', Assault:'var(--accent)',
  Rape:'var(--red)', 'Human Trafficking':'var(--purple)', General:'var(--text-muted)',
}

export default function NewsFeed({ filters }) {
  const [active,  setActive]  = useState(null)
  const [catFilter, setCatFilter] = useState('All')
  const [tick, setTick] = useState(0)

  // Ticker animation
  useEffect(() => {
    const t = setInterval(() => setTick(p => (p+1) % NEWS.length), 4000)
    return () => clearInterval(t)
  }, [])

  const categories = ['All', ...new Set(NEWS.map(n => n.category))]
  const filtered   = catFilter === 'All' ? NEWS : NEWS.filter(n => n.category === catFilter)

  return (
    <div>
      {/* Live ticker */}
      <div style={{
        background:'var(--bg-surface)', border:'1px solid var(--border)',
        borderRadius:'var(--radius-sm)', padding:'10px 16px',
        display:'flex', alignItems:'center', gap:12, marginBottom:18, overflow:'hidden'
      }}>
        <span style={{
          background:'var(--red)', color:'#fff', fontFamily:'var(--font-mono)',
          fontSize:9, letterSpacing:1.5, padding:'3px 8px', borderRadius:3, flexShrink:0
        }}>● Top Feed</span>
        <p style={{
          color:'var(--text-secondary)', fontFamily:'var(--font-mono)', fontSize:11,
          overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis',
          transition:'opacity 0.3s'
        }}>
          {NEWS[tick].title}
        </p>
      </div>

      {/* Category filters */}
      <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCatFilter(cat)} style={{
            padding:'4px 12px', borderRadius:'var(--radius-sm)',
            background: catFilter===cat ? 'var(--bg-elevated)' : 'transparent',
            border:`1px solid ${catFilter===cat ? 'var(--border-bright)' : 'var(--border)'}`,
            color: catFilter===cat ? 'var(--text-primary)' : 'var(--text-muted)',
            fontFamily:'var(--font-mono)', fontSize:10, cursor:'pointer', letterSpacing:0.5,
            transition:'all 0.15s'
          }}>{cat}</button>
        ))}
      </div>

      {/* News list */}
      <div style={{ display:'flex', flexDirection:'column', gap:8, maxHeight:400, overflowY:'auto', paddingRight:4 }}>
        {filtered.map((item, i) => {
          const sev = SEVERITY_STYLE[item.severity]
          const isOpen = active === i
          return (
            <div key={i}
              onClick={() => setActive(isOpen ? null : i)}
              style={{
                background:'var(--bg-surface)', border:'1px solid var(--border)',
                borderRadius:'var(--radius-sm)', padding:'12px 16px',
                cursor:'pointer', transition:'border-color 0.15s, background 0.15s',
                borderLeft:`3px solid ${sev.color}`
              }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--bg-elevated)'; e.currentTarget.style.borderColor=sev.color }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--bg-surface)'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.borderLeftColor=sev.color }}
            >
              <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', gap:8, alignItems:'center', marginBottom:6, flexWrap:'wrap' }}>
                    <span style={{
                      color: CAT_COLOR[item.category] || 'var(--text-muted)',
                      background:'var(--bg-card)', border:`1px solid var(--border)`,
                      fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:1,
                      padding:'2px 7px', borderRadius:3
                    }}>{item.category.toUpperCase()}</span>
                    <span style={{
                      color:sev.color, background:sev.bg, border:`1px solid ${sev.border}`,
                      fontFamily:'var(--font-mono)', fontSize:9, padding:'2px 7px', borderRadius:3
                    }}>{sev.label}</span>
                    <span style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9 }}>{item.state}</span>
                    <span style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9, marginLeft:'auto' }}>{item.time}</span>
                  </div>
                  <p style={{ color: isOpen ? 'var(--text-primary)' : 'var(--text-secondary)', fontFamily:'var(--font-body)', fontSize:13, lineHeight:1.5 }}>
                    {item.title}
                  </p>
                  {isOpen && (
                    <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10, marginTop:8, letterSpacing:0.5 }}>
                      Source: {item.source} · Click to collapse
                    </p>
                  )}
                </div>
                <span style={{ color:'var(--text-muted)', fontSize:12, flexShrink:0, marginTop:2 }}>{isOpen ? '▲' : '▼'}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

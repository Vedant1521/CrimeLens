import React, { useState } from 'react'

const GRADES = [
  { grade:'A', label:'Safe',        min:80,  color:'#10b981', bg:'rgba(16,185,129,0.1)',  border:'rgba(16,185,129,0.3)'  },
  { grade:'B', label:'Moderate',    min:55,  color:'#06b6d4', bg:'rgba(6,182,212,0.1)',   border:'rgba(6,182,212,0.3)'   },
  { grade:'C', label:'Concerning',  min:30,  color:'#f59e0b', bg:'rgba(245,158,11,0.1)',  border:'rgba(245,158,11,0.3)'  },
  { grade:'D', label:'High Risk',   min:0,   color:'#ef4444', bg:'rgba(239,68,68,0.1)',   border:'rgba(239,68,68,0.3)'   },
]

function getGrade(score) {
  return GRADES.find(g => score >= g.min) || GRADES[3]
}

function scoreState(state, maxRate) {
  const rateScore   = Math.max(0, 100 - (state.avgRate / maxRate) * 100)
  const volumeScore = Math.max(0, 100 - (state.total  / 50000)  * 20)
  return Math.min(100, Math.round(rateScore * 0.7 + volumeScore * 0.3))
}

export default function StateReportCard({ data }) {
  const [filter, setFilter] = useState('ALL')

  if (!data?.length) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:200, color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:12 }}>
      NO DATA AVAILABLE
    </div>
  )

  const maxRate = Math.max(...data.map(s => s.avgRate || 0), 1)
  const scored  = data.map(s => ({ ...s, score: scoreState(s, maxRate) }))
                      .sort((a, b) => b.score - a.score)

  const filtered = filter === 'ALL' ? scored : scored.filter(s => getGrade(s.score).grade === filter)

  const gradeCounts = GRADES.map(g => ({
    ...g,
    count: scored.filter(s => getGrade(s.score).grade === g.grade).length
  }))

  return (
    <div>
      {/* Grade summary pills */}
      <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
        <button onClick={() => setFilter('ALL')} style={{
          padding:'6px 14px', borderRadius:'var(--radius-sm)',
          background: filter==='ALL' ? 'var(--accent)' : 'var(--bg-surface)',
          border: `1px solid ${filter==='ALL' ? 'var(--accent)' : 'var(--border)'}`,
          color: filter==='ALL' ? '#000' : 'var(--text-muted)',
          fontFamily:'var(--font-mono)', fontSize:11, cursor:'pointer', letterSpacing:1
        }}>ALL · {scored.length}</button>
        {gradeCounts.map(g => (
          <button key={g.grade} onClick={() => setFilter(g.grade)} style={{
            padding:'6px 14px', borderRadius:'var(--radius-sm)',
            background: filter===g.grade ? g.color : g.bg,
            border: `1px solid ${g.border}`,
            color: filter===g.grade ? '#000' : g.color,
            fontFamily:'var(--font-mono)', fontSize:11, cursor:'pointer', letterSpacing:1
          }}>
            {g.grade} · {g.count} · {g.label}
          </button>
        ))}
      </div>

      {/* State cards grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:10, maxHeight:480, overflowY:'auto', paddingRight:4 }}>
        {filtered.map((s, i) => {
          const g = getGrade(s.score)
          return (
            <div key={i} style={{
              background:'var(--bg-surface)', border:`1px solid ${g.border}`,
              borderRadius:'var(--radius-md)', padding:'14px',
              transition:'transform 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
            >
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                <p style={{ color:'var(--text-primary)', fontFamily:'var(--font-mono)', fontSize:11, flex:1, marginRight:8 }}>{s._id}</p>
                <span style={{
                  color: g.color, background: g.bg, border:`1px solid ${g.border}`,
                  borderRadius:4, padding:'2px 8px',
                  fontFamily:'var(--font-display)', fontSize:18, letterSpacing:1
                }}>{g.grade}</span>
              </div>

              {/* Score bar */}
              <div style={{ height:4, background:'var(--bg-card)', borderRadius:2, marginBottom:8, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${s.score}%`, background:g.color, borderRadius:2, transition:'width 0.8s ease' }} />
              </div>

              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <span style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10 }}>Score: <span style={{ color:g.color }}>{s.score}</span></span>
                <span style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10 }}>Rate: <span style={{ color:'var(--text-secondary)' }}>{(s.avgRate||0).toFixed(1)}</span></span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

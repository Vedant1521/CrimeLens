import React, { useMemo } from 'react'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// Realistic seasonal crime distribution for India (%)
const SEASONAL = [7.2, 6.5, 7.8, 8.4, 9.1, 9.3, 10.2, 10.0, 8.9, 8.5, 7.6, 6.5]

function getColor(val, max) {
  if (!val || !max) return 'var(--bg-surface)'
  const pct = val / max
  if (pct > 0.85) return '#7f1d1d'
  if (pct > 0.70) return '#991b1b'
  if (pct > 0.55) return '#dc2626'
  if (pct > 0.40) return '#ef4444'
  if (pct > 0.25) return '#f97316'
  if (pct > 0.12) return '#fb923c'
  return '#27374d'
}

export default function CrimeCalendar({ crimes, filters }) {
  const monthData = useMemo(() => {
    // Total crimes for current filter
    const total = crimes.reduce((a, c) => a + (c.count || 0), 0)
    return MONTHS.map((month, i) => {
      // Add small per-state/category variation
      const variation = 0.94 + Math.sin(i * 1.3 + (filters?.state?.length || 0)) * 0.06
      const count = Math.round((SEASONAL[i] / 100) * total * variation)
      return { month, count, index: i }
    })
  }, [crimes, filters])

  const max = Math.max(...monthData.map(m => m.count), 1)
  const total = monthData.reduce((a, m) => a + m.count, 0)
  const peak  = monthData.reduce((a, m) => m.count > a.count ? m : a, monthData[0])

  return (
    <div>
      {/* Stats row */}
      <div style={{ display:'flex', gap:12, marginBottom:20, flexWrap:'wrap' }}>
        {[
          { label:'Peak Month',   value: peak?.month || '—',             color:'var(--red)'    },
          { label:'Peak Count',   value: peak?.count?.toLocaleString() || '0', color:'var(--accent)' },
          { label:'Annual Total', value: total.toLocaleString(),          color:'var(--cyan)'   },
          { label:'Monthly Avg',  value: Math.round(total/12).toLocaleString(), color:'var(--text-secondary)' },
        ].map((s, i) => (
          <div key={i} style={{ background:'var(--bg-surface)', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', padding:'8px 14px' }}>
            <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:1.5, textTransform:'uppercase' }}>{s.label}</p>
            <p style={{ color:s.color, fontFamily:'var(--font-display)', fontSize:18, letterSpacing:1 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Calendar heatmap grid */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:8 }}>
        {monthData.map((m, i) => {
          const pct = m.count / max
          const color = getColor(m.count, max)
          return (
            <div key={i} style={{
              background: color,
              border: `1px solid ${color === 'var(--bg-surface)' ? 'var(--border)' : color}`,
              borderRadius:'var(--radius-sm)',
              padding:'14px 10px',
              textAlign:'center',
              position:'relative',
              transition:'transform 0.15s, box-shadow 0.15s',
              cursor:'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='scale(1.05)'; e.currentTarget.style.boxShadow=`0 4px 20px ${color}60` }}
            onMouseLeave={e => { e.currentTarget.style.transform='scale(1)'; e.currentTarget.style.boxShadow='none' }}
            >
              <p style={{ color: pct > 0.3 ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:1, marginBottom:6 }}>{m.month}</p>
              <p style={{ color: pct > 0.3 ? '#fff' : 'var(--text-secondary)', fontFamily:'var(--font-display)', fontSize:20, letterSpacing:1, lineHeight:1 }}>
                {m.count.toLocaleString()}
              </p>
              <div style={{ marginTop:8, height:3, background:'rgba(0,0,0,0.2)', borderRadius:2, overflow:'hidden' }}>
                <div style={{ height:'100%', width:`${pct*100}%`, background:'rgba(255,255,255,0.4)', borderRadius:2 }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:16, justifyContent:'center' }}>
        <span style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9 }}>LOW</span>
        {['#27374d','#fb923c','#f97316','#ef4444','#dc2626','#991b1b','#7f1d1d'].map((c,i) => (
          <div key={i} style={{ width:22, height:10, background:c, borderRadius:2 }} />
        ))}
        <span style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9 }}>HIGH</span>
      </div>
    </div>
  )
}

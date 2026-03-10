import React, { useState } from 'react'

function getRiskColor(pct) {
  if (pct >= 80) return { bar: '#ef4444', label: 'CRITICAL', text: '#fca5a5' }
  if (pct >= 60) return { bar: '#f97316', label: 'HIGH',     text: '#fdba74' }
  if (pct >= 40) return { bar: '#fbbf24', label: 'MEDIUM',   text: '#fde68a' }
  if (pct >= 20) return { bar: '#06b6d4', label: 'LOW',      text: '#a5f3fc' }
  return              { bar: '#10b981', label: 'MINIMAL',  text: '#6ee7b7' }
}

export default function CrimeMap({ data }) {
  const [hovered, setHovered] = useState(null)

  const top = [...(data || [])]
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)

  const max = top[0]?.total || 1

  if (!top.length) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        NO DATA AVAILABLE
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {top.map((s, i) => {
        const pct   = (s.total / max) * 100
        const risk  = getRiskColor(pct)
        const isHov = hovered === i

        return (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{ cursor: 'default' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 20, height: 20,
                  borderRadius: 4,
                  background:   'var(--bg-surface)',
                  border:       '1px solid var(--border)',
                  display:      'flex', alignItems: 'center', justifyContent: 'center',
                  color:        'var(--text-muted)',
                  fontSize:     9,
                  fontFamily:   'var(--font-mono)'
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ color: isHov ? 'var(--text-primary)' : 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 12, transition: 'color 0.15s' }}>
                  {s._id}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  color:       risk.text,
                  fontSize:    9,
                  fontFamily:  'var(--font-mono)',
                  letterSpacing: 0.5,
                  background:  `${risk.bar}18`,
                  border:      `1px solid ${risk.bar}40`,
                  padding:     '2px 6px',
                  borderRadius: 3
                }}>
                  {risk.label}
                </span>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11, minWidth: 60, textAlign: 'right' }}>
                  {s.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Bar */}
            <div style={{ height: 6, background: 'var(--bg-surface)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height:       '100%',
                width:        `${pct}%`,
                background:   risk.bar,
                borderRadius: 3,
                transition:   'width 0.5s ease, opacity 0.15s',
                opacity:      isHov ? 1 : 0.7,
                boxShadow:    isHov ? `0 0 8px ${risk.bar}60` : 'none'
              }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

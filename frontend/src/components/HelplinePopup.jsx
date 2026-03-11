import React, { useState } from 'react'

const HELPLINES = [
  {
    category: 'Emergency / Police',
    icon: '🚔',
    color: '#dc2626',
    numbers: [
      { label: 'Police',          number: '100' },
      { label: 'Emergency',       number: '112' },
      { label: 'Fire',            number: '101' },
      { label: 'Ambulance',       number: '108' },
    ]
  },
  {
    category: 'Women Safety',
    icon: '🛡️',
    color: '#d95f02',
    numbers: [
      { label: 'Women Helpline',       number: '1091' },
      { label: 'Domestic Violence',    number: '181' },
      { label: 'NCW Helpline',         number: '7827-170-170' },
      { label: 'One Stop Centre',      number: '181' },
    ]
  },
  {
    category: 'Child Safety',
    icon: '👶',
    color: '#0891b2',
    numbers: [
      { label: 'Childline',            number: '1098' },
      { label: 'Missing Child',        number: '1094' },
      { label: 'NCPCR',               number: '1800-121-2830' },
    ]
  },
  {
    category: 'Cyber Crime',
    icon: '💻',
    color: '#7c3aed',
    numbers: [
      { label: 'Cyber Crime Helpline', number: '1930' },
      { label: 'Cyber Crime Portal',   number: 'cybercrime.gov.in' },
    ]
  },
  {
    category: 'Anti-Corruption',
    icon: '⚖️',
    color: '#16a34a',
    numbers: [
      { label: 'CBI Anti-Corruption',  number: '1800-11-2000' },
      { label: 'Vigilance Helpline',   number: '1800-345-6770' },
      { label: 'CVC Hotline',          number: '011-24600200' },
    ]
  },
  {
    category: 'Drug Abuse',
    icon: '💊',
    color: '#b45309',
    numbers: [
      { label: 'NCORD Helpline',       number: '1800-11-0031' },
      { label: 'De-addiction',         number: '14446' },
    ]
  },
]

export default function HelplinePopup() {
  const [open,        setOpen]        = useState(false)
  const [activeTab,   setActiveTab]   = useState(0)
  const [copied,      setCopied]      = useState(null)

  const handleCopy = (number) => {
    navigator.clipboard.writeText(number).catch(() => {})
    setCopied(number)
    setTimeout(() => setCopied(null), 1500)
  }

  const active = HELPLINES[activeTab]

  return (
    <div style={{ position:'fixed', bottom:24, left:24, zIndex:100 }}>

      {/* Popup panel */}
      {open && (
        <div style={{
          width: 320,
          marginBottom: 12,
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          animation: 'fadeUp 0.25s ease both',
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ fontSize:16 }}>📞</span>
              <span style={{ fontFamily:'var(--font-display)', fontSize:15, letterSpacing:2, color:'var(--text-primary)' }}>HELPLINES</span>
            </div>
            <button onClick={() => setOpen(false)} style={{
              background:'none', border:'none', color:'var(--text-muted)',
              cursor:'pointer', fontSize:16, lineHeight:1, padding:2,
            }}>✕</button>
          </div>

          {/* Category tabs */}
          <div style={{
            display: 'flex', overflowX: 'auto', scrollbarWidth: 'none',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-surface)',
          }}>
            {HELPLINES.map((h, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                style={{
                  flex: '0 0 auto',
                  padding: '8px 12px',
                  background: activeTab === i ? 'var(--bg-card)' : 'transparent',
                  border: 'none',
                  borderBottom: activeTab === i ? `2px solid ${h.color}` : '2px solid transparent',
                  cursor: 'pointer',
                  fontSize: 16,
                  transition: 'all 0.15s',
                }}
                title={h.category}
              >
                {h.icon}
              </button>
            ))}
          </div>

          {/* Active category */}
          <div style={{ padding: '14px 16px' }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: active.color, letterSpacing: 1.5,
              textTransform: 'uppercase', marginBottom: 12,
            }}>
              {active.icon} {active.category}
            </p>

            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {active.numbers.map((n, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 8, padding: '10px 12px',
                }}>
                  <div>
                    <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:1, marginBottom:2 }}>{n.label}</p>
                    <p style={{ color: active.color, fontFamily:'var(--font-display)', fontSize:18, letterSpacing:1.5, lineHeight:1 }}>{n.number}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(n.number)}
                    style={{
                      background: copied === n.number ? active.color : 'var(--bg-elevated)',
                      border: `1px solid ${copied === n.number ? active.color : 'var(--border)'}`,
                      borderRadius: 6, padding: '5px 10px',
                      color: copied === n.number ? '#fff' : 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)', fontSize: 9, cursor: 'pointer',
                      transition: 'all 0.2s', letterSpacing: 0.5,
                    }}
                  >
                    {copied === n.number ? '✓ Copied' : 'Copy'}
                  </button>
                </div>
              ))}
            </div>

            <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9, marginTop:12, textAlign:'center', letterSpacing:0.5 }}>
              Available 24×7 · Calls are free
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: 52, height: 52,
          borderRadius: '50%',
          background: open ? '#dc2626' : 'var(--accent)',
          border: 'none',
          boxShadow: `0 4px 20px ${open ? 'rgba(220,38,38,0.4)' : 'rgba(217,95,2,0.4)'}`,
          cursor: 'pointer',
          fontSize: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}
        title="Emergency Helplines"
      >
        {open ? '✕' : '📞'}
      </button>
    </div>
  )
}
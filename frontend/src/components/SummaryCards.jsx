import React, { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration = 1500) {
  const [display, setDisplay] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    const num = parseFloat(String(target).replace(/,/g, '')) || 0
    if (!num) { setDisplay(target); return }
    const start = performance.now()
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.floor(ease * num))
      if (progress < 1) raf.current = requestAnimationFrame(step)
      else setDisplay(num)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration])

  return display
}

function MetricCard({ title, rawValue, icon, color, glow, isText, delay }) {
  const num = useCountUp(isText ? 0 : (parseFloat(String(rawValue).replace(/,/g,'')) || 0))
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', padding: '22px 24px',
      position: 'relative', overflow: 'hidden',
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.5s ease, transform 0.5s ease, border-color 0.2s, transform 0.2s',
      cursor: 'default',
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.transform = 'translateY(-3px)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ position:'absolute', top:-30, right:-30, width:100, height:100, background:glow, borderRadius:'50%', filter:'blur(20px)', pointerEvents:'none' }} />
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
        <p style={{ color:'var(--text-muted)', fontSize:10, fontFamily:'var(--font-mono)', letterSpacing:1.5, textTransform:'uppercase' }}>{title}</p>
        <span style={{ color, fontSize:18 }}>{icon}</span>
      </div>
      <p style={{ color, fontSize: isText ? 22 : 32, fontFamily:'var(--font-display)', letterSpacing:2, lineHeight:1.1, wordBreak:'break-word' }}>
        {isText ? rawValue : num.toLocaleString()}
      </p>
      <div style={{ position:'absolute', bottom:0, left:0, width:'40%', height:2, background:color, borderRadius:'0 2px 0 0', opacity:0.6 }} />
    </div>
  )
}

export default function SummaryCards({ data }) {
  const cards = [
    { title:'Total Crimes',   rawValue: data?.totalCrimes || 0,          icon:'⬡', color:'var(--red)',    glow:'rgba(239,68,68,0.12)',   isText: false },
    { title:'Top Category',   rawValue: data?.topCategory || 'N/A',      icon:'◈', color:'var(--accent)', glow:'var(--accent-glow)',      isText: true  },
    { title:'Highest State',  rawValue: data?.topState || 'N/A',         icon:'▲', color:'var(--cyan)',   glow:'var(--cyan-glow)',         isText: true  },
    { title:'Data Status',    rawValue: 'NCRB DATA',                           icon:'◉', color:'var(--green)',  glow:'rgba(16,185,129,0.12)',    isText: true  },
  ]
  return (
    <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16 }}>
      {cards.map((c, i) => <MetricCard key={i} {...c} delay={i * 120} />)}
    </div>
  )
}

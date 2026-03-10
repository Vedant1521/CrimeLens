import React, { useState, useMemo } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from 'recharts'

const CATEGORIES = ['Theft','Assault','Homicide','Rape','Kidnapping','Robbery','Cybercrime','Human Trafficking']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-bright)', borderRadius:'var(--radius-sm)', padding:'10px 14px', fontFamily:'var(--font-mono)', fontSize:11 }}>
      <p style={{ color:'var(--text-secondary)', marginBottom:6, fontFamily:'var(--font-display)', letterSpacing:1 }}>{label}</p>
      {payload.map((p,i) => (
        <div key={i} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:3 }}>
          <span style={{ width:8, height:8, borderRadius:2, background:p.fill || p.stroke, display:'inline-block' }} />
          <span style={{ color:'var(--text-muted)' }}>{p.name}:</span>
          <span style={{ color:p.fill || p.stroke }}>{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

export default function StateComparator({ crimes }) {
  const states = useMemo(() => [...new Set((crimes||[]).map(c => c.state))].sort(), [crimes])
  const [stateA, setStateA] = useState('')
  const [stateB, setStateB] = useState('')

  const getStateData = (stateName) => {
    if (!stateName) return {}
    const rows = crimes.filter(c => c.state === stateName)
    const bycat = {}
    rows.forEach(r => { bycat[r.category] = (bycat[r.category]||0) + r.count })
    return bycat
  }

  const dataA = getStateData(stateA)
  const dataB = getStateData(stateB)

  const barData = CATEGORIES.map(cat => ({
    cat: cat.length > 8 ? cat.slice(0,8)+'…' : cat,
    fullCat: cat,
    [stateA || 'State A']: dataA[cat] || 0,
    [stateB || 'State B']: dataB[cat] || 0,
  }))

  const totalA = Object.values(dataA).reduce((a,b)=>a+b,0)
  const totalB = Object.values(dataB).reduce((a,b)=>a+b,0)

  const selectStyle = {
    width:'100%', padding:'10px 14px',
    background:'var(--bg-surface)', border:'1px solid var(--border)',
    borderRadius:'var(--radius-sm)', color:'var(--text-primary)',
    fontFamily:'var(--font-mono)', fontSize:12, outline:'none', cursor:'pointer',
  }

  return (
    <div>
      {/* State selectors */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:16, alignItems:'center', marginBottom:24 }}>
        <div>
          <p style={{ color:'var(--accent)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:1.5, marginBottom:8 }}>STATE A</p>
          <div style={{ position:'relative' }}>
            <select value={stateA} onChange={e => setStateA(e.target.value)} style={selectStyle}>
              <option value="">— Select State —</option>
              {states.filter(s => s !== stateB).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {stateA && (
            <p style={{ color:'var(--accent)', fontFamily:'var(--font-display)', fontSize:28, letterSpacing:2, marginTop:8 }}>
              {totalA.toLocaleString()} <span style={{ fontSize:12, color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>total</span>
            </p>
          )}
        </div>

        <div style={{ textAlign:'center', color:'var(--text-muted)', fontFamily:'var(--font-display)', fontSize:24, letterSpacing:2 }}>VS</div>

        <div>
          <p style={{ color:'var(--cyan)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:1.5, marginBottom:8 }}>STATE B</p>
          <div style={{ position:'relative' }}>
            <select value={stateB} onChange={e => setStateB(e.target.value)} style={selectStyle}>
              <option value="">— Select State —</option>
              {states.filter(s => s !== stateA).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {stateB && (
            <p style={{ color:'var(--cyan)', fontFamily:'var(--font-display)', fontSize:28, letterSpacing:2, marginTop:8 }}>
              {totalB.toLocaleString()} <span style={{ fontSize:12, color:'var(--text-muted)', fontFamily:'var(--font-mono)' }}>total</span>
            </p>
          )}
        </div>
      </div>

      {stateA && stateB ? (
        <>
          {/* Winner banner */}
          <div style={{
            background: totalA < totalB ? 'rgba(249,115,22,0.08)' : 'rgba(6,182,212,0.08)',
            border: `1px solid ${totalA < totalB ? 'rgba(249,115,22,0.3)' : 'rgba(6,182,212,0.3)'}`,
            borderRadius:'var(--radius-sm)', padding:'10px 16px', marginBottom:20, textAlign:'center'
          }}>
            <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:1 }}>
              SAFER STATE: <span style={{ color: totalA < totalB ? 'var(--accent)' : 'var(--cyan)', fontFamily:'var(--font-display)', fontSize:16, letterSpacing:2 }}>
                {totalA < totalB ? stateA : stateB}
              </span>
              <span style={{ marginLeft:12 }}>({Math.abs(((totalA-totalB)/Math.max(totalA,totalB))*100).toFixed(1)}% fewer crimes)</span>
            </p>
          </div>

          {/* Bar chart */}
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top:0, right:10, left:-10, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="cat" tick={{ fill:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9 }} axisLine={{ stroke:'var(--border)' }} tickLine={false} />
              <YAxis tick={{ fill:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9 }} axisLine={false} tickLine={false} tickFormatter={v => v>=1000?`${(v/1000).toFixed(0)}k`:v} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill:'rgba(255,255,255,0.03)' }} />
              <Bar dataKey={stateA} fill="var(--accent)" radius={[3,3,0,0]} maxBarSize={28} />
              <Bar dataKey={stateB} fill="var(--cyan)"   radius={[3,3,0,0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>

          {/* Color legend */}
          <div style={{ display:'flex', gap:20, justifyContent:'center', marginTop:12 }}>
            {[[stateA,'var(--accent)'],[stateB,'var(--cyan)']].map(([name,color],i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ width:12, height:4, background:color, borderRadius:2, display:'inline-block' }} />
                <span style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:11 }}>{name}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:200, color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:12, border:'1px dashed var(--border)', borderRadius:'var(--radius-md)' }}>
          SELECT TWO STATES TO COMPARE
        </div>
      )}
    </div>
  )
}

import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

const PALETTE = ['#f97316', '#06b6d4', '#10b981', '#8b5cf6', '#ef4444', '#fbbf24', '#ec4899', '#3b82f6']

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]
  return (
    <div style={{
      background:   'var(--bg-elevated)',
      border:       '1px solid var(--border-bright)',
      borderRadius: 'var(--radius-sm)',
      padding:      '10px 14px',
      fontFamily:   'var(--font-mono)',
      fontSize:     11
    }}>
      <p style={{ color: d.payload.fill, fontFamily: 'var(--font-display)', letterSpacing: 1 }}>{d.name}</p>
      <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>
        {d.value.toLocaleString()} · {d.payload.pct}%
      </p>
    </div>
  )
}

export default function CategoryDistribution({ data }) {
  const chart = useMemo(() => {
    const cats = {}
    ;(data || []).forEach(item => {
      cats[item.category] = (cats[item.category] || 0) + item.count
    })
    const total = Object.values(cats).reduce((a, b) => a + b, 0) || 1
    return Object.entries(cats)
      .map(([name, val]) => ({ name, val, pct: ((val / total) * 100).toFixed(1) }))
      .sort((a, b) => b.val - a.val)
  }, [data])

  if (!chart.length) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        NO DATA AVAILABLE
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {/* Donut */}
      <div style={{ flex: '0 0 200px' }}>
        <ResponsiveContainer width={200} height={200}>
          <PieChart>
            <Pie
              data={chart}
              dataKey="val"
              nameKey="name"
              cx="50%" cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
            >
              {chart.map((_, i) => (
                <Cell key={i} fill={PALETTE[i % PALETTE.length]} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', maxHeight: 200 }}>
        {chart.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 8, height: 8,
              borderRadius: 2,
              background: PALETTE[i % PALETTE.length],
              flexShrink: 0
            }} />
            <span style={{ flex: 1, color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.name}
            </span>
            <span style={{ color: PALETTE[i % PALETTE.length], fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: 1, minWidth: 38, textAlign: 'right' }}>
              {item.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

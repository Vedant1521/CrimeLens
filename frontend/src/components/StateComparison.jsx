import React from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background:   'var(--bg-elevated)',
      border:       '1px solid var(--border-bright)',
      borderRadius: 'var(--radius-sm)',
      padding:      '10px 14px',
      fontFamily:   'var(--font-mono)',
      fontSize:     11
    }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 4, fontFamily: 'var(--font-display)', letterSpacing: 1 }}>{label}</p>
      <p style={{ color: 'var(--accent)' }}>{payload[0]?.value?.toLocaleString()} crimes</p>
    </div>
  )
}

export default function StateComparison({ data }) {
  const sorted = [...(data || [])]
    .sort((a, b) => b.total - a.total)
    .slice(0, 10)
    .map(s => ({ name: s._id, total: s.total }))

  if (!sorted.length) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        NO DATA AVAILABLE
      </div>
    )
  }

  const max = sorted[0]?.total || 1

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={sorted} layout="vertical" margin={{ top: 0, right: 60, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 10 }}
          axisLine={false} tickLine={false}
          tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
        />
        <YAxis
          type="category" dataKey="name" width={110}
          tick={{ fill: 'var(--text-secondary)', fontFamily: 'var(--font-mono)', fontSize: 11 }}
          axisLine={false} tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
        <Bar dataKey="total" radius={[0, 3, 3, 0]} barSize={18}>
          {sorted.map((entry, i) => {
            const ratio = entry.total / max
            const opacity = 0.4 + ratio * 0.6
            return <Cell key={i} fill={`rgba(249,115,22,${opacity})`} />
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

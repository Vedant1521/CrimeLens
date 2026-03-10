import React, { useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const PALETTE = ['#f97316', '#06b6d4', '#10b981', '#8b5cf6', '#ef4444', '#fbbf24', '#ec4899']

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background:   'var(--bg-elevated)',
      border:       '1px solid var(--border-bright)',
      borderRadius: 'var(--radius-sm)',
      padding:      '12px 16px',
      fontFamily:   'var(--font-mono)',
      fontSize:     11
    }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 8, fontFamily: 'var(--font-display)', letterSpacing: 1 }}>
        YEAR {label}
      </p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, display: 'inline-block' }} />
          <span style={{ color: 'var(--text-muted)' }}>{p.name}:</span>
          <span style={{ color: p.color, fontWeight: 500 }}>{p.value?.toLocaleString()}</span>
        </div>
      ))}
    </div>
  )
}

export default function TrendChart({ data }) {
  const { chartData, categories } = useMemo(() => {
    if (!data?.length) return { chartData: [], categories: [] }

    const byYear = {}
    const cats   = new Set()

    data.forEach(({ _id, total }) => {
      const { year, category } = _id
      if (!byYear[year]) byYear[year] = { year }
      byYear[year][category] = total
      cats.add(category)
    })

    return {
      chartData:  Object.values(byYear).sort((a, b) => a.year - b.year),
      categories: [...cats],
    }
  }, [data])

  if (!chartData.length) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        NO TREND DATA AVAILABLE
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="year"
          tick={{ fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}
          axisLine={{ stroke: 'var(--border)' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', paddingTop: 12 }}
        />
        {categories.map((cat, i) => (
          <Line
            key={cat}
            type="monotone"
            dataKey={cat}
            stroke={PALETTE[i % PALETTE.length]}
            strokeWidth={2}
            dot={{ r: 3, fill: PALETTE[i % PALETTE.length], strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

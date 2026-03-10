import React, { useMemo } from 'react'
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts'

const LITERACY = {
  'Kerala':57.0,'Delhi':44.0,'Himachal Pradesh':40.3,'Uttarakhand':37.5,
  'Goa':52.2,'Mizoram':55.8,'Tripura':52.2,'Maharashtra':48.4,
  'Tamil Nadu':48.0,'Gujarat':46.3,'Punjab':45.4,'Sikkim':49.6,
  'Manipur':46.8,'West Bengal':45.0,'Karnataka':45.2,'Telangana':42.8,
  'Andhra Pradesh':39.4,'Meghalaya':44.5,'Nagaland':47.1,'Haryana':44.6,
  'Odisha':43.5,'Assam':43.2,'Chhattisgarh':41.0,'Rajasthan':40.7,
  'Jharkhand':39.6,'Madhya Pradesh':40.0,'Uttar Pradesh':39.0,
  'Bihar':33.8,'Arunachal Pradesh':38.0,'Jammu & Kashmir':40.7,
}

const CustomDot = (props) => {
  const { cx, cy, payload } = props
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="var(--accent)" fillOpacity={0.7} stroke="var(--accent)" strokeWidth={1} />
      {payload.highlight && <circle cx={cx} cy={cy} r={8} fill="none" stroke="var(--accent)" strokeWidth={1} strokeDasharray="3 2" />}
    </g>
  )
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  return (
    <div style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-bright)', borderRadius:'var(--radius-sm)', padding:'10px 14px', fontFamily:'var(--font-mono)', fontSize:11 }}>
      <p style={{ color:'var(--accent)', fontFamily:'var(--font-display)', letterSpacing:1, marginBottom:6 }}>{d?.state}</p>
      <p style={{ color:'var(--text-muted)' }}>Literacy: <span style={{ color:'var(--cyan)' }}>{d?.literacy}%</span></p>
      <p style={{ color:'var(--text-muted)' }}>Crime Rate: <span style={{ color:'var(--red)' }}>{d?.crimeRate?.toFixed(1)}</span></p>
    </div>
  )
}

export default function LiteracyCorrelation({ data }) {
  const chartData = useMemo(() => {
    return (data || [])
      .filter(s => LITERACY[s._id])
      .map(s => ({
        state:     s._id,
        literacy:  LITERACY[s._id],
        crimeRate: parseFloat((s.avgRate || 0).toFixed(2)),
        total:     s.total,
      }))
      .sort((a, b) => a.literacy - b.literacy)
  }, [data])

  if (!chartData.length) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:280, color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:12 }}>
      NO DATA AVAILABLE
    </div>
  )

  const avgLit  = chartData.reduce((a,d) => a + d.literacy, 0) / chartData.length
  const avgRate = chartData.reduce((a,d) => a + d.crimeRate, 0) / chartData.length

  // Simple correlation coefficient
  const n   = chartData.length
  const sumX = chartData.reduce((a,d) => a+d.literacy,0)
  const sumY = chartData.reduce((a,d) => a+d.crimeRate,0)
  const sumXY = chartData.reduce((a,d) => a+d.literacy*d.crimeRate,0)
  const sumX2 = chartData.reduce((a,d) => a+d.literacy**2,0)
  const sumY2 = chartData.reduce((a,d) => a+d.crimeRate**2,0)
  const r = ((n*sumXY - sumX*sumY) / Math.sqrt((n*sumX2-sumX**2)*(n*sumY2-sumY**2))).toFixed(2)

  return (
    <div>
      {/* Insight bar */}
      <div style={{ display:'flex', gap:16, marginBottom:18, flexWrap:'wrap' }}>
        {[
          { label:'Correlation (r)', value:r, color: r < 0 ? 'var(--green)' : 'var(--red)' },
          { label:'Avg Literacy',    value:`${avgLit.toFixed(1)}%`,  color:'var(--cyan)'   },
          { label:'Avg Crime Rate',  value:avgRate.toFixed(1),       color:'var(--accent)' },
          { label:'States Plotted',  value:chartData.length,         color:'var(--text-secondary)' },
        ].map((item,i) => (
          <div key={i} style={{ background:'var(--bg-surface)', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', padding:'8px 14px' }}>
            <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:1, textTransform:'uppercase' }}>{item.label}</p>
            <p style={{ color:item.color, fontFamily:'var(--font-display)', fontSize:18, letterSpacing:1 }}>{item.value}</p>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top:10, right:20, left:-10, bottom:20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="literacy" type="number" domain={['dataMin - 2', 'dataMax + 2']}
            tick={{ fill:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10 }}
            axisLine={{ stroke:'var(--border)' }} tickLine={false}>
            <Label value="Literacy Rate (%)" position="insideBottom" offset={-12} fill="var(--text-muted)" fontSize={10} fontFamily="var(--font-mono)" />
          </XAxis>
          <YAxis dataKey="crimeRate" type="number"
            tick={{ fill:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10 }}
            axisLine={false} tickLine={false}>
            <Label value="Crime Rate /100k" angle={-90} position="insideLeft" offset={20} fill="var(--text-muted)" fontSize={10} fontFamily="var(--font-mono)" />
          </YAxis>
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine x={avgLit}  stroke="var(--border-bright)" strokeDasharray="4 3" />
          <ReferenceLine y={avgRate} stroke="var(--border-bright)" strokeDasharray="4 3" />
          <Scatter data={chartData} shape={<CustomDot />} />
        </ScatterChart>
      </ResponsiveContainer>

      <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10, textAlign:'center', marginTop:8 }}>
        {r < 0 ? '↓ Higher literacy correlates with lower crime rates' : '↑ Weak positive correlation — other factors at play'}
      </p>
    </div>
  )
}

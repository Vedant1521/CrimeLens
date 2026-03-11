import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import Filters from './Filters'
import SummaryCards from './SummaryCards'
import CrimeMap from './CrimeMap'
import TrendChart from './TrendChart'
import StateComparison from './StateComparison'
import CategoryDistribution from './CategoryDistribution'
import DataTable from './DataTable'
import StateReportCard from './StateReportCard'
import LiteracyCorrelation from './LiteracyCorrelation'
import CrimeCalendar from './CrimeCalendar'
import StateComparator from './StateComparator'
import NewsFeed from './NewsFeed'
import AIChatBot from './AIChatBot'
import HelplinePopup from './HelplinePopup'
import IndiaMapBackground from './IndiaMapBackground'
import HomeMap from './HomeMap'


const API_URL = 'https://india-crime-analytics.onrender.com'

const NAV_SECTIONS = [
  { id:'home',        label:'Home',        icon:'⌂' },
  { id:'heatmap',     label:'States',     icon:'▲' },
  { id:'trends',      label:'Trends',      icon:'↗' },
  { id:'reportcard',  label:'Report Card', icon:'◎' },
  { id:'comparator',  label:'Compare',     icon:'⇄' },
  { id:'calendar',    label:'Calendar',    icon:'▦' },
  { id:'correlation', label:'Literacy',    icon:'∿' },
  { id:'categories',  label:'Categories',  icon:'◉' },
  { id:'news',        label:'News',        icon:'⊗' },
  { id:'records',     label:'Records',     icon:'⊞' },
]

function Card({ id, title, icon, children, className='', badge }) {
  return (
    <div id={id} className={`animate-fade-up ${className}`} style={{
      background:'var(--bg-card)', border:'1px solid var(--border)',
      borderRadius:'var(--radius-lg)', padding:'24px',
      position:'relative', overflow:'hidden',
    }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'linear-gradient(90deg, var(--accent) 0%, transparent 55%)', opacity:0.45 }} />
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:22 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <span style={{ color:'var(--accent)', fontSize:13, fontFamily:'var(--font-mono)' }}>{icon}</span>
          <h3 style={{ fontFamily:'var(--font-display)', color:'var(--text-secondary)', letterSpacing:2.5, fontSize:13 }}>{title}</h3>
        </div>
        {badge && (
          <span style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-bright)', borderRadius:4, padding:'3px 10px', color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:1 }}>{badge}</span>
        )}
      </div>
      {children}
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'100px 0', gap:20 }}>
      <div style={{ position:'relative', width:56, height:56 }}>
        <div style={{ position:'absolute', inset:0, border:'2px solid var(--border)', borderTopColor:'var(--accent)', borderRadius:'50%', animation:'spin 0.75s linear infinite' }} />
        <div style={{ position:'absolute', inset:8, border:'2px solid var(--border)', borderBottomColor:'var(--cyan)', borderRadius:'50%', animation:'spin 1.2s linear infinite reverse' }} />
      </div>
      <div style={{ textAlign:'center' }}>
        <p style={{ color:'var(--accent)', fontFamily:'var(--font-display)', letterSpacing:4, fontSize:16 }}></p>
        <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:1, marginTop:4 }}>Just a Second</p>
      </div>
    </div>
  )
}

function QuickStats({ crimes }) {
  const states  = [...new Set(crimes.map(c => c.state))].length
  const cats    = [...new Set(crimes.map(c => c.category))].length
  const avgRate = crimes.length ? (crimes.reduce((a,c) => a+(c.crimeRate||0),0)/crimes.length).toFixed(1) : 0
  const peak    = crimes.length ? Math.max(...crimes.map(c => c.count)) : 0
  const items = [
    { label:'States/UT Tracked', value:states,                unit:'',      color:'var(--cyan)'   },
    { label:'Categories',        value:cats,                  unit:'',      color:'var(--purple)' },
    { label:'Avg Crime Rate',    value:avgRate,               unit:'/100k', color:'var(--accent)' },
    { label:'Peak Count',        value:peak.toLocaleString(), unit:'',      color:'var(--red)'    },
  ]
  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
      {items.map((s,i) => (
        <div key={i} style={{ background:'var(--bg-surface)', border:'1px solid var(--border)', borderRadius:'var(--radius-md)', padding:'16px' }}>
          <p style={{ color:'var(--text-muted)', fontSize:10, fontFamily:'var(--font-mono)', textTransform:'uppercase', letterSpacing:1.5, marginBottom:10 }}>{s.label}</p>
          <p style={{ color:s.color, fontSize:30, fontFamily:'var(--font-display)', letterSpacing:2, lineHeight:1 }}>
            {s.value}{s.unit && <span style={{ fontSize:11, color:'var(--text-muted)', marginLeft:4, fontFamily:'var(--font-mono)' }}>{s.unit}</span>}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [activeNav,  setActiveNav]  = useState('home')
  const [filters,    setFilters]    = useState({ year:2025, state:'all', category:'all' })
  const [dash,       setDash]       = useState(null)
  const [crimes,     setCrimes]     = useState([])
  const [trends,     setTrends]     = useState([])
  const [comparison, setComparison] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true); setError(null)
      const p = { year:filters.year, state:filters.state!=='all'?filters.state:undefined, category:filters.category!=='all'?filters.category:undefined }
      const [d,c,t,comp] = await Promise.all([
        axios.get(`${API_URL}/api/analytics/dashboard`,  { params:{ year:p.year, state:p.state } }),
        axios.get(`${API_URL}/api/crimes`,               { params:p }),
        axios.get(`${API_URL}/api/analytics/trends`,     { params:{ state:p.state, category:p.category } }),
        axios.get(`${API_URL}/api/analytics/comparison`, { params:{ year:p.year, category:p.category } }),
      ])
      setDash(d.data); setCrimes(c.data.data||[]); setTrends(t.data||[]); setComparison(comp.data||[])
    } catch(err) {
      console.error(err)
      setError('Cannot reach backend. Make sure the server is running on port 5000.')
    } finally { setLoading(false) }
  }, [filters])

  useEffect(() => { fetchData() }, [fetchData])

  const renderContent = () => {
    if (loading) return <LoadingSpinner />

    switch (activeNav) {
      case 'home':
        return (
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
            {dash && <SummaryCards data={dash} />}
           <Filters filters={filters} setFilters={setFilters} />
           <HomeMap comparisonData={comparison} />
         </div>
        )
      

      case 'overview':
        return (
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
            {dash && <SummaryCards data={dash} />}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
              <Card title="STATE HEATMAP" icon="▲" badge="TOP 10"><CrimeMap data={comparison} /></Card>
              <Card title="CRIME TRENDS" icon="↗" badge="2018–2025"><TrendChart data={trends} /></Card>
            </div>
          </div>
        )

      case 'heatmap':
        return <Card title="STATE HEATMAP" icon="▲" badge="TOP 10"><CrimeMap data={comparison} /></Card>

      case 'trends':
        return <Card title="CRIME TRENDS" icon="↗" badge="2018–2025"><TrendChart data={trends} /></Card>

      case 'states':
        return <Card title="STATE COMPARISON" icon="≡" badge="BY VOLUME"><StateComparison data={comparison} /></Card>

      case 'reportcard':
        return <Card title="STATE REPORT CARD" icon="◎" badge="SAFETY GRADES"><StateReportCard data={comparison} /></Card>

      case 'comparator':
        return <Card title="STATE COMPARATOR" icon="⇄" badge="SIDE BY SIDE"><StateComparator crimes={crimes} /></Card>

      case 'calendar':
        return (
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:20 }}>
            <Card title="MONTHLY CRIME CALENDAR" icon="▦" badge={`FY ${filters.year}`}>
              <CrimeCalendar crimes={crimes} filters={filters} />
            </Card>
            <Card title="QUICK STATS" icon="◈">
              <QuickStats crimes={crimes} />
            </Card>
          </div>
        )

      case 'correlation':
        return <Card title="CRIME vs LITERACY CORRELATION" icon="∿" badge="ALL STATES"><LiteracyCorrelation data={comparison} /></Card>

      case 'categories':
        return <Card title="CATEGORY BREAKDOWN" icon="◉"><CategoryDistribution data={crimes} /></Card>

      case 'news':
        return <Card title="CRIME NEWS FEED" icon="⊗"><NewsFeed filters={filters} /></Card>

      case 'records':
        return (
          <Card title="ALL RECORDS" icon="⊞" badge={`${crimes.length.toLocaleString()} ENTRIES`}>
            <DataTable data={crimes} />
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div style={{ minHeight:'100vh' }}>

      {/* Animated background — only on home */}
      {activeNav === 'home' && <IndiaMapBackground comparisonData={comparison} />}

      {/* ── HEADER ── */}
      <header style={{ position:'sticky', top:0, zIndex:50, background:'rgba(245,240,235,0.96)', borderBottom:'1px solid var(--border)', backdropFilter:'blur(18px)' }}>
        <div style={{ maxWidth:1440, margin:'0 auto', padding:'0 24px', height:60, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
            <div style={{ width:38, height:38, background:'linear-gradient(135deg, var(--accent), #c2410c)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontSize:19, boxShadow:'0 0 18px var(--accent-glow)' }}>
              🇮🇳
            </div>
            <div>
              <h1 style={{ fontFamily:'var(--font-display)', color:'var(--text-primary)', letterSpacing:3.5, fontSize:20, lineHeight:1 }}>CRIME ANALYTICS</h1>
              <p style={{ color:'var(--text-muted)', fontSize:9, fontFamily:'var(--font-mono)', letterSpacing:2, marginTop:2 }}>INDIA · 2018–2025 · NATIONAL CRIME RECORDS BUREAU</p>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:20 }}>
            {dash?.totalCrimes != null && (
              <div style={{ textAlign:'right' }}>
                <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:1 }}>TOTAL CRIMES</p>
                <p style={{ color:'var(--accent)', fontFamily:'var(--font-display)', fontSize:20, letterSpacing:1, lineHeight:1 }}>{Number(dash.totalCrimes).toLocaleString()}</p>
              </div>
            )}
          </div>
        </div>

        {/* ── NAV TABS ── */}
        <div style={{
          maxWidth:1440, margin:'0 auto', padding:'0 24px',
          borderTop:'1px solid var(--border)',
          display:'flex', alignItems:'center', gap:1,
          height:44, overflowX:'auto', scrollbarWidth:'none',
        }}>
          {NAV_SECTIONS.map(nav => {
            const isActive = activeNav === nav.id
            return (
              <button
                key={nav.id}
                onClick={() => setActiveNav(nav.id)}
                style={{
                  display:'flex', alignItems:'center', gap:7,
                  padding:'0 15px', height:'100%',
                  background: isActive ? 'rgba(217,95,2,0.1)' : 'transparent',
                  border:'none',
                  borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  borderTop: isActive ? '2px solid rgba(217,95,2,0.2)' : '2px solid transparent',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:0.5,
                  cursor:'pointer', transition:'all 0.15s', whiteSpace:'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-primary)'
                    e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
                    e.currentTarget.style.borderBottom = '2px solid rgba(217,95,2,0.4)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.borderBottom = '2px solid transparent'
                  }
                }}
              >
                <span style={{ fontSize:13, color: isActive ? 'var(--accent)' : 'var(--text-muted)', transition:'all 0.15s', lineHeight:1 }}>
                  {nav.icon}
                </span>
                {nav.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* ── MAIN ── */}
      <main style={{ maxWidth:1440, margin:'0 auto', padding:'36px 24px', display:'flex', flexDirection:'column', gap:24 }}>

        {/* Page title */}
        <div className="animate-fade-up" style={{ paddingBottom:8 }}>
          <div style={{ display:'flex', alignItems:'flex-end', gap:16, flexWrap:'wrap' }}>
            <h2 style={{ fontFamily:'var(--font-display)', color:'var(--text-primary)', fontSize:58, letterSpacing:5, lineHeight:1 }}>CRIME STATISTICS</h2>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--accent)', border:'1px solid var(--accent)', borderRadius:4, padding:'4px 10px', marginBottom:8, letterSpacing:1 }}>FY {filters.year}</span>
          </div>
          <p style={{ color:'var(--text-muted)', fontSize:12, marginTop:6, fontFamily:'var(--font-mono)', letterSpacing:0.5 }}>
            Comprehensive crime data analysis across all Indian states · Source: NCRB
          </p>
        </div>
       

        {error && (
          <div style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'var(--radius-md)', padding:'14px 18px', color:'#fca5a5', fontFamily:'var(--font-mono)', fontSize:12 }}>
            ⚠ {error}
          </div>
        )}

        {renderContent()}

      </main>

      <AIChatBot filters={filters} dash={dash} />
      <HelplinePopup />

      <footer style={{ borderTop:'1px solid var(--border)', padding:'20px 24px', maxWidth:1440, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <p style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10, letterSpacing:1 }}>INDIA CRIME ANALYTICS · NCRB · 2018–2025</p>
      </footer>
    </div>
  )
}
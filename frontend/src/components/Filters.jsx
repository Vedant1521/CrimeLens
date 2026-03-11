import React, { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = 'https://india-crime-analytics.onrender.com'

const selectStyle = {
  width:        '100%',
  padding:      '10px 14px',
  background:   'var(--bg-surface)',
  border:       '1px solid var(--border)',
  borderRadius: 'var(--radius-sm)',
  color:        'var(--text-primary)',
  fontFamily:   'var(--font-mono)',
  fontSize:     12,
  outline:      'none',
  cursor:       'pointer',
  appearance:   'none',
  WebkitAppearance: 'none',
}

const labelStyle = {
  display:      'block',
  color:        'var(--text-muted)',
  fontSize:     10,
  fontFamily:   'var(--font-mono)',
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  marginBottom: 8
}

export default function Filters({ filters, setFilters }) {
  const [states,     setStates]     = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const [sRes, cRes] = await Promise.all([
          axios.get(`${API_URL}/api/crimes/list/states`),
          axios.get(`${API_URL}/api/crimes/list/categories`),
        ])
        setStates(['all', ...(sRes.data.states || [])])
        setCategories(['all', ...(cRes.data.categories || [])])
      } catch (err) {
        console.error('Filters load error:', err)
      }
    }
    load()
  }, [])

  const years = Array.from({ length: 8 }, (_, i) => 2018 + i)

  return (
    <div
      className="animate-fade-up"
      style={{
        background:   'var(--bg-card)',
        border:       '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding:      '20px 24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <span style={{ color: 'var(--accent)', fontSize: 13, fontFamily: 'var(--font-mono)' }}>⊕</span>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-secondary)', letterSpacing: 2.5, fontSize: 13 }}>
          FILTERS
        </h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>

        {/* Year */}
        <div>
          <label style={labelStyle}>Year</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <input
              type="range"
              min="2018" max="2025"
              value={filters.year}
              onChange={e => setFilters({ ...filters, year: +e.target.value })}
              style={{
                flex:       1,
                height:     4,
                borderRadius: 2,
                outline:    'none',
                cursor:     'pointer',
                accentColor: 'var(--accent)',
                background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${((filters.year - 2018) / 7) * 100}%, var(--border) ${((filters.year - 2018) / 7) * 100}%, var(--border) 100%)`
              }}
            />
            <span style={{
              color:       'var(--accent)',
              fontFamily:  'var(--font-display)',
              fontSize:    22,
              letterSpacing: 1,
              minWidth:    52,
              textAlign:   'right'
            }}>
              {filters.year}
            </span>
          </div>
        </div>

        {/* State */}
        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>State</label>
          <div style={{ position: 'relative' }}>
            <select
              value={filters.state}
              onChange={e => setFilters({ ...filters, state: e.target.value })}
              style={selectStyle}
            >
              {states.map(s => (
                <option key={s} value={s === 'all' ? 'all' : s}>
                  {s === 'all' ? 'All States' : s}
                </option>
              ))}
            </select>
            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none', fontSize: 10 }}>▼</span>
          </div>
        </div>

        {/* Category */}
        <div style={{ position: 'relative' }}>
          <label style={labelStyle}>Category</label>
          <div style={{ position: 'relative' }}>
            <select
              value={filters.category}
              onChange={e => setFilters({ ...filters, category: e.target.value })}
              style={selectStyle}
            >
              {categories.map(c => (
                <option key={c} value={c === 'all' ? 'all' : c}>
                  {c === 'all' ? 'All Categories' : c}
                </option>
              ))}
            </select>
            <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none', fontSize: 10 }}>▼</span>
          </div>
        </div>

        {/* Reset */}
        <div>
          <label style={labelStyle}>Actions</label>
          <button
            onClick={() => setFilters({ year: 2025, state: 'all', category: 'all' })}
            style={{
              width:        '100%',
              padding:      '10px 14px',
              background:   'transparent',
              border:       '1px solid var(--accent)',
              borderRadius: 'var(--radius-sm)',
              color:        'var(--accent)',
              fontFamily:   'var(--font-mono)',
              fontSize:     11,
              letterSpacing: 1,
              cursor:       'pointer',
              transition:   'background 0.2s, color 0.2s',
              textTransform: 'uppercase'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#000' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}
          >
            ↺ Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}

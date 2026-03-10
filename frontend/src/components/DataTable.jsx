import React, { useState, useMemo } from 'react'

const PER_PAGE = 12

const thStyle = {
  padding:      '10px 14px',
  color:        'var(--text-muted)',
  fontFamily:   'var(--font-mono)',
  fontSize:     10,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  textAlign:    'left',
  borderBottom: '1px solid var(--border)',
  background:   'var(--bg-surface)',
  cursor:       'pointer',
  userSelect:   'none',
  whiteSpace:   'nowrap'
}

const tdStyle = {
  padding:    '10px 14px',
  borderBottom: '1px solid var(--border)',
  fontFamily: 'var(--font-body)',
  fontSize:   13,
  color:      'var(--text-secondary)',
}

export default function DataTable({ data }) {
  const [page,   setPage]   = useState(1)
  const [search, setSearch] = useState('')
  const [sort,   setSort]   = useState({ col: 'year', dir: 'desc' })

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return data.filter(r =>
      !q ||
      r.state?.toLowerCase().includes(q)    ||
      r.category?.toLowerCase().includes(q) ||
      String(r.year).includes(q)
    )
  }, [data, search])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const av = a[sort.col], bv = b[sort.col]
      const dir = sort.dir === 'asc' ? 1 : -1
      return typeof av === 'number'
        ? (av - bv) * dir
        : String(av || '').localeCompare(String(bv || '')) * dir
    })
  }, [filtered, sort])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PER_PAGE))
  const pageData   = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleSort = col => {
    setSort(prev => ({ col, dir: prev.col === col && prev.dir === 'asc' ? 'desc' : 'asc' }))
    setPage(1)
  }

  const handleSearch = e => { setSearch(e.target.value); setPage(1) }

  const sortIcon = col => {
    if (sort.col !== col) return <span style={{ opacity: 0.3, marginLeft: 4 }}>⇅</span>
    return <span style={{ color: 'var(--accent)', marginLeft: 4 }}>{sort.dir === 'asc' ? '↑' : '↓'}</span>
  }

  const cols = [
    { key: 'state',     label: 'State'    },
    { key: 'year',      label: 'Year'     },
    { key: 'category',  label: 'Category' },
    { key: 'count',     label: 'Count'    },
    { key: 'crimeRate', label: 'Rate/100k'},
    { key: 'population',label: 'Population'},
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Search + count */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ position: 'relative', flex: '0 0 300px' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: 12 }}>⌕</span>
          <input
            type="text"
            placeholder="Search state, category..."
            value={search}
            onChange={handleSearch}
            style={{
              width:        '100%',
              padding:      '9px 14px 9px 32px',
              background:   'var(--bg-surface)',
              border:       '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              color:        'var(--text-primary)',
              fontFamily:   'var(--font-mono)',
              fontSize:     12,
              outline:      'none',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--accent)'}
            onBlur={e => e.target.style.borderColor  = 'var(--border)'}
          />
        </div>
        <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          {filtered.length.toLocaleString()} RECORDS
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
          <thead>
            <tr>
              {cols.map(c => (
                <th key={c.key} style={thStyle} onClick={() => handleSort(c.key)}>
                  {c.label}{sortIcon(c.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.length > 0 ? pageData.map((row, i) => (
              <tr
                key={i}
                style={{ background: i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-surface)', transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-surface)'}
              >
                <td style={{ ...tdStyle, color: 'var(--text-primary)', fontWeight: 500 }}>{row.state}</td>
                <td style={{ ...tdStyle, fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>{row.year}</td>
                <td style={tdStyle}>
                  <span style={{
                    background:   'var(--bg-elevated)',
                    border:       '1px solid var(--border-bright)',
                    borderRadius: 4,
                    padding:      '2px 8px',
                    fontSize:     11,
                    fontFamily:   'var(--font-mono)'
                  }}>
                    {row.category}
                  </span>
                </td>
                <td style={{ ...tdStyle, fontFamily: 'var(--font-mono)', textAlign: 'right' }}>
                  {row.count?.toLocaleString()}
                </td>
                <td style={{ ...tdStyle, textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                  {row.crimeRate || '—'}
                </td>
                <td style={{ ...tdStyle, textAlign: 'right', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  {row.population ? row.population.toLocaleString() : '—'}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} style={{ ...tdStyle, textAlign: 'center', padding: '40px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  NO RECORDS FOUND
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
          PAGE {page} / {totalPages}
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { label: '«', action: () => setPage(1),            disabled: page === 1         },
            { label: '‹', action: () => setPage(p => Math.max(1, p - 1)),     disabled: page === 1         },
            { label: '›', action: () => setPage(p => Math.min(totalPages, p + 1)), disabled: page === totalPages },
            { label: '»', action: () => setPage(totalPages),   disabled: page === totalPages },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              disabled={btn.disabled}
              style={{
                width:        32, height: 32,
                background:   'var(--bg-surface)',
                border:       '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                color:        btn.disabled ? 'var(--text-muted)' : 'var(--text-secondary)',
                fontFamily:   'var(--font-mono)',
                fontSize:     13,
                cursor:       btn.disabled ? 'not-allowed' : 'pointer',
                opacity:      btn.disabled ? 0.4 : 1,
                transition:   'border-color 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { if (!btn.disabled) { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)' }}}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

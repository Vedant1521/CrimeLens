import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://india-crime-analytics.onrender.com'

const SUGGESTIONS = [
  'Which state has highest crime rate?',
  'What is the trend for cybercrime?',
  'Compare theft vs robbery data',
  'Which category is most common?',
  'How has crime changed since 2018?',
  'Which states are safest in India?',
]

function TypingDots() {
  return (
    <div style={{ display:'flex', gap:4, alignItems:'center', padding:'4px 2px' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width:7, height:7, borderRadius:'50%',
          background:'var(--accent)', opacity:0.6,
          animation:`typingBounce 1.2s ease-in-out ${i*0.2}s infinite`,
        }} />
      ))}
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display:'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom:12, animation:'fadeUp 0.3s ease both',
    }}>
      {!isUser && (
        <div style={{
          width:28, height:28, borderRadius:'50%', flexShrink:0,
          background:'linear-gradient(135deg, var(--accent), #c2410c)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:13, marginRight:8, marginTop:2,
          boxShadow:'0 0 10px var(--accent-glow)',
        }}>⚡</div>
      )}
      <div style={{
        maxWidth:'78%',
        background: isUser ? 'linear-gradient(135deg, var(--accent), #c2410c)' : 'var(--bg-elevated)',
        border: isUser ? 'none' : '1px solid var(--border-bright)',
        borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        padding:'10px 14px',
        color: isUser ? '#fff' : 'var(--text-primary)',
        fontFamily:'var(--font-body)',
        fontSize:13,
        lineHeight:1.55,
        boxShadow: isUser ? '0 4px 14px var(--accent-glow)' : 'none',
      }}>
        {msg.content}
      </div>
    </div>
  )
}

export default function AIChatBot({ filters, dash }) {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState([
    { role:'assistant', content:'Namaste! 🇮🇳 I\'m CrimeBot — your AI assistant for this dashboard. Ask me anything about India crime statistics, trends, or state comparisons!' }
  ])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [unread,   setUnread]   = useState(0)
  const bottomRef  = useRef(null)
  const inputRef   = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 100) }
  }, [open])

  const send = async (text) => {
    const content = (text || input).trim()
    if (!content || loading) return
    setInput('')

    const newMessages = [...messages, { role:'user', content }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await axios.post(`${API_URL}/api/ai/chat`, {
        messages: newMessages,
        context:  { year: filters?.year, state: filters?.state, category: filters?.category },
      })
      const reply = res.data.reply
      setMessages(prev => [...prev, { role:'assistant', content: reply }])
      if (!open) setUnread(u => u + 1)
    } catch (err) {
      setMessages(prev => [...prev, {
        role:'assistant',
        content: '⚠️ Could not connect to AI service. Make sure GEMINI_API_KEY is set in your backend .env file.'
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const clearChat = () => setMessages([
    { role:'assistant', content:'Chat cleared! Ask me anything about India crime data 🇮🇳' }
  ])

  return (
    <>
      {/* ── Keyframes injected once ── */}
      <style>{`
        @keyframes typingBounce {
          0%,60%,100% { transform: translateY(0); }
          30%          { transform: translateY(-5px); }
        }
        @keyframes bubblePop {
          0%   { transform: scale(0.8) translateY(10px); opacity:0; }
          100% { transform: scale(1)   translateY(0);    opacity:1; }
        }
        @keyframes badgePulse {
          0%,100% { transform: scale(1);   }
          50%     { transform: scale(1.2); }
        }
      `}</style>

      {/* ── Chat window ── */}
      {open && (
        <div style={{
          position:'fixed', bottom:90, right:24, zIndex:1000,
          width:380, height:540,
          background:'var(--bg-card)',
          border:'1px solid var(--border-bright)',
          borderRadius:18,
          display:'flex', flexDirection:'column',
          boxShadow:'0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(249,115,22,0.1)',
          animation:'bubblePop 0.3s ease both',
          overflow:'hidden',
        }}>

          {/* Header */}
          <div style={{
            background:'linear-gradient(135deg, #0f1623, #1a2235)',
            borderBottom:'1px solid var(--border)',
            padding:'14px 18px',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            flexShrink:0,
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{
                width:36, height:36, borderRadius:'50%',
                background:'linear-gradient(135deg, var(--accent), #c2410c)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:16, boxShadow:'0 0 12px var(--accent-glow)',
              }}>⚡</div>
              <div>
                <p style={{ color:'var(--text-primary)', fontFamily:'var(--font-display)', letterSpacing:2, fontSize:15 }}>CRIMEBOT</p>
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <span style={{ width:6, height:6, borderRadius:'50%', background:'var(--green)', boxShadow:'0 0 6px var(--green)', display:'inline-block' }} />
                  <span style={{ color:'var(--green)', fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:1 }}>AI ONLINE</span>
                </div>
              </div>
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <button onClick={clearChat} style={{
                background:'transparent', border:'1px solid var(--border)', borderRadius:6,
                color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10,
                padding:'4px 10px', cursor:'pointer', letterSpacing:1,
                transition:'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-muted)' }}
              >CLEAR</button>
              <button onClick={() => setOpen(false)} style={{
                width:28, height:28, borderRadius:'50%',
                background:'var(--bg-elevated)', border:'1px solid var(--border)',
                color:'var(--text-muted)', cursor:'pointer', fontSize:14,
                display:'flex', alignItems:'center', justifyContent:'center',
                transition:'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background='var(--red)'; e.currentTarget.style.color='#fff' }}
              onMouseLeave={e => { e.currentTarget.style.background='var(--bg-elevated)'; e.currentTarget.style.color='var(--text-muted)' }}
              >✕</button>
            </div>
          </div>

          {/* Context pill */}
          {(filters?.state !== 'all' || filters?.category !== 'all') && (
            <div style={{ padding:'8px 14px', background:'var(--bg-surface)', borderBottom:'1px solid var(--border)', display:'flex', gap:6, flexWrap:'wrap' }}>
              <span style={{ color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:9, letterSpacing:1 }}>CONTEXT:</span>
              {filters?.state !== 'all' && (
                <span style={{ background:'rgba(249,115,22,0.1)', border:'1px solid rgba(249,115,22,0.3)', borderRadius:3, padding:'1px 8px', color:'var(--accent)', fontFamily:'var(--font-mono)', fontSize:9 }}>{filters.state}</span>
              )}
              {filters?.category !== 'all' && (
                <span style={{ background:'rgba(6,182,212,0.1)', border:'1px solid rgba(6,182,212,0.3)', borderRadius:3, padding:'1px 8px', color:'var(--cyan)', fontFamily:'var(--font-mono)', fontSize:9 }}>{filters.category}</span>
              )}
              <span style={{ background:'rgba(139,92,246,0.1)', border:'1px solid rgba(139,92,246,0.3)', borderRadius:3, padding:'1px 8px', color:'var(--purple)', fontFamily:'var(--font-mono)', fontSize:9 }}>FY {filters?.year}</span>
            </div>
          )}

          {/* Messages */}
          <div style={{ flex:1, overflowY:'auto', padding:'16px 14px', display:'flex', flexDirection:'column' }}>
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            {loading && (
              <div style={{ display:'flex', alignItems:'flex-start', marginBottom:12 }}>
                <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg, var(--accent), #c2410c)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, marginRight:8, flexShrink:0 }}>⚡</div>
                <div style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-bright)', borderRadius:'14px 14px 14px 4px', padding:'10px 14px' }}>
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          {messages.length <= 2 && (
            <div style={{ padding:'8px 14px', borderTop:'1px solid var(--border)', display:'flex', gap:6, overflowX:'auto', flexShrink:0 }}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => send(s)} style={{
                  background:'var(--bg-surface)', border:'1px solid var(--border)',
                  borderRadius:20, padding:'5px 12px',
                  color:'var(--text-muted)', fontFamily:'var(--font-mono)', fontSize:10,
                  cursor:'pointer', whiteSpace:'nowrap', letterSpacing:0.5,
                  transition:'all 0.15s', flexShrink:0,
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-muted)' }}
                >{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding:'12px 14px', borderTop:'1px solid var(--border)', display:'flex', gap:10, alignItems:'center', flexShrink:0, background:'var(--bg-surface)' }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about crime data..."
              disabled={loading}
              style={{
                flex:1, padding:'10px 14px',
                background:'var(--bg-card)', border:'1px solid var(--border)',
                borderRadius:10, color:'var(--text-primary)',
                fontFamily:'var(--font-body)', fontSize:13, outline:'none',
                transition:'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor='var(--accent)'}
              onBlur={e => e.target.style.borderColor='var(--border)'}
            />
            <button onClick={() => send()} disabled={!input.trim() || loading} style={{
              width:40, height:40, borderRadius:10,
              background: input.trim() && !loading ? 'linear-gradient(135deg, var(--accent), #c2410c)' : 'var(--bg-elevated)',
              border:'1px solid var(--border)',
              color: input.trim() && !loading ? '#fff' : 'var(--text-muted)',
              cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:16, flexShrink:0, transition:'all 0.15s',
              boxShadow: input.trim() && !loading ? '0 4px 12px var(--accent-glow)' : 'none',
            }}>↑</button>
          </div>
        </div>
      )}

      {/* ── Floating bubble button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position:'fixed', bottom:24, right:24, zIndex:1001,
          width:58, height:58, borderRadius:'50%',
          background: open ? 'var(--bg-elevated)' : 'linear-gradient(135deg, var(--accent), #c2410c)',
          border:`2px solid ${open ? 'var(--border-bright)' : 'transparent'}`,
          color:'#fff', fontSize: open ? 20 : 24,
          cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow: open ? '0 4px 20px rgba(0,0,0,0.4)' : '0 8px 28px var(--accent-glow), 0 4px 12px rgba(0,0,0,0.4)',
          transition:'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: open ? 'rotate(0deg)' : 'rotate(0deg)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform='scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
      >
        {open ? '✕' : '⚡'}
        {!open && unread > 0 && (
          <span style={{
            position:'absolute', top:-4, right:-4,
            width:20, height:20, borderRadius:'50%',
            background:'var(--red)', color:'#fff',
            fontFamily:'var(--font-mono)', fontSize:10,
            display:'flex', alignItems:'center', justifyContent:'center',
            animation:'badgePulse 1.5s ease infinite',
            border:'2px solid var(--bg-base)',
          }}>{unread}</span>
        )}
      </button>
    </>
  )
}

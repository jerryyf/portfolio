'use client'

import { useEffect, useRef, useState } from 'react'

const commands = ['about', 'credentials', 'links', 'contact', 'help', 'clear'] as const
type Command = (typeof commands)[number]
type Entry = { id: number; input: string; command: Command | 'unknown' }
type Theme = 'green' | 'amber' | 'white'

function normalizeCommand(value: string) {
  return value.trim().toLowerCase().replace(/^\.\//, '')
}

const badges = [
  { id: '9836a4d5-2be7-4b7f-937b-32eb99e839b3', name: 'AWS Certified Cloud Practitioner' },
  { id: '0a8c9684-b7f1-4376-88f1-7086876e96cb', name: 'AWS Certified Developer - Associate' },
  { id: 'fb6b9b44-a261-414c-822c-38bab83fef65', name: 'CKA: Certified Kubernetes Administrator' },
  { id: 'd2fedfdd-09ec-4f56-a472-e7e0f9a529eb', name: 'ICA: Istio Certified Associate' },
]

function Output({ command }: { command: Entry['command'] }) {
  switch (command) {
    case 'about':
      return (
        <div className="command-output">
          <p>Platform engineer. Security first. Vim enjoyer.</p>
          <a href="https://jerryyf.github.io">blog ↗</a>
        </div>
      )
    case 'credentials':
      return (
        <div className="command-output">
          <h2>Credly</h2>
          <div className="credential-links">
            {badges.map(({ id, name }) => (
              <a key={id} href={`https://www.credly.com/badges/${id}/public_url`} target="_blank" rel="noopener noreferrer">
                {name} ↗
              </a>
            ))}
          </div>
        </div>
      )
    case 'links':
      return (
        <div className="command-output link-output">
          <a href="https://github.com/jerryyf" target="_blank" rel="noopener noreferrer">GitHub <span>github.com/jerryyf ↗</span></a>
          <a href="https://jerryyf.github.io" target="_blank" rel="noopener noreferrer">Blog <span>jerryyf.github.io ↗</span></a>
          <a href="https://github.com/jerryyf/jerryyf.dev" target="_blank" rel="noopener noreferrer">Source <span>view source code ↗</span></a>
        </div>
      )
    case 'contact':
      return (
        <div className="command-output">
          <a href="mailto:contact@jerryyf.dev">contact@jerryyf.dev ↗</a>
        </div>
      )
    case 'help':
      return (
        <div className="command-output">
          <dl className="help-list">
            <dt>about</dt><dd>Bio</dd>
            <dt>credentials</dt><dd>Credly badges</dd>
            <dt>links</dt><dd>GitHub, blog, source</dd>
            <dt>contact</dt><dd>Email</dd>
            <dt>clear</dt><dd>Clear output</dd>
            <dt>help</dt><dd>Commands & shortcuts</dd>
          </dl>
          <p className="terminal-muted">Tab to complete · ↑ ↓ command history · Ctrl/Cmd + L to clear</p>
        </div>
      )
    case 'unknown':
      return <p className="command-output">Command not found. Type <strong>help</strong> to see available commands.</p>
    case 'clear':
      return null
  }
}

export default function Terminal({ initialCommand }: { initialCommand?: Command }) {
  const [theme, setTheme] = useState<Theme>('green')
  const [input, setInput] = useState('')
  const [entries, setEntries] = useState<Entry[]>(
    initialCommand ? [{ id: 0, input: initialCommand, command: initialCommand }] : []
  )
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [draft, setDraft] = useState('')
  const screenRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)
  const shouldScroll = useRef(false)

  useEffect(() => {
    if (shouldScroll.current) {
      const screen = screenRef.current
      if (screen) screen.scrollTop = screen.scrollHeight
      shouldScroll.current = false
    }
  }, [entries])

  function execute(value: string) {
    const text = value.trim()
    if (!text) return
    const normalized = normalizeCommand(text)
    const command = commands.find((item) => item === normalized) ?? 'unknown'
    setHistory((previous) => [...previous, text])
    setHistoryIndex(null)
    setInput('')
    shouldScroll.current = true
    if (command === 'clear') {
      setEntries([])
    } else {
      setEntries((previous) => [...previous, { id: nextId.current++, input: text, command }])
    }
  }

  return (
    <div className={`terminal theme-${theme}`}>
      <div className="terminal-settings">
        <div className="theme-picker" role="group" aria-label="Phosphor color">
          {(['green', 'amber', 'white'] as const).map((color) => (
            <button key={color} type="button" className={`theme-swatch swatch-${color}`} aria-label={`${color} phosphor`} aria-pressed={theme === color} onClick={() => setTheme(color)} />
          ))}
        </div>
      </div>
      <div className="terminal-glass">
        <div className="terminal-content" ref={screenRef} tabIndex={0} role="region" aria-label="Terminal screen">
          <div className="welcome">
            <h1>jerryyf<span className="hero-cursor" aria-hidden="true">_</span></h1>
            <p className="hero-description">Platform engineer.<br className="mobile-break" /> Security first. Vim enjoyer.</p>
          </div>
          <div className="command-menu" aria-label="Quick commands">
            {commands.filter((command) => command !== 'clear').map((command) => (
              <button type="button" key={command} onClick={() => execute(command)}>
                {command}
              </button>
            ))}
          </div>
          <div className="transcript" role="log" aria-label="Command output" aria-live="polite" aria-relevant="additions">
            {entries.map((entry) => (
              <div className="terminal-entry" key={entry.id}>
                <p className="executed-command"><span className="prompt-prefix">guest@jerryyf:~$</span> {entry.input}</p>
                <Output command={entry.command} />
              </div>
            ))}
          </div>
          <form className="command-prompt" onSubmit={(event) => { event.preventDefault(); execute(input) }}>
            <label htmlFor="terminal-command" className="prompt-prefix">guest@jerryyf:~$</label>
            <input
              id="terminal-command"
              aria-label="Terminal command"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="go"
              placeholder="type a command"
              value={input}
              onChange={(event) => { setInput(event.target.value); setHistoryIndex(null) }}
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing) return
                if (event.key === 'Tab' && input.trim()) {
                  const matches = commands.filter((command) => command.startsWith(normalizeCommand(input)))
                  if (matches.length === 1) {
                    event.preventDefault()
                    setInput(`${input.trim().startsWith('./') ? './' : ''}${matches[0]}`)
                  }
                }
                if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'l') {
                  event.preventDefault()
                  setEntries([])
                }
                if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && history.length) {
                  event.preventDefault()
                  if (historyIndex === null) setDraft(input)
                  const next = event.key === 'ArrowUp'
                    ? Math.max(0, (historyIndex ?? history.length) - 1)
                    : Math.min(history.length, (historyIndex ?? history.length) + 1)
                  setHistoryIndex(next === history.length ? null : next)
                  setInput(next === history.length ? draft : history[next])
                }
              }}
            />
            <button type="submit" className="enter-button" aria-label="Run command">↵</button>
          </form>
        </div>
      </div>
    </div>
  )
}

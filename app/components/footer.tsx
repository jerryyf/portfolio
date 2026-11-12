export default function Footer() {
  return (
    <footer className="monitor-footer">
      <div className="hardware-label"><span className="power-light" aria-hidden="true" /><span>© {new Date().getFullYear()} · MIT</span></div>
      <div className="hardware-right"><a href="https://github.com/jerryyf/jerryyf.dev" target="_blank" rel="noopener noreferrer">source ↗</a><span className="monitor-dial" aria-hidden="true" /></div>
    </footer>
  )
}

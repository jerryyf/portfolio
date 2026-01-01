import { observe } from './lib/observe'
import { TypeWriter } from './components/typewriter'
import { Background } from './components/background'
import CredlyBadge from 'app/components/credlyBadge'

export default function Page() {
  observe()
  return (
    <section className="-scroll-mt-px flex-grow font-mono">
      <Background />
      <h1 className="mt-16 text-4xl font-bold font-mono">
        jerryyf
      </h1>
      <div className="mt-16 font-mono">
        <TypeWriter />
      </div>
      <script src="https://cdn.jsdelivr.net/npm/@tsparticles/preset-links@3/tsparticles.preset.links.min.js"></script>
    </section>
  )
}

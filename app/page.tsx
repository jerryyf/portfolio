import Terminal from './components/terminal'
import { observe } from './lib/observe'

export default function Page() {
  observe()
  return <Terminal />
}

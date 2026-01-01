import CredlyBadge from "app/components/credlyBadge"
import { Background } from "app/components/background"

export const metadata = {
  title: 'about',
  description: 'About me.',
}

export default function Page() {
  return (
    <section>
      <Background />
      <h1 className="font-semibold font-mono text-2xl mb-8">about</h1>
      <p className="mb-8 font-mono">
        {`Bachelor of Computer Science - Security Engineering`}
      </p>
      <p className="mb-4 font-mono">
        {`Enqueries: noreply [at] jerryyf [dot] dev`}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">

        <div className="flex gap-4 mb-4">
          <div className="my-8">
            <CredlyBadge badgeId={"9836a4d5-2be7-4b7f-937b-32eb99e839b3"} />
          </div>
          <div className="my-8">
            <CredlyBadge badgeId={"0a8c9684-b7f1-4376-88f1-7086876e96cb"} />
          </div>
          <div className="my-8">
            <CredlyBadge badgeId={"fb6b9b44-a261-414c-822c-38bab83fef65"} />
          </div>
          <div className="my-8">
            <CredlyBadge badgeId={"d2fedfdd-09ec-4f56-a472-e7e0f9a529eb"} />
          </div>
        </div>
      </div>
    </section>

  )
}

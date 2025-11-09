export const metadata = {
  title: 'about',
  description: 'About me.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold font-mono text-2xl mb-8">about</h1>
      <p className="mb-8 font-mono">
        {`Bachelor of Computer Science - Security Engineering`}
      </p>
      <p className="mb-4 font-mono">
        {`Enqueries: noreply [at] jerryyf [dot] dev`}
      </p>
    </section>
  )
}

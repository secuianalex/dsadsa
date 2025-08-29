import Link from "next/link"
import MarkCompleteButton from "@/components/MarkCompleteButton"

async function getFreestyle(levelId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/freestyle/${levelId}`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load freestyle")
  const data = await res.json()
  return data.freestyle as { id: string; prompt: string }
}

export default async function FreestylePage({ params }: { params: { id: string } }) {
  const freestyle = await getFreestyle(params.id)

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      {/* header */}
      <header className="card p-6">
        <h1 className="text-2xl font-bold">Freestyle Project</h1>
        <p className="text-gray-600">
          Unlocked after finishing the level. Combine everything you’ve learned.
        </p>
      </header>

      {/* prompt */}
      <article className="card p-6 prose max-w-none">
        <h2 className="text-xl font-semibold">Your creative brief</h2>
        <p className="whitespace-pre-wrap">{freestyle.prompt}</p>
        <div className="mt-4 flex gap-3 flex-wrap">
          <MarkCompleteButton kind="freestyle" id={freestyle.id} />
          <Link href="/languages" className="btn">Back to Languages</Link>
        </div>
      </article>

      {/* ideas */}
      <aside className="card p-4 text-sm text-gray-700">
        <h3 className="font-semibold mb-1">Ideas to explore</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>Add one feature you haven’t tried yet (e.g., input validation, persistence, or CLI flags).</li>
          <li>Refactor repetitive code into functions/modules.</li>
          <li>Write a short README with “how to run” and screenshots.</li>
        </ul>
      </aside>
    </section>
  )
}

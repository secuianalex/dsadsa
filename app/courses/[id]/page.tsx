import Link from "next/link"
import MarkCompleteButton from "@/components/MarkCompleteButton"
import { prisma } from "@/lib/prisma"

async function getExam(courseId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/exam/${courseId}`,
    { cache: "no-store" }
  )
  if (!res.ok) throw new Error("Failed to load exam")
  const data = await res.json()
  return data.exam as { id: string; prompt: string }
}

export default async function ExamPage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: { level: { include: { language: true } } },
  })
  if (!course) return <div className="p-6">Course not found.</div>

  const exam = await getExam(course.id)

  return (
    <section className="max-w-3xl mx-auto space-y-6">
      {/* breadcrumb */}
      <nav className="text-sm text-gray-600">
        <Link href="/languages" className="underline">Languages</Link>
        <span> / </span>
        <span>{course.level.language.name}</span>
        <span> / </span>
        <Link href={`/courses/${course.id}`} className="underline">{course.title}</Link>
        <span> / </span>
        <span className="font-medium">Exam</span>
      </nav>

      {/* header */}
      <header className="card p-6">
        <h1 className="text-2xl font-bold">Exam Project</h1>
        <p className="text-gray-600">
          {course.level.language.name} — Level {course.level.number}
        </p>
      </header>

      {/* prompt */}
      <article className="card p-6 prose max-w-none">
        <h2 className="text-xl font-semibold">Your challenge</h2>
        <p className="whitespace-pre-wrap">{exam.prompt}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <MarkCompleteButton kind="exam" id={exam.id} />
          <Link href={`/courses/${course.id}`} className="btn">Back to course</Link>
        </div>
      </article>

      {/* tips */}
      <aside className="card p-4 text-sm text-gray-700">
        <h3 className="font-semibold mb-1">Tips</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>Start by outlining inputs/outputs and success criteria.</li>
          <li>Build the core logic first; polish later.</li>
          <li>Test with a few manual examples or unit tests.</li>
        </ul>
      </aside>
    </section>
  )
}

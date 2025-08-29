import MarkCompleteButton from "@/components/MarkCompleteButton"
import { prisma } from "@/lib/prisma"

async function getExam(courseId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/exam/${courseId}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to load exam")
  const data = await res.json()
  return data.exam
}

export default async function ExamPage({ params }: { params: { id: string } }) {
  const course = await prisma.course.findUnique({ where: { id: params.id } })
  if (!course) return <div className="card">Course not found</div>
  const exam = await getExam(course.id)

  return (
    <section className="space-y-4">
      <div className="card">
        <h1 className="text-2xl font-bold">Exam Project</h1>
        <p className="text-gray-700 whitespace-pre-wrap">{exam.prompt}</p>
        <div className="mt-4">
          <MarkCompleteButton kind="exam" id={exam.id} />
        </div>
      </div>
    </section>
  )
}

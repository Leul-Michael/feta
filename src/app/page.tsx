import Container from "@/components/container"
import dynamic from "next/dynamic"

const Board = dynamic(() => import("@/components/board"), {
  ssr: false,
})

export default function Home() {
  return (
    <section className="flex flex-col w-full h-full min-h-screen py-10">
      <Container className="flex-col justify-center">
        <Board />
      </Container>
    </section>
  )
}

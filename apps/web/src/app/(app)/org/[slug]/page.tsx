import { Header } from '@/components/header'

// TO DO => criar layout dinamico para reaproveitamendo devido a componentes que precisam ser re renderizados

export default async function Projects() {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px]">Select a Project</main>
    </div>
  )
}

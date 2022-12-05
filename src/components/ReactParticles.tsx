import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import type { Container, Engine } from 'tsparticles-engine'

const ReactParticles: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log(container)
  }, [])

  return (
    <Particles
      id="particles"
      url="/particles.json"
      init={particlesInit}
      loaded={particlesLoaded}
    />
  )
}
export default ReactParticles

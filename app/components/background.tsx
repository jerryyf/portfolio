'use client'

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { type Engine, type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const options: ISourceOptions = {
  fpsLimit: 30,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "connect",
      },
    },
    modes: {
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 100,
        duration: 0.5,
      },
      connect: {
        distance: 100,
        radius: 100,
        links: {
          opacity: 1
        },
      },
    },
  },
  particles: {
    color: {
      value: "#fc3c3c",
    },
    links: {
      color: "#fc9c3c",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: MoveDirection.none,
      enable: true,
      outModes: {
        default: OutMode.out,
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
      },
      value: 40,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 2, max: 4 },
    },
  },
  detectRetina: true,
};

async function initializeParticles(engine: Engine) {
  await loadSlim(engine);
}

export const Background = () => {
  return (
    <ParticlesProvider init={initializeParticles}>
      <Particles id="tsparticles" options={options} />
    </ParticlesProvider>
  );
};

"use client";

import {useParticleNetwork} from "@/components/animation/use-particle-network";

type ParticleNetworkProps = {
  className?: string;
};

/**
 * Thin presentation wrapper for the particle network engine.
 *
 * All simulation lifecycle and rendering logic live inside `useParticleNetwork`.
 */
export function ParticleNetwork({className}: ParticleNetworkProps) {
  const canvasRef = useParticleNetwork();

  return (
    // Decorative visual layer only; no semantic content for assistive tech.
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

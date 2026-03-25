"use client";

import {useParticleNetwork} from "@/components/animation/use-particle-network";

/**
 * Component rendering a particle network animation on a canvas element, using the `useParticleNetwork` hook for all simulation and rendering logic.
 */
type ParticleNetworkProps = {
  className?: string;
  motionScale?: number;
  disablePointer?: boolean;
  staticMode?: boolean;
};

/**
 * Thin presentation wrapper for the particle network engine.
 *
 * All simulation lifecycle and rendering logic live inside `useParticleNetwork`.
 */
export function ParticleNetwork({
  className,
  motionScale,
  disablePointer,
  staticMode,
}: ParticleNetworkProps) {
  const canvasRef = useParticleNetwork({motionScale, disablePointer, staticMode});

  return (
    // Decorative visual layer only; no semantic content for assistive tech.
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

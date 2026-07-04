"use client";

import {useSyncExternalStore} from "react";
import {useParticleNetwork} from "@/components/animation/use-particle-network";

const largeScreenQuery = "(min-width: 80rem)";

function subscribeToLargeScreenChanges(onChange: () => void) {
  const media = window.matchMedia(largeScreenQuery);

  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getLargeScreenSnapshot() {
  return window.matchMedia(largeScreenQuery).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Component rendering a particle network animation on a canvas element, using the `useParticleNetwork` hook for all simulation and rendering logic.
 */
type ParticleNetworkProps = {
  className?: string;
};

/**
 * Thin presentation wrapper for the particle network engine.
 *
 * All simulation lifecycle and rendering logic live inside `useParticleNetwork`.
 */
export function ParticleNetwork({className}: ParticleNetworkProps) {
  const shouldRender = useSyncExternalStore(
    subscribeToLargeScreenChanges,
    getLargeScreenSnapshot,
    getServerSnapshot
  );

  if (!shouldRender) {
    return null;
  }

  return <ParticleNetworkCanvas className={className} />;
}

function ParticleNetworkCanvas({className}: ParticleNetworkProps) {
  const canvasRef = useParticleNetwork();

  return (
    // Decorative visual layer only; no semantic content for assistive tech.
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

"use client";

import {useSyncExternalStore} from "react";
import {useParticleNetwork} from "@/components/animation/use-particle-network";
import {particleNetworkConfig} from "@/lib/animation/particle-network-config";

const largeScreenQuery = "(min-width: 80rem)";
const reducedMotionQuery = particleNetworkConfig.particleNetwork.reducedMotionQuery;

function subscribeToVisualPreferenceChanges(onChange: () => void) {
  const largeScreenMedia = window.matchMedia(largeScreenQuery);
  const reducedMotionMedia = window.matchMedia(reducedMotionQuery);

  largeScreenMedia.addEventListener("change", onChange);
  reducedMotionMedia.addEventListener("change", onChange);

  return () => {
    largeScreenMedia.removeEventListener("change", onChange);
    reducedMotionMedia.removeEventListener("change", onChange);
  };
}

function getVisualPreferenceSnapshot() {
  return (
    window.matchMedia(largeScreenQuery).matches && !window.matchMedia(reducedMotionQuery).matches
  );
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
    subscribeToVisualPreferenceChanges,
    getVisualPreferenceSnapshot,
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

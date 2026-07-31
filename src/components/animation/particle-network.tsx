"use client";

import {useSyncExternalStore} from "react";
import {useParticleNetwork} from "@/components/animation/use-particle-network";
import {animationTimings} from "@/lib/animation/animation-timings";

const largeScreenQuery = "(min-width: 80rem)";
const reducedMotionQuery = animationTimings.scrollRevealDefaults.reducedMotionQuery;
const particleNetworkClassName =
  "pointer-events-none absolute inset-0 hidden [mask-image:linear-gradient(to_right,black_0%,black_16%,rgba(0,0,0,0.3)_32%,rgba(0,0,0,0.3)_68%,black_84%,black_100%)] opacity-25 xl:block";

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
 * Thin presentation wrapper for the particle network engine.
 *
 * All simulation lifecycle and rendering logic live inside `useParticleNetwork`.
 */
export function ParticleNetwork() {
  const shouldRender = useSyncExternalStore(
    subscribeToVisualPreferenceChanges,
    getVisualPreferenceSnapshot,
    getServerSnapshot
  );

  if (!shouldRender) {
    return null;
  }

  return <ParticleNetworkCanvas />;
}

function ParticleNetworkCanvas() {
  const canvasRef = useParticleNetwork();

  return (
    // Decorative visual layer only; no semantic content for assistive tech.
    <div className={particleNetworkClassName} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

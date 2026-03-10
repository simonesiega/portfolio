"use client";

import { useEffect, useRef } from "react";
import { particleNetworkConfig } from "@/lib/animation/particle-network-config";
import { updatePointerStateFromEvent, clearPointerState } from "@/lib/animation/particle-network/events";
import { clamp, randomInt } from "@/lib/animation/particle-network/math";
import { drawFrame } from "@/lib/animation/particle-network/rendering";
import { spawnDustParticle, spawnParticle } from "@/lib/animation/particle-network/spawning";
import type {
  CanvasBounds,
  DustParticle,
  NetworkColors,
  Particle,
  Point,
  PointerState,
} from "@/lib/animation/particle-network/types";

const { particleNetwork } = particleNetworkConfig;
const {
  reducedMotionQuery,
  density,
  rendering,
  spawning,
} = particleNetwork;

/**
 * Mutable runtime container for the particle engine.
 *
 * Kept inside a ref to avoid React re-renders for every animation frame.
 */
type ParticleNetworkState = {
  animationFrame: number;
  boundsAnimationFrame: number;
  isCanvasVisible: boolean;
  previousTime: number;
  dimensions: { width: number; height: number };
  canvasBounds: CanvasBounds;
  colors: NetworkColors;
  particles: Particle[];
  dustParticles: DustParticle[];
  pointer: PointerState;
  centers: Point[];
  reducedMotion: boolean;
};

/**
 * Creates the initial engine state before canvas/context are available.
 */
function createInitialState(): ParticleNetworkState {
  return {
    animationFrame: 0,
    boundsAnimationFrame: 0,
    isCanvasVisible: true,
    previousTime: performance.now(),
    dimensions: { width: 0, height: 0 },
    canvasBounds: {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    },
    colors: {
      pointRgb: rendering.defaultColors.pointRgb,
      linkRgb: rendering.defaultColors.linkRgb,
      dustRgb: rendering.defaultColors.dustRgb,
    },
    particles: [],
    dustParticles: [],
    pointer: { x: 0, y: 0, active: false },
    centers: [],
    reducedMotion: false,
  };
}

/**
 * Initializes and controls the canvas-based particle engine.
 *
 * The hook owns:
 * - canvas sizing and DPR scaling
 * - particle lifecycle initialization
 * - animation loop start/stop
 * - viewport/theme/reduced-motion synchronization
 * - interaction listeners and cleanup
 */
export function useParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<ParticleNetworkState>(createInitialState());

  // The main effect sets up the canvas and engine, and cleans up on unmount.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    // Access mutable state for the engine lifecycle.
    const state = stateRef.current;

    // Listen to reduced motion preference early to initialize with correct particle counts.
    const reducedMotionMedia = window.matchMedia(reducedMotionQuery);

    // Target a consistent frame rate to balance smoothness and CPU load.
    const targetFrameMs = 1000 / rendering.targetFps;

    state.reducedMotion = reducedMotionMedia.matches;

    // Reads CSS variables from the active theme and updates runtime draw colors.
    const syncNetworkColors = () => {
      const styles = getComputedStyle(document.documentElement);
      state.colors = {
        pointRgb:
          styles.getPropertyValue("--network-point-rgb").trim() ||
          rendering.defaultColors.pointRgb,
        linkRgb:
          styles.getPropertyValue("--network-link-rgb").trim() ||
          rendering.defaultColors.linkRgb,
        dustRgb:
          styles.getPropertyValue("--network-dust-rgb").trim() ||
          rendering.defaultColors.dustRgb,
      };
    };

    // Caches canvas bounds used to map global pointer events to local coordinates.
    const syncCanvasBounds = () => {
      const bounds = canvas.getBoundingClientRect();
      state.canvasBounds = {
        left: bounds.left,
        top: bounds.top,
        width: bounds.width,
        height: bounds.height,
      };
      return bounds;
    };

    // Matches backing canvas resolution to current size and device pixel ratio.
    const resizeCanvas = () => {
      const bounds = syncCanvasBounds();
      // Use integer CSS pixels for stable simulation space.
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      // Cap DPR to avoid very high fill-rate cost on dense mobile displays.
      const dpr = Math.min(window.devicePixelRatio || 1, rendering.maxDevicePixelRatio);

      state.dimensions = { width, height };
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Rebuilds particles and dust after resize/theme/motion preference changes.
    const initParticles = () => {
      const { width, height } = state.dimensions;
      const area = width * height;

      // Keep particle count proportional to canvas area, within safe bounds.
      const baseCount = clamp(
        Math.round(area * density.baseParticles),
        density.minParticles,
        density.maxParticles,
      );

      // Reduce counts more aggressively when motion is reduced to keep the effect present but lightweight.
      const particleCount = state.reducedMotion
        ? Math.max(
            // Reduced motion keeps the effect present, but significantly lighter.
            density.reducedMotionMinParticles,
            Math.round(baseCount * density.reducedMotionParticleFactor),
          )
        : baseCount;
        
      // Dust is more performance-sensitive than main particles, so reduce it more when motion is reduced.  
      const dustCount = state.reducedMotion
        ? Math.max(
            density.reducedMotionMinDust,
            Math.round(area * density.baseDust * density.reducedMotionDustFactor),
          )
        : Math.max(density.minDust, Math.round(area * density.baseDust));

      // Generate new particle clusters and randomize positions for all particles and dust.
      state.centers = Array.from(
        {
          length: randomInt(
            spawning.clusterCenterCountMin,
            spawning.clusterCenterCountMax,
          ),
        },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
        }),
      );

      // Spawn main particles with awareness of pointer and cluster centers for more dynamic initial positions.
      state.particles = Array.from({ length: particleCount }, () =>
        spawnParticle({
          width,
          height,
          centers: state.centers,
          pointer: state.pointer,
          pointerBias: false,
        }),
      );

      // Spawn dust particles with a stronger bias towards pointer and cluster centers to create a more interactive and lively background effect, especially on larger screens where more dust can be used without overwhelming performance.
      state.dustParticles = Array.from({ length: dustCount }, () =>
        spawnDustParticle(width, height),
      );
    };

    // The engine runs only when visible and in a foreground tab.
    const shouldRunAnimation = () =>
      state.isCanvasVisible && !document.hidden && !state.reducedMotion;

    // Renders a single static frame without starting the loop, used for reduced-motion mode and after theme changes.
    const renderStaticFrame = () => {
      drawFrame({
        context,
        width: state.dimensions.width,
        height: state.dimensions.height,
        dt: 0,
        particles: state.particles,
        dustParticles: state.dustParticles,
        pointer: state.pointer,
        reducedMotion: state.reducedMotion,
        centers: state.centers,
        colors: state.colors,
      });
    };

    // Main render loop throttled to target FPS.
    const frame = (time: number) => {
      if (!shouldRunAnimation()) {
        state.animationFrame = 0;
        return;
      }

      const elapsed = time - state.previousTime;
      if (elapsed < targetFrameMs) {
        // Skip heavy work until we reach the configured frame budget.
        state.animationFrame = window.requestAnimationFrame(frame);
        return;
      }

      // Clamp dt to prevent simulation explosions after tab pauses or jank spikes.
      const dt = Math.min(elapsed / 1000, 0.05);
      state.previousTime = time;

      drawFrame({
        context,
        width: state.dimensions.width,
        height: state.dimensions.height,
        dt,
        particles: state.particles,
        dustParticles: state.dustParticles,
        pointer: state.pointer,
        reducedMotion: state.reducedMotion,
        centers: state.centers,
        colors: state.colors,
      });

      state.animationFrame = window.requestAnimationFrame(frame);
    };

    // Starts the loop only when eligible and not already running.
    const startAnimation = () => {
      if (!shouldRunAnimation() || state.animationFrame !== 0) {
        return;
      }

      // Reset timeline to avoid one huge first delta on resume.
      state.previousTime = performance.now();
      state.animationFrame = window.requestAnimationFrame(frame);
    };

    // Stops the loop and clears RAF handle.
    const stopAnimation = () => {
      if (state.animationFrame === 0) {
        return;
      }

      window.cancelAnimationFrame(state.animationFrame);
      state.animationFrame = 0;
    };

    // Handles pointer interaction from global events.
    const handlePointerMove = (event: PointerEvent) => {
      updatePointerStateFromEvent(event, state.canvasBounds, state.pointer);
    };

    // Resets pointer interaction state.
    const clearPointer = () => {
      clearPointerState(state.pointer);
    };

    // Batches expensive bounds sync calls to one per frame during scroll.
    const syncBoundsOnNextFrame = () => {
      if (state.boundsAnimationFrame !== 0) {
        return;
      }

      state.boundsAnimationFrame = window.requestAnimationFrame(() => {
        state.boundsAnimationFrame = 0;
        syncCanvasBounds();
      });
    };

    // Re-initializes particle counts when reduced-motion preference changes.
    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      state.reducedMotion = event.matches;
      initParticles();

      // If motion is now reduced, stop the loop and render a single static frame. Otherwise, start the loop to resume animation.
      if (state.reducedMotion) {
        stopAnimation();
        renderStaticFrame();
        return;
      }

      // On enabling motion, reset timeline to avoid huge first delta and start the loop.
      startAnimation();
    };

    // Suspends work in background tabs and resumes when visible again.
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearPointer();
        stopAnimation();
        return;
      }

      startAnimation();
    };

    const resizeObserver = new ResizeObserver(() => {
      // Recompute canvas backing size and regenerate particles for new area.
      resizeCanvas();
      initParticles();

      // If motion is reduced, render a static frame after resize to reflect the new layout without starting the animation loop.
      if (state.reducedMotion) {
        renderStaticFrame();
      }
    });

    // Observes theme changes to update colors and re-render static frame if motion is reduced.
    const themeObserver = new MutationObserver(() => {
      syncNetworkColors();

      // Re-render a static frame on theme change when motion is reduced to reflect new colors without needing to start the animation loop.
      if (state.reducedMotion) {
        renderStaticFrame();
      }
    });

    // Observes canvas visibility to pause the loop when offscreen and avoid unnecessary CPU/battery usage, especially on mobile.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        state.isCanvasVisible = entry.isIntersecting;

        if (!state.isCanvasVisible) {
          // Offscreen canvas: stop loop to save CPU and battery.
          clearPointer();
          stopAnimation();
          return;
        }

        // On re-entry, refresh bounds before resuming interaction/rendering.
        syncCanvasBounds();
        startAnimation();
      },
      // Treat barely visible canvas as visible to avoid frequent thrashing.
      { threshold: 0.01 },
    );

    // Start observing as early as possible to keep state in sync with layout/theme.
    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    reducedMotionMedia.addEventListener("change", handleReducedMotionChange);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", clearPointer);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("scroll", syncBoundsOnNextFrame, { passive: true });

    resizeCanvas();
    syncNetworkColors();
    initParticles();

    // If reduced motion is preferred, render a single static frame to show the effect without starting the animation loop.
    if (state.reducedMotion) {
      renderStaticFrame();
    }
    startAnimation();

    // Full teardown to avoid leaking observers/listeners between route changes.
    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      reducedMotionMedia.removeEventListener("change", handleReducedMotionChange);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", clearPointer);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("scroll", syncBoundsOnNextFrame);
      window.cancelAnimationFrame(state.boundsAnimationFrame);
      state.boundsAnimationFrame = 0;
    };
  }, []);

  return canvasRef;
}

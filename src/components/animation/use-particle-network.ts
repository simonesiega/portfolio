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

export function useParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<ParticleNetworkState>(createInitialState());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      return;
    }

    const state = stateRef.current;
    const reducedMotionMedia = window.matchMedia(reducedMotionQuery);
    const targetFrameMs = 1000 / rendering.targetFps;

    state.reducedMotion = reducedMotionMedia.matches;

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

    const resizeCanvas = () => {
      const bounds = syncCanvasBounds();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      const dpr = Math.min(window.devicePixelRatio || 1, rendering.maxDevicePixelRatio);

      state.dimensions = { width, height };
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      const { width, height } = state.dimensions;
      const area = width * height;

      const baseCount = clamp(
        Math.round(area * density.baseParticles),
        density.minParticles,
        density.maxParticles,
      );

      const particleCount = state.reducedMotion
        ? Math.max(
            density.reducedMotionMinParticles,
            Math.round(baseCount * density.reducedMotionParticleFactor),
          )
        : baseCount;

      const dustCount = state.reducedMotion
        ? Math.max(
            density.reducedMotionMinDust,
            Math.round(area * density.baseDust * density.reducedMotionDustFactor),
          )
        : Math.max(density.minDust, Math.round(area * density.baseDust));

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

      state.particles = Array.from({ length: particleCount }, () =>
        spawnParticle({
          width,
          height,
          centers: state.centers,
          pointer: state.pointer,
          pointerBias: false,
        }),
      );

      state.dustParticles = Array.from({ length: dustCount }, () =>
        spawnDustParticle(width, height),
      );
    };

    const shouldRunAnimation = () => state.isCanvasVisible && !document.hidden;

    const frame = (time: number) => {
      if (!shouldRunAnimation()) {
        state.animationFrame = 0;
        return;
      }

      const elapsed = time - state.previousTime;
      if (elapsed < targetFrameMs) {
        state.animationFrame = window.requestAnimationFrame(frame);
        return;
      }

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

    const startAnimation = () => {
      if (!shouldRunAnimation() || state.animationFrame !== 0) {
        return;
      }

      state.previousTime = performance.now();
      state.animationFrame = window.requestAnimationFrame(frame);
    };

    const stopAnimation = () => {
      if (state.animationFrame === 0) {
        return;
      }

      window.cancelAnimationFrame(state.animationFrame);
      state.animationFrame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointerStateFromEvent(event, state.canvasBounds, state.pointer);
    };

    const clearPointer = () => {
      clearPointerState(state.pointer);
    };

    const syncBoundsOnNextFrame = () => {
      if (state.boundsAnimationFrame !== 0) {
        return;
      }

      state.boundsAnimationFrame = window.requestAnimationFrame(() => {
        state.boundsAnimationFrame = 0;
        syncCanvasBounds();
      });
    };

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      state.reducedMotion = event.matches;
      initParticles();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearPointer();
        stopAnimation();
        return;
      }

      startAnimation();
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      initParticles();
    });

    const themeObserver = new MutationObserver(syncNetworkColors);
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        state.isCanvasVisible = entry.isIntersecting;

        if (!state.isCanvasVisible) {
          clearPointer();
          stopAnimation();
          return;
        }

        syncCanvasBounds();
        startAnimation();
      },
      { threshold: 0.01 },
    );

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
    startAnimation();

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

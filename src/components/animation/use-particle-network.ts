"use client";

import {useEffect, useRef} from "react";
import {particleNetworkConfig} from "@/lib/animation/particle-network-config";
import {clamp, randomInt} from "@/lib/animation/particle-network/math";
import {drawFrame} from "@/lib/animation/particle-network/rendering";
import {spawnDustParticle, spawnParticle} from "@/lib/animation/particle-network/spawning";
import type {
  DustParticle,
  NetworkColors,
  Particle,
  Point,
} from "@/lib/animation/particle-network/types";

const {particleNetwork} = particleNetworkConfig;
const {reducedMotionQuery, density, rendering, spawning} = particleNetwork;
const slowMotionScale = 0.2;

/**
 * Mutable runtime container for the particle engine.
 *
 * Kept inside a ref to avoid React re-renders for every animation frame.
 */
type ParticleNetworkState = {
  animationFrame: number;
  isCanvasVisible: boolean;
  previousTime: number;
  dimensions: {width: number; height: number};
  colors: NetworkColors;
  particles: Particle[];
  dustParticles: DustParticle[];
  centers: Point[];
  reducedMotion: boolean;
};

/**
 * Creates the initial engine state before canvas/context are available.
 */
function createInitialState(): ParticleNetworkState {
  return {
    animationFrame: 0,
    isCanvasVisible: true,
    previousTime: performance.now(),
    dimensions: {width: 0, height: 0},
    colors: {
      pointRgb: rendering.defaultColors.pointRgb,
      linkRgb: rendering.defaultColors.linkRgb,
      dustRgb: rendering.defaultColors.dustRgb,
    },
    particles: [],
    dustParticles: [],
    centers: [],
    reducedMotion: false,
  };
}

/**
 * Initializes and controls the canvas-based particle engine used on projects and work pages.
 */
export function useParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<ParticleNetworkState>(createInitialState());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", {alpha: true});
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
          styles.getPropertyValue("--network-point-rgb").trim() || rendering.defaultColors.pointRgb,
        linkRgb:
          styles.getPropertyValue("--network-link-rgb").trim() || rendering.defaultColors.linkRgb,
        dustRgb:
          styles.getPropertyValue("--network-dust-rgb").trim() || rendering.defaultColors.dustRgb,
      };
    };

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.round(bounds.width));
      const height = Math.max(1, Math.round(bounds.height));
      const dpr = Math.min(window.devicePixelRatio || 1, rendering.maxDevicePixelRatio);

      state.dimensions = {width, height};
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      const {width, height} = state.dimensions;
      const area = width * height;
      const baseCount = clamp(
        Math.round(area * density.baseParticles),
        density.minParticles,
        density.maxParticles
      );

      const particleCount = state.reducedMotion
        ? Math.max(
            density.reducedMotionMinParticles,
            Math.round(baseCount * density.reducedMotionParticleFactor)
          )
        : baseCount;

      const dustCount = state.reducedMotion
        ? Math.max(
            density.reducedMotionMinDust,
            Math.round(area * density.baseDust * density.reducedMotionDustFactor)
          )
        : Math.max(density.minDust, Math.round(area * density.baseDust));

      state.centers = Array.from(
        {
          length: randomInt(spawning.clusterCenterCountMin, spawning.clusterCenterCountMax),
        },
        () => ({
          x: Math.random() * width,
          y: Math.random() * height,
        })
      );

      state.particles = Array.from({length: particleCount}, () =>
        spawnParticle({
          width,
          height,
          centers: state.centers,
        })
      );
      state.dustParticles = Array.from({length: dustCount}, () => spawnDustParticle(width, height));
    };

    const shouldRunAnimation = () =>
      state.isCanvasVisible && !document.hidden && !state.reducedMotion;

    const renderStaticFrame = () => {
      drawFrame({
        context,
        width: state.dimensions.width,
        height: state.dimensions.height,
        dt: 0,
        particles: state.particles,
        dustParticles: state.dustParticles,
        centers: state.centers,
        colors: state.colors,
      });
    };

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

      const dt = Math.min(elapsed / 1000, 0.05) * slowMotionScale;
      state.previousTime = time;

      drawFrame({
        context,
        width: state.dimensions.width,
        height: state.dimensions.height,
        dt,
        particles: state.particles,
        dustParticles: state.dustParticles,
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

    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      state.reducedMotion = event.matches;
      initParticles();

      if (state.reducedMotion) {
        stopAnimation();
        renderStaticFrame();
        return;
      }

      startAnimation();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
        return;
      }

      startAnimation();
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      initParticles();

      if (state.reducedMotion) {
        renderStaticFrame();
      }
    });

    const themeObserver = new MutationObserver(() => {
      syncNetworkColors();

      if (state.reducedMotion) {
        renderStaticFrame();
      }
    });

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        state.isCanvasVisible = entry.isIntersecting;

        if (!state.isCanvasVisible) {
          stopAnimation();
          return;
        }

        startAnimation();
      },
      {threshold: 0.01}
    );

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    reducedMotionMedia.addEventListener("change", handleReducedMotionChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    resizeCanvas();
    syncNetworkColors();
    initParticles();

    if (state.reducedMotion) {
      renderStaticFrame();
      stopAnimation();
    } else {
      startAnimation();
    }

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      reducedMotionMedia.removeEventListener("change", handleReducedMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return canvasRef;
}

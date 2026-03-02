"use client";

import { useParticleNetwork } from "@/components/animation/use-particle-network";

type ParticleNetworkProps = {
  className?: string;
};

export function ParticleNetwork({ className }: ParticleNetworkProps) {
  const canvasRef = useParticleNetwork();

  return (
    <div className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

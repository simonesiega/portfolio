import type {
  CanvasBounds,
  PointerState,
} from "@/lib/animation/particle-network/types";

/**
 * Converts a global pointer event into canvas-local coordinates.
 *
 * If the pointer is outside current canvas bounds, interaction is disabled
 * for the current frame to avoid applying stale forces.
 */
export function updatePointerStateFromEvent(
  event: PointerEvent,
  bounds: CanvasBounds,
  pointerState: PointerState,
) {
  // Convert viewport coordinates to local canvas coordinates.
  const localX = event.clientX - bounds.left;
  const localY = event.clientY - bounds.top;

  const isInside =
    localX >= 0 && localX <= bounds.width && localY >= 0 && localY <= bounds.height;

  // If the pointer is outside the canvas, disable interaction for this frame to prevent applying forces based on stale coordinates.
  if (!isInside) {
    pointerState.active = false;
    return;
  }

  pointerState.x = localX;
  pointerState.y = localY;
  pointerState.active = true;
}

/**
 * Explicitly disables pointer-driven interaction.
 */
export function clearPointerState(pointerState: PointerState) {
  pointerState.active = false;
}

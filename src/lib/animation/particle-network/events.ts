import type {
  CanvasBounds,
  PointerState,
} from "@/lib/animation/particle-network/types";

export function updatePointerStateFromEvent(
  event: PointerEvent,
  bounds: CanvasBounds,
  pointerState: PointerState,
) {
  const localX = event.clientX - bounds.left;
  const localY = event.clientY - bounds.top;

  const isInside =
    localX >= 0 && localX <= bounds.width && localY >= 0 && localY <= bounds.height;

  if (!isInside) {
    pointerState.active = false;
    return;
  }

  pointerState.x = localX;
  pointerState.y = localY;
  pointerState.active = true;
}

export function clearPointerState(pointerState: PointerState) {
  pointerState.active = false;
}

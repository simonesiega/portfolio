"use client";

import {useSyncExternalStore} from "react";

const yearCheckIntervalMs = 60 * 60 * 1000;

function subscribe(onStoreChange: () => void) {
  const intervalId = window.setInterval(onStoreChange, yearCheckIntervalMs);
  return () => window.clearInterval(intervalId);
}

function getCurrentYear() {
  return new Date().getFullYear();
}

type CurrentYearProps = {
  initialYear: number;
};

export function CurrentYear({initialYear}: CurrentYearProps) {
  const currentYear = useSyncExternalStore(subscribe, getCurrentYear, () => initialYear);

  return <time dateTime={String(currentYear)}>{currentYear}</time>;
}

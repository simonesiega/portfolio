import type {WorkPageExperience} from "@/lib/config/text/work";

function toMonthIndex(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})$/);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);

  if (!Number.isFinite(year) || !Number.isFinite(month) || month < 1 || month > 12) {
    return null;
  }

  return year * 12 + (month - 1);
}

export function getOrderedWorkExperiences(experiences: readonly WorkPageExperience[]) {
  return [...experiences].sort((left, right) => {
    const leftMonthIndex = toMonthIndex(left.sortStart);
    const rightMonthIndex = toMonthIndex(right.sortStart);

    if (leftMonthIndex === null && rightMonthIndex === null) {
      return left.id.localeCompare(right.id);
    }

    if (leftMonthIndex === null) {
      return 1;
    }

    if (rightMonthIndex === null) {
      return -1;
    }

    return rightMonthIndex - leftMonthIndex;
  });
}

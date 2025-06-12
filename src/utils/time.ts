export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hourText = 'h';
  const minuteText = 'm';

  if (remainingMinutes === 0) {
    return `${hours}${hourText}`;
  }

  return `${hours}${hourText} ${remainingMinutes}${minuteText}`;
}

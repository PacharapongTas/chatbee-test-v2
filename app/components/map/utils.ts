export const calcPercentage = (total: number, progress: number) =>
  (progress / total) * 100;

export const calcLengthFromPercentage = (
  length: number,
  percentage: number
) => {
  return length * (percentage / 100);
};
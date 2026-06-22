const TASKS = [1, 2, 3, 4];

export function processData(input: number[]): number[] {
  const sanitized = input.filter((value) => Number.isFinite(value));
  return sanitized.map((value, index) => value + TASKS[index % TASKS.length]);
}

export function hasEnoughTasks(length: number): boolean {
  return length >= TASKS.length;
}

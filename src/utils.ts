export function str_contains(pattern: string, target: string) {
  return target.indexOf(pattern) !== -1;
}

export function str_contain_any(patterns: string[], target: string) {
  return patterns.some(p => str_contains(p, target));
}

export function compare_number(a: number, b: number): 1 | 0 | -1 {
  return a < b ? -1 : (a > b ? 1 : 0);
}

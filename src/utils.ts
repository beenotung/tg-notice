export function str_contains(pattern: string, target: string) {
  return target.indexOf(pattern) !== -1;
}

export function str_contain_any(patterns: string[], target: string) {
  return patterns.some(p => str_contains(p, target));
}

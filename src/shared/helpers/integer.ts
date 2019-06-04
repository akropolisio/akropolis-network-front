import { toFixed as _toFixed } from 'accounting';

export function toFixed(value: number, digits: number) {
  return _toFixed(value, digits);
}

export function difference(currentValue: number, changes: number) {
  const prevValue = currentValue - changes;
  return changes / prevValue * 100;
}

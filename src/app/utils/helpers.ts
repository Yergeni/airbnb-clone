/**
 * Converts a word to plural or singular
 */
export function pluralStringHandler(value: number, singularString: string, pluralString: string) {
  return value !== 1 ? `${value} ${pluralString}` : `${value} ${singularString}`;
}

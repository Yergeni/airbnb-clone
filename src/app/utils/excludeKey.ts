/**
 * Exclude keys from type/interface
 * @param object Object or collection to exlude keys from
 * @param keys An array of keys property to be excluded
 * @returns The object or collection with the indicated keys excluded
 */
export function excludeKey<T extends {[key: string]: unknown}, Key extends keyof T>(
	object: T,
  keys: Key[]
	): Omit<T, Key> {
		// @ts-ignore
		return Object.fromEntries(
		// @ts-ignore
    Object.entries(object).filter(([key]) => !keys.includes(key))
  )
}
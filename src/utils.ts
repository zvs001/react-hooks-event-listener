function findAvailableKey(obj: Record<string, any>, keys: string[]): string | undefined {
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (obj[key]) return key
  }
}

export default {
  findAvailableKey,
}

export function useTwwCacheWipe() {
  if (localStorage.getItem('characters')) {
    localStorage.clear()
  }
}

function useLocalStorage(name: string) {
  return localStorage.getItem(name);
}

export default useLocalStorage;

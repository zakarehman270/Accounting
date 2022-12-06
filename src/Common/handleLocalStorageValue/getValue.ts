export function handleGetLocalStorageValue(key: string) {
	let initialValue = null;
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : initialValue;
	} catch (err) {
		return initialValue;
	}
}

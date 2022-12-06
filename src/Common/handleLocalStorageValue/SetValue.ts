export function handleSetLocalStorageValue(key: string, value: any) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (err) {
		console.log(err);
	}
}

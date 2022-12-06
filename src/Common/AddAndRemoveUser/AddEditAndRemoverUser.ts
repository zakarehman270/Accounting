import { tableDataProps } from "../../Components/Data/TableData";
import { handleGetLocalStorageValue } from "../handleLocalStorageValue/getValue";
import { handleSetLocalStorageValue } from "../handleLocalStorageValue/SetValue";

function handlerUniqueId() {
	return parseInt(
		Math.ceil(Math.random() * Date.now())
			.toPrecision(4)
			.toString()
			.replace(".", "")
	);
}
export function handlerAddUser(data: { name: string; contact: number }) {
	let value = handleGetLocalStorageValue("Users");
	let UniqueIdUsers = handlerUniqueId();
	let UniqueIdDetails = handlerUniqueId();
	if (value === null) {
		value = [
			{
				name: data.name,
				id: UniqueIdUsers,
				contact: data.contact,
				photo: "",
				detail: [{ name: "", balance: 0, id: UniqueIdDetails }],
			},
		];
	} else {
		value.push({
			name: data.name,
			photo: "",
			contact: data.contact,
			id: UniqueIdUsers,
			detail: [],
		});
	}
	handleSetLocalStorageValue("Users", value);
}
export function handlerRemoveUser(Id: number) {
	let value: tableDataProps[] = handleGetLocalStorageValue("Users");
	const index = value.findIndex((prop) => prop.id === Id);
	if (index !== -1) {
		value.splice(index, 1);
	}
	handleSetLocalStorageValue("Users", value);
}
export function handlerEditUser(
	data: {
		name: string;
		contact: number;
	},
	Id: number
) {
	let value: tableDataProps[] = handleGetLocalStorageValue("Users");
	const index = value.findIndex((prop) => prop.id === Id);
	if (index !== -1) {
		value[index].contact = data.contact;
		value[index].name = data.name;
	}
	handleSetLocalStorageValue("Users", value);
}
export function handlerAddLoan(
	data: {
		name: string;
		balance: number;
	},
	Id: number
) {
	let value: tableDataProps[] = handleGetLocalStorageValue("Users");
	const index = value.findIndex((prop) => prop.id === Id);
	let temp = { name: data.name, balance: data.balance, id: handlerUniqueId() };
	if (index !== -1) {
		value[index].detail.push(temp);
	}
	handleSetLocalStorageValue("Users", value);
}
export function handlerAddImage(Id: number, url: string) {
	let value: tableDataProps[] = handleGetLocalStorageValue("Users");
	const index = value.findIndex((prop) => prop.id === Id);
	if (index !== -1) {
		value[index].photo = url;
	}
	handleSetLocalStorageValue("Users", value);
}

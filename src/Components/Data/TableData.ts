export interface tableDataProps {
	name: string;
	photo: string;
	contact: number;
	id: number;
	detail: {
		name: string;
		balance: number;
	}[];
}
// export const tableData = [
// 	{
// 		name: "",
// 		photo: "",
// 		contact: 0,
// 		balance: 0,
// 		id: 787989,
// 		detail: [],
// 	},
// ];

export let initialFormValue = {
	name: "",
	contact: 0,
	balance: 0,
};

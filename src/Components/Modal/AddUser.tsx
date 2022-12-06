import React, { useState } from "react";
import { handlerAddUser } from "../../Common/AddAndRemoveUser/AddEditAndRemoverUser";
import { initialFormValue } from "../Data/TableData";
import FormComponent from "../Forms/Index";
export interface Props {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddUser: React.FC<Props> = ({ setShow }: Props) => {
	const [validated, setValidated] = useState(false);
	const [Values, setValues] = useState(initialFormValue);
	const handleSubmit = (event: any) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			handlerAddUser(Values);
			setShow(false);
		}
		setValidated(true);
	};
	return (
		<div>
			<FormComponent
				handleSubmit={handleSubmit}
				validated={validated}
				Values={Values}
				setValues={setValues}
				loan={false}
			/>
		</div>
	);
};

export default AddUser;

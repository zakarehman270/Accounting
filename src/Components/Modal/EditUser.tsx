import React, { useState, useContext, useEffect } from "react";
import { handlerEditUser } from "../../Common/AddAndRemoveUser/AddEditAndRemoverUser";
import { Context } from "../../Context/Context";
import { initialFormValue } from "../Data/TableData";
import FormComponent from "../Forms/Index";
export interface Props {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const EditUser: React.FC<Props> = ({ setShow }: Props) => {
	const [validated, setValidated] = useState(false);
	const contextData = useContext(Context);
	const [Values, setValues] = useState(initialFormValue);
	const handleSubmit = (event: any) => {
		event.preventDefault();
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			handlerEditUser(Values, contextData.UserId);
			setShow(false);
		}
		setValidated(true);
	};
	useEffect(() => {
		let data = {
			name: contextData.UserPreviousData.name,
			balance: 0,
			contact: contextData.UserPreviousData.contact,
		};
		setValues(data);
	}, [contextData.UserPreviousData.name, contextData.UserPreviousData.contact]);

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

export default EditUser;

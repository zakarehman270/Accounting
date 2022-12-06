import React, { useState, useContext } from "react";
import { handlerAddLoan } from "../../Common/AddAndRemoveUser/AddEditAndRemoverUser";
import { Context } from "../../Context/Context";
import { initialFormValue } from "../Data/TableData";
import FormComponent from "../Forms/Index";
export interface Props {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddLoan: React.FC<Props> = ({ setShow }: Props) => {
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
			handlerAddLoan(Values, contextData.UserId);
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
				loan={true}
			/>
		</div>
	);
};

export default AddLoan;

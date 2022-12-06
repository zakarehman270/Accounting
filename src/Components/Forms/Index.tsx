import React from "react";
import { Button, Form } from "react-bootstrap";
export interface Props {
	handleSubmit: (event: any) => void;
	validated: boolean;
	Values: {
		name: string;
		contact: number;
		balance: number;
	};
	setValues: React.Dispatch<
		React.SetStateAction<{
			name: string;
			contact: number;
			balance: number;
		}>
	>;
	loan: boolean;
}
const FormComponent: React.FC<Props> = ({
	handleSubmit,
	validated,
	Values,
	setValues,
	loan,
}: Props) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({
			...Values,
			[name]: value,
		});
	};
	return (
		<Form noValidate validated={validated} onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Name:</Form.Label>
				<Form.Control
					required
					type="text"
					placeholder="Enter name"
					value={Values.name}
					name="name"
					onChange={handleInputChange}
				/>
			</Form.Group>
			{loan ? (
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Loan:</Form.Label>
					<Form.Control
						required
						type="number"
						placeholder="Balance"
						value={Values.balance}
						name="balance"
						onChange={handleInputChange}
					/>
				</Form.Group>
			) : (
				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Contact:</Form.Label>
					<Form.Control
						required
						type="number"
						placeholder="Number"
						value={Values.contact}
						name="contact"
						onChange={handleInputChange}
					/>
				</Form.Group>
			)}
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
	);
};

export default FormComponent;

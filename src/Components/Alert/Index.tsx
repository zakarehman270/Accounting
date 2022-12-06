import React, { useContext } from "react";
import { Context } from "../../Context/Context";
import { Button } from "react-bootstrap";
import {
	handlerAddImage,
	handlerRemoveUser,
} from "../../Common/AddAndRemoveUser/AddEditAndRemoverUser";
export interface Props {
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	ModalTitle: string;
}
const AlertMessage: React.FC<Props> = ({ setShow, ModalTitle }: Props) => {
	const contextData = useContext(Context);
	return (
		<div>
			<p>Are You Sure to delete this user!</p>
			<div className="d-flex gap-2">
				<Button
					onClick={() => {
						setShow(false);
						if (contextData.UserId !== 0) {
							if (ModalTitle === "Remove Photo") {
								handlerAddImage(contextData.UserId, "");
							} else {
								handlerRemoveUser(contextData.UserId);
							}
						}
					}}
				>
					Yes
				</Button>
				<Button
					onClick={() => {
						setShow(false);
					}}
				>
					No
				</Button>
			</div>
		</div>
	);
};

export default AlertMessage;

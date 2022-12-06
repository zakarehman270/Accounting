import React from "react";
import Modal from "react-bootstrap/Modal";
import { ModalEnumData } from "../../Common/ToggleContentOfModal/Modal.enum";
import AlertMessage from "../Alert/Index";
import UploadPhoto from "../UploadPhoto/UploadPhoto";
import AddLoan from "./AddLoan";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
export interface Props {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	ModalToggle: string;
	ModalTitle: string;
}
const ModalComponent: React.FC<Props> = ({
	show,
	setShow,
	ModalToggle,
	ModalTitle,
}: Props) => {
	function renderSwitch(ModalToggle: string) {
		switch (ModalToggle) {
			case ModalEnumData.ModalAddUser:
				return <AddUser setShow={setShow} />;
			case ModalEnumData.ModalAlert:
				return <AlertMessage setShow={setShow} ModalTitle={ModalTitle} />;
			case ModalEnumData.ModalEditUser:
				return <EditUser setShow={setShow} />;
			case ModalEnumData.ModalAddLoan:
				return <AddLoan setShow={setShow} />;
			case ModalEnumData.ModalUploadPhoto:
				return <UploadPhoto setShow={setShow} />;
			default:
				return <div></div>;
		}
	}
	return (
		<>
			<Modal
				show={show}
				onHide={() => {
					setShow(false);
				}}
			>
				<Modal.Header closeButton>
					<Modal.Title>{ModalTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{renderSwitch(ModalToggle)}</Modal.Body>
			</Modal>
		</>
	);
};
export default ModalComponent;

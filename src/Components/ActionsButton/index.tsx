import React, { useContext } from "react";
import { Context } from "../../Context/Context";
import { BsPencil } from "@react-icons/all-files/bs/BsPencil";
import { GrView } from "@react-icons/all-files/gr/GrView";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import { TiPlusOutline } from "@react-icons/all-files/ti/TiPlusOutline";
import { Link } from "react-router-dom";
import { tableDataProps } from "../Data/TableData";
export interface Props {
	HandlerShowModal: () => void;
	setModalToggle: React.Dispatch<React.SetStateAction<string>>;
	setModalTitle: React.Dispatch<React.SetStateAction<string>>;
	item: tableDataProps;
	index: number;
}
const ActionsButtonInMainTable: React.FC<Props> = ({
	HandlerShowModal,
	setModalToggle,
	setModalTitle,
	item,
	index,
}: Props) => {
	const contextData = useContext(Context);
	return (
		<div>
			<MdDeleteForever
				className="IconsInTable text-danger"
				onClick={() => {
					HandlerShowModal();
					setModalToggle("ModalAlert");
					setModalTitle("Delete User");
					contextData.handlerHoldUserId(item.id);
				}}
			/>
			<BsPencil
				className="IconsInTable"
				onClick={() => {
					HandlerShowModal();
					setModalToggle("ModalEditUser");
					setModalTitle("Edit User");
					contextData.handlerHoldUserId(item.id);
					contextData.handlerUserPreviousData({
						name: item.name,
						contact: item.contact,
					});
				}}
			/>
			<TiPlusOutline
				className="IconsInTable"
				onClick={() => {
					HandlerShowModal();
					setModalToggle("ModalAddLoan");
					setModalTitle("Add Loan");
					contextData.handlerHoldUserId(item.id);
				}}
			/>
			<Link
				onClick={() => {
					window.scrollTo(0, 0);
				}}
				className="text-decoration-none"
				to="/detail"
				state={{
					index: index,
				}}
			>
				<GrView className="IconsInTable" />
			</Link>
		</div>
	);
};

export default ActionsButtonInMainTable;

import React, { useContext } from "react";
import { Context } from "../../Context/Context";
import { Button, Container, Table } from "react-bootstrap";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import { handleGetLocalStorageValue } from "../../Common/handleLocalStorageValue/getValue";
import { tableDataProps } from "../Data/TableData";

export interface Props {
	HandlerShowModal: () => void;
	setModalToggle: React.Dispatch<React.SetStateAction<string>>;
	setModalTitle: React.Dispatch<React.SetStateAction<string>>;
}
const Detail: React.FC<Props> = ({
	HandlerShowModal,
	setModalToggle,
	setModalTitle,
}: Props) => {
	const { state } = useLocation();
	const contextData = useContext(Context);

	let value: tableDataProps[] = handleGetLocalStorageValue("Users");
	if (value === null) {
		value = [];
	}
	function handlerTotalBalance() {
		let totalBalance = 0;
		for (let i = 0; i < value[state.index].detail.length; i++) {
			totalBalance =
				totalBalance +
				parseInt(value[state.index].detail[i].balance.toString());
		}
		return totalBalance;
	}
	return (
		<div>
			<Header />
			<h1 className="mt-5 text-center TextHolderPagesHeading">
				{value[state.index].name} Detail
			</h1>
			<Container>
				<div className="d-flex justify-content-between align-items-end">
					<div className="DetailUnderHeading">
						<div className="d-flex gap-3">
							<p className="DetailUnderHeadingWidth">Name:</p>
							<p>{value[state.index].name}</p>
						</div>
						<div className="d-flex gap-3">
							<p className="DetailUnderHeadingWidth">Balance:</p>
							{handlerTotalBalance()}
						</div>
						<div className="d-flex gap-3">
							<p className="DetailUnderHeadingWidth">Date:</p>
							<p>6767676</p>
						</div>
					</div>
					<div className="d-flex justify-content-end gap-2 mb-2">
						<Button
							onClick={() => {
								HandlerShowModal();
								setModalToggle("ModalAddLoan");
								setModalTitle("Add Loan");
								contextData.handlerHoldUserId(value[state.index].id);
							}}
						>
							Add Loan
						</Button>
						<Button
							onClick={() => {
								HandlerShowModal();
								setModalToggle("ModalAlert");
								setModalTitle("Delete User");
								contextData.handlerHoldUserId(value[state.index].id);
							}}
						>
							Delete Loan
						</Button>
					</div>
				</div>
				<div className="pt-2 pb-2 ps-4 pe-4">
					<Table responsive bordered className="OuterWrapperTable">
						<thead>
							<tr className="tableTopHeader">
								<th>#</th>
								<th>Name</th>
								<th>Loans</th>
							</tr>
						</thead>
						<tbody className="tableBody">
							{value[state.index].detail?.map((item: any, index: any) => {
								return (
									<tr key={index}>
										<td className="TableRow" style={{ width: "12px" }}>
											{index + 1}
										</td>
										<td className="TableRow" style={{ width: "12px" }}>
											{item.name}
										</td>
										<td className="TableRow" style={{ width: "12px" }}>
											{item.balance}
										</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
			</Container>
		</div>
	);
};
export default Detail;

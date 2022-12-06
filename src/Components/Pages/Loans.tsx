import React, { useState, useContext } from "react";
import { Context } from "../../Context/Context";
import UserEmptyImage from "../Assets/Empty.png";
import { Button, Container, Dropdown, Table } from "react-bootstrap";
import Header from "../Header/Header";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import { BsPencil } from "@react-icons/all-files/bs/BsPencil";
import { TiPlusOutline } from "@react-icons/all-files/ti/TiPlusOutline";
import { FiUserPlus } from "@react-icons/all-files/fi/FiUserPlus";
import { GrView } from "@react-icons/all-files/gr/GrView";
import { GoEyeClosed } from "@react-icons/all-files/go/GoEyeClosed";
import { MdOpenInBrowser } from "@react-icons/all-files/md/MdOpenInBrowser";
import { tableDataProps } from "../Data/TableData";
import { handleGetLocalStorageValue } from "../../Common/handleLocalStorageValue/getValue";
import { Link } from "react-router-dom";
import ActionsButtonInMainTable from "../ActionsButton";

export interface Props {
	HandlerShowModal: () => void;
	setModalToggle: React.Dispatch<React.SetStateAction<string>>;
	setModalTitle: React.Dispatch<React.SetStateAction<string>>;
}
const Loans: React.FC<Props> = ({
	HandlerShowModal,
	setModalToggle,
	setModalTitle,
}: Props) => {
	const [SearchValue, setSearchValue] = useState("");
	const contextData = useContext(Context);

	let value: tableDataProps[] = handleGetLocalStorageValue("Users");
	if (value === null) {
		value = [];
	}
	function handlerTotalBalance(
		detail: {
			name: string;
			balance: number;
		}[]
	) {
		let totalBalance = 0;
		for (let i = 0; i < detail.length; i++) {
			totalBalance = totalBalance + parseInt(detail[i].balance.toString());
		}
		return totalBalance;
	}
	return (
		<div>
			<Header />
			<h1 className="mt-5 text-center TextHolderPagesHeading">Loan</h1>
			<Container>
				<div className="d-flex align-items-center justify-content-between mb-2">
					<input
						type="text"
						placeholder="Searching.."
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
					/>
					<Button
						className="ButtonPlusUser"
						onClick={() => {
							HandlerShowModal();
							setModalToggle("ModalAddUser");
							setModalTitle("Add User");
						}}
					>
						<FiUserPlus className="plusIconInTable" />
					</Button>
				</div>
				<Table striped responsive bordered>
					<thead>
						<tr>
							<th>#</th>
							<th>Pic</th>
							<th>Name</th>
							<th>Contact</th>
							<th>Balance</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{value
							.filter((val) => {
								if (SearchValue === "") {
									return val;
								} else if (
									val.name.toLowerCase().includes(SearchValue.toLowerCase())
								) {
									return val;
								}
							})
							.map((item, index) => {
								return (
									<tr key={index}>
										<td className="TableContentWidth">{index + 1}</td>
										<td className="TableContentWidth">
											<div className={`position-relative HoverApplicantImage`}>
												<img
													src={item.photo === "" ? UserEmptyImage : item.photo}
													alt="Empty"
													className="UserEmptyPic"
												/>
												<div
													className={`outerWrapperUserImgHover  position-absolute`}
												>
													{item.photo === "" ? (
														<MdOpenInBrowser
															className="IconHolderInUserImage"
															onClick={() => {
																HandlerShowModal();
																setModalToggle("ModalUploadPhoto");
																setModalTitle("Add User Photo");
																contextData.handlerHoldUserId(item.id);
															}}
														/>
													) : (
														<GoEyeClosed
															className="IconHolderInUserImage"
															onClick={() => {
																HandlerShowModal();
																setModalToggle("ModalAlert");
																setModalTitle("Remove Photo");
																contextData.handlerHoldUserId(item.id);
															}}
														/>
													)}
												</div>
											</div>
										</td>
										<td>{item.name}</td>
										<td>{item.contact}</td>
										<td>{handlerTotalBalance(item.detail)}</td>
										<td className="outerWrapperActionsTable">
											<div className="ActionsButtonDisplayInFullScreen">
												<ActionsButtonInMainTable
													item={item}
													index={index}
													HandlerShowModal={HandlerShowModal}
													setModalToggle={setModalToggle}
													setModalTitle={setModalTitle}
												/>
											</div>
											<div className="ActionsButtonDisplayInSmallScreen">
												<Dropdown className="outerWrapperDropDownInLoanTable">
													<Dropdown.Toggle
														variant="success"
														id="dropdown-basic"
													></Dropdown.Toggle>
													<Dropdown.Menu>
														<ActionsButtonInMainTable
															item={item}
															index={index}
															HandlerShowModal={HandlerShowModal}
															setModalToggle={setModalToggle}
															setModalTitle={setModalTitle}
														/>
													</Dropdown.Menu>
												</Dropdown>
											</div>
										</td>
									</tr>
								);
							})}
					</tbody>
				</Table>
			</Container>
		</div>
	);
};

export default Loans;

import React, { useState, useContext } from "react";
import { Context } from "../../Context/Context";
import UserEmptyImage from "../Assets/Empty.png";
import {
	Button,
	Container,
	Dropdown,
	Table,
	Pagination,
} from "react-bootstrap";
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
	const [PaginationIndex, setPaginationIndex] = useState(1);
	const [SelectTableRows, setSelectTableRows] = useState(5);
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
	function handlerFilterTableData() {
		return value;
	}
	return (
		<div>
			<Header />
			<h1 className="mt-5 text-center TextHolderPagesHeading">Loan</h1>
			<Container>
				<div className="d-flex  align-items-center justify-content-between mb-2">
					<div className="d-flex gap-2">
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
						<Dropdown>
							<Dropdown.Toggle
								variant="primary"
								className="DropDownButtonInLoan"
								id="dropdown-basic"
							>
								{SelectTableRows}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item
									href="#/action-1"
									onClick={() => {
										setSelectTableRows(5);
									}}
								>
									5
								</Dropdown.Item>
								<Dropdown.Item
									href="#/action-2"
									onClick={() => {
										setSelectTableRows(10);
									}}
								>
									10
								</Dropdown.Item>
								<Dropdown.Item
									href="#/action-3"
									onClick={() => {
										setSelectTableRows(15);
									}}
								>
									15
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</div>

					<input
						type="text"
						placeholder="Searching.."
						className="inputSearchBox"
						onChange={(e) => {
							setSearchValue(e.target.value);
						}}
					/>
				</div>
				<Table responsive bordered table-bordered className="OuterWrapperTable">
					<thead>
						<tr className="tableTopHeader">
							<th>#</th>
							<th>Pic</th>
							<th>Name</th>
							<th>Contact</th>
							<th>Balance</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody className="tableBody">
						{handlerFilterTableData()
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
										<td className="TableContentWidth TableRow">{index + 1}</td>
										<td className="TableContentWidth TableRow">
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
										<td className="TableRow">{item.name}</td>
										<td className="TableRow">{item.contact}</td>
										<td className="TableRow">
											{handlerTotalBalance(item.detail)}
										</td>
										<td className="outerWrapperActionsTable TableRow">
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
				<Pagination size={"lg"}>
					<Pagination.First
						onClick={() => {
							setPaginationIndex(0);
						}}
					/>
					<Pagination.Prev
						onClick={() => {
							if (PaginationIndex > 0) {
								setPaginationIndex(PaginationIndex - 1);
							}
						}}
					/>
					{[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
						let selectedIndex = false;
						if (index === PaginationIndex) {
							selectedIndex = true;
						}
						return (
							<Pagination.Item
								active={selectedIndex}
								onClick={() => {
									setPaginationIndex(index);
								}}
							>
								{index + 1}
							</Pagination.Item>
						);
					})}
					<Pagination.Next
						onClick={() => {
							if (PaginationIndex != 8) {
								setPaginationIndex(PaginationIndex + 1);
							}
						}}
					/>
					<Pagination.Last
						onClick={() => {
							setPaginationIndex(8);
						}}
					/>
				</Pagination>
			</Container>
		</div>
	);
};

export default Loans;

import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import AccountingLogoPic from "../Assets/Accounting.png";
const Header = () => {
	return (
		<Navbar collapseOnSelect className="outerWrapperNav" expand="lg" bg="white">
			<Container>
				<Navbar.Brand href="/">
					<img
						src={AccountingLogoPic}
						alt="AccountingLogoPic"
						className="AccountingPic"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto LinksInNav">
						<Nav.Link href="/home">Home</Nav.Link>
						<Nav.Link href="/loan">Loans</Nav.Link>
						<Nav.Link href="/report">Report</Nav.Link>
						<Nav.Link href="/stock">Stock</Nav.Link>
					</Nav>
					<Nav className="LinksInNav">
						<Nav.Link href="#deets">More deets</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;

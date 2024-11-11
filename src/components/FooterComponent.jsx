import React from "react";
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

export default function FooterComponent() {
  return (
    <Footer container className="border-t-4">
      <Footer.Copyright href="/" by="Roomies" year={2024} />
      <Footer.LinkGroup className="flex gap-3">
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

import React, { useEffect, useState } from "react";
import "./header.scss";
import { headerItems } from "../../static/productsData";
import ProductModal from "../../product-modal/ProductModal";
import { FaBars } from "react-icons/fa6";
const Header = (prop) => {
    const [scroll, setScroll] = useState(false);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true);
            } else {
                setScroll(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const openModal = () => {
        prop.openModalFunc(true);
    };
    return (
        <header className={`header ${scroll > 0 ? "header__shrink" : ""}`}>
            <nav className="navbar container">
                <div className="nav__logo">
                    <a href="" className="header__logo">
                        <span>Logo</span>
                    </a>
                </div>
                <ul className={`header__list ${show ? "header__show" : ""}`}>
                    {headerItems.map((item, indx) => (
                        <li className="header__item" key={indx}>
                            <a href="">{item}</a>
                        </li>
                    ))}
                    <li
                        className="header__item-close"
                        onClick={() => setShow(false)}
                    >
                        X
                    </li>
                </ul>
                <div className="header__btns">
                    <button onClick={openModal}>Show modal</button>
                    <FaBars
                        className="header__bar"
                        onClick={() => setShow(true)}
                    />
                    <select name="" id="">
                        <option value="order">Order</option>
                        <option value="alphabetic">Alphabetic</option>
                        <option value="reverse">Reverse</option>
                    </select>
                    <select name="" id="">
                        <option value="all">All</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
                </div>
            </nav>
        </header>
        // {modal?<ProductModal modal={modal} setModal/>}
    );
};

export default Header;

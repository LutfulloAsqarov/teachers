import React from "react";
import "./ProductModal.scss";

const ProductModal = ({ setShowModal, showModal }) => {
    // const closeModal = () => {
    //     setShowModal(false);
    // };
    return (
        <section className={`product-modal ${showModal ? "show" : ""}`}>
            ProductModal
            <button onClick={() => setShowModal(false)}>X</button>
        </section>
    );
};

export default ProductModal;

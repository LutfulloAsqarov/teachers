import { Fragment, useState } from "react";
import Footer from "./components/layout/footer/Footer";
import Header from "./components/layout/header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Student from "./pages/student/Student";
import Teachers from "./pages/teachers/Teachers";

function App() {
    const [showModal, setShowModal] = useState(false);
    // console.log(showModal);
    return (
        <>
            {/* <Header /> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Teachers />} />
                    <Route path="/student" element={<Student />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;

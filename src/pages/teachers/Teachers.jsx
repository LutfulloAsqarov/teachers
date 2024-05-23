import React, { useEffect, useState } from "react";
import axios from "../../api";
import "./Teachers.scss";
import { useAsyncError, useNavigate } from "react-router-dom";

let initialState = {
    firstName: "",
    lastName: "",
    avatar: "",
};

const Teachers = () => {
    const [teachers, setTeachers] = useState(null);
    const [teachersCount, setTeachersCount] = useState(1);
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [newTeacher, setNewTeacher] = useState(initialState);
    const [edit, setEdit] = useState(null);
    // const navigate = useNavigate();
    // const [reload, setReload] = useState(true);
    let limit = 3;
    useEffect(() => {
        getTeachers();
    }, [page]);

    const handleDelete = (id) => {
        console.log(id);
        axios
            .delete(`/${id}`)
            .then((res) => {
                getTeachers();
                getTeachersCount();
            })
            .catch((err) => console.log(err));
    };

    function getPages() {
        let res = [];
        for (let i = 1; i < teachersCount / 3 + 1; i++) {
            res.push(
                <button key={i} onClick={() => setPage(i)}>
                    {i}
                </button>
            );
        }
        return res;
    }

    const getTeachersCount = () => {
        axios.get("").then((res) => setTeachersCount(res.data?.length));
    };

    function getTeachers() {
        axios
            .get(`?limit=${limit}&page=${page}`)
            .then((res) => {
                setTeachers(res.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getTeachersCount();
    }, []);

    let teachersData = teachers?.map((el) => (
        <div key={el.id} className="teachers__card">
            <div className="teachers__card__img">
                <img src={el.avatar} alt="" />
            </div>
            <div className="teachers__card__info">
                <h2>{el.firstName}</h2>
                <p>{el.phoneNumber}</p>
                <p>{el.email}</p>
                <button onClick={() => handleDelete(el.id)}>delete</button>
                <button onClick={() => handleEdit(el)}>Edit</button>
            </div>
        </div>
    ));
    const handleEdit = (el) => {
        setEdit(el.id);
        setNewTeacher(el);
        setShowModal(true);
    };
    const handleCreate = (e) => {
        e.preventDefault();
        if (edit) {
            axios
                .put(`/${edit}`, newTeacher)
                .then((res) => {
                    getTeachers();
                    setShowModal(false);
                    setNewTeacher(initialState);
                })
                .catch((err) => console.log(err));
        } else {
            axios
                .post("", newTeacher)
                .then((res) => {
                    getTeachers();
                    getTeachersCount();
                    setShowModal(false);
                    setNewTeacher(initialState);
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <section className="teachers">
            <div className="teacher__header">
                <div className="teacher__logo">Logo</div>
                <button
                    className="teacher__btn-add"
                    onClick={() => setShowModal(true)}
                >
                    Add btn
                </button>
            </div>

            <div className="teachers__cards">{teachersData}</div>
            <div className="teachers__page">
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Prev
                </button>
                {getPages()}
                <button
                    disabled={page === Math.ceil(teachersCount / limit)}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
            <div className={`modal ${showModal ? "show" : ""}`}>
                <form onSubmit={handleCreate} action="">
                    <input
                        value={newTeacher.firstName}
                        onChange={(e) =>
                            setNewTeacher((prev) => ({
                                ...prev,
                                firstName: e.target.value,
                            }))
                        }
                        type="text"
                        placeholder="FirstName"
                    />
                    <input
                        value={newTeacher.lastName}
                        onChange={(e) =>
                            setNewTeacher((prev) => ({
                                ...prev,
                                lastName: e.target.value,
                            }))
                        }
                        type="text"
                        placeholder="LastName"
                    />
                    <input
                        value={newTeacher.avatar}
                        onChange={(e) =>
                            setNewTeacher((prev) => ({
                                ...prev,
                                avatar: e.target.value,
                            }))
                        }
                        type="text"
                        placeholder="Img"
                    />
                    <button>{edit ? "Save" : "Create"}</button>
                </form>
            </div>
        </section>
    );
};

export default Teachers;

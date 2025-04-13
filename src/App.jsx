import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SeleccionServicio from "./components/SeleccionServicio";
import CalendarComponent from "./components/CalendarComponent";
import AdminPanel from "./components/AdminPanel";
import Success from "./components/Success";
import Fail from "./components/Fail";
import './App.css';

function App() {
    const [seleccionData, setSeleccionData] = useState(null);
    const [reservedDateTime, setReservedDateTime] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false); // Estado para controlar la visibilidad del calendario
    const [showCalendarButton, setShowCalendarButton] = useState(false); // Estado para mostrar el botón "Volver"

    const handleSeleccionConfirmada = (data) => {
        setSeleccionData(data);
        setShowCalendar(true); // Mostrar el calendario
        setShowCalendarButton(true); // Mostrar el botón "Volver"
        document.querySelector('.container_main_h').style.display = 'none';
        document.querySelector('.seleccion-servicio-container').style.display = 'none';
    };

    const handleReserve = (dateTime) => {
        setReservedDateTime(dateTime);
    };

    const handleVolver = () => {
        document.querySelector('.container_main_h').style.display = 'block';
        document.querySelector('.seleccion-servicio-container').style.display = 'block';
        setShowCalendar(false); // Ocultar el calendario
        setShowCalendarButton(false); // Ocultar el botón "Volver"
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="main_parent">
                            <div className="container_main_h">
                                <div>
                                    <img className="main_logo_img" src="logo.png" alt="Logo Blak" />
                                    <h1 className="main_h">Reserva tu Turno!</h1>
                                </div>
                                <div className="description">
                                    <p>
                                        En <strong>BLAK</strong>, ofrecemos servicios de alta calidad para el cuidado y personalización de tu vehículo.
                                        Desde ploteos hasta polarizados, garantizamos resultados excepcionales que harán que tu auto luzca como nuevo.
                                    </p>
                                    <hr />
                                    <ul className="benefits-list">
                                        <li>✔ Atención personalizada</li>
                                        <li>✔ Materiales de primera calidad</li>
                                        <li>✔ Resultados garantizados</li>
                                        <li>✔ Reserva fácil y rápida</li>
                                    </ul>
                                    <hr />
                                    <p style={{ fontWeight: "bold", color: "light-grey" }}>
                                        ¡Confía en nosotros para darle a tu vehículo el cuidado que se merece!
                                    </p>
                                </div>
                            </div>

                            <SeleccionServicio onSeleccionar={handleSeleccionConfirmada} />

                            {seleccionData && seleccionData.servicios.length > 0 && showCalendar && (
                                <div className="calendar-container">
                                    <CalendarComponent
                                        onReserve={handleReserve}
                                        servicios={seleccionData.servicios}
                                        total={seleccionData.total}
                                    />
                                    {showCalendarButton && (
                                        <button onClick={handleVolver} style={{ marginTop: "20px" }}>
                                            Volver
                                        </button>
                                    )}
                                </div>
                            )}

                            {reservedDateTime && (
                                <p
                                    style={{
                                        marginTop: "20px",
                                        fontWeight: "bold",
                                        color: "green"
                                    }}
                                >
                                    Turno confirmado para el {reservedDateTime.date.toDateString()}
                                </p>
                            )}
                        </div>
                    }
                />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/success" element={<Success />} />
                <Route path="/fail" element={<Fail />} />
            </Routes>
        </Router>
    );
}

export default App;
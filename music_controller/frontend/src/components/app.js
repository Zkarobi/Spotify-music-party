import React, { Component } from "react";
import HomePage from "./HomePage";
import CreateRoomPage from "./CreateRoomPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create" element={<CreateRoomPage />} />
                    {/* Other routes can be added here */}
                </Routes>
            </Router>
        );
    }
}

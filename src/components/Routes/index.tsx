import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Trending from "../../pages/Trending";
import NavBar from "../NavBar";
import ResetPasswordPage from "../Log/ResetPasswordPage";

const index = () => {
    return (
        <div>
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profil" element={<Profil />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/reinitialiser-mot-de-passe" element={<ResetPasswordPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </div>
    );
};

export default index;
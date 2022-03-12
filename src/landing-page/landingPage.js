import {Navigate, useNavigate} from "react-router-dom";
import header from '../assets/images/header-logo.png'
import contentLogo from '../assets/images/content-logo.png'
import './landingPage.css';

import landingPageService from "./landingPageService";
import {useState} from "react";
import {Alert, Snackbar} from "@mui/material";

function LandingPage() {
    let navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState()
    const [modalSeverity, setModalSeverity] = useState()

    const handleLogin = (e) => {
        e.preventDefault()
        const data = {
            "username": e.target.email.value,
            "password": e.target.password.value
        }

        landingPageService.login(data).then(response => {
            localStorage.setItem('token', response.data.data.token);
            setLoginStatus(true);
        }).catch(error => {
            if (error.response.status === 401) {
                setModalMessage("Invalid username or Password")
            } else if (error.response.status === 403) {
                setModalMessage("Too many invalid login, please wait for 1 minute")
            }
            setShowModal(true)
            setModalSeverity("error")
        })
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const goToHome = () => {
        navigate(
            `/home`
        )
    }

    return (
        loginStatus ?
            <Navigate to="/home" />
            :
            <div>
                <Snackbar open={showModal} autoHideDuration={6000} onClose={handleClose} data-cy="form-alert-container\">
                    <Alert onClose={handleClose} severity={modalSeverity} sx={{ width: '100%' }}>
                        {modalMessage}
                    </Alert>
                </Snackbar>
                <nav className="navbar navbar-light" styles="background-color: #ffffff;">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img src={header} data-cy="header-logo" alt="" className="d-inline-block align-text-top logo" onClick={goToHome}/>
                        </a>
                    </div>
                </nav>
                <div className="login-container">
                    <div className="content-logo">
                        <img src={contentLogo} alt="content-logo" className="content-logo-image" data-cy="content-logo"/>
                    </div>
                    <div className="login-form">
                        <p className="login-title" data-cy="form-text-title">Login</p>
                        <form onSubmit={handleLogin}
                        >
                            <div className="email">
                                <label htmlFor="email-input" className="email-label" data-cy="form-text-email">Email</label>
                                <input type="email" className="form-control" id="email-input" name="email" placeholder="Masukkan Email" data-cy="form-input-email"/>
                            </div>
                            <div className="password">
                                <label htmlFor="password-input" className="password-label" data-cy="form-text-password">Password</label>
                                <input type="password" className="form-control" id="password-input" placeholder="Masukkan Password" name="password" data-cy="form-input-password"/>
                            </div>
                            <div className="button-login d-grid gap-2">
                                <button className="btn" type="submit" data-cy="form-button-login">Login</button>
                            </div>
                            <div className="lewati-login">
                                <a href="#" className="lewati-login-text" data-cy="form-button-skip" onClick={goToHome}>Lewati Login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    );
}

export default LandingPage;

import header from '../../../assets/images/header-logo.png';
import './final.css';
import {Navigate, useNavigate} from "react-router-dom";
import thanksImage from "../../../assets/images/thanks-image.png";

function Final() {
    let navigate = useNavigate();
    let token = localStorage.getItem('token')

    const goToHome = () => {
        navigate(
            `/home`
        )
    }

    return (
        !token ?
            <Navigate to="/"/>
            :
            <div>
                <nav className="navbar navbar-dashboard navbar-light sticky-top" styles="background-color: #ffffff;">
                    <div className="navbar-container navbar-container-top">
                        <a className="navbar-brand" href="#">
                            <img src={header} alt="" className="d-inline-block align-text-top navbar-logo"/>
                        </a>
                    </div>
                </nav>
                <div className="content-container container-fluid main-final-container">
                    <div className="card card-content final-container">
                        <div className="card-body final-body">

                            <div className="final-image" data-cy="image-thanks">
                                <img src={thanksImage} alt=""/>
                            </div>
                            <div className="final-title" data-cy="text-description">
                                <p>Terimakasih telah memberikan penilaianmu!</p>
                            </div>

                            <div className="final-submit">
                                <button className={"btn final-button"} type="button"
                                        data-cy="button-home" onClick={goToHome} >Kembali Ke Beranda
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Final;

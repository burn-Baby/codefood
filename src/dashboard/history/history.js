import header from '../../assets/images/header-logo.png';
import emoticonhappy from '../../assets/images/emoticon-happy.png';
import emoticonnormal from '../../assets/images/emoticon-normal.png';
import emoticonangry from '../../assets/images/emoticon-angry.png';
import './history.css';
import {Navigate, useNavigate} from "react-router-dom";

function History() {
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
                            <img src={header} alt="" className="d-inline-block align-text-top navbar-logo" onClick={goToHome}/>
                        </a>
                        <form className="search-bar d-flex">
                            <input className="form-control search-input" type="search" placeholder="Cari Resep"
                                   aria-label="Cari Resep"/>
                            <button className="btn search-btn" type="submit">Cari</button>
                        </form>
                    </div>
                </nav>
                <div className="content-container container-fluid vh-100">
                    <div className="card-container row">
                        <div className="card card-content col-3">
                            <img src={emoticonangry} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <p className="card-title">Sop Buntut Kambing Yang Dibuat Dari</p>
                                <p className="card-category">Sop</p>
                                <div className="review-btn">
                                    <button className="btn">
                                        <span><img src={emoticonhappy} alt="like"/> 100</span>
                                    </button>
                                    <button className="btn">
                                        <span><img src={emoticonnormal} alt="neutral"/> 59</span>
                                    </button>
                                    <button className="btn">
                                        <span><img src={emoticonangry} alt="dislike"/> 5</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    );
}

export default History;

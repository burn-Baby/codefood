import { useNavigate } from "react-router-dom";
import header from '../../assets/images/header-logo.png';
import emoticonhappy from '../../assets/images/emoticon-happy.png';
import emoticonnormal from '../../assets/images/emoticon-normal.png';
import emoticonangry from '../../assets/images/emoticon-angry.png';
import incmindisable from '../../assets/images/increment-min-disable.png';
import incmin from '../../assets/images/increment-min.png';
import incplus from '../../assets/images/increment-plus.png';
import backbtn from '../../assets/images/button-back.png';
import './detail.css';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import detailsService from "./detailsService";
import {Alert, Snackbar} from "@mui/material";

function Detail() {
    let navigate = useNavigate();
    let token = localStorage.getItem('token')
    let idRecipe = useParams()
    const [recipeDetail, setRecipeDetail] = useState()
    const [servingPortion, setServingPortion] = useState(1)
    const [decBtnLogo, setDecBtnLogo] = useState(incmindisable)
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState()
    const [modalSeverity, setModalSeverity] = useState()

    useEffect(() => {
        getDetailRecipe()
    }, [])

    const getDetailRecipe = () => {
        detailsService.getDetailRecipe(idRecipe.id).then(response => {
            setRecipeDetail(response.data.data)
        }).catch(error => {
            console.log("Home response : ", error)
        })
    }

    const increasePortion = () => {
        setServingPortion(servingPortion+1)
        setDecBtnLogo(incmin)
        const portion = servingPortion + 1
        const data = idRecipe.id + "?nServing=" + portion
        detailsService.getDetailRecipeWithPortion(data).then(response => {
            setRecipeDetail(response.data.data)
        }).catch(error => {
            console.log("Home response : ", error)
        })
    }

    const decreasePortion = () => {
        if (servingPortion === 1){
            setDecBtnLogo(incmindisable)
            return
        }

        setServingPortion(servingPortion-1)
        const portion = servingPortion - 1
        const data = idRecipe.id + "?nServing=" + portion
        detailsService.getDetailRecipeWithPortion(data).then(response => {
            setRecipeDetail(response.data.data)
        }).catch(error => {
            console.log("Home response : ", error)
        })
    }

    const handleBackButton = () => {
        navigate(
            `/home`
        )
    }

    const goToSteps = (e) => {
        e.preventDefault()
        const portion = e.target.servingPortion.value
        if(!token) {
            setModalMessage("Anda belum melakukan login.")
            setShowModal(true)
            setModalSeverity("error")
            return
        }
        navigate(
            `/steps/id=` + idRecipe.id + `&portion=` + portion
        )
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
        <div>
            <Snackbar open={showModal} autoHideDuration={6000} onClose={handleClose} data-cy="form-alert-container\">
                <Alert onClose={handleClose} severity={modalSeverity} sx={{ width: '100%' }}>
                    {modalMessage}
                </Alert>
            </Snackbar>
            <nav className="navbar navbar-dashboard navbar-light sticky-top" styles="background-color: #ffffff;">
                <div className="navbar-container navbar-container-top">
                    <a className="navbar-brand" href="#">
                        <img src={header} alt="" className="d-inline-block align-text-top navbar-logo" onClick={goToHome}/>
                    </a>
                </div>
            </nav>
            <div className="content-detail-container container-fluid">
                <div className="card-container detail-container">
                    <div className="card card-content detail-content">
                        <div className="image-detail-container">
                            <img src={recipeDetail?.image} className="card-img-top" alt="..."/>
                            <button className="btn back-button" type="button" ><img src={backbtn} onClick={handleBackButton} alt="" data-cy="button-back"/></button>
                        </div>
                        <div className="card-body">
                            <p className="recipe-title" data-cy="detail-tect-title">{recipeDetail?.name}</p>
                            <div className="review-btn">
                                <button className="btn" data-cy="detail-like">
                                    <span data-cy="detail-like-value"><img src={emoticonhappy} alt="like"/>{' '+recipeDetail?.nReactionLike}</span>
                                </button>
                                <button className="btn" data-cy="detail-neutral">
                                    <span data-cy="detail-like-value"><img src={emoticonnormal} alt="normal"/> {' '+recipeDetail?.nReactionNeutral}</span>
                                </button>
                                <button className="btn" data-cy="detail-dislike">
                                    <span data-cy="detail-like-value"><img src={emoticonangry} alt="dislike"/> {' '+recipeDetail?.nReactionDislike}</span>
                                </button>
                            </div>
                            <div className="line-separator"></div>
                            <div className="ingredient-content">
                                <p className="ingredient-text" data-cy="detail-text-ingredients">Bahan-bahan</p>
                                {recipeDetail?.ingredientsPerServing?.map((ingredient, i) => (
                                    <>
                                        <p className="ingredient-detail" data-cy="detail-text-recipe">
                                            <span className="ingredient-value">{ingredient.value}</span>
                                            <span className="ingredient-unit">{' '+ingredient.unit}</span>
                                            <span className="ingredient-item">{' '+ingredient.item}</span>
                                        </p>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-container increment-container" data-cy="form-portion">
                    <div className="card card-content increment-content">
                        <div className="card-body">
                            <p className="increment-title" data-cy="form-text-title-portion">Jumlah porsi yang dimasak</p>
                            <div className="increment-form">
                                <form onSubmit={goToSteps}>
                                    <button className="btn increment-plus" type="button"><img src={decBtnLogo} onClick={decreasePortion} data-cy="form-button-decrease-portion" alt="minus"/></button>
                                    <input type="number" disabled className="serving-numbers" value={servingPortion} name="servingPortion" data-cy="form-input-portion form-value-portion"/>
                                    <button className="btn increment-minus" type="button"><img src={incplus} alt="" onClick={increasePortion} data-cy="form-button-increase-portion" alt="plus"/></button>
                                    <div className="button-increment d-grid gap-2">
                                        <button className="btn increment-submit" type="submit"  data-cy="form-button-submit-portion">Mulai Memasak</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Detail;

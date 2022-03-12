import header from '../../../assets/images/header-logo.png';
import './feedback.css';
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import imageFeedback from "../../../assets/images/feedback-image.png";
import like from "../../../assets/images/button-like.png";
import likeClicked from "../../../assets/images/button-like-clicked.png";
import neutral from "../../../assets/images/button-neutral.png";
import dislike from "../../../assets/images/button-dislike.png";

function Feedback() {
    let navigate = useNavigate();
    let token = localStorage.getItem('token')
    const [emojiProperty, setEmojiProperty] = useState({
        "emojiImageLike": like,
        "emojiImageNeutral": neutral,
        "emojiImageDislike": dislike,
        "emojiTextLike": "emoji-not-clicked",
        "emojiTextNeutral": "emoji-not-clicked",
        "emojiTextDislike": "emoji-not-clicked",
    })
    const [feedbackClicked, setFeedbackClicked] = useState({
        disabled: true,
        feedbackStyle: "feedback-not-clicked"
    })

    const feedbackLikeSubmit = () => {
        setEmojiProperty(emojiProperty => {
            return {
                ...emojiProperty,
                emojiImageLike: likeClicked,
                emojiImageNeutral: neutral,
                emojiImageDislike: dislike,
                emojiTextLike: "emoji-clicked",
                emojiTextNeutral: "emoji-not-clicked",
                emojiTextDislike: "emoji-not-clicked",
            }
        })

        setFeedbackClicked(feedbackClicked => {
            return {
                ...feedbackClicked,
                disabled: false,
                feedbackStyle: "feedback-clicked"
            }
        })
    }

    const feedbackNeutralSubmit = () => {
        setEmojiProperty(emojiProperty => {
            return {
                ...emojiProperty,
                emojiImageLike: like,
                emojiImageNeutral: neutral,
                emojiImageDislike: dislike,
                emojiTextLike: "emoji-not-clicked",
                emojiTextNeutral: "emoji-clicked",
                emojiTextDislike: "emoji-not-clicked",
            }
        })

        setFeedbackClicked(feedbackClicked => {
            return {
                ...feedbackClicked,
                disabled: false,
                feedbackStyle: "feedback-clicked"
            }
        })
    }

    const feedbackDislikeSubmit = () => {
        setEmojiProperty(emojiProperty => {
            return {
                ...emojiProperty,
                emojiImageLike: like,
                emojiImageNeutral: neutral,
                emojiImageDislike: dislike,
                emojiTextLike: "emoji-not-clicked",
                emojiTextNeutral: "emoji-not-clicked",
                emojiTextDislike: "emoji-clicked",
            }
        })

        setFeedbackClicked(feedbackClicked => {
            return {
                ...feedbackClicked,
                disabled: false,
                feedbackStyle: "feedback-clicked"
            }
        })
    }

    const sendFeedback = () => {
        navigate(
            `/steps/final`
        )
    }

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
                    </div>
                </nav>
                <div className="content-container container-fluid main-feedback-container">
                    <div className="card card-content feedback-container">
                        <div className="card-body feedback-body">
                            <div className="feedback-title" data-cy="text-title">
                                <p>Yaay! Masakanmu sudah siap disajikan</p>
                            </div>
                            <div className="feedback-image" data-cy="image-rate">
                                <img src={imageFeedback} alt=""/>
                            </div>
                            <div className="feedback-subtitle" data-cy="text-description">
                                <p>Suka dengan resep dari CodeFeed?</p>
                                <p>Bagaimana rasanya?</p>
                            </div>
                            <div className="feedback-emoji">
                                <div className="emoji feedback-like" onClick={feedbackLikeSubmit} data-cy="button-like">
                                    <img src={emojiProperty.emojiImageLike} alt=""/>
                                    <p className={emojiProperty.emojiTextLike}>Yummy!</p>
                                </div>
                                <div className="emoji feedback-normal" onClick={feedbackNeutralSubmit} data-cy="button-neutral">
                                    <img src={emojiProperty.emojiImageNeutral} alt=""/>
                                    <p className={emojiProperty.emojiTextNeutral}>Lumayan</p>
                                </div>
                                <div className="emoji feedback-dislike" onClick={feedbackDislikeSubmit} data-cy="button-dislike">
                                    <img src={emojiProperty.emojiImageDislike} alt=""/>
                                    <p className={emojiProperty.emojiTextDislike}>Kurang Suka</p>
                                </div>
                            </div>
                            <div className="feedback-submit">
                                <button className={"btn " + feedbackClicked.feedbackStyle} type="button"
                                        disabled={feedbackClicked.disabled} onClick={sendFeedback} data-cy="button-rate">Berikan Penilaian
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    );
}

export default Feedback;

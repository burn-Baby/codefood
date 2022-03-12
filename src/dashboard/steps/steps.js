import header from '../../assets/images/header-logo.png';
import './steps.css';
import backbtn from "../../assets/images/button-back.png";
import textdone from '../../assets/images/text-done.png';
import stepsService from "./stepsService";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function Steps() {
    let navigate = useNavigate();
    let token = localStorage.getItem('token')
    let paramUrl = useParams()
    const [steps, setSteps] = useState()

    useEffect(() => {
        getRecipeSteps()
    }, [])

    const getRecipeSteps = () => {
        const data = "/" + paramUrl.id + "/steps?nServing=" + paramUrl.portion
        stepsService.getRecipeSteps(data).then(response => {
            const data = response.data.data
            const dataPropertyFirst = {
                "hideBtnSelesai": false,
                "hideTextSelesai": true,
                "stepsColor": "steps-done",
                "hideBtnSajikanMakanan": true
            }

            const dataProperty = {
                "hideBtnSelesai": true,
                "hideTextSelesai": true,
                "stepsColor": "steps-not-done",
                "hideBtnSajikanMakanan": true
            }
            for (let inc = 0; inc < data.length; inc++) {
                if (inc === 0) {
                    Object.assign(data[inc], dataPropertyFirst)
                } else {
                    Object.assign(data[inc], dataProperty)
                }
            }
            setSteps(data)
        }).catch(error => {
            console.log("Home response : ", error)
        })
    }

    const handleStepsDone = (index) => {
        setSteps([...steps].map(object => {
            if ((object.stepOrder === steps.length) && (index + 2 === steps.length)) {
                return {
                    ...object,
                    hideBtnSajikanMakanan: false,
                    stepsColor: "steps-done"
                }
            }

            if (object.stepOrder === index + 1) {
                return {
                    ...object,
                    hideTextSelesai: false,
                    hideBtnSelesai: true
                }
            } else if (object.stepOrder === index + 2) {
                return {
                    ...object,
                    hideBtnSelesai: false,
                    stepsColor: "steps-done"
                }
            } else return object;
        }))
    }

    const handleBackButton = () => {
        navigate(
            `/detail/id=` + paramUrl.id
        )
    }

    const goToFeedback = () => {
        navigate(
            `/steps/feedback/id=` + paramUrl.id
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
                <div className="content-container container-fluid main-steps-container">
                    <div className="card card-content cooking-steps-container">
                        <div className="card-body">
                            <div className="navigation-header">
                                <button className="btn" type="button"><img src={backbtn} alt="" data-cy="button-back"
                                                                           onClick={handleBackButton}/></button>
                                <span className="steps-navigation-title">Langkah Memasak</span>
                            </div>
                            {steps?.map((step, i) => (
                                <>
                                    <div className={"steps-detail " + step.stepsColor}
                                         data-cy={'item-step-' + i + " akar-icons:check"}>
                                        <div className="steps-title-container">
                                            <p className="steps-title">Step {' ' + step.stepOrder}</p>
                                        </div>
                                        <div className="steps-description-container">
                                            <p className="steps-description">{step.description}</p>
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-step-selesai " type="button"
                                                    hidden={step.hideBtnSelesai}
                                                    onClick={() => handleStepsDone(i)}>Selesai
                                            </button>
                                        </div>

                                        <div className="text-selesai" hidden={step.hideTextSelesai}
                                             data-cy="text-step-done"><img src={textdone}
                                                                           alt=""/> Selesai
                                        </div>
                                        <div className="d-grid gap-2">
                                            <button className="btn btn-sajikan" type="button"
                                                    hidden={step.hideBtnSajikanMakanan} data-cy="button-serve"
                                                    onClick={() => goToFeedback()}>Sajikan Makanan
                                            </button>
                                        </div>
                                    </div>
                                    <div className="line-separator-steps"></div>
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

    );
}

export default Steps;

import {useNavigate} from "react-router-dom";
import header from '../../assets/images/header-logo.png';
import history from '../../assets/images/history-icon.png';
import emoticonhappy from '../../assets/images/emoticon-happy.png';
import emoticonnormal from '../../assets/images/emoticon-normal.png';
import emoticonangry from '../../assets/images/emoticon-angry.png';
import notfound from '../../assets/images/recipe-not-found.png';
import './home.css';
import homeService from "./homeService";
import {useEffect, useState} from "react";
import constant from "../../config/constant";
import {Alert, Snackbar} from "@mui/material";

function Home() {
    let navigate = useNavigate();
    let token = localStorage.getItem('token')
    const [recipesData, setRecipesData] = useState()
    const [categoryData, setcategoryData] = useState()
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState()
    const [modalSeverity, setModalSeverity] = useState()

    useEffect(() => {
        getDefaultRecipes()
        getRecipesCategory()
    }, [])

    const getDefaultRecipes = () => {
        homeService.getRecipes().then(response => {
            setRecipesData(recipesData => {
                return {
                    ...recipesData,
                    recipes: response.data.data.recipes,
                    total: response.data.data.total
                }
            })
        }).catch(error => {
            console.log("Home response : ", error)
        })
    }

    const getRecipesCategory = () => {
        homeService.getRecipesCategory().then(response => {
            setcategoryData(response.data.data)
        }).catch(error => {
            console.log("Home response : ", error)
        })
    }

    const getFilteredRecipes = (id) => {
        const data = "categoryId=" + id
        homeService.getRecipesByCategory(data).then(response => {
            setRecipesData(recipesData => {
                return {
                    ...recipesData,
                    recipes: response.data.data.recipes,
                    total: response.data.data.total
                }
            })
        }).catch(error => {
            console.log("Home response : ", error)
        })
    }

    const sortRecipesNameAsc = () => {
        const data = "sort=" + constant.RECIPE_SORT_NAME_ASC + "&categoryId=" + recipesData[0].recipeCategoryId
        homeService.getRecipesByCategory(data).then(response => {
            setRecipesData(recipesData => {
                return {
                    ...recipesData,
                    recipes: response.data.data.recipes,
                    total: response.data.data.total
                }
            })
        }).catch(error => {
            console.log("Home response : ", error)
        })
    }

    const sortRecipesNameDesc = () => {
        const data = "sort=" + constant.RECIPE_SORT_NAME_DESC + "&categoryId=" + recipesData[0].recipeCategoryId
        homeService.getRecipesByCategory(data).then(response => {
            setRecipesData(recipesData => {
                return {
                    ...recipesData,
                    recipes: response.data.data.recipes,
                    total: response.data.data.total
                }
            })
        }).catch(error => {
            console.log("Home response : ", error)
        })
    }

    const sortRecipesLike = () => {
        const data = "sort=" + constant.RECIPE_SORT_LIKE + "&categoryId=" + recipesData[0].recipeCategoryId
        homeService.getRecipesByCategory(data).then(response => {
            setRecipesData(recipesData => {
                return {
                    ...recipesData,
                    recipes: response.data.data.recipes,
                    total: response.data.data.total
                }
            })
        }).catch(error => {
            console.log("Home response : ", error)
        })
    }

    const searchData = (e) => {
        e.preventDefault()
        const data = "q=" + e.target.searchRecipe.value
        homeService.getRecipesByCategory(data).then(response => {
            setRecipesData(recipesData => {
                return {
                    ...recipesData,
                    recipes: response.data.data.recipes,
                    total: response.data.data.total
                }
            })
        }).catch(error => {
            console.log("Home response : ", error)
        })
    }

    const goToHistory = () => {
        if (!token) {
            setModalMessage("Anda belum melakukan login.")
            setShowModal(true)
            setModalSeverity("error")
            return
        }
        navigate(
            `/history`
        )
    }

    const goToRecipeDetail = (id) => {
        navigate(
            `/detail/id=` + id
        )
    }

    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <div>
            <Snackbar open={showModal} autoHideDuration={6000} onClose={handleClose} data-cy="form-alert-container\">
                <Alert onClose={handleClose} severity={modalSeverity} sx={{width: '100%'}}>
                    {modalMessage}
                </Alert>
            </Snackbar>
            <nav className="navbar navbar-dashboard navbar-light sticky-top" styles="background-color: #ffffff;">
                <div className="navbar-container navbar-container-top">
                    <a className="navbar-brand" href="#">
                        <img src={header} alt="" className="d-inline-block align-text-top navbar-logo"
                             data-cy="header-logo"/>
                    </a>
                    <form className="search-bar d-flex" onSubmit={searchData}>
                        <input className="form-control search-input" type="search" placeholder="Cari Resep"
                               name="searchRecipe" aria-label="Cari Resep" data-cy="header-input-search"/>
                        <button className="btn search-btn" type="submit" data-cy="header-button-search">Cari</button>
                    </form>
                    <button className="btn history" type="button" onClick={goToHistory}><img src={history} alt=""
                                                                                             data-cy="header-button-history"/>
                    </button>
                </div>
                <div className="navbar-container-bottom">
                    <button className="btn filter-all" onClick={() => getFilteredRecipes('')}
                            data-cy="category-button-0">Semua
                    </button>
                    {categoryData?.map((item, i) => (
                        <button className="btn filter-all" data-cy={"category-button-" + item.id}
                                onClick={() => getFilteredRecipes(item.id)}>{item.name}</button>
                    ))}
                </div>
            </nav>
            {recipesData?.total === 0 ?
                <>
                    <div className="recipes-not-found">
                        <img src={notfound} alt="" data-cy="list-image-empty"/>
                        <p data-cy="list-text-empty">Oops! Resep tidak ditemukan.</p>
                    </div>
                </>
                :
                <div className="content-container container-fluid">
                    <div className="sort-button">
                        <div className="urutkan-label">Urutkan:</div>
                        <button className="btn" data-cy="button-sort-latest">Terbaru</button>
                        <button className="btn" onClick={sortRecipesNameAsc} data-cy="button-sort-az">Urutkan A-Z
                        </button>
                        <button className="btn" onClick={sortRecipesNameDesc} data-cy="button-sort-za">Urutkan Z-A
                        </button>
                        <button className="btn" onClick={sortRecipesLike} data-cy="button-sort-favorite">Urutkan Dari
                            Paling Disukai
                        </button>
                    </div>
                    <div className="card-container recipe-container row">

                        {recipesData?.recipes?.map((item, i) => (
                            <>
                                <div className="card card-content recipe-content col-3"
                                     onClick={() => goToRecipeDetail(item.id)} data-cy={'list-item-' + (i + 1)}>
                                    <img src={item.image} className="card-img-top card-img-recipe" alt="..."/>
                                    <div className="card-body">
                                        <p className="card-title">{item.name}</p>
                                        <p className="card-category">{item.recipeCategory.name}</p>
                                        <div className="review-btn">
                                            <button className="btn" data-cy="list-item-like">
                                                <span><img src={emoticonhappy} alt="like"/>{' ' + item.nReactionLike}</span>
                                            </button>
                                            <button className="btn" data-cy="list-item-neutral">
                                                <span><img src={emoticonnormal} alt="neutral"/>{' ' + item.nReactionNeutral}</span>
                                            </button>
                                            <button className="btn" data-cy="list-item-dislike">
                                                <span><img src={emoticonangry} alt="dislike"/>{' ' + item.nReactionDislike}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            }
        </div>

    );
}

export default Home;

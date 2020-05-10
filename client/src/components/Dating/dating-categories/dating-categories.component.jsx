import React, {useEffect} from 'react';
import Header from "../../Header/Header.component";
import DatingCategoriy from "./dating-category/dating-category.component";
import classes from './styles.module.scss'
import {connect} from "react-redux";
import {handlerDatingCategories} from "../../../redux/thunks/dating.thunks";
import Loader from "../../Loader/Loader";

const DatingCategories = props => {

    useEffect(() => {
        props.fetchDatingCategoties()
    }, []);

    return (
        <div>
            <Header>
                <h2>Выбери категорию</h2>
            </Header>

            <div className={classes.CategoriesList}>
                {props.categories ? props.categories.map(category => {
                    return <DatingCategoriy
                        key={category.id}
                        id={category.id}
                        title={category.title}
                        image={category.image}
                    />
                }) : <Loader/>}
            </div>
        </div>
    );
};

const mapState = state => ({
    categories: state.dating.categories
})

const mapDispatch = dispatch => ({
    fetchDatingCategoties: () => dispatch(handlerDatingCategories())
})

export default connect(mapState, mapDispatch)(DatingCategories);

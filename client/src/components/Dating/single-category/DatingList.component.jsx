import React, {useEffect} from 'react';
import Header from "../../Header/Header.component";
import {connect} from "react-redux";
import {handlerSingleCategoryLoad} from "../../../redux/thunks/dating.thunks";
import Loader from "../../Loader/Loader";

const DatingList = props => {

    useEffect(() => {
        props.fetchSingleCategory(props.match.params.id)
    }, [])

    return (
        (props.title && props.ads) ? <div>
            <Header>
                <h2>{props.title}</h2>
            </Header>
            {props.ads.map((ad, index) => <div key={index}>{ad.title}</div>)}
        </div> : <Loader/>
    );
};

const mapState = state => ({
    title: state.dating.singleCategory.title,
    ads: state.dating.singleCategory.ads
})

const mapDispatch = dispatch => ({
    fetchSingleCategory: id => dispatch(handlerSingleCategoryLoad({id}))
})

export default connect(mapState, mapDispatch)(DatingList);

import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { DetailsActions } from '../../flux/actions/DetailsActions';

const DetailsComponent = (props: any) => {
    const history = useHistory();

    useEffect(() => {
        const country = new URLSearchParams(history.location.search).get('country');
        DetailsActions.loadDetails(country as string);
    }, []);

    return <div className="container">
        {props.detailsState.loading ? <div>Loading...</div> : <div>
            <h4>Country: {props.detailsState.country}</h4>
            <h4>Total count: {props.detailsState.count}</h4>
        </div>}
    </div>
}

const Details = (props: any) => <DetailsComponent {...props} />

export { Details };
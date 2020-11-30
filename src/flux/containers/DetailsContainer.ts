import { Container } from "flux/utils";
import { Details } from "../../ui/details/details";
import DetailsStore from '../stores/DetailsStore';

function getStores() {
    return [DetailsStore];
}

function getState() {
    return {
        detailsState: DetailsStore.getState(),
    };
}

export default Container.createFunctional(Details, getStores, getState);
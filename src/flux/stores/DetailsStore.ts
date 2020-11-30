import { ReduceStore } from "flux/utils";
import Action from "../../models/Action";
import { DetailsModel } from "../../models/DetailsModel";
import { DetailsActionTypes } from "../actions/DetailsActionTypes";
import AppDispatcher from "../dispatcher/AppDispatcher";
import produce from 'immer';
import { APIUtil } from "../../utils/APIUtil";
import { APIEndpoints } from "../../common/APIEndpoints";
import { DetailsActions } from "../actions/DetailsActions";

class DetailsStore extends ReduceStore<DetailsModel, Action> {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState(): DetailsModel {
        return new DetailsModel();
    }

    reduce(state: DetailsModel, action: Action) {
        switch (action.type) {
            case DetailsActionTypes.LOAD_DETAILS: {
                this.loadDetails(action.payload.country);
                return produce(state, dState => {
                    dState.loading = true;
                });
            }
            case DetailsActionTypes.LOAD_DETAILS_COMPLETED: {
                return produce(state, dState => {
                    dState.country = action.payload.data.country;
                    dState.count = action.payload.data.count;
                    dState.loading = false;
                });
            }
            default:
                return state;
        }
    }

    private loadDetails(country: string) {
        APIUtil.get(APIEndpoints.CHARTS_DATA + '/' + country).then(result => {
            DetailsActions.loadDetailsCompleted(result);
        })
    }
}

export default new DetailsStore();

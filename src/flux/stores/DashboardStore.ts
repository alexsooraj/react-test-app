import { ReduceStore } from "flux/utils";
import { APIEndpoints } from "../../common/APIEndpoints";
import Action from "../../models/Action";
import { DashboardModel } from "../../models/DashboardModel";
import { APIUtil } from "../../utils/APIUtil";
import { DashboardActions } from "../actions/DashboardActions";
import { DashboardActionTypes } from "../actions/DashboardActionTypes";
import AppDispatcher from "../dispatcher/AppDispatcher";
import produce from 'immer';
import { AppUtils } from "../../utils/AppUtils";

class DashboardStore extends ReduceStore<DashboardModel, Action> {
    constructor() {
        super(AppDispatcher);
    }

    getInitialState(): DashboardModel {
        const authData = new DashboardModel();
        return authData;
    }

    reduce(state: DashboardModel, action: Action) {
        switch (action.type) {
            case DashboardActionTypes.LOAD_GRAPH_DATA: {
                this.loadGraphData();
                return state;
            }
            case DashboardActionTypes.LOAD_GRAPH_DATA_COMPLETED: {
                return produce(state, dState => {
                    dState.chartSeries[0].data = AppUtils.formatForBarchart(action.payload.data);
                    dState.chartDate = action.payload.chartDate;
                    dState.allData = action.payload.data;
                });
            }
            default:
                return state;
        }
    }

    private loadGraphData() {
        APIUtil.get(APIEndpoints.CHARTS_DATA).then(result => {
            DashboardActions.loadGraphDataCompleted(result.data, new Date(result.date));
        })
    }
}

export default new DashboardStore();

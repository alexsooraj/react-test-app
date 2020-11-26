import { ItemModel } from "../../models/ItemModel";
import AppDispatcher from "../dispatcher/AppDispatcher";
import { DashboardActionTypes } from "./DashboardActionTypes";

export class DashboardActions {
    static loadGraphData() {
        AppDispatcher.dispatch({
            type: DashboardActionTypes.LOAD_GRAPH_DATA
        });
    }
    static loadGraphDataCompleted(data: ItemModel[], chartDate: Date) {
        AppDispatcher.dispatch({
            type: DashboardActionTypes.LOAD_GRAPH_DATA_COMPLETED,
            payload: { data, chartDate }
        });
    }
}

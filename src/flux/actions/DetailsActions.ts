import AppDispatcher from "../dispatcher/AppDispatcher";
import { DetailsActionTypes } from "./DetailsActionTypes";

export class DetailsActions {
    static loadDetails(country: string) {
        AppDispatcher.dispatch({
            type: DetailsActionTypes.LOAD_DETAILS,
            payload: {
                country
            }
        });
    }
    static loadDetailsCompleted(data: any) {
        AppDispatcher.dispatch({
            type: DetailsActionTypes.LOAD_DETAILS_COMPLETED,
            payload: {
                data
            }
        });
    }
}

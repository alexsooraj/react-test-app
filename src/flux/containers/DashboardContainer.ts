import { Container } from "flux/utils";
import Dashboard from "../../ui/dashboard/dashboard";

import DashboardStore from "../stores/DashboardStore";

function getStores() {
    return [DashboardStore];
}

function getState() {
    return {
        dashState: DashboardStore.getState(),
    };
}

export default Container.createFunctional(Dashboard, getStores, getState);
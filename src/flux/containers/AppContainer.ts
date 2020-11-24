import { Container } from "flux/utils";
import App from "../../App";

import AuthStore from "../stores/AuthStore";

/**
 * Declaration of all stores associated with this container.
 */
function getStores() {
  return [AuthStore];
}

/**
 * Declaration of all stated associated with this container.
 */
function getState() {
  return {
    authState: AuthStore.getState(),
  };
}

export default Container.createFunctional(App, getStores, getState);

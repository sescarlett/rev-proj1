import { Store, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { state } from "./reducers/rootReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
// import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
// import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

const a: any = window;
const composeEnhancers = a.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  // stateReconciler: autoMergeLevel1,
  storage: storage,
};

const persistRed = persistReducer(persistConfig, state);

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

export const store: Store<any> = createStore(persistRed, enhancer);

export const persistor = persistStore(store);
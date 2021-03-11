const Redux = require("redux")
const reduxLogger =require('redux-logger')
const createStore = Redux.createStore;
const combineReducers =Redux.combineReducers;
const applyMiddleware =Redux.applyMiddleware;
const logger =reduxLogger.createLogger()

const BUY_CAKE = 'BUY_CAKE';
const BUY_ICE ='BUY_ICE';

function buycake() {
  return {
    type: BUY_CAKE,
    info: 'first redux action'
  }
}
function buyice(){
  return{
    type:BUY_ICE,
  }
}

// const initialstate = {
//   numofcake: 10,
//   numofice :20,
// }
const cakestate={
  numofcake:10
}
const icestate={
  numofice:20,
}

// const reducer = (state = initialstate, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state,
//         numofcake: state.numofcake - 1

//       }
//       case BUY_ICE:
//         return{
//           ...state,
//           numofice: state.numofice +1
//         }
//     default: return state
//   }
// }
const cakereducer=(state= cakestate,action)=>
{
  switch(action.type){
    case BUY_CAKE:
    return{
      ...state,
      numofcake : state.numofcake -1

    }
    default : return state
  }
}

const icereducer=(state=icestate,action)=>
{
  switch(action.type){
    case BUY_ICE:
      return{
        ...state,
        numofice : state.numofice -1
      }

      default :return state
    }
  
}

const rootreducer= combineReducers({
  cake:cakereducer,
  ice:icereducer
})


const store = createStore(rootreducer,applyMiddleware(logger));
const unsubscribe = store.subscribe(() => {});
// console.log('update state', store.getState())
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buyice());
store.dispatch(buyice());
unsubscribe();


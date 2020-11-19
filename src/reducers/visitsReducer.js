export default function visitsReducer(state = [],action){
  switch(action.type){
    case 'LOAD_VISITS':
      return action.visits;
    case 'ADD_VISIT':
      return [action.visit].concat(state);
    default:
      return state;
  }
}

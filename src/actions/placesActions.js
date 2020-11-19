import * as requests from '../requests/places';

export function loadPlaces(places){
  return { type: 'LOAD_PLACES', places };
}


export function loadAll(){
  return (dispatch,getState) =>{
    requests.getPlaces().then(result=>{
      console.log(result);
      dispatch(loadPlaces(result.docs));
    })
  }
}

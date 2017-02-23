export const PREDICT = "PREDICT";

export const predictImages = () => {
  return (dispatch, getState) => {
      console.log("PREDICT DISPATCH");
      let state = getState();
      let params = {
        start_index: state.start_index,
        end_index: state.end_index,
        filter_choice: 'all'
      };
      return HttpHelper.get("http://localhost:8000/prediction", params)
        .then((response) => {
          
        }).catch((err) => {
          console.log("Promise Failed");
        })
  }
}

import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

//Solve overfetching issus
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  //   const userIds = _.uniq(_.map(getState().posts, "userId"));
  //   userIds.forEach((id) => dispatch(fetchUser(id)));
  //no await cuz we dont care when it would appare and no code behind it
  //NOTE THAT: await CANNOT work with await

  //Can be replaced by chain function
  _.chain(getState().posts)
      .map('userId')
      .uniq()
      .forEach((id)=>dispatch(fetchUser(id)))
      .value() //.value() means execute the chain
};

//Use redux thunk to return a function
export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

// //Solve overfetching issus using _.memoize
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

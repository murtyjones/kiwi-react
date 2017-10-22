import ApiFetch from '../utils/ApiFetch'
import { ACTIONS } from '../constants'
import config from 'config'

export const getManyLessons = (params) => {
  console.log('inside getManyLessons in actions');
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_MANY_LESSONS_REQUEST })
    return ApiFetch(`${config.api}/api/lesson`, options)
    .then(res => {
      console.log('success getManyLessons actions. res: ', res);
      dispatch({ type: ACTIONS.GET_MANY_LESSONS_SUCCESS, payload: res })
    })
    .catch(e => {
      console.log('error getManyLessons actions. error: ', e);
      dispatch({ type: ACTIONS.GET_MANY_LESSONS_FAILURE, payload: e })
    })
  }
}

export const getLesson = (params) => {
  const { id } = params
  const options = {
    method: 'GET',
  }
  return dispatch => {
    dispatch({ type: ACTIONS.GET_LESSON_REQUEST })
    return ApiFetch(`${config.api}/api/lesson/${id}`, options)
    .then(res => {
      console.log("value of res in getUserProject Actions", res)
      dispatch({ type: ACTIONS.GET_LESSON_SUCCESS, payload: res })
    })
    .catch(e => {
      dispatch({ type: ACTIONS.GET_LESON_FAILURE, payload: e })
    })
  }
}

export const putLesson = (params) => {
  const { id, title, description } = params
  const options = {
    method: "PUT",
    body: {
      title: title
      , description: description
    }
  }
  return dispatch => {
    dispatch({ type: ACTIONS.PUT_LESSON_REQUEST })
    return ApiFetch(`${config.api}/api/lesson/${id}`, options)
    .then(res => {
      dispatch({ type: ACTIONS.PUT_LESSON_SUCCESS, payload: res})
    })
    .catch(e => {
      dispatch({ type: ACTIONS.PUT_LESSON_FAILURE, payload: e })
    })
  }
}

export const postLesson = (params) => {
  console.log('inside postLesson in Lessons Actions');
  console.log('value of params: ', params);
  const { code, title, description } = params
  console.log("value of code ", code);
  console.log('value of title ', title);
  console.log('value of description ', description);
  const options = {
    method: "POST",
    body: {
      code: code
      , title: title
      , description: description
    }
  }
  return dispatch => {
    dispatch({ type: ACTIONS.POST_LESSON_REQUEST })
    return ApiFetch(`${config.api}/api/lesson/`, options)
    .then(res => {
      dispatch({ type: ACTIONS.POST_LESSON_SUCCESS, payload: res })
      console.log('value of res in postLesson in Lesson Actions: ', res);
      return res
    })
    .catch(e => {
      dispatch({ type: ACTIONS.POST_LESSON_FAILURE, payload: e })
      console.log('value of error in postLesson in Lesson Actions: ', e);
    })
  }
}

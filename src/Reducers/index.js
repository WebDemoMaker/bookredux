const initialState = { books: [], is_auth: false }
export const reducer = (state = initialState, action) => {
  console.log("inside reducer", state)
  if (action.type == "ADD_BOOKS")
    return { ...state, "books": action.payload, is_auth: true }
  else if (action.type == "AUTH_USER")
    return { ...state, is_auth: true, "auth_user": action.payload }
  return state


}
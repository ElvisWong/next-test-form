import react, { createContext, useReducer } from 'react';

const initialState = {
  ans: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ANSWER":
      return {...state, ans: [...state.ans, action.value] };
    case "CLEAR_ANSWER":
      return {ans: []};
    default: throw new Error("Unexpected action");
  }
};

export const AnswerContext = createContext(initialState);

const AnswerContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AnswerContext.Provider value={{ ans: state, ansDispatch: dispatch }}>
      {props.children}
    </AnswerContext.Provider>
  )
}

export default AnswerContextProvider;

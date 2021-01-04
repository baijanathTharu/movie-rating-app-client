import { useReducer, createContext } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REVIEW':
      console.log('action: ', action);
      return { reviews: [...action.payload] };
    default:
      return { ...state };
  }
};

export const ReviewsContext = createContext();

export const ReviewsContextProvider = ({ children }) => {
  const [reviewState, reviewDispatch] = useReducer(reducer, { reviews: [] });

  return (
    <ReviewsContext.Provider value={[reviewState, reviewDispatch]}>
      {children}
    </ReviewsContext.Provider>
  );
};

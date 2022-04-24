import { reducer } from '../Reducers'
import { createStore } from 'redux';
export const store = createStore(reducer)
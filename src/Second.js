import './App.css';
import {store} from './Store';
import {useSelector} from 'react-redux'
function Second({props}) {
	// here in store we have getstate function which will return current state
	console.log("current state" ,store.getState())
	const name = useSelector(state=>state.name)
  // now lets update this staet value using dispatch 

  // here in dispatch we can pass type and payload property
  // and in reducer we can change state value accordin to the action type
  
  // for fetching the state from store we need to use useSelector hook

  return (
    <div>
    <h1>Second component name {name}</h1>

    {/*not passing a payload parameter since it is not required in my case*/}
    <button onClick={()=>store.dispatch({type:"CHAPRI"})}>Chapri style</button>
    <button onClick={()=>store.dispatch({type:"PLAYBOY"})}>Playbot style</button>
    <button onClick={()=>store.dispatch({type:"FAKE"})}>Fake style</button>
    
    </div>
  );
}

export default Second;
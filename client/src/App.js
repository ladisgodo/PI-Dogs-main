import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from './components/Home/Home'
import Details from './components/Details/Details'

function App() {
  return (
    <div>
        <Route exact path = '/' >
          <LandingPage/>
        </Route>
        <Route exact path='/home'>
          <Home/>
        </Route>
        <Route exact path='/dogs/:id'>
          <Details/>
        </Route>
    </div>
  );
}

export default App;

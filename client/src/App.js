import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from './components/Home/Home'

function App() {
  return (
    <div>
        <Route exact path = '/' >
          <LandingPage/>
        </Route>
        <Route exact path='/home'>
          <Home/>
        </Route>
    </div>
  );
}

export default App;

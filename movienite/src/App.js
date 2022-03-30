import logo from './logo.svg';
import './App.css';
<<<<<<< Updated upstream
import ResponsiveDrawer from './ResponsiveDrawer';
=======
import Notification from './Layout/Notification';
import ResponsiveDrawer, {
  Home
} from './ResponsiveDrawer/ResponsiveDrawer';
import {Routes, Route} from 'react-router';
>>>>>>> Stashed changes
function App() {
  // test
  // test2
  return (
    <div className="App">
<<<<<<< Updated upstream

      <ResponsiveDrawer/>
=======
      <Routes>
        <Route path={"/"} element={<ResponsiveDrawer/>}>
          <Route index element={<Home/>}/>
          <Route path={"notification"} element={<Notification/>}/>
          TODO Other pages from here
        </Route>
      </Routes>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;

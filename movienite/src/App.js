import logo from './logo.svg';
import './App.css';
import Notification from './Layout/Notification';
import ResponsiveDrawer, {
  Home
} from './ResponsiveDrawer/ResponsiveDrawer';
import {Routes, Route} from 'react-router';
function App() {
  return (
    <div className="App">
      <ResponsiveDrawer/>
      <Routes>
        <Route path={"/"} element={<ResponsiveDrawer/>}>
          <Route index element={<Home/>}/>
          <Route path={"notification"} element={<Notification/>}/>
          {/*TODO Other pages from here*/}
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import { auth } from "./Firebase";
import Auth from "./components/Auth";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import Rent from "./components/Rent";
import Sell from "./components/Sell";
import SingleHouse from "./components/SingleHouse";
import MyHouses from './components/MyHouses'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth/>} />
        <Route path="/" element={<Homepage/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/rent" element={<Rent/>}/>
        <Route path="/sell" element={<Sell/>}/>
        <Route path="/:id" element={<SingleHouse  />}/>
        <Route path="/myhouses" element={<MyHouses/>}/>
      </Routes> 
    </BrowserRouter>  
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Home from './pages/Home'
import AddData from './pages/AddData'
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <ToastContainer className="toast"></ToastContainer>
        <Route exact path='/' component={Home}/>
        <Route path='/add' component={AddData}/>
      </div>
    </BrowserRouter>
  );
}

export default App;

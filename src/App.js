import logo from './logo.svg';
import './App.css';
import Registration from './Registration';
import Login from './Login';
import {BrowserRouter as Router,Routes ,Route} from 'react-router-dom'
import Home from './Home';
import Admin from './Admin';
import  Editor1  from './Editor1';
import UploadFile from './UploadFile';


function App() {
  return (
    <div className="App">
      {/* <UploadFile/> */}
    {/* <Editor1/> */}
      <Router>
      <Routes>
        <Route exact path ="/" element={<Registration/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/home" element={<Home/>}/>
        <Route path ="/admin" element={<Admin/>}/>
      </Routes>
    </Router>  
    </div>
  );
}

export default App;

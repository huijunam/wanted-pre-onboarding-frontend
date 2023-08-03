// import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const App =() =>{
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  )
}
export default App;

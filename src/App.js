import { Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Todolist from './pages/Todolist';

const App =() =>{
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} /> 
      <Route path="/signin" element={<Signin />} />
      <Route path="/todo" element={<Todolist />} />
    </Routes>
  )
}
export default App;

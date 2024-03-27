import Home from './pages/home/Home.js';
import Profile from './pages/Profile/Profile.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.js'
import { Messenger } from './pages/Messenger/messenger.jsx';

import { BrowserRouter as Router , Routes , Route , Navigate} from 'react-router-dom'
import { useContext} from 'react'
import { Authcontext } from './context/AuthContext.jsx';

function App() {
  const {user} = useContext(Authcontext)
  return (
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home />: <Login />} />
          <Route path="/login" element={user ? <Navigate to="/" />: <Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/profile/:username" element={<Profile/>} />
          <Route path="/messenger" element={ user ? <Messenger/> : <Login/>} />
        </Routes>
      </Router>
  );
}

export default App;

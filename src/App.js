import React, { useState } from 'react';
import './App.css';
import { authLogin } from './services/auth.services';
import Assessments from './components/Assessments';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('_mereos') ? true : false);

  const handleLogin = async () => {
    try{
      const resp = await authLogin({ username, password })
     if(resp.data){
      localStorage.setItem('_mereos', JSON.stringify({ jwtToken: resp.data.access, validity: new Date().getTime() + resp.data.expires_in }));
      setIsLoggedIn(true);
     }
    }catch(error){
      console.error(error);
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <div>
          <h2>Login</h2>
          <div>
            <label>
              Username:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </label>
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <Assessments />
      )}
    </div>
  );
}

export default App;

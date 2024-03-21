import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simulate login process
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 5000); // 5 seconds loader

    // You can add your actual login logic here, like API calls
  };

  
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}> {/* onSubmit handler added to the form */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button> {/* This button will trigger form submission */}
      </form>	
      {isLoading && <Loader />}
      {isLoggedIn && !isLoading && <Dashboard />}
    </div>
  );
};

const Loader = () => (
  <div>
    <p>Loading...</p>
  </div>
);

const Dashboard = () => (
  <div>
    <h1>Welcome to Dashboard</h1>
    {/* Your dashboard content */}
  </div>
);

export default LoginForm;

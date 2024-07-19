import React from 'react';
import './index.css';
import FollowerList from './components/FollowerList';

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Twitter Followers Twubric</h1>
      </header>
      <main className="p-4">
        <FollowerList />
      </main>
    </div>
  );
}

export default App;

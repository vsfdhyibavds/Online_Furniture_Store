import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <iframe 
        src="/login.html" 
        className="w-full h-screen border-0"
        title="Authentication"
      />
    </div>
  );
}

export default App;
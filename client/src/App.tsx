import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1 className="page">Spoonful</h1>} />
    </Routes>
  );
}

export default App;
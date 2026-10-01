// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header";
import LandingPage from "./pages/landingPage/landingPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
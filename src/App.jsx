// App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SeatSelection from './components/SeatSelection';
import SeatDisplay from "./components/SeatDisplay";
import { SeatProvider } from "./components/SeatContext";


function App() {
  return (
    <SeatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SeatSelection />} />
          <Route path="/seats" element={<SeatDisplay />} />
        </Routes>
      </Router>
    </SeatProvider>
  );
}

export default App;

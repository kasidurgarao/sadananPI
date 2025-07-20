// App.js

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SeatSelection from './components/SeatSelection';
import SeatDisplay from "./components/SeatDisplay";
import { SeatProvider } from "./components/SeatContext";
import StarRating from "./components/StarRating";
import Chessboard from "./components/Chessboard";
import TelephoneFormatter from "./components/TelephoneFormatter";


function App() {
  return (
    <SeatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<TelephoneFormatter />} />
          {/* <Route path="/seats" element={<SeatDisplay />} /> */}
        </Routes>
      </Router>
    </SeatProvider>
  );
}

export default App;

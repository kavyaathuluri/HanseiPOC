import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminInterface from './AdminInterface'; // Import your admin interface component
import MemberVerificationForm from './MemberVerificationForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        {/* <Route path="/member-verification" element={<MemberVerificationForm />} /> */}
        <Route path="/" element={<MemberVerificationForm />} />
          <Route path="/admin" element={<AdminInterface />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserRegistration from './components/UserRegistration';
import SetupOrganisation from './components/SetupOrganisation';
import ChatbotIntegration from './components/ChatbotIntegration';
import SuccessScreen from './components/SuccessScreen';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserRegistration />} />
        <Route path="/setup-organisation" element={<SetupOrganisation />} />
        <Route path="/chatbot-integration" element={<ChatbotIntegration />} />
        <Route path="/success" element={<SuccessScreen />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;

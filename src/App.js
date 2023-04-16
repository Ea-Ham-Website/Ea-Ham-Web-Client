import { BrowserRouter, Routes, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TeamPage from "./pages/TeamPage";
import AboutUsPage  from "./pages/AboutUsPage";
import ForgotPassWord from "./pages/ForgotPassWord";
import SetNewPassWordPage from "./pages/SetNewPassWordPage";
import AddEventPage from "./pages/AddEventPage";
import AddMember from "./pages/AddMember";
import EventsPage from "./pages/EventsPage";
import UserDashboard from "./pages/UserDashboard";
import ParticipantsList from "./pages/ParticipantsList";
import  "./App.css"
import 'font-awesome/css/font-awesome.min.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/adminHome" element={<HomePage/>}/>
        <Route path="/forgotPassWord" element={<ForgotPassWord/>}/>
        <Route path="/setNewPassWordPage" element={<SetNewPassWordPage/>}/>
        <Route path="/addEvent" element={<AddEventPage/>}/>
        <Route path="/addMember" element={<AddMember/>}/>
        <Route path="/events" element={<EventsPage/>}/>
        <Route path="/userDashboard" element={<UserDashboard/>}/>
        <Route path="/participantsList" element={<ParticipantsList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
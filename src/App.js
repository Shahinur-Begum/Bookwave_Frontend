import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useMatch } from 'react-router-dom';
import './app.css';
import Navbar from './Components/Homepage/Navbar/Navbar';
import Home from './Components/Homepage/Home/home';
import Main from './Components/Homepage/Mains/Main';
import Footer from './Components/Homepage/Footerr/footer';
import LoginRegister from './Components/loginregister/LoginRegister';
import About from './Components/Homepage/About/about';
import Contact from './Components/Homepage/Contact/contact';
import Dashboard from './Components/Dashboard/dashboarduser';
import IntermediatePage from './Components/IntermediatePage/intermediatePage';
import AdminDash from './Components/AdminDash/admindash';
import Ebooks from './Components/Dashboard/Functions/Ebook/ebooks';
import AudiobookPlayer from './Components/Dashboard/Functions/Ebook/audio';
import Payment from './Components/Dashboard/Functions/Payment/payment';
import BookDetails from './Components/Dashboard/Functions/Book/bookdetail';
import Member from './Components/AdminDash/Function/Member/member';
import AdminBook from './Components/AdminDash/Function/AdminBook/adminbook';
import StoryBooks from './Components/Dashboard/Functions/Book/storybooks';
import CSEBooks from './Components/Dashboard/Functions/Book/csebooks';
import EEBooks from './Components/Dashboard/Functions/Book/eebooks'; 
import MEBooks from './Components/Dashboard/Functions/Book/mebooks';
import Profile from './Components/Profile/profile';
import Feedback from './Components/Dashboard/Functions/Feedback/feedback';
import SettingsPage from './Components/Dashboard/Functions/Settings/settings';
import AdminEbook from './Components/AdminDash/Function/AdminEbook/adminebook';
import AdminFeedback from './Components/AdminDash/Function/AdminFeed/adminfeed';
import AdminPayment from './Components/AdminDash/Function/Adminpay/adminpay';
import BorrowReturnPage from './Components/AdminDash/Function/Borrow/borrow';
import Thesis from './Components/Dashboard/Functions/Thesis/Thesis';
import AdminThesis from './Components/AdminDash/Function/AdminThesis/adminthesis';
const App = () => {
  const location = useLocation();
  const [members, setMembers] = useState([]); // Initial state is an empty array

  // Function to add a new member
  const addMember = (newMember) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };
 

  // Use useMatch to dynamically match routes like /bookdetail/:id
  const matchBookDetail = useMatch('/bookdetail/:id');

  // Define paths where Navbar should be hidden
  const navbarHiddenPaths = [
    '/login', 
    '/intermediate', 
    '/dashboarduser', 
    '/admindash', 
    '/ebooks', 
    '/audio', 
    '/payment', 
    '/bookdetail/:id',
    '/member',
    '/adminbook',
    '/storybooks',
    '/mebooks',
    '/csebooks',
    '/eebooks',
    '/profile',
    '/feedback',
    '/settings',
     '/adminebook',
     '/adminfeed',
     '/adminpay',
     '/borrow',
     '/Thesis',
     '/adminthesis'

  ];
   
  // If the current path matches /bookdetail/:id, we want to hide the navbar
  const showNavbar = !navbarHiddenPaths.some(path => location.pathname.startsWith(path) || location.pathname.includes('/bookdetail/'));

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <Home />
            <Main />
            <Footer />
          </>
        } />
        <Route path="/login" element={<LoginRegister addMember={addMember}  />} />
        <Route path="/intermediate" element={<IntermediatePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboarduser" element={<Dashboard />} />
        <Route path="/ebooks" element={<Ebooks />} />
        <Route path="/audio" element={<AudiobookPlayer />} />
        <Route path="/admindash" element={<AdminDash />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/bookdetail/:id" element={<BookDetails />} />
        <Route path="/member" element={<Member members={members}/>}/>
        <Route path="/adminbook" element={<AdminBook />}/>
        <Route path="/storybooks" element={<StoryBooks />}/>
        <Route path="/csebooks" element={<CSEBooks />}/>
        <Route path="/eebooks" element={<EEBooks />}/>
        <Route path="/mebooks" element={<MEBooks />}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
        <Route path="/settings" element={<SettingsPage />}/>
        <Route path="/adminebook" element={<AdminEbook/>}/>
        <Route path="/adminfeed" element={<AdminFeedback/>}/>
        <Route path="/adminpay"element={<AdminPayment/>}/>
        <Route path="/borrow" element={<BorrowReturnPage/>}/>
        <Route path="/Thesis" element={<Thesis/>}/>
        <Route path="/Adminthesis" element={<AdminThesis/>}/>
        </Routes>
    </div>
  );
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
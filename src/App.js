import './App.css';
import { lazy, Suspense, useContext, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {Route, Routes } from 'react-router-dom';
import { AuthContext} from './Components/Authentication/Authentication';
import Login from './Components/Dashboard/Login'
import Register from './Components/Dashboard/Register'
import LoadingPage from './Components/Home/LoadingPage';
import Footer from './Components/Footer/Footer';
import Menu from './Components/Dashboard/Menu';

const Profile=lazy(()=>import('./Components/Dashboard/Profile'));
const Home=lazy(()=>import('./Components/Home/Home'));
const AboutUs=lazy(()=>import('./Components/Dashboard/AboutUs'));
const AddSong=lazy(()=>import('./Components/Admin/AddSong'));
const UpdateSong=lazy(()=>import('./Components/Admin/UpdateSong'));
const AdminSongsList=lazy(()=>import('./Components/Admin/AdminSongsList'));
const UserSongsList=lazy(()=>import('./Components/User/UserSongsList'));
const CreatePlaylist=lazy(()=>import('./Components/User/CreatePlaylist'));
const AllPlaylists=lazy(()=>import('./Components/User/AllPlaylists'));
const SearchSongs=lazy(()=>import('./Components/User/SearchSongs'));
const UpdatePlaylist=lazy(()=>import('./Components/User/UpdatePlaylist'));
const Notifications=lazy(()=>import('./Components/Dashboard/Notifications'));

function App() {

  const navigate=useNavigate();
  const {logout,user}=useContext(AuthContext);

  useEffect(() => {
    if(user){
      const sessionTimeout = setTimeout(() => {
        alert('Session expired. Please log in again.');
        logout();
        navigate('/');
      }, 600000); // 10 mins (in milli seconds)
      return () => clearTimeout(sessionTimeout);
    }
  },[user]);

  const ProtectedRoute=({children,role})=>{
    const {user} =useContext(AuthContext);
    if (!user) {
      return <Navigate to='/login' />;
    }
    if (role && user.role !== role) {
      return <Navigate to='/' />;
    }
    return children;
  };

  return (
    <div className="App">
      
        <Menu/>
        <Suspense fallback={<LoadingPage/>}>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/aboutus' element={<AboutUs/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/profile' element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }></Route>
          <Route path='/notifications' element={
            <ProtectedRoute role="user">
              <Notifications/>
            </ProtectedRoute>
          }></Route>
          <Route path='/usersongs' element={
            <ProtectedRoute role="user">
              <UserSongsList/>
          </ProtectedRoute>
          }></Route>
          <Route path='/searchsongs' element={
            <ProtectedRoute role="user">
              <SearchSongs/>
          </ProtectedRoute>
          }></Route>
          <Route path='/allplaylists' element={
            <ProtectedRoute role="user">
              <AllPlaylists/>
          </ProtectedRoute>
          }></Route>
          <Route path='/createplaylist' element={
            <ProtectedRoute role="user">
              <CreatePlaylist/>
          </ProtectedRoute>
          }></Route>
          <Route path='/updateplaylist/:pid' element={
            <ProtectedRoute role="user">
              <UpdatePlaylist/>
          </ProtectedRoute>
          }></Route>
          <Route path='/adminsongs' element={
            <ProtectedRoute role="admin">
              <AdminSongsList/>
            </ProtectedRoute>
          }></Route>
          <Route path='/addsong' element={
            <ProtectedRoute role="admin">
              <AddSong/>
            </ProtectedRoute>
          }></Route>
          <Route path='/updatesong/:id' element={
            <ProtectedRoute role="admin">
              <UpdateSong/>
          </ProtectedRoute>
          }></Route>
        </Routes>
        </Suspense>
        <Footer/>
        
    </div>
  );
}

export default App;

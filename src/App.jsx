import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import './App.css';
import { useDispatch } from 'react-redux';
import authServices from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true); 
  const dispatch = useDispatch();

  useEffect(() => {
    authServices.getCurrentUser() 
      .then((userData) => {
        if (userData) {
          dispatch(login({userData}));
        } else {
          dispatch(logout());
        }
      })
      .catch(() => dispatch(logout())) 
      .finally(() => setLoading(false));
  }, [dispatch]);

  return loading ? null : (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

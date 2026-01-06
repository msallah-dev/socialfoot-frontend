import { useEffect, useState } from 'react'
import Routes from './components/Routes'
import './App.css'
import axios from 'axios';
import { StatusContext } from './components/AppContext';
import { useDispatch } from 'react-redux';
import { getUser, noFolloweds } from './actions/user.actions';
import type { AppDispatch } from './main';

function App() {
  const [status, setStatus] = useState<boolean>(false);
  const [cnx, steCnx] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkToken = async () => {
      await axios({
        method: "get",
        url: `${import.meta.env.VITE_APP_API_URL}auth/check-token`,
        withCredentials: true,
      })
        .then((res) => {
          setStatus(res.data.success);
          if (res.data.success) {
            dispatch(getUser());
            dispatch(noFolloweds());
          }
        })
        .catch((err) => {
          steCnx(false);
          console.log('Network Error: ', err)
        })
    };

    checkToken();
  }, [status, dispatch]);

  return (
    <>
      {cnx ?
        <StatusContext.Provider value={status}>
          <Routes />
        </StatusContext.Provider>
        :
        <div>Erreur serveur</div>
      }
    </>
  )
}

export default App

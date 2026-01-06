import { useContext } from 'react';
import Log from '../components/Log'
import { StatusContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';
import { useSelector } from 'react-redux';
import type { RootState } from '../main';

const Profil = () => {
    const status = useContext(StatusContext);
    const userData = useSelector((state: RootState) => state.userReducer)

    return (
        <div className="profil-page">
            {status && userData ?
                <UpdateProfil userData={userData} />
                :
                <div className="log-container">
                    <Log signin={false} signup={true} />
                    <div className="img-container">
                        <img src='./images/log.svg' alt='img-log' />
                    </div>
                </div>
            }
        </div>
    );
};

export default Profil;
import { useContext, useState } from 'react';
import Log from '../components/Log'
import { StatusContext } from '../components/AppContext';
import { useSelector } from 'react-redux';
import UpdateProfil from '../components/Profil/UpdateProfil';
import ProfilSharedPosts from '../components/Profil/ProfilSharedPosts';
import type { RootState } from '../main';
import { Tabs, Tab } from "@mui/material";

const Profil = () => {
    const [onglet, setOnglet] = useState<number>(0);
    const status = useContext(StatusContext);
    const userData = useSelector((state: RootState) => state.userReducer);

    return (
        <div className="profil-page">
            {status &&
                <Tabs
                    value={onglet}
                    onChange={(_e, value) => setOnglet(value)}
                    centered
                    sx={{
                        "& .MuiTab-root": {
                            "&:focus": { outline: "none" }
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: "#ff7b77",
                            height: 3
                        },
                        "& .MuiTab-root.Mui-selected": {
                            color: "rgb(0, 22, 44)"
                        },
                        borderBottom: "1px solid #E5E7EB"
                    }}
                >
                    <Tab label="Activité" />
                    <Tab label="Paramètres" />
                </Tabs>
            }

            {status && userData?.id_user ?
                onglet === 0 ?
                    <ProfilSharedPosts userId={userData.id_user} />
                    :
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
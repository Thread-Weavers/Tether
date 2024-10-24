import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";

export default function BioTether() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [partner, setPartner] = useState({});

    useEffect(() => {
        const loadPartner = async () => {
            const [user, error] = await getUser(currentUser?.partner_id);
            if (error) console.log(error.message);
            setPartner(user);
        };
        if (currentUser && currentUser.is_partnered) loadPartner();
    }, [currentUser]);

    return <>
    <div className="bio-tether">
        <h2>{partner?.username}</h2>
        <p>{partner?.bio}</p>
        <p>Status: {partner?.is_online ? "Online" : "Offline"}</p>
    </div>
    </>
}
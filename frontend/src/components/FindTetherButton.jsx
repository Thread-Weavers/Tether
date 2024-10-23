import { useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { findTether } from "../adapters/user-adapter";

export default function FindTetherButton() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const handleButton = async () => {
        console.log("let's find you a tether!");
        const tethered = await findTether(currentUser.id);
        if (!tethered){
            console.log('No users available');
            setPartner(null);
        } else{
            setPartner(tethered[0]);
            currentUser['is_partnered'] = true;
            currentUser['partner_id']  = tethered[0].id 
        } 
    }

    return <>
    <button onClick={handleButton}>
        Look for Tether
    </button>
    </>
} 
import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import Bio from "../components/Bio";
import GoalsList from "../components/GoalsList";
import RemindersList from "../components/RemindersList";
import RitualsList from "../components/RitualsList";
import { findTether } from "../adapters/user-adapter";

export default function YourTetherPage() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const handleButton = async () => {
        console.log("let's find you a tether!");
        const tethered = await findTether(currentUser.id);
        if (!tethered) console.log('No users available');
        else console.log(tethered);
    }
    
    return <>
    <Bio />
    <GoalsList  />
    <RemindersList />
    <RitualsList />    
    <button onClick={handleButton} >Look for Tether</button>
    </>
}
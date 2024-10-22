import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import Bio from "../components/Bio";
import GoalsList from "../components/GoalsList";
import RemindersList from "../components/RemindersList";
import RitualsList from "../components/RitualsList";

export default function YourTetherPage() {

    
    return <>
    <Bio />
    <GoalsList  />
    <RemindersList />
    <RitualsList />    
    </>
}
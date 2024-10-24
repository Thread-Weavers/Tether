import { useContext, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import Bio from "../components/Bio";
import Goals from "../components/Goals";
import Reminders from "../components/Reminders";
import Rituals from "../components/Rituals";

export default function ProfilePage() {

    return <>
    <Bio  />
    <Goals />
    <Reminders />
    <Rituals />
    </>
}
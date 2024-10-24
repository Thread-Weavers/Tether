import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { findTether } from "../adapters/user-adapter";

export default function FindTetherButton({ setPartner }) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const handleButton = async () => {
        console.log("let's find you a tether!");
        const tethered = await findTether(currentUser.id);
        if (!tethered) console.log('No users available');
        else setPartner(tethered[0]);
    }

    return <>
    <button onClick={handleButton}>
        Look for Tether
    </button>
    </>
} 
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { findTether } from "../adapters/user-adapter";

export default function FindTetherButton() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const handleButton = async () => {
        console.log("let's find you a tether!");
        const [tethered, error] = await findTether(currentUser.id);
        if (error) console.log(error);
        else setPartner(tethered);
    }

    return <>
    <button onClick={handleButton}>
        Look for Tether
    </button>
    </>
} 
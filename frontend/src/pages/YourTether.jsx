import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import Bio from "../components/Bio";
import GoalsList from "../components/GoalsList";
import RemindersList from "../components/RemindersList";
import RitualsList from "../components/RitualsList";
import { findTether } from "../adapters/user-adapter";
import BioTether from "../components/BioTether";
import { getUser } from "../adapters/user-adapter";
import FindTetherButton from "../components/FindTetherButton";

export default function YourTetherPage() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [partner, setPartner] = useState(null);


    useEffect(() => {
        const loadPartner = async () => {
          if(currentUser && currentUser['is_partnered']){
          const [user, error] = await getUser(currentUser['partner_id']);
          if (error) return setErrorText(error.message);
          setPartner(user);}
        };
    
        loadPartner();
      }, [currentUser]);
    
    return <>
    <Bio />
    <GoalsList  />
    <RemindersList />
    <RitualsList />    
    {currentUser && !currentUser['is_partnered'] && ( 
    <FindTetherButton setPartner={setPartner} /> // Use the new component
    )}
    {partner && <BioTether partner={partner} />}
    </>
}
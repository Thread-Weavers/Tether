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
import PartnerGoalsList from "../components/PartnerGoalsList";
import PartnerRemindersList from "../components/PartnerRemindersList";
import PartnerRitualsList from "../components/PartnerRitualsList";

export default function YourTetherPage() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [partner, setPartner] = useState(null);
    console.log(partner);

    useEffect(() => {
        const loadPartner = async () => {
          if(currentUser && currentUser.is_partnered) {
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
    <FindTetherButton setPartner={setPartner} />
    )}
    {partner && <BioTether partner={partner} />}
    {partner && <PartnerGoalsList partner={partner} />}
    {partner && <PartnerRemindersList partner={partner} />}
    {partner && <PartnerRitualsList partner={partner} />}
    </>
}
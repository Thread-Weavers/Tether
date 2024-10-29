import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import SiteHeadingAndNav from '../components/SiteHeadingAndNav';
import Bio from "../components/Bio";
import GoalsList from "../components/GoalsList";
import RemindersList from "../components/RemindersList";
import RitualsList from "../components/RitualsList";
import BioTether from "../components/BioTether";
import FindTetherButton from "../components/FindTetherButton";
import PartnerGoalsList from "../components/PartnerGoalsList";
import PartnerRemindersList from "../components/PartnerRemindersList";
import PartnerRitualsList from "../components/PartnerRitualsList";

export default function YourTetherPage() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    return <>
    <SiteHeadingAndNav />
    <Bio />
    <GoalsList  />
    <RemindersList />
    <RitualsList />
    {currentUser && !currentUser.is_partnered ? <FindTetherButton />
    :
    <>
      <BioTether />
      <PartnerGoalsList />
      <PartnerRemindersList />
      <PartnerRitualsList />
    </>
    }
    </>
}
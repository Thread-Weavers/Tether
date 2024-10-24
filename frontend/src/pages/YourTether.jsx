import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import Bio from "../components/Bio";
import GoalsList from "../components/GoalsList";
import RemindersList from "../components/RemindersList";
import RitualsList from "../components/RitualsList";
import BioTether from "../components/BioTether";
import FindTetherButton from "../components/FindTetherButton";
import PartnerGoalsList from "../components/PartnerGoalsList";
import PartnerRemindersList from "../components/PartnerRemindersList";
import PartnerRitualsList from "../components/PartnerRitualsList";
import { useNavigate } from "react-router-dom";

export default function YourTetherPage() {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();
    if (!currentUser.quest_flag) navigate('/questionnaire');

    return <>
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
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
import styles from '../styles/yourtether.module.css';
// import styles from '../styles/profile.module.css';

export default function YourTetherPage() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  return <>
  <SiteHeadingAndNav />
  <div className={styles.tetherContainer}>
    <div className={styles.tetherBlock}>
      <Bio />
      <GoalsList />
      <RemindersList />
      <RitualsList />
    </div>
        
    {currentUser && !currentUser.is_partnered ? (
        <FindTetherButton />
    ) : (
    <>
      <div className={styles.tetherBlock}>
        <BioTether />
        <PartnerGoalsList />
        <PartnerRemindersList />
        <PartnerRitualsList />
      </div>
    </>
    )}
</div>
    </>
}
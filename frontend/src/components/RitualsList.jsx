import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { getAllPublicRituals } from "../adapters/ritual-adapter";

export default function Rituals() {
    const { currentUser } = useContext(CurrentUserContext);
    const [rituals, setRituals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRituals = async () => {
            const publicRituals = await getAllPublicRituals(currentUser?.id);
            setRituals(publicRituals);
            setLoading(false);
        };
        if (currentUser) fetchRituals();
    }, [currentUser]);

    if (loading) {
        return <p>Loading Rituals...</p>;
    }

    return (
        <>
            <h3>Rituals</h3>
            <ul>
                {rituals.map((ritual, index) => (
                    <li key={index} className={ritual.completed ? "completed" : ""}>
                        <span>{ritual.content}</span>
                    </li>
                ))}
            </ul>
        </>
    );
}
import { useState, useEffect } from "react";
import { getAllRituals } from "../adapters/ritual-adapter";

export default function Rituals() {
    const [rituals, setRituals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRituals = async () => {
            const fetchedRituals = await getAllRituals();
            const publicRituals = fetchedRituals.filter(ritual => ritual.is_public);
            setRituals(publicRituals);
            setLoading(false);
        };
        fetchRituals();
    }, []);

    const toggleComplete = (index) => {
        const updatedRituals = [...rituals];
        updatedRituals[index].completed = !updatedRituals[index].completed;
        setRituals(updatedRituals);
    };

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
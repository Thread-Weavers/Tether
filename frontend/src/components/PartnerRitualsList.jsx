import { useState, useEffect } from "react";
import { getAllPublicRituals } from "../adapters/ritual-adapter";

export default function PartnerRitualsList({ partner }) {
    const [rituals, setRituals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRituals = async () => {
            if (partner) {
                const fetchedRituals = await getAllPublicRituals(partner.id);
                console.log('PARTNER RITUALS FETCHED: ', fetchedRituals);
                setRituals(fetchedRituals);
                setLoading(false);
            }
        };
        fetchRituals();
    }, [partner]);

    if (loading) {
        return <p>Loading Partner Rituals...</p>;
    }

    return (
        <>
            <h3>{partner.username}'s Rituals</h3>
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
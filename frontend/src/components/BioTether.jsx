import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { updateUser } from "../adapters/user-adapter";

export default function BioTether({ partner }) {

    return <>
    <div className="bio-tether">
        <h2>{partner.username}</h2>
        <p>{partner.bio}</p>
        <p>Status: {partner.is_online ? "Online" : "Offline"}</p>
    </div>
    </>
}
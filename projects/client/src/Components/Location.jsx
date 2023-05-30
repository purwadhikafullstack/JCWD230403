import React, { useState, useEffect } from "react";
import axios from "axios";


function Location(props) {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [branches, setBranches] = useState([]);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // earth radius in meters
        const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
        const φ2 = (lat2 * Math.PI) / 180;
        const Δφ = ((lat2 - lat1) * Math.PI) / 180;
        const Δλ = ((lon2 - lon1) * Math.PI) / 180;

        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // in meters

        return d;
    };


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                function (error) {
                    console.error("Error getting geolocation:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");

        }

        axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/allbranch`).then((response) => {
            setBranches(response.data);
        });
    }, []);

    useEffect(() => {
        if (latitude && longitude && branches.length > 0) {
            findNearestBranch();
        }
    }, [latitude, longitude, branches]);

    const findNearestBranch = () => {
        let minDistance = Infinity;
        let nearestBranch = null;
        branches.forEach((branch) => {
            const distance = calculateDistance(latitude, longitude, branch.latitude, branch.longitude);
            if (distance < minDistance) {
                minDistance = distance;
                nearestBranch = { ...branch, distance: minDistance };
            }
        });
        props.setNearestBranch(nearestBranch);
    }
    
    return (
        <div>
            {/* <h1>Latitude: {latitude}</h1>
            <h1>Longitude: {longitude}</h1> */}
        </div>
    );
}

export default Location;
"use client";
import {useEffect, useState} from "react";

const CountDisplayer = () => {
    const [entryId, setEntryId] = useState("");
    useEffect(() => {
        fetch("/api/count", {method: "POST"}).then(response => response.text().then(someValue => {
            console.log(someValue);
            setEntryId(someValue);
        }));
    }, [setEntryId]);
    return (
        <div>
            Thanks for ordering, your number is {entryId}. There are x people in front of you in the queue
        </div>
    );
}

export default CountDisplayer;

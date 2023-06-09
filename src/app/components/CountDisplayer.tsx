"use client";
import {useEffect, useState} from "react";

interface QueueNumberResult {
    entryid: string;
}

const CountDisplayer = () => {
    const [result, setResult] = useState<QueueNumberResult | undefined>(undefined);
    useEffect(() => {
        fetch("/api/enterQueue", {method: "POST"}).then(response => response.json().then(someValue => {
            console.log(someValue)
            setResult(someValue as QueueNumberResult);
        }));
    }, [setResult]);
    const [count, setCount] = useState("0");

    useEffect(() => {
        const interval = setInterval(() => {
            if (result) {
                fetch(`/api/counter/${result.entryid}`, {cache: "no-store"}).then(response => {
                    response.json().then(someCount => {
                        const {count} = someCount;
                        setCount(count);
                    })
                });
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [result, setCount]);


    if (result) {
        return (
            <div>
                Thanks for ordering, your number is {result.entryid}. There are {count} people in front of you in the queue
            </div>
        );
    } else {
        return ( <div>Loading</div> )
    }
}

export default CountDisplayer;

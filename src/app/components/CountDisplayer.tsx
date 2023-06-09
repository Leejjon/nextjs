"use client";
import {useEffect, useState} from "react";

interface QueueNumberResult {
    entryid: string;
}

const CountDisplayer = () => {
    const [result, setResult] = useState<QueueNumberResult | undefined>(undefined);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        fetch("/api/enterQueue", {method: "POST"}).then(response => response.json().then(someValue => {
            console.log(someValue)
            setResult(someValue as QueueNumberResult);
        }));
    }, [setResult]);
    const [count, setCount] = useState<string | undefined>(undefined);

    useEffect(() => {
        const interval = setInterval(() => {
            if (result && !ready) {
                fetch(`/api/counter/${result.entryid}`, {cache: "no-store"}).then(response => {
                    response.json().then(someCount => {
                        const {count} = someCount;
                        const {ready} = someCount;
                        setReady(ready);
                        setCount(count);
                    })
                });
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [result, setCount, setReady]);


    if (result) {
        if (ready) {
            return (
                <div>
                    Your may order at the desk now! Your number: {result.entryid}.
                </div>
            )
        } else {
            return (
                <div>
                    Thanks for ordering, your number is {result.entryid}.
                    {count ? ` There are ${count} people in front of you in the queue` : " Loading..."}
                </div>
            );
        }
    } else {
        return ( <div>Loading</div> )
    }
}

export default CountDisplayer;

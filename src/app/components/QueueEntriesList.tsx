import {useEffect, useState} from "react";

const QueueEntriesList = function() {
    const [openEntries, setOpenEntries] = useState<Array<string>>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch(`/api/queue`, {cache: "no-store"}).then(response => {
                response.json().then(entriesFromServer => {
                    if (entriesFromServer) {
                        const {entries} = entriesFromServer;
                        setOpenEntries(entries);
                    }
                })
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [setOpenEntries]);

    const removeItem = async (entryid: string) => {
        await fetch(`/api/update/${entryid}`, {method: "POST"})

        const newList: Array<string> = [];
        openEntries.forEach(item => {
            if (item !== entryid) {
                newList.push(item);
            }
        });
        setOpenEntries(newList);
    }

    if (openEntries.length > 0) {
        return (
            <div>
                <p>Hello Cashier, you have {openEntries.length} open orders</p>
                <ul>
                    {openEntries.map((entry, key) => {
                        return <li key={key}>{entry} <button onClick={() => removeItem(entry)}>Mark as done</button></li>
                    })}
                </ul>
            </div>
        );
    } else {
        return (
            <div>
                <p>Hello Cashier, you have {openEntries.length} open orders, you can relax!</p>
            </div>
        )
    }
}
export default QueueEntriesList;

import React, { useState } from 'react';
import './App2.css';

function App2() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        console.log("firstName", firstname);
        console.log("lastName", lastname);
        console.log("username", username);
        console.log("password", password);

        let openRequest = indexedDB.open("myData", 1);
        let db;
        
        openRequest.onupgradeneeded = (e) => {
            db = e.target.result;
            if (!db.objectStoreNames.contains("information")) {
                let objectStore = db.createObjectStore("information", { keyPath: "username" });
                objectStore.createIndex("firstname", "firstname", { unique: false });
                objectStore.createIndex("lastname", "lastname", { unique: false });
            }
        };

        openRequest.onsuccess = (e) => {
            db = e.target.result;
            let transaction = db.transaction("information", "readwrite");
            let objectStore = transaction.objectStore("information");
            let request = objectStore.add({
                username: username,
                firstname: firstname,
                lastname: lastname,
                password: password
            });
            request.onsuccess = (e) => {
                console.log("request success");
            };
            request.onerror = (e) => {
                console.log("request error");
            };
            transaction.oncomplete = (e) => {
                console.log("transaction complete");
            };
            transaction.onerror = (e) => {
                console.log("transaction error");
            };
        };

        openRequest.onerror = (e) => {
            console.error("error", e.target.error);
        };
    };

    return (
        <div className="container">
            <form onSubmit={submitForm}>
                <label htmlFor="firstname">First Name</label>
                <input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <label htmlFor="lastname">Last Name</label>
                <input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button id="btn">Submit</button>
            </form>
        </div>
    );
}

export default App2;

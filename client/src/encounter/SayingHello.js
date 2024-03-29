import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SayingHello() {
    const [users, setUsers] = useState(["Matteo"]);
    const [searchTerm, setSearchTerm] = useState("");
    const [countries, setCountries] = useState([]);
    // const [users, setUsers] = useState({
    //     name: "matteo"
    //     age: 36
    // });
    // setUsers([...users, [e.target.name]: e.target.value]);

    // const [user2, setUser2] = useState("Laura");
    // const [user3, setUser3] = useState("Pluto");
    // console.log("user :>> ", user);
    // ⬇️*************SONO LA STESSA COSA*************
    // setUser("John");
    // this.setState()
    // ⬆️*************SONO LA STESSA COSA*************

    // function updateGreeting(e) {
    //     setUser(e.target.value);
    // }
    useEffect(() => {
        fetch(`https://spicedworld.herokuapp.com/?q=${searchTerm}`)
            .then((res) => res.json())
            .then((results) => {
                console.log("results :>> ", results);
                setCountries(results);
            })
            .catch(console.log);

        return () => {
            console.log(`About to replace ${searchTerm} with a new value :>> `);
        };
    }, [searchTerm]);

    useEffect(() => {
        console.log("users", users);
        return () => {
            console.log(`component is unmounting`);
        };
    }, []);

    const updateGreeting = (e) => {
        if (e.key === "Enter") {
            setUsers([...users, e.target.value]);
            e.target.value = "";
        }
    };

    return (
        <>
            {/* <input
                type="text"
                defaultValue={user}
                onChange={(e) => setUser(e.target.value)}
            /> */}
            {/* <h1>Hello {user1}</h1>
            <h1>Hello {user2}</h1>
            <h1>Hello {user3}</h1> */}
            <input type="text" onKeyDown={updateGreeting} />
            <h1>Hello {users[0]}</h1>

            {users.map((user) => (
                <p key={user}>{user}</p>
            ))}

            <h1>SEARCH FOR COUNTRY</h1>
            <input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* {countries && countries.map((country) => (
                <p key={country}>{country}</p>
            ))} */}
            {countries?.map((country) => (
                // <Link to="/">
                <p key={country}>{country}</p>
            ))}
        </>
    );
}

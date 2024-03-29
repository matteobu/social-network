import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FindBikerz(props) {
    console.log("PROPS IN FIND BIKERZ", props);
    const [bikerz, setBikerz] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    // const [countries, setCountries] = useState([]);

    useEffect(() => {
        // IF ASYNC ON USE EFFECT USE ASYN IIFE // HINT FROM MERLE DO NOT DELETE
        // (async ()=>{  })() // HINT FROM MERLE DO NOT DELETE
        (async () => {
            if (!searchTerm) {
                const result = await fetch("/lastThreeUsers").catch((err) =>
                    console.log(err)
                );
                const { rows } = await result.json();
                console.log("json result from fetch last three users", rows);
                setBikerz(rows);
            } else {
                const result = await fetch(`/userList/${searchTerm}`);
                const { rows } = await result.json();
                console.log("json result from fetch last three users", rows);
                setBikerz(rows);
            }
        })();

        return () => {
            // console.log(`About to replace ${searchTerm} with a new value :>> `);
        };
    }, [searchTerm]);

    return (
        <>
            <div className="find-bikerz-container">
                <input
                    className="find-bikerz-input"
                    type="text"
                    placeholder="search here for new friends"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="result-input">
                    {bikerz &&
                        bikerz.map((biker, i) => (
                            <div className="user-result-container" key={i}>
                                <Link to={`bikerz/${biker.id}`}>
                                    <img
                                        className="result-icon"
                                        src={biker.pic_url}
                                    ></img>
                                    <h3>
                                        {biker.first} {biker.last}
                                    </h3>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}

// HERE BELOW IS THE PROMISES CODE NOT REFACTORED
// fetch("/lastThreeUsers")
//         .then((res) => res.json())
//         .then(({ rows }) => {
//             // console.log("results :>> ", rows);
//             // let biker = rows[0].first;
//             setBikerz(rows);
//         })
//         .catch(console.log);
// } else {
//     // fetch(`/allMatchUsers/:${searchTerm}`);
//     fetch(`/userList/${searchTerm}`)
//         .then((res) => res.json())
//         .then(({ rows }) => {
//             // console.log("results :>> ", rows);
//             // let biker = rows[0].first;
//             setBikerz(rows);
//         })
//         .catch(console.log);

// HERE BELOW THERE IS THE CODE FROM THE ENCOUNTER PLEASE DO NOT CUT OR PASTE ANYTHING JUST COPY (ORIGINAL DO NOT DELETE)
// export default function FindBikerz() {
//     const [users, setUsers] = useState(["Matteo"]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [countries, setCountries] = useState([]);
//     // const [users, setUsers] = useState({
//     //     name: "matteo"
//     //     age: 36
//     // });
//     // setUsers([...users, [e.target.name]: e.target.value]);

//     // const [user2, setUser2] = useState("Laura");
//     // const [user3, setUser3] = useState("Pluto");
//     // console.log("user :>> ", user);
//     // ⬇️*************SONO LA STESSA COSA*************
//     // setUser("John");
//     // this.setState()
//     // ⬆️*************SONO LA STESSA COSA*************

//     // function updateGreeting(e) {
//     //     setUser(e.target.value);
//     // }
//     useEffect(() => {
//         fetch(`https://spicedworld.herokuapp.com/?q=${searchTerm}`)
//             .then((res) => res.json())
//             .then((results) => {
//                 console.log("results :>> ", results);
//                 setCountries(results);
//             })
//             .catch(console.log);

//         return () => {
//             console.log(`About to replace ${searchTerm} with a new value :>> `);
//         };
//     }, [searchTerm]);

//     useEffect(() => {
//         console.log("users", users);
//         return () => {
//             console.log(`component is unmounting`);
//         };
//     }, []);

//     const updateGreeting = (e) => {
//         if (e.key === "Enter") {
//             setUsers([...users, e.target.value]);
//             e.target.value = "";
//         }
//     };

//     return (

//         <>
//             {/* <input
//                 type="text"
//                 defaultValue={user}
//                 onChange={(e) => setUser(e.target.value)}
//             /> */}
//             {/* <h1>Hello {user1}</h1>
//             <h1>Hello {user2}</h1>
//             <h1>Hello {user3}</h1> */}
//             <input type="text" onKeyDown={updateGreeting} />
//             <h1>Hello {users[0]}</h1>

//             {users.map((user) => (
//                 <p key={user}>{user}</p>
//             ))}

//             <h1>SEARCH FOR COUNTRY</h1>
//             <input
//                 type="text"
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             {/* {countries && countries.map((country) => (
//                 <p key={country}>{country}</p>
//             ))} */}
//             {countries?.map((country) => (
//                 // <Link to="/">
//                 <p key={country}>{country}</p>
//             ))}
//         </>
//     );
// }

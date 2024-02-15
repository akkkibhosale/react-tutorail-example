import React, { useContext } from "react"
import { createContext } from "react"
// import { useState } from "react"

const UserContext = createContext()

function Component1() {
    const user = 'ABCD'
    return (
        <UserContext.Provider value={user}>
            <h1>Hii {user}</h1>
            <Component2 />
        </UserContext.Provider>
    )
}

function Component2() {
    return (
        <Component3 />
    )
}
function Component3() {
    const user = useContext(UserContext);
    return (
        <UserContext.Provider value={user}>
            <h2>{`Hello ${user} again!`}</h2>
        </UserContext.Provider>
    )
}

export default Component1;
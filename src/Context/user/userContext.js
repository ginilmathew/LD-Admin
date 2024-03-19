import React, { useState, useEffect } from "react";
import Context from "./index";




const UserProvider = (props) => {

    const [user, setUser] = useState(null);

    return (
        <Context.Provider
            value={{
                ...props,
                user,
                setUser: setUser
            }}
        >
            {props.children}
        </Context.Provider>
    );
}

export default UserProvider;
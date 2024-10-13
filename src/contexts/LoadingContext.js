import React, { createContext, useState } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = ({children}) => {

    const [ loading, setLoading ] = useState();

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )

};
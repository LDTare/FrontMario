import React, {createContext, useState, useEffect, useMemo } from "react";
import { RequisicionService } from "../services/RequisicionService";
import { DRequisicionService } from "../services/DRequisicionService";

export const ERequisicionContext = createContext();

const ProductContextProvider = (props)=>{
    const erequisicionService = useMemo(() => new RequisicionService(), []);
    const derequisicionService = useMemo(() => new DRequisicionService(), []);
    
    const [erequisicions, setErequisicions] = useState([]);
    const [derequisicions, setDErequisicions] = useState([]);

    useEffect(() => {
        erequisicionService.readAll().then((data) => setErequisicions(data));
        derequisicionService.readAll().then((data) => setDErequisicions(data));
    }, [erequisicionService, derequisicionService, derequisicions, erequisicions]);


    return(
        <ERequisicionContext.Provider 
            value={{
                erequisicions,
                derequisicions
            }}>
            {props.children}
        </ERequisicionContext.Provider>
    );
};
export default ProductContextProvider;
import { SignInContext } from "./contextCreate";

const ContextServiceAdmin=({children, signAdmin , setSignAdmin})=>{
    return(
         <SignInContext.Provider value={{signAdmin, setSignAdmin}}>
            {children}
         </SignInContext.Provider>
    )
}

export default ContextServiceAdmin


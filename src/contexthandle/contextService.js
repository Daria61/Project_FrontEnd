import { SignInContext } from "./contextCreate";


const ContextService=({children, signAdmin , setSignAdmin})=>{
    return(
         <SignInContext.Provider value={{signAdmin, setSignAdmin}}>
            {children}
         </SignInContext.Provider>
    )
}

export default ContextService
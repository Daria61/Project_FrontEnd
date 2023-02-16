import { Filter, Search , UserLogin} from "./contextCreate"


const ContextService=({children, filter , setFilter, searching , setSearching , user , setUser})=>{
    return(
        <UserLogin.Provider value={{user , setUser}}>
        <Search.Provider value={{ searching , setSearching}}>
        <Filter.Provider value={{filter , setFilter}}>
            {children}
        </Filter.Provider>
        </Search.Provider>
        </UserLogin.Provider>
    )
}
export default ContextService
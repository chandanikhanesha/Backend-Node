import React, { createContext } from 'react';
import Coma from './Coma';

const Firstname = createContext();
const lastname =createContext();
const App2 =()=>
{
    return(
        <Firstname.Provider value={"ck"}>
        <lastname.Provider value={"chandani"}>
    <Coma/>
    </lastname.Provider>
    </Firstname.Provider>
    );
}
export default App2;
export {Firstname,lastname};
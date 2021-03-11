import React from 'react';
// import Heading from './Heading';
// import Pr from './Pr';
import Data from './Data';
import Card from './Card';
// import Netflix from './Netflix';
// import Amazon from './Amazon';


function scard(val){
    return(
        <Card
            imgsrc={val.imgsrc}
            iname={val.iname}
            cname={val.cname}
            link={val.link}
            />
        
    );
}
// const favseries="netflix";

// const Fav =()=>
// {
//     if(favseries==="netflix")
//     {
//         return (<Netflix/>);

//     }
//     else
//     {
//         return (<Amazon />);
//     }
// }
const App=()=>
(
    
    // <Heading></Heading>
    // <Pr />
    <>
    
    <h1 className="heading">MY FAVOURITE NETFLIX SERIES</h1>
    {Data.map(scard)}
    {/* <Fav /> 

   {favseries=="netflix"?<Netflix/>:<Amazon/>} */}
    </>

);

export default App;
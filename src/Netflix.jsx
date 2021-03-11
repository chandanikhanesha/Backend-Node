import React from 'react';
import Card from './Card';
import Data from './Data';

const Netflix =() =>
{
    return (

        <Card
        
      
        
        imgsrc={Data[0].imgsrc}
        iname={Data[0].iname}
        cname={Data[0].cname}
        link={Data[0].link}

        
       
        />
    );
}
export default Netflix;
import React from 'react';

function Card(pops)
{
    return(
        <>
        <div className="card">
          <div className="cards">
           <img src={pops.imgsrc} alt="net pro" className="c_img"></img>
              <div className="c_info">
                <span className="c_category">{pops.cname}</span>
                <h3 className="c_title">{pops.iname}</h3>
                <a href={pops.link} target="_ck">
                    <button>watch now</button>
    
                </a>
    
    
              </div>
    
          </div> 
    
        </div>
        </>
    );
       

}

export default Card;
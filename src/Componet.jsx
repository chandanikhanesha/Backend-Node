import { RestaurantMenu } from '@material-ui/icons';
import React from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import Note from './Note';
import Contact from './Contact';
import Erorr from './Erorr';
import Menu from './Menu';
import User from './User';
import Serch from './Serch';
const Componet =()=>

{
    const Name=(pops)=>
    {
        return<h1>hyyy i am  {pops.name} page</h1>
    };
    return(
        <>
    <Menu />
    <Switch>     
          <Route exact path="/" component={()=><Note/>}/>
          <Route  exact path="/contact" component={()=><Contact name="contact"/>}/>
          <Route path="/contact/name" render={()=><Name name="name"/>}/>
          <Route path="/user/:fname/:lname" component={User} />
          <Route exact path="/serch" component={Serch}/>
                     <Route component={Erorr}/>
                     {/* to display error page  */}
                     <Redirect to="/"/>
                     {/* going to home page */}
           
           </Switch>
           
           </>
    );

         
}

export default Componet;
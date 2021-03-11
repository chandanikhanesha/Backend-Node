import React, { Component } from 'react';


class Class extends Component{
 
    
state={
        name:"chandani",
        age:20,
        study:this.props.study,
        surname:this.props.surname
    };
    
ck=()=>
{
    this.setState({age:19,name:"ck"})

}
render(){
    return(
    
            <>
                <h3>hello {this.state.name} {this.state.age}</h3>
                <h2>{this.state.study}</h2>
                <h3>my surname is {this.state.surname}</h3>
                <textarea style={{width:"250px"}} placeholder="enter your address"/>
                <button onClick={this.ck}>change</button>
            </>
        
    )
}
}
export default Class;

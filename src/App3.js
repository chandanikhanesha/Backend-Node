import React from 'react'
import Cakecontain from './Componet/Cakecontain'
import { Provider } from 'react-redux'
import store from './Redux/Store'
import Hookcakecontainer from './Componet/Hookcakecontainer'
import Icecontain from './Componet/Icecontain'
import Newcakecontain from './Componet/Newcakecontain'
import Itemcontainer from './Componet/Itemcontainer'
import Usercontainer from './Componet/Usercontainer'

function App3() {
    return (
       <>
       <Provider store={store}>
                <Usercontainer/>
              <Cakecontain/>
              <Hookcakecontainer/>
          
              <Newcakecontain/>
              <Itemcontainer cake/>
              <Itemcontainer/>
              <Icecontain/>
              </Provider>

       </>
    )
}

export default App3

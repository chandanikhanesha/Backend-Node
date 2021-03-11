import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css" ;
const Boot =()=>
{
    return(
        <>
        <h1 className="text-center text-capitalize">welcome to my page</h1>
        <div class="container">
  <div class="row">
  <div class="col-sm">
      <div class="card" >
  <img src="https://picsum.photos/200/300" class="card-img-top" alt="..." height="250px" />
  <div class="card-body">
    <h5 class="card-title">image 1</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>
    <div className="col-sm">
      <div class="card" >
  <img src="https://picsum.photos/201/300" class="card-img-top" height="250px"  />
  <div class="card-body">
    <h5 class="card-title">image 2</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>
    <div className="col-sm">
      <div class="card" >
  <img src="https://picsum.photos/202/300" class="card-img-top" alt="..." height="250px"/>
  <div class="card-body">
    <h5 class="card-title">image 3</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

    </div>
  </div>
</div>

        </>
    );
}

export default Boot;
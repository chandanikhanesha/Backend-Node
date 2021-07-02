 var a=0;
 var id=setInterval(anim,400)
 function anim()
 {
     a= a+10;
     if(a==200)
     {
         clearInterval(id);
     }
     else
     {
         var taregt = document.getElementById("test");
         taregt.style.width = a + 'px';
     }
 }

 var id1=setTimeout(anim2,3000)
 function anim2()
 {
     var target= document.getElementById("stop");
     target.style.width="400px";
 }

 function stop()
 {
     clearTimeout(id1);
 }
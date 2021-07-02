document.write("hello world</br>");
document.write("hello world</br>");

var a="ck";
console.log(a);

var n=40;
var n1=50;

var sum= n+n1;
console.log(sum);

//type of var
console.log(typeof n);
console.log(typeof a);

if(n>n1)
{
    console.log(n  +"is greater");

}
else
{
    console.log(n1 + " is greater");
}

//logical

if(n>30 && n<50)
{
    console.log("third class");

}
else if(n>50 && n<70)
{
    console.log("second class ");

}
else
{
    console.log("fail");
}
//not

if(!(n==n1))
{
    console.log("no");
}
else
{
    console.log("yes");
}
//ternary
var a=4;
var b;
 (a>10)?b=true:b=false;
 console.log(b);
//switch case
var flower ="rose";//prompt("enter flower name");

switch(flower)
{
    case "rose":
        console.log("your flower is rose");
        break;

    case "louts":
        console.log("your flower is louts");
        break;
    default:
        console.log("enter the name of flower");
        break;

}
/*confirm box
var a= confirm("do you like our page?");
if(a)
{

alert("thank you");
}
else
{
    alert("sorry for that");
}
promt box
var name= prompt("enter your name");
alert(name);
document.write(name);
*/
function abc(){
    console.log("name:ck");
    console.log("age:18");
}

abc();
abc();

function sum1(n1,n2)
{
    document.write(n1+n2);
}
sum1(10,5);
sum1(20,5);

function myf3(n1,n2)
{
    sum=n1+n2;
    return sum;
}

var f3 =myf3(10,5);
document.write(f3);

//global var a="ck";

function fun()
{var a="ck";//local
    document.write(a);
}
fun();
document.write(a);

function hello()
{
    document.write("hello you are perfect");
}
//while
var a=1;
while(a<10)
{
    document.write(a + "<li>your loop</li>");
    a++;
}
//do while
var b=2;
do{
    document.write(b + "<br>");
    b++;
}while(b<10)

//forloop

for(var i=0;i<10;i++)
{   
    if(i==3)
    {
        //break;
        continue;
    }
    
    document.write(i + "<br>");

}

//even
for(var i=0;i<10;i++)
{   
    if(i% 2==0) 
    
    document.write(i+ "<br>");

}
//odd
for(var i=0;i<10;i++)
{   
    if(i% 2==1) 
    
    document.write(i + "<br>");

}

//nested loop
for(var a=1;a<=100;a=a+10)
{
    for(b=a;b<a+10;b++)
    {
        document.write(b + " ");
    }

    document.write("<br>")
}

//patten
for(a=1;a<=6;a++)
{
    for(b=1;b<=6-a;b++)
    {
        document.write(b +" ");
        
    }
    document.write("<br>")
}

for(a=1;a<=5;a++)
{
    for(b=1;b<=a;b++)
    {
        document.write( a +" ")
    }
    document.write("<br>")
}
//dont run this loop
/*for(a=5;a>=0;a--)
{
    for(b=5;b<=a;b++)
    {
        document.write(b +" ")

    }
    document.write("<br>")
}*/
//array
var arr=[10,20,30,40]
document.write(arr +"<br>");
var sum=0;
    for(i=0;i<4;i++)
    {
        document.write(arr[i] +" ");
        sum=sum+arr[i] ;
    }
    document.write(sum + "<br>");


var arr= new Array();
arr[0]=10;
arr[1]=20;
arr[2]="ck";

for(i=0;i<3;i++)
{
    document.write(arr[i])
}


var marr=[
[1,"ck","bca"],
[2,"bk","mca"],
[3,"dk","mca"],
];
document.write("<table border='1'>")
for(a=0;a<3;a++)
{ document.write("<tr>")
    for(b=0;b<3;b++)
    {
        document.write("<td>" + marr[a][b]+"</td>");
    }
    document.write("</tr>")
}
document.write("</table>")

//delte array
delete marr[0][2];
document.write(marr);

//modify array
 var arr2=[10,20];
 document.write(arr2);
 arr2[0]=100;
 document.write (arr2);
//sort and reverse

var a=["dk","bk","jk"];
document.write(a +"<br>");
a.sort();
document.write(a +"<br>");
a.reverse();
document.write(a +"<br>");

//pop AND push
a.pop();
document.write  (a +"<br>");
a.push("mom");
document.write(a+"<br>");

//shift and unshift
a.shift();
document.write(a +"<br>");
a.unshift("dad");
document.write(a+"<br>");
//concat aand join
var a=["dk","bk","jk"];
var b=[10,20,30];

var c= a.concat(b);
document.write(c +"<br>");

var d=c.join(" ");
document.write(d+"<br>" );

//slice and splice
var a=["dk","bk","jk"];
var s= a.slice(1,3);
document.write(s +"<br>");
a.splice(2,1,"neha","kuku");
document.write(a + "<br>")

//is array
var z="ck";
//var c= Array.isArray(z);
if(Array.isArray(z)==true)
{
    document.write("this is a array");
    
}
else{
    document.write("this is not a array");
}
//document.write(c + "<br>");

//indexof and last indexof
var a=["dk","bk","jk","jk"];
var d= a.indexOf("dk");
document.write(d +"<br>");

var d= a.indexOf("jk");
document.write(d +"<br>");

var e= a.lastIndexOf("jk");
document.write(e);

//include
var a=["dk","bk","jk","jk"];

//var d=a.includes("dk");

if(a.includes("pk")==true)
{
    document.write("it is in aaray");
}
else{
    document.write("it is not in aaray");
}
//document.write(d);

//some and every

var age=[10,20,18,15];
document.write(age +"<br>");

var d = age.some(checkadult);
document.write(d+"<br>");

function checkadult(age)
{
    return age>=18;
}
//every
var age=[10,20,18,15];
document.write(age +"<br>");

var d = age.every(checkadult)
document.write(d);

function checkadult(age)
{
    return age>=18;
}

//find and findindex
var age=[10,20,18,15];

var d = age.find(checkadult)
document.write(d+"<br>");

function checkadult(age)
{
    return age>=18;
}

//
var age=[10,20,18,15,50];
document.write(age +"<br>");

var d = age.findIndex(checkadult)
document.write(d+"<br>");

function checkadult(age)
{
    return age>=18;
}

//filter

var d= age.filter(checkadult)
document.write(d +"<br>")

function checkadult(age)
{
    return age>=18;
}
//tostring,fill,valueof

var d=["ck","gk"];
d.fill("ram");
document.write(d);
//for eac
var a=["dk","bk","jk","jk"];
a.forEach(function(value,index)
    {
        document.write(index + ":"+ value+ "<br>");
    }

);
//object

var person={
    fname:"ck",
    lname:"khanesha",
    age:20,
    salary: function()
    {
        return 2500;
    },
    fullname:function(){
        return  this.fname +" "+ this.lname;
    },
    live:{
        city: "surat",
        state : "gujarat"
    },
    marks:[10,20,30]
};
console.log(person);
console.log(person.live);
document.write(person.salary());
document.write(person.fullname()+"<br>");

//newobject
var a= new Object();
a.fname="ck";
a.lname ="khanesha";
console.log(a);
//const

//for in loop
var obj={
    fname:"ck",
    lanme:"kk"
};
for(var key in obj)
{
    document.write(key +":"+obj[key]+"<br>");
}

//array of object
var stud=[
    {name:"ck",age:18},
    {name:"bk",age:20}
    
];

for(a=0;a<stud.length;a++)
{
    document.write(stud[a].name+" "+stud[a].age +"<br>");
}

//map function
document.write("map functiomn");
var a=[10,20,30];


var d= a.map(test);
document.write(d+"<br>");
console.log(d+"map function");

function test(x)
{
    return x *10;

}
//threw array of object 

var stud=[
    {name:"ck",age:18},
    {name:"bk",age:20}
    
];
 var d= stud.map(test)
 document.write(d +"<br>");

 function test(x)
 {
     return x.name + " "+x.age+"<br>";
 }
 //string function
  var str="chandani is a is  ck";
  var a=str.length;
  document.write(a +"<br>");

  var a=str.toUpperCase();
  document.write(a +"<br>");

  var a=str.toLowerCase();
  document.write(a +"<br>");

  var a=str.includes("ck");
  document.write(a +"<br>");

  var a=str.search("ck");
  document.write(a +"<br>");

  var a=str.match(/is/g);
  document.write(a +"<br>");

  var a=str.indexOf("ck");
  document.write(a +"<br>");

  var a=str.replace("ck","jk");
  document.write(a +"<br>");
//trim remove the space

var a=str.repeat(2);
document.write(a +"<br>");

var a=str.charAt(2);
document.write(a +"<br>");

var a=str.charCodeAt(3);
document.write(a +"<br>");

var a=str.split(" ");
document.write(a +"<br>");

var a=str.slice(3,5);//similar to substring
document.write(a +"<br>");

var a=str.substr(3,6);
document.write(a +"<br>");

var num=10.456;
var c=Number.isInteger(num);
document.write(c);
var d=Number.parseInt(num);
document.write(c);

//math function

var a= Math.ceil(20.30);
document.write(a +"<br>");

var a= Math.floor(20.30);
document.write(a + "<br>");

var a= Math.random()*50;
document.write(a +"<br>");


var a= Math.max(20,30,2,4);
document.write(a +"<br>");


var a= Math.min (20,30,5,4);
document.write(a +"<br>");


var a= Math.sqrt(64);
document.write(a +"<br>");


var a= Math.cbrt(125);
document.write(a +"<br>");


var a= Math.pow(4,2);
document.write(a +"<br>");


var a= Math.PI;
document.write(a +"<br>");

//date function

var now = new Date()
document.write(now.toDateString()+"<br>");


var now = new Date()
document.write(now.getDate()+"<br>" );


var now = new Date()
document.write(now.getMonth()+"<br>" );

var now = new Date()
document.write(now.getFullYear()+"<br>" );


var now = new Date()
document.write(now.getDay()+"<br>" );


var now = new Date()
document.write(now.getHours()+"<br>" );


var now = new Date()
document.write(now.getMinutes()+"<br>" );

var now = new Date()
document.write(now.getSeconds()+"<br>" );

now.setDate(23);
document.write(now +"<br>" );

now.setMonth(2);
document.write(now +"<br>" );
//fullyear,milisecond,second,hour,min

now.setHours(3);
document.write(now +"<br>" );


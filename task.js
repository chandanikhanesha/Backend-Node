//take1
let a="   chandani    khanehsa   ";
let str=a.trim();
console.log(a+"with space");
console.log(str);
let rm=a.replace(/ /g,"");
console.log(rm);

//task2
let bio=[
    
       { name:"ck",gender:"female"},
       { name:"bk",gender:"male"},
       { name:"jk",gender:"female"},
        {name:"dk",gender:"male"},
    
];
console.log(bio);
//for female
var f=bio.filter(gen => gen.gender=="female");
console.log(f);
//for male
 var m=bio.filter(male)
 console.log(m);
 function male(gen)
 {
     if(gen.gender=="male")
     {
         return gen;
     }
 }

 //task3
 let sum=[
    
         {name:"ck",marks:30},
         {name:"bk",marks:80},
        {name:"ck",marks:80},
        {name:"bk",marks:20},
        {name:"ck",marks:50}
         
        ];
        console.log(sum);

        let finalArray = []
        
sum && sum.map(item =>
{
    if (finalArray.length === 0)
     {finalArray.push(item)
    }
    else
     {const Index = finalArray.findIndex((data) =>
        {
             return data.name == item.name;
        })


if(Index > -1){
    finalArray[Index].marks = item.marks + finalArray[Index].marks

}
else{
 finalArray.push(item)
}
}


})
console.log(finalArray);

        //  var bn=new Array();
        // for( var sums of sum)
        // {
        //     if(sums.name in bn)

        //     {
        //         bn[sums.name].marks +=sums.marks;
        //     }
        //     else
        //     {
        //         bn[sums.name] = sums;
        //     }
        // }
//         //console.log(bn);
        //task4
        let todo=['a','b','c'];
        console.log(todo);

        console.log("different method");
        todo.shift();
        console.log(todo);
        todo.unshift('a');
        todo.push('d');
        console.log(todo);
         todo[1]='d';
        todo[2]='C';
        todo.pop();
        console.log(todo);

        let todo2=['a','b','c'];

        console.log("with same method");
        console.log(todo2);
        todo2.splice(0,1);
        todo2.splice(0,0,'a');
        todo2.splice(3,0,'d');
        console.log(todo2);
        todo2.splice(1,3,'d','c');
        console.log(todo2);
        
        
        //task 5

        let tk=[
            
                {name:"ck",sub:"hindi",marks:90},
                {name:"bk",sub:"english",marks:80},
                {name:"ck",sub:"gujarati",marks:40},
                {name:"ck",sub:"science",marks:50},
                {name:"bk",sub:"hindi",marks:40},
                {name:"jk",sub:"hindi",marks:80},
                {name:"jk",sub:"english",marks:90}
             ];
        console.log(tk);
 let farray=[];
 let i=1;

 tk && tk.filter(item =>
    {
        if(farray.length==0)
            {
                farray.push(item);
                farray[0].subj=[];
                farray[0].subj.push({sub:item.sub,marks:item.marks});
                farray[0].total=item.marks;
                delete farray[0].sub;
                delete farray[0].marks;
               
               
                
            }
            else
            {
                const Index = farray.findIndex((data) =>
                {
                    return data.name==item.name;
                    
                })
        

                if(Index > -1)
                {   
                   
                   
                    farray[Index].subj.push({sub:item.sub,marks:item.marks});
                    farray[Index].total +=item.marks;
                    farray[Index].per=farray[Index].total/farray[Index].subj.length + "%";
                }
                else
                {
                    farray.push(item);
                    farray[i].subj=[];
                    farray[i].subj.push({sub:item.sub,marks:item.marks});
                    farray[i].total=item.marks;
                    delete farray[i].sub;
                    delete farray[i].marks;
                    i++;
                }
            }
    })
    console.log("task 4");
    console.log(farray);




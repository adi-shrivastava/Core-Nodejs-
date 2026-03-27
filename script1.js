// console.log("Script loaded successfully");
// console.log("Hello, World!");
// console.log("HEY ADIII!!!!!");
// let color="red";
// let color2="Yellow";
// let color3="Green";
// let age=17;
// if(age>=18){
//     console.log("You are eligible to vote");
// }
// else{
//     console.log("You are not eligible to vote");
// }
//good string starts with a and have size>3
// let a="hpple";
// if((a[0]==="a") &&(a.length>3)){
//     console.log("Good String");
// }
// else[
//     console.log("Bad String")
// ]

// let day=6;
// switch(day){
//     case 1:
//         console.log("Sunday");
//         break;
    
//     case 2:
//         console.log("Monday");
//         break;
    
//     case 3:
//         console.log("Tuesday");
//         break;

//     case 4:
//         console.log("Wednesday ");
//         break;
    
//     case 5:
//         console.log("Thursday");
//         break;
        
    
//     case 6:
//         console.log("Friday");
//         break;
        
    
//     case 7:
//         console.log("Saturday");
//         break;
//     default:
//         console.log("Invalid day");
    
// }

// let firstName=prompt("Enter your name");
// let lastName=prompt("Enter your age");
// let msg="Your Name is "+firstName+ " & your age is : "+lastName+"!";
// alert(msg);
// let num=11;
// if(num%2==0){
//     console.log("Even Number");
// }
// else{
//     console.log("Odd Number");

// let str1="Ilovecoding";
// console.log(str1.toUpperCase());
// console.log(str1.replace("love","do"));

// let msg="       Help     ";
// console.log(msg.repeat(5));
// console.log(msg.trim().toUpperCase());
// let arr1=["January","july","March","August"];
// console.log(arr1);
function call(){
    console.log("callback is called");
}
function add1(a,b,call){
    let a1= a+b;
    console.log("Sum is : "+a1); 
    call();
}
add1(2,3,() =>console.log("callback called"));
// one line handy method -> add1(2,3,() =>console.log("callback called"));
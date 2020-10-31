
//to be added in homepage.js

//adding and subtracting passengers
var valuePas=$(".passenger-inp").val();
//default value of paasenger field
$(".passenger-inp").click(()=>{
    console.log("input")
    $(".passenger-inp").val(1);
})


$(".add").click(()=>{
    console.log("add");
    if(valuePas<99){
        valuePas++;
        $(".passenger-inp").val(valuePas);
    }
});

$(".subtract").click(()=>{
    console.log("subtract");
    if(valuePas>1){
        valuePas--;
        $(".passenger-inp").val(valuePas);
    }
});


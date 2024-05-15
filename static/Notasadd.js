var array = []

function SalvarRotas(){
    if(localStorage.PastasAdd){
        array = JSON.parse(localStorage.getItem("PastasAdd"))
    }

    array.push(AddRota.value)

    localStorage.setItem("PastasAdd",JSON.stringify(array))
    $.ajax({
        url:"/AddFolder",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify({ value: localStorage.getItem("PastasAdd") }),
    })
}
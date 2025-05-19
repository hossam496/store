var allproduct = document.querySelectorAll(".product-card");
var content = document.querySelector("#content");
var showprice = document.getElementById("showprice");
var clear = document.getElementById("clear");
var totalprice = 0;
var inputsearch = document.getElementById("search");
var productlist = document.querySelectorAll(".product-card");
var notfound = document.getElementById("notfound");
var totalPriceDisplay = document.getElementById("total-price");

showprice.style.display = "none";
clear.style.display = "none";

allproduct.forEach(function(item){
    item.onclick = function(){
        totalprice += parseFloat(item.getAttribute("price"));
        
        var priceText = item.querySelector("p").textContent;
        content.innerHTML += priceText + "<br/>";

        if(content.innerHTML != ""){
            showprice.style.display = "block";
            clear.style.display = "block";
        }
    }
});
showprice.onclick = function(){
    if(totalprice > 40000){
        alert("You got 30% discount");
        totalprice = totalprice * 0.7;
        totalPriceDisplay.textContent = "Total Price after discount: " + totalprice.toLocaleString() + " EGP";
    } else {
        totalPriceDisplay.textContent = "Total Price: " + totalprice.toLocaleString() + " EGP";
    }
    totalPriceDisplay.style.display = "block";
    console.log(totalprice);
};

clear.onclick = function(){
    content.innerHTML = "";
    totalPriceDisplay.style.display = "none";
    showprice.style.display = "none";
    clear.style.display = "none";
    totalprice = 0;
    console.log("totalprice", totalprice);
};

inputsearch.oninput = function(){
    var inputvlue = inputsearch.value.toLowerCase();
    var enyvisable = false;

    productlist.forEach(function(item){
        if(item.textContent.toLowerCase().includes(inputvlue)){
            item.style.display = "block";
            enyvisable = true;
        } else {
            item.style.display = "none";
        }
    });

    if(!enyvisable){
        notfound.style.display = "block";
    } else {
        notfound.style.display = "none";
    }
};

// /////////////////////////////////////////////////////////////////////////



var continar = document .getElementById('continar')
var tool1 = document .getElementById('tool1')
var tool2 = document .getElementById('tool2')
var tool3 = document .getElementById('tool3')
var tool4 = document .getElementById('tool4')
var continar1 = document .getElementById('continar1')
var continar2 = document .getElementById('continar2')
var continar3 = document .getElementById('continar3')
var continar4 = document .getElementById('continar4')

tool1.addEventListener('dragstart' , (e) => e.dataTransfer.setData('text' , 'tool1'))
tool2.addEventListener('dragstart' , (e) => e.dataTransfer.setData('text' , 'tool2'))
tool3.addEventListener('dragstart' , (e) => e.dataTransfer.setData('text' , 'tool3'))
tool4.addEventListener('dragstart' , (e) => e.dataTransfer.setData('text' , 'tool4'))

continar1.addEventListener('dragover' , (e) => e.preventDefault())
continar2.addEventListener('dragover' , (e) => e.preventDefault())
continar3.addEventListener('dragover' , (e) => e.preventDefault())
continar4.addEventListener('dragover' , (e) => e.preventDefault())


continar1.addEventListener('drop', (e) =>{
    var id = e.dataTransfer.getData('text')
    var element = document.getElementById(id)
    continar1.appendChild(element)
})
continar2.addEventListener('drop', (e) =>{
    var id = e.dataTransfer.getData('text')
    var element = document.getElementById(id)
    continar2.appendChild(element)
})
continar3.addEventListener('drop', (e) =>{
    var id = e.dataTransfer.getData('text')
    var element = document.getElementById(id)
    continar3.appendChild(element)
})
continar4.addEventListener('drop', (e) =>{
    var id = e.dataTransfer.getData('text')
    var element = document.getElementById(id)
    continar4.appendChild(element)
})

tool1.addEventListener('dblclick' , ()=>{
    continar.appendChild(tool1)
})
tool2.addEventListener('dblclick' , ()=>{
    continar.appendChild(tool2)
})
tool3.addEventListener('dblclick' , ()=>{
    continar.appendChild(tool3)
})
tool4.addEventListener('dblclick' , ()=>{
    continar.appendChild(tool4)
})

// ////////////////////////////////////////////////////////////


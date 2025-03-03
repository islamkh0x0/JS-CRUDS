let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");


let mood = "create";
let tmp;
//get total

total.innerHTML="";
function getTotal(){
    if(price.value != ""){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.background = "#040";
    }else
    {
        total.innerHTML ="";
        total.style.background = "#a00d02";
    }
}


// create product    "ARRAY"................................
let dataPro;
if (localStorage.product != null){
    dataPro = JSON.parse(localStorage.product);
}else{
    dataPro = [];
}

submit.onclick = function(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
// condition to aprove the products .....
    if(title.value != "" && count.value <101 && price.value != ""){
    if (mood === "create"){
        if (newPro.count > 1){
            for (let i = 0; i < newPro.count; i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        } 
    }else{
        dataPro[tmp] = newPro
        mood = "create";
        submit.innerHTML = "Create";
        count.style.display = "block";
    }
    clearData();
    }
    
    
    
    // save localstorge
    localStorage.setItem("product", JSON.stringify(dataPro));

    showData();
}



//clear inputs when create

function clearData(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}


//read
function showData(){
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        table +=`
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updatData(${i})" id="update">update</button></td>
        <td><button onclick="deletData(${i})" id="delete">delete</button></td>
        </tr>
        `
        getTotal();
    }

    document.getElementById("tbody").innerHTML =table
    let deleteBtn = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        deleteBtn.innerHTML = `
        <button onclick="deleteAll()">Delete All(${dataPro.length})</button>`
    }
}
showData();


//delete
function deletData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}


//delet all
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}


//count

//update
function updatData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal();
    count.style.display = "none";
    category.value = dataPro[i].category;
    submit.innerHTML= "Update"
    mood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
}




//search............... Get buttom and Mood .........
let searchMood = "title";

function getSearchMood(id){
    let search = document.getElementById("search");
    if(id == "searchTitle"){
        searchMood = "title";
        search.placeholder = "search By Title"; //>>>>>>>>>>>
    }else{
        searchMood = "category";
        search.placeholder = "Search By Category" //>>>>>>>>>>>
    }
    //search.placeholder = "Search By "+ searchMood; //>>>>>>>>>
    search.focus()
    search.value = "";
    showData()
}

// Search                ................. .........

function searchData(value){
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
    if(searchMood == "title"){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updatData(${i})" id="update">update</button></td>
        <td><button onclick="deletData(${i})" id="delete">delete</button></td>
        </tr>
        `
            }  
    }
    else{
            if(dataPro[i].category.includes(value)){
                table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updatData(${i})" id="update">update</button></td>
        <td><button onclick="deletData(${i})" id="delete">delete</button></td>
        </tr>
        `
            }
            
            
        }
    }
    document.getElementById("tbody").innerHTML =table;
}




//clean data  controle of data


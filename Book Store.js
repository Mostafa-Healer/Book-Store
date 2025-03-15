//                                                             Btn Reset
let BtnReset = document.getElementById('BtnReset');
let TitleINP = document.getElementById('Title');
let AuthorINP = document.getElementById('Author');
let PriceINP = document.getElementById('Price');
let QuantityINP = document.getElementById('Quantity');

let mood = 'Create';
let temp ;

function Reset() {
    BtnReset.onclick = () => {
        TitleINP.value = '';
        AuthorINP.value = '';
        PriceINP.value = '';
        QuantityINP.value = '';
    }
}
Reset();

let AdminBtn = document.getElementById('admin');
let UserBtn = document.getElementById('user');

UserBtn.onclick = function() {
    TitleINP.disabled = true;
    AuthorINP.disabled = true;
    PriceINP.disabled = true;
    QuantityINP.disabled = true;
};
AdminBtn.onclick = function() {
    TitleINP.disabled = false;
    AuthorINP.disabled = false;
    PriceINP.disabled = false;
    QuantityINP.disabled = false;
};


//                                             Btn Create
let BtnCreate = document.getElementById('BtnCreate');
let DataBooks = [] ;

if(localStorage.Book != null){
    DataBooks = JSON.parse(localStorage.Book);
}else{
    DataBooks = [] ;
}

BtnCreate.onclick = () => {

    let objectofarray = {
        TitleINP    : TitleINP.value.toLowerCase() ,
        AuthorINP   : AuthorINP.value.toLowerCase() ,
        PriceINP    : PriceINP.value.toLowerCase() ,
        QuantityINP : QuantityINP.value ,
    }

    if(mood === 'Create'){
        // to forbid any Repeat
        let isDuplicate = false;
        for (let i = 0; i < DataBooks.length; i++) {
            if (TitleINP.value === DataBooks[i].TitleINP) { 
                isDuplicate = true;
                break; // وقف التكرار بمجرد العثور على تطابق
            }
        }

        if (isDuplicate) {
            Swal.fire({
                title: "Warning!⚠️",
                text: "This title is already exists",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Continue",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33"
            }).then((result) => {
                if (result.isConfirmed) {
                    DataBooks.push(objectofarray);
                    Swal.fire("✅ added succes", "success");
                    // Swal.fire("✅ Added succes", "تمت إضافة الكتاب بنجاح!", "success");
                    showdata();
                }
            });
        } else {
            DataBooks.push(objectofarray);
        }
    }else{
        DataBooks[temp] = objectofarray ;
        mood = 'Create' ;
        BtnCreate.innerHTML = 'Create';
    }

        // add Array to LocalStorage
        localStorage.setItem('Book' , JSON.stringify(DataBooks));
        cleardata();
        showdata();
}


//                                            show Data
function showdata(){
    let table = '';
    
    for( let i=0 ; i < DataBooks.length ; i++ ){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${DataBooks[i].TitleINP}</td>
        <td>${DataBooks[i].AuthorINP}</td>
        <td>${DataBooks[i].PriceINP}</td>
        <td>${DataBooks[i].QuantityINP}</td>
        <td><button id="update" onclick="updatedata(${i})">update</button></td>
        <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
        </tr>
        `;
        
    }
    document.getElementById('tbody').innerHTML = table ;
}
showdata();



// Clear
function cleardata() {
    TitleINP.value = '';
    AuthorINP.value = '';
    PriceINP.value = '';
    QuantityINP.value = '';
}

// Delete
function deletedata(i) {
    DataBooks.splice(i,1);
    localStorage.Book = JSON.stringify(DataBooks) ;
    showdata();
}

// Delete All
let BtnDeleteAll = document.getElementById('BtnDeleteAll');
BtnDeleteAll.onclick = () => {
    Swal.fire({
        title: "Warning!⚠️",
        text: "You are Delete All Books",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Continue",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33"
    }).then((result) => {
        if (result.isConfirmed) {
            
            // Swal.fire( "تمت إضافة الكتاب بنجاح!", "success");
            localStorage.clear();
            DataBooks.splice(0);
            showdata();
        }
    });

}



function updatedata(i){
    TitleINP.value = DataBooks[i].TitleINP ;
    AuthorINP.value = DataBooks[i].AuthorINP ;
    PriceINP.value = DataBooks[i].PriceINP ;
    QuantityINP.value = DataBooks[i].QuantityINP ;

    BtnCreate.innerHTML = 'Update';
    mood = 'Update';
    temp = i ;
    scroll({
        top : 0 ,
        behavior : "smooth",
    })

}



//                      Search
let search_mood = 'Title'; 
let search = document.getElementById('INPSearch');

function Search_mood(id){
    if(id == 'SearchTitle'){
        search_mood = 'Title';
        search.placeholder = 'Search By Title' ;
    }else if(id == 'SearchAuthor'){
        search_mood = 'Author';
        search.placeholder = 'Search By Author' ;
    }
    else{
        search_mood = 'ID';
        search.placeholder = 'Search By ID' ;
    
    }
    search.focus();
    search.value = '';
    showdata();
}

//  <input type="text" onkeyup="search_Data(this.value)" placeholder="Search" class="INPSearch" id="INPSearch"> */}
function search_Data(value){

    let table = '';

    for(let i=0 ; i< DataBooks.length ; i++ ){

        if(search_mood == 'Title'){
            if(DataBooks[i].TitleINP.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${DataBooks[i].TitleINP}</td>
                        <td>${DataBooks[i].AuthorINP}</td>
                        <td>${DataBooks[i].PriceINP}</td>
                        <td>${DataBooks[i].QuantityINP}</td>
                        <td><button id="update" onclick="updatedata(${i})">update</button></td>
                        <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
                    </tr>
                `;
            }
        }else if(search_mood == 'Author'){
                if(DataBooks[i].AuthorINP.includes(value.toLowerCase())){
                    table += `
                        <tr>
                            <td>${i+1}</td>
                            <td>${DataBooks[i].TitleINP}</td>
                            <td>${DataBooks[i].AuthorINP}</td>
                            <td>${DataBooks[i].PriceINP}</td>
                            <td>${DataBooks[i].QuantityINP}</td>
                            <td><button id="update" onclick="updatedata(${i})">update</button></td>
                            <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
                        </tr>
                    `;
                }
        }else{
            
            if(DataBooks[i].includes(value)){
                table += `
                    <tr>
                        <td>${i+1}</td>
                        <td>${DataBooks[i].TitleINP}</td>
                        <td>${DataBooks[i].AuthorINP}</td>
                        <td>${DataBooks[i].PriceINP}</td>
                        <td>${DataBooks[i].QuantityINP}</td>
                        <td><button id="update" onclick="updatedata(${i})">update</button></td>
                        <td><button id="delete" onclick="deletedata(${i})">delete</button></td>
                    </tr>
                `;
            }
        }
        
    }
    document.getElementById('tbody').innerHTML = table ;
    // showdata();
}


let Show_Buttons_Buy = document.getElementById('Show_Buttons_Buy');
let Container_BtnsBuy = document.getElementById('Container_BtnsBuy');

let Book_Title_Buy = document.getElementById('Book_Title_Buy');
let Quantity_Buy = document.getElementById('Quantity_Buy');
let Cash = document.getElementById('Cash');

Show_Buttons_Buy.onclick = ()=>{
    Container_BtnsBuy.classList.toggle("hidden");
}

let BtnBuy = document.getElementById('BtnBuy');

BtnBuy.onclick = ()=>{
    for (let i = 0; i < DataBooks.length; i++) {
        let Total_Price = Quantity_Buy.value * DataBooks[i].PriceINP; // حساب السعر الإجمالي للكمية المطلوبة

        if (Book_Title_Buy.value === DataBooks[i].TitleINP &&
            Quantity_Buy.value <= DataBooks[i].QuantityINP &&
            Cash.value >= Total_Price  
        ){
            // console.log("Total Price:", Total_Price);
            // console.log("تمت عملية الشراء بنجاح!");
            DataBooks[i].QuantityINP -= Quantity_Buy.value; // تحديث الكمية المتاحة بعد الشراء
            localStorage.Book = JSON.stringify(DataBooks) ;
            showdata();

            let windoww = document.getElementById('receipt');

                let Details = '' ;
                Details = `
                <h2>Receipt</h2>
                <p><strong>Book Title : </strong> ${Book_Title_Buy.value}</p>
                <p><strong>Quantity : </strong> ${Quantity_Buy.value}</p>
                <p><strong>Price Per Book : </strong> ${DataBooks[i].PriceINP} EGP</p>
                <p><strong>Total Price : </strong> ${Total_Price} EGP</p>
                <button onclick="window.print()">Print Receipt</button>
                `;
                windoww.style.display = 'block';
                windoww.innerHTML = Details ;

            break ;
        }else{
            let windoww = document.getElementById('receipt');

                let Details = '' ;
                Details = `
                <h2>Error</h2>
                `;
                windoww.style.display = 'block';
                windoww.innerHTML = Details ;
        }
    }
}

import { onLoad,storeInLocal } from "./localStorage.js";
import { showSuccess, validYear, validPrice,validQuantity,validEngine,validation, validTransaction} from "./validation.js";

const bikeBrand = document.getElementById("bike-brand");
const bikeModel = document.getElementById("bike-model");
const bikeType = document.getElementById("type");
const bikeYear = document.getElementById("year");
const bikeColor = document.getElementById("color");
const bikeEngine = document.getElementById("engine");
const bikeQuantity = document.getElementById("quantity");
const bikePrice  = document.getElementById("price");
const bikeTransaction = document.getElementById("transaction");
const tableBody = document.getElementById("tableBody");
const finalDelete = document.getElementById("finalDelete");
const finalUpdateBtn = document.querySelector(".finalUpdateBtn");
const stocks = document.getElementById('stocks');
const revenue = document.getElementById('revenue');
const sales = document.getElementById('sales');
const form = document.getElementById('form');
const searchInput = document.getElementById('searchInput');

const submitBtn = document.querySelector(".submitBtn");
const forms = document.querySelectorAll('.needs-validation');
const modal = new bootstrap.Modal(document.getElementById('staticBackdrop')); 
const modalDelete = new bootstrap.Modal(document.getElementById('exampleModal'));
const dataArray = [
    {brandName: "Royal Enfield", modals: ["Hunter","Himalayan","Classic","Intersecptor"]},
    {brandName: "Harley Davidson", modals: ["Fat Boy","Sportster S","Heritage Classic","Nightster"]},
    {brandName: "Triumph", modals: ["Scrambler","Speed 400","Daytone","Rocket 3"]},
    {brandName: "TVS",modals: ["Pulsar","RS-200","Discover","Apache"]}
];

let array = JSON.parse(localStorage.getItem("dataArray")) || [];

//calculte total stocks,revenue and sales 
const calculate = (array) =>{
    let totalQuantity = 0;
    let totalRevenue = 0;
    let totalSales = 0;
    array?.forEach(val =>{
        if(val.transaction=='Buy'){
            totalQuantity+= Number(val.quantity);
        }
        else if(val.transaction=='Sell' && totalQuantity>0){
            totalQuantity-= Number(val.quantity);
            totalRevenue += Number(val.price);
            totalSales += Number(val.quantity);
            return false;
        }
    });
    stocks.innerHTML = totalQuantity;
    revenue.innerHTML = totalRevenue;
    sales.innerHTML = totalSales;
    return totalQuantity;
}
onLoad(array);

searchInput.addEventListener('keyup', function(event) {
    
    let searchTerm = event.target.value.toLowerCase();
  
    // Get all rows in the table body
    const rows = Array.from(document.querySelectorAll('#tableBody tr'));
  
    // Filter the rows based on the search term
    rows.filter(function(row) {
      const cells = Array.from(row.getElementsByTagName('td'));
      
      
      const matchFound = cells.some(function(cell) {
        return cell.textContent.toLowerCase().includes(searchTerm);
      });
  
      // Show or hide the row based on whether it matches the search term
      row.style.display = matchFound ? '' : 'none';
    });
  });

//update the modal dropdown
const updateModals = function(brandName){
    bikeModel.innerHTML = "";
    const indexOfBrand = dataArray.findIndex(val => val.brandName===brandName);
    bikeModel.insertAdjacentHTML("beforeend",`<option selected disabled hidden>Select a Modal</option>`);
    dataArray[indexOfBrand].modals.forEach(val =>{
        const html = `<option value="${val}">${val}</option>`;
        bikeModel.insertAdjacentHTML("beforeend",html);
    });
}
bikeBrand.addEventListener("change",(event)=>{
    updateModals(event.target.value);
    showSuccess(bikeBrand);
});
bikeModel.addEventListener("change",()=>{
    showSuccess(bikeModel);
});
bikeType.addEventListener("change",()=>{
   showSuccess(bikeType); 
});
bikeColor.addEventListener('change',()=>{
    showSuccess(bikeColor);
});
bikeTransaction.addEventListener('change',()=>{
    showSuccess(bikeTransaction);
});
bikeYear.addEventListener('blur', ()=>{
    validYear(bikeYear);
});
bikeEngine.addEventListener('blur',()=>{
    validEngine(bikeEngine);
});
bikePrice.addEventListener('blur', ()=>{
    validPrice(bikePrice);
});
bikeQuantity.addEventListener('blur', ()=>{
    validQuantity(bikeQuantity);
});
bikeTransaction.addEventListener('change', ()=>{
    validTransaction(bikeTransaction,array,bikeQuantity);
});

const resetForm = () =>{
    const valid = form.querySelectorAll('.is-valid, .is-invalid');
    form.reset();
    valid.forEach(val => {
        val.classList.remove('is-valid');
        val.classList.remove('is-valid')
    });
    form.classList.add('needs-validation');
}

//Creation of the row in table
const createRow = () =>{
    const data = {
        brand : bikeBrand.value,
        modals : bikeModel.value,
        type: bikeType.value,
        year: bikeYear.value,
        color: bikeColor.value,
        engine: bikeEngine.value,
        quantity: bikeQuantity.value,
        price: bikePrice.value,
        transaction: bikeTransaction.value
    }
    const html = `
    <tr>
        <td class="bold">${data.brand}</td>
        <td>${data.modals}</td>
        <td>${data.type}</td>
        <td>${data.year}</td>
        <td>${data.quantity}</td>
        <td>$ ${data.price}</td>
        <td>$ ${Number(data.quantity)*Number(data.price)}</td>
        <td class = "center"><div class="${data.transaction}">${data.transaction}</div></td>
        <td><div class="d-flex align-items-center justify-content-center gap-2">
        <i class="bi bi-pen updateColor updateBtn" data-index = "${array.length}" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
        <i class="bi bi-trash deleteColor deleteBtn" data-index = "${array.length} data-bs-toggle="modal" data-bs-target="#exampleModal""></i>
        </div></td> 
    </tr>
    `;
    array.push(data);
    storeInLocal(array);
    tableBody.insertAdjacentHTML("beforeend",html);
    calculate(array);
}

//Deletion of row from the table
const deleteRow = (index) =>{
    array.splice(index,1);
    storeInLocal(array);
    onLoad(array);
}
let deleteIndex = 0;

tableBody.addEventListener('click', (event) => {
    if (event.target.classList.contains("deleteBtn")) {
        deleteIndex = event.target.getAttribute("data-index");
        modalDelete.show();  
    }
});
finalDelete.addEventListener('click',()=>{
    deleteRow(deleteIndex);
    calculate(array);
    modalDelete.hide();
});


//Updation of row from the table
const fillModal = (index) =>{
    const targetObj = array[index];
    updateModals(targetObj.brand);
    bikeBrand.value = targetObj.brand;
    bikeModel.value = targetObj.modals;
    bikeType.value = targetObj.type;
    bikeYear.value = targetObj.year;
    bikeColor.value = targetObj.color;
    bikeEngine.value = targetObj.engine;
    bikeQuantity.value = targetObj.quantity;
    bikePrice.value = targetObj.price;
    bikeTransaction.value = targetObj.transaction;
}

const update = (index) =>{
    const data = {
        brand : bikeBrand.value,
        modals : bikeModel.value,
        type: bikeType.value,
        year: bikeYear.value,
        color: bikeColor.value,
        engine: bikeEngine.value,
        quantity: bikeQuantity.value,
        price: bikePrice.value,
        transaction: bikeTransaction.value
    }
    array[index] = data;
    storeInLocal(array);
    onLoad(array);
    calculate(array);
}

tableBody.addEventListener('click', (event)=>{
    if(event.target.classList.contains("updateBtn")){
        const index = event.target.getAttribute('data-index');
        fillModal(index);
        finalUpdateBtn.classList.remove("hide");
        submitBtn.classList.add("hide");
        finalUpdateBtn.addEventListener('click',()=>{
            submitBtn.classList.remove("hide");
            finalUpdateBtn.classList.add("hide");
            update(index);
            modal.hide();
            resetForm();
        });
    }
});

  // Loop over them and prevent submission
submitBtn.addEventListener('click', (event) =>{
        if (!form.checkValidity() || !validation(bikeYear,bikeEngine,bikeQuantity,bikePrice,bikeTransaction,array)) {
            form.classList.add('was-validated');
            return;
       }
       createRow();
       modal.hide();
       resetForm();
    });

  //onLoad(array);
  export {calculate}; 
  
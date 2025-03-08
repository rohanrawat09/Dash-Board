import  {calculate} from "./bike.js";

const storeInLocal = (array) =>{
    localStorage.setItem("dataArray",JSON.stringify(array));
}

const onLoad = (array) =>{
    tableBody.innerHTML = "";
    array.forEach((val,index) => {
            const html = `
            <tr>
                <td class="bold">${val.brand}</td>
                <td>${val.modals}</td>
                <td>${val.type}</td>
                <td>${val.year}</td>
                <td>${val.quantity}</td>
                <td>$ ${val.price}</td>
                <td>$ ${Number(val.quantity)*Number(val.price)}</td>
                <td class = "center"><div class="${val.transaction}">${val.transaction}</div></td>
                <td><div class="d-flex align-items-center justify-content-center gap-2">
                <i class="bi bi-pen updateColor updateBtn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
                <i class="bi bi-trash deleteColor deleteBtn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                </div></td> 
            </tr>
            `;
            tableBody.insertAdjacentHTML("beforeend",html);
    });
    calculate(array);
}
export {storeInLocal , onLoad};
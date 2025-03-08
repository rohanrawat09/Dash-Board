import { calculate } from "./bike.js";

export function showError(field) {
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
}

export function showSuccess(field) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
}

export const validYear = (year) =>{
    const now = new Date();
    const currYear = now.getFullYear();
    if(year.value>currYear-5 && year.value<=currYear){
        showSuccess(year);
        return true;
    }
    else{
        showError(year);
        return false;
    }
};
export const validEngine = (engine) =>{
    if(engine.value>=100 && engine.value<=1500){
        showSuccess(engine);
        return true;
    }
    else{
        showError(engine);
        return false;
    }
};

export const validQuantity = (quantity) =>{
    if(quantity.value>=1 && quantity.value<=20){
        showSuccess(quantity);
        return true;
    }
    else{
        showError(quantity);
        return false;
    }
};
export const validPrice = (price) =>{
    if(price.value>=75000 && price.value<=1000000){
        showSuccess(price);
        return true;
    }
    else{
        showError(price);
        return false;
    }
};

 export const validTransaction = (transaction,array,quantity) =>{
    const total = calculate(array);
    if(transaction.value=='Sell' && quantity.value>total){
        showError(transaction);
        return false;
    }
    else{
        showSuccess(transaction);
        return true;
    }
}

export const validation = (year,engine,quantity,price,transaction,array)=>{
    return validYear(year) && validPrice(price) && validQuantity(quantity) && validEngine(engine) 
                && validTransaction(transaction,array,quantity);
}
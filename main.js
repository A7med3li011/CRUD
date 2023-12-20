
let productName = document.querySelector("#nameProduct");
let productPrice = document.querySelector("#priceProduct");
let productModel = document.querySelector("#modelProduct");
let productDiscription = document.querySelector("#decProduct")
let count = document.querySelector("#count")
let globalIndex;
let productList;
let realPosition = 0;

if (localStorage.getItem("product") == null) {
    productList = []
} else {
    productList = JSON.parse(localStorage.getItem("product"));
    display(productList)
}

function createProduct() {
    if (validateName() && validatePrice() && validateModel() && validateDesc()) {



        if (count.value != "") {
            for (let i = 0; i < count.value; i++) {
                let product = {
                    name: productName.value.toLowerCase(),
                    price: productPrice.value,
                    model: productModel.value,
                    disc: productDiscription.value,
                }
                productList.push(product)
            }

        } else {
            let product = {
                name: productName.value.toLowerCase(),
                price: productPrice.value,
                model: productModel.value,
                disc: productDiscription.value,
            }
            productList.push(product)
        }



        localStorage.setItem("product", JSON.stringify(productList))
        display(productList)

        clearInput()
    }
    else {
        document.querySelector(".invalidPriceMessage").classList.remove("d-none")
        document.querySelector(".invalidNameMessage").classList.remove("d-none")
        document.querySelector(".invalidMproductModelMessage").classList.remove("d-none")
        document.querySelector(".invalidMproductDescMessage").classList.remove("d-none")
        productName.style = "border: 3px solid red"
        productPrice.style = "border: 3px solid red"
        productModel.style = "border: 3px solid red"
        productDiscription.style = "border: 3px solid red"

    }
}

function display(arr) {

    let cartona = ""
    for (let i = 0; i < arr.length; i++) {

        cartona +=
            ` <tr>
            <td>${i + 1}</td>
            <td>${arr[i].newName ? arr[i].newName : arr[i].name}</td>
            <td>${arr[i].price}</td>
            <td>${arr[i].model}</td>
            <td>${arr[i].disc}</td>
            <td><button onclick = updateProduct(${i}) class="btn btn-warning">update</button></td>
            <td><button onclick ="deleteItem(${i})" class="btn btn-danger">delete</button></td>
        </tr>
        `

    }
    document.querySelector(".myData").innerHTML = cartona
}


function clearInput() {
    productName.value = ""
    productPrice.value = ""
    productModel.value = ""
    productDiscription.value = ""
    count.value = ""
}

function deleteItem(index) {
    productList.splice(index, 1)
    localStorage.setItem("product", JSON.stringify(productList))
    display(productList)


}



function search(term) {
    let searchArr = []
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
            productList[i].newName = productList[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`)

            searchArr.push(productList[i])

            display(searchArr)
        } else {
            display(productList)
        }
    }


}





function updateProduct(index) {

    document.querySelector(".add").style = "display : none!important";
    document.querySelector(".update").style = "display:block !important";

    console.log(productList[index])
    productName.value = productList[index].name
    productPrice.value = productList[index].price
    productModel.value = productList[index].model
    productDiscription.value = productList[index].disc

    globalIndex = index


}




function updated() {
    let updatedProduct = {
        name: productName.value,
        price: productPrice.value,
        model: productModel.value,
        disc: productDiscription.value,

    }
    let index = globalIndex

    if (validateName() && validatePrice() && validateModel() && validateDesc()) {
        productList.splice(index, 1, updatedProduct)
        localStorage.setItem("product", JSON.stringify(productList))
        display(productList)
        clearInput()
        document.querySelector(".add").style = "display : block!important";
        document.querySelector(".update").style = "display:none !important";
    }


}





function ClearAllData() {
    localStorage.clear()
    productList = []
    display(productList)

}

function validateName() {
    let regex = /^[a-z]{3,8}$/

    if (regex.test(productName.value)) {
        document.querySelector(".invalidNameMessage").classList.add("d-none")
        productName.style = "border: none"

        return true
    } else {
        document.querySelector(".invalidNameMessage").classList.remove("d-none")
        productName.style = "border: 3px solid red"

        return false
    }
}

function validatePrice() {
    let regex = /^(?!0\d{3})[1-9]\d{3,4}(\.\d{1,2})?$|^100000(\.0{1,2})?$/

    if (regex.test(productPrice.value)) {
        document.querySelector(".invalidPriceMessage").classList.add("d-none")
        productPrice.style = "border: none"

        return true
    } else {
        document.querySelector(".invalidPriceMessage").classList.remove("d-none")
        productPrice.style = "border: 3px solid red"

        return false
    }
}
function validateModel() {
    let regex = /^(tv|labtop|phone|Tv|Labtop|TV|Phone)$/

    if (regex.test(productModel.value)) {
        document.querySelector(".invalidMproductModelMessage").classList.add("d-none")
        productModel.style = "border: none"

        return true
    } else {
        document.querySelector(".invalidMproductModelMessage").classList.remove("d-none")
        productModel.style = "border: 3px solid red"

        return false
    }
}


function validateDesc() {
    let regex = /^.{20,}$/

    if (regex.test(productDiscription.value)) {
        document.querySelector(".invalidMproductDescMessage").classList.add("d-none")
        productDiscription.style = "border: none"

        return true
    } else {
        document.querySelector(".invalidMproductDescMessage").classList.remove("d-none")
        productDiscription.style = "border: 3px solid red"

        return false
    }
}









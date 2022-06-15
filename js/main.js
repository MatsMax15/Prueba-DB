const main = () => {

    const db = GetDB({ id: null })

    const content_lis = document.getElementById('content-list')

    db.map(product => {

        const div = document.createElement('div')
        
        div.classList.add('col-12', 'col-sm-6', 'col-md-6', 'col-lg-4', 'col-xl-3', 'mb-3', 'mt-3')
        div.innerHTML = `
            <div class="card bg-dark">
                <div class="card-header">
                    <img src="./assets/img/img.png" alt="">
                    <span class="badge bg-primary clave">${ product.clave }</span>
                </div>
                <div class="card-body">
                    <span class="name">${ product.name }</span>
                    <h3 class="price">$${ product.price }</h3>
                    <p class="category">${ product.category }</p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-sm btn-success" onclick="Add(${ product._id })"><i class="bi bi-cart3"></i> Agregar al carrito</button>
                </div>
            </div>
        `

        content_lis.appendChild(div)

    })

}

const Add = id => {
    
    const product = GetDB({ id })

    const product_selected = document.getElementById(`product-${ id }`)

    if ( product_selected ) {

        const cant = product_selected.querySelector('.cant')
        const cant_int = parseInt(cant.innerHTML) + 1

        cant.innerHTML = cant_int

    }
    else {

        AddItem(product)

    }

    GetTotal()

}

const  AddItem = product => {
    
    const list_products = document.getElementById('list-products')

    const div = document.createElement('div')
    div.setAttribute('id', `product-${ product._id }`)
    div.classList.add('card', 'card-product', 'mb-3')
    div.innerHTML = `
        <button type="button" class="dismiss" title="Eliminar" onclick="DeleteItem(this)"><i class="bi bi-x"></i></button>
        <div class="row">
            <div class="col-4 col-sm-3 col-xl-2">
                <img src="./assets/img/img.png" alt="">
            </div>
            <div class="col-8 col-sm-9 col-xl-10 info">
                <h3>${ product.name }</h3>
                <div class="details">
                    <span>Cantidad: <span class="cant bg-success">1</span></span>
                    <span class="price text-end">$${ product.price }</span>
                </div>
            </div>
        </div>
    `

    list_products.appendChild(div)

}

const GetTotal = () => {

    const products = document.querySelectorAll('.card-product')
    let total = 0

    products.forEach(product => {
        const price = product.querySelector('.price')
        const cant = product.querySelector('.cant')
        const cant_int = parseInt(cant.innerHTML)
        const price_int = parseInt(price.innerHTML.replace('$', ''))

        total += price_int * cant_int
    })

    document.getElementById('total').innerHTML = `$${ total }`

}

const DeleteItem = product => {

    product.parentElement.remove()

    GetTotal()

}

main()
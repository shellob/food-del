import React from 'react'

function Header () {
    return (
        <header>
            <h1>Food Delivery</h1>
            <nav>
                <a href="/">Catalog</a>
                <a href="/cart">Cart</a>
            </nav>
        </header>
    )
}

export default Header
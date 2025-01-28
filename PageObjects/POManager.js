import LoginPage from "./LoginPage"
import DashboardPage from "./DashboardPage"
import CartPage from "./CartPage"
import OrderPage from './OrderPage'

class POManager{
    constructor(page){
        this.page = page
        this.login = new LoginPage(this.page)
        this.dashboard = new DashboardPage(this.page)
        this.cart = new CartPage(this.page)
        this.order = new OrderPage(this.page)
        

    }

    getLoginPage(){
        return this.login
    }

    getDashboardPage(){
        return this.dashboard
    }

    getCartPage(){
        return this.cart
    }

    getOrderPage(){
        return this.order
    }

}

export default POManager
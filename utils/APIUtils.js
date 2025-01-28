import { expect, request } from '@playwright/test';
let token
class APIUtils {



    constructor(apiContext,loginPayload) {
        this.apiContext = apiContext
        this.loginPayload = loginPayload
    }
    async getToken() {

        let loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', { data: this.loginPayload })
        expect((loginResponse).ok()).toBeTruthy()
        loginResponse = await loginResponse.json()
        token = loginResponse.token
        return token
    }

    async getProductID(productName) {
        let getItemsResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/product/get-all-products',
            {
                headers:
                {
                    'Authorization': await this.getToken(), 'Content-Type': 'application/json'

                }
            })
        expect((getItemsResponse).ok()).toBeTruthy()
        getItemsResponse = await getItemsResponse.json()
        let product_id
        for (let i = 0; i < await getItemsResponse.data.length; i++) {
            if (getItemsResponse.data[i].productName === productName) {
                product_id = getItemsResponse.data[i]._id
                return product_id
            }
        }
    }

    async getOrderID(product_id) {
        let response = {}
        response.token = await this.getToken()
        let orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',

            {
                data:
                {
                    orders:
                        [{ country: "India", productOrderedId: product_id }]
                },

                headers:
                {
                    'Authorization':  response.token,
                    'Content-Type': 'application/json'

                }
            })
        expect((orderResponse).ok()).toBeTruthy()
        orderResponse = await orderResponse.json()
        let order_id = orderResponse.orders[0]
        response.order_id = order_id
        return response
    }
}

export default APIUtils
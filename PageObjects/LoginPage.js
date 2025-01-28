class LoginPage {
    constructor(page) {
        this.page = page
        this.userName = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
        this.signinButton = page.locator('#login')
    }



    async login(username, password) {
        await this.page.goto('https://rahulshettyacademy.com/client/');
        await this.userName.fill(username)
        await this.password.fill(password)
        await this.signinButton.click()

    }
}

export default LoginPage
export class authUtils{

    private static readonly auth_token = 'auth-token'

    constructor(){

    }
    
    static getAuthToken() {
        return localStorage.getItem(authUtils.auth_token)

    }

    static setAuthToken(value) {
        localStorage.setItem(authUtils.auth_token, value)

    }

    static removeAuthToken() {
        localStorage.removeItem(this.auth_token)

    }
}
import {APIRequestContext} from '@playwright/test';
let loginResponseJSON;

export class ApiUtils {

    apiContext: APIRequestContext;
    loginPayload: object;

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    public async login() {
        const login_url : string = 'https://rahulshettyacademy.com/api/ecom/auth/login';
        const loginResponse = await this.apiContext.post(login_url, {
                data: this.loginPayload
            }
        );
    
        // extract authorization token from response
        loginResponseJSON = await loginResponse.json();
    }

    public async getTokenAndUserID() {
        await this.login();
        type TokenAndUserID = {
            token: string,
            userID: string
        };
        const tokenAndUserID: TokenAndUserID = {
            token: loginResponseJSON.token,
            userID: loginResponseJSON.userId
        }
        return tokenAndUserID;
    }

    public async creatOrder(token: string, createOrderPayload: object) : Promise<string> {
        const createOrderUrl : string = 'https://rahulshettyacademy.com/api/ecom/order/create-order';
        const createOrderResponse = await this.apiContext.post(createOrderUrl, {
            data: createOrderPayload,
            headers: {
                'authorization': token,
                'content-type': 'application/json'
            }
        });
    
        // Extracting Order IDs from response
        const createOrderResponseJSON = await createOrderResponse.json();
        return createOrderResponseJSON.orders[0];
    }

    public async deleteOrder(token: string, orderId: string) {
        const deleteOrderUrl: string = 'https://rahulshettyacademy.com/api/ecom/order/delete-order/';
        const deleteOrderResponse = await this.apiContext.delete(
            deleteOrderUrl + orderId, {
                headers: {
                    'authorization': token
                }
            }
        );
    }
}
import BaseWgClass from './BaseWgClass';
export default class Auth extends BaseWgClass{
    static async userLogIn(){
        let response = await fetch(this.getAuthUrl(),{
            method: 'POST',
            headers: {
                'Content-Type:' : 'text/html'
            }
        });
        return await response.text();
    }
} 
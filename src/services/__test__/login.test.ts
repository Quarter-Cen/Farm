/** @jest-environment node*/

import { LoginService } from "../login";
import { parse } from 'cookie'
const loginService = new LoginService();

test('login admin success', async () => {
    let adminLogin = await loginService.login('admin@admin.com', 'admin');
        expect(adminLogin).toHaveProperty('id', BigInt(1));
});

// test('login user success', async () => {
//     let userLogin = await loginService.login('user', 'user');
//         expect(userLogin).toHaveProperty('id', BigInt(2));
// });

test('login failed due to incorrect credentials', async () => {
    const failedLogin = await loginService.login('admin', 'user');
    expect(failedLogin).toBeNull();
});


test('create cookie', async () => {
    let adminLogin = await loginService.login('admin@admin.com', 'admin');
    if (adminLogin) {
        let cookie = await loginService.createCookie(adminLogin)
        expect(cookie).not.toBeNull()
    } else {
        expect(adminLogin).toBeNull()
    }
});

test('get role admin', async () => {
    let adminLogin = await loginService.login('admin@admin.com', 'admin')
    if (adminLogin) {
        let cookie = await loginService.createCookie(adminLogin)
        expect(cookie).not.toBeNull()
        let session = parse(cookie)
        expect(session).not.toBeUndefined()
        expect(session.session).not.toBeUndefined()
        expect(session.session).not.toBeNull()
        if (session != undefined && session.session) {
            let roles = await loginService.getCurrentRoles(session.session)
            console.log(roles)
            expect(roles).not.toBeNull()
            expect(roles.length).toBeGreaterThan(0)
        }
    } else {
        expect(adminLogin).toBeNull()
    }
})
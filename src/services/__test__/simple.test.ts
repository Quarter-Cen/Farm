import { LoginService } from "../login"

test('Service OK', () => {
    let service = new LoginService()
    expect(service.ok()).toBe('OK พ่อมึงถถถ')
})

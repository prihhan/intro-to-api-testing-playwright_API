import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDTO } from '../dto/login-dto'

test('should return token with correct username and password', async ({ request }) => {
  const requestBody: LoginDTO = LoginDTO.createLoginDto()

  const response = await request.post('https://backend.tallinn-learning.ee/login/student', {
    data: requestBody,
  })

  console.log('response body and token:', response.text())
  expect(response.status()).toBe(StatusCodes.OK)
})

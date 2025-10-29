import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDTO } from '../dto/login-dto'

const source_url = 'https://backend.tallinn-learning.ee/login/student'

test('should return a valid JWT token when provided with correct credentials', async ({
  request,
}) => {
  const requestBody: LoginDTO = LoginDTO.createLoginDto()
  const response = await request.post(source_url, {
    data: requestBody,
  })

  const responseText = await response.text()
  console.log('Response body and token:', responseText)

  expect(response.status()).toBe(StatusCodes.OK)

  const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
  expect(responseText).toMatch(jwtRegex)
})

test('should return an error when using an incorrect HTTP method', async ({ request }) => {
  const response = await request.get(source_url)
  const statusCode = response.status()
  console.log('Incorrect method response status:', statusCode)

  expect(statusCode).toBe(StatusCodes.METHOD_NOT_ALLOWED);
})

test('should return an error when sending a malformed or invalid request body', async ({
  request,
}) => {
  const invalidBody = {
    user_name: 'invalidField', // wrong user
    pass: '1234', // wrong pass
  }

  const response = await request.post(source_url, {
    data: invalidBody,
  })

  const statusCode = response.status()
  console.log('Incorrect body response status:', statusCode)

  expect(statusCode).toBe(StatusCodes.UNAUTHORIZED);
})

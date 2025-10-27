import { test, expect } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanRequestDTO } from '../dto/LoanRequestDTO'

const url = 'https://backend.tallinn-learning.ee/api/loan-calc/decision'

test('should return Negative decision for valid user', async ({ request }) => {
  const body = new LoanRequestDTO(100, 0, 17, true, 1000, 12)
  const response = await request.post(url, { data: body })

  const json = await response.json()
  console.log('response status:', response.status())
  console.log('response body:', json)

  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(json.riskDecision).toBe('negative')
  expect.soft(response.status()).toBe(StatusCodes.OK)
})

test('should return Positive decision (Medium risk) for valid user', async ({ request }) => {
  const body = new LoanRequestDTO(20000, 0, 30, true, 500, 6)
  const response = await request.post(url, { data: body })

  const json = await response.json()
  console.log('response status:', response.status())
  console.log('response body:', json)

  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(json.riskDecision).toBe('positive')
  expect.soft(json.riskLevel).toBe('Medium Risk')
})

test('should return Positive decision (Low risk) for valid user', async ({ request }) => {
  const body = new LoanRequestDTO(20000, 0, 30, true, 500, 12)
  const response = await request.post(url, { data: body })

  const json = await response.json()
  console.log('response status:', response.status())
  console.log('response body:', json)

  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(json.riskDecision).toBe('positive')
})

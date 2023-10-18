/**
 * Generated by orval v6.17.0 🍺
 * Do not edit manually.
 * FE-23 OpenAI API
 * OpenAPI spec version: 1.0.0
 */
import { rest } from 'msw'
import { faker } from '@faker-js/faker'

export const getLoginMock = () => ({
  data: {
    id: (() => 2)(),
    username: faker.random.word(),
    accessToken: (() => faker.string.nanoid())(),
  },
})

export const getAuthMSW = () => [
  rest.post('*/auth/login', (_req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200, 'Mocked status'),
      ctx.json(getLoginMock()),
    )
  }),
]

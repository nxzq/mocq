import { faker } from '@faker-js/faker'
import { expect, test } from 'bun:test'

import { createGenerator } from './generator'

test("[generator] defaults", () => {
  const dataSource = {
    _id: faker.string.uuid,
    first_name: faker.person.firstName,
    last_name: faker.person.lastName
  }
  const _generator = createGenerator<{
    _id: string
    first_name: string
    last_name: string
  }>(dataSource)
  const res = _generator.generate()
  expect(res).toHaveLength(1)
  expect(res[0]._id).toBeString()
  expect(res[0].first_name).toBeString()
  expect(res[0].last_name).toBeString()
});

test("[generator] overrides", () => {
  const dataSource_v2 = {
    id: faker.string.uuid,
    name: () => `${faker.person.firstName()} ${faker.person.lastName()}`,
    type: () => 'default_user'
  }
  const _generator = createGenerator<{
    id: string
    name: string
    type: string
  }>(dataSource_v2)
  const res = _generator.generate({ count: 2, overrides: {type: () => 'admin_user'}})
  expect(res).toHaveLength(2)
  expect(res[0].id).toBeString()
  expect(res[0].name).toBeString()
  expect(res[0].type).toBe('admin_user')
  expect(res[1].id).toBeString()
  expect(res[1].name).toBeString()
  expect(res[1].type).toBe('admin_user')
});
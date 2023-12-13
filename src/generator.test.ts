import { expect, test } from 'bun:test'

import { createGenerator } from './generator'
import { DataSource } from './types';

test("[generator] defaults", () => {
  const dataSource: DataSource<{_id: number, first_name: string, last_name: string}> = {
    _id: (i) => i,
    first_name: (i) => `first_name_${i}`,
    last_name: (i) => `last_name_${i}`
  }
  const _generator = createGenerator<{
    _id: number
    first_name: string
    last_name: string
  }>(dataSource)
  const res = _generator.generate()
  expect(res).toHaveLength(1)
  expect(res[0]._id).toBeNumber()
  expect(res[0].first_name).toBeString()
  expect(res[0].last_name).toBeString()
});

test("[generator] overrides", () => {
  const dataSource: DataSource<{id: number, name: string, type: string}> = {
    id: (i) => i,
    name: (i) => `name_${i}`,
    type: () => 'default_user'
  }
  const _generator = createGenerator<{
    id: number
    name: string
    type: string
  }>(dataSource)
  const res = _generator.generate({ count: 2, overrides: {type: () => 'admin_user'}})
  expect(res).toHaveLength(2)
  expect(res[0].id).toBeNumber()
  expect(res[0].name).toBeString()
  expect(res[0].type).toBe('admin_user')
  expect(res[1].id).toBeNumber()
  expect(res[1].name).toBeString()
  expect(res[1].type).toBe('admin_user')
});
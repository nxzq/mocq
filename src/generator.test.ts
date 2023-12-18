import { describe, expect, test } from 'bun:test'

import { createGenerator } from './generator'

describe('[generator]', () => {
  test("defaults", () => {
    const generator = (i: number): {_id: number, first_name: string, last_name: string} => ({
      _id: i,
      first_name: `first_name_${i}`,
      last_name: `last_name_${i}`
    })
    const _generator = createGenerator<{
      _id: number
      first_name: string
      last_name: string
    }>(generator)
    const res = _generator.generate()
    expect(res).toHaveLength(1)
    expect(res[0]._id).toBeNumber()
    expect(res[0].first_name).toBeString()
    expect(res[0].last_name).toBeString()
  });

  test("overrides", () => {
    const generator = (i: number):{id: number, name: string, type: string} => ({
      id: i,
      name: `name_${i}`,
      type: 'default_user'
    })
    const _generator = createGenerator<{
      id: number
      name: string
      type: string
    }>(generator)
    const res = _generator.generate({ count: 2, overrides: {type: () => 'admin_user'}})
    expect(res).toHaveLength(2)
    expect(res[0].id).toBeNumber()
    expect(res[0].name).toBeString()
    expect(res[0].type).toBe('admin_user')
    expect(res[1].id).toBeNumber()
    expect(res[1].name).toBeString()
    expect(res[1].type).toBe('admin_user')
  })
})

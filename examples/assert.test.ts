import { expect, test } from 'bun:test'

import { mocq } from 'mocq'

test('asserting in mocq handler', async () => {
  const count = 1

  const { execute } = mocq({
    nodes: {
      generator: (i: number) => ({ index: i }),
      count,
      handler: (data: {index: number}[]) => {
        expect(true).toEqual(true)
        expect(data.length).toEqual(count)
        expect(data[0]).toEqual({ index: 0 })
      }
    }
  })
  
  await execute()
})

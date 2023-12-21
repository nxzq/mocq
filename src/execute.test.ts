import { describe, expect, test } from 'bun:test'

import { execute } from './execute'

describe('[execute]', async () => {
  test("handler executes successfully", async () => {
    type Node = {
      name: string
    }

    const createNode = (i: number): Node => ({
      name: `name_${i}`,
    })

    const mockData = {
      elements: [
        {
          name: 'name_1'
        },
        {
          name: 'name_2'
        }
      ]
    }

    let acc: Node[] = []

    const mocqConfig = {
      elements: {
        generator: createNode,
        count: 2,
        handler: ( data: Node[]) => { acc = [...data] }
      }
    }

    await execute(mocqConfig, mockData, ['elements'])
    expect(acc).toEqual(mockData.elements)
  })
  test("handles error in handler", async () => {
    type Node = {
      name: string
    }

    const createNode = (i: number): Node => ({
      name: `name_${i}`,
    })

    const mockData = {
      elements: [
        {
          name: 'name_1'
        }
      ]
    }

    const mocqConfig = {
      elements: {
        generator: createNode,
        count: 1,
        handler: () => { throw new Error('custom handler error') }
      }
    }

    try {
      await execute(mocqConfig, mockData, ['elements'])
    } catch (e: Error | any) {
      expect(e?.message).toBe('custom handler error')
    }
  })
})

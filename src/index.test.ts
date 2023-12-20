import { describe, expect, test } from 'bun:test'

import { mocq } from '.'

describe('[mocq]', async () => {
  test("exports", () => {
    expect(mocq).toBeDefined()
  });
  test("working example", async () => {
    type User = {
      alias: string
      first_name: string
      last_name: string
    }
    type Tag = {
      id: string
      name: string
      created_by: string
    }
    type Element = {
      id: string
      name: string
      tags: string[]
      created_by: string
    }
  
    let availableTags: Tag[] = []
    let mockElementDataAccumulator: Element[] = []
  
    const userDataSource = (i: number): User => ({
      alias: `alias_${i}`,
      first_name: `first_name_${i}`,
      last_name: `last_name_${i}`
    })
    
    const tagDataSource = (i: number): Tag => ({
      id: `t${`0000000000000${i}`.slice(-9)}`,
      name: `tag_name_${i}`,
      created_by: ''
    })
    
    const elementDataSource = (i: number): Element => ({
      id: `e${`0000000000000${i}`.slice(-9)}`,
      name: `element_name_${i}`,
      tags: [],
      created_by: ''
    })
  
    const dbLoadMocqConfig = {
      users: {
        generator: userDataSource,
        count: 25
      },
      tags: {
        generator: tagDataSource,
          count: 25,
          connections: {
            users: (index: number, data: User[])=>({ created_by: data[Math.floor(Math.random() * data.length)].alias }),
          },
          handler: async (data: Tag[]) => {
            availableTags = data
          },
      },
      elements: {
        generator: elementDataSource,
          count: 100,
          connections: {
            users: (index: number, data: User[])=>({ created_by: data[Math.floor(Math.random() * data.length)].alias }),
            tags: (index: number, data: Tag[])=>({ tags: [...new Set([data[Math.floor(Math.random() * data.length)], data[Math.floor(Math.random() * data.length)]])].map(x => x.id) }),
          },
          handler: async (data: Element[]) => {
            mockElementDataAccumulator = data;
          },
      },
    }
    
    const dbLoad = mocq(dbLoadMocqConfig)
    const data = dbLoad.generate()
    expect(data.users.length).toBe(25)
    expect(data.tags.length).toBe(25)
    expect(data.elements.length).toBe(100)
    const { data: { tags, elements, users }} = await dbLoad.execute()
    expect(users.length).toBe(25)
    expect(tags.length).toBe(25)
    expect(elements.length).toBe(100)
    expect(availableTags.sort()).toEqual(tags.sort())
    expect((mockElementDataAccumulator).sort()).toEqual(elements.sort())
  })
  test("handles error in handler", async () => {
    type Node = {
      name: string
    }

    const createNode = (i: number): Node => ({
      name: `name_${i}`,
    })

    const mocqConfig = {
      elements: {
        generator: createNode,
          count: 100,
          handler: () => {throw new Error('custom handler error')}
      }
    }
    
    try {
      const { execute } = mocq(mocqConfig)
      await execute()
    } catch (e: Error | any) {
      expect(e?.message).toBe('custom handler error')
    }
  })
})

import { describe, expect, test } from 'bun:test'

import * as mocqExports from '.'

describe('[mocq]', () => {
  test('exports', () => {
    expect(Object.keys(mocqExports).length).toBe(1)
    expect(mocqExports.mocq).toBeDefined()
  })
  test('example', async () => {
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
      tags: Tag[]
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
          users: (users: User[])=>({ created_by: users[Math.floor(Math.random() * users.length)].alias }),
        },
        handler: (data: Tag[]) => {
          availableTags = data
        },
      },
      elements: {
        generator: elementDataSource,
        count: 100,
        connections: {
          users: (users: User[])=>({ created_by: users[Math.floor(Math.random() * users.length)].alias }),
          tags: (tags: Tag[])=>({ tags: [ ...new Set([ tags[Math.floor(Math.random() * tags.length)], tags[Math.floor(Math.random() * tags.length)] ]) ] }),
        },
        handler: (data: Element[]) => {
          mockElementDataAccumulator = data
        },
      },
    }
    
    const dbLoad = mocqExports.mocq(dbLoadMocqConfig)
    const { data } = dbLoad.generate()
    expect(data.users.length).toBe(25)
    expect(data.tags.length).toBe(25)
    expect(data.elements.length).toBe(100)
    const { data: { tags, elements, users } } = await dbLoad.execute()
    expect(users.length).toBe(25)
    expect(tags.length).toBe(25)
    expect(elements.length).toBe(100)
    expect(availableTags.sort()).toEqual(tags.sort())
    expect((mockElementDataAccumulator).sort()).toEqual(elements.sort())
  })
})

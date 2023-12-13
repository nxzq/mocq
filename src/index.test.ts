import { expect, test } from 'bun:test'

import { mocq, MocQ, DataSource } from '.'

test("[mocq] exports", () => {
  expect(mocq).toBeDefined()
});

test("[mocq] example", () => {
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

  const userDataSource: DataSource<User> = {
    alias: (i) => `alias_${i}`,
    first_name: (i) => `first_name_${i}`,
    last_name: (i) => `last_name_${i}`
  }
  
  const tagDataSource: DataSource<Tag> = {
    id: (i) => `t${`0000000000000${i}`.slice(-9)}`,
    name: (i) => `tag_name_${i}`,
    created_by: () => ''
  }
  
  const elementDataSource: DataSource<Element> = {
    id: (i) => `e${`0000000000000${i}`.slice(-9)}`,
    name: (i) => `element_name_${i}`,
    tags: () => [],
    created_by: () => ''
  }

  type dbLoadConfig = {
    users: MocQ<User>
    tags: MocQ<Tag>
    elements: MocQ<Element>
  }

  const dbLoadMocqConfig: dbLoadConfig = {
    users: {
      generator: userDataSource,
      count: 25
    },
    tags: {
      generator: tagDataSource,
        count: 25,
        connections: {
          users: (data: User[])=>({ created_by: () => data[Math.floor(Math.random() * data.length)].alias }),
        },
        handler: (data: Tag[]) => {
          availableTags = data
        },
    },
    elements: {
      generator: elementDataSource,
        count: 100,
        connections: {
          users: (data: User[])=>({ created_by: (i) => data[Math.floor(Math.random() * data.length)].alias+i }),
          tags: (data: Tag[])=>({ tags: () => [...new Set([data[Math.floor(Math.random() * data.length)], data[Math.floor(Math.random() * data.length)]])].map(x => x.id) }),
        },
        handler: (data: Element[]) => {
          mockElementDataAccumulator = data;
        },
    },
  }
  
  const dbLoad = mocq(dbLoadMocqConfig)
  const { data: { tags, elements } } = dbLoad.execute()
  expect(availableTags.sort()).toEqual(tags.sort())
  expect((mockElementDataAccumulator).sort()).toEqual(elements.sort())
})
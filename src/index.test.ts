import { faker } from '@faker-js/faker'
import { expect, test } from 'bun:test'

import { mocq, generator } from '.'

test("[mocq] exports", () => {
  expect(mocq).toBeDefined()
  expect(generator).toBeDefined()
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
  const availableTags: Tag[] = []
  let mockElementDataAccumulator: Element[] = []
  const userDataSource = {
    alias: () => faker.lorem.word({ length: 6 }),
    first_name: faker.person.firstName,
    last_name: faker.person.lastName
  }
  
  const tagDataSource = {
    id: faker.string.uuid,
    name: faker.company.buzzNoun,
    created_by: () => ''
  }
  
  const elementDataSource = {
    id: faker.string.uuid,
    name: faker.company.buzzPhrase,
    tags: () => [],
    created_by: () => ''
  }
  
  const dbLoad = mocq({
    users: {
      generator: generator(userDataSource),
      count: 25
    },
    tags: {
      generator: generator(tagDataSource),
        count: 25,
        connections: {
          users: (data: User[])=>({ created_by: () => faker.helpers.arrayElement(data).alias }),
        },
        handler: {
          execType: 'iterate',
          callback: (data: Tag) => {
            availableTags.push(data)
          },
        },
    },
    elements: {
      generator: generator(elementDataSource),
        count: 100,
        connections: {
          users: (data: User[])=>({ created_by: () => faker.helpers.arrayElement(data).alias }),
          tags: (data: Tag[])=>({ tags: () => faker.helpers.arrayElements(data, { min: 0, max: 4 }).map(x => x.id) }),
        },
        handler: {
          execType: 'batch',
          callback: (data: Element[]) => {
            mockElementDataAccumulator = data;
          },
        },
    },
  })
  
  const { data } = dbLoad.execute()
  expect(availableTags.sort()).toEqual(data.tags.sort())
  expect((mockElementDataAccumulator).sort()).toEqual(data.elements.sort())
})
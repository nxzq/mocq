import { faker } from '@faker-js/faker'
import { expect, test } from 'bun:test'

import { mocquer } from '.'

test("[mocquer] exports", () => {
  expect(mocquer.createGenerator).toBeDefined()
  expect(mocquer.createWorkflow).toBeDefined()
});

test("[mocquer] example", () => {
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
  const preHandlerValue = 'init'
  let execPreHandler = ''
  const availableTags: Tag[] = []
  let mockElementDataAccumulator: Element[] = []
  const postHandler = 'done ✅'
  let execPostHandler = ''
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
  
  const dbLoad = mocquer.createWorkflow({
    preHandler: () => execPreHandler = preHandlerValue,
    actions: [
      {
        name: 'users',
        generator: mocquer.createGenerator(userDataSource),
        count: 25
      },
      {
        name: 'tags',
        generator: mocquer.createGenerator(tagDataSource),
        count: 25,
        handler: {
          execType: 'iterate',
          callback: (data: Tag) => {
            availableTags.push(data)
          },
        },
        connections: [
          {
            actionName: 'users',
            callback: (data: User[])=>({ created_by: () => faker.helpers.arrayElement(data).alias }),
          }
        ]
      },
      {
        name: 'elements',
        generator: mocquer.createGenerator(elementDataSource),
        count: 100,
        handler: {
          execType: 'batch',
          callback: (data: Element[]) => {
            mockElementDataAccumulator = data;
          },
        },
        connections: [
          {
            actionName: 'users',
            callback: (data: User[])=>({ created_by: () => faker.helpers.arrayElement(data).alias }),
          },
          {
            actionName: 'tags',
            callback: (data: Tag[])=>({ tags: () => faker.helpers.arrayElements(data, { min: 0, max: 4 }).map(x => x.id) }),
          }
        ]
      }
    ],
    postHandler: () => execPostHandler = postHandler,
  })
  
  const { data } = dbLoad.execute()
  expect(execPreHandler).toBe(preHandlerValue)
  expect(availableTags.sort()).toEqual(data.tags.sort())
  expect((mockElementDataAccumulator).sort()).toEqual(data.elements.sort())
  expect(execPostHandler).toBe(postHandler)
})
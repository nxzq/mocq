import { mocq } from "mocq"

const getRandomArrElement = (data: any[]) => {
  return data[Math.floor(Math.random() * data.length)]
}

const getRandomArrElements = <T extends any>(data: T[], maxCount: number): T[] => {
  return [...new Set(new Array(maxCount).fill('').map((x) => getRandomArrElement(data)))] as T[]
}

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

const generateMockUser = (i: number): User => ({
  alias: `alias_${i}`,
  first_name: `first_name_${i}`,
  last_name: `last_name_${i}`
})

const generateMockTag = (i: number): Tag => ({
  id: `t${`0000000000000${i}`.slice(-9)}`,
  name: `tag_name_${i}`,
  created_by: 'unknown'
})

const generateMockElements = (i: number): Element => ({
  id: `e${`0000000000000${i}`.slice(-9)}`,
  name: `element_name_${i}`,
  tags: [],
  created_by: 'unknown'
})

const { generate } = mocq({
  users: {
    generator: generateMockUser,
    count: 25
  },
  tags: {
    generator: generateMockTag,
      count: 25,
      connections: {
        users: (index: number, data: User[])=>({ created_by: getRandomArrElement(data).alias }),
      }
  },
  elements: {
    generator: generateMockElements,
      count: 100,
      connections: {
        users: (index: number, data: User[])=>({ created_by: getRandomArrElement(data).alias }),
        tags: (index: number, data: Tag[])=>({ tags: getRandomArrElements(data, 2).map(x => x.id) }),
      }
  },
})

const { data: { users, tags, elements} } = generate()

console.log('users:')
users.map(x => console.table(x))
console.log('tags:')
tags.map(x => console.table(x))
console.log('elements:')
elements.map(x => console.table(x))

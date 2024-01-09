import { describe, expect, test } from 'bun:test'

import { validate } from './validate'
import { emphasisErrorText } from './logger'

type Node = {
  name: string
}

const generateNodeDataSource = (i: number): Node => ({
  name: `name_${i}`,
})

describe('[validation]', () => {
  test("unordered config", () => {
    const mocqConfig = {
      elements: {
        generator: generateNodeDataSource,
          count: 100,
          connections: {
            users: (i: number, data: Node[])=>({ name: data[Math.floor(Math.random() * data.length)].name+i }),
            tags: (i: number, data: Node[])=>({ tags: [...new Set([data[Math.floor(Math.random() * data.length)], data[Math.floor(Math.random() * data.length)]])].map(x => x.name) }),
          }
      },
      tags: {
        generator: generateNodeDataSource,
          count: 25,
          connections: {
            users: (i: number, data: Node[])=>({ name: () => data[Math.floor(Math.random() * data.length)].name }),
          }
      },
      users: {
        generator: generateNodeDataSource,
        count: 25
      },
    }
    
    const order = validate(mocqConfig)
    expect(order).toEqual(['users','tags','elements'])
  })
  test("self reference connection config", () => {
    const mocqConfig = {
      elements: {
        generator: generateNodeDataSource,
          count: 100,
          connections: {
            elements: (i: number, data: Node[])=>({ name: data[Math.floor(Math.random() * data.length)].name+i }),
          }
      }
    }
    
    try {
      validate(mocqConfig)
    } catch (e: Error | any) {
      expect(e?.message).toBe(`key ${emphasisErrorText('elements')} cannot reference itself in connections`)
    }
  })
  test("cyclic connections config", () => {
    const mocqConfig = {
      elements: {
        generator: generateNodeDataSource,
          count: 100,
          connections: {
            tags: (i: number, data: Node[])=>({ name: [...new Set([data[Math.floor(Math.random() * data.length)], data[Math.floor(Math.random() * data.length)]])].map(x => x.name) }),
          }
      },
      tags: {
        generator: generateNodeDataSource,
          count: 25,
          connections: {
            users: (i: number, data: Node[])=>({ name: data[Math.floor(Math.random() * data.length)].name }),
          }
      },
      users: {
        generator: generateNodeDataSource,
        count: 25,
        connections: {
          elements: (i: number, data: Node[])=>({ name: data[Math.floor(Math.random() * data.length)].name }),
        }
      },
    }
    
    try {
      validate(mocqConfig)
    } catch (e: Error | any) {
      expect(e?.message).toBe(`cyclic dependencies detected involving key ${emphasisErrorText('elements')}`)
    }
  })
  test("undefined/missing connection config", () => {
    const mocqConfig = {
      elements: {
        generator: generateNodeDataSource,
          count: 100,
          connections: {
            chesto: (i: number, data: Node[])=>({ name: data[Math.floor(Math.random() * data.length)].name+i }),
          }
      }
    }
    
    try {
      validate(mocqConfig)
    } catch (e: Error | any) {
      expect(e?.message).toBe(`connection key ${emphasisErrorText('chesto')} is not present in config but referenced in ${emphasisErrorText('elements')}`)
    }
  })
  test("count not greater than zero", () => {
    const mocqConfig = {
      elements: {
        generator: generateNodeDataSource,
          count: 0,
      }
    }
    
    try {
      validate(mocqConfig)
    } catch (e: Error | any) {
      expect(e?.message).toBe(`count for key ${emphasisErrorText('elements')} must be a number greater than zero (0)`)
    }
  })
  test("generator not a function", () => {
    const mocqConfig = {
      elements: {
        generator: { name: 'string' },
          count: 100,
      }
    }
    
    try {
      // @ts-expect-error
      validate(mocqConfig)
    } catch (e: Error | any) {
      expect(e?.message).toBe(`generator for key ${emphasisErrorText('elements')} must be a function`)
    }
  })
  test("generator not a returning object", () => {
    const mocqConfig = {
      elements: {
        generator: (i: number) => 'data',
          count: 100,
      }
    }
    
    try {
      // @ts-expect-error
      validate(mocqConfig)
    } catch (e: Error | any) {
      expect(e?.message).toBe(`generator for key ${emphasisErrorText('elements')} must return an object`)
    }
  })
  test("connection not a function", () => {
    const mocqConfig = {
      elements: {
        generator: generateNodeDataSource,
          count: 100,
      },
      node: {
        generator: generateNodeDataSource,
          count: 100,
          connections: {
            elements: 'elements'
          }
      }
    }
    
    try {
      // @ts-expect-error
      validate(mocqConfig)
    } catch (e: Error | any) {
      expect(e?.message).toBe(`${emphasisErrorText('node')} connection key ${emphasisErrorText('elements')} must be a function`)
    }
  })
  test("connection not a returning object", () => {
    const mocqConfig = {
      elements: {
        generator: generateNodeDataSource,
          count: 100,
      },
      node: {
        generator: generateNodeDataSource,
          count: 100,
          connections: {
            elements: () => 'elements'
          }
      }
    }
    
    try {
      // @ts-expect-error
      validate(mocqConfig)
    } catch (e: Error | any) {
      expect(e?.message).toBe(`${emphasisErrorText('node')} connection key ${emphasisErrorText('elements')} must return an object`)
    }
  })
})
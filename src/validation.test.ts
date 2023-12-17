import { describe, expect, test } from 'bun:test'

import { validate } from './validate'
import { MocQ, DataSource } from '.'

type Node = {
  name: string
}

const nodeDataSource: DataSource<Node> = {
  name: (i) => `name_${i}`,
}

describe('[validation]', () => {
  test("unordered config", () => {

    type Config = {
      users: MocQ<Node>
      tags: MocQ<Node>
      elements: MocQ<Node>
    }

    const mocqConfig: Config = {
      elements: {
        generator: nodeDataSource,
          count: 100,
          connections: {
            users: (data: Node[])=>({ name: (i) => data[Math.floor(Math.random() * data.length)].name+i }),
            tags: (data: Node[])=>({ name: () => [...new Set([data[Math.floor(Math.random() * data.length)], data[Math.floor(Math.random() * data.length)]])].map(x => x.name) }),
          }
      },
      tags: {
        generator: nodeDataSource,
          count: 25,
          connections: {
            users: (data: Node[])=>({ name: () => data[Math.floor(Math.random() * data.length)].name }),
          }
      },
      users: {
        generator: nodeDataSource,
        count: 25
      },
    }
    
    const order = validate(mocqConfig)
    expect(order).toEqual(['users','tags','elements'])
  })
  test("self reference connection config", () => {

    type Config = {
      elements: MocQ<Node>
    }

    const mocqConfig: Config = {
      elements: {
        generator: nodeDataSource,
          count: 100,
          connections: {
            elements: (data: Node[])=>({ name: (i) => data[Math.floor(Math.random() * data.length)].name+i }),
          }
      }
    }
    
    try {
      validate(mocqConfig)
    } catch (e: Error | any) {
      expect(e?.message).toBe(`key "elements" cannot reference itself in connections`)
    }
  })
  test("cyclic connections config", () => {

    type Config = {
      users: MocQ<Node>
      tags: MocQ<Node>
      elements: MocQ<Node>
    }

    const mocqConfig: Config = {
      elements: {
        generator: nodeDataSource,
          count: 100,
          connections: {
            tags: (data: Node[])=>({ name: () => [...new Set([data[Math.floor(Math.random() * data.length)], data[Math.floor(Math.random() * data.length)]])].map(x => x.name) }),
          }
      },
      tags: {
        generator: nodeDataSource,
          count: 25,
          connections: {
            users: (data: Node[])=>({ name: () => data[Math.floor(Math.random() * data.length)].name }),
          }
      },
      users: {
        generator: nodeDataSource,
        count: 25,
        connections: {
          elements: (data: Node[])=>({ name: () => data[Math.floor(Math.random() * data.length)].name }),
        }
      },
    }
    
    try {
      validate(mocqConfig)
    } catch (e: Error | any) {
      expect(e?.message).toBe(`Cyclic dependencies detected involving key "elements"\n\t↳set \x1b[0;36mMOCQ_VERBOSE\x1b[0m env variable to \x1b[0;36mtrue\x1b[0m to help debug`)
    }
  })
  test("undefined/missing connection config", () => {

    type Config = {
      elements: MocQ<Node>
    }

    const mocqConfig: Config = {
      elements: {
        generator: nodeDataSource,
          count: 100,
          connections: {
            chesto: (data: Node[])=>({ name: (i) => data[Math.floor(Math.random() * data.length)].name+i }),
          }
      }
    }
    
    try {
      validate(mocqConfig)
    } catch (e: Error | any) {
      expect(e?.message).toBe(`key "chesto" is not present in config but referenced in key "elements" connections`)
    }
  })
})
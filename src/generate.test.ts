import { describe, expect, test } from 'bun:test'

import { generate } from './generate'
import { emphasisErrorText } from './logger'

type Node = { id: number, name: string }

const generator = (i: number): Node => ({
  id: i,
  name: `name_${i}`
})

describe('[generator]', () => {
  test("basic", () => {
    const generator = (i: number): {_id: number, first_name: string, last_name: string} => ({
      _id: i,
      first_name: `first_name_${i}`,
      last_name: `last_name_${i}`
    })

    const config = {
      node: {
        generator,
        count: 1
      }
    }

    const res = generate(config, ['node'])
    expect(res.node).toHaveLength(1)
    expect(res.node[0]._id).toBeNumber()
    expect(res.node[0].first_name).toBeString()
    expect(res.node[0].last_name).toBeString()
  });
  test("connections", () => {
    const config = {
      node: {
        generator,
        count: 2
      },
      node2: {
        generator,
        count: 2,
        connections: {
          node: (i: number, data: Node[]) => ({ name: data.reverse()[0].name})
        }
      }
    }
    const { node, node2 } = generate(config, ['node', 'node2'])
    expect(node).toHaveLength(2)
    expect(node[0].id).toBeNumber()
    expect(node[0].name).toEqual(node2[1].name)
    expect(node[1].id).toBeNumber()
    expect(node[1].name).toBeString()
    expect(node[1].name).toEqual(node2[0].name)
  })
  test("chained connections", () => {
    const config = {
      node: {
        generator,
        count: 2
      },
      node2: {
        generator,
        count: 2,
        connections: {
          node: (i: number, data: Node[]) => ({ name: data.reverse()[0].name})
        }
      },
      node3: {
        generator,
        count: 2,
        connections: {
          node2: (i: number, data: Node[]) => ({ name: data[i].name})
        }
      },
    }
    const { node, node2, node3 } = generate(config, ['node', 'node2', 'node3'])
    expect(node).toHaveLength(2)
    expect(node[0].id).toBeNumber()
    expect(node[0].name).toEqual(node2[1].name)
    expect(node[1].id).toBeNumber()
    expect(node[1].name).toBeString()
    expect(node[1].name).toEqual(node2[0].name)
    expect(node3[0].name).toEqual(node2[0].name)
    expect(node3[1].name).toEqual(node2[1].name)
  })
  test("erroneous connection key", () => {
    const config = {
      node: {
        generator,
        count: 2,
        connections: {
          user: (i: number, data: any[]) => ({ name: data[i]})
        }
      },
    }
    const { node } = generate(config, ['node'])
    expect(node).toHaveLength(2)
    expect(node[0].id).toBeNumber()

  })
  test("generator not returning object", () => {
    const config = {
      node: {
        generator: (i: number) => i,
        count: 2,
        connections: {
          user: (i: number, data: any[]) => ({ name: data[i]})
        }
      },
    }
    try {
      // @ts-expect-error
      generate(config, ['node'])
    } catch (e: Error | any) {
      expect(e.message).toBe(`generator for key ${emphasisErrorText('node')} must return an object`)
    }
  })
  test("connection not returning object", () => {
    const config = {
      user: {
        generator,
        count: 2,
      },
      node: {
        generator,
        count: 2,
        connections: {
          user: (i: number, data: any[]) => 'data'
        }
      },
    }
    try {
      // @ts-expect-error
      const data = generate(config, ['node'])
    } catch (e: Error | any) {
      expect(e.message).toBe(`${emphasisErrorText('node')} connection key ${emphasisErrorText('user')} must return an object`)
    }
  })
})

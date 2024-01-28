import { describe, expect, test } from 'bun:test'

import { validate } from './validate'
import { emphasisErrorText } from './logger'
import { getErrorMessage } from './utils'

type Node = {
  name: string
}

const generateNodeDataSource = (i: number): Node => ({
  name: `name_${i}`,
})

describe('[validation]', () => {
  test('unordered config', () => {
    const mocqConfig = {
      elements: {
        generator: generateNodeDataSource,
        count: 100,
        connections: {
          users: (users: Node[], i: number)=>({ name: users[Math.floor(Math.random() * users.length)].name+i }),
          tags: (tags: Node[])=>({ tags: [ ...new Set([ tags[Math.floor(Math.random() * tags.length)], tags[Math.floor(Math.random() * tags.length)] ]) ].map(x => x.name) }),
        }
      },
      tags: {
        generator: generateNodeDataSource,
        count: 25,
        connections: {
          users: (users: Node[])=>({ name: () => users[Math.floor(Math.random() * users.length)].name }),
        }
      },
      users: {
        generator: generateNodeDataSource,
        count: 25
      },
    }
    
    const order = validate(mocqConfig)
    expect(order).toEqual([ 'users','tags','elements' ])
  })
  test('self reference connection config', () => {
    const mocqConfig = {
      elements: {
        generator: generateNodeDataSource,
        count: 100,
        connections: {
          elements: (elements: Node[], i: number)=>({ name: elements[Math.floor(Math.random() * elements.length)].name+i }),
        }
      }
    }
    
    try {
      validate(mocqConfig)
    } catch (e: unknown) {
      expect(getErrorMessage(e)).toBe(`key ${emphasisErrorText('elements')} cannot reference itself in connections`)
    }
  })
  test('cyclic connections config', () => {
    const mocqConfig = {
      elements: {
        generator: generateNodeDataSource,
        count: 100,
        connections: {
          tags: (tags: Node[])=>({ name: [ ...new Set([ tags[Math.floor(Math.random() * tags.length)], tags[Math.floor(Math.random() * tags.length)] ]) ].map(x => x.name) }),
        }
      },
      tags: {
        generator: generateNodeDataSource,
        count: 25,
        connections: {
          users: (users: Node[])=>({ name: users[Math.floor(Math.random() * users.length)].name }),
        }
      },
      users: {
        generator: generateNodeDataSource,
        count: 25,
        connections: {
          elements: (elements: Node[])=>({ name: elements[Math.floor(Math.random() * elements.length)].name }),
        }
      },
    }
    
    try {
      validate(mocqConfig)
    } catch (e: unknown) {
      expect(getErrorMessage(e)).toBe(`cyclic dependencies detected involving key ${emphasisErrorText('elements')}`)
    }
  })
  test('undefined/missing connection config', () => {
    const mocqConfig = {
      elements: {
        generator: generateNodeDataSource,
        count: 100,
        connections: {
          chesto: (chestos: Node[], i: number)=>({ name: chestos[Math.floor(Math.random() * chestos.length)].name+i }),
        }
      }
    }
    
    try {
      validate(mocqConfig)
    } catch (e: unknown) {
      expect(getErrorMessage(e)).toBe(`connection key ${emphasisErrorText('chesto')} is not present in config but referenced in ${emphasisErrorText('elements')}`)
    }
  })
  test('count not greater than zero', () => {
    const mocqConfig = {
      elements: {
        generator: generateNodeDataSource,
        count: 0,
      }
    }
    
    try {
      validate(mocqConfig)
    } catch (e: unknown) {
      expect(getErrorMessage(e)).toBe(`count for key ${emphasisErrorText('elements')} must be a number greater than zero (0)`)
    }
  })
  test('generator not a function', () => {
    const mocqConfig = {
      elements: {
        generator: { name: 'string' },
        count: 100,
      }
    }
    
    try {
      // @ts-expect-error 🧪 test config will error typescript compiler
      validate(mocqConfig)
    } catch (e: unknown) {
      expect(getErrorMessage(e)).toBe(`generator for key ${emphasisErrorText('elements')} must be a function`)
    }
  })
  test('generator not returning object', () => {
    const mocqConfig = {
      elements: {
        generator: () => 'data',
        count: 100,
      }
    }
    
    try {
      // @ts-expect-error 🧪 test config will error typescript compiler
      validate(mocqConfig)
    } catch (e: unknown) {
      expect(getErrorMessage(e)).toBe(`generator for key ${emphasisErrorText('elements')} must return an object`)
    }
  })
  test('connection not a function', () => {
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
      // @ts-expect-error 🧪 test config will error typescript compiler
      validate(mocqConfig)
    } catch (e: unknown) {
      expect(getErrorMessage(e)).toBe(`${emphasisErrorText('node')} connection key ${emphasisErrorText('elements')} must be a function`)
    }
  })
  test('connection not returning object', () => {
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
      // @ts-expect-error 🧪 test config will error typescript compiler
      validate(mocqConfig)
    } catch (e: unknown) {
      expect(getErrorMessage(e)).toBe(`${emphasisErrorText('node')} connection key ${emphasisErrorText('elements')} must return an object`)
    }
  })
})

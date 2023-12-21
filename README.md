# 🧪 mocq

a framework for mock data creation, connection & execution coordination

>  for test scaffolding, mock data generation, database loads, etc.

## Install

### npm

```bash
npm i --save-dev mocq
```

### yarn

```bash
yarn add --dev mocq
```

### bun

```bash
bun add --dev mocq
```

## Basic Concepts

There's no getting around it, your data is going to have relationships.

> `mocq` aims to make those relationships more manageable and extendable when creating and extending test scaffolding. Simply define how to make your `Data Types`, how they connect & what to do with the data once its generated. `mocq` will determine the wholistic execution order so from a DX perspective you are only concerned with a given `Data Type` and it's immediate parents in any context.

first you'll need to encapsulate your data into some `Data Types`
 
> you've probably already made these decisions somewhere along the way, typescript types, maybe your sql tables if you're in that world or graphql types or graph nodes anything works

`mocq` takes a config object where each `Data Type` corresponds to a key you define

```ts
{
  myFirstDataType: { ... },
  mySecondDataType: { ... }
}
```

from this point on you will be considering each of these `Data Types` in isolation

your role per `Data Type`:
- provide [generator](#generator) function that create a single instance of a `Data Type`
- provide the number of instances desired as [count](#count)
- provide optional [connection](#connection) functions that hook into other `Data Types` in your config (from any given `Data Type`, you are only concerned with the immediate parent)
- provide optional [handler](#handler) functions to do something with the generated data (write to db, execute api call, etc.)

`mocq`'s role
- validate configuration
- determine wholistic execution order
  - will throw error if cyclic connections are detected
- return _sync function_ `generate` that generates data
- return _async function_ `execute` that generates data and executes handler functions


### Configuration

```ts
import { mocq } from 'mocq'

const myCustomConfig = {
  myCustomKey: {
    generator: // a function to create a myCustomKey node
    count: // the number of myCustomKey nodes wanted
    connections?: // ability to hook into generated data from other keys in config
    handler?: // ability to execute async functions against myCustomKey data
  },
  myCustomKey2: { ... },
  ...
}

const { generate, execute } = mocq(myCustomConfig)
```

### Generator

a _function_ that creates a single instance of a data key type
> it will be passed an index number, use if you need uniqueness

```ts
(i: number) => ({index:i})
```

this is whatever you want it to be so you can use popular mocking libraries like [faker-js](https://www.npmjs.com/package/@faker-js/faker) and [zod-mock](https://www.npmjs.com/package/@anatine/zod-mock) to  create your mock data

> hint: adding a return type to this function will improve intellisense on result

### Count

the _number_ of data key nodes to be created

### Connections

optional _key-function pairs_ that hook into other data keys in your config 
> from any given data type, you are only concerned with the immediate parent lightening the mental relationship load

for example we have 2 types `User` and `Node`

```ts
type User = {
  id: string
  name: name
}
type Node = {
  value: any
  createdBy: string
}
```
while generating my mock data I want `Node` type `createdBy` field to be populated with some user id from the users I just created
```ts
const userCreatedNodeConnection = (i: number: data: User[]): Partial<Node> => {
  return {
    createdBy: data[Math.floor(Math.random() * data.length)].id
    }
}
const config = {
  users: {
    generator: userGenerator,
    count: 25,
  },
  nodes: {
    generator: nodeGenerator,
    count: 100,
    connections: {
      users: userCreatedNodeConnection
    }
  }
}
```
here I am just grabbing a random `id` and assigning

> notice how the key name in connections `users` matches the top level `users`

### Handler

optional _async function_ to be run against generated & connected data when invoking the `execute` function

> use to write to db, execute api call, etc.

```ts
const config = {
  users: {
    generator: userGenerator,
    count: 25,
    handler: async (data: User[]) => ({ await write(data)}) 
  },
}
```

## Example

checkout this [example](https://github.com/nxzq/mocq/blob/main/example/sql-data-load.ts) using faker-js

## Strict Type Checking (TypeScript)

`mocq` will attempt to infer a key's type based on the return type of the generator function, however for the most robust type checking type your config as follows.

```ts
import { mocq, MocQ } = 'mocq'

type myConfigType = {
  users: MocQ<UserType>
  nodes: MocQ<NodeType>
}

const myConfig<myConfigType> = {
  users: { ... },
  nodes: { ... }
}

const { generate, execute } = mocq(myConfig)
```

## Debugging

when debugging turn on the `MOCQ_VERBOSE` env variable for verbose logs and insights on what's happening

```bash
[mocq] validating config and determining execution order...
[mocq] [validating configuration] users
[mocq] [validating configuration] tags
[mocq] [evaluating connection] users ➜ tags
[mocq] [validating configuration] elements
[mocq] [evaluating connection] users ➜ elements
[mocq] [evaluating connection] tags ➜ elements
[mocq] config valid, execution order set ✅
        ↳ users ➜ tags ➜ elements
[mocq] data generation init...
[mocq] [generating mock data] users
[mocq] [generating mock data] tags
[mocq] [connecting mock data] users ➜ tags
[mocq] [generating mock data] elements
[mocq] [connecting mock data] users ➜ elements
[mocq] [connecting mock data] tags ➜ elements
[mocq] data execution init...
[mocq] [executing mock data handler] tags
[mocq] [executing mock data handler] elements
[mocq] data execution complete ✅
```

### .env file

```bash
export MOCQ_VERBOSE=true
```

### inline code

```ts
process.env.MOCQ_VERBOSE = 'true'
```

### inline cli

```bash
MOCQ_VERBOSE=true npm run test
```
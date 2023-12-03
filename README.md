# mocq 🇫🇷

> overall this is doing what i want it to do but im not convinced i can get the typescript to hum with the current interface (`src/types.ts`), it would have to infer the type of the action based on the generator, then infer the types of the connections based on the previous actions in the array, also inside `src/workflow.ts` im not sure if i can build up that object during run time and keep it type safe

<!-- 

thoughts & questions:

- I think `workflow` might be an overloaded concept (coordination of data generation & connections AND post execution? however i also think it kinda has to be that way as its the whole point of this and maybe its only workflow (i.e. workflow goes away, mocq is the workflow and generator is a helper export))

- i don't love the data source implementation, i want it to be wide open and for people to easily use whatever they are already using (faker/zod/static), however i feel like its a bit heavy

- one thought is high lvl data model then `scopes` that augment 
that data into some new form (so like x and then dbLoadx, apiQueryx, etc.) 

not really sure how to to make it a good experience to pass in a common model and then select data off that model (generating the minimum)

- props flat or always {} (flat would allow restParams for something like overrides `(whatever, ...overrides)`)

- in general not sure on the api, are these key names everywhere a good experience

- lifecycle hooks for workflows? pre and post?

- do we need a way to ensure certain keys are unique when generating data (could just pass them the index so they could do the old `faker.string (index)` if they need that)

-->

define `generators` for your unique data types then use `workflows` to stitch together your various mock data types satisfying your relationship requirements.

Possible Workflow Use Cases:
- create a test env database load
- create reliable and properly connected unit test mock data
- generate varied query params for a robust api load test

## Concepts

consider this basic sql diagram

![](https://i.stack.imgur.com/96pFU.png)

`DutyRoster` has relationships (in this case foreign key but really the type is irrelevant) to `Event`, `EventDuty` & `Staff`.

> `mocq` allows you to create `generators` for all the various tables data structures. 
>
> then create a `workflow` that injects the various IDs from generated `Event`, `EventDuty` & `Staff` mock data into generated `DutyRoster` mock data.
>
> resulting in coherent and properly stitched together mock data.

## Getting Started

1st install dependencies from the root repo

```bash
bun install
```

then checkout the `/example` folder for an example psuedo random db load

```bash
cd example
```

to execute run

```bash
bun run example:sql
```

if you want more look at `src/index.test.ts`

```bash
bun test --coverage
```

## API

### createGenerator

a `generator` is a basic structured way to generate an array of data.

```js
import { mocq } from 'mocq';
import { faker } from '@faker-js/faker'

const myDataSource = {
  id: () => faker.string.uuid(),
  first_name: () => faker.person.firstName(),
  last_name: () => faker.person.lastName()
}

const { generate: generateMyData} = mocq.createGenerator(myDataSource)
```

#### Generate

the `generate` function returned from a generator can then be invoked on demand.

```js
  const data = generateMyData()
  console.log(data)
  // [
  //   {
  //     id: "394a9daf-8cae-4ad2-9f84-b2c00eca5862",
  //     first_name: "Desmond",
  //     last_name: "Bauch"
  //   }
  // ]
```

##### Parameters

| Name      | Type | Default      | Description |
| ----------- | ----------- |----------- | ----------- |
| count      | `number`       | 1      | determine number of data elements to be generated       |
| overrides   | `{ [K in keyof T]: () => any }`        | {}   | apply overrides to keys in data source        |

### createWorkflow

a `workflow` allows you to coordinate the creation of numerous data types and create connections between between that data.

#### Execute
##### Parameters
#### Actions
##### Parameters
##### Connections
###### Parameters
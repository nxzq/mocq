import { mocquer } from "mocquer";
import { faker } from "@faker-js/faker";

// in this example we are creating a workflow to load a library sql database

type Publisher = {
  id: string
  name: string
}

const publisherDataSource = {
  id: faker.string.uuid,
  name: faker.company.name
}

type Author = {
  id: string
  first_name: string
  last_name: string
}

const authorDataSource = {
  id: faker.string.uuid,
  first_name: faker.person.firstName,
  last_name: faker.person.lastName
}

type Book = {
  id: string
  publisher_id: string
  author_id: string
  name: string
}

const bookDataSource = {
  id: faker.string.uuid,
  publisher_id: faker.string.uuid,
  author_id: faker.string.uuid,
  name: faker.company.buzzPhrase
}

const publisherGenerator = mocquer.createGenerator(publisherDataSource)
const authorGenerator = mocquer.createGenerator(authorDataSource)
const bookGenerator = mocquer.createGenerator(bookDataSource)

const dbLoad = mocquer.createWorkflow({
  preHandler: () => console.log(`CREATE TABLE publisher (id char, name char);\nCREATE TABLE author (id char, first_name char, last_name char);\nCREATE TABLE book (id char, name char, author_id char, publisher_id char);`),
  actions: [
    {
      name: 'publishers',
      generator: publisherGenerator,
      count: 3,
      handler: {
        execType: 'iterate',
        callback: (data: Publisher) => {
          console.log(`INSERT INTO publisher VALUES ('${data.id}', '${data.name}');`)
        },
      },
    },
    {
      name: 'authors',
      generator: authorGenerator,
      count: 5,
      handler: {
        execType: 'iterate',
        callback: (data: Author) => {
          console.log(`INSERT INTO author VALUES ('${data.id}', '${data.first_name}', '${data.last_name}');`)
        },
      },
    },
    {
      name: 'books',
      generator: bookGenerator,
      count: 15,
      handler: {
        execType: 'batch',
        callback: (data: Book[]) => console.log('(book count: ',data.length,')\n','sample book data: ',data[0]),
      },
      connections: [
        {
          actionName: 'publishers',
          callback: (data: Publisher[])=>({ publisher_id: () => faker.helpers.arrayElement(data).id }),
        },
        {
          actionName: 'authors',
          callback: (data: Author[])=>({ author_id: () => faker.helpers.arrayElement(data).id }),
        }
      ]
    }
  ],
  postHandler: () => console.log("done ✅"),
})

const { data } = dbLoad.execute()

// console.log('🧪: ', data)
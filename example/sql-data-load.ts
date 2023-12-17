import { mocq, MocQ } from "mocq";
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
  first_name: () => faker.person.firstName(),
  last_name: () => faker.person.lastName()
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

// mocq config
const dbLoad = {
  publishers: {
    generator: publisherDataSource,
    count: 3,
    handler: (data: Publisher[]) => {
      data.forEach(x => console.log(`INSERT INTO publisher VALUES ('${x.id}', '${x.name}');`))
    },
  } as MocQ<Publisher>,
  authors: {
    generator: authorDataSource,
    count: 5,
    handler: (data: Author[]) => {
        data.forEach(x => console.log(`INSERT INTO author VALUES ('${x.id}', '${x.first_name}', '${x.last_name}');`))
    },
  } as MocQ<Author>,
  books: {
    generator: bookDataSource,
    count: 15,
    connections: {
      publishers: (data: Publisher[])=>({ publisher_id: () => faker.helpers.arrayElement(data).id }),
      authors: (data: Author[])=>({ author_id: () => faker.helpers.arrayElement(data).id }),
    },
    handler: (data: Book[]) => console.log('(book count: ',data.length,')\n','sample book data: ',data[0])
  } as MocQ<Book>,
}

console.log('------- load db ---------')
// pre load step
console.log(`CREATE TABLE publisher (id char, name char);\nCREATE TABLE author (id char, first_name char, last_name char);\nCREATE TABLE book (id char, name char, author_id char, publisher_id char);`)
// mocq executed
const { data: { publishers, authors, books }} = await mocq(dbLoad).execute()
// post load step
console.log("done ✅")
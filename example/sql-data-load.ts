import { mocq, MocQ } from "mocq"
import { faker } from "@faker-js/faker"

// in this example we are creating a workflow to load a library sql database


/*
  in this example we will be logging the sql however usually you'll write to a database
  when doing so you'll likely want to maintain the same db connection/transaction to reduce overhead
*/

type DbConnection = {
  write: (...message: any[]) => void
  close: () => void
}

const getDbConnection = (): DbConnection => {
  return {
    write(...message: any[]) {
      console.log('\x1b[1;34m[SQL]\x1b[0m', ...message)
    },
    close() {
      console.log('\x1b[1;34m[SQL] connection closed ✅\x1b[0m')
    }
  }
}

/* 
  here are the types we will be dealing with,
  as you can see book will be connected to both publisher and author by an ID
*/ 

type Publisher = {
  id: string
  name: string
}

type Author = {
  id: string
  first_name: string
  last_name: string
}

type Book = {
  id: string
  publisher_id: string
  author_id: string
  name: string
}

/*
  data generator functions utilizing faker
  as uuid are our unique key we don't need to worry about index's
*/

const generateMockPublisher = (): Publisher => ({
  id: faker.string.uuid(),
  name: faker.company.name()
})

const generateMockAuthor = (): Author => ({
  id: faker.string.uuid(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName()
})

const generateMockBook = (): Book => ({
  id: faker.string.uuid(),
  publisher_id: faker.string.uuid(),
  author_id: faker.string.uuid(),
  name: faker.company.buzzPhrase()
})

/*
  we wrap our mocq usage in a function in order to preserve the
  database connection reducing overhead
*/ 
const dbLoad = async (dbConnection: DbConnection) => {

  // mocq config type for strict type check
  type DbLoadConfig = {
    publishers: MocQ<Publisher>
    authors: MocQ<Author>
    books: MocQ<Book>
  }

  // mocq config
  const dbLoadConfig: DbLoadConfig = {
    publishers: {
      generator: generateMockPublisher,
      count: 3,
      handler: (data: Publisher[]) => {
        data.forEach(x => dbConnection.write(`INSERT INTO publisher VALUES ('${x.id}', '${x.name}');`))
      },
    },
    authors: {
      generator: generateMockAuthor,
      count: 5,
      handler: (data: Author[]) => {
        data.forEach(x => dbConnection.write(`INSERT INTO author VALUES ('${x.id}', '${x.first_name}', '${x.last_name}');`))
      },
    },
    books: {
      generator: generateMockBook,
      count: 10,
      connections: {
        // setting book publisher_id to an ID from a random publisher
        publishers: (i: number, data: Publisher[])=>({ publisher_id: faker.helpers.arrayElement(data).id }),
        // setting book author_id to an ID from a random author
        authors: (i: number, data: Author[])=>({ author_id: faker.helpers.arrayElement(data).id }),
      },
      handler: (data: Book[]) => {
        data.forEach(x => dbConnection.write(`INSERT INTO books VALUES ('${x.id}', '${x.name}', '${x.publisher_id}', '${x.author_id}');`))
      }
    },
  }
  const { execute } = mocq(dbLoadConfig)
  return execute()
}

/* database load */
const loadDataBaseWithPseudoRandomData = async () => {
  // pre load step
  const dbConnection = getDbConnection();
  dbConnection.write(`CREATE TABLE publishers (id char, name char);`)
  dbConnection.write(`CREATE TABLE authors (id char, first_name char, last_name char);`)
  dbConnection.write(`CREATE TABLE books (id char, name char, author_id char, publisher_id char);`)
  // mocq executed
  const { data: { publishers, authors, books }} = await dbLoad(dbConnection)
  console.log(publishers[0])
  console.log(authors[0])
  console.log(books[0])
  // post load step
  dbConnection.close()
}

await loadDataBaseWithPseudoRandomData()

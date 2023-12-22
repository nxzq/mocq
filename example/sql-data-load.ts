import { mocq, MocQ } from "mocq";
import { faker } from "@faker-js/faker";

// in this example we are creating a workflow to load a library sql database


// in this example we will be logging the sql however usually you'll write to a database
// when doing so you'll likely want to maintain the same db connection/transaction to 
// reduce overhead, you can achieve this with the singleton pattern like done below with logger
// https://voskan.host/2023/04/01/the-singleton-pattern-in-javascript/

class Logger {
  static instance: any;
  private logs: any[] = [];
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    this.logs = [];
    Logger.instance = this;
  }
  log(...message: any[]) {
    this.logs.push(message);
    console.log('sql-logger: ', ...message);
  }
}

// here are the types we will be dealing with, as you can see book will be connected
// to both publisher and author by an ID

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

// data generator functions utilizing faker

const publisherDataSource = (): Publisher => ({
  id: faker.string.uuid(),
  name: faker.company.name()
})

const authorDataSource = (): Author => ({
  id: faker.string.uuid(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName()
})

const bookDataSource = (): Book => ({
  id: faker.string.uuid(),
  publisher_id: faker.string.uuid(),
  author_id: faker.string.uuid(),
  name: faker.company.buzzPhrase()
})

// mocq config type for strict type check

type DbLoadConfig = {
  publishers: MocQ<Publisher>
  authors: MocQ<Author>
  books: MocQ<Book>
}

// mocq config
const dbLoad: DbLoadConfig = {
  publishers: {
    generator: publisherDataSource,
    count: 3,
    handler: (data: Publisher[]) => {
      const logger = new Logger();
      data.forEach(x => logger.log(`INSERT INTO publisher VALUES ('${x.id}', '${x.name}');`))
    },
  },
  authors: {
    generator: authorDataSource,
    count: 5,
    handler: (data: Author[]) => {
      const logger = new Logger();
      data.forEach(x => logger.log(`INSERT INTO author VALUES ('${x.id}', '${x.first_name}', '${x.last_name}');`))
    },
  },
  books: {
    generator: bookDataSource,
    count: 15,
    connections: {
      // setting book publisher_id to an ID from a random publisher
      publishers: (i: number, data: Publisher[])=>({ publisher_id: faker.helpers.arrayElement(data).id }),
      // setting book author_id to an ID from a random author
      authors: (i: number, data: Author[])=>({ author_id: faker.helpers.arrayElement(data).id }),
    },
    handler: (data: Book[]) => {
      const logger = new Logger();
      logger.log('(book count: ',data.length,')\n','sample book data: ',data[0])
    }
  },
}

const { execute: loadDB } = mocq(dbLoad)
const logger = new Logger();

/* database load */

// pre load step
logger.log(`CREATE TABLE publisher (id char, name char);\nCREATE TABLE author (id char, first_name char, last_name char);\nCREATE TABLE book (id char, name char, author_id char, publisher_id char);`)
// mocq executed
const { data: { publishers, authors, books }} = await loadDB()
// post load step
logger.log("done ✅")
import { mocq } from "mocq"
import { faker } from "@faker-js/faker"

const fakerUserGenerator = () => ({
  id: faker.string.uuid(),
  first_name: faker.person.firstName(),
  last_name: faker.person.lastName(),
  company: faker.company.name()
})

const { generate } = mocq({
  users: {
    generator: fakerUserGenerator,
    count: 100,
  }
})

const { data: { users } } = generate()

users.map(x => console.table(x))

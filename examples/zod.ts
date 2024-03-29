import { MocQ, mocq } from 'mocq'
import { z } from 'zod'
import { generateMock } from '@anatine/zod-mock'

const schema = z.object({
  uid: z.string(),
  theme: z.enum([ 'light', 'dark' ]),
  email: z.string().email().optional(),
  phoneNumber: z.string().min(10).optional(),
  avatar: z.string().url().optional(),
  jobTitle: z.string().optional(),
  otherUserEmails: z.array(z.string().email()),
  stringArrays: z.array(z.string()),
  stringLength: z.string().transform((val) => val.length),
  numberCount: z.number().transform((item) => `total value = ${item}`),
  age: z.number().min(18).max(120),
})

type Type = z.infer<typeof schema>

const { generate } = mocq({
  mocks: {
    generator: () => generateMock(schema),
    count: 100,
  } as MocQ<Type>
})

const { data: { mocks } } = generate()

mocks.map(x => console.table(x))

import { mocq } from "mocq"
import jsonData from './data.json'

const { generate } = mocq({
  nodes: {
    generator: (i: number) => jsonData[i],
    count: jsonData.length,
  }
})

const { data: { nodes } } = generate()

nodes.map(x => console.table(x))

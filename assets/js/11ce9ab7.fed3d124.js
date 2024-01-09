"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[249],{9152:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>b,contentTitle:()=>h,default:()=>p,frontMatter:()=>l,metadata:()=>u,toc:()=>g});var t=a(4246),o=a(1670),r=a(8948),i=a(6925),s=a(3930),c=a(9798),d=a(2536);const l={sidebar_position:2,title:"Database Load",description:"use mocq to create a database load function"},h=void 0,u={id:"examples/database-load",title:"Database Load",description:"use mocq to create a database load function",source:"@site/docs/examples/database-load.mdx",sourceDirName:"examples",slug:"/examples/database-load",permalink:"/mocq/docs/examples/database-load",draft:!1,unlisted:!1,editUrl:"https://github.com/nxzq/mocq/tree/main/website/docs/examples/database-load.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,title:"Database Load",description:"use mocq to create a database load function"},sidebar:"docsSidebar",previous:{title:"Basic Usage",permalink:"/mocq/docs/examples/basic-usage"},next:{title:"Usage with faker-js",permalink:"/mocq/docs/examples/faker"}},b={},g=[{value:"Getting Started",id:"getting-started",level:2},{value:"Configuring Data",id:"configuring-data",level:2},{value:"Database Load Function",id:"database-load-function",level:2}];function f(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...(0,o.a)(),...e.components},{Details:a}=n;return a||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h2,{id:"getting-started",children:"Getting Started"}),"\n","\n",(0,t.jsx)(i.Z,{alt:"SQL Diagram",style:{aspectRatio:"3 / 1"},sources:{light:(0,r.Z)("/img/mocq-sql.png"),dark:(0,r.Z)("/img/mocq-sql-dark.png")}}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:["this example will be using SQL however the ",(0,t.jsx)(n.strong,{children:"DB language is irrelevant"}),", all DB loads will follow this same pattern"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["For this example we will assume a ",(0,t.jsx)(n.code,{children:"Book"})," always has one ",(0,t.jsx)(n.code,{children:"Publisher"})," and one ",(0,t.jsx)(n.code,{children:"Author"})]}),"\n",(0,t.jsxs)(n.p,{children:["We will be generating mock data utilizing ",(0,t.jsx)(n.a,{href:"/docs/examples/faker",children:"faker-js"})," and writing the generated data to a database"]}),"\n",(0,t.jsx)(n.h2,{id:"configuring-data",children:"Configuring Data"}),"\n",(0,t.jsxs)(n.p,{children:["In this example we have three types ",(0,t.jsx)(n.code,{children:"Publisher"}),", ",(0,t.jsx)(n.code,{children:"Author"})," and ",(0,t.jsx)(n.code,{children:"Book"})]}),"\n","\n","\n",(0,t.jsxs)(s.Z,{groupId:"code-block-language",children:[(0,t.jsx)(c.Z,{value:"js",label:"JavaScript",children:(0,t.jsx)(d.Z,{language:"ts",children:"type Publisher = {\n  id: string\n  name: string\n}\ntype Author = {\n  id: string\n  first_name: string\n  last_name: string\n}\ntype Book = {\n  id: string\n  publisher_id: string\n  author_id: string\n  name: string\n}"})}),(0,t.jsx)(c.Z,{value:"ts",label:"TypeScript",children:(0,t.jsx)(d.Z,{language:"ts",title:"/types.ts",showLineNumbers:!0,children:"export type Publisher = {\n  id: string\n  name: string\n}\nexport type Author = {\n  id: string\n  first_name: string\n  last_name: string\n}\nexport type Book = {\n  id: string\n  publisher_id: string\n  author_id: string\n  name: string\n}"})})]}),"\n",(0,t.jsxs)(n.p,{children:["Here are our data generators utilizing ",(0,t.jsx)(n.a,{href:"/docs/examples/faker",children:"faker-js"})]}),"\n",(0,t.jsxs)(s.Z,{groupId:"code-block-language",children:[(0,t.jsx)(c.Z,{value:"js",label:"JavaScript",children:(0,t.jsx)(d.Z,{language:"js",title:"/generators.js",showLineNumbers:!0,children:'import { faker } from "@faker-js/faker";\n  \nexport const generateMockPublisher = () => ({\n  id: faker.string.uuid(),\n  name: faker.company.name()\n});\n\nexport const generateMockAuthor = () => ({\n  id: faker.string.uuid(),\n  first_name: faker.person.firstName(),\n  last_name: faker.person.lastName()\n});\n\nexport const generateMockBook = () => ({\n  id: faker.string.uuid(),\n  publisher_id: faker.string.uuid(),\n  author_id: faker.string.uuid(),\n  name: faker.company.buzzPhrase()\n});'})}),(0,t.jsx)(c.Z,{value:"ts",label:"TypeScript",children:(0,t.jsx)(d.Z,{language:"ts",title:"/generators.ts",showLineNumbers:!0,children:'import { faker } from "@faker-js/faker";\n  \nexport function generateMockPublisher(): Publisher {\n  return {\n    id: faker.string.uuid(),\n    name: faker.company.name(),\n  };\n};\n\nexport function generateMockAuthor(): Author {\n  return {\n    id: faker.string.uuid(),\n    first_name: faker.person.firstName(),\n    last_name: faker.person.lastName(),\n  };\n};\n\nexport function generateMockBook(): Book {\n  return {\n    id: faker.string.uuid(),\n    publisher_id: faker.string.uuid(),\n    author_id: faker.string.uuid(),\n    name: faker.company.buzzPhrase(),\n  };\n};'})})]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"[mocq]"})," configuration"]}),"\n",(0,t.jsxs)(s.Z,{groupId:"code-block-language",children:[(0,t.jsx)(c.Z,{value:"js",label:"JavaScript",children:(0,t.jsx)(d.Z,{language:"js",title:"/index.js",showLineNumbers:!0,children:"import { mocq } from 'mocq';\nimport { faker } from \"@faker-js/faker\";\nimport { generateMockPublisher, generateMockAuthor, generateMockBook } from './generators';\n\nconst config = {\n  publishers: {\n    generator: generateMockPublisher,\n    count: 3,\n  },\n  authors: {\n    generator: generateMockAuthor,\n    count: 5,\n  },\n  books: {\n    generator: generateMockBook,\n    count: 10,\n    connections: {\n      // setting book publisher_id to an ID from a random publisher\n      publishers: (i, publishers)=>({ publisher_id: faker.helpers.arrayElement(publishers).id }),\n      // setting book author_id to an ID from a random author\n      authors: (i, authors)=>({ author_id: faker.helpers.arrayElement(authors).id }),\n    },\n  },\n};\n\nconst { generate } = mocq(config);\n\nconst { data: { publishers, authors, books } } = generate();"})}),(0,t.jsx)(c.Z,{value:"ts",label:"TypeScript",children:(0,t.jsx)(d.Z,{language:"ts",title:"/index.ts",showLineNumbers:!0,children:"import { mocq, MocQ } from 'mocq';\nimport { faker } from \"@faker-js/faker\";\nimport { Publisher, Author, Book } from './types';\nimport { generateMockPublisher, generateMockAuthor, generateMockBook } from './generators';\n\n// create a custom config type for strict type checking\ntype customMocqConfig: {\n  publishers: MocQ<Publisher>\n  authors: MocQ<Author>\n  books: MocQ<Book>\n};\n\nconst config: customMocqConfig = {\n  publishers: {\n    generator: generateMockPublisher,\n    count: 3,\n  },\n  authors: {\n    generator: generateMockAuthor,\n    count: 5,\n  },\n  books: {\n    generator: generateMockBook,\n    count: 10,\n    connections: {\n      // setting book publisher_id to an ID from a random publisher\n      publishers: (i: number, data: Publisher[])=>({ publisher_id: faker.helpers.arrayElement(data).id }),\n      // setting book author_id to an ID from a random author\n      authors: (i: number, data: Author[])=>({ author_id: faker.helpers.arrayElement(data).id }),\n    },\n  },\n};\n\nconst { generate } = mocq(config);\n\nconst { data: { publishers, authors, books } } = generate();"})})]}),"\n",(0,t.jsxs)(a,{children:[(0,t.jsx)("summary",{children:(0,t.jsx)(n.p,{children:"Sample Resolved Data"})}),(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"publishers"}),":"]}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'[\n  {\n    id: "59ce7ec3-ec1b-4096-a4f2-0c0da5725a06",\n    name: "Upton - Kuhn"\n  },\n  // ... 2 more entries\n]\n'})}),(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"authors"}),":"]}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'[\n  {\n    id: "dbaa0570-536b-4254-b1d3-f975ef1f4400",\n    first_name: "Russell",\n    last_name: "Zboncak"\n  },\n  // ... 4 more entries\n]\n'})}),(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"books"}),":"]}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-js",children:'[\n  {\n    id: "a24be51e-1a3e-4959-bb8e-9cf6ca5e3c30",\n    publisher_id: "59ce7ec3-ec1b-4096-a4f2-0c0da5725a06",\n    author_id: "dbaa0570-536b-4254-b1d3-f975ef1f4400",\n    name: "engage value-added architectures"\n  }\n  // ... 9 more entries\n]\n'})})]}),"\n",(0,t.jsx)(n.h2,{id:"database-load-function",children:"Database Load Function"}),"\n",(0,t.jsx)(n.p,{children:"When working with a database it is convention to keep the database connection open and reuse it to reduce overhead"}),"\n",(0,t.jsxs)(n.admonition,{type:"note",children:[(0,t.jsxs)(n.p,{children:["In this example we will just be logging the SQL but this ",(0,t.jsx)(n.code,{children:"getDbConnection"})," function is meant to represent your db language\nof choice connection or transaction function"]}),(0,t.jsxs)(s.Z,{groupId:"code-block-language",children:[(0,t.jsx)(c.Z,{value:"js",label:"JavaScript",children:(0,t.jsx)(d.Z,{language:"ts",title:"/database.js",showLineNumbers:!0,children:"export const getDbConnection = () => {\n  return {\n    write(...message: any[]) {\n      console.log('[SQL]', ...message)\n    },\n    close() {\n      console.log('[SQL] connection closed \u2705')\n    },\n  };\n};"})}),(0,t.jsx)(c.Z,{value:"ts",label:"TypeScript",children:(0,t.jsx)(d.Z,{language:"ts",title:"/database.ts",showLineNumbers:!0,children:"export type DbConnection = {\n  write: (...message: any[]) => void\n  close: () => void\n};\n\nexport function getDbConnection(): DbConnection {\n  return {\n    write(...message: any[]) {\n      console.log('[SQL]', ...message)\n    },\n    close() {\n      console.log('[SQL] connection closed \u2705')\n    },\n  };\n};"})})]})]}),"\n",(0,t.jsxs)(n.p,{children:["We'll create a Database Load Function that handles pre and post steps and wrap\nour ",(0,t.jsx)(n.code,{children:"[mocq]"})," configuration in a function that accepts the database connection"]}),"\n",(0,t.jsxs)(s.Z,{groupId:"code-block-language",children:[(0,t.jsx)(c.Z,{value:"js",label:"JavaScript",children:(0,t.jsx)(d.Z,{language:"js",title:"/index.js",showLineNumbers:!0,children:"import { mocq } from 'mocq';\nimport { faker } from \"@faker-js/faker\";\nimport { generateMockPublisher, generateMockAuthor, generateMockBook } from './generators';\nimport { getDbConnection } from './database'\n\n// highlight-start\n/*\n  we wrap our mocq usage in a function in order to preserve the\n  database connection reducing overhead\n*/ \n// highlight-end\nconst seedMockData = async (dbConnection) => {\n  const config = {\n    publishers: {\n      generator: generateMockPublisher,\n      count: 3,\n      // highlight-start\n      handler: (publishers) => {\n        publishers.forEach(x => dbConnection.write(`INSERT INTO publisher VALUES ('${x.id}', '${x.name}');`));\n      },\n      // highlight-end\n    },\n    authors: {\n      generator: generateMockAuthor,\n      count: 5,\n      // highlight-start\n      handler: (authors) => {\n        authors.forEach(x => dbConnection.write(`INSERT INTO author VALUES ('${x.id}', '${x.first_name}', '${x.last_name}');`));\n      },\n      // highlight-end\n    },\n    books: {\n      generator: generateMockBook,\n      count: 10,\n      connections: {\n        publishers: (i, publishers)=>({ publisher_id: faker.helpers.arrayElement(publishers).id }),\n        authors: (i, authors)=>({ author_id: faker.helpers.arrayElement(authors).id }),\n      },\n      // highlight-start\n      handler: (books) => {\n        books.forEach(x => dbConnection.write(`INSERT INTO books VALUES ('${x.id}', '${x.name}', '${x.publisher_id}', '${x.author_id}');`));\n      },\n      // highlight-end\n    },\n  };\n\n  const { execute } = mocq(config);\n  return execute()\n};\n\n// highlight-next-line\n/* database load \u0192(x) */\nconst loadDataBaseWithPseudoRandomData = async () => {\n  // highlight-next-line\n  // pre load step\n  const dbConnection = getDbConnection();\n  dbConnection.write('CREATE TABLE publishers (id char, name char);');\n  dbConnection.write('CREATE TABLE authors (id char, first_name char, last_name char);');\n  dbConnection.write('CREATE TABLE books (id char, name char, author_id char, publisher_id char);');\n  // highlight-next-line\n  // mocq executed\n  const { data: { publishers, authors, books }} = await seedMockData(dbConnection);\n  // highlight-next-line\n  // post load step\n  dbConnection.close();\n};\n\nawait loadDataBaseWithPseudoRandomData();"})}),(0,t.jsx)(c.Z,{value:"ts",label:"TypeScript",children:(0,t.jsx)(d.Z,{language:"ts",title:"/index.ts",showLineNumbers:!0,children:"import { mocq, MocQ } from 'mocq';\nimport { faker } from \"@faker-js/faker\";\nimport { Publisher, Author, Book } from './types';\nimport { generateMockPublisher, generateMockAuthor, generateMockBook } from './generators';\nimport { getDbConnection, DbConnection } from './database'\n\n// create a custom config type for strict type checking\ntype customMocqConfig: {\n  publishers: MocQ<Publisher>\n  authors: MocQ<Author>\n  books: MocQ<Book>\n};\n\n// highlight-start\n/*\n  we wrap our mocq usage in a function in order to preserve the\n  database connection reducing overhead\n*/ \n// highlight-end\nasync function seedMockData(dbConnection: DbConnection) {\n  const config: customMocqConfig = {\n    publishers: {\n      generator: generateMockPublisher,\n      count: 3,\n      // highlight-start\n      handler: (data: Publisher[]) => {\n        data.forEach(x => dbConnection.write(`INSERT INTO publisher VALUES ('${x.id}', '${x.name}');`));\n      },\n      // highlight-end\n    },\n    authors: {\n      generator: generateMockAuthor,\n      count: 5,\n      // highlight-start\n      handler: (data: Author[]) => {\n        data.forEach(x => dbConnection.write(`INSERT INTO author VALUES ('${x.id}', '${x.first_name}', '${x.last_name}');`));\n      },\n      // highlight-end\n    },\n    books: {\n      generator: generateMockBook,\n      count: 10,\n      connections: {\n        publishers: (i: number, data: Publisher[])=>({ publisher_id: faker.helpers.arrayElement(data).id }),\n        authors: (i: number, data: Author[])=>({ author_id: faker.helpers.arrayElement(data).id }),\n      },\n      // highlight-start\n      handler: (data: Book[]) => {\n        data.forEach(x => dbConnection.write(`INSERT INTO books VALUES ('${x.id}', '${x.name}', '${x.publisher_id}', '${x.author_id}');`));\n      },\n      // highlight-end\n    },\n  };\n\n  const { execute } = mocq(config);\n  return execute()\n};\n\n// highlight-next-line\n/* database load \u0192(x) */\nasync function loadDataBaseWithPseudoRandomData() {\n  // highlight-next-line\n  // pre load step\n  const dbConnection = getDbConnection();\n  dbConnection.write('CREATE TABLE publishers (id char, name char);');\n  dbConnection.write('CREATE TABLE authors (id char, first_name char, last_name char);');\n  dbConnection.write('CREATE TABLE books (id char, name char, author_id char, publisher_id char);');\n  // highlight-next-line\n  // mocq executed\n  const { data: { publishers, authors, books }} = await seedMockData(dbConnection);\n  // highlight-next-line\n  // post load step\n  dbConnection.close();\n};\n\nawait loadDataBaseWithPseudoRandomData();"})})]}),"\n",(0,t.jsxs)(a,{children:[(0,t.jsx)("summary",{children:(0,t.jsx)(n.p,{children:"Sample Output"})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sql",children:"[SQL] CREATE TABLE publishers (id char, name char);\n[SQL] CREATE TABLE authors (id char, first_name char, last_name char);\n[SQL] CREATE TABLE books (id char, name char, author_id char, publisher_id char);\n[SQL] INSERT INTO publisher VALUES ('54b1d77c-5c7a-45b1-a59a-da56afec3ab7', 'Schultz - Cassin');\n[SQL] INSERT INTO publisher VALUES ('b854fe7f-d26f-47f3-83be-ce6b03be844f', 'Carter Group');\n[SQL] INSERT INTO publisher VALUES ('40bb1f15-f01e-42a9-834a-b9ae28dc655d', 'Rath and Sons');\n[SQL] INSERT INTO author VALUES ('e72766ee-bb85-4f5d-8986-f0d632416468', 'Deven', 'Williamson');\n[SQL] INSERT INTO author VALUES ('5db435c7-d092-4676-bc69-bc10c8618938', 'Korbin', 'Abshire');\n[SQL] INSERT INTO author VALUES ('b9a4708b-e82b-467e-b1fa-245c9f9174b3', 'Stan', 'Hudson');\n[SQL] INSERT INTO author VALUES ('e9d6035a-8cc6-437d-a860-51b1800855ef', 'Pete', 'Larkin');\n[SQL] INSERT INTO author VALUES ('15c665ea-6ae1-4ae5-91aa-58d66aeade86', 'Damaris', 'Swift');\n[SQL] INSERT INTO books VALUES ('04be8162-b5cf-41f3-baae-c2211745b974', 'maximize integrated deliverables', '40bb1f15-f01e-42a9-834a-b9ae28dc655d', 'e72766ee-bb85-4f5d-8986-f0d632416468');\n[SQL] INSERT INTO books VALUES ('b8b0f4e7-3d3d-471f-9064-fb6e71f3695c', 'evolve value-added applications', '40bb1f15-f01e-42a9-834a-b9ae28dc655d', 'e9d6035a-8cc6-437d-a860-51b1800855ef');\n[SQL] INSERT INTO books VALUES ('70bdd155-22fb-40b6-b6eb-2a9dd158ebf4', 'benchmark end-to-end partnerships', '40bb1f15-f01e-42a9-834a-b9ae28dc655d', 'e9d6035a-8cc6-437d-a860-51b1800855ef');\n[SQL] INSERT INTO books VALUES ('d918f05f-8ce0-408e-aebc-f00caa8c2fc0', 'e-enable strategic synergies', '40bb1f15-f01e-42a9-834a-b9ae28dc655d', '15c665ea-6ae1-4ae5-91aa-58d66aeade86');\n[SQL] INSERT INTO books VALUES ('bc6c70e9-97fa-4c03-906c-991524cf4ff0', 'grow front-end markets', 'b854fe7f-d26f-47f3-83be-ce6b03be844f', 'e9d6035a-8cc6-437d-a860-51b1800855ef');\n[SQL] INSERT INTO books VALUES ('be64e9c5-a4c8-4644-b83c-435b7f92a2f6', 'transition leading-edge networks', 'b854fe7f-d26f-47f3-83be-ce6b03be844f', 'e9d6035a-8cc6-437d-a860-51b1800855ef');\n[SQL] INSERT INTO books VALUES ('d9afdb08-77e2-44d1-bfc6-e57c94fdc5e8', 'whiteboard wireless interfaces', 'b854fe7f-d26f-47f3-83be-ce6b03be844f', '15c665ea-6ae1-4ae5-91aa-58d66aeade86');\n[SQL] INSERT INTO books VALUES ('1dc3ff59-2fc7-4f92-bcd8-e674b3d3a385', 'deliver strategic e-commerce', '54b1d77c-5c7a-45b1-a59a-da56afec3ab7', 'b9a4708b-e82b-467e-b1fa-245c9f9174b3');\n[SQL] INSERT INTO books VALUES ('3bd6c787-f977-415d-bbd7-a4cfd6ad5cd8', 'scale frictionless models', 'b854fe7f-d26f-47f3-83be-ce6b03be844f', '5db435c7-d092-4676-bc69-bc10c8618938');\n[SQL] INSERT INTO books VALUES ('c86b83d3-2e48-40af-8bee-f8fdda9ace82', 'disintermediate ubiquitous applications', '40bb1f15-f01e-42a9-834a-b9ae28dc655d', 'e9d6035a-8cc6-437d-a860-51b1800855ef');\n[SQL] connection closed \u2705\n"})})]})]})}function p(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(f,{...e})}):f(e)}}}]);
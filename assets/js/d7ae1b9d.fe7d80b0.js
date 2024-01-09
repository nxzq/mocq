"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[953],{7555:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>l,contentTitle:()=>c,default:()=>p,frontMatter:()=>r,metadata:()=>d,toc:()=>h});var n=a(4246),s=a(1670),i=a(3930),o=a(9798);const r={sidebar_position:4,title:"Usage with Static Data",description:"use static data as data seed"},c=void 0,d={id:"examples/static-data",title:"Usage with Static Data",description:"use static data as data seed",source:"@site/docs/examples/static-data.mdx",sourceDirName:"examples",slug:"/examples/static-data",permalink:"/mocq/docs/examples/static-data",draft:!1,unlisted:!1,editUrl:"https://github.com/nxzq/mocq/tree/main/website/docs/examples/static-data.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Usage with Static Data",description:"use static data as data seed"},sidebar:"docsSidebar",previous:{title:"Usage with faker-js",permalink:"/mocq/docs/examples/faker"},next:{title:"API",permalink:"/mocq/docs/api"}},l={},h=[];function m(e){const t={admonition:"admonition",code:"code",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.admonition,{title:"What if I already have my data?",type:"note",children:(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.code,{children:"Data already generated?"})," Simply have generator function map over exisiting ",(0,n.jsx)(t.code,{children:"Array"})," as shown below with ",(0,n.jsx)(t.code,{children:"JSON"})," data"]})}),"\n","\n","\n",(0,n.jsxs)(i.Z,{groupId:"code-block-language",children:[(0,n.jsx)(o.Z,{value:"js",label:"JavaScript",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"import { mocq } from \"mocq\";\n// highlight-next-line\nimport jsonData from './data.json';\n\nconst { generate } = mocq({\n  nodes: {\n    // highlight-start\n    generator: (i) => jsonData[i],\n    count: jsonData.length,\n    // highlight-end\n  }\n});\n\nconst { data: { nodes } } = generate();\n"})})}),(0,n.jsx)(o.Z,{value:"ts",label:"TypeScript",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",children:"import { mocq, MocQ } from \"mocq\";\n// highlight-next-line\nimport jsonData from './data.json';\n\ntype JsonDataType = {\n  id: number\n  name: string\n  type: string[]\n}\n\nconst { generate } = mocq({\n  nodes: {\n    // highlight-start\n    generator: (i: number) => jsonData[i],\n    count: jsonData.length,\n    // highlight-end\n  } as MocQ<JsonDataType>\n});\n\nconst { data: { nodes } } = generate();\n"})})})]})]})}function p(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(m,{...e})}):m(e)}}}]);
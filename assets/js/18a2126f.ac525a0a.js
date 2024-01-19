"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[662],{932:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>i,metadata:()=>u,toc:()=>d});var r=n(4246),a=n(1670),s=n(3930),o=n(9798);const i={sidebar_position:3,title:"Test Assertions in Handler",description:"run test assertions during handler execution"},l=void 0,u={id:"examples/test-assertions",title:"Test Assertions in Handler",description:"run test assertions during handler execution",source:"@site/docs/examples/test-assertions.mdx",sourceDirName:"examples",slug:"/examples/test-assertions",permalink:"/mocq/docs/examples/test-assertions",draft:!1,unlisted:!1,editUrl:"https://github.com/nxzq/mocq/tree/main/website/docs/examples/test-assertions.mdx",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,title:"Test Assertions in Handler",description:"run test assertions during handler execution"},sidebar:"docsSidebar",previous:{title:"Database Load",permalink:"/mocq/docs/examples/database-load"},next:{title:"Usage with Static Data",permalink:"/mocq/docs/examples/static-data"}},c={},d=[];function h(e){const t={admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",p:"p",pre:"pre",...(0,a.a)(),...e.components},{Details:n}=t;return n||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.admonition,{title:"When would I want to do this?",type:"note",children:[(0,r.jsxs)(t.p,{children:["typically when using ",(0,r.jsx)(t.code,{children:"[mocq]"})," to build out a long lived test, something like an integration test, you'll want the handler to\nrun some kind of create function with the generated data ",(0,r.jsx)(t.em,{children:"then"})," query and assert"]}),(0,r.jsxs)(t.blockquote,{children:["\n",(0,r.jsxs)(t.p,{children:["this is useful when building out workflow where data will change during the ",(0,r.jsx)(t.code,{children:"[mocq]"})," execution\nallowing for asserting on intermediate values\n(something like a ",(0,r.jsx)(t.code,{children:"create"})," > ",(0,r.jsx)(t.code,{children:"edit"})," > ",(0,r.jsx)(t.code,{children:"delete"})," > ",(0,r.jsx)(t.code,{children:"recreate"}),")"]}),"\n"]})]}),"\n","\n","\n",(0,r.jsxs)(s.Z,{groupId:"code-block-language",children:[(0,r.jsx)(o.Z,{value:"js",label:"JavaScript",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-js",children:"import { expect, test } from 'bun:test';\n\nimport { mocq } from 'mocq';\n\ntest('asserting in mocq handler', async () => {\n  const count = 1;\n\n  const { execute } = mocq({\n    nodes: {\n      generator: (i) => ({ index: i }),\n      count,\n      handler: (nodes) => {\n        // highlight-start\n        expect(true).toEqual(true);\n        expect(nodes.length).toEqual(count);\n        expect(nodes[0]).toEqual({ index: 0 });\n        // highlight-end\n      },\n    };\n  });\n  \n  const { data: { nodes } } = await execute();\n});\n"})})}),(0,r.jsx)(o.Z,{value:"ts",label:"TypeScript",children:(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-ts",children:"import { expect, test } from 'bun:test';\n\nimport { mocq } from 'mocq';\n\ntest('asserting in mocq handler', async () => {\n  const count = 1;\n\n  const { execute } = mocq({\n    nodes: {\n      generator: (i: number) => ({ index: i }),\n      count,\n      handler: (data: {index: number}[]) => {\n        // highlight-start\n        expect(true).toEqual(true);\n        expect(data.length).toEqual(count);\n        expect(data[0]).toEqual({ index: 0 });\n        // highlight-end\n      },\n    };\n  });\n  \n  const { data: { nodes } } = await execute();\n});\n"})})})]}),"\n",(0,r.jsxs)(n,{children:[(0,r.jsx)("summary",{children:(0,r.jsx)(t.p,{children:"Test Output"})}),(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"bun test v1.0.13 (f5bf67bd)\n\nassert.test.ts:\n\u2713 asserting in mocq handler [1.67ms]\n\n 1 pass\n 0 fail\n 3 expect() calls\nRan 1 tests across 1 files. [24.00ms]\n"})})]})]})}function m(e={}){const{wrapper:t}={...(0,a.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},9798:(e,t,n)=>{n.d(t,{Z:()=>o});n(7378);var r=n(624);const a={tabItem:"tabItem_wHwb"};var s=n(4246);function o(e){let{children:t,hidden:n,className:o}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,r.Z)(a.tabItem,o),hidden:n,children:t})}},3930:(e,t,n)=>{n.d(t,{Z:()=>q});var r=n(7378),a=n(624),s=n(3457),o=n(3620),i=n(9834),l=n(654),u=n(784),c=n(1819);function d(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:n}=e;return(0,r.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:n,attributes:r,default:a}}=e;return{value:t,label:n,attributes:r,default:a}}))}(n);return function(e){const t=(0,u.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function m(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function p(e){let{queryString:t=!1,groupId:n}=e;const a=(0,o.k6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,l._X)(s),(0,r.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(a.location.search);t.set(s,e),a.replace({...a.location,search:t.toString()})}),[s,a])]}function b(e){const{defaultValue:t,queryString:n=!1,groupId:a}=e,s=h(e),[o,l]=(0,r.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!m({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const r=n.find((e=>e.default))??n[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:t,tabValues:s}))),[u,d]=p({queryString:n,groupId:a}),[b,f]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,s]=(0,c.Nk)(n);return[a,(0,r.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:a}),x=(()=>{const e=u??b;return m({value:e,tabValues:s})?e:null})();(0,i.Z)((()=>{x&&l(x)}),[x]);return{selectedValue:o,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),f(e)}),[d,f,s]),tabValues:s}}var f=n(6457);const x={tabList:"tabList_J5MA",tabItem:"tabItem_l0OV"};var g=n(4246);function v(e){let{className:t,block:n,selectedValue:r,selectValue:o,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:u}=(0,s.o5)(),c=e=>{const t=e.currentTarget,n=l.indexOf(t),a=i[n].value;a!==r&&(u(t),o(a))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const n=l.indexOf(e.currentTarget)+1;t=l[n]??l[0];break}case"ArrowLeft":{const n=l.indexOf(e.currentTarget)-1;t=l[n]??l[l.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.Z)("tabs",{"tabs--block":n},t),children:i.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:r===t?0:-1,"aria-selected":r===t,ref:e=>l.push(e),onKeyDown:d,onClick:c,...s,className:(0,a.Z)("tabs__item",x.tabItem,s?.className,{"tabs__item--active":r===t}),children:n??t},t)}))})}function w(e){let{lazy:t,children:n,selectedValue:a}=e;const s=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===a));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function j(e){const t=b(e);return(0,g.jsxs)("div",{className:(0,a.Z)("tabs-container",x.tabList),children:[(0,g.jsx)(v,{...e,...t}),(0,g.jsx)(w,{...e,...t})]})}function q(e){const t=(0,f.Z)();return(0,g.jsx)(j,{...e,children:d(e.children)},String(t))}},1670:(e,t,n)=>{n.d(t,{Z:()=>i,a:()=>o});var r=n(7378);const a={},s=r.createContext(a);function o(e){const t=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),r.createElement(s.Provider,{value:t},e.children)}}}]);
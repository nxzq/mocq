"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[600],{8225:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>u,contentTitle:()=>c,default:()=>p,frontMatter:()=>l,metadata:()=>d,toc:()=>h});var r=t(4246),i=t(1670),o=t(2536),s=t(3930),a=t(9798);const l={title:"API",description:"mocq's api",sidebar_position:4},c=void 0,d={id:"api",title:"API",description:"mocq's api",source:"@site/docs/api.mdx",sourceDirName:".",slug:"/api",permalink:"/mocq/docs/api",draft:!1,unlisted:!1,editUrl:"https://github.com/nxzq/mocq/tree/main/website/docs/api.mdx",tags:[],version:"current",sidebarPosition:4,frontMatter:{title:"API",description:"mocq's api",sidebar_position:4},sidebar:"docsSidebar",previous:{title:"Usage with zod-mock",permalink:"/mocq/docs/examples/zod"},next:{title:"Debug",permalink:"/mocq/docs/debug"}},u={},h=[{value:"Config",id:"config",level:2},{value:"generator - <code>required</code>",id:"generator---required",level:3},{value:"type",id:"type",level:4},{value:"function parameters",id:"function-parameters",level:4},{value:"count - <code>required</code>",id:"count---required",level:3},{value:"allowed values",id:"allowed-values",level:4},{value:"connections - <code>optional</code>",id:"connections---optional",level:3},{value:"types",id:"types",level:4},{value:"function parameters",id:"function-parameters-1",level:4},{value:"handler - <code>optional</code>",id:"handler---optional",level:3},{value:"type",id:"type-1",level:4},{value:"function parameters",id:"function-parameters-2",level:4}];function x(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",mdxAdmonitionTitle:"mdxAdmonitionTitle",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"[mocq]"})," configuration syntax"]}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"config",children:"Config"}),"\n","\n",(0,r.jsx)(o.Z,{language:"ts",children:"/** @see MocQ for implementation details */\ninterface Config {\n  [key: string]: MocQ<object>\n}\n\ntype MocQ<T extends object> = {\n  generator: DataGenerator<T>\n  count: number\n  connections?: {\n    [connectionKey: string]: DataConnection<T>\n  }\n  handler?: DataHandler<T>\n}"}),"\n","\n","\n",(0,r.jsxs)(n.admonition,{title:"Strict Type Checking",type:"info",children:[(0,r.jsxs)(n.p,{children:["when working with ",(0,r.jsx)(n.a,{href:"https://www.typescriptlang.org/",children:"TypeScript"})," it's best practice to utilize the ",(0,r.jsx)(n.code,{children:"MocQ"}),"\ntype to explicitly type your data object configurations"]}),(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["without an explicit type ",(0,r.jsx)(n.code,{children:"[mocq]"})," will attempt to infer the key data object type, if it cannot ",(0,r.jsx)(n.code,{children:"unknown"})," will be used"]}),"\n"]}),(0,r.jsxs)(s.Z,{children:[(0,r.jsx)(a.Z,{value:"explicit",label:"Explicit Type (recommended)",default:!0,children:(0,r.jsx)(o.Z,{language:"ts",title:"/index.ts",showLineNumbers:!0,children:"import { mocq, MocQ } from 'mocq';\nimport { User, Node } from './types';\n\n// highlight-start\ntype customMocqConfig: {\n  users: MocQ<User>,\n  nodes: MocQ<Node>,\n};\n// highlight-end\n\n// highlight-next-line\nconst config: customMocqConfig = {\n  /* ... */\n};\n\nconst { generate, execute } = mocq(config);"})}),(0,r.jsx)(a.Z,{value:"assertion",label:"Type Assertion",children:(0,r.jsx)(o.Z,{language:"ts",title:"/index.ts",showLineNumbers:!0,children:"import { mocq, MocQ } from 'mocq';\nimport { User, Node } from './types';\n\nconst config = {\n  users: {\n    /* ... */\n    // highlight-next-line\n  } as MocQ<User>,\n  nodes: {\n    /* ... */\n    // highlight-next-line\n  } as MocQ<Node>,\n};\n\nconst { generate, execute } = mocq(config);"})})]})]}),"\n",(0,r.jsxs)(n.h3,{id:"generator---required",children:["generator - ",(0,r.jsx)(n.code,{children:"required"})]}),"\n",(0,r.jsxs)(n.p,{children:["generic ",(0,r.jsx)(n.em,{children:"synchronous"})," function that returns a single instance of a data object"]}),"\n",(0,r.jsx)(n.h4,{id:"type",children:"type"}),"\n",(0,r.jsx)(o.Z,{language:"ts",children:"type DataGenerator<T extends object> = (index: number) => T"}),"\n",(0,r.jsx)(n.h4,{id:"function-parameters",children:"function parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"name"}),(0,r.jsx)(n.th,{style:{textAlign:"center"},children:"description"}),(0,r.jsx)(n.th,{style:{textAlign:"right"},children:"type"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"index"})}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"index of current data object being created, utilize the index for fields requiring uniqueness"}),(0,r.jsx)(n.td,{style:{textAlign:"right"},children:(0,r.jsx)(n.code,{children:"number"})})]})})]}),"\n",(0,r.jsxs)(n.h3,{id:"count---required",children:["count - ",(0,r.jsx)(n.code,{children:"required"})]}),"\n",(0,r.jsx)(n.p,{children:"number of desired data objects"}),"\n",(0,r.jsx)(n.h4,{id:"allowed-values",children:"allowed values"}),"\n",(0,r.jsx)(o.Z,{language:"ts",children:"number > 0"}),"\n",(0,r.jsxs)(n.h3,{id:"connections---optional",children:["connections - ",(0,r.jsx)(n.code,{children:"optional"})]}),"\n",(0,r.jsxs)(n.p,{children:["key-value pairs allowing for the ability to ",(0,r.jsx)(n.em,{children:"hook into the generated data of configuration by key"})," and augment data per instance of current data type"]}),"\n",(0,r.jsx)(n.h4,{id:"types",children:"types"}),"\n",(0,r.jsx)(o.Z,{language:"ts",children:"{ \n  [connectionKey: string]: DataConnection<T>\n}"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"connectionKey"})," must be present in top level config"]}),"\n"]}),"\n",(0,r.jsx)(o.Z,{language:"ts",children:"type DataConnection<T extends object> = (connectionKeyData: X[], index: number, indexData: T) => Partial<T>"}),"\n",(0,r.jsxs)(n.p,{children:["generic ",(0,r.jsx)(n.em,{children:"synchronous"})," function that returns a partial of a data object to be spread onto generated data"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["see ",(0,r.jsx)(n.a,{href:"/docs/#data-resolution",children:"data resolution"})," for more info"]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"function-parameters-1",children:"function parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"name"}),(0,r.jsx)(n.th,{style:{textAlign:"center"},children:"description"}),(0,r.jsx)(n.th,{style:{textAlign:"right"},children:"type"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"connectionKeyData"})}),(0,r.jsxs)(n.td,{style:{textAlign:"center"},children:[(0,r.jsx)(n.a,{href:"/docs/#data-resolution",children:"resolved data"})," array for config key specified as the connection key, type will match the corresponding type of connection key data"]}),(0,r.jsx)(n.td,{style:{textAlign:"right"},children:(0,r.jsx)(n.code,{children:"X[]"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"index"})}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"index of current data object being manipulated"}),(0,r.jsx)(n.td,{style:{textAlign:"right"},children:(0,r.jsx)(n.code,{children:"number"})})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"indexData"})}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"data of current data object being created"}),(0,r.jsx)(n.td,{style:{textAlign:"right"},children:(0,r.jsx)(n.code,{children:"T"})})]})]})]}),"\n",(0,r.jsxs)(n.h3,{id:"handler---optional",children:["handler - ",(0,r.jsx)(n.code,{children:"optional"})]}),"\n",(0,r.jsxs)(n.p,{children:["function to be ran when ",(0,r.jsx)(n.code,{children:"execute"})," is called"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["can be ",(0,r.jsx)(n.em,{children:(0,r.jsx)(n.code,{children:"sync"})})," or ",(0,r.jsx)(n.em,{children:(0,r.jsx)(n.code,{children:"async"})})]}),"\n"]}),"\n",(0,r.jsx)(n.h4,{id:"type-1",children:"type"}),"\n",(0,r.jsx)(o.Z,{language:"ts",children:"type DataHandler<T extends object> = (data: T[]) => Promise<void> | void"}),"\n",(0,r.jsx)(n.h4,{id:"function-parameters-2",children:"function parameters"}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{children:"name"}),(0,r.jsx)(n.th,{style:{textAlign:"center"},children:"description"}),(0,r.jsx)(n.th,{style:{textAlign:"right"},children:"type"})]})}),(0,r.jsx)(n.tbody,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{children:(0,r.jsx)(n.code,{children:"data"})}),(0,r.jsxs)(n.td,{style:{textAlign:"center"},children:[(0,r.jsx)(n.a,{href:"/docs/#data-resolution",children:"resolved data"})," array for config key"]}),(0,r.jsx)(n.td,{style:{textAlign:"right"},children:(0,r.jsx)(n.code,{children:"T[]"})})]})})]}),"\n",(0,r.jsxs)(n.admonition,{type:"note",children:[(0,r.jsxs)(n.mdxAdmonitionTitle,{children:["need to utilize a common ",(0,r.jsx)(n.em,{children:"connection/transaction"})," between handlers?"]}),(0,r.jsxs)(n.p,{children:["utilize same pattern used by the ",(0,r.jsx)(n.a,{href:"/docs/examples/database-load#database-load-function",children:"Database Load Example"})]})]})]})}function p(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(x,{...e})}):x(e)}},9798:(e,n,t)=>{t.d(n,{Z:()=>s});t(7378);var r=t(624);const i={tabItem:"tabItem_wHwb"};var o=t(4246);function s(e){let{children:n,hidden:t,className:s}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,r.Z)(i.tabItem,s),hidden:t,children:n})}},3930:(e,n,t)=>{t.d(n,{Z:()=>w});var r=t(7378),i=t(624),o=t(3457),s=t(3620),a=t(9834),l=t(654),c=t(784),d=t(1819);function u(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:i}}=e;return{value:n,label:t,attributes:r,default:i}}))}(t);return function(e){const n=(0,c.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function x(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function p(e){let{queryString:n=!1,groupId:t}=e;const i=(0,s.k6)(),o=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,l._X)(o),(0,r.useCallback)((e=>{if(!o)return;const n=new URLSearchParams(i.location.search);n.set(o,e),i.replace({...i.location,search:n.toString()})}),[o,i])]}function m(e){const{defaultValue:n,queryString:t=!1,groupId:i}=e,o=h(e),[s,l]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!x({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:o}))),[c,u]=p({queryString:t,groupId:i}),[m,j]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[i,o]=(0,d.Nk)(t);return[i,(0,r.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:i}),f=(()=>{const e=c??m;return x({value:e,tabValues:o})?e:null})();(0,a.Z)((()=>{f&&l(f)}),[f]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!x({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),u(e),j(e)}),[u,j,o]),tabValues:o}}var j=t(6457);const f={tabList:"tabList_J5MA",tabItem:"tabItem_l0OV"};var b=t(4246);function g(e){let{className:n,block:t,selectedValue:r,selectValue:s,tabValues:a}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,o.o5)(),d=e=>{const n=e.currentTarget,t=l.indexOf(n),i=a[t].value;i!==r&&(c(n),s(i))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=l.indexOf(e.currentTarget)+1;n=l[t]??l[0];break}case"ArrowLeft":{const t=l.indexOf(e.currentTarget)-1;n=l[t]??l[l.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":t},n),children:a.map((e=>{let{value:n,label:t,attributes:o}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>l.push(e),onKeyDown:u,onClick:d,...o,className:(0,i.Z)("tabs__item",f.tabItem,o?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function y(e){let{lazy:n,children:t,selectedValue:i}=e;const o=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=o.find((e=>e.props.value===i));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:o.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==i})))})}function v(e){const n=m(e);return(0,b.jsxs)("div",{className:(0,i.Z)("tabs-container",f.tabList),children:[(0,b.jsx)(g,{...e,...n}),(0,b.jsx)(y,{...e,...n})]})}function w(e){const n=(0,j.Z)();return(0,b.jsx)(v,{...e,children:u(e.children)},String(n))}},1670:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>s});var r=t(7378);const i={},o=r.createContext(i);function s(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);
"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[173],{4770:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>h,contentTitle:()=>d,default:()=>f,frontMatter:()=>l,metadata:()=>u,toc:()=>m});var r=t(4246),o=t(1670),a=t(3930),s=t(9798),i=t(8948),c=t(6925);const l={title:"Getting Started",description:"overview of mocq npm library",sidebar_position:1},d=void 0,u={id:"index",title:"Getting Started",description:"overview of mocq npm library",source:"@site/docs/index.mdx",sourceDirName:".",slug:"/",permalink:"/mocq/docs/",draft:!1,unlisted:!1,editUrl:"https://github.com/nxzq/mocq/tree/main/website/docs/index.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Getting Started",description:"overview of mocq npm library",sidebar_position:1},sidebar:"docsSidebar",next:{title:"Tutorial",permalink:"/mocq/docs/tutorial"}},h={},m=[{value:"Install",id:"install",level:2},{value:"Basic Concepts",id:"basic-concepts",level:2},{value:"Configuration",id:"configuration",level:3},{value:"Data Resolution",id:"data-resolution",level:3},{value:"Execution Order",id:"execution-order",level:3},{value:"generate",id:"generate",level:3},{value:"execute",id:"execute",level:3}];function x(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"install",children:"Install"}),"\n","\n",(0,r.jsxs)(a.Z,{children:[(0,r.jsx)(s.Z,{value:"npm",label:"npm",default:!0,children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"npm i --save-dev mocq\n"})})}),(0,r.jsx)(s.Z,{value:"yarn",label:"yarn",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"yarn add --dev mocq\n"})})}),(0,r.jsx)(s.Z,{value:"bun",label:"bun",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"bun add --dev mocq\n"})})})]}),"\n",(0,r.jsx)(n.h2,{id:"basic-concepts",children:"Basic Concepts"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"[mocq]"})," is a super small (",(0,r.jsx)(n.code,{children:"<9 kB unpacked"}),") ",(0,r.jsx)(n.a,{href:"https://www.typescriptlang.org/",children:"TypeScript"})," utility\nfor data creation, connection & execution coordination"]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"[mocq]"})," exports a single function ",(0,r.jsx)(n.code,{children:"mocq"}),", this function takes in a ",(0,r.jsx)(n.a,{href:"#configuration",children:"custom config object"}),", vaildates the configuration and returns two functions ",(0,r.jsx)(n.a,{href:"#generate",children:"generate"})," & ",(0,r.jsx)(n.a,{href:"#execute",children:"execute"})]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { mocq } from 'mocq';\n/* ... */\nconst { generate, execute } = mocq(customConfigObj);\n"})}),"\n",(0,r.jsx)(n.h3,{id:"configuration",children:"Configuration"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"[mocq]"})," is configured with an object of ",(0,r.jsx)(n.code,{children:"key-value pairs"})," where the:"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"key"})," is a contextual string that you choose"]}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["you will use this key to reference resolved data from ",(0,r.jsx)(n.code,{children:"connections"})," of other key-value pairs"]}),"\n"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"value"})," is a ",(0,r.jsx)(n.a,{href:"/docs/api",children:"MocQ config object"})]}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["user defined functions:","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"how to generate a data instance"}),"\n",(0,r.jsx)(n.li,{children:"how to connect to other keys in the configuration"}),"\n",(0,r.jsx)(n.li,{children:"how to handle data when execute is called"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Each key should correspond to a single data object type"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"import { mocq } from 'mocq'\n\nconst customConfigObj = {\n  myCustomKey: {\n    generator: // a function to create a myCustomKey node\n    count: // the number of myCustomKey nodes wanted\n    connections?: // ability to hook into resolved data from other keys in config & amend myCustomKey data\n    handler?: // ability to execute functions against myCustomKey resolved data\n  },\n  myCustomKey2: { \n    /* ... */\n  },\n  /* ... */\n}\n\nconst { generate, execute } = mocq(customConfigObj)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The order of keys in the config does not matter, ",(0,r.jsx)(n.code,{children:"[mocq]"})," manages the ",(0,r.jsx)(n.a,{href:"#execution-order",children:"execution order"})]}),"\n",(0,r.jsxs)(n.p,{children:["Go through the ",(0,r.jsx)(n.a,{href:"/docs/tutorial",children:"Tutorial"}),", checkout the ",(0,r.jsx)(n.a,{href:"/docs/api",children:"API"})," or browse some ",(0,r.jsx)(n.a,{href:"/docs/examples",children:"Examples"})," for more information on configuration"]}),"\n",(0,r.jsx)(n.h3,{id:"data-resolution",children:"Data Resolution"}),"\n",(0,r.jsx)(n.p,{children:"Use connections to amend generated data with data generated via another key in the top level configuration"}),"\n",(0,r.jsx)(n.p,{children:"Data is fully resolved before being passed to a connection function"}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["meaning the data you're handed in a connection function is the same data\nthat would come back under the same key from the ",(0,r.jsx)(n.code,{children:"generate"})," function"]}),"\n"]}),"\n","\n","\n",(0,r.jsx)(c.Z,{alt:"Data Resolution Visual",width:"450",sources:{light:(0,i.Z)("/img/mocq-data-resolution.png"),dark:(0,i.Z)("/img/mocq-data-resolution-dark.png")}}),"\n",(0,r.jsxs)(n.p,{children:["Data is resolved by spreading the ",(0,r.jsx)(n.strong,{children:"top level keys"})," of the return of connection functions over the return of generator function"]}),"\n",(0,r.jsx)(n.admonition,{title:"In simple JavaScript you can think of it like this",type:"info",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"{\n  ...generatorFn(),\n  ...connectionFn1(),\n  ...connectionFn2(),\n  ...connectionFnx(),\n}\n"})})}),"\n",(0,r.jsx)(n.h3,{id:"execution-order",children:"Execution Order"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:"[mocq]"})," derives the execution order from connections"]}),", cyclic dependencies & self reference will cause configuration validation to fail"]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:"handler"})," functions allow you utilize the execution order to invoke functions on the generated data"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsxs)(n.p,{children:["this is typically where you'd use your ",(0,r.jsx)(n.code,{children:"src"})," code to  move data into a data store (database operations, api calls, etc.), the execution order\nensures dependent data is there at time of execution allowing data to be stitched together on the fly"]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"generate",children:"generate"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.em,{children:"sync"})," function that generates and connects data"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"returns resolved generated data"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"const { data: { key1, key2, ..., keyx } } = generate()\n"})}),"\n",(0,r.jsx)(n.h3,{id:"execute",children:"execute"}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.em,{children:"async"})," function that generates and connects data & executes handler functions"]}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"returns resolved generated data"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-js",children:"const { data: { key1, key2, ..., keyx } } = await execute()\n"})})]})}function f(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(x,{...e})}):x(e)}},9798:(e,n,t)=>{t.d(n,{Z:()=>s});t(7378);var r=t(624);const o={tabItem:"tabItem_wHwb"};var a=t(4246);function s(e){let{children:n,hidden:t,className:s}=e;return(0,a.jsx)("div",{role:"tabpanel",className:(0,r.Z)(o.tabItem,s),hidden:t,children:n})}},3930:(e,n,t)=>{t.d(n,{Z:()=>k});var r=t(7378),o=t(624),a=t(3457),s=t(3620),i=t(9834),c=t(654),l=t(784),d=t(1819);function u(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:o}}=e;return{value:n,label:t,attributes:r,default:o}}))}(t);return function(e){const n=(0,l.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function m(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function x(e){let{queryString:n=!1,groupId:t}=e;const o=(0,s.k6)(),a=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,c._X)(a),(0,r.useCallback)((e=>{if(!a)return;const n=new URLSearchParams(o.location.search);n.set(a,e),o.replace({...o.location,search:n.toString()})}),[a,o])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:o}=e,a=h(e),[s,c]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!m({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:a}))),[l,u]=x({queryString:t,groupId:o}),[f,p]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[o,a]=(0,d.Nk)(t);return[o,(0,r.useCallback)((e=>{t&&a.set(e)}),[t,a])]}({groupId:o}),j=(()=>{const e=l??f;return m({value:e,tabValues:a})?e:null})();(0,i.Z)((()=>{j&&c(j)}),[j]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!m({value:e,tabValues:a}))throw new Error(`Can't select invalid tab value=${e}`);c(e),u(e),p(e)}),[u,p,a]),tabValues:a}}var p=t(6457);const j={tabList:"tabList_J5MA",tabItem:"tabItem_l0OV"};var g=t(4246);function b(e){let{className:n,block:t,selectedValue:r,selectValue:s,tabValues:i}=e;const c=[],{blockElementScrollPositionUntilNextRender:l}=(0,a.o5)(),d=e=>{const n=e.currentTarget,t=c.indexOf(n),o=i[t].value;o!==r&&(l(n),s(o))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=c.indexOf(e.currentTarget)+1;n=c[t]??c[0];break}case"ArrowLeft":{const t=c.indexOf(e.currentTarget)-1;n=c[t]??c[c.length-1];break}}n?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":t},n),children:i.map((e=>{let{value:n,label:t,attributes:a}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>c.push(e),onKeyDown:u,onClick:d,...a,className:(0,o.Z)("tabs__item",j.tabItem,a?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:o}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===o));return e?(0,r.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==o})))})}function y(e){const n=f(e);return(0,g.jsxs)("div",{className:(0,o.Z)("tabs-container",j.tabList),children:[(0,g.jsx)(b,{...e,...n}),(0,g.jsx)(v,{...e,...n})]})}function k(e){const n=(0,p.Z)();return(0,g.jsx)(y,{...e,children:u(e.children)},String(n))}},1670:(e,n,t)=>{t.d(n,{Z:()=>i,a:()=>s});var r=t(7378);const o={},a=r.createContext(o);function s(e){const n=r.useContext(a);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);
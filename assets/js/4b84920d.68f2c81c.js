"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[884],{6754:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>b,contentTitle:()=>c,default:()=>p,frontMatter:()=>i,metadata:()=>d,toc:()=>h});var n=r(2540),a=r(3023),o=r(883),s=r(448),l=r(8296),u=r(2491);const i={title:"Debug",descrition:"use verbose logging with mocq",sidebar_position:5},c=void 0,d={id:"debug",title:"Debug",description:"Verbose Mode",source:"@site/docs/debug.mdx",sourceDirName:".",slug:"/debug",permalink:"/mocq/docs/debug",draft:!1,unlisted:!1,editUrl:"https://github.com/nxzq/mocq/tree/main/website/docs/debug.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{title:"Debug",descrition:"use verbose logging with mocq",sidebar_position:5},sidebar:"docsSidebar",previous:{title:"API",permalink:"/mocq/docs/api"}},b={},h=[{value:"Verbose Mode",id:"verbose-mode",level:2},{value:"node (server-side code)",id:"node-server-side-code",level:3},{value:"browser",id:"browser",level:3}];function m(e){const t={admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"verbose-mode",children:"Verbose Mode"}),"\n",(0,n.jsx)(t.admonition,{type:"tip",children:(0,n.jsxs)(t.p,{children:["when debugging set the ",(0,n.jsx)(t.code,{children:"MOCQ_VERBOSE"})," .env variable to ",(0,n.jsx)(t.code,{children:"true"})," for verbose logs"]})}),"\n","\n",(0,n.jsx)(s.A,{alt:"mocq Verbose Example",style:{aspectRatio:"2/1"},sources:{light:(0,o.Ay)("/img/mocq-verbose.png"),dark:(0,o.Ay)("/img/mocq-verbose-dark.png")}}),"\n",(0,n.jsx)(t.h3,{id:"node-server-side-code",children:"node (server-side code)"}),"\n","\n",(0,n.jsxs)(l.A,{children:[(0,n.jsx)(u.A,{value:"env",label:".env file",default:!0,children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-js",children:"export MOCQ_VERBOSE=true // note: must `source .env` after setting value\n"})})}),(0,n.jsx)(u.A,{value:"code",label:"inline code",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ts",children:"process.env.MOCQ_VERBOSE = 'true'\n"})})}),(0,n.jsx)(u.A,{value:"cli",label:"inline cli",children:(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"MOCQ_VERBOSE=true # whatever cli command | example: MOCQ_VERBOSE=true bun test\n"})})})]}),"\n",(0,n.jsx)(t.h3,{id:"browser",children:"browser"}),"\n",(0,n.jsx)(t.p,{children:"reference your frameworks docs on how to configure env vars"})]})}function p(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(m,{...e})}):m(e)}},2491:(e,t,r)=>{r.d(t,{A:()=>s});r(3696);var n=r(1750);const a={tabItem:"tabItem_wHwb"};var o=r(2540);function s(e){let{children:t,hidden:r,className:s}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,n.A)(a.tabItem,s),hidden:r,children:t})}},8296:(e,t,r)=>{r.d(t,{A:()=>y});var n=r(3696),a=r(1750),o=r(766),s=r(9519),l=r(4395),u=r(5043),i=r(4544),c=r(4243);function d(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function b(e){const{values:t,children:r}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:a}}=e;return{value:t,label:r,attributes:n,default:a}}))}(r);return function(e){const t=(0,i.X)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function h(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function m(e){let{queryString:t=!1,groupId:r}=e;const a=(0,s.W6)(),o=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,u.aZ)(o),(0,n.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(a.location.search);t.set(o,e),a.replace({...a.location,search:t.toString()})}),[o,a])]}function p(e){const{defaultValue:t,queryString:r=!1,groupId:a}=e,o=b(e),[s,u]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!h({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:o}))),[i,d]=m({queryString:r,groupId:a}),[p,f]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[a,o]=(0,c.Dv)(r);return[a,(0,n.useCallback)((e=>{r&&o.set(e)}),[r,o])]}({groupId:a}),v=(()=>{const e=i??p;return h({value:e,tabValues:o})?e:null})();(0,l.A)((()=>{v&&u(v)}),[v]);return{selectedValue:s,selectValue:(0,n.useCallback)((e=>{if(!h({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);u(e),d(e),f(e)}),[d,f,o]),tabValues:o}}var f=r(6681);const v={tabList:"tabList_J5MA",tabItem:"tabItem_l0OV"};var g=r(2540);function x(e){let{className:t,block:r,selectedValue:n,selectValue:s,tabValues:l}=e;const u=[],{blockElementScrollPositionUntilNextRender:i}=(0,o.a_)(),c=e=>{const t=e.currentTarget,r=u.indexOf(t),a=l[r].value;a!==n&&(i(t),s(a))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const r=u.indexOf(e.currentTarget)+1;t=u[r]??u[0];break}case"ArrowLeft":{const r=u.indexOf(e.currentTarget)-1;t=u[r]??u[u.length-1];break}}t?.focus()};return(0,g.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":r},t),children:l.map((e=>{let{value:t,label:r,attributes:o}=e;return(0,g.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>u.push(e),onKeyDown:d,onClick:c,...o,className:(0,a.A)("tabs__item",v.tabItem,o?.className,{"tabs__item--active":n===t}),children:r??t},t)}))})}function w(e){let{lazy:t,children:r,selectedValue:a}=e;const o=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=o.find((e=>e.props.value===a));return e?(0,n.cloneElement)(e,{className:"margin-top--md"}):null}return(0,g.jsx)("div",{className:"margin-top--md",children:o.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==a})))})}function j(e){const t=p(e);return(0,g.jsxs)("div",{className:(0,a.A)("tabs-container",v.tabList),children:[(0,g.jsx)(x,{...t,...e}),(0,g.jsx)(w,{...t,...e})]})}function y(e){const t=(0,f.A)();return(0,g.jsx)(j,{...e,children:d(e.children)},String(t))}},3023:(e,t,r)=>{r.d(t,{R:()=>s,x:()=>l});var n=r(3696);const a={},o=n.createContext(a);function s(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);
import{o as f}from"./chunk-ChpBd9eV.js";import{t as S}from"./jsx-runtime-BmDUFisN.js";import{t as y}from"./react-M6yZRsSc.js";import{u as s}from"./types-Blk92mP1-Bs1i4Xbw.js";import{Lt as G}from"./schemas-pe6acdm4.js";import{Y as C}from"./utils-Cw5oo35x-DwNpgVj_.js";import{l as v,o as x}from"./PageCardLayout-BjtltpWV.js";import{r as A}from"./dist-C0k9q2wC.js";import{s as l}from"./components-BYDupVW5-BeXao-8V.js";import{t as N}from"./getToastOptionsFromError-BevZ3y8l.js";import{p as b}from"./feedback-CLmXe9DE-CHNztUDP.js";import{t as j}from"./lib-C3IpGLsk.js";import{t as I}from"./useMutation-Ds2Pb-th.js";import{t as E}from"./SettingsTextInput-Z6F5zfve.js";import{t as L}from"./useNavigateSettings-CAjUyZc_.js";import{al as M,il as T,nl as q}from"./index-DXFJtAay.js";import{t as D}from"./getAllEmailingDomains-C5juEkn8.js";var a=S(),c=f(y(),1),P=j`
  mutation CreateEmailGroupChannel($input: CreateEmailGroupChannelInput!) {
    createEmailGroupChannel(input: $input) {
      messageChannel {
        id
        handle
        visibility
        type
        isSyncEnabled
        excludeGroupEmails
        contactAutoCreationPolicy
      }
      forwardingAddress
    }
  }
`,H=()=>{const{enqueueToast:e}=b(),[d,{loading:i,error:o}]=I(P,{refetchQueries:[{query:v},{query:x},{query:D}]});return{createEmailGroupChannel:(r,m)=>d({variables:{input:{handle:r,displayName:m}},onError:n=>{e(N({error:n}))}}),loading:i,error:o}},ee=()=>{const{i18n:e,_:d}=A(),i=L(),{createEmailGroupChannel:o,loading:t}=H(),[r,m]=(0,c.useState)(""),[n,g]=(0,c.useState)(""),p=G().safeParse(r).success&&!t,u=(0,c.useCallback)(async()=>{const _=n.trim(),h=(await o(r,_.length>0?_:void 0)).data?.createEmailGroupChannel.messageChannel.id;h&&i(s.EmailGroupChannelDetail,{messageChannelId:h})},[o,n,r,i]);return(0,a.jsx)(M,{title:e._({id:"papEbS"}),links:[{children:e._({id:"pmUArF"}),href:C(s.General)},{children:e._({id:"hZotg6"}),href:C(s.WorkspaceCommunications)},{children:e._({id:"papEbS"})}],actionButton:(0,a.jsx)(T,{isSaveDisabled:!p,isCancelDisabled:t,isLoading:t,onCancel:()=>i(s.WorkspaceCommunications),onSave:u}),children:(0,a.jsxs)(q,{children:[(0,a.jsxs)(l.Root,{children:[(0,a.jsx)(l.Header,{title:e._({id:"hzKQCy"}),description:e._({id:"Z4WP0F"})}),(0,a.jsx)(E,{instanceId:"email-group-source",label:e._({id:"5f1fxa"}),placeholder:"support@mycompany.com",value:r,onChange:m,onInputEnter:()=>{p&&u()},disabled:t})]}),(0,a.jsxs)(l.Root,{children:[(0,a.jsx)(l.Header,{title:e._({id:"0gS7M5"}),description:e._({id:"+/y8+6"})}),(0,a.jsx)(E,{instanceId:"email-group-display-name",label:e._({id:"0gS7M5"}),placeholder:e._({id:"yYneQW"}),value:n,maxLength:255,onChange:g,onInputEnter:()=>{p&&u()},disabled:t})]})]})})};export{ee as SettingsAccountsNewEmailGroupChannel};

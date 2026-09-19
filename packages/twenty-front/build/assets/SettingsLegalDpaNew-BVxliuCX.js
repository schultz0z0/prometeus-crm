import{o as C}from"./chunk-ChpBd9eV.js";import{t as G}from"./jsx-runtime-BmDUFisN.js";import{t as b}from"./react-M6yZRsSc.js";import{u as r}from"./types-Blk92mP1-Bs1i4Xbw.js";import{Y as S}from"./utils-Cw5oo35x-DwNpgVj_.js";import{r as P}from"./dist-C0k9q2wC.js";import{s as i}from"./components-BYDupVW5-BeXao-8V.js";import{p as I}from"./feedback-CLmXe9DE-CHNztUDP.js";import{n as W}from"./lib-C3IpGLsk.js";import{t as R}from"./useQuery-klx7Id1G.js";import{t as H}from"./useMutation-Ds2Pb-th.js";import{t as d}from"./SettingsTextInput-Z6F5zfve.js";import{t as $}from"./useApolloCoreClient-cYHBUwoT.js";import{t as B}from"./useNavigateSettings-CAjUyZc_.js";import{t as M}from"./downloadFile-Sco-AQ-M.js";import{al as q,cl as U,il as F,nl as Q}from"./index-DXFJtAay.js";import{i as V,n as k,r as z,t as X}from"./getDpaPreview-CMSrZ8Y3.js";var t=G(),n=C(b(),1),Y=W`
  mutation GenerateSignedDpa($input: GenerateSignedDpaInput!) {
    generateSignedDpa(input: $input) {
      downloadUrl
      agreement {
        id
        type
        templateVersion
        region
        processorEntity
        customerLegalEntityName
        signatoryName
        signatoryTitle
        acceptedByEmail
        acceptedAt
        createdAt
      }
    }
  }
`,ge=()=>{const{i18n:e,_:Z}=P(),c=B(),{enqueueToast:p}=I(),u=$(),[o,h]=(0,n.useState)(""),[s,v]=(0,n.useState)(""),[l,E]=(0,n.useState)(""),[g,_]=(0,n.useState)(!1),{data:N,loading:x}=R(X,{client:u}),[j]=H(Y,{client:u,refetchQueries:[{query:k}],awaitRefetchQueries:!0}),a=N?.dpaPreview,f=o.trim()!==""&&s.trim()!==""&&l.trim()!==""&&!a?.notice&&!g,D=async()=>{if(!f)return;_(!0);const y=o.trim(),w=s.trim(),L=l.trim();try{const{data:A}=await j({variables:{input:{customerLegalEntityName:y,signatoryName:w,signatoryTitle:L}}}),m=A?.generateSignedDpa;if(!m)throw new Error("No result returned");const T=y.replace(/[/\\:*?"<>|]+/g,"-");await M(m.downloadUrl,`Twenty-DPA-${m.agreement.templateVersion}-${T}.pdf`),p({variant:"success",children:e._({id:"Z2Wg9g"})}),c(r.LegalDpa)}catch{p({variant:"error",children:e._({id:"NonvA5"})})}finally{_(!1)}};return x?(0,t.jsx)(U,{}):(0,t.jsx)(q,{title:e._({id:"H3rta9"}),links:[{children:e._({id:"pmUArF"}),href:S(r.General)},{children:e._({id:"vifyyw"}),href:S(r.LegalDpa)},{children:e._({id:"ziAjHi"})}],actionButton:(0,t.jsx)(F,{isSaveDisabled:!f,isLoading:g,onCancel:()=>c(r.LegalDpa),onSave:D}),children:(0,t.jsxs)(Q,{children:[a?.notice&&(0,t.jsx)(i.Root,{children:(0,t.jsx)(z,{text:a.notice})}),(0,t.jsxs)(i.Root,{children:[(0,t.jsx)(i.Header,{title:e._({id:"mmGBWT"}),description:e._({id:"Ya1wb4"})}),(0,t.jsx)(d,{instanceId:"dpa-legal-entity-name",label:e._({id:"nc/jNe"}),placeholder:e._({id:"BXMLsb"}),value:o,onChange:h,fullWidth:!0}),(0,t.jsx)(d,{instanceId:"dpa-signatory-name",label:e._({id:"3yzHpm"}),placeholder:e._({id:"A1CyH/"}),value:s,onChange:v,fullWidth:!0}),(0,t.jsx)(d,{instanceId:"dpa-signatory-title",label:e._({id:"a6TaW9"}),placeholder:e._({id:"Gpb1xF"}),value:l,onChange:E,fullWidth:!0})]}),a&&(0,t.jsxs)(i.Root,{children:[(0,t.jsx)(i.Header,{title:e._({id:"rdUucN"}),description:e._({id:"21Xjwu"})}),(0,t.jsx)(V,{document:a})]})]})})};export{ge as SettingsLegalDpaNew};

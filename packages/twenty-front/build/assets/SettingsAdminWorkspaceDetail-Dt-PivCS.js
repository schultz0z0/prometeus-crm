import{o as Fe}from"./chunk-ChpBd9eV.js";import{t as Ge}from"./jsx-runtime-BmDUFisN.js";import{t as Ue}from"./react-M6yZRsSc.js";import{g as Be}from"./dist-BZ9wCSoz.js";import{J as Me,u as re}from"./types-Blk92mP1-Bs1i4Xbw.js";import{t as k}from"./dist-x6yBUqMs.js";import{t as We}from"./build-CngeiE9P.js";import{o as Y}from"./theme-constants-C9fJFNSg-DoDi4Hx_.js";import{t as c}from"./isDefined-Dtu5EYqP-_d6Dqdoe.js";import{Y as ae}from"./utils-Cw5oo35x-DwNpgVj_.js";import{t as V}from"./useAtomStateValue-Dh9Tkqi-.js";import{t as n}from"./dist-Cg5OofxW.js";import{t as ie}from"./IconCalendarRepeat-Blp2taHS.js";import{t as $e}from"./IconChartBar-B6Jn00D8.js";import{t as J}from"./IconCoins-B0r0Kos5.js";import{t as qe}from"./IconDotsVertical-B8pBwOxf.js";import{t as Ke}from"./IconExternalLink-ulJUGaAH.js";import{t as He}from"./IconEyeShare-CSqIRONr.js";import{t as Ve}from"./IconFlag-D1FPjsFn.js";import{t as ze}from"./IconTrash-h0izILIX.js";import{Kn as Qe,r as X}from"./OverflowingTextWithTooltip-gawTMkMa-DHyYm06o.js";import{r as pe}from"./dist-C0k9q2wC.js";import{t as Ye}from"./useAtomState-t25i5gHy.js";import{n as Je,r as de}from"./Switch-DkXpJDzt-DpjCSYQl.js";import{f as Xe,l as Ze}from"./navigation-BftMWhq1-C_TLOf8F.js";import{n as et,s as b}from"./components-BYDupVW5-BeXao-8V.js";import{i as Ae,t as tt}from"./surfaces-Ba0h60wf-gPF5x1Ly.js";import{_ as $,y as Se}from"./data-display-qV4jqvQ8-B-u65c3O.js";import{t as ke}from"./getToastOptionsFromError-BevZ3y8l.js";import{p as ue}from"./feedback-CLmXe9DE-CHNztUDP.js";import{t as rt}from"./useAtomComponentStateValue-DfzGI7I2.js";import{x as ce,y as Q}from"./graphql-DNS_baJt.js";import{t as q}from"./lib-C3IpGLsk.js";import{t as Z}from"./useQuery-klx7Id1G.js";import{t as me}from"./useMutation-Ds2Pb-th.js";import{t as at}from"./DialogInstance-iY7TbFfu.js";import{t as _e}from"./useDialog-eBqvlGWR.js";import{t as it}from"./currentUserState-BjMkh9wE.js";import{t as st}from"./billingState-BMmCOWgz.js";import{t as ge}from"./SettingsTextInput-Z6F5zfve.js";import{t as nt}from"./ConfirmationDialog-HMnYiRzy.js";import{t as Re}from"./currentWorkspaceState-DahEPtKG.js";import{t as De}from"./useNumberFormat-DySGZmz5.js";import{t as ot}from"./activeTabIdComponentState-9eGoc4EF.js";import{t as lt}from"./useCloseDropdown-t-lTEZCO.js";import{t as fe}from"./getAbsoluteImageUrl-4K_0u4OV.js";import{t as ve}from"./Table-B46Zylx7.js";import{t as F}from"./TableCell-Chqrkjg2.js";import{t as M}from"./TableHeader-DXdlSysm.js";import{t as z}from"./TableRow-BxQGet4t.js";import{t as dt}from"./Dropdown-Cty1eDgu.js";import{n as ct,t as pt}from"./DropdownMenuItemsContainer-CZFqkfAF.js";import{n as W}from"./date-utils-bDc2rOBq.js";import{t as he}from"./Select-4cx6my1a.js";import{B as E,Ff as ut,Hu as mt,Ou as _t,P as T,Sp as It,al as At,ap as Ne,cl as St,dt as xe,ft as I,gf as gt,li as ft,lp as se,nl as vt,nt as ht,qd as xt,rd as Pe,ru as Ct,tl as we,vt as Et,wd as bt,yd as yt,yp as Tt}from"./index-Djy9izhi.js";import{t as ee}from"./useApolloAdminClient-CchFhePq.js";import{t as ne}from"./SettingsTableCard-DoMI3luf.js";import{t as jt}from"./TableBody-DIvn_7WK.js";import{t as kt}from"./SettingsTabBar-BwlLb36-.js";import{t as Rt}from"./AiAdminPath-CGKhk6Lg.js";import{n as Dt,t as Nt}from"./useHandleImpersonate-D1J0X1f9.js";import{t as Le}from"./SettingsTableListSection-BnI0-HS-.js";var e=Ge(),Pt=[{value:null,label:{id:"qqeAJM"}},{value:30,label:{id:"I6lVwB"}},{value:60,label:{id:"yPZL9v"}},{value:90,label:{id:"E5fxqI"}},{value:180,label:{id:"WlItll"}},{value:365,label:{id:"5uLUiv"}}],Oe={[T.COMPENSATION]:{id:"amPBVF"},[T.SALES]:{id:"mUv9U4"},[T.ONBOARDING_REWARD]:{id:"wxvgdv"},[T.ROLLOVER]:{id:"Q6o/eX"}},wt=[T.COMPENSATION,T.SALES],Lt=q`
  mutation GrantWorkspaceCredits(
    $workspaceId: UUID!
    $amount: Float!
    $type: BillingCreditGrantType!
    $reason: String
    $expiresInDays: Int
    $clientOperationId: UUID!
  ) {
    grantWorkspaceCredits(
      workspaceId: $workspaceId
      amount: $amount
      type: $type
      reason: $reason
      expiresInDays: $expiresInDays
      clientOperationId: $clientOperationId
    ) {
      id
      amount
      type
      effectiveAt
      expiresAt
      revokedAt
      sourceGrantId
      reason
      isActive
      createdAt
    }
  }
`,Ie=q`
  query WorkspaceBillingAdminPanel($workspaceId: UUID!) {
    workspaceBillingAdminPanel(workspaceId: $workspaceId) {
      stripeCustomerId
      creditBalance
      creditGrants {
        id
        amount
        type
        effectiveAt
        expiresAt
        revokedAt
        sourceGrantId
        reason
        isActive
        createdAt
      }
      usage {
        periodStart
        periodEnd
        usedCredits
        grantedCredits
        rolloverCredits
        totalGrantedCredits
        remainingCredits
      }
      subscription {
        stripeSubscriptionId
        status
        interval
        currency
        planKey
        currentPeriodStart
        currentPeriodEnd
        trialStart
        trialEnd
        cancelAt
        canceledAt
        cancelAtPeriodEnd
        items {
          productName
          productKey
          stripePriceId
          quantity
          unitAmount
          includedCredits
        }
      }
    }
  }
`,G=Fe(Ue(),1),Ot=k("div")({name:"StyledSectionContainer",class:"s1mndy8p",propsAsIs:!1}),Ft=k("div")({name:"StyledFields",class:"skq093g",propsAsIs:!1}),Gt=k("div")({name:"StyledModalActions",class:"s1wy8nlj",propsAsIs:!1}),Ce=k("div")({name:"StyledActionSlot",class:"si2xe4k",propsAsIs:!1}),Ut=({modalInstanceId:t,workspaceId:r})=>{const{i18n:s,_:i}=pe(),{closeDialog:j}=_e(),{enqueueToast:x}=ue(),f=ee(),[l,m]=(0,G.useState)(""),[A,u]=(0,G.useState)(T.COMPENSATION),[o,_]=(0,G.useState)(""),[C,D]=(0,G.useState)(null),[R,p]=(0,G.useState)(null),[v,{loading:d}]=me(Lt,{client:f,refetchQueries:[Ie]}),h=Number(l),U=Number.isFinite(h)&&h>0,N=()=>{m(""),u(T.COMPENSATION),_(""),D(null),p(null),j(t)},S=async()=>{if(!U)return;const P=o.trim(),w=JSON.stringify([h,A,P,C]),B=R?.payload===w?R.clientOperationId:Me();p({payload:w,clientOperationId:B});try{await v({variables:{workspaceId:r,amount:h,type:A,reason:P||null,expiresInDays:C,clientOperationId:B}}),x({variant:"success",children:s._({id:"Tbxf45",values:{parsedAmount:h}})}),N()}catch(K){x(ke({error:K}))}};return(0,e.jsx)(at,{dialogId:t,dismissible:!0,onClose:N,renderInDocumentBody:!0,children:({container:P,backdrop:w,viewportProps:B,onKeyDown:K})=>(0,e.jsxs)(Ae.Popup,{container:P,backdrop:w,viewportProps:B,onKeyDown:K,size:"md","data-globally-prevent-click-outside":!0,style:{padding:"var(--t-spacing-6)",borderRadius:"var(--t-spacing-1)",width:"360px"},children:[(0,e.jsx)(Ae.Title,{children:s._({id:"5O8DG6"})}),(0,e.jsx)(Ot,{children:(0,e.jsx)(b.Root,{align:"center",color:"primary",children:s._({id:"x4qjZw"})})}),(0,e.jsxs)(Ft,{children:[(0,e.jsx)(ge,{instanceId:`${t}-amount`,label:s._({id:"hehnjM"}),placeholder:"200",type:"number",min:0,leftAdornment:"$",value:l,onChange:m,autoFocusOnMount:!0,fullWidth:!0}),(0,e.jsx)(he,{dropdownId:`${t}-type`,label:s._({id:"+zy2Nq"}),value:A,options:wt.map(O=>({value:O,label:s._(Oe[O])})),onChange:u,isDropdownInModal:!0,fullWidth:!0}),(0,e.jsx)(he,{dropdownId:`${t}-expires-in-days`,label:s._({id:"KnN1Tu"}),value:C,options:Pt.map(O=>({value:O.value,label:s._(O.label)})),onChange:D,isDropdownInModal:!0,fullWidth:!0}),(0,e.jsx)(ge,{instanceId:`${t}-reason`,label:s._({id:"VJScHU"}),placeholder:s._({id:"+g90tY"}),value:o,onChange:_,maxLength:500,fullWidth:!0})]}),(0,e.jsxs)(Gt,{children:[(0,e.jsx)(Ce,{children:(0,e.jsx)(de,{onClick:N,fullWidth:!0,variant:"outline",children:s._({id:"dEgA5A"})})}),(0,e.jsx)(Ce,{children:(0,e.jsx)(de,{onClick:S,fullWidth:!0,disabled:!U||d,variant:"solid",color:"accent",children:s._({id:"nE5VAt"})})})]})]})})},Bt=({creditGrantId:t,onRevoke:r})=>{const s=`settings-admin-credit-grant-row-${t}`,{closeDropdown:i}=lt();return(0,e.jsx)(dt,{dropdownId:s,dropdownPlacement:"right-start",clickableComponent:(0,e.jsx)(et,{emphasis:"subtle","aria-label":n._({id:"3Siwmw"}),children:(0,e.jsx)(qe,{})}),dropdownComponents:(0,e.jsx)(ct,{children:(0,e.jsx)(pt,{children:(0,e.jsx)(Xe,{accent:"danger",LeftIcon:ze,text:n._({id:"GXsAby"}),onClick:()=>{r(),i(s)}})})})})},Mt={[T.COMPENSATION]:"orange",[T.SALES]:"purple",[T.ONBOARDING_REWARD]:"blue",[T.ROLLOVER]:"green"},Wt=q`
  mutation RevokeWorkspaceCreditGrant(
    $workspaceId: UUID!
    $creditGrantId: UUID!
  ) {
    revokeWorkspaceCreditGrant(
      workspaceId: $workspaceId
      creditGrantId: $creditGrantId
    ) {
      id
      amount
      type
      effectiveAt
      expiresAt
      revokedAt
      sourceGrantId
      reason
      isActive
      createdAt
    }
  }
`,$t=t=>{const r=new Map(t.map(l=>[l.id,l])),s=new Map;for(const l of t){const m=l.sourceGrantId;c(m)&&r.has(m)&&s.set(m,l)}const i=new Set,j=l=>{const m=new Set([l.id]);let A=l,u=s.get(l.id);for(;c(u)&&!m.has(u.id);)m.add(u.id),A=u,u=s.get(u.id);for(const o of m)i.add(o);return{id:l.id,current:A,origin:l}},x=t.filter(l=>!c(l.sourceGrantId)||!r.has(l.sourceGrantId)).map(j);if(i.size===t.length)return x;const f=t.filter(l=>!i.has(l.id)).map(l=>({id:l.id,current:l,origin:l}));return[...x,...f]},qt="88px 140px 88px 108px 108px 1fr 36px",Ee="revoke-credit-grant-modal",Kt="—",Ht=t=>c(t.revokedAt)?{label:{id:"xGiT1z"},color:"red"}:t.isActive?{label:{id:"F6pfE9"},color:"green"}:{label:{id:"M1RnFv"},color:"gray"},Vt=({workspaceId:t,creditGrants:r,onGrantCreditsClick:s})=>{const{i18n:i,_:j}=pe(),{formatNumber:x}=De(),{enqueueToast:f}=ue(),l=ee(),{openDialog:m}=_e(),[A,u]=(0,G.useState)(null),o=$t(r),[_,C]=(0,G.useState)(!1),[D]=me(Wt,{client:l,refetchQueries:[Ie]}),R=d=>x(d,{decimals:2}),p=d=>{u(d),m(Ee)},v=async d=>{C(!0);try{await D({variables:{workspaceId:t,creditGrantId:d}}),f({variant:"success",children:i._({id:"zH6NZT"})})}catch(h){f(ke({error:h}))}finally{C(!1),u(null)}};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(Le,{title:i._({id:"fqtGOd"}),description:i._({id:"nbyiz/"}),items:o,columns:[{label:i._({id:"hehnjM"}),Cell:({item:d})=>(0,e.jsx)(e.Fragment,{children:R(d.current.amount)})},{label:i._({id:"+zy2Nq"}),Cell:({item:d})=>(0,e.jsx)($,{color:Mt[d.current.type],children:i._(Oe[d.current.type])})},{label:i._({id:"uAQUqI"}),Cell:({item:d})=>{const h=Ht(d.current);return(0,e.jsx)($,{color:h.color,children:i._(h.label)})}},{label:i._({id:"E0rSFg"}),Cell:({item:d})=>(0,e.jsx)(e.Fragment,{children:W(d.origin.createdAt)})},{label:i._({id:"KnN1Tu"}),Cell:({item:d})=>(0,e.jsx)(e.Fragment,{children:c(d.current.expiresAt)?W(d.current.expiresAt):i._({id:"qqeAJM"})})},{label:i._({id:"VJScHU"}),overflow:"hidden",Cell:({item:d})=>(0,e.jsx)(X,{text:d.origin.reason??Kt})},{label:"",align:"right",Cell:({item:d})=>d.current.isActive?(0,e.jsx)(Bt,{creditGrantId:d.current.id,onRevoke:()=>p(d.current)}):null}],gridAutoColumns:qt,footerButtonLabel:i._({id:"5O8DG6"}),onFooterButtonClick:s}),(0,e.jsx)(nt,{dialogId:Ee,title:i._({id:"CCR+qC"}),subtitle:c(A)?i._({id:"ddMLFL",values:{0:R(A.amount)}}):"",confirmButtonText:i._({id:"GXsAby"}),loading:_,onConfirmClick:()=>{c(A)&&v(A.id)},onClose:()=>u(null)})]})},zt="—",Qt=t=>{const r=t.toUpperCase();try{return new Intl.NumberFormat("en-US",{style:"currency",currency:r}).formatToParts(0).find(s=>s.type==="currency")?.value??r}catch{return r}},Yt=({item:t,currency:r,formatNumber:s})=>{const i=[];return c(t.quantity)&&i.push(t.productKey===ce.BASE_PRODUCT?`${s(t.quantity)} ${n._({id:"AkeiJW",values:{0:t.quantity}})}`:s(t.quantity)),c(t.includedCredits)&&i.push(`${s(t.includedCredits,{abbreviate:!0,decimals:2})} ${n._({id:"xEqptn",values:{0:t.includedCredits}})}`),c(t.unitAmount)&&i.push(`${Qt(r)}${s(t.unitAmount/100,{decimals:2})}`),i.length>0?i.join(" · "):zt},Jt=k("div")({name:"StyledTagsWrapper",class:"sx9h5mh",propsAsIs:!1}),Xt=({plan:t,isTrialPeriod:r=!1})=>{const s=t===Q.PRO?{color:"sky",label:n._({id:"3fPjUY"})}:{color:"purple",label:n._({id:"ucgZ0o"})};return(0,e.jsxs)(Jt,{children:[(0,e.jsx)($,{color:s.color,children:s.label}),r&&(0,e.jsx)($,{color:"blue",preventShrink:!0,children:n._({id:"lhkaAC"})})]})},Zt="https://dashboard.stripe.com",be="—",ye="settings-admin-grant-workspace-credits",oe=k("div")({name:"StyledContainer",class:"s1hgnhrg",propsAsIs:!1}),er=k("a")({name:"StyledExternalLink",class:"s19t4op2",propsAsIs:!1}),tr=k("span")({name:"StyledMono",class:"spfurqs",propsAsIs:!1}),rr=k("div")({name:"StyledItemValue",class:"spsfm74",propsAsIs:!1}),ar={[I.Active]:"green",[I.Trialing]:"blue",[I.PastDue]:"orange",[I.Canceled]:"red",[I.Unpaid]:"red",[I.Paused]:"gray",[I.Incomplete]:"gray",[I.IncompleteExpired]:"gray"},ir={[I.Active]:"Active",[I.Trialing]:"Trialing",[I.PastDue]:"Past Due",[I.Canceled]:"Canceled",[I.Unpaid]:"Unpaid",[I.Paused]:"Paused",[I.Incomplete]:"Incomplete",[I.IncompleteExpired]:"Incomplete Expired"},sr=t=>t===Q.PRO?Q.PRO:t===Q.ENTERPRISE?Q.ENTERPRISE:null,Te=({path:t,id:r})=>(0,e.jsxs)(er,{href:`${Zt}/${t}/${r}`,target:"_blank",rel:"noopener noreferrer",children:[(0,e.jsx)(tr,{children:r}),(0,e.jsx)(Ke,{size:12})]}),nr=({workspaceId:t})=>{const{i18n:r,_:s}=pe(),{formatNumber:i}=De(),{openDialog:j}=_e(),{data:x,loading:f}=Z(Ie,{client:ee(),variables:{workspaceId:t},skip:!t});if(f)return(0,e.jsx)(oe,{children:(0,e.jsx)(we,{rowCount:6})});const l=x?.workspaceBillingAdminPanel??null;if(!l)return(0,e.jsx)(oe,{children:(0,e.jsx)(b.Root,{children:(0,e.jsx)(b.Header,{title:r._({id:"R+w/Va"}),description:r._({id:"8whThc"})})})});const{stripeCustomerId:m,creditBalance:A,creditGrants:u,subscription:o,usage:_}=l,C=S=>i(S,{abbreviate:!0,decimals:2}),D=[{Icon:ut,label:r._({id:"zHJ27S"}),value:c(m)?(0,e.jsx)(Te,{path:"customers",id:m}):be},{Icon:J,label:r._({id:"3hkXRB"}),value:c(A)?`${i(A,{abbreviate:!0,decimals:2})} ${r._({id:"UQ4Hjl"})}`:be}],R=o?.interval===xe.Month?r._({id:"+8Nek/"}):o?.interval===xe.Year?r._({id:"zkWmBh"}):null,p=(S,P)=>`${W(S)} → ${W(P)}`,v=c(o?.planKey)?sr(o.planKey):null,d=o?.status===I.Trialing,h=c(_)?[{Icon:$e,label:r._({id:"yLljbQ"}),value:`${C(_.usedCredits)} / ${C(_.totalGrantedCredits)}`},...d?[]:[{Icon:J,label:r._({id:"b2ghLW"}),value:C(_.grantedCredits)}],..._.rolloverCredits>0?[{Icon:J,label:r._({id:"fqtGOd"}),value:C(_.rolloverCredits)}]:[],{Icon:ie,label:r._({id:"6SbZqO"}),value:p(_.periodStart,_.periodEnd)}]:[],U=S=>Yt({item:S,currency:o?.currency??"",formatNumber:i}),N=o?[{Icon:Ne,label:r._({id:"Yiplcx"}),value:(0,e.jsx)(Te,{path:"subscriptions",id:o.stripeSubscriptionId})},{Icon:bt,label:r._({id:"uAQUqI"}),value:(0,e.jsx)($,{color:ar[o.status],children:ir[o.status]})},...c(v)?[{Icon:yt,label:r._({id:"GdgCoi"}),value:(0,e.jsx)(Xt,{plan:v,isTrialPeriod:d})}]:[],...c(R)?[{Icon:Tt,label:r._({id:"nJGwRf"}),value:R}]:[],{Icon:ie,label:r._({id:"nSK0mT"}),value:p(o.currentPeriodStart,o.currentPeriodEnd)},...c(o.trialStart)&&c(o.trialEnd)?[{Icon:ie,label:r._({id:"67waeA"}),value:p(o.trialStart,o.trialEnd)}]:[],...o.cancelAtPeriodEnd?[{Icon:se,label:r._({id:"2CAby/"}),value:r._({id:"l75CjT"})}]:[],...c(o.cancelAt)?[{Icon:se,label:r._({id:"zbbpgB"}),value:W(o.cancelAt)}]:[],...c(o.canceledAt)?[{Icon:se,label:r._({id:"dC0BTo"}),value:W(o.canceledAt)}]:[],...o.items.map(S=>({Icon:S.productKey===ce.BASE_PRODUCT?Pe:S.productKey===ce.RESOURCE_CREDIT?J:It,label:S.productName||r._({id:"a3Hy65"}),value:(0,e.jsxs)(rr,{children:[(0,e.jsx)("span",{children:U(S)}),c(S.productKey)&&(0,e.jsx)($,{color:"gray",children:S.productKey})]})}))]:[];return(0,e.jsxs)(oe,{children:[(0,e.jsxs)(b.Root,{children:[(0,e.jsx)(b.Header,{title:r._({id:"876pfE"}),description:r._({id:"Zk8585"})}),(0,e.jsx)(ne,{rounded:!0,items:D,gridAutoColumns:"3fr 8fr"})]}),(0,e.jsxs)(b.Root,{children:[(0,e.jsx)(b.Header,{title:r._({id:"7FaY4u"}),description:c(_)?r._({id:"Woqoyp"}):r._({id:"YrBAQE"})}),c(_)&&(0,e.jsx)(ne,{rounded:!0,items:h,gridAutoColumns:"3fr 8fr"})]}),(0,e.jsxs)(b.Root,{children:[(0,e.jsx)(b.Header,{title:r._({id:"WVzGc2"}),description:o?r._({id:"C6vAhD"}):r._({id:"glQp+P"})}),o&&(0,e.jsx)(ne,{rounded:!0,items:N,gridAutoColumns:"3fr 8fr"})]}),(0,e.jsx)(Vt,{workspaceId:t,creditGrants:u,onGrantCreditsClick:()=>j(ye)}),(0,e.jsx)(Ut,{modalInstanceId:ye,workspaceId:t})]})},or={[E.IS_ASYNC_CSV_EXPORT_ENABLED]:{label:{id:"uJmPzF"},description:{id:"/Sq+WF"}},[E.IS_APP_CLAIMING_ENABLED]:{label:{id:"gA2ZGo"},description:{id:"fWQJW/"}},[E.IS_UNIQUE_INDEXES_ENABLED]:{label:{id:"NXfWhP"},description:{id:"xfQ2i8"}},[E.IS_CONFIGURABLE_SEARCH_FIELDS_ENABLED]:{label:{id:"8/+vjg"},description:{id:"PPf/RT"}},[E.IS_JSON_FILTER_ENABLED]:{label:{id:"klrZv0"},description:{id:"G1r3UJ"}},[E.IS_MESSAGE_CAMPAIGN_ENABLED]:{label:{id:"snb/bC"},description:{id:"vs9cre"}},[E.IS_REST_METADATA_API_NEW_FORMAT_DIRECT]:{label:{id:"8n9Unw"},description:{id:"AF7Zfa"}},[E.IS_LOGIC_FUNCTION_PREBUILT_MODE_ENABLED]:{label:{id:"HslPhm"},description:{id:"8KjW3W"}},[E.IS_WORKFLOW_CORE_INDEX_PAGE_ENABLED]:{label:{id:"91e2Af"},description:{id:"40bRe+"}},[E.IS_MESSAGE_CALENDAR_TARGET_READ_ENABLED]:{label:{id:"jBzu2R"},description:{id:"c2ES/s"}},[E.IS_QUOTA_ENGINE_CREDIT_BOUND_ENABLED]:{label:{id:"NGOYJs"},description:{id:"+mx9eK"}},[E.IS_RECORD_SHARING_ENABLED]:{label:{id:"dmU8dH"},description:{id:"cLzEjc"}},[E.IS_WEBHOOK_RATE_LIMIT_ENABLED]:{label:{id:"0HuWgM"},description:{id:"OuYGr9"}}},lr=q`
  query GetAdminWorkspaceChatThreads($workspaceId: UUID!) {
    getAdminWorkspaceChatThreads(workspaceId: $workspaceId) {
      id
      title
      totalInputTokens
      totalOutputTokens
      conversationSize
      messageCount
      createdAt
      updatedAt
    }
  }
`,dr=q`
  fragment UserInfoFragment on UserInfo {
    id
    email
    firstName
    lastName
    createdAt
  }
`,je=q`
  ${dr}
  query WorkspaceLookupAdminPanel($workspaceId: UUID!) {
    workspaceLookupAdminPanel(workspaceId: $workspaceId) {
      user {
        ...UserInfoFragment
      }
      workspaces {
        id
        name
        allowImpersonation
        logo
        totalUsers
        activationStatus
        createdAt
        workspaceUrls {
          customUrl
          subdomainUrl
        }
        users {
          id
          email
          firstName
          lastName
          avatarUrl
        }
        featureFlags {
          key
          value
        }
      }
    }
  }
`,cr=()=>{const[t,r]=Ye(Re);return{updateFeatureFlagState:(i,j,x)=>{c(t)&&t.id===i&&r({...t,featureFlags:t.featureFlags?.map(f=>f.key===j?{...f,value:x}:f)})}}},pr=We(),ur=()=>Qe,mr=k(ur())({name:"StyledFeatureFlagName",class:"slxepg4",propsAsIs:!0}),le="settings-admin-workspace-detail-tabs",y={INFO:"info",BILLING:"billing",MEMBERS:"members",FEATURE_FLAGS:"feature-flags",CHATS:"chats"},_r=k("div")({name:"StyledTabPanel",class:"s1kjun7d",propsAsIs:!1}),Ca=()=>{const{workspaceId:t}=Be(),r=ee(),s=rt(ot,le),i=V(it),j=V(Re),x=V(st),f=V(_t),l=x?.isBillingEnabled??!1,m=V(mt),{enqueueToast:A}=ue(),{updateFeatureFlagState:u}=cr(),{handleImpersonate:o,impersonatingUserId:_}=Nt(),[C]=me(Et,{client:r,refetchQueries:[{query:je,variables:{workspaceId:t}}]}),{data:D,loading:R}=Z(je,{client:r,variables:{workspaceId:t},skip:!t}),p=D?.workspaceLookupAdminPanel?.workspaces?.[0],v=s||y.INFO,{data:d,loading:h}=Z(lr,{client:r,variables:{workspaceId:t},skip:!t||!p?.allowImpersonation||v!==y.CHATS}),{data:U}=Z(ht,{client:r,variables:{workspaceIds:t?[t]:[]},skip:!t,fetchPolicy:"network-only"}),N=d?.getAdminWorkspaceChatThreads??[],S=async(a,g)=>{if(!t)return;const L=p?.featureFlags?.find(H=>H.key===a)?.value;u(t,a,g),await C({variables:{workspaceId:t,featureFlag:a,value:g},onError:H=>{c(L)&&u(t,a,L),A({variant:"error",children:`Failed to update feature flag. ${H.message}`})}})},P=[{id:y.INFO,title:n._({id:"CE+M2e"}),Icon:xt},...l?[{id:y.BILLING,title:n._({id:"R+w/Va"}),Icon:Ne}]:[],...i?.canImpersonate?[{id:y.MEMBERS,title:n._({id:"wlQNTg"}),Icon:Pe}]:[],...m?[{id:y.FEATURE_FLAGS,title:n._({id:"+ZqAYI"}),Icon:Ve}]:[],...p?.allowImpersonation?[{id:y.CHATS,title:n._({id:"8Q+lLG"}),Icon:gt}]:[]],w=p?.name||t||"",B=(0,pr.isNonEmptyString)(p?.logo)?p.logo:Ct,K=(p?.featureFlags??[]).flatMap(a=>{if(!c(a.key))return[];const g=or[a.key],L=f.find(te=>te.key===a.key)?.metadata,H=j?.id===t?j?.featureFlags?.find(te=>te.key===a.key)?.value:void 0;return[{id:a.key,label:L?.label??(c(g)?n._(g.label):a.key),description:L?.description??(c(g)?n._(g.description):""),value:H??a.value}]}),O=[{label:n._({id:"6YtxFj"}),overflow:"hidden",Cell:({item:a})=>(0,e.jsx)(mr,{children:(0,e.jsx)(X,{text:(0,e.jsx)(e.Fragment,{children:a.label}),tooltipContent:a.id,tooltipPlace:"top",alwaysShowTooltip:!0,isFocusable:!0})})},{label:n._({id:"Nu4oKW"}),overflow:"hidden",Cell:({item:a})=>(0,e.jsx)(X,{text:a.description,isTooltipMultiline:!0,isFocusable:!0})},{label:n._({id:"uAQUqI"}),align:"right",Cell:({item:a})=>(0,e.jsx)(Je,{"aria-label":a.label,"aria-description":a.description,checked:a.value,onCheckedChange:g=>S(a.id,g)})}];return R?(0,e.jsx)(St,{}):(0,e.jsx)(ft,{componentInstanceId:le,children:(0,e.jsx)(At,{title:w,icon:(0,e.jsx)(Se,{src:fe(B),name:w,colorSeed:p?.id,size:"md"}),links:[{children:n._({id:"/IX/7x"}),href:ae(re.AdminPanel)},{children:n._({id:"05jO4l"}),href:Rt},{children:w}],secondaryBar:(0,e.jsx)(kt,{"aria-label":n._({id:"KNUGRD"}),tabs:P,behaveAsLinks:!1,componentInstanceId:le}),children:(0,e.jsx)(Ze.Panel,{value:v,render:(0,e.jsx)(_r,{}),children:(0,e.jsxs)(vt,{children:[v===y.INFO&&p&&(0,e.jsx)(Dt,{activeWorkspace:p,workspaceUpgradeStatus:U?.getUpgradeStatus?.find(a=>a?.workspaceId===t)}),v===y.BILLING&&l&&t&&(0,e.jsx)(nr,{workspaceId:t}),v===y.MEMBERS&&p&&(0,e.jsxs)(b.Root,{children:[(0,e.jsx)(b.Header,{title:n._({id:"wlQNTg"}),description:n._({id:"wtxjAY"})}),(0,e.jsx)(ve,{children:(0,e.jsxs)(jt,{children:[(0,e.jsxs)(z,{gridTemplateColumns:"1fr 2fr 100px",children:[(0,e.jsx)(M,{children:n._({id:"6YtxFj"})}),(0,e.jsx)(M,{children:n._({id:"O3oNi5"})}),(0,e.jsx)(M,{align:"right",children:n._({id:"7L01XJ"})})]}),p.users?.map(a=>{const g=a.id;return c(g)?(0,e.jsxs)(z,{gridTemplateColumns:"1fr 2fr 100px",to:ae(re.AdminPanelUserDetail,{userId:g}),children:[(0,e.jsxs)(F,{color:Y.font.color.primary,gap:Y.spacing[2],overflow:"hidden",children:[(0,e.jsx)(Se,{src:fe(a.avatarUrl),name:`${a.firstName||""} ${a.lastName||""}`.trim()||a.email,colorSeed:a.id,size:"md",shape:"circle"}),(0,e.jsx)(X,{text:`${a.firstName||""} ${a.lastName||""}`.trim()||"—"})]}),(0,e.jsx)(F,{children:a.email}),(0,e.jsx)(F,{align:"right",children:p.allowImpersonation&&c(i?.id)&&g!==i.id&&(0,e.jsx)(de,{startIcon:(0,e.jsx)(He,{}),size:"sm",onClick:L=>{L.preventDefault(),L.stopPropagation(),o(g,t)},disabled:_===g,variant:"outline",children:n._({id:"tSVr6t"})})})]},g):null})]})})]}),v===y.FEATURE_FLAGS&&p&&(0,e.jsx)(Le,{title:n._({id:"+ZqAYI"}),description:n._({id:"Dt05oz"}),gridAutoColumns:"minmax(0, 240px) minmax(0, 1fr) 56px",items:K,columns:O}),v===y.CHATS&&(0,e.jsxs)(b.Root,{children:[(0,e.jsx)(b.Header,{title:n._({id:"jTS+KY"}),description:n._({id:"qiD/6r"})}),h?(0,e.jsx)(we,{}):N.length===0?(0,e.jsx)(tt,{rounded:!0,children:(0,e.jsx)(z,{gridTemplateColumns:"1fr",children:(0,e.jsx)(F,{color:Y.font.color.tertiary,align:"center",children:n._({id:"NjIy4U"})})})}):(0,e.jsxs)(ve,{children:[(0,e.jsxs)(z,{gridTemplateColumns:"1fr 120px 120px",children:[(0,e.jsx)(M,{children:n._({id:"MHrjPM"})}),(0,e.jsx)(M,{align:"right",children:n._({id:"t7TeQU"})}),(0,e.jsx)(M,{align:"right",children:n._({id:"+b7T3G"})})]}),N.map(a=>(0,e.jsxs)(z,{gridTemplateColumns:"1fr 120px 120px",to:ae(re.AdminPanelWorkspaceChatThread,{workspaceId:t??"",threadId:a.id}),children:[(0,e.jsx)(F,{color:Y.font.color.primary,children:a.title||n._({id:"wja8aL"})}),(0,e.jsx)(F,{align:"right",children:a.messageCount}),(0,e.jsx)(F,{align:"right",children:new Date(a.updatedAt).toLocaleDateString()})]},a.id))]})]})]})})})})};export{Ca as SettingsAdminWorkspaceDetail};

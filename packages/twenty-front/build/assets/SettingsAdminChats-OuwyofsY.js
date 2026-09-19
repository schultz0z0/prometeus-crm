import{t as q}from"./jsx-runtime-BmDUFisN.js";import{u as R}from"./types-Blk92mP1-Bs1i4Xbw.js";import{t as u}from"./dist-x6yBUqMs.js";import{t as z}from"./build-CngeiE9P.js";import{o as X}from"./theme-constants-C9fJFNSg-DoDi4Hx_.js";import{t as l}from"./isDefined-Dtu5EYqP-_d6Dqdoe.js";import{Xt as O,Y as $}from"./utils-Cw5oo35x-DwNpgVj_.js";import{t as B}from"./createAtomState-CIJqqZRg.js";import{t}from"./dist-Cg5OofxW.js";import{i as Y}from"./IconSquareRoundedCheck-_QjQzihg.js";import{t as Z}from"./IconDotsVertical-B8pBwOxf.js";import{t as V}from"./IconSparkles-DuCLe6KO.js";import{r as j}from"./OverflowingTextWithTooltip-gawTMkMa-DHyYm06o.js";import{t as k}from"./useAtomState-t25i5gHy.js";import{r as J}from"./Switch-DkXpJDzt-DpjCSYQl.js";import{p as K}from"./input-CtDoGeuQ-UUGdrh1x.js";import{a as _,s as M}from"./components-BYDupVW5-BeXao-8V.js";import{_ as E}from"./data-display-qV4jqvQ8-B-u65c3O.js";import{p as ee}from"./feedback-CLmXe9DE-CHNztUDP.js";import{t as re}from"./index.module-BcHbo21h.js";import{t as te}from"./lib-C3IpGLsk.js";import{t as ae}from"./useQuery-klx7Id1G.js";import{t as se}from"./useAtomFamilyStateValue-DpWKflfw.js";import{t as ie}from"./Table-B46Zylx7.js";import{t as i}from"./TableCell-Chqrkjg2.js";import{t as c}from"./TableHeader-DXdlSysm.js";import{t as L}from"./TableRow-BxQGet4t.js";import{t as oe}from"./Dropdown-Cty1eDgu.js";import{n as ne,t as de}from"./DropdownMenuItemsContainer-CZFqkfAF.js";import{D as d,E as v,T as F,al as le,gf as me,nl as he}from"./index-Djy9izhi.js";import{t as ce}from"./useApolloAdminClient-CchFhePq.js";import{t as pe}from"./TableBody-DIvn_7WK.js";import{n as ue,t as b}from"./SortableTableHeader-Cf2D3oRl.js";import{t as I}from"./SettingsEmptyPlaceholder-Dzjnl_5W.js";import{t as ge}from"./AiAdminPath-CGKhk6Lg.js";var e=q(),P="1fr 1fr 1fr 80px 80px 110px 90px",p="settings-admin-chats-table",w=z(),fe=u("div")({name:"StyledFlagsContainer",class:"s18clrs0",propsAsIs:!1}),ye=u("span")({name:"StyledZeroReplies",class:"s1vygaax",propsAsIs:!1}),Ce=({thread:r})=>(0,e.jsxs)(L,{to:$(R.AdminPanelWorkspaceChatThread,{workspaceId:r.workspaceId,threadId:r.id}),gridAutoColumns:P,isClickable:!0,children:[(0,e.jsx)(i,{minWidth:"0",overflow:"hidden",children:(0,e.jsx)(j,{text:(0,w.isNonEmptyString)(r.workspaceDisplayName)?r.workspaceDisplayName:r.workspaceId})}),(0,e.jsx)(i,{minWidth:"0",overflow:"hidden",children:(0,e.jsx)(j,{text:(0,w.isNonEmptyString)(r.userEmail)?r.userEmail:"-"})}),(0,e.jsx)(i,{color:X.font.color.primary,minWidth:"0",overflow:"hidden",children:(0,e.jsx)(j,{text:(0,w.isNonEmptyString)(r.title)?r.title:t._({id:"wja8aL"})})}),(0,e.jsx)(i,{align:"right",children:r.messageCount}),(0,e.jsx)(i,{align:"right",children:r.userReplyCount===0?(0,e.jsx)(ye,{children:r.userReplyCount}):r.userReplyCount}),(0,e.jsx)(i,{minWidth:"0",overflow:"hidden",children:(0,e.jsxs)(fe,{children:[r.hasError&&(0,e.jsx)(E,{color:"red",children:t._({id:"SlfejT"})}),l(r.deletedAt)&&(0,e.jsx)(E,{color:"gray",children:t._({id:"TdfEV7"})}),r.isOnboardingThread&&(0,e.jsx)(E,{color:"blue",children:t._({id:"gukxZ5"})})]})}),(0,e.jsx)(i,{align:"right",children:new Date(r.createdAt).toLocaleDateString()})]}),Se=({threads:r})=>(0,e.jsxs)(ie,{children:[(0,e.jsxs)(L,{gridAutoColumns:P,children:[(0,e.jsx)(c,{children:t._({id:"pmUArF"})}),(0,e.jsx)(c,{children:t._({id:"7PzzBU"})}),(0,e.jsx)(c,{children:t._({id:"MHrjPM"})}),(0,e.jsx)(b,{tableId:p,fieldName:d.MESSAGE_COUNT,label:t._({id:"XXzjfC"}),align:"right"}),(0,e.jsx)(b,{tableId:p,fieldName:d.REPLY_COUNT,label:t._({id:"N8UzTV"}),align:"right"}),(0,e.jsx)(c,{children:t._({id:"Xgkhyj"})}),(0,e.jsx)(b,{tableId:p,fieldName:d.CREATED_AT,label:t._({id:"d+F6q9"}),align:"right",initialSort:{fieldName:d.CREATED_AT,direction:"desc"}})]}),(0,e.jsx)(pe,{children:r.map(a=>(0,e.jsx)(Ce,{thread:a},a.id))})]}),Ae=u("div")({name:"StyledTableContainer",class:"sglm1yl",propsAsIs:!1}),Te=({threads:r,loading:a,error:s})=>l(s)?(0,e.jsx)(I,{children:t._({id:"UYDPfv"})}):a&&!O(r)?(0,e.jsx)(I,{children:t._({id:"UDL15Z"})}):O(r)?(0,e.jsx)(Ae,{children:(0,e.jsx)(Se,{threads:r})}):(0,e.jsx)(I,{children:t._({id:"nU13WY"})}),xe=({filterButton:r,filters:a,onFiltersChange:s})=>(0,e.jsx)(oe,{dropdownId:"settings-admin-chats-filter-dropdown",dropdownPlacement:"bottom-end",dropdownOffset:{x:0,y:8},clickableComponent:r,dropdownComponents:(0,e.jsx)(ne,{children:(0,e.jsxs)(de,{children:[(0,e.jsx)(_,{startIcon:(0,e.jsx)(V,{}),onCheckedChange:()=>s({...a,onboardingOnly:!a.onboardingOnly}),checked:a.onboardingOnly,children:t._({id:"uahNQ+"})}),(0,e.jsx)(_,{startIcon:(0,e.jsx)(Y,{}),onCheckedChange:()=>s({...a,hasErrorOnly:!a.hasErrorOnly}),checked:a.hasErrorOnly,children:t._({id:"fQoUMw"})}),(0,e.jsx)(_,{startIcon:(0,e.jsx)(me,{}),onCheckedChange:()=>s({...a,userNeverEngagedOnly:!a.userNeverEngagedOnly}),checked:a.userNeverEngagedOnly,children:t._({id:"ywC9IM"})})]})})}),je={onboardingOnly:!1,hasErrorOnly:!1,userNeverEngagedOnly:!1},_e=B({key:"adminChatsFilterState",defaultValue:je}),Ee=B({key:"adminChatsSearchQueryState",defaultValue:""}),ve=r=>Object.values(d).includes(r),be=r=>!l(r)||!ve(r.fieldName)?{sortBy:d.CREATED_AT,sortDirection:v.DESC}:{sortBy:r.fieldName,sortDirection:r.direction==="asc"?v.ASC:v.DESC},Ie=te`
  query GetAdminChatThreads(
    $scope: AdminChatThreadScope
    $hasErrorOnly: Boolean
    $userNeverEngagedOnly: Boolean
    $searchTerm: String
    $sortBy: AdminChatThreadSortField
    $sortDirection: AdminChatThreadSortDirection
    $limit: Int
    $offset: Int
  ) {
    getAdminChatThreads(
      scope: $scope
      hasErrorOnly: $hasErrorOnly
      userNeverEngagedOnly: $userNeverEngagedOnly
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortDirection: $sortDirection
      limit: $limit
      offset: $offset
    ) {
      totalCount
      hasMore
      threads {
        id
        title
        workspaceId
        workspaceDisplayName
        userWorkspaceId
        userEmail
        userFirstName
        userLastName
        messageCount
        userReplyCount
        hasError
        isOnboardingThread
        deletedAt
        createdAt
        updatedAt
      }
    }
  }
`,Q=25,we=()=>{const r=ce(),{enqueueToast:a}=ee(),[s,g]=k(Ee),[m]=re(s,300),[o,f]=k(_e),{sortBy:y,sortDirection:C}=be(se(ue,{tableId:p})),{data:n,loading:h,error:S,fetchMore:H}=ae(Ie,{client:r,notifyOnNetworkStatusChange:!0,variables:{limit:Q,offset:0,searchTerm:m,scope:o.onboardingOnly?F.ONBOARDING:F.ALL,hasErrorOnly:o.hasErrorOnly,userNeverEngagedOnly:o.userNeverEngagedOnly,sortBy:y,sortDirection:C}}),D=n?.getAdminChatThreads.threads??[],G=n?.getAdminChatThreads.totalCount??0,U=n?.getAdminChatThreads.hasMore??!1,N=h||s!==m;return{searchQuery:s,setSearchQuery:g,filters:o,setFilters:f,threads:D,totalCount:G,hasMore:U,loading:h,isShowMoreDisabled:N,error:S,handleShowMore:async()=>{if(!N)try{await H({variables:{limit:Q,offset:D.length},updateQuery:(A,{fetchMoreResult:T})=>{if(!l(T))return A;const W=new Set(A.getAdminChatThreads.threads.map(x=>x.id));return{getAdminChatThreads:{...T.getAdminChatThreads,threads:[...A.getAdminChatThreads.threads,...T.getAdminChatThreads.threads.filter(x=>!W.has(x.id))]}}}})}catch{a({variant:"error",children:t._({id:"HYRl4P"})})}}}},De=u("div")({name:"StyledShowMoreContainer",class:"s2ap62f",propsAsIs:!1}),pr=()=>{const{searchQuery:r,setSearchQuery:a,filters:s,setFilters:g,threads:m,totalCount:o,hasMore:f,loading:y,isShowMoreDisabled:C,error:n,handleShowMore:h}=we();return(0,e.jsx)(le,{links:[{children:t._({id:"/IX/7x"}),href:$(R.AdminPanel)},{children:t._({id:"05jO4l"}),href:ge},{children:t._({id:"8Q+lLG"})}],children:(0,e.jsx)(he,{children:(0,e.jsxs)(M.Root,{children:[(0,e.jsx)(M.Header,{title:t._({id:"8Q+lLG"}),description:t._({id:"041SWy",values:{totalCount:o}})}),(0,e.jsx)(K,{placeholder:t._({id:"MS72xQ"}),value:r,onChange:a,filterDropdown:S=>(0,e.jsx)(xe,{filterButton:S,filters:s,onFiltersChange:g})}),(0,e.jsx)(Te,{threads:m,loading:y,error:n}),f&&!l(n)&&(0,e.jsx)(De,{children:(0,e.jsx)(J,{startIcon:(0,e.jsx)(Z,{}),onClick:h,disabled:C,size:"sm",variant:"outline",children:t._({id:"fMPkxb"})})})]})})})};export{pr as SettingsAdminChats};

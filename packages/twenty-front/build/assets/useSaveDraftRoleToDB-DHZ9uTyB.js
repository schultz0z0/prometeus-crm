import{o as X}from"./chunk-ChpBd9eV.js";import{t as Z}from"./react-M6yZRsSc.js";import{t as z}from"./build-CngeiE9P.js";import{u as H}from"./routedFlowStateScopeRegistry-DGhefLBQ.js";import{t as l}from"./isDefined-Dtu5EYqP-_d6Dqdoe.js";import{Xt as G}from"./utils-Cw5oo35x-DwNpgVj_.js";import{n as ee}from"./RoutedFlowStateScopeContext--w660x4n.js";import{Bi as ae,Z as te,aa as se,d as oe,ea as re,f as ie,oa as ne,sa as de}from"./graphql-DNS_baJt.js";import{t as P}from"./lib-C3IpGLsk.js";import{t as g}from"./useMutation-Ds2Pb-th.js";import{t as ce}from"./isDeeplyEqual-C4A-fM4o.js";import{t as j}from"./useAtomFamilyStateValue-DpWKflfw.js";import{t as D}from"./useSetAtomFamilyState-CD6ukUd6.js";import{t as le}from"./immer-Da4Ov0Ly.js";import{Dr as A}from"./index-DXFJtAay.js";import{i as N}from"./SettingsRolesQueryEffect-BXqaIK7l.js";import{n as w}from"./useGetObjectPermissionDerivedStates-BS1sEKIl.js";var pe=P`
  fragment AgentFields on Agent {
    id
    name
    label
    description
    icon
    prompt
    modelId
    responseFormat
    roleId
    isCustom
    modelConfiguration
    evaluationInputs
    applicationId
    createdAt
    updatedAt
  }
`,me=P`
  fragment ApiKeyForRoleFragment on ApiKeyForRole {
    id
    name
    expiresAt
    revokedAt
  }
`,Re=P`
  fragment FieldPermissionFragment on FieldPermission {
    objectMetadataId
    fieldMetadataId
    canReadFieldValue
    canUpdateFieldValue
    id
    roleId
  }
`,_=P`
  fragment RowLevelPermissionPredicateFragment on RowLevelPermissionPredicate {
    id
    fieldMetadataId
    objectMetadataId
    operand
    subFieldName
    workspaceMemberFieldMetadataId
    workspaceMemberSubFieldName
    rowLevelPermissionPredicateGroupId
    positionInRowLevelPermissionPredicateGroup
    roleId
    value
  }
`,k=P`
  fragment RowLevelPermissionPredicateGroupFragment on RowLevelPermissionPredicateGroup {
    id
    parentRowLevelPermissionPredicateGroupId
    logicalOperator
    positionInRowLevelPermissionPredicateGroup
    roleId
    objectMetadataId
  }
`,ue=P`
  fragment ObjectPermissionFragment on ObjectPermission {
    objectMetadataId
    canReadObjectRecords
    canUpdateObjectRecords
    canSoftDeleteObjectRecords
    canDestroyObjectRecords
    restrictedFields
    rowLevelPermissionPredicates {
      ...RowLevelPermissionPredicateFragment
    }
    rowLevelPermissionPredicateGroups {
      ...RowLevelPermissionPredicateGroupFragment
    }
  }
  ${_}
  ${k}
`,Pe=P`
  fragment RolePermissionFlagFragment on RolePermissionFlag {
    id
    flag
    roleId
  }
`,fe=P`
  fragment RoleFragment on Role {
    id
    label
    description
    icon
    canUpdateAllSettings
    canAccessAllTools
    isEditable
    canReadAllObjectRecords
    canUpdateAllObjectRecords
    canSoftDeleteAllObjectRecords
    canDestroyAllObjectRecords
    canBeAssignedToUsers
    canBeAssignedToAgents
    canBeAssignedToApiKeys
  }
`,Ae=P`
  fragment PartialWorkspaceMemberQueryFragment on WorkspaceMember {
    id
    name {
      firstName
      lastName
    }
    avatarUrl
    userEmail
    userWorkspaceId
  }
`,b=P`
  ${Ae}
  ${fe}
  ${pe}
  ${me}
  ${Pe}
  ${ue}
  ${Re}
  ${_}
  ${k}
  query GetRoles {
    getRoles {
      ...RoleFragment
      workspaceMembers {
        ...PartialWorkspaceMemberQueryFragment
      }
      agents {
        ...AgentFields
      }
      apiKeys {
        ...ApiKeyForRoleFragment
      }
      permissionFlags {
        ...RolePermissionFlagFragment
      }
      objectPermissions {
        ...ObjectPermissionFragment
      }
      fieldPermissions {
        ...FieldPermissionFragment
      }
      rowLevelPermissionPredicates {
        ...RowLevelPermissionPredicateFragment
      }
      rowLevelPermissionPredicateGroups {
        ...RowLevelPermissionPredicateGroupFragment
      }
    }
  }
`,be=P`
  ${_}
  ${k}
  mutation UpsertRowLevelPermissionPredicates(
    $input: UpsertRowLevelPermissionPredicatesInput!
  ) {
    upsertRowLevelPermissionPredicates(input: $input) {
      predicates {
        ...RowLevelPermissionPredicateFragment
      }
      predicateGroups {
        ...RowLevelPermissionPredicateGroupFragment
      }
    }
  }
`,ge=()=>g(be),ve=e=>{const i=j(w,e),o=D(w,e),[n]=g(oe);return{addAgentToRoleAndUpdateState:async({agentId:p})=>{const{data:d}=await n({variables:{agentId:p,roleId:e},awaitRefetchQueries:!0,refetchQueries:["GetRoles"]});return d?.assignRoleToAgent},updateAgentRoleDraftState:({agent:p})=>{o({...i,agents:[...i.agents,p]})},addAgentsToRole:async({roleId:p,agentIds:d})=>{await Promise.all(d.map(u=>n({variables:{roleId:p,agentId:u}})))}}},Fe=e=>{const i=j(w,e),o=D(w,e),[n]=g(ie);return{addApiKeyToRoleAndUpdateState:async({apiKeyId:p})=>{const{data:d}=await n({variables:{apiKeyId:p,roleId:e},awaitRefetchQueries:!0,refetchQueries:["GetRoles"]});return d?.assignRoleToApiKey},updateApiKeyRoleDraftState:({apiKey:p})=>{o({...i,apiKeys:[...i.apiKeys,p]})},addApiKeysToRole:async({roleId:p,apiKeyIds:d})=>{await Promise.all(d.map(u=>n({variables:{roleId:p,apiKeyId:u}})))}}},we=e=>{const i=D(N,e),o=j(w,e),n=D(w,e),[c]=g(re);return{addWorkspaceMemberToRoleAndUpdateState:async({workspaceMemberId:d})=>{const{data:u}=await c({variables:{workspaceMemberId:d,roleId:e}});if(u?.updateWorkspaceMemberRole!==void 0){const v=u.updateWorkspaceMemberRole,U=[...o.workspaceMembers,{id:v.id,name:v.name,colorScheme:v.colorScheme,userEmail:v.userEmail}],M={...o,workspaceMembers:U};i(M),n(M)}return u?.updateWorkspaceMemberRole},updateWorkspaceMemberRoleDraftState:({workspaceMember:d})=>{n({...o,workspaceMembers:[...o.workspaceMembers,{id:d.id,name:d.name,userEmail:d.userEmail,avatarUrl:d.avatarUrl}]})},addWorkspaceMembersToRole:async({roleId:d,workspaceMemberIds:u})=>{await Promise.all(u.map(v=>c({variables:{roleId:d,workspaceMemberId:v}})))}}},Ie=z(),Me=(e,i)=>le(e,o=>{if(!(0,Ie.isNonEmptyArray)(o.fieldPermissions))return;const n=o.fieldPermissions.findIndex(c=>c.fieldMetadataId===i);return n>-1&&o.fieldPermissions.splice(n,1),o}),Oe=X(Z(),1),je=()=>{const e=H(),i=ee();return{removeFieldPermissionInDraftRole:(0,Oe.useCallback)((o,n)=>{const c=w.getAtom(o,i),f=Me(e.get(c),n);e.set(c,f)},[i,e])}},Te=(e,i)=>{const o=i?.find(n=>n.fieldMetadataId===e.fieldMetadataId);return o?e.canReadFieldValue!==o.canReadFieldValue||e.canUpdateFieldValue!==o.canUpdateFieldValue:!0},ye=(e,i)=>{if(!i)return Object.fromEntries(Object.entries(e).filter(([,c])=>c!==void 0));const o={},n=new Set([...Object.keys(e),...Object.keys(i)]);for(const c of n){const f=e[c],I=i[c];ce(f,I)||(o[c]=f)}return o},Se=["label","description","icon","canUpdateAllSettings","canAccessAllTools","canReadAllObjectRecords","canUpdateAllObjectRecords","canSoftDeleteAllObjectRecords","canDestroyAllObjectRecords","canBeAssignedToUsers","canBeAssignedToAgents","canBeAssignedToApiKeys"],Ye=({roleId:e,isCreateMode:i,onSuccess:o})=>{const[n]=g(te),[c]=g(ae),[f]=g(de),[I]=g(ne),[p]=g(se),[d]=ge(),{addWorkspaceMembersToRole:u}=we(e),{addAgentsToRole:v}=ve(e),{addApiKeysToRole:U}=Fe(e),M=j(N,e),a=j(w,e),m=ye(a,M),L=a.fieldPermissions?.filter(t=>{const s=!M?.fieldPermissions?.some(y=>y.fieldMetadataId===t.fieldMetadataId);return t.canReadFieldValue!==!1&&t.canUpdateFieldValue!==!1&&s}),T=(m.fieldPermissions?.filter(t=>!L?.some(s=>t.fieldMetadataId===s.fieldMetadataId))??[]).filter(t=>Te(t,M?.fieldPermissions)),{removeFieldPermissionInDraftRole:W}=je(),h=()=>{if(G(L)===!0)for(const t of L)W(e,t.fieldMetadataId)},V=async()=>{const{data:t}=await n({variables:{createRoleInput:{id:e,label:a.label,description:a.description,icon:a.icon,canUpdateAllSettings:a.canUpdateAllSettings,canAccessAllTools:a.canAccessAllTools,canReadAllObjectRecords:a.canReadAllObjectRecords,canUpdateAllObjectRecords:a.canUpdateAllObjectRecords,canSoftDeleteAllObjectRecords:a.canSoftDeleteAllObjectRecords,canDestroyAllObjectRecords:a.canDestroyAllObjectRecords,canBeAssignedToUsers:a.canBeAssignedToUsers,canBeAssignedToAgents:a.canBeAssignedToAgents,canBeAssignedToApiKeys:a.canBeAssignedToApiKeys}},refetchQueries:[A(b)??""]});if(!t)return;const s=t.createOneRole.id;await $(s),await C(s),l(o)&&await o(s)},Q=async()=>{l(m.permissionFlags)&&await f({variables:{upsertPermissionFlagsInput:{roleId:e,permissionFlagKeys:a.permissionFlags?.map(t=>t.flag)??[]}},refetchQueries:[A(b)??""]}),Se.some(t=>t in m)&&await c({variables:{updateRoleInput:{id:e,update:{label:a.label,description:a.description,icon:a.icon,canUpdateAllSettings:a.canUpdateAllSettings,canAccessAllTools:a.canAccessAllTools,canReadAllObjectRecords:a.canReadAllObjectRecords,canUpdateAllObjectRecords:a.canUpdateAllObjectRecords,canSoftDeleteAllObjectRecords:a.canSoftDeleteAllObjectRecords,canDestroyAllObjectRecords:a.canDestroyAllObjectRecords,canBeAssignedToUsers:a.canBeAssignedToUsers,canBeAssignedToAgents:a.canBeAssignedToAgents,canBeAssignedToApiKeys:a.canBeAssignedToApiKeys}}},refetchQueries:[A(b)??""]}),l(m.objectPermissions)&&await I({variables:{upsertObjectPermissionsInput:{roleId:e,objectPermissions:a.objectPermissions?.map(t=>({objectMetadataId:t.objectMetadataId,canReadObjectRecords:t.canReadObjectRecords,canUpdateObjectRecords:t.canUpdateObjectRecords,canSoftDeleteObjectRecords:t.canSoftDeleteObjectRecords,canDestroyObjectRecords:t.canDestroyObjectRecords}))??[]}},refetchQueries:[A(b)??""]}),G(T)===!0&&await p({variables:{upsertFieldPermissionsInput:{roleId:e,fieldPermissions:T.map(t=>({objectMetadataId:t.objectMetadataId,fieldMetadataId:t.fieldMetadataId,canReadFieldValue:t.canReadFieldValue,canUpdateFieldValue:t.canUpdateFieldValue}))??[]}},refetchQueries:[A(b)??""]}),(l(m.rowLevelPermissionPredicates)||l(m.rowLevelPermissionPredicateGroups))&&await K(e)},K=async t=>{const s=a.rowLevelPermissionPredicates??[],y=a.rowLevelPermissionPredicateGroups??[],E=s.reduce((R,O)=>{const F=O.objectMetadataId;return l(R[F])||(R[F]=[]),R[F].push(O),R},{}),x=M?.rowLevelPermissionPredicates??[],q=new Set(x.map(R=>R.objectMetadataId));for(const R of q)l(E[R])||(E[R]=[]);for(const[R,O]of Object.entries(E)){const F=new Set(O.map(r=>r.rowLevelPermissionPredicateGroupId).filter(l)),B=r=>{const S=y.find(J=>J.id===r);l(S?.parentRowLevelPermissionPredicateGroupId)&&!F.has(S.parentRowLevelPermissionPredicateGroupId)&&(F.add(S.parentRowLevelPermissionPredicateGroupId),B(S.parentRowLevelPermissionPredicateGroupId))};for(const r of F)B(r);const Y=y.filter(r=>F.has(r.id));await d({variables:{input:{roleId:t,objectMetadataId:R,predicates:O.map(r=>({id:r.id,fieldMetadataId:r.fieldMetadataId,operand:r.operand,value:r.value,subFieldName:r.subFieldName,workspaceMemberFieldMetadataId:r.workspaceMemberFieldMetadataId,workspaceMemberSubFieldName:r.workspaceMemberSubFieldName,rowLevelPermissionPredicateGroupId:r.rowLevelPermissionPredicateGroupId,positionInRowLevelPermissionPredicateGroup:r.positionInRowLevelPermissionPredicateGroup})),predicateGroups:Y.map(r=>({id:r.id,objectMetadataId:R,parentRowLevelPermissionPredicateGroupId:r.parentRowLevelPermissionPredicateGroupId,logicalOperator:r.logicalOperator,positionInRowLevelPermissionPredicateGroup:r.positionInRowLevelPermissionPredicateGroup}))}},refetchQueries:[A(b)??""],awaitRefetchQueries:!0})}},$=async t=>{l(m.permissionFlags)&&await f({variables:{upsertPermissionFlagsInput:{roleId:t,permissionFlagKeys:a.permissionFlags?.map(s=>s.flag)??[]}},refetchQueries:[A(b)??""]}),l(m.objectPermissions)&&await I({variables:{upsertObjectPermissionsInput:{roleId:t,objectPermissions:a.objectPermissions?.map(s=>({objectMetadataId:s.objectMetadataId,canReadObjectRecords:s.canReadObjectRecords,canUpdateObjectRecords:s.canUpdateObjectRecords,canSoftDeleteObjectRecords:s.canSoftDeleteObjectRecords,canDestroyObjectRecords:s.canDestroyObjectRecords}))??[]}},refetchQueries:[A(b)??""]}),G(T)===!0&&await p({variables:{upsertFieldPermissionsInput:{roleId:t,fieldPermissions:T.map(s=>({objectMetadataId:s.objectMetadataId,fieldMetadataId:s.fieldMetadataId,canReadFieldValue:s.canReadFieldValue,canUpdateFieldValue:s.canUpdateFieldValue}))??[]}},refetchQueries:[A(b)??""]}),(l(m.rowLevelPermissionPredicates)||l(m.rowLevelPermissionPredicateGroups))&&await K(t)},C=async t=>{l(m.workspaceMembers)&&a.canBeAssignedToUsers&&await u({roleId:t,workspaceMemberIds:a.workspaceMembers.map(s=>s.id)}),l(m.agents)&&a.canBeAssignedToAgents&&await v({roleId:t,agentIds:a.agents.map(s=>s.id)}),l(m.apiKeys)&&a.canBeAssignedToApiKeys&&await U({roleId:t,apiKeyIds:a.apiKeys.map(s=>s.id)}),l(o)&&await o(e)};return{saveDraftRoleToDB:async()=>{h(),i?await V():await Q()}}};export{ve as a,Fe as i,ye as n,b as o,we as r,Ye as t};

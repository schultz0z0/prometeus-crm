import{t as y}from"./isDefined-Dtu5EYqP-_d6Dqdoe.js";import{t as g}from"./lib-C3IpGLsk.js";import{t as i}from"./useMutation-Ds2Pb-th.js";import{Eu as u,L as C,R as p,gt as D}from"./index-Djy9izhi.js";import{t as V}from"./useApolloAdminClient-CchFhePq.js";var r=g`
  query GetDatabaseConfigVariable($key: String!) {
    getDatabaseConfigVariable(key: $key) {
      name
      description
      value
      isSensitive
      isEnvOnly
      type
      options
      source
    }
  }
`,w=a=>{const t=V(),{refetch:n}=u(),[o]=i(D,{client:t}),[l]=i(C,{client:t}),[f]=i(p,{client:t}),c=async(e,b)=>{if(e===null||typeof e=="string"&&e===""||Array.isArray(e)&&e.length===0){await s();return}b?await o({variables:{key:a,value:e},refetchQueries:[{query:r,variables:{key:a}}]}):await l({variables:{key:a,value:e},refetchQueries:[{query:r,variables:{key:a}}]}),await n()},s=async e=>{y(e)&&e.preventDefault(),await f({variables:{key:a},refetchQueries:[{query:r,variables:{key:a}}]}),await n()};return{handleUpdateVariable:c,handleDeleteVariable:s}};export{r as n,w as t};

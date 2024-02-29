import{ae as O,x as n,ar as G,ag as _,as as Q,c as l,ai as o,au as W,ac as X,ao as Y,J as w,am as g,al as q,aM as Z,V as ee,ah as ae,at as le,ax as z,aj as s,ak as te,ay as oe,az as se,aB as re,aE as ne,aw as ue,an as ie,a6 as de}from"./index-2a6e0187.js";import{c as ce,a as P,f as me,u as ge,d as C,V as ve}from"./index.esm-ffca95e4.js";import{a as pe,V as D}from"./VCol-ba6d81c5.js";import{V as Ve}from"./VRow-1fd3371c.js";import{V as fe}from"./VDivider-303ab244.js";import{V as be,a as ye,b as ke}from"./VTextarea-6458ace2.js";import{V as xe}from"./VDataTable-6273f966.js";import"./VList-581bf7ed.js";const we=ie("h1",{class:"text-center"},"文章管理",-1),De={__name:"ArticlesManagement",setup(Ce){const{apiAuth:A}=Y(),h=O(),I=n(null),v=n(!1),d=n(""),T=r=>{r?(d.value=r._id,p.value.value=r.title,V.value.value=r.content,f.value.value=r.category,b.value.value=r.release):d.value="",v.value=!0},$=()=>{for(v.value=!1,K();u.value.length>0;)I.value.deleteFileRecord(u.value[0])},L=["營地料理","露營知識"],j=ce({title:P().required("缺少文章標題"),content:P().required("缺少文章內容"),category:P().required("缺少文章分類").test("isCategory","文章分類錯誤",r=>L.includes(r)),release:me()}),{handleSubmit:E,isSubmitting:B,resetForm:K}=ge({validationSchema:j,initialValues:{title:"",content:"",category:"",release:!1}}),p=C("title"),V=C("content"),f=C("category"),b=C("release"),u=n([]),N=n([]),H=E(async r=>{var a,c,e;if(!((a=u.value[0])!=null&&a.error)&&!(d.value===""&&u.value.length===0))try{const t=new FormData;for(const i in r)t.append(i,r[i]);if(u.value.length>0)for(const i of u.value)t.append("image",i.file);d.value===""?await A.post("/articles",t):await A.patch("/articles/"+d.value,t),h({text:d.value===""?"新增成功":"編輯成功",showCloseButton:!1,snackbarProps:{timeout:2e3,color:"green",location:"bottom"}}),$(),U()}catch(t){console.log(t);const i=((e=(c=t==null?void 0:t.response)==null?void 0:c.data)==null?void 0:e.message)||"發生錯誤，請稍後再試";h({text:i,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}}),S=n(10),y=n([{key:"createdAt",order:"desc"}]),k=n(1),M=n([]),J=[{title:"圖片",align:"center",sortable:!1,key:"image"},{title:"標題",align:"center",sortable:!1,key:"title"},{title:"分類",align:"center",sortable:!0,key:"category"},{title:"發佈",align:"center",sortable:!0,key:"release"},{title:"發佈時間",align:"center",sortable:!0,key:"createdAt"},{title:"編輯",align:"center",sortable:!1,key:"edit"}],F=n(!0),R=n(0),x=n(""),m=async()=>{var r,a,c,e;F.value=!0;try{const{data:t}=await A.get("/articles/all",{params:{page:k.value,itemsPerPage:S.value,sortBy:((r=y.value[0])==null?void 0:r.key)||"createdAt",sortOrder:((a=y.value[0])==null?void 0:a.order)==="asc"?1:-1,search:x.value}});M.value.splice(0,M.value.length,...t.result.data),R.value=t.result.total}catch(t){console.log(t);const i=((e=(c=t==null?void 0:t.response)==null?void 0:c.data)==null?void 0:e.message)||"發生錯誤，請稍後再試";h({text:i,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}})}F.value=!1};m();const U=()=>{k.value=1,m()};return(r,a)=>{const c=G("VueFileAgent");return _(),Q(X,null,[l(pe,null,{default:o(()=>[l(Ve,null,{default:o(()=>[l(D,{cols:"12"},{default:o(()=>[we]),_:1}),l(fe),l(D,{cols:"12"},{default:o(()=>[l(w,{color:"green",onClick:a[0]||(a[0]=e=>T())},{default:o(()=>[g("新增文章")]),_:1}),l(D,{cols:"12"}),l(be,{"items-per-page":S.value,"onUpdate:itemsPerPage":[a[2]||(a[2]=e=>S.value=e),m],"sort-by":y.value,"onUpdate:sortBy":[a[3]||(a[3]=e=>y.value=e),m],page:k.value,"onUpdate:page":[a[4]||(a[4]=e=>k.value=e),m],items:M.value,headers:J,loading:F.value,"items-length":R.value,search:x.value,hover:""},{top:o(()=>[l(q,{label:"搜尋","append-icon":"mdi-magnify",modelValue:x.value,"onUpdate:modelValue":a[1]||(a[1]=e=>x.value=e),"onClick:append":U,onKeydown:Z(U,["enter"])},null,8,["modelValue"])]),"item.image":o(({item:e})=>[l(ee,{src:e.image[0],height:"50px"},null,8,["src"])]),"item.release":o(({item:e})=>[e.release?(_(),ae(de,{key:0,icon:"mdi-check"})):le("",!0)]),"item.createdAt":o(({item:e})=>[g(z(new Date(e.createdAt).toLocaleString()),1)]),"item.edit":o(({item:e})=>[l(w,{icon:"mdi-pencil",variant:"text",color:"blue",onClick:t=>T(e)},null,8,["onClick"])]),_:2},1032,["items-per-page","sort-by","page","items","loading","items-length","search"])]),_:1})]),_:1})]),_:1}),l(W,{modelValue:v.value,"onUpdate:modelValue":a[11]||(a[11]=e=>v.value=e),persistent:"",width:"500px"},{default:o(()=>[l(ve,{disabled:s(B),onSubmit:te(s(H),["prevent"])},{default:o(()=>[l(oe,null,{default:o(()=>[l(se,null,{default:o(()=>[g(z(d.value===""?"新增文章":"編輯文章"),1)]),_:1}),l(re,null,{default:o(()=>[l(q,{label:"標題",modelValue:s(p).value.value,"onUpdate:modelValue":a[5]||(a[5]=e=>s(p).value.value=e),"error-messages":s(p).errorMessage.value},null,8,["modelValue","error-messages"]),l(xe,{label:"分類",items:L,modelValue:s(f).value.value,"onUpdate:modelValue":a[6]||(a[6]=e=>s(f).value.value=e),"error-messages":s(f).errorMessage.value},null,8,["modelValue","error-messages"]),l(ye,{label:"發佈",modelValue:s(b).value.value,"onUpdate:modelValue":a[7]||(a[7]=e=>s(b).value.value=e),"error-messages":s(b).errorMessage.value},null,8,["modelValue","error-messages"]),l(ke,{label:"內容",modelValue:s(V).value.value,"onUpdate:modelValue":a[8]||(a[8]=e=>s(V).value.value=e),"error-messages":s(V).errorMessage.value},null,8,["modelValue","error-messages"]),l(c,{modelValue:u.value,"onUpdate:modelValue":a[9]||(a[9]=e=>u.value=e),rawModelValue:N.value,"onUpdate:rawModelValue":a[10]||(a[10]=e=>N.value=e),accept:"image/jpeg,image/png",deletable:"","error-text":{type:"檔案格式不支援",size:"檔案超過 1MB 大小限制"},"help-text":"選擇檔案或拖曳到這裡","max-files":5,multiple:"","max-size":"1MB",ref_key:"fileAgent",ref:I},null,8,["modelValue","rawModelValue"])]),_:1}),l(ne,null,{default:o(()=>[l(ue),l(w,{color:"red",disabled:s(B),onClick:$},{default:o(()=>[g("取消")]),_:1},8,["disabled"]),l(w,{color:"green",type:"submit",loading:s(B)},{default:o(()=>[g("送出")]),_:1},8,["loading"])]),_:1})]),_:1})]),_:1},8,["disabled","onSubmit"])]),_:1},8,["modelValue"])],64)}}};export{De as default};

import{aF as p,ad as g,ae as f,x as v,A as V,ag as h,ah as y,ai as a,ao as A,c as s,an as o,ax as l,V as x,am as b,J as w}from"./index-2a6e0187.js";import{a as B,V as u}from"./VCol-ba6d81c5.js";import{V as C}from"./VRow-1fd3371c.js";const k={class:"mb-4"},N={class:"mb-4"},R={class:"mb-4",style:{"white-space":"pre"}},E={__name:"ArticleView",setup(M){const n=p(),i=g(),{api:d}=A(),m=f(),e=v({_id:"",title:"",category:"",createdAt:"",content:"",image:"",release:!0});return V(async()=>{var c,r;try{const{data:t}=await d.get("/articles/"+n.params.id);e.value._id=t.result._id,e.value.title=t.result.title,e.value.category=t.result.category,e.value.content=t.result.content,e.value.image=t.result.image,e.value.release=t.result.release,e.value.createdAt=t.result.createdAt,document.title=`WE CAMP | ${e.value.name}`}catch(t){console.log(t);const _=((r=(c=t==null?void 0:t.response)==null?void 0:c.data)==null?void 0:r.message)||"發生錯誤，請稍後再試";m({text:_,showCloseButton:!1,snackbarProps:{timeout:2e3,color:"red",location:"bottom"}}),i.push("/")}}),(c,r)=>(h(),y(B,null,{default:a(()=>[s(C,null,{default:a(()=>[s(u,{cols:"12"},{default:a(()=>[o("h1",null,l(e.value.title),1)]),_:1}),s(u,{cols:"12",md:"6"},{default:a(()=>[s(x,{src:e.value.image[0]},null,8,["src"])]),_:1}),s(u,{cols:"12",md:"6"},{default:a(()=>[o("p",k,l(e.value.category),1),o("p",N,l(e.value.createdAt),1),o("p",R,l(e.value.content),1)]),_:1})]),_:1}),s(w,{to:"/",color:"green"},{default:a(()=>[b("回首頁")]),_:1})]),_:1}))}};export{E as default};

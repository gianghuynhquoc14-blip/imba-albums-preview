'use strict';
window.ImbaPhotoFiles=(()=>{
 async function prepare(file){
  if(!/^image\/(jpeg|png|webp)$/.test(file.type)||file.size>25*1024**2)throw Error('JPG, PNG или WebP до 25 МБ');
  const image=await createImageBitmap(file);
  try{
   if(image.width*image.height>80*10**6)throw Error('Слишком большое изображение');
   const scale=Math.min(1,480/image.width,480/image.height),c=document.createElement('canvas');c.width=Math.max(1,Math.round(image.width*scale));c.height=Math.max(1,Math.round(image.height*scale));const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(image,0,0,c.width,c.height);
   const thumbnail=await new Promise(resolve=>c.toBlob(resolve,'image/jpeg',.82));if(!thumbnail)throw Error('Не удалось подготовить фотографию');
   const digest=await crypto.subtle.digest('SHA-256',await file.arrayBuffer()),hash=[...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join(''),id='p_'+hash;
   return {meta:{id,name:file.name,width:image.width,height:image.height,bytes:file.size,available:true},asset:{id,original:file,thumbnail}};
  }finally{image.close();}
 }
 function dataUrl(blob){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=()=>reject(Error('Не удалось прочитать исходный файл'));r.readAsDataURL(blob);});}
 return {prepare,dataUrl};
})();

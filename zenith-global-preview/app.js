'use strict';
const nav=document.querySelector('#navigation');
const toggle=document.querySelector('.menu-toggle');
function closeMenu(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
nav.addEventListener('click',event=>{if(event.target.closest('a,button'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();toggle.focus();}});
const enquiry=document.querySelector('#enquiry-dialog');
const detail=document.querySelector('#detail-dialog');
const interest=document.querySelector('#interest');
let selectedStage='Admissions';
function openEnquiry(topic='Admissions'){if(detail.open)detail.close();form.hidden=false;result.hidden=true;interest.value=topic;enquiry.showModal();}
document.querySelectorAll('[data-enquire]').forEach(button=>button.addEventListener('click',()=>openEnquiry(button.dataset.topic||'Admissions')));
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});});
const stages={foundation:{title:'Foundational Years',description:'A welcoming beginning, where children explore, express themselves and discover the joy of learning.',points:['Language, listening and communication','Early numeracy and everyday problem-solving','Creative expression, play and learning together']},middle:{title:'Middle School',description:'A time to connect ideas, develop independent thinking and discover new interests.',points:['Building understanding across subjects','Reasoning, discussion and collaboration','Developing confidence and responsibility']},senior:{title:'Senior Secondary',description:'Deeper learning and greater independence, with thoughtful preparation for the next stage of life.',points:['Focused subject exploration','Independent study and analytical thinking','Conversations about future learning pathways']}};
document.querySelectorAll('[data-stage]').forEach(button=>button.addEventListener('click',()=>{const stage=stages[button.dataset.stage];selectedStage=stage.title;document.querySelector('#detail-title').textContent=stage.title;document.querySelector('#detail-description').textContent=stage.description;document.querySelector('#detail-points').replaceChildren(...stage.points.map(point=>{const li=document.createElement('li');li.textContent=point;return li;}));detail.showModal();}));
document.querySelector('#detail-enquire').addEventListener('click',()=>openEnquiry(selectedStage));
const form=document.querySelector('#enquiry-form');const result=document.querySelector('#enquiry-result');const note=document.querySelector('#prepared-note');
form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);note.value=`Hello Zenith Global admissions team,\n\nMy name is ${data.get('name').trim()}. I would like to know more about ${data.get('interest')}.\n\n${data.get('questions').trim()||'Please share the relevant details, admission requirements and campus visit options.'}\n\nThank you.`;form.hidden=true;result.hidden=false;note.focus();});
document.querySelector('#edit-note').addEventListener('click',()=>{result.hidden=true;form.hidden=false;document.querySelector('#parent-name').focus();});
document.querySelector('#download-note').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([note.value],{type:'text/plain;charset=utf-8'}));const anchor=document.createElement('a');anchor.href=url;anchor.download='Zenith-Global-Enquiry.txt';document.body.append(anchor);anchor.click();anchor.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);});

{
  const header=document.querySelector('.header');
  const topline=document.querySelector('.topline');
  const spacer=document.createElement('div');
  spacer.className='header-spacer';
  spacer.setAttribute('aria-hidden','true');
  header.before(spacer);
  document.body.classList.add('header-scroll-ready');
  const desktop=window.matchMedia('(min-width:1001px)');
  let pending=false;
  function updateScrollHeader(){
    pending=false;
    const offset=topline?Math.max(0,topline.getBoundingClientRect().bottom):0;
    header.style.setProperty('--header-top',offset+'px');
    header.classList.toggle('is-compact',desktop.matches&&window.scrollY>120);
  }
  function scheduleHeader(){
    if(!pending){pending=true;requestAnimationFrame(updateScrollHeader);}
  }
  window.addEventListener('scroll',scheduleHeader,{passive:true});
  window.addEventListener('pageshow',updateScrollHeader);
  window.addEventListener('resize',scheduleHeader);
  updateScrollHeader();
}

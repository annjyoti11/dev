(function($){
'use strict';
var pageSize=12, foods=[], currentPage=1, activeFilter='all', searchTerm='';
var filterButtons=$('.filter-chip'), grid=$('#food-grid'), pagination=$('#pagination');
function escapeHtml(value){return String(value==null?'':value).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function round(value){return Math.round(value*10)/10}
function gramsLabel(g){return (Number.isInteger(g)?g:round(g))+' g'}
function matchesFilter(food){
if(activeFilter==='all')return true;
var category=food.category||'',p=Number(food.protein)||0,c=Number(food.carbs)||0,f=Number(food.fat)||0;
if(activeFilter==='protein')return ['Pulses','Dairy','Eggs','Meat','Fish','Seafood','Supplements'].indexOf(category)>=0||p>=10;
if(activeFilter==='carbohydrate')return ['Grains','Pulses','Fruits','Prepared Meals','Beverages'].indexOf(category)>=0||c>=20;
if(activeFilter==='fat')return ['Nuts & Seeds','Fats & Oils'].indexOf(category)>=0||f>=15;
if(activeFilter==='fruit')return category==='Fruits';
return true;
}
function matchesSearch(food){
if(!searchTerm)return true;
var haystack=[food.name,food.commonName,food.category,food.state,food.diet].concat(food.searchTags||[]).join(' ').toLowerCase();
return haystack.indexOf(searchTerm)>=0;
}
function filteredFoods(){return foods.filter(function(food){return matchesFilter(food)&&matchesSearch(food)})}
function portionOptions(food){
var portions=(food.portions||[]).slice().sort(function(a,b){return (a.position||0)-(b.position||0)});
if(!portions.length)portions=[{label:'100 g',grams:Number(food.servingGrams)||100}];
return portions.map(function(p){return {label:p.label||gramsLabel(p.grams),grams:Number(p.grams)||100}}).filter(function(p){return p.grams>0});
}
function cardHtml(food,index){
var opts=portionOptions(food),id='portion-'+index,first=opts[0],g=first.grams,scale=g/100;
var state=food.state?food.state.charAt(0).toUpperCase()+food.state.slice(1):'';
var subtitle=[food.commonName,state,food.diet].filter(Boolean).join(' · ');
var options=opts.map(function(p,i){return '<option value="'+p.grams+'"'+(i===0?' selected':'')+'>'+escapeHtml(p.label)+' ('+escapeHtml(gramsLabel(p.grams))+')</option>'}).join('');
return '<article class="food-card" data-index="'+index+'"><div class="food-card-top"><h3>'+escapeHtml(food.name)+'</h3><span class="food-category">'+escapeHtml(food.category)+'</span></div><p class="food-meta">'+escapeHtml(subtitle||'Nutrition reference')+'</p><div class="food-serving"><label for="'+id+'">Portion</label><select id="'+id+'" class="portion-select" data-index="'+index+'">'+options+'</select></div><div class="food-calories"><strong class="portion-calories">'+Math.round((Number(food.calories)||0)*scale)+'</strong><span>kcal in selected portion</span></div><div class="macro-row"><div><b class="macro-protein">'+round((Number(food.protein)||0)*scale)+' g</b><span>Protein</span></div><div><b class="macro-carbs">'+round((Number(food.carbs)||0)*scale)+' g</b><span>Carbs</span></div><div><b class="macro-fat">'+round((Number(food.fat)||0)*scale)+' g</b><span>Fat</span></div><div><b>'+round((Number(food.fibre)||0)*scale)+' g</b><span>Fibre</span></div></div></article>';
}
function renderPagination(total){
pagination.empty();
var pages=Math.ceil(total/pageSize);
if(pages<2)return;
var start=Math.max(1,currentPage-2),end=Math.min(pages,currentPage+2);
if(start>1)pagination.append('<button type="button" data-page="1">1</button>');
if(start>2)pagination.append('<span class="page-gap" aria-hidden="true">…</span>');
pagination.append('<button type="button" data-page="'+(currentPage-1)+'" aria-label="Previous page" '+(currentPage===1?'disabled':'')+'>‹</button>');
for(var n=start;n<=end;n++)pagination.append('<button type="button" data-page="'+n+'" '+(n===currentPage?'aria-current="page" aria-label="Page '+n+', current page"':'aria-label="Page '+n+'"')+'>'+n+'</button>');
pagination.append('<button type="button" data-page="'+(currentPage+1)+'" aria-label="Next page" '+(currentPage===pages?'disabled':'')+'>›</button>');
if(end<pages-1)pagination.append('<span class="page-gap" aria-hidden="true">…</span>');
if(end<pages)pagination.append('<button type="button" data-page="'+pages+'">'+pages+'</button>');
}
function render(){
var results=filteredFoods(),total=results.length,pages=Math.max(1,Math.ceil(total/pageSize));
if(currentPage>pages)currentPage=pages;
var start=(currentPage-1)*pageSize,shown=results.slice(start,start+pageSize);
$('#food-count').text(total?('Showing '+(start+1)+'–'+Math.min(start+pageSize,total)+' of '+total+' foods'):'No foods found');
grid.html(shown.length?shown.map(function(food,i){return cardHtml(food,start+i)}).join(''):'<div class="empty-state">No foods match that search. Try a different name or clear the filters.</div>');
renderPagination(total);
}
function setActiveFilter(value){
activeFilter=value;currentPage=1;
filterButtons.each(function(){var active=$(this).data('filter')===value;$(this).toggleClass('active',active).attr('aria-pressed',String(active))});
render();
}
$.getJSON('/assets/food-library.json').done(function(data){foods=Array.isArray(data)?data:[];render()}).fail(function(){$('#food-count').text('Food library could not load');grid.html('<div class="empty-state">Please refresh the page to load the food library.</div>')});
$('#food-search').on('input',function(){searchTerm=$.trim($(this).val()).toLowerCase();$('#clear-search').prop('hidden',!searchTerm);currentPage=1;render()});
$('#clear-search').on('click',function(){$('#food-search').val('').trigger('input').trigger('focus')});
filterButtons.on('click',function(){setActiveFilter($(this).data('filter'))});
pagination.on('click','button[data-page]',function(){if(this.disabled)return;currentPage=Number($(this).data('page'));render();document.getElementById('food-library').scrollIntoView({behavior:'smooth',block:'start'})});
grid.on('change','.portion-select',function(){
var food=foods[Number($(this).data('index'))],grams=Number($(this).val()),scale=grams/100,card=$(this).closest('.food-card');
card.find('.portion-calories').text(Math.round((Number(food.calories)||0)*scale));
card.find('.macro-protein').text(round((Number(food.protein)||0)*scale)+' g');
card.find('.macro-carbs').text(round((Number(food.carbs)||0)*scale)+' g');
card.find('.macro-fat').text(round((Number(food.fat)||0)*scale)+' g');
card.find('.macro-row div').eq(3).find('b').text(round((Number(food.fibre)||0)*scale)+' g');
});
$('#calorie-form').on('submit',function(event){
event.preventDefault();
var age=Number($('#age').val()),weight=Number($('#weight').val()),height=Number($('#height').val()),sex=$('#sex').val(),activity=Number($('#activity').val());
if(!this.reportValidity())return;
var bmr=10*weight+6.25*height-5*age+(sex==='male'?5:-161);
var maintenance=Math.max(1200,Math.round((bmr*activity)/50)*50);
var fatLoss=Math.max(1200,Math.round((maintenance-300)/50)*50);
var gain=Math.round((maintenance+200)/50)*50;
$('#fat-loss-value').text(fatLoss.toLocaleString()+' kcal');
$('#maintenance-value').text(maintenance.toLocaleString()+' kcal');
$('#gain-value').text(gain.toLocaleString()+' kcal');
$('#calorie-results').prop('hidden',false);
});
})(jQuery);
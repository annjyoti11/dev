/* KYNVAY approved-board visual prototype — fictional data, no backend calls. */
(function(){
"use strict";
const q=document.getElementById("screen-root");
function homeAppearance(){const h=new Date().getHours();return h>=5&&h<10?"morning":h>=10&&h<18?"day":"evening";}
function greeting(){const h=new Date().getHours();return h>=5&&h<12?"morning":h>=12&&h<18?"afternoon":"evening";}
const paths={
home:'<path d="M3 10.5 12 3l9 7.5v10H14v-6h-4v6H3z"/>',
training:'<path d="M4 4v16m16-16v16M1 8h6v8H1m16-8h6v8h-6M7 12h10"/>',
nutrition:'<path d="M4 3v8c0 3 4 3 4 0V3M6 3v18m11-18v18m0-18c5 2 5 8 0 10"/>',
progress:'<path d="M4 20v-8h4v8m4 0V4h4v16m4 0v-8h3v8"/>',
profile:'<circle cx="12" cy="7" r="4"/><path d="M4 21c0-7 16-7 16 0"/>',
bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 9h18c0-1-3-2-3-9M10 21h4"/>',
back:'<path d="m15 18-6-6 6-6"/>',
next:'<path d="m9 18 6-6-6-6"/>',
steps:'<path d="m6 6 4 1 3 6 5 2v5H9L3 13z"/>',
calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
chat:'<path d="M21 11a8 8 0 0 1-8 8H7l-4 3v-7a8 8 0 1 1 18-4Z"/>',
search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
check:'<path d="m4 12 5 5L20 6"/>',
plus:'<path d="M12 5v14M5 12h14"/>',
water:'<path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/>'
};
const i=(name,cls="svgicon")=>'<svg class="'+cls+'" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">'+(paths[name]||paths.next)+'</svg>';

const logo=()=>'<div class="zenith-logo"><strong>ZENITH</strong><small>FITNESS HUB</small></div>';
const head=()=>'<header class="top-brand">'+logo()+'<div class="top-right"><button class="bell-btn" data-go="notifications" aria-label="Notifications">'+i("bell")+'</button><button class="avatar" data-go="profile" aria-label="Profile">AS</button></div></header>';
const back=(title,target="home")=>'<header class="back-header"><button class="back-btn" aria-label="Go back" data-go="'+target+'">‹</button><strong>'+title+'</strong><div></div></header>';
const sect=(title,to="",label="View All")=>'<div class="section-heading"><strong>'+title+'</strong>'+(to?'<button data-go="'+to+'">'+label+'</button>':'')+'</div>';
const nav=active=>'<nav class="app-bottom" aria-label="Client navigation">'+[["home","Home"],["training","Training"],["nutrition","Nutrition"],["progress","Progress"],["profile","Profile"]].map(([k,l])=>'<button data-go="'+k+'" class="nav-link '+(active===k?"active":"")+'" aria-label="'+l+'">'+i(k,"nav-svg svgicon")+'<span>'+l+'</span></button>').join("")+'</nav>';
const action=(text,target)=>'<button class="primary wide" data-go="'+target+'">'+text+'</button>';
const item=(em,title,sub,to="",tail="›")=>'<div class="line-item"><div class="thumb">'+em+'</div><div><strong>'+title+'</strong><p>'+sub+'</p></div>'+(to?'<button class="plain-icon" data-go="'+to+'" aria-label="Open '+title+'">'+tail+'</button>':'<span class="chev">'+tail+'</span>')+'</div>';
const nrow=(em,title,sub,time)=>'<div class="update-row"><span class="iconbox">'+em+'</span><div><strong>'+title+'</strong><p>'+sub+'</p></div><time>'+time+'</time></div>';
const food=(name,kcal,time)=>'<div class="line-item"><div class="food-art sm">🍽</div><div><strong>'+name+'</strong><p>'+kcal+' kcal · '+time+'</p></div><button class="plain-icon" data-go="food" aria-label="Food details">＋</button></div>';
function home(){
return {title:"Home",tab:"home",home:true,html:head()+
'<div class="home-greeting"><h1>Good '+greeting()+',<br>Alex</h1><p>Your plan is ready. Keep going! 💪</p></div>'+
'<div class="card coach-card"><span class="coach-face">👨🏻</span><div><small>Your Coach</small><strong>Anup Jyoti Das</strong><p>Here to support your journey</p></div><button class="chip-action" data-go="messages">♧ Message</button></div>'+
sect("Today's Plan","week","View Full Plan")+
'<div class="plan-grid"><button class="plan-tile workout" data-go="training"><span class="tile-icon">🏋</span><strong>Workout</strong><p>Upper Body<br>Strength<br>5 exercises</p><span class="tile-cta">Start Workout</span></button><button class="plan-tile nutrition" data-go="nutrition"><span class="tile-icon">🍴</span><strong>Nutrition</strong><p>Meal 2 · Lunch<br>Grilled Chicken<br>+ Brown Rice</p><span class="tile-cta">View Meal</span></button><button class="plan-tile activity" data-go="review"><span class="tile-icon">👟</span><strong>Activity</strong><p>Post-lunch Walk<br>15 minutes</p><span class="tile-cta">Start Walk</span></button></div>'+
'<div class="note-card"><span>🗓</span><div><strong>Coach’s Note for Today</strong><p>Focus on good form and controlled reps today.<br>Let me know how the shoulder feels. 👍</p></div></div>'+
sect("Weekly Progress","progress","See Details")+
'<div class="progress-grid"><div class="progress-tile"><span class="metric-icon">🏋</span><strong>4 / 4</strong><small>Workouts</small><div class="mini-line"><span style="width:100%"></span></div></div><div class="progress-tile"><span class="metric-icon">🍴</span><strong>6 / 7</strong><small>Meals Logged</small><div class="mini-line"><span style="width:86%;background:#ffa878"></span></div></div><div class="progress-tile"><span class="metric-icon">👟</span><strong>5,800</strong><small>Daily Steps</small><div class="mini-line"><span style="width:64%"></span></div></div><div class="progress-tile"><span class="metric-icon">🗓</span><strong>78.2 kg</strong><small>Body Weight</small><div class="mini-line"><span style="width:35%;background:#ff56ae"></span></div></div></div>'+
sect("Recent Updates","notifications","See All")+
nrow("👨🏻","Coach Feedback","Great improvement in your last session! Keep it up.","2h ago")+nrow("📋","New Workout Plan","Week 3 is now available.","1d ago")+nrow("🥗","Nutrition Update","Small adjustment to your dinner portion.","1d ago")+
sect("Your Journey","progress","See All")+
'<div class="journey-row"><div class="journey-card" data-go="progress"><div class="journey-art">📉</div><strong>Body Measurements</strong><p>Track your progress</p></div><div class="journey-card" data-go="training"><div class="journey-art">🏋</div><strong>Strength Progress</strong><p>New personal records</p></div><div class="journey-card" data-go="nutrition"><div class="journey-art">🥗</div><strong>Nutrition Adherence</strong><p>Building great habits</p></div></div>'};
}
function training(){
return {title:"Training",tab:"training",html:head()+'<h1 class="page-title">Training</h1><p class="page-lead">Your workouts. Step by step.</p>'+
'<div class="image-hero"><span class="pill dark">TODAY’S WORKOUT</span><h2>Upper Body Strength</h2><p>5 exercises · 45–55 min</p>'+action("Start Workout →","session")+'</div>'+
sect("This Week","week","View Plan")+'<div class="week-row">'+[["Mon","19"],["Tue","20"],["Wed","21"],["Thu","22"],["Fri","23"],["Sat","24"]].map(([d,n],j)=>'<button data-go="week" '+(j===3?'class="active"':'')+'><small>'+d+'</small><strong>'+n+'</strong></button>').join("")+'</div>'+
sect("Workout Categories","week","See All")+
'<div class="plan-grid"><button class="plan-tile workout" data-go="week"><span class="tile-icon">🏋</span><strong>Push</strong><p>Build upper body</p></button><button class="plan-tile workout" data-go="week"><span class="tile-icon">💪</span><strong>Pull</strong><p>Build back</p></button><button class="plan-tile workout" data-go="week"><span class="tile-icon">🦵</span><strong>Legs</strong><p>Build lower body</p></button><button class="plan-tile workout" data-go="week"><span class="tile-icon">🏋</span><strong>Upper</strong><p>Upper body focus</p></button><button class="plan-tile workout" data-go="week"><span class="tile-icon">🦵</span><strong>Lower</strong><p>Lower body focus</p></button><button class="plan-tile workout" data-go="week"><span class="tile-icon">⚡</span><strong>Full Body</strong><p>Total body workout</p></button></div>'+
sect("Your programme","week","My Plan")+
'<div class="card"><strong style="font-size:13px">Week 3 of 12 · Strength Foundation</strong><p class="page-lead" style="margin-top:7px">The current assignment remains available until your coach publishes a new one.</p>'+action("Open My Plan →","week")+'</div>'};
}
function week(){
const list=[["Mon","19","Push Strength","5 exercises · 50 min"],["Tue","20","Cardio & Core","30 min"],["Wed","21","Lower Body Strength","6 exercises · 50 min"],["Thu","22","Upper Body Strength","5 exercises · 45–55 min"],["Fri","23","Full Body Conditioning","6 exercises · 45 min"],["Sat","24","Mobility & Recovery","Light activity · 20 min"]];
return {title:"Weekly Plan",tab:"training",html:back("Training","training")+
'<div class="tabstrip"><button class="active">My Plan</button><button data-go="training">All Workouts</button></div>'+
'<div class="section-heading"><button class="plain-icon" data-action="prev-week" aria-label="Previous week">‹</button><strong id="week-title">Week 3 of 12</strong><button class="plain-icon" data-action="next-week" aria-label="Next week">›</button></div><p class="page-lead" style="text-align:center">Oct 19 – Oct 24</p>'+
'<div class="days">'+list.map(([d,n,t,s],j)=>'<button data-go="session" class="day-entry '+(j===3?"selected":"")+'"><div class="day-date">'+d+'<strong>'+n+'</strong></div><div class="day-photo">'+(j===5?"🧘":"🏋")+'</div><div><strong>'+t+'</strong><p>'+s+'</p></div><span>›</span></button>').join("")+'</div>'+
'<div class="info-box">Your coach-approved workout programme remains visible until a replacement is assigned.</div>'};
}
function session(){
return {title:"Workout Session",tab:"training",html:back("Workout Session","week")+
'<div class="image-hero"><h2>Upper Body Strength</h2><p>Week 3 · Day 4<br>5 exercises · 45–55 min</p></div>'+
'<div class="card"><div class="section-heading" style="margin:0"><strong>Exercise 1 of 5</strong><span style="font-size:11px;color:#0876ff">0%</span></div><div class="mini-line"><span style="width:10%;background:#0878ff"></span></div></div>'+
'<div class="exercise-list">'+[["Dumbbell Bench Press","3 sets · 8–10 reps"],["Seated Shoulder Press","3 sets · 8–10 reps"],["Lat Pulldown","3 sets · 10–12 reps"],["Seated Row","3 sets · 10–12 reps"],["Triceps Pushdown","3 sets · 12–15 reps"]].map(([t,s],j)=>'<div class="exercise-row '+(j===0?"selected":"")+'"><div class="thumb">🏋</div><div><strong>'+(j+1)+'. '+t+'</strong><p>'+s+'</p></div><button data-go="exercise" aria-label="Open '+t+'">›</button></div>').join("")+'</div>'+action("Start Exercise","exercise")};
}
function exercise(){
return {title:"Exercise Details",tab:"training",html:back("Log Set 1 of 3","session")+
'<div class="card" style="display:flex;gap:9px;align-items:center"><span class="tile-icon">🏋</span><div><strong>Dumbbell Bench Press</strong><p class="page-lead" style="margin:3px 0">Target: 8–10 reps</p></div></div>'+
'<div class="tabstrip"><button class="active">Video</button><button>Muscles</button></div>'+
'<div class="image-hero" style="min-height:180px;display:grid;place-items:center;font-size:46px">▶</div>'+
'<h3 class="list-title">Dumbbell Bench Press</h3><p class="page-lead">3 sets · 8–10 reps · Rest 90 sec</p>'+
'<div class="stack"><div class="line-item"><div class="thumb">1</div><div><strong>Set up with feet flat and back supported.</strong></div></div><div class="line-item"><div class="thumb">2</div><div><strong>Lower the dumbbells slowly and with control.</strong></div></div><div class="line-item"><div class="thumb">3</div><div><strong>Press up while keeping wrists straight.</strong></div></div></div>'+
'<div class="info-box">Common mistakes · Improve range of motion, avoid flaring elbows.</div>'+action("Log Set 1","complete")};
}
function complete(){
return {title:"Workout Complete",tab:"training",html:back("Workout Summary","training")+
'<div class="check-circle">✓</div><h2 class="page-title" style="text-align:center">Workout Completed!</h2><p class="page-lead" style="text-align:center">Great work! Keep it up.</p>'+
'<div class="image-hero"><h2>Upper Body Strength</h2><p>Week 3 · Day 4<br>25 Oct 2026, 6:10 AM</p></div>'+
'<div class="measurement-cards"><div><small>Exercises</small><strong>5/5</strong></div><div><small>Sets</small><strong>15/15</strong></div><div><small>Duration</small><strong>42 min</strong></div></div>'+
sect("Exercise Performance")+item("🏋","Dumbbell Bench Press","3 × 10 @ 20 kg · +2.5 kg","", "✓")+item("🏋","Seated Shoulder Press","3 × 10 @ 16 kg · +2.5 kg","", "✓")+item("💪","Lat Pulldown","3 × 12 @ 42 kg","", "✓")+
action("Back to Home","home")};
}
function nutrition(){
return {title:"Nutrition Library",tab:"nutrition",html:head()+'<h1 class="page-title">Nutrition Library</h1><p class="page-lead">Explore foods, meals and recipes.</p>'+
'<div class="search-field">'+i("search")+'<input type="search" placeholder="Search food items, meals or recipes..." aria-label="Search example foods"></div>'+
'<div class="inline-tabs"><button class="active">All</button><button data-go="meal-library">Meals</button><button data-go="food">Foods</button><button>Recipes</button><button data-go="meal-plan">My Library</button></div>'+
'<div class="plan-grid"><button class="plan-tile nutrition" data-go="meal-library"><span class="tile-icon">☀</span><strong>Breakfast</strong></button><button class="plan-tile nutrition" data-go="meal-library"><span class="tile-icon">🍽</span><strong>Lunch</strong></button><button class="plan-tile nutrition" data-go="meal-library"><span class="tile-icon">🌙</span><strong>Dinner</strong></button><button class="plan-tile nutrition" data-go="meal-library"><span class="tile-icon">🍌</span><strong>Snacks</strong></button><button class="plan-tile nutrition" data-go="meal-library"><span class="tile-icon">💪</span><strong>Pre Workout</strong></button><button class="plan-tile nutrition" data-go="meal-library"><span class="tile-icon">👟</span><strong>Post Workout</strong></button></div>'+
sect("Popular Meals","meal-library","View All")+
'<div class="two-food-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:9px"><button style="border:0;background:transparent;text-align:left" data-go="food"><div class="food-art">🥣</div><strong style="font-size:11px">Oats, Whey & Milk</strong><p class="page-lead">420 kcal</p></button><button style="border:0;background:transparent;text-align:left" data-go="food"><div class="food-art">🍗</div><strong style="font-size:11px">Chicken, Rice & Veg</strong><p class="page-lead">520 kcal</p></button><button style="border:0;background:transparent;text-align:left" data-go="food"><div class="food-art">🐟</div><strong style="font-size:11px">Fish Curry, Rice & Veg</strong><p class="page-lead">480 kcal</p></button><button style="border:0;background:transparent;text-align:left" data-go="food"><div class="food-art">🥚</div><strong style="font-size:11px">Egg & Brown Rice</strong><p class="page-lead">450 kcal</p></button></div>'+
sect("My Nutrition Plans","meal-plan","View Plan")+item("🍱","Current Nutrition Plan","Four meals · Coach-assigned","meal-plan")};
}
function foodPage(){
return {title:"Food Details",tab:"nutrition",html:back("Food Details","nutrition")+
'<div class="food-art" style="min-height:185px;font-size:60px">🍗</div>'+
'<h2 class="food-name">Chicken Breast (grilled)</h2><p class="page-lead">Protein · Non-veg <span class="pill green" style="margin-left:8px">Commonly Used</span></p>'+
'<div class="nutrition-facts"><div><strong>165</strong><small>kcal</small></div><div><strong>31 g</strong><small>Protein</small></div><div><strong>3.6 g</strong><small>Fats</small></div><div><strong>0 g</strong><small>Carbs</small></div></div>'+
sect("Portion Sizes")+'<div class="portions"><button>◯ 50 g · 83 kcal · 15.5 g protein</button><button class="active">🔵 100 g · 165 kcal · 31 g protein</button><button>◯ 150 g · 248 kcal · 46.5 g protein</button><button>◯ 200 g · 330 kcal · 62 g protein</button></div>'+
'<div style="margin-top:20px">'+action("Add to Meal Plan","meal-plan")+'</div>'};
}
function meals(){
return {title:"Meal Library",tab:"nutrition",html:back("Meal Library","nutrition")+
'<div class="search-field">'+i("search")+'<input placeholder="Search meals..." aria-label="Search meals"></div>'+
'<div class="inline-tabs"><button class="active">All</button><button>Breakfast</button><button>Lunch</button><button>Snack</button><button>Dinner</button></div>'+
'<div class="filter-row"><button class="active">All</button><button>Veg</button><button>Non-veg</button><button>Quick</button><button>High Protein</button></div>'+
'<div style="margin-top:10px">'+food("Oats, Whey & Milk","420","Breakfast")+food("Chicken, Rice & Veg","520","Lunch")+food("Rohu Fish Curry Meal","480","Dinner")+food("Egg & Brown Rice","450","Lunch")+food("Paneer & Veg Bowl","400","Dinner")+food("Dal, Rice & Sabzi","380","Lunch")+'</div>'};
}
function mealPlan(){
return {title:"Nutrition Plan",tab:"nutrition",html:back("Create Nutrition Plan","nutrition")+
'<div class="tabstrip"><button data-go="meal-library">Create Meal</button><button class="active">Create Plan</button></div>'+
'<label class="form-label">Plan Name</label><input class="field" value="Fat Loss Plan – Week 1" readonly>'+
'<label class="form-label">Goal</label><div class="tabstrip"><button class="active">Fat Loss</button><button>Daily Calories 1,800</button></div>'+
'<label class="form-label">Number of Meals</label><div class="card">4 meals per day</div>'+
sect("Meal Plan")+
food("Oats, Whey & Milk","420","Breakfast")+food("Chicken, Rice & Veg","520","Lunch")+food("Banana & Nuts","250","Snack")+food("Fish Curry, Rice & Veg","480","Dinner")+
'<div class="info-box">Demo only: this does not change anyone’s assigned nutrition programme.</div>'+action("Save Plan (Demo)","nutrition")};
}
function progress(){
return {title:"Progress",tab:"progress",html:head()+'<h1 class="page-title">Progress</h1><p class="page-lead">Track. Improve. Stay consistent. 💪</p>'+
'<div class="tabstrip" style="grid-template-columns:repeat(3,1fr)"><button class="active">Overview</button><button>Measurements</button><button>Photos</button></div>'+
'<div class="card" style="background:#eff6ff"><div class="line-item" style="padding:0 0 8px"><div class="thumb" style="background:#e6dcff">🗓</div><div><strong>Weekly Check-in</strong><p>This weekend (Sat or Sun)</p></div></div><p class="page-lead">Track your progress with new measurements and photos.</p>'+action("Start Weekly Check-in","checkin")+'</div>'+
sect("Your Progress")+'<div class="measurement-cards"><div><small>Weight</small><strong>-4.8 kg <span class="down">↓</span></strong><small>82.0 → 77.2 kg</small></div><div><small>Waist</small><strong>-4.1 in <span class="down">↓</span></strong><small>40.9 → 36.8 in</small></div><div><small>Body Fat</small><strong>-3.2% <span class="down">↓</span></strong><small>28.5 → 25.3%</small></div></div>'+
sect("Weight Trend","checkin","View Details")+
'<div class="chart"><svg viewBox="0 0 340 100"><path d="M6 20 L60 34 L112 45 L168 58 L223 67 L282 76 L333 83" stroke="#0878ff" fill="none" stroke-width="2.4"/><path d="M6 20 L60 34 L112 45 L168 58 L223 67 L282 76 L333 83 L333 100 L6 100Z" fill="#d5e8ff" opacity=".7"/></svg></div>'+
'<div class="card"><strong style="font-size:13px">Progress Photos</strong><p class="page-lead">Compare measurements and check-in photos over time.</p>'+action("View Weekly Check-in","checkin")+'</div>'};
}
function checkin(){
return {title:"Weekly Check-in",tab:"progress",html:back("Weekly Check-in","progress")+
'<p class="page-lead" style="text-align:center">Track your progress every weekend</p>'+
'<div class="week-row" style="grid-template-columns:repeat(4,1fr)"><button class="active"><small>1</small><strong>Measurements</strong></button><button><small>2</small><strong>Photos</strong></button><button><small>3</small><strong>Lifestyle</strong></button><button><small>4</small><strong>Review</strong></button></div>'+
'<div class="info-box">💙 Why it matters: Helps your coach understand your progress and make the right adjustments to your plan.</div>'+
sect("Measurements")+'<p class="page-lead">Use a measuring tape and follow the guide below.</p>'+
item("⚖","Weight","Current: 77.2 kg","", "›")+item("📏","Waist","Current: 36.8 in","", "›")+item("🧍","Hip","Current: 38.1 in","", "›")+item("📏","Thigh","Current: 24.2 in","", "›")+item("🏋","Chest","Current: 42.0 in","", "›")+item("💪","Arm (Biceps)","Current: 14.5 in","", "›")+
'<div class="info-box">Optional progress photos: front, side and back. Real uploads are disabled in this public demo.</div>'+
'<div class="filter-row"><button class="active">Nutrition Adherence</button><button>Sleep Quality</button><button>Energy Levels</button></div>'+
'<div style="margin-top:15px">'+action("Continue (Demo)","progress")+'</div>'};
}
function messages(){
return {title:"Messages",tab:"profile",html:head()+'<h1 class="page-title">Messages</h1><p class="page-lead">Stay connected with your coach.</p>'+
'<div class="search-field">'+i("search")+'<input placeholder="Search messages..." aria-label="Search messages"></div>'+
'<div class="inline-tabs"><button class="active">All</button><button>Coach</button><button>Workouts</button><button>Nutrition</button><button>Other</button></div>'+
item("👨🏻","Coach Anup","Great session today! Keep the same weight next time.","", "2")+item("🏋","Workout Feedback","Your workout log has been reviewed.","", "1")+item("🥗","Nutrition Feedback","Well done on logging all meals!","", "›")+item("💬","General","Membership update and gym notice.","", "›")+
'<div class="coach-bubble">Coach Anup: Great session today! Your form on squats has improved a lot.</div><div class="coach-bubble mine">It went well coach. Completed all sets. Felt good on squats.</div>'+
'<label class="sr-only" for="demo-message">Sample message</label><input class="field" id="demo-message" placeholder="Type a message (demo only)..."><button class="primary wide" data-action="demo-message">Send (Demo)</button>'};
}
function sessions(){
return {title:"My Sessions",tab:"profile",html:head()+'<h1 class="page-title">My Sessions</h1><p class="page-lead">Your coached training sessions.</p>'+
'<div class="tabstrip"><button class="active">Upcoming</button><button>History</button></div>'+
sect("Next Session")+
'<div class="card">'+item("🏋","Personal Training","24 Oct · 6:00 AM – 6:45 AM · Coach Anup")+'<div class="tabstrip"><button class="active">View Session</button><button>Reschedule</button></div></div>'+
sect("Upcoming Sessions","sessions","View All")+
item("📅","Personal Training · Oct 26","6:00 AM – 6:45 AM","", "›")+item("📅","Personal Training · Oct 28","6:00 AM – 6:45 AM","", "›")+item("📅","Personal Training · Oct 30","6:00 AM – 6:45 AM","", "›")+
'<div class="info-box">Session booking and rescheduling are design-only here.</div>'};
}
function membership(){
return {title:"Membership",tab:"profile",html:head()+'<h1 class="page-title">Membership</h1><p class="page-lead">Your membership and services.</p>'+
'<div class="member-hero"><strong>Active Member ✓</strong><small>Gym Membership · 3 Months</small><small>Valid till 15 Jan 2027 · 72 days left</small><div class="progressbar"><span></span></div></div>'+
item("🗓","Membership Details","Plan, validity and benefits","", "›")+item("🏋","Additional Services","Coaching, PT or Transformation","", "›")+item("💳","Payment History","View past payments","", "›")+item("⬆","Upgrade / Change Plan","Explore available plans","", "›")+
'<div class="card"><strong style="font-size:13px">Available Plans</strong><p class="page-lead">1 month ₹1,000 · 3 months ₹2,700<br>6 months ₹4,500 · 12 months ₹8,000</p></div>'};
}
function notifications(){
return {title:"Notifications",tab:"profile",html:head()+'<h1 class="page-title">Notifications</h1><p class="page-lead">Stay on track. Never miss what matters.</p>'+
'<div class="inline-tabs"><button class="active">All</button><button>Unread</button><button>Reminders</button><button>Updates</button></div>'+
sect("Today")+item("🏋","Workout Reminder","Upper Body Strength · Today, 6:00 PM","", "1h ago")+item("🍴","Meal Reminder","Time for your Lunch · 2:00 PM","", "3h ago")+item("💬","Coach Message","Anup sent you a message","messages","4h ago")+item("📋","Weekly Check-in","Your weekly check-in is ready","checkin","6h ago")+item("👑","Membership Update","Your membership has been renewed","membership","1d ago")};
}
function profile(){
return {title:"Profile",tab:"profile",html:head()+'<h1 class="page-title">Profile</h1><p class="page-lead">Your Zenith Fitness Hub account.</p>'+
'<div class="card coach-card"><span class="avatar" style="width:48px;height:48px;font-size:15px">AS</span><div><strong>Alex Sharma</strong><p>Client · Demo profile</p><small>Regular / premium screen reference</small></div></div>'+
item("👑","Membership","Membership status and plan details","membership")+item("💬","Messages","Conversations with your coach","messages")+item("📅","My Sessions","Personal training appointments","sessions")+item("🔔","Notifications","Updates and preferences","notifications")+item("📈","Progress","Weekly check-ins and history","progress")+item("🌙","Nighttime Review","Reflect on your day","review")+item("📝","Onboarding","Personalized coaching questions","onboarding")+
'<div class="info-box">This static preview cannot sign in, update a member, or access private information.</div>'};
}
function review(){
return {title:"Nighttime Review",tab:"home",html:back("Nighttime Review","home")+
'<div class="night-hero"><div class="zenith-logo"><strong>ZENITH</strong><small>FITNESS HUB</small></div><h2>Moment to Unwind</h2><p>Let’s review your day.<br>It’s been a productive day.<br>Take a few minutes to reflect and wrap up your day.</p></div>'+
item("🏋","Workout","Completed · Upper Body","", "✓")+item("🍴","Nutrition","3 of 4 meals logged","", "✓")+item("👟","Activity","8,542 steps","", "✓")+item("💧","Water","2.8 L","", "✓")+item("🙂","How do you feel?","Quick check-in","", "○")+
sect("Daily Check-in")+
'<div class="card"><strong>Energy Level</strong><div class="inline-tabs"><button>Very low</button><button>Low</button><button class="active">Okay</button><button>Good</button><button>High</button></div><strong>Sleep Quality</strong><div class="inline-tabs"><button>Poor</button><button>Fair</button><button class="active">Good</button><button>Very good</button></div></div>'+
action("Start Review (Demo)","home")};
}
function onboarding(){
return {title:"Premium Onboarding",tab:"profile",html:back("Personal Information","profile")+
'<div class="info-box">Step 1 of 10 · Let’s start with some basic details.</div>'+
'<div class="coach-face" style="height:75px;width:75px;margin:15px auto;font-size:33px">👩🏻</div>'+
'<label class="form-label">Full Name</label><input class="field" value="Riya Sharma" readonly>'+
'<label class="form-label">Date of Birth</label><input class="field" value="12 Mar 2000" readonly>'+
'<label class="form-label">Gender</label><div class="filter-row"><button>Male</button><button class="active">Female</button><button>Other</button></div>'+
'<label class="form-label">Height</label><input class="field" value="154 cm" readonly>'+
'<label class="form-label">Current Weight</label><input class="field" value="56 kg" readonly>'+
sect("Your Goals")+'<div class="option-list"><div class="option">Lose body fat <span>◯</span></div><div class="option selected">Build muscle <span>●</span></div><div class="option">Increase strength <span>◯</span></div><div class="option">Improve general fitness <span>◯</span></div></div>'+
'<div class="info-box">Actual intake is adaptive and coach-reviewed. This is only the visual structure from the approved onboarding board.</div>'+
action("Next (Demo)","home")};
}
const pages={home,training,week,session,exercise,complete,nutrition,food:foodPage,"meal-library":meals,"meal-plan":mealPlan,progress,checkin,messages,sessions,membership,notifications,profile,review,onboarding};
const tabs={home:"home",training:"training",week:"training",session:"training",exercise:"training",complete:"training",nutrition:"nutrition",food:"nutrition","meal-library":"nutrition","meal-plan":"nutrition",progress:"progress",checkin:"progress",messages:"profile",sessions:"profile",membership:"profile",notifications:"profile",profile:"profile",review:"home",onboarding:"profile"};
let current="home";let weekOffset=0;
function route(to,updateHash=true){
 if(!Object.prototype.hasOwnProperty.call(pages,to))to="home";
 current=to;const result=pages[to]();
 q.className="client-app theme-"+(to==="home"?homeAppearance():"day");
 q.innerHTML='<div class="view-scroll '+(result.home?"home-view":"")+'">'+result.html+'</div>'+nav(result.tab||tabs[to]);
 
 if(updateHash&&location.hash.slice(1)!==to)history.replaceState(null,"","#"+to);
 const scroll=q.querySelector(".view-scroll");if(scroll)scroll.scrollTop=0;
}
document.addEventListener("click",e=>{
 const control=e.target.closest("button,[data-go]");
 if(!control)return;
 const target=control.getAttribute("data-go");
 if(target){route(target);return}
 const action=control.getAttribute("data-action");
 if(action==="prev-week"||action==="next-week"){weekOffset+=action==="next-week"?1:-1;const title=document.getElementById("week-title");if(title)title.textContent="Week "+Math.max(1,Math.min(12,3+weekOffset))+" of 12";return}
 if(action==="demo-message"){const input=document.getElementById("demo-message");if(input)input.value="";alert("Design preview only. No message was sent.");return}
 if(control.matches(".inline-tabs button,.tabstrip button,.filter-row button,.portions button")){const group=control.parentElement;group.querySelectorAll("button").forEach(b=>b.classList.toggle("active",b===control))}
});

window.addEventListener("hashchange",()=>route(location.hash.slice(1),false));
route(location.hash.slice(1)||"home",false);
})();
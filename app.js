const SAVE_KEY = 'sakura-yuna-v002';
const OLD_SAVE_KEY = 'hiyori-life-v001';
const TIMES = [
  {name:'朝',icon:'☀'},{name:'昼',icon:'🌤'},{name:'夕',icon:'🌇'},{name:'夜',icon:'🌙'}
];

const choices = {
  meal:[
    {id:'salad',icon:'🥗',name:'サラダプレート',desc:'軽めで健康的。体型を整えたい日に。',effect:{hunger:-24,happiness:2,weight:-0.03,bodyFat:-0.06,energy:2},pref:'サラダ'},
    {id:'setmeal',icon:'🍱',name:'バランス定食',desc:'しっかり食べて元気を回復。',effect:{hunger:-42,happiness:5,weight:0.03,energy:7,fatigue:-2},pref:'定食'},
    {id:'ramen',icon:'🍜',name:'ラーメン',desc:'満足度高め。続くと体型にも影響。',effect:{hunger:-48,happiness:10,weight:0.12,bodyFat:0.12,energy:5},pref:'ラーメン'},
    {id:'cake',icon:'🍰',name:'ケーキ',desc:'甘いご褒美。機嫌が大きく上がる。',effect:{hunger:-18,happiness:13,weight:0.10,bodyFat:0.14,stress:-5},pref:'甘いもの'},
    {id:'protein',icon:'🥛',name:'高たんぱく軽食',desc:'運動と合わせると筋肉がつきやすい。',effect:{hunger:-30,happiness:2,weight:0.04,muscle:0.10,energy:4},pref:'高たんぱく食'}
  ],
  exercise:[
    {id:'walk',icon:'🚶‍♀️',name:'散歩',desc:'無理なく続けやすい運動。',effect:{energy:-5,fatigue:4,happiness:4,bodyFat:-0.06,stamina:1.2,confidence:0.4},pref:'散歩'},
    {id:'run',icon:'🏃‍♀️',name:'ランニング',desc:'体力と引き締めに効果的。',effect:{energy:-12,fatigue:11,hunger:10,bodyFat:-0.14,weight:-0.08,stamina:2.2,confidence:0.6},pref:'ランニング'},
    {id:'strength',icon:'🏋️‍♀️',name:'筋トレ',desc:'筋肉量と自信が伸びやすい。',effect:{energy:-11,fatigue:10,hunger:9,muscle:0.20,weight:0.05,stamina:1.1,confidence:1.2},pref:'筋トレ'},
    {id:'yoga',icon:'🧘‍♀️',name:'ヨガ',desc:'疲労とストレスを整える。',effect:{energy:-3,fatigue:-4,stress:-7,happiness:3,confidence:0.4},pref:'ヨガ'}
  ],
  study:[
    {id:'book',icon:'📖',name:'読書',desc:'静かに知識を増やす。',effect:{energy:-4,fatigue:4,intellect:1.6,curiosity:0.7,sociability:-0.2,stress:-1},pref:'読書'},
    {id:'language',icon:'🗣️',name:'語学',desc:'知性と積極性に少し影響。',effect:{energy:-6,fatigue:5,intellect:1.8,curiosity:0.9,confidence:0.4},pref:'語学'},
    {id:'cooking',icon:'🍳',name:'料理を覚える',desc:'生活力と好奇心が伸びる。',effect:{energy:-6,fatigue:5,intellect:0.7,curiosity:1.4,independence:0.8,happiness:3},pref:'料理'}
  ],
  play:[
    {id:'game',icon:'🎮',name:'ゲーム',desc:'家でのんびりストレス発散。',effect:{energy:-2,fatigue:2,happiness:10,stress:-7,curiosity:0.5},pref:'ゲーム'},
    {id:'outing',icon:'🛍️',name:'カフェ・買い物',desc:'刺激が多く、社交性も育ちやすい。',effect:{energy:-8,fatigue:7,happiness:9,stress:-4,sociability:1.3,curiosity:1.0,confidence:0.5},pref:'カフェ巡り'},
    {id:'music',icon:'🎧',name:'音楽を聴く',desc:'気分転換。繊細さにも少し影響。',effect:{energy:-1,fatigue:-1,happiness:7,stress:-6,sensitivity:0.8},pref:'音楽'}
  ],
  talk:[
    {id:'casual',icon:'🙂',name:'雑談する',desc:'のんびり会話して距離を縮める。',effect:{happiness:6,trust:2.2,sociability:0.5,stress:-3},pref:'おしゃべり'},
    {id:'praise',icon:'👏',name:'褒める',desc:'最近の頑張りを言葉にする。',effect:{happiness:8,trust:1.8,confidence:1.8,dependency:0.3},pref:'褒められること'},
    {id:'listen',icon:'☕',name:'話を聞く',desc:'気持ちを聞いて安心させる。',effect:{happiness:5,trust:3.0,stress:-8,sensitivity:0.3},pref:'ゆっくり話すこと'}
  ],
  rest:[
    {id:'nap',icon:'😴',name:'昼寝',desc:'短時間で疲れを回復。',effect:{energy:14,fatigue:-16,stress:-3,hunger:4},pref:'昼寝'},
    {id:'relax',icon:'🫖',name:'お茶してのんびり',desc:'何もしない時間も大事。',effect:{energy:7,fatigue:-8,happiness:5,stress:-6},pref:'のんびり'},
    {id:'bath',icon:'🛁',name:'ゆっくりお風呂',desc:'疲れとストレスをまとめてケア。',effect:{energy:5,fatigue:-10,happiness:4,stress:-8},pref:'お風呂'}
  ]
};
const actionNames={meal:'ごはん',exercise:'運動',study:'勉強',play:'おでかけ',talk:'会話',rest:'休憩'};
const clamp=(n,min=0,max=100)=>Math.max(min,Math.min(max,n));
const round1=n=>Math.round(n*10)/10;
const randomRange=(min,max)=>round1(min+Math.random()*(max-min));

function defaultState(){return{
  version:2,name:'桜井 結菜',age:20,birthday:'4月6日',height:160,day:1,turn:0,
  base:{metabolism:randomRange(.85,1.15),muscleGain:randomRange(.85,1.15),sensitivity:randomRange(42,68),sociability:randomRange(38,62),curiosity:randomRange(45,70)},
  status:{energy:80,hunger:35,happiness:66,fatigue:15,stress:18,trust:20},
  body:{height:160,weight:50.5,bodyFat:23.5,muscle:20.8,stamina:45},
  personality:{sociability:50,confidence:48,curiosity:56,independence:50,sensitivity:54,dependency:42,intellect:45},
  prefs:{'カフェ巡り':3,'甘いもの':2,'かわいい雑貨':3},habits:{exercise:0,study:0,late:0},
  logs:[{day:1,time:'朝',text:'結菜との新しい生活が始まった。'}],lastSpeech:'えへへ……来てくれたんだ？ 今日は何をしよっか。'
}}

function mergeDeep(base,source){
  const out={...base,...source};
  ['base','status','body','personality','prefs','habits'].forEach(k=>out[k]={...(base[k]||{}),...(source?.[k]||{})});
  out.name='桜井 結菜';out.age=20;out.version=2;return out;
}
function loadState(){
  try{
    const current=localStorage.getItem(SAVE_KEY);if(current)return mergeDeep(defaultState(),JSON.parse(current));
    const old=localStorage.getItem(OLD_SAVE_KEY);if(old){const migrated=mergeDeep(defaultState(),JSON.parse(old));migrated.logs=[{day:migrated.day||1,time:'朝',text:'v001の育成データをv002へ引き継いだ。'},...(migrated.logs||[])];localStorage.setItem(SAVE_KEY,JSON.stringify(migrated));return migrated}
  }catch(e){}
  return defaultState();
}
function saveState(){localStorage.setItem(SAVE_KEY,JSON.stringify(state))}
let state=loadState();let activePage='home';

function mood(){
  const s=state.status;
  if(s.fatigue>72||s.energy<25)return{label:'おつかれ',face:'shy',img:'assets/yuna-shy.png'};
  if(s.stress>70||s.happiness<28)return{label:'むすっと',face:'pout',img:'assets/yuna-pout.png'};
  if(s.happiness>78&&s.stress<40)return{label:'にっこり',face:'happy',img:'assets/yuna-happy.png'};
  if(s.trust>70)return{label:'照れ',face:'shy',img:'assets/yuna-shy.png'};
  return{label:'穏やか',face:'happy',img:'assets/yuna-happy.png'};
}
function bodyVariant(){
  const b=state.body,bmi=b.weight/((b.height/100)**2);
  if(b.bodyFat>=28||bmi>=23.5)return'soft';
  if(bmi<19||b.bodyFat<=21)return'slender';
  return'standard';
}
function bodyType(){
  const b=state.body,bmi=b.weight/((b.height/100)**2);
  if(b.muscle>=25&&b.bodyFat<24)return'引き締まった';
  if(bmi<18.5)return'ほっそり';
  if(b.bodyFat>=29||bmi>=24.5)return'ふっくら';
  if(b.bodyFat<=21.5)return'すっきり';
  return'標準';
}
function personalitySummary(){
  const p=state.personality,a=[];
  if(p.sociability>65)a.push('社交的');else if(p.sociability<38)a.push('おとなしい');
  if(p.confidence>65)a.push('自信家');else if(p.confidence<38)a.push('控えめ');
  if(p.curiosity>68)a.push('好奇心旺盛');
  if(p.independence>65)a.push('自立的');else if(p.dependency>65)a.push('甘えん坊');
  if(p.sensitivity>68)a.push('繊細');
  return a.length?a.slice(0,4):['優しい','マイペース'];
}
function speakingStyle(){const p=state.personality,t=state.status.trust;if(p.dependency>65&&t>45)return'甘え気味で距離が近い';if(p.sociability>68&&p.confidence>60)return'明るくテンポが速い';if(p.sensitivity>68&&p.sociability<45)return'静かでやわらかい';if(p.independence>68)return'さっぱりして自立的';return'自然体で穏やか'}
function prefLevel(name){return state.prefs[name]||0}
function prefLabel(v){if(v>=8)return'大好き';if(v>=4)return'好き';if(v<=-6)return'苦手';if(v<=-3)return'あまり好きじゃない';return'ふつう'}
function speechFor(action,choice){
  const p=state.personality,t=state.status.trust,pref=prefLevel(choice.pref);
  if(action==='meal'){if(pref>=6)return`やった、${choice.name}！これ好きなんだよね。`;if(pref<=-4)return`うーん、${choice.name}かぁ……まあ、食べてみる。`;if(p.dependency>62&&t>40)return`一緒に食べる？ そのほうがおいしい気がする。`;return`いただきます。今日は${choice.name}なんだね。`}
  if(action==='exercise'){if(pref<=-4)return`えー……${choice.name}？ ちょっとだけなら。`;if(p.confidence>62)return`${choice.name}ね。よし、今日はちゃんとやる！`;if(p.sociability<40)return`うん。自分のペースでやってみるね。`;return`${choice.name}か。気分転換になりそう！`}
  if(action==='study')return p.curiosity>65?'それ気になってた。ちょっとやってみたい！':'うん、集中できるところまでやってみるね。';
  if(action==='play')return p.sociability>65?'いいね！ 今日はちょっと外に出たい気分だったの。':'うん。こういう時間も好き。';
  if(action==='talk'){if(choice.id==='praise')return p.confidence<45?'……ほんと？ そう言ってもらえると、ちょっと嬉しい。':'ふふ、ちゃんと見てくれてたんだ。ありがと。';if(choice.id==='listen')return t>55?'じゃあ……ちょっとだけ聞いてほしいことある。':'うん。なんか落ち着くね。';return t>70?'ねえねえ、今日さ……あ、ちょっと話しすぎた？':'うん、少し話そっか。'}
  if(action==='rest')return state.status.fatigue>55?'助かる……ちょっと休みたかったところ。':'じゃあ、のんびりしよっかな。';
  return'今日は何をしようかな。';
}
function suggestion(){
  const s=state.status,p=state.personality;
  if(s.hunger>70)return'お腹すいたかも……一緒に何か食べない？';
  if(s.fatigue>60)return'今日は少しゆっくりしたいな。';
  if(s.stress>60)return'ちょっと気分転換したいかも。';
  if(p.curiosity>67)return'新しいこと、何か一緒にやってみたい！';
  if(s.trust>60&&p.dependency>55)return'ねえ、少しお話ししよ？';
  if(state.habits.exercise<2)return'今日は軽く散歩してみる？';
  return'今日は何をしようかな？ あなたが決めて♡';
}
function applyEffect(effect){Object.entries(effect).forEach(([k,v])=>{let val=v;if(['weight','bodyFat'].includes(k)&&v>0)val*=state.base.metabolism;if(k==='muscle'&&v>0)val*=state.base.muscleGain;if(k in state.status)state.status[k]=clamp(state.status[k]+val);else if(k in state.body)state.body[k]=round1(state.body[k]+val);else if(k in state.personality)state.personality[k]=clamp(state.personality[k]+val)})}
function passiveTurn(){state.status.hunger=clamp(state.status.hunger+8);state.status.energy=clamp(state.status.energy-3);state.status.fatigue=clamp(state.status.fatigue+2);if(state.status.hunger>75)state.status.happiness=clamp(state.status.happiness-3);if(state.status.fatigue>70)state.status.stress=clamp(state.status.stress+3)}
function endDay(){const before=state.day;state.day++;state.turn=0;state.status.energy=clamp(state.status.energy+34-state.status.fatigue*.08);state.status.fatigue=clamp(state.status.fatigue-34);state.status.hunger=clamp(state.status.hunger+12);state.status.stress=clamp(state.status.stress-5);if(state.status.hunger>88){state.body.weight=round1(state.body.weight-.08);state.status.energy=clamp(state.status.energy-5)}if(state.status.happiness>75)state.personality.confidence=clamp(state.personality.confidence+.25);addLog(`DAY ${before} が終了。しっかり眠って次の日へ。`,'夜')}
function addLog(text,time){state.logs.unshift({day:state.day,time,text});state.logs=state.logs.slice(0,100)}
function doChoice(action,choice){applyEffect(choice.effect);state.prefs[choice.pref]=clamp((state.prefs[choice.pref]||0)+1,-10,10);if(action==='exercise')state.habits.exercise++;if(action==='study')state.habits.study++;state.lastSpeech=speechFor(action,choice);addLog(`${actionNames[action]}：${choice.name}。${compactEffect(choice.effect)}`,TIMES[state.turn].name);passiveTurn();state.turn++;if(state.turn>=4)endDay();saveState();closeModal();render();showToast(`${choice.name}をしました`)}
function compactEffect(e){const labels={energy:'元気',hunger:'空腹',happiness:'機嫌',fatigue:'疲労',stress:'ストレス',trust:'信頼',weight:'体重',bodyFat:'体脂肪',muscle:'筋肉',stamina:'体力',sociability:'社交性',confidence:'自信',curiosity:'好奇心',independence:'自立心',sensitivity:'繊細さ',dependency:'甘え度',intellect:'知性'};return Object.entries(e).filter(([,v])=>Math.abs(v)>=1).slice(0,3).map(([k,v])=>`${labels[k]||k}${v>0?'+':''}${round1(v)}`).join(' / ')}

function openAction(action){
  const options=choices[action];
  $('#modalEyebrow').textContent='ACTION';$('#modalTitle').textContent=`${actionNames[action]}を選ぶ`;
  $('#modalBody').innerHTML=`<div class="choice-list">${options.map((c,i)=>`<button class="choice" data-choice="${action}:${i}"><span class="choice-icon">${c.icon}</span><span class="choice-copy"><b>${c.name}</b><small>${c.desc}</small></span><span class="choice-cost">${prefLabel(prefLevel(c.pref))}</span></button>`).join('')}</div>`;
  document.querySelectorAll('[data-choice]').forEach(btn=>btn.onclick=()=>{const[a,i]=btn.dataset.choice.split(':');doChoice(a,choices[a][Number(i)])});openModal();
}
function todaySummary(){const s=state.status;if(s.energy<30)return'かなり疲れ気味';if(s.hunger>70)return'お腹が空いている';if(s.stress>65)return'少しストレス気味';if(s.happiness>78)return'かなりごきげん';return'穏やかに過ごせそう'}
function currentSeason(){const d=((state.day-1)%120)+1;if(d<=30)return'春';if(d<=60)return'夏';if(d<=90)return'秋';return'冬'}
function setBar(id,v){$(id).style.width=`${clamp(v)}%`}
function bodyScale(){const b=state.body,bmi=b.weight/((b.height/100)**2);return clamp(1+(bmi-19.7)*.018,.96,1.07)}
function render(){
  const s=state.status,b=state.body,m=mood(),variant=bodyVariant();
  $('#seasonLabel').textContent=currentSeason();$('#dayLabel').textContent=`DAY ${state.day}`;$('#timeLabel').textContent=`${TIMES[state.turn].icon} ${TIMES[state.turn].name}`;
  $('#trustTop').textContent=Math.round(s.trust);$('#moodTop').textContent=Math.round(s.happiness);
  $('#happinessText').textContent=Math.round(s.happiness);$('#energyText').textContent=Math.round(s.energy);$('#hungerText').textContent=Math.round(s.hunger);$('#trustText').textContent=Math.round(s.trust);
  setBar('#happinessBar',s.happiness);setBar('#energyBar',s.energy);setBar('#hungerBar',100-s.hunger);setBar('#trustBar',s.trust);
  $('#speech').textContent=state.lastSpeech;$('#moodBadge').textContent=m.label;$('#todaySummary').textContent=todaySummary();$('#bodyTypeHome').textContent=bodyType();$('#turnsLeft').textContent=`${4-state.turn}回`;$('#turnsLeftTraining').textContent=4-state.turn;$('#suggestionText').textContent=suggestion();
  $('#mainCharacter').style.setProperty('--bodyScale',bodyScale());$('#trainingFace').src=m.img;$('#profileFace').src=m.img;$('#trainingSpeech').textContent=suggestion();$('#profileMood').textContent=m.label;
  $('#personalityTags').innerHTML=personalitySummary().map(x=>`<span>${x}</span>`).join('');
  document.querySelectorAll('.body-option').forEach(el=>el.classList.toggle('active',el.dataset.bodyVariant===variant));
  $('#bodyDetail').textContent=`現在：${bodyType()}`;$('#weightText').textContent=`${b.weight.toFixed(1)}kg`;$('#bodyFatText').textContent=`${b.bodyFat.toFixed(1)}%`;$('#muscleText').textContent=b.muscle.toFixed(1);$('#speakingStyleText').textContent=speakingStyle();
  renderLikes();renderRecord();drawRadar();showPage(activePage,false);
}
function renderLikes(){const arr=Object.entries(state.prefs).sort((a,b)=>b[1]-a[1]).filter(([,v])=>v>0).slice(0,10);$('#likesList').innerHTML=arr.length?arr.map(([k,v])=>`<span>${escapeHtml(k)}・${prefLabel(v)}</span>`).join(''):'<span>まだ好みを探している途中</span>'}
function renderRecord(){$('#recordDays').textContent=`${state.day}日`;$('#recordExercise').textContent=`${state.habits.exercise||0}回`;$('#recordStudy').textContent=`${state.habits.study||0}回`;$('#logList').innerHTML=(state.logs||[]).map(x=>`<div class="log-item"><small>DAY ${x.day}・${escapeHtml(x.time)}</small><br>${escapeHtml(x.text)}</div>`).join('')}
function drawRadar(){
  const c=$('#radarCanvas');if(!c)return;const ctx=c.getContext('2d');const W=c.width,H=c.height,cx=W/2,cy=H/2+4,R=92;ctx.clearRect(0,0,W,H);
  const items=[['社交性',state.personality.sociability],['自信',state.personality.confidence],['甘え度',state.personality.dependency],['体力',state.body.stamina],['好奇心',state.personality.curiosity],['知性',state.personality.intellect]];
  const pts=(rad)=>items.map((_,i)=>{const a=-Math.PI/2+i*Math.PI*2/items.length;return[cx+Math.cos(a)*rad,cy+Math.sin(a)*rad]});
  ctx.strokeStyle='#efd7de';ctx.lineWidth=1;for(let k=1;k<=4;k++){const p=pts(R*k/4);ctx.beginPath();p.forEach((q,i)=>i?ctx.lineTo(...q):ctx.moveTo(...q));ctx.closePath();ctx.stroke()}
  pts(R).forEach((q,i)=>{ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(...q);ctx.stroke()});
  const data=items.map(([,v],i)=>{const a=-Math.PI/2+i*Math.PI*2/items.length,r=R*clamp(v)/100;return[cx+Math.cos(a)*r,cy+Math.sin(a)*r]});
  ctx.beginPath();data.forEach((q,i)=>i?ctx.lineTo(...q):ctx.moveTo(...q));ctx.closePath();ctx.fillStyle='rgba(238,126,157,.22)';ctx.fill();ctx.strokeStyle='#e77999';ctx.lineWidth=2;ctx.stroke();
  ctx.fillStyle='#6f515b';ctx.font='12px sans-serif';ctx.textAlign='center';items.forEach(([name,v],i)=>{const a=-Math.PI/2+i*Math.PI*2/items.length;const x=cx+Math.cos(a)*(R+28),y=cy+Math.sin(a)*(R+20);ctx.fillText(name,x,y);ctx.fillStyle='#d76586';ctx.fillText(Math.round(v),x,y+14);ctx.fillStyle='#6f515b'});
}
function showPage(name,scroll=true){activePage=name;document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.dataset.page===name));document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.nav===name));if(scroll)window.scrollTo({top:0,behavior:'smooth'})}
function newGame(){if(!confirm('育成データをリセットして最初から始めますか？'))return;state=defaultState();saveState();closeDrawer();render();showToast('新しい生活を始めました')}
function openModal(){const m=$('#modal');m.classList.add('open');m.setAttribute('aria-hidden','false')}
function closeModal(){const m=$('#modal');m.classList.remove('open');m.setAttribute('aria-hidden','true')}
function openDrawer(){const d=$('#drawer');d.classList.add('open');d.setAttribute('aria-hidden','false')}
function closeDrawer(){const d=$('#drawer');d.classList.remove('open');d.setAttribute('aria-hidden','true')}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function $(q){return document.querySelector(q)}
let toastTimer;function showToast(text){const t=$('#toast');t.textContent=text;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('show'),1700)}

$('#menuBtn').onclick=openDrawer;document.querySelectorAll('[data-close="drawer"]').forEach(x=>x.onclick=closeDrawer);document.querySelectorAll('[data-close="modal"]').forEach(x=>x.onclick=closeModal);document.querySelectorAll('[data-close="sheet"]').forEach(x=>x.onclick=()=>$('#sheetModal').classList.remove('open'));
document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>showPage(b.dataset.nav));document.querySelectorAll('[data-page-link]').forEach(b=>b.onclick=()=>showPage(b.dataset.pageLink));document.querySelectorAll('.action-card').forEach(b=>b.onclick=()=>openAction(b.dataset.action));
$('#talkQuick').onclick=()=>openAction('talk');$('#suggestionBtn').onclick=()=>showPage('training');$('#newGameBtn').onclick=newGame;$('#openSheetBtn').onclick=()=>{$('#sheetModal').classList.add('open');closeDrawer()};
render();

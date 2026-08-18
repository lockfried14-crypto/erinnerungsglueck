'use client';

import { useEffect, useMemo, useState } from 'react';

// Deployment trigger: direct component build 2026-08-18
const LOGO='/erinnerungsglueck-logo-hq.webp?v=20260818f';
const FALLBACK='/erinnerungsglueck-logo.jpg?v=20260818f';
const NAV=[['Start','⌂'],['Reise','♧'],['Packlisten','▣'],['Erinnerungen','♡'],['Budget','€']];
const LISTS={
  'Handgepäck':['Reisepässe','Personalausweise','Buchungsbestätigung','Versicherungskarte','Tickets','Geldbörse','Handy','Ladegerät','Medikamente','Kopfhörer','Snacks','Trinkflasche','Feuchttücher','Wechselkleidung','Kuscheltier','Reiseunterlagen','Powerbank','Adapter','Sonnenbrille','Stift','Taschentücher','Desinfektion','Schlüssel','Notfallkontakte'],
  'Kleidung':['Unterwäsche','Socken','Shirts / Tops','Hosen / Röcke','Pullover / Jacke','Schlafsachen','Badesachen','Schuhe','Sandalen','Kopfbedeckung','Leichte Jacke','Abendkleidung','Sportkleidung','Strandkleidung','Gürtel','Wäschebeutel','Ersatzschuhe','Regenjacke','Schlafshirt','Kurze Hosen','Kleider','Badehose','Bikini / Badeanzug','Strandschuhe','Schlafanzug','Unterhemd','Strümpfe','Leggings','Hemd / Bluse','Cardigan','Sonnenhut','Mütze','Halstuch','Badelatschen','Badeschuhe','Ersatzkleidung'],
  'Toilettenartikel':['Zahnbürsten','Zahnpasta','Duschgel / Shampoo','Sonnencreme','Deo','Haarbürste','Rasierer','Feuchttücher','After Sun','Lippenpflege','Kosmetik','Haargummis','Nagelpflege','Parfum','Kontaktlinsen','Hygieneartikel','Handdesinfektion','Taschentücher'],
  'Technik':['Handys','Ladegeräte','Powerbank','Adapter','Kopfhörer','Kamera','eSIM eingerichtet','Offline-Unterlagen','Tablet','Smartwatch','Speicherkarten','Kabel','Mehrfachstecker','E-Reader','Laptop'],
  'Unterlagen':['Reisepässe / Ausweise','Einreisebestimmungen / Visa geprüft','Versicherungsunterlagen gespeichert','Online Check-in erledigt','Sitzplätze / Gepäck geprüft','Transfer / Parkplatz bestätigt','Bankkarten / Bargeld vorbereitet','Buchungsbestätigungen','Tickets','Notfallkontakte']
};

function Brand({large=false}){return <img className={large?'brand brandLarge':'brand'} src={LOGO} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src=FALLBACK}} alt="Erinnerungsglück – Familienlogo"/>}

export default function Home(){
  const [screen,setScreen]=useState('Start');
  const [trip,setTrip]=useState({titel:'Unser Familienurlaub',ziel:'Hurghada, Ägypten',von:'2026-12-21',bis:'2027-01-03',budget:'2500'});
  const [expenses,setExpenses]=useState([{id:1,name:'Unterkunft',amount:750},{id:2,name:'Transport',amount:250},{id:3,name:'Verpflegung',amount:150},{id:4,name:'Aktivitäten',amount:300}]);
  const [memory,setMemory]=useState({title:'',text:'',best:'',image:''});
  const [memories,setMemories]=useState([]);
  const [selectedList,setSelectedList]=useState('Handgepäck');
  const [checked,setChecked]=useState({});
  const [saved,setSaved]=useState(false);

  useEffect(()=>{try{const t=localStorage.getItem('eg-trip');const e=localStorage.getItem('eg-expenses');const m=localStorage.getItem('eg-memories');const c=localStorage.getItem('eg-checks');if(t)setTrip(JSON.parse(t));if(e)setExpenses(JSON.parse(e));if(m)setMemories(JSON.parse(m));if(c)setChecked(JSON.parse(c));}catch{}},[]);
  const spent=useMemo(()=>expenses.reduce((s,x)=>s+Number(x.amount||0),0),[expenses]);
  const rest=Math.max(0,Number(trip.budget||0)-spent);
  const go=s=>{setScreen(s);window.scrollTo({top:0,behavior:'instant'})};
  const saveTrip=()=>{localStorage.setItem('eg-trip',JSON.stringify(trip));setSaved(true);setTimeout(()=>setSaved(false),1200)};
  const toggle=(list,item)=>{const key=list+'|'+item;const next={...checked,[key]:!checked[key]};setChecked(next);localStorage.setItem('eg-checks',JSON.stringify(next))};
  const doneCount=list=>LISTS[list].filter(x=>checked[list+'|'+x]).length;
  const addExpense=(name,amount)=>{const next=[...expenses,{id:Date.now(),name,amount:Number(amount)}];setExpenses(next);localStorage.setItem('eg-expenses',JSON.stringify(next))};
  const chooseMemory=file=>{if(!file)return;const r=new FileReader();r.onload=()=>setMemory(x=>({...x,image:String(r.result||'')}));r.readAsDataURL(file)};
  const saveMemory=()=>{if(!memory.image&&!memory.title&&!memory.text&&!memory.best)return;const next=[{id:Date.now(),...memory},...memories];setMemories(next);localStorage.setItem('eg-memories',JSON.stringify(next));setMemory({title:'',text:'',best:'',image:''})};

  const header=(title,sub,back=false)=><><div className="topline"><button className="iconBtn" onClick={()=>back?go(back):go('Einstellungen')}>{back?'‹':'☰'}</button><Brand/><button className="iconBtn" onClick={()=>go('Reise')}>{back?'':'＋'}</button></div><h1 className="pageTitle">{title}</h1>{sub&&<p className="pageSub">{sub}</p>}</>;

  function BottomNav(){
    const navStyle={position:'fixed',left:0,right:0,bottom:0,height:72,display:'flex',zIndex:60,background:'#fffaf4',borderTop:'1px solid #eadfd5',boxShadow:'0 -2px 10px rgba(50,40,30,.04)'};
    return <nav style={navStyle}>{NAV.map(([name,icon])=><button key={name} onClick={()=>go(name)} style={{flex:1,minWidth:0,border:0,background:'transparent',color:screen===name?'#b84c36':'#425452',padding:'8px 1px 5px',fontWeight:screen===name?700:500}}><span style={{display:'block',fontSize:20,lineHeight:1.05}}>{icon}</span><small style={{display:'block',fontSize:8,marginTop:5,whiteSpace:'nowrap'}}>{name}</small></button>)}</nav>
  }

  function Start(){
    return <section style={{position:'relative',minHeight:'calc(100svh - 72px)',width:'100%',overflow:'hidden',background:'#fff8ef',padding:'18px 24px 110px',color:'#183f3a'}}>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:205,position:'relative',zIndex:5}}>
        <img src={LOGO} onError={e=>{e.currentTarget.onerror=null;e.currentTarget.src=FALLBACK}} alt="Erinnerungsglück – Familienlogo" style={{display:'block',width:'min(340px,92vw)',height:195,objectFit:'contain',opacity:1,visibility:'visible'}}/>
      </div>
      <div style={{position:'relative',zIndex:4,maxWidth:500}}>
        <div style={{fontSize:10,letterSpacing:'1.45px',fontWeight:700,color:'#124f49',margin:'4px 0 10px'}}>FAMILIEN-REISEPLANER</div>
        <h1 style={{fontFamily:"'Playfair Display', Georgia, serif",fontSize:'clamp(31px,8.5vw,43px)',lineHeight:1.05,letterSpacing:'-.3px',margin:0,color:'#124f49',fontWeight:700}}>Weniger<br/>Organisationsstress.<br/><em style={{display:'block',color:'#b84c36',fontWeight:600,marginTop:5}}>Mehr gemeinsame Zeit.</em></h1>
        <p style={{fontSize:13,lineHeight:1.6,color:'#53605e',maxWidth:390,margin:'16px 0'}}>Plant eure Reise gemeinsam, behaltet alles Wichtige an einem Ort und haltet eure schönsten Momente fest.</p>
        <button onClick={()=>go('Reise')} style={{border:0,background:'#b84c36',color:'#fff',borderRadius:8,padding:'14px 19px',fontWeight:700,fontSize:14,boxShadow:'0 5px 12px rgba(174,65,45,.18)'}}>Reise öffnen <b style={{marginLeft:16}}>›</b></button>
      </div>
      <div style={{position:'absolute',left:0,right:0,bottom:0,height:195,zIndex:1,pointerEvents:'none'}}>
        <i style={{position:'absolute',display:'block',width:'145%',height:62,left:'-18%',bottom:72,transform:'rotate(-34deg)',background:'#df9981'}}/>
        <i style={{position:'absolute',display:'block',width:'145%',height:62,left:'-18%',bottom:25,transform:'rotate(-34deg)',background:'#4f8179'}}/>
        <i style={{position:'absolute',display:'block',width:'145%',height:62,left:'-18%',bottom:-22,transform:'rotate(-34deg)',background:'#124f49'}}/>
      </div>
    </section>
  }

  function Reise(){return <section className="appScreen">{header('Eure Reise','Alles Wichtige an einem Ort.')}<div className="card tripSummary"><label>Reisename<input value={trip.titel} onChange={e=>setTrip({...trip,titel:e.target.value})}/></label><label>Reiseziel<input value={trip.ziel} onChange={e=>setTrip({...trip,ziel:e.target.value})}/><span>●</span></label><button className="rowBtn" onClick={()=>go('Reisedetails')}><b>{formatDate(trip.von)} – {formatDate(trip.bis)}</b><span>▣</span></button><div className="rowBtn"><div><small>Reisende</small><b>2 Erwachsene, 1 Kind</b></div><span>♣</span></div></div><div className="card menuCard"><button onClick={()=>go('Reisedetails')}>⏱ <span>Reisedetails</span> ›</button><button>▰ <span>Unterkünfte</span> ›</button><button>▣ <span>Transport</span> ›</button><button>⌘ <span>Aktivitäten</span> ›</button></div><button className="saveBtn" onClick={saveTrip}>{saved?'Gespeichert ✓':'Reise speichern'}</button></section>}

  function Packlisten(){return <section className="appScreen">{header('Packlisten','Alles für eine entspannte Reise.')}<div className="tabs"><button className="selected">Meine Listen</button><button>Vorlagen</button></div><div className="card listCard">{Object.keys(LISTS).map((name,i)=>{const d=doneCount(name);return <button key={name} onClick={()=>{setSelectedList(name);go('PacklistDetail')}}><span className="listIcon">{['▥','♧','♙','⌁','▤'][i]}</span><span className="listText"><b>{name}</b><small>{d} / {LISTS[name].length} erledigt</small><i><em style={{width:(d/LISTS[name].length*100)+'%'}}/></i></span><strong>›</strong></button>})}</div><button className="floatBtn">＋</button></section>}

  function Erinnerungen(){return <section className="appScreen">{header('Erinnerungen','Unsere schönsten Momente.')}<div className="tabs three"><button className="selected">Fotos</button><button>Momente</button><button>Reisetagebuch</button></div>{memories.length?<div className="gallery">{memories.map(m=><div key={m.id}>{m.image?<img src={m.image} alt={m.title||'Erinnerung'}/>:<div className="photoPlaceholder">♡</div>}</div>)}</div>:<div className="gallery demoGallery">{['🌅','🐠','🌴','🐪','🏖️','🌇'].map((x,i)=><div key={i} className={'demoPhoto p'+i}><span>{x}</span></div>)}</div>}<div className="memoryAdd card"><input placeholder="Titel" value={memory.title} onChange={e=>setMemory({...memory,title:e.target.value})}/><textarea placeholder="Eure Erinnerung" value={memory.text} onChange={e=>setMemory({...memory,text:e.target.value})}/><input type="file" accept="image/*" onChange={e=>chooseMemory(e.target.files?.[0])}/><button className="primary" onClick={saveMemory}>Erinnerung speichern</button></div></section>}

  function Budget(){const [n,setN]=useState('');const [a,setA]=useState('');return <section className="appScreen">{header('Budget','Den Überblick behalten.')}<div className="card budgetHero"><small>Gesamtes Budget</small><h2>{money(trip.budget)}</h2><div><span><small>Verbraucht</small><b>{money(spent)}</b></span><span><small>Verbleibend</small><b>{money(rest)}</b></span></div><div className="progress"><i style={{width:Math.min(100,spent/Number(trip.budget||1)*100)+'%'}}/></div></div><h3 className="sectionLabel">Kategorien</h3><div className="card categories">{expenses.map((x,i)=><div key={x.id}><span>{['▰','▣','♜','☼','⊕'][i%5]} {x.name}</span><b>{money(x.amount)}</b></div>)}</div><div className="card quickAdd"><input placeholder="Kategorie" value={n} onChange={e=>setN(e.target.value)}/><input placeholder="Betrag €" inputMode="decimal" value={a} onChange={e=>setA(e.target.value)}/><button onClick={()=>{if(n&&a){addExpense(n,a);setN('');setA('')}}}>＋</button></div></section>}

  function Reisedetails(){return <section className="appScreen">{header('Reisedetails','', 'Reise')}<div className="card detailCard">{[['✈','Abflug','21.12.2026, 08:00 Uhr','Hamburg (HAM)'],['✈','Ankunft','21.12.2026, 13:50 Uhr','Hurghada (HRG)'],['✈','Rückflug','03.01.2027, 14:50 Uhr','Hurghada (HRG)'],['✈','Ankunft','03.01.2027, 18:40 Uhr','Hamburg (HAM)']].map(x=><div key={x[1]+x[2]}><span>{x[0]}</span><b>{x[1]}</b><p>{x[2]}<br/>{x[3]}</p></div>)}</div><div className="card detailCard mini"><div><span>▢</span><b>Fluggesellschaft</b><p>Condor (DE2 / DE3)</p></div><div><span>⌾</span><b>Buchungsnummer</b><p>123456789</p></div></div></section>}

  function PacklistDetail(){const items=LISTS[selectedList];return <section className="appScreen">{header('Packliste: '+selectedList,'','Packlisten')}<div className="card progressCard"><div><span>Fortschritt</span><b>{doneCount(selectedList)} / {items.length} erledigt</b></div><div className="progress"><i style={{width:(doneCount(selectedList)/items.length*100)+'%'}}/></div></div><h3 className="sectionLabel">{selectedList==='Handgepäck'?'Dokumente':selectedList}</h3><div className="card checkRows">{items.map(item=><label key={item}><input type="checkbox" checked={!!checked[selectedList+'|'+item]} onChange={()=>toggle(selectedList,item)}/><span>{item}</span><b>⌄</b></label>)}</div><button className="floatBtn">＋</button></section>}

  function Einstellungen(){return <section className="appScreen">{header('Einstellungen','', 'Start')}<div className="card menuCard settings">{['Profil & Familie','App-Einstellungen','Benachrichtigungen','Sicherung & Export','Hilfe & FAQ','Über Erinnerungsglück'].map((x,i)=><button key={x}>{['♙','⚙','♧','♧','?','ⓘ'][i]} <span>{x}</span> ›</button>)}</div><button className="logout">Abmelden</button></section>}

  let content=screen==='Start'?<Start/>:screen==='Reise'?<Reise/>:screen==='Packlisten'?<Packlisten/>:screen==='Erinnerungen'?<Erinnerungen/>:screen==='Budget'?<Budget/>:screen==='Reisedetails'?<Reisedetails/>:screen==='PacklistDetail'?<PacklistDetail/>:<Einstellungen/>;
  return <main style={{minHeight:'100vh',background:'#fff8ef',paddingBottom:72}}>{content}<BottomNav/></main>;
}

function formatDate(s){if(!s)return '—';const [y,m,d]=s.split('-');return `${d}.${m}.${y}`}
function money(v){return Number(v||0).toLocaleString('de-DE',{style:'currency',currency:'EUR'})}

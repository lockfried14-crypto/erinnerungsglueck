'use client';

import { useEffect, useState } from 'react';

const modules = [
  ['🗺️','Reise planen','Ziel, Zeitraum, Unterkunft und Anreise an einem Ort.'],
  ['🛂','Einreise & Visum','Wichtige Einreiseinformationen übersichtlich vorbereiten.'],
  ['✓','Checklisten','Packliste, Dokumente und To-dos gemeinsam abhaken.'],
  ['€','Budgetplaner','Urlaubsbudget festlegen und Ausgaben im Blick behalten.'],
  ['📸','Erinnerungen','Fotos, Lieblingsmomente und kleine Geschichten bewahren.'],
  ['👨‍👩‍👧','Familie','Reisende und ihre Bedürfnisse zentral hinterlegen.']
];

export default function Home() {
  const [active,setActive]=useState('Start');
  const [trip,setTrip]=useState({ziel:'',von:'',bis:'',budget:''});
  const [saved,setSaved]=useState(false);
  useEffect(()=>{try{const x=localStorage.getItem('eg-trip'); if(x)setTrip(JSON.parse(x));}catch{}},[]);
  function save(){localStorage.setItem('eg-trip',JSON.stringify(trip));setSaved(true);setTimeout(()=>setSaved(false),1800)}
  return <main>
    <header className="top"><div className="brand"><span className="heart">♡</span><div><strong>Erinnerungsglück</strong><small>FAMILIEN-REISEPLANER</small></div></div><button className="profile">♡</button></header>
    <section className="hero">
      <div className="heroText"><span className="eyebrow">GEMEINSAME ZEIT. ERINNERUNGEN FÜRS LEBEN.</span><h1>Urlaub planen.<br/><em>Familienzeit genießen.</em></h1><p>Weniger Organisationsstress, mehr Vorfreude: Plant eure Reise gemeinsam und bewahrt die schönsten Erinnerungen an einem Ort.</p><button onClick={()=>document.getElementById('planner').scrollIntoView({behavior:'smooth'})}>Reise planen →</button></div>
      <div className="scene"><div className="sun"></div><div className="family">♙ <b>♥</b> ♙</div><div className="sea"></div></div>
    </section>
    <section className="promise"><b>Planen.</b><span>Erleben.</span><b>Erinnern.</b><span>Glücklich sein.</span></section>
    <section className="intro"><span className="eyebrow">ALLES FÜR EURE REISE</span><h2>Von der ersten Idee bis zur<br/><em>Lieblingserinnerung</em></h2><p>Erinnerungsglück begleitet euch durch die ganze Reise – einfach, familienfreundlich und ohne Zettelchaos.</p></section>
    <section className="cards">{modules.map(([i,t,d])=><article key={t} onClick={()=>setActive(t)}><div className="icon">{i}</div><h3>{t}</h3><p>{d}</p><span>Öffnen →</span></article>)}</section>
    <section id="planner" className="planner"><div><span className="eyebrow">EURE NÄCHSTE REISE</span><h2>Wohin geht euer<br/><em>nächstes Abenteuer?</em></h2><p>Legt die Eckdaten fest. Sie werden auf diesem Gerät gespeichert.</p></div><div className="form"><label>Reiseziel<input value={trip.ziel} onChange={e=>setTrip({...trip,ziel:e.target.value})} placeholder="z. B. Hurghada, Ägypten"/></label><div className="row"><label>Von<input type="date" value={trip.von} onChange={e=>setTrip({...trip,von:e.target.value})}/></label><label>Bis<input type="date" value={trip.bis} onChange={e=>setTrip({...trip,bis:e.target.value})}/></label></div><label>Budget (€)<input inputMode="decimal" value={trip.budget} onChange={e=>setTrip({...trip,budget:e.target.value})} placeholder="z. B. 3000"/></label><button onClick={save}>{saved?'✓ Gespeichert':'Reise speichern'}</button></div></section>
    <footer><div className="brand"><span className="heart">♡</span><div><strong>Erinnerungsglück</strong><small>GEMEINSAME ZEIT. ERINNERUNGEN FÜRS LEBEN.</small></div></div><p>Mit Liebe für Familien gemacht. ♡</p></footer>
    <nav className="bottom">{[['⌂','Start'],['☑','Planen'],['✈','Reise'],['▣','Erinnern']].map(([i,t])=><button key={t} className={active===t?'active':''} onClick={()=>{setActive(t);if(t==='Planen')document.getElementById('planner').scrollIntoView({behavior:'smooth'})}}><b>{i}</b><span>{t}</span></button>)}</nav>
  </main>
}

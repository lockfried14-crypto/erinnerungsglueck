'use client';

import { useEffect, useMemo, useState } from 'react';

const TABS=['Start','Reise','Planen','Budget','Erinnerungen'];
const modules=[
  ['✈️','Reise','Reisedaten, Unterkunft, Anreise und wichtige Infos'],
  ['🛂','Einreise & Visum','Einreisebestimmungen und Dokumente im Blick behalten'],
  ['✅','Checklisten','Packliste, Reiseapotheke und To-dos gemeinsam abhaken'],
  ['€','Budget','Budget festlegen, Ausgaben erfassen und Restbudget sehen'],
  ['📷','Erinnerungen','Fotos, Lieblingsmomente und kleine Geschichten bewahren'],
  ['👨‍👩‍👧','Familie','Mitreisende und individuelle Bedürfnisse hinterlegen']
];

export default function Home(){
  const [active,setActive]=useState('Start');
  const [trip,setTrip]=useState({titel:'Unser Familienurlaub',ziel:'',von:'',bis:'',budget:'3000'});
  const [expenses,setExpenses]=useState([]);
  const [expense,setExpense]=useState({name:'',amount:''});
  const [saved,setSaved]=useState(false);
  useEffect(()=>{try{const t=localStorage.getItem('eg-trip');const e=localStorage.getItem('eg-expenses');if(t)setTrip(JSON.parse(t));if(e)setExpenses(JSON.parse(e));}catch{}},[]);
  const spent=useMemo(()=>expenses.reduce((s,x)=>s+Number(x.amount||0),0),[expenses]);
  const budget=Number(trip.budget||0); const rest=Math.max(0,budget-spent);
  function saveTrip(){localStorage.setItem('eg-trip',JSON.stringify(trip));setSaved(true);setTimeout(()=>setSaved(false),1500)}
  function addExpense(){if(!expense.name||!expense.amount)return;const next=[...expenses,{...expense,id:Date.now()}];setExpenses(next);localStorage.setItem('eg-expenses',JSON.stringify(next));setExpense({name:'',amount:''})}
  function go(tab){setActive(tab);setTimeout(()=>document.getElementById(tab.toLowerCase())?.scrollIntoView({behavior:'smooth',block:'start'}),30)}
  return <main>
    <header className="topbar">
      <img className="realLogo" src="/erinnerungsglueck-logo.jpg" alt="Erinnerungsglück – Familienlogo mit uns dreien" />
      <div className="brandText"><strong>Erinnerungsglück</strong><small>GEMEINSAME ZEIT. ERINNERUNGEN FÜRS LEBEN.</small></div>
    </header>

    <section id="start" className="screen heroCard">
      <div className="kicker">FAMILIEN-REISEPLANER</div>
      <h1>Weniger Organisationsstress.<br/><em>Mehr gemeinsame Zeit.</em></h1>
      <p>Plant eure Reise gemeinsam, behaltet alles Wichtige an einem Ort und haltet eure schönsten Momente fest.</p>
      <button className="primary" onClick={()=>go('Reise')}>Reise öffnen <span>›</span></button>
    </section>

    <section className="screen tripBlock">
      <div className="sectionHead"><div><div className="kicker">EURE REISEN</div><h2>{trip.titel}</h2></div><button className="round" onClick={()=>go('Reise')}>+</button></div>
      <div className="tripCard"><div><b>{trip.ziel||'Reiseziel noch festlegen'}</b><span>{trip.von&&trip.bis?`${trip.von} – ${trip.bis}`:'Zeitraum noch offen'}</span></div><button onClick={()=>go('Planen')}>Planen</button></div>
    </section>

    <section className="screen moduleGrid">{modules.map(([i,t,d])=><button key={t} className="module" onClick={()=>go(t==='Budget'?'Budget':t==='Erinnerungen'?'Erinnerungen':t==='Reise'?'Reise':'Planen')}><span className="modIcon">{i}</span><b>{t}</b><small>{d}</small></button>)}</section>

    <section id="reise" className="screen panel"><div className="kicker">REISE ANLEGEN</div><h2>Unser nächstes Abenteuer</h2><label>Reisename<input value={trip.titel} onChange={e=>setTrip({...trip,titel:e.target.value})}/></label><label>Reiseziel<input value={trip.ziel} onChange={e=>setTrip({...trip,ziel:e.target.value})} placeholder="z. B. Hurghada, Ägypten"/></label><div className="two"><label>Von<input type="date" value={trip.von} onChange={e=>setTrip({...trip,von:e.target.value})}/></label><label>Bis<input type="date" value={trip.bis} onChange={e=>setTrip({...trip,bis:e.target.value})}/></label></div><button className="primary full" onClick={saveTrip}>{saved?'✓ Gespeichert':'Reise speichern'}</button></section>

    <section id="planen" className="screen panel"><div className="kicker">PLANEN</div><h2>Alles Wichtige vor der Reise</h2><div className="checklist">{['Reisepässe prüfen','Einreise- & Visabestimmungen prüfen','Auslandskrankenversicherung','Flug & Transfer hinterlegen','Packliste erstellen','Reiseapotheke zusammenstellen'].map(x=><label key={x}><input type="checkbox"/> <span>{x}</span></label>)}</div></section>

    <section id="budget" className="screen panel budgetPanel"><div className="kicker">BUDGETPLANER</div><h2>Urlaubskosten im Blick</h2><label>Gesamtbudget (€)<input inputMode="decimal" value={trip.budget} onChange={e=>setTrip({...trip,budget:e.target.value})} onBlur={saveTrip}/></label><div className="budgetStats"><div><small>Budget</small><b>{budget.toFixed(2)} €</b></div><div><small>Ausgegeben</small><b>{spent.toFixed(2)} €</b></div><div><small>Übrig</small><b>{rest.toFixed(2)} €</b></div></div><div className="expenseRow"><input value={expense.name} onChange={e=>setExpense({...expense,name:e.target.value})} placeholder="z. B. Transfer"/><input inputMode="decimal" value={expense.amount} onChange={e=>setExpense({...expense,amount:e.target.value})} placeholder="€"/><button onClick={addExpense}>+</button></div><div className="expenses">{expenses.length===0?<p>Noch keine Ausgaben erfasst.</p>:expenses.map(x=><div key={x.id}><span>{x.name}</span><b>{Number(x.amount).toFixed(2)} €</b></div>)}</div></section>

    <section id="erinnerungen" className="screen panel memories"><div className="kicker">ERINNERUNGEN</div><h2>Momente fürs Leben bewahren</h2><p>Hier entsteht euer gemeinsames Reisetagebuch mit Fotos, Lieblingsmomenten und kleinen Geschichten.</p><div className="memoryEmpty"><span>♡</span><b>Eure erste Erinnerung</b><small>Fotos und Texte kommen im nächsten Ausbauschritt hinzu.</small></div></section>

    <nav className="bottomNav">{TABS.map(t=><button key={t} onClick={()=>go(t)} className={active===t?'active':''}><span>{t==='Start'?'⌂':t==='Reise'?'✈':t==='Planen'?'☑':t==='Budget'?'€':'♡'}</span><small>{t}</small></button>)}</nav>
  </main>
}

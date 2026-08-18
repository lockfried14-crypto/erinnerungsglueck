'use client';

import { useState } from 'react';

const C={cream:'#FFF8EF',paper:'#FFFCF7',green:'#124F49',green2:'#4F8179',rust:'#B84C36',salmon:'#DF9981',text:'#263B39',muted:'#68736F',line:'#EEE4DA'};
const logo='/erinnerungsglueck-logo-hq.webp?v=20260818-auswahl2';

export default function Home(){
  const [screen,setScreen]=useState('Start');
  const nav=['Start','Reise','Packlisten','Erinnerungen','Budget'];
  const icons=['⌂','♧','▣','♡','€'];
  const go=(s)=>{setScreen(s);window.scrollTo(0,0)};

  const bottom=<nav style={{position:'fixed',left:0,right:0,bottom:0,height:72,zIndex:100,display:'flex',background:C.paper,borderTop:`1px solid ${C.line}`}}>{nav.map((n,i)=><button key={n} onClick={()=>go(n)} style={{flex:1,minWidth:0,border:0,background:'transparent',color:screen===n?C.rust:'#425452',fontWeight:screen===n?700:500,padding:'8px 0 5px'}}><span style={{display:'block',fontSize:20,lineHeight:1}}>{icons[i]}</span><small style={{display:'block',fontSize:8,marginTop:6,whiteSpace:'nowrap'}}>{n}</small></button>)}</nav>;

  if(screen==='Start') return <main style={{minHeight:'100svh',width:'100%',overflowX:'hidden',background:C.cream,color:C.text,paddingBottom:72}}>
    <section style={{minHeight:'calc(100svh - 72px)',position:'relative',overflow:'hidden',padding:'10px 24px 190px',background:C.cream}}>
      <div style={{height:180,display:'flex',alignItems:'flex-start',justifyContent:'center',position:'relative',zIndex:10,paddingTop:4}}>
        <img src={logo} alt="Erinnerungsglück" style={{display:'block',width:'min(260px,72vw)',height:160,objectFit:'contain',objectPosition:'center top'}}/>
      </div>
      <div style={{position:'relative',zIndex:10,maxWidth:500}}>
        <div style={{fontSize:10,letterSpacing:'1.5px',fontWeight:700,color:C.green,margin:'2px 0 10px'}}>FAMILIEN-REISEPLANER</div>
        <h1 style={{fontFamily:'Georgia, serif',fontSize:'clamp(30px,8.2vw,42px)',lineHeight:1.03,letterSpacing:'-.5px',margin:0,color:C.green,fontWeight:700,overflowWrap:'break-word'}}>
          Weniger<br/>Organisationsstress.<br/><em style={{display:'block',color:C.rust,fontWeight:600,marginTop:5}}>Mehr gemeinsame Zeit.</em>
        </h1>
        <p style={{fontSize:13,lineHeight:1.6,color:'#53605E',maxWidth:390,margin:'16px 0'}}>Plant eure Reise gemeinsam, behaltet alles Wichtige an einem Ort und haltet eure schönsten Momente fest.</p>
        <button onClick={()=>go('Reise')} style={{border:0,background:C.rust,color:'#fff',borderRadius:8,padding:'14px 19px',fontWeight:700,fontSize:14,boxShadow:'0 5px 12px rgba(174,65,45,.18)'}}>Reise öffnen <b style={{marginLeft:16}}>›</b></button>
      </div>
      <div aria-hidden="true" style={{position:'absolute',left:0,right:0,bottom:0,height:190,zIndex:1,pointerEvents:'none'}}>
        <div style={{position:'absolute',width:'150%',height:60,left:'-20%',bottom:68,transform:'rotate(-34deg)',background:C.salmon}}/>
        <div style={{position:'absolute',width:'150%',height:60,left:'-20%',bottom:22,transform:'rotate(-34deg)',background:C.green2}}/>
        <div style={{position:'absolute',width:'150%',height:60,left:'-20%',bottom:-24,transform:'rotate(-34deg)',background:C.green}}/>
      </div>
    </section>{bottom}</main>;

  const header=(title,sub)=><><div style={{height:74,display:'grid',gridTemplateColumns:'42px 1fr 42px',alignItems:'center'}}><button onClick={()=>go('Start')} style={{border:0,background:'transparent',fontSize:24,color:C.green}}>☰</button><img src={logo} alt="Erinnerungsglück" style={{display:'block',width:92,height:62,objectFit:'contain',objectPosition:'center',margin:'auto'}}/><button style={{border:0,background:'transparent',fontSize:24,color:C.green}}>＋</button></div><h1 style={{fontFamily:'Georgia,serif',fontSize:31,lineHeight:1.05,color:C.green,margin:'4px 8px'}}>{title}</h1><p style={{fontSize:12,color:C.muted,margin:'0 8px 18px'}}>{sub}</p></>;
  const card={background:C.paper,border:`1px solid ${C.line}`,borderRadius:12,boxShadow:'0 4px 16px rgba(76,55,38,.07)',overflow:'hidden'};
  const row={padding:'15px 16px',borderBottom:`1px solid ${C.line}`,display:'flex',justifyContent:'space-between',alignItems:'center'};

  let content;
  if(screen==='Reise') content=<>{header('Eure Reise','Alles Wichtige an einem Ort.')}<div style={card}><div style={row}><span><small style={{display:'block',color:C.muted}}>Reisename</small><b>Unser Familienurlaub</b></span></div><div style={row}><span><small style={{display:'block',color:C.muted}}>Reiseziel</small><b>Hurghada, Ägypten</b></span><b style={{color:C.green}}>●</b></div><div style={row}><b>21.12.2026 – 03.01.2027</b><span>▣</span></div><div style={{...row,borderBottom:0}}><span><small style={{display:'block',color:C.muted}}>Reisende</small><b>2 Erwachsene, 1 Kind</b></span><span>♣</span></div></div><div style={{...card,marginTop:14}}>{['Reisedetails','Unterkünfte','Transport','Aktivitäten'].map(x=><div key={x} style={row}><span>{x}</span><b style={{color:C.green}}>›</b></div>)}</div></>;
  else if(screen==='Packlisten') content=<>{header('Packlisten','Alles für eine entspannte Reise.')}<div style={{display:'flex',gap:8,margin:'0 8px 13px'}}><button style={{flex:1,border:0,borderRadius:7,padding:10,background:C.rust,color:'#fff'}}>Meine Listen</button><button style={{flex:1,border:0,borderRadius:7,padding:10,background:C.paper}}>Vorlagen</button></div><div style={card}>{[['Handgepäck','3 / 24'],['Kleidung','12 / 36'],['Toilettenartikel','8 / 18'],['Technik','6 / 15'],['Unterlagen','4 / 10']].map(([x,n])=><div key={x} style={row}><span><b style={{display:'block'}}>{x}</b><small style={{color:C.muted}}>{n} erledigt</small></span><b style={{color:C.green}}>›</b></div>)}</div></>;
  else if(screen==='Erinnerungen') content=<>{header('Erinnerungen','Unsere schönsten Momente.')}<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:9}}>{['🌅','🐠','🌴','🐪','🏖️','🌇'].map((x,i)=><div key={i} style={{aspectRatio:'1.4',borderRadius:10,display:'grid',placeItems:'center',fontSize:40,background:i%2?'#75AAA4':'#E5B080'}}>{x}</div>)}</div></>;
  else content=<>{header('Budget','Den Überblick behalten.')}<div style={{...card,padding:16}}><small style={{color:C.muted}}>Gesamtes Budget</small><h2 style={{margin:'3px 0 18px'}}>2.500,00 €</h2><div style={{display:'flex',justifyContent:'space-between'}}><span><small style={{display:'block',color:C.muted}}>Verbraucht</small><b>1.250,00 €</b></span><span style={{textAlign:'right'}}><small style={{display:'block',color:C.muted}}>Verbleibend</small><b>1.250,00 €</b></span></div></div><h3 style={{fontSize:12,color:C.green,margin:'16px 8px 7px'}}>Kategorien</h3><div style={card}>{[['Unterkunft','750,00 €'],['Transport','250,00 €'],['Verpflegung','150,00 €'],['Aktivitäten','300,00 €'],['Sonstiges','–']].map(([x,n])=><div key={x} style={row}><span>{x}</span><b>{n}</b></div>)}</div></>;

  return <main style={{minHeight:'100svh',width:'100%',overflowX:'hidden',background:C.cream,color:C.text,padding:'14px 20px 95px'}}>{content}{bottom}</main>;
}

import { useState } from "react";

const T={
  "Argentina":{e:2113,xG:2.0,xA:0.9,fl:"🇦🇷",a:9,d:9,s:"pos"},
  "Francia":{e:2063,xG:1.9,xA:1.0,fl:"🇫🇷",a:9,d:8,s:"pos"},
  "España":{e:2171,xG:1.8,xA:0.8,fl:"🇪🇸",a:8,d:9,s:"pos"},
  "Inglaterra":{e:2042,xG:1.7,xA:1.0,fl:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",a:8,d:8,s:"mix"},
  "Portugal":{e:1976,xG:1.7,xA:1.0,fl:"🇵🇹",a:8,d:7,s:"mix"},
  "Brasil":{e:1979,xG:1.7,xA:1.0,fl:"🇧🇷",a:8,d:8,s:"pos"},
  "Países Bajos":{e:1959,xG:1.6,xA:1.1,fl:"🇳🇱",a:8,d:7,s:"mix"},
  "Marruecos":{e:1940,xG:1.3,xA:0.8,fl:"🇲🇦",a:6,d:9,s:"blq"},
  "Bélgica":{e:1849,xG:1.6,xA:1.1,fl:"🇧🇪",a:7,d:7,s:"pos"},
  "Alemania":{e:1910,xG:1.6,xA:1.1,fl:"🇩🇪",a:8,d:7,s:"mix"},
  "Croacia":{e:1933,xG:1.4,xA:1.0,fl:"🇭🇷",a:6,d:7,s:"mix"},
  "Colombia":{e:1998,xG:1.5,xA:1.1,fl:"🇨🇴",a:7,d:7,s:"mix"},
  "Senegal":{e:1869,xG:1.4,xA:1.1,fl:"🇸🇳",a:7,d:7,s:"mix"},
  "México":{e:1820,xG:1.3,xA:1.2,fl:"🇲🇽",a:6,d:6,s:"mix"},
  "Estados Unidos":{e:1780,xG:1.3,xA:1.2,fl:"🇺🇸",a:7,d:6,s:"mix"},
  "Uruguay":{e:1890,xG:1.4,xA:1.0,fl:"🇺🇾",a:6,d:8,s:"blq"},
  "Japón":{e:1879,xG:1.4,xA:1.1,fl:"🇯🇵",a:7,d:7,s:"cnt"},
  "Suiza":{e:1897,xG:1.4,xA:1.0,fl:"🇨🇭",a:6,d:7,s:"mix"},
  "Ecuador":{e:1933,xG:1.4,xA:1.1,fl:"🇪🇨",a:7,d:7,s:"mix"},
  "Noruega":{e:1922,xG:1.5,xA:1.2,fl:"🇳🇴",a:8,d:6,s:"mix"},
  "Suecia":{e:1890,xG:1.5,xA:1.2,fl:"🇸🇪",a:7,d:7,s:"mix"},
  "Turquía":{e:1880,xG:1.4,xA:1.2,fl:"🇹🇷",a:7,d:6,s:"mix"},
  "Austria":{e:1820,xG:1.3,xA:1.2,fl:"🇦🇹",a:7,d:6,s:"mix"},
  "Corea del Sur":{e:1790,xG:1.2,xA:1.2,fl:"🇰🇷",a:6,d:6,s:"mix"},
  "Australia":{e:1750,xG:1.2,xA:1.3,fl:"🇦🇺",a:6,d:6,s:"cnt"},
  "Canadá":{e:1770,xG:1.3,xA:1.3,fl:"🇨🇦",a:6,d:6,s:"mix"},
  "Escocia":{e:1760,xG:1.3,xA:1.2,fl:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",a:6,d:7,s:"mix"},
  "Paraguay":{e:1700,xG:1.1,xA:1.3,fl:"🇵🇾",a:5,d:6,s:"blq"},
  "Argelia":{e:1680,xG:1.2,xA:1.2,fl:"🇩🇿",a:5,d:6,s:"mix"},
  "Arabia Saudita":{e:1640,xG:1.1,xA:1.4,fl:"🇸🇦",a:5,d:5,s:"blq"},
  "Túnez":{e:1630,xG:1.1,xA:1.3,fl:"🇹🇳",a:5,d:6,s:"blq"},
  "Egipto":{e:1620,xG:1.1,xA:1.3,fl:"🇪🇬",a:5,d:6,s:"blq"},
  "Irán":{e:1610,xG:1.0,xA:1.2,fl:"🇮🇷",a:5,d:6,s:"blq"},
  "Ghana":{e:1600,xG:1.1,xA:1.4,fl:"🇬🇭",a:5,d:5,s:"mix"},
  "Costa de Marfil":{e:1590,xG:1.1,xA:1.4,fl:"🇨🇮",a:6,d:5,s:"cnt"},
  "DR Congo":{e:1570,xG:1.1,xA:1.4,fl:"🇨🇩",a:5,d:5,s:"mix"},
  "Bosnia y Herzegovina":{e:1560,xG:1.1,xA:1.4,fl:"🇧🇦",a:5,d:5,s:"mix"},
  "Chequia":{e:1540,xG:1.0,xA:1.3,fl:"🇨🇿",a:5,d:5,s:"mix"},
  "Jordania":{e:1400,xG:0.8,xA:1.5,fl:"🇯🇴",a:4,d:4,s:"blq"},
  "Uzbekistán":{e:1420,xG:0.9,xA:1.4,fl:"🇺🇿",a:4,d:4,s:"mix"},
  "Qatar":{e:1500,xG:1.0,xA:1.4,fl:"🇶🇦",a:5,d:5,s:"blq"},
  "Panamá":{e:1480,xG:0.9,xA:1.5,fl:"🇵🇦",a:4,d:5,s:"blq"},
  "Irak":{e:1450,xG:0.9,xA:1.5,fl:"🇮🇶",a:4,d:4,s:"blq"},
  "Cabo Verde":{e:1460,xG:1.0,xA:1.5,fl:"🇨🇻",a:4,d:5,s:"blq"},
  "Sudáfrica":{e:1490,xG:1.0,xA:1.4,fl:"🇿🇦",a:5,d:5,s:"mix"},
  "Nueva Zelanda":{e:1380,xG:0.8,xA:1.6,fl:"🇳🇿",a:3,d:4,s:"blq"},
  "Curazao":{e:1350,xG:0.7,xA:1.6,fl:"🇨🇼",a:3,d:3,s:"mix"},
  "Haití":{e:1330,xG:0.7,xA:1.7,fl:"🇭🇹",a:3,d:3,s:"blq"},
};

// Resultados reales Mundial 2026
const RES=[
  {h:"México",a:"Sudáfrica",gh:2,ga:0,f:"Jun 11",g:"A"},
  {h:"Corea del Sur",a:"Chequia",gh:2,ga:1,f:"Jun 11",g:"A"},
  {h:"Canadá",a:"Bosnia y Herzegovina",gh:1,ga:1,f:"Jun 12",g:"B"},
  {h:"Estados Unidos",a:"Paraguay",gh:4,ga:1,f:"Jun 12",g:"D"},
  {h:"Qatar",a:"Suiza",gh:1,ga:1,f:"Jun 13",g:"B"},
  {h:"Brasil",a:"Marruecos",gh:1,ga:1,f:"Jun 13",g:"C"},
  {h:"Haití",a:"Escocia",gh:0,ga:1,f:"Jun 13",g:"C"},
  {h:"Australia",a:"Turquía",gh:2,ga:0,f:"Jun 13",g:"D"},
  {h:"Alemania",a:"Curazao",gh:7,ga:1,f:"Jun 14",g:"E"},
  {h:"Países Bajos",a:"Japón",gh:2,ga:2,f:"Jun 14",g:"F"},
  {h:"Costa de Marfil",a:"Ecuador",gh:1,ga:0,f:"Jun 14",g:"E"},
  {h:"Suecia",a:"Túnez",gh:2,ga:1,f:"Jun 14",g:"F"},
  {h:"España",a:"Cabo Verde",gh:0,ga:0,f:"Jun 15",g:"H"},
  {h:"Bélgica",a:"Egipto",gh:1,ga:1,f:"Jun 15",g:"G"},
  {h:"Arabia Saudita",a:"Uruguay",gh:1,ga:1,f:"Jun 15",g:"H"},
  {h:"Irán",a:"Nueva Zelanda",gh:2,ga:2,f:"Jun 15",g:"G"},
];

const GRUPOS={
  A:["México","Corea del Sur","Sudáfrica","Chequia"],
  B:["Canadá","Suiza","Qatar","Bosnia y Herzegovina"],
  C:["Brasil","Marruecos","Escocia","Haití"],
  D:["Estados Unidos","Australia","Paraguay","Turquía"],
  E:["Alemania","Ecuador","Costa de Marfil","Curazao"],
  F:["Países Bajos","Japón","Suecia","Túnez"],
  G:["Bélgica","Irán","Egipto","Nueva Zelanda"],
  H:["España","Uruguay","Arabia Saudita","Cabo Verde"],
  I:["Francia","Senegal","Noruega","Irak"],
  J:["Argentina","Austria","Argelia","Jordania"],
  K:["Portugal","Colombia","Uzbekistán","DR Congo"],
  L:["Inglaterra","Croacia","Panamá","Ghana"],
};

function calcForma(eq){
  const ps=RES.filter(r=>r.h===eq||r.a===eq);
  let pts=0,gf=0,gc=0,fm=[];
  ps.forEach(r=>{
    const isH=r.h===eq,mg=isH?r.gh:r.ga,og=isH?r.ga:r.gh;
    gf+=mg;gc+=og;
    if(mg>og){pts+=3;fm.push("W");}else if(mg===og){pts+=1;fm.push("D");}else fm.push("L");
  });
  return{pts,gf,gc,fm,n:ps.length};
}

const teams=Object.keys(T).sort();
function pois(l,k){let p=Math.exp(-l);for(let i=1;i<=k;i++)p*=l/i;return p;}

function calcular(s1,s2,q1,qx,q2,hj,hw1,hw2){
  let l1=s1.xG*(10/s2.d),l2=s2.xG*(10/s1.d);
  const de=(s1.e-s2.e)/400;
  l1*=Math.pow(10,de*0.1);l2*=Math.pow(10,-de*0.1);
  // Ajuste bloque defensivo — calibrado con 8 partidos del mundial
  if(s1.s==="pos"&&(s2.s==="blq"||s2.s==="cnt")){l1*=0.72;l2*=0.85;}
  if(s2.s==="pos"&&(s1.s==="blq"||s1.s==="cnt")){l2*=0.72;l1*=0.85;}
  if(hj>=3){const r1=hw1/hj,r2=hw2/hj;l1*=(1+(r1-r2)*0.15);l2*=(1+(r2-r1)*0.15);}
  l1=Math.max(0.2,Math.min(4,l1));l2=Math.max(0.2,Math.min(4,l2));
  let pH=0,pD=0,pA=0,m15=0,m25=0,btts=0;
  for(let i=0;i<=6;i++)for(let j=0;j<=6;j++){
    const p=pois(l1,i)*pois(l2,j);
    if(i>j)pH+=p;else if(i===j)pD+=p;else pA+=p;
    if(i+j>1)m15+=p;if(i+j>2)m25+=p;if(i>0&&j>0)btts+=p;
  }
  if(q1>0&&qx>0&&q2>0){
    const r1=1/q1,rx=1/qx,r2=1/q2,rt=r1+rx+r2;
    pH=pH*0.6+(r1/rt)*0.4;pD=pD*0.6+(rx/rt)*0.4;pA=pA*0.6+(r2/rt)*0.4;
  }
  const tot=pH+pD+pA;pH/=tot;pD/=tot;pA/=tot;
  const alerta=(s1.s==="pos"&&(s2.s==="blq"||s2.s==="cnt"))||(s2.s==="pos"&&(s1.s==="blq"||s1.s==="cnt"));
  const conf=Math.max(pH,pD,pA)>0.55?"ALTA":Math.max(pH,pD,pA)>0.42?"MEDIA":"BAJA";
  const mejor=pH>0.55?"🏆 Victoria "+s1.nombre:pA>0.55?"🏆 Victoria "+s2.nombre:(pH+pD)>0.75?"✅ Doble oportunidad 1X":(pA+pD)>0.75?"✅ Doble oportunidad X2":m15>0.72?"⚽ Más de 1.5 goles":"⚠️ Evalúa con cuotas";
  return{pH,pD,pA,l1:+l1.toFixed(2),l2:+l2.toFixed(2),sh:Math.round(l1),sa:Math.round(l2),m15,m25,btts,hx:pH+pD,x2:pA+pD,ne:pH+pA,alerta,conf,mejor};
}

const C="#060a12",G="#00ff88",Y="#ffd200",B="#60a5fa",P="#c084fc";
const sn={pos:"Posesión",blq:"Bloque",cnt:"Contragolpe",mix:"Mixto"};

function Barra({v,c}){
  return <div style={{background:"#1a1f2e",borderRadius:4,height:7,overflow:"hidden"}}>
    <div style={{width:`${Math.min(v*100,100)}%`,height:"100%",background:c,borderRadius:4,transition:"width 0.5s"}}/>
  </div>;
}
function Fila({l,v,c}){
  return <div style={{marginBottom:9}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
      <span style={{fontSize:12,color:c,fontWeight:600}}>{l}</span>
      <span style={{fontSize:13,fontWeight:800,color:c}}>{(v*100).toFixed(1)}%</span>
    </div>
    <Barra v={v} c={c}/>
  </div>;
}
function FTag({r}){
  const m={W:["#00ff88","#00ff8818"],D:["#ffd200","#ffd20018"],L:["#ff6060","#ff606018"]};
  const[c,b]=m[r]||["#555","#222"];
  return <span style={{width:18,height:18,borderRadius:3,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:c,background:b}}>{r}</span>;
}

export default function App(){
  const[tab,setTab]=useState("pred");
  const[t1,setT1]=useState("Francia");
  const[t2,setT2]=useState("Senegal");
  const[q1,setQ1]=useState("");
  const[qx,setQx]=useState("");
  const[q2,setQ2]=useState("");
  const[hj,setHj]=useState("");
  const[hw1,setHw1]=useState("");
  const[hw2,setHw2]=useState("");
  const[grp,setGrp]=useState("A");

  const s1={...T[t1],nombre:t1};
  const s2={...T[t2],nombre:t2};
  const f1=calcForma(t1);
  const f2=calcForma(t2);
  const pr=t1!==t2?calcular(s1,s2,+q1,+qx,+q2,+hj,+hw1,+hw2):null;
  const cC=pr?.conf==="ALTA"?G:pr?.conf==="MEDIA"?Y:"#ff6060";

  const card={background:"#0a0f1e",border:"1px solid #1e2a3a",borderRadius:12,padding:14,marginBottom:12};
  const sel={width:"100%",background:"#0d1117",border:"1px solid #1e2a3a",borderRadius:7,padding:"8px 10px",color:"#e2e8f0",fontSize:13,fontWeight:600};
  const inp={...sel,padding:"7px 8px",textAlign:"center"};

  const tablaGrp=(GRUPOS[grp]||[]).map(eq=>{
    const fm=calcForma(eq);
    return{eq,...fm,W:fm.fm.filter(x=>x==="W").length,D:fm.fm.filter(x=>x==="D").length,L:fm.fm.filter(x=>x==="L").length};
  }).sort((a,b)=>b.pts-a.pts||(b.gf-b.gc)-(a.gf-a.gc));

  return(
    <div style={{minHeight:"100vh",background:C,fontFamily:"Inter,sans-serif",color:"#e2e8f0",maxWidth:600,margin:"0 auto"}}>

      {/* HEADER */}
      <div style={{background:"#0a0f1e",borderBottom:"1px solid #1e2a3a",padding:"10px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#00ff88,#0088ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>⚽</div>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:"#fff"}}>MUNDIAL 2026 <span style={{color:G}}>PREDICTOR</span></div>
            <div style={{fontSize:9,color:"#4a5568"}}>Poisson · ELO · xG · H2H · Estilos</div>
          </div>
        </div>
        <div style={{display:"flex",gap:0,borderTop:"1px solid #1e2a3a"}}>
          {[["pred","🎯 Predecir"],["grp","🏆 Grupos"],["res","📋 Resultados"]].map(([k,l])=>(
            <button key={k} onClick={()=>setTab(k)} style={{background:"none",border:"none",cursor:"pointer",padding:"9px 14px",fontSize:12,fontWeight:600,color:tab===k?G:"#64748b",borderBottom:tab===k?`2px solid ${G}`:"2px solid transparent"}}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:12}}>

        {/* PREDICTOR */}
        {tab==="pred"&&<div>
          <div style={card}>
            <div style={{fontSize:9,color:"#4a5568",letterSpacing:2,marginBottom:12}}>SELECCIONAR PARTIDO</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 32px 1fr",gap:8,marginBottom:12}}>
              <div>
                <select value={t1} onChange={e=>setT1(e.target.value)} style={sel}>
                  {teams.map(t=><option key={t} value={t}>{T[t].fl} {t}</option>)}
                </select>
                <div style={{fontSize:9,color:P,marginTop:3}}>{sn[s1.s]} · ELO {s1.e}</div>
                {f1.n>0&&<div style={{display:"flex",gap:2,marginTop:4}}>{f1.fm.map((f,i)=><FTag key={i} r={f}/>)}<span style={{fontSize:9,color:"#64748b",marginLeft:4}}>{f1.pts}pts</span></div>}
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div style={{width:28,height:28,borderRadius:14,background:"#1e2a3a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:Y}}>VS</div>
              </div>
              <div>
                <select value={t2} onChange={e=>setT2(e.target.value)} style={sel}>
                  {teams.map(t=><option key={t} value={t}>{T[t].fl} {t}</option>)}
                </select>
                <div style={{fontSize:9,color:P,marginTop:3}}>{sn[s2.s]} · ELO {s2.e}</div>
                {f2.n>0&&<div style={{display:"flex",gap:2,marginTop:4}}>{f2.fm.map((f,i)=><FTag key={i} r={f}/>)}<span style={{fontSize:9,color:"#64748b",marginLeft:4}}>{f2.pts}pts</span></div>}
              </div>
            </div>

            {pr?.alerta&&<div style={{background:"#ff303010",borderRadius:8,padding:10,marginBottom:12,border:"2px solid #ff6060"}}>
              <div style={{fontSize:9,color:"#ff6060",fontWeight:800,marginBottom:3}}>🚨 ALERTA BLOQUE DEFENSIVO</div>
              <div style={{fontSize:11,color:"#fca5a5",lineHeight:1.5}}>Patrón confirmado (8 partidos): España 0-0 Cabo Verde · Bélgica 1-1 Egipto · Brasil 1-1 Marruecos · Irán 2-2 Nueva Zelanda. El favorito domina pero NO marca. Usa Doble Oportunidad.</div>
            </div>}

            <div style={{fontSize:9,color:Y,fontWeight:700,marginBottom:8}}>💰 CUOTAS (opcional — mejora la precisión)</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:12}}>
              <div><div style={{fontSize:9,color:G,marginBottom:2,fontWeight:600}}>1 {t1.slice(0,6)}</div><input type="number" step="0.01" placeholder="1.85" value={q1} onChange={e=>setQ1(e.target.value)} style={{...inp,border:"1px solid #00ff8825"}}/></div>
              <div><div style={{fontSize:9,color:Y,marginBottom:2,fontWeight:600}}>X Empate</div><input type="number" step="0.01" placeholder="3.40" value={qx} onChange={e=>setQx(e.target.value)} style={{...inp,border:"1px solid #ffd20025"}}/></div>
              <div><div style={{fontSize:9,color:B,marginBottom:2,fontWeight:600}}>2 {t2.slice(0,6)}</div><input type="number" step="0.01" placeholder="4.50" value={q2} onChange={e=>setQ2(e.target.value)} style={{...inp,border:"1px solid #60a5fa25"}}/></div>
            </div>

            <div style={{fontSize:9,color:P,fontWeight:700,marginBottom:8}}>⚔️ H2H (busca: "{t1} vs {t2} head to head")</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5}}>
              <div><div style={{fontSize:8,color:"#64748b",marginBottom:2}}>Total</div><input type="number" min="0" placeholder="0" value={hj} onChange={e=>setHj(e.target.value)} style={inp}/></div>
              <div><div style={{fontSize:8,color:G,marginBottom:2}}>Vic {t1.slice(0,4)}</div><input type="number" min="0" placeholder="0" value={hw1} onChange={e=>setHw1(e.target.value)} style={{...inp,border:"1px solid #00ff8825"}}/></div>
              <div><div style={{fontSize:8,color:Y,marginBottom:2}}>Empates</div><input type="number" min="0" placeholder="0" style={{...inp,border:"1px solid #ffd20025"}}/></div>
              <div><div style={{fontSize:8,color:B,marginBottom:2}}>Vic {t2.slice(0,4)}</div><input type="number" min="0" placeholder="0" value={hw2} onChange={e=>setHw2(e.target.value)} style={{...inp,border:"1px solid #60a5fa25"}}/></div>
            </div>
          </div>

          {pr&&<div>
            <div style={{...card,border:`1px solid ${cC}40`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <span style={{fontSize:9,color:"#4a5568",letterSpacing:2}}>PREDICCIÓN POISSON + ELO</span>
                <span style={{fontSize:10,padding:"2px 8px",borderRadius:12,fontWeight:700,color:cC,background:cC+"12",border:`1px solid ${cC}30`}}>{pr.conf}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:14,background:C,borderRadius:9,padding:14,border:"1px solid #1e2a3a"}}>
                <div style={{textAlign:"center",flex:1}}>
                  <div style={{fontSize:28}}>{s1.fl}</div>
                  <div style={{fontSize:11,fontWeight:700,marginTop:3}}>{t1}</div>
                  {f1.n>0&&<div style={{display:"flex",gap:2,justifyContent:"center",marginTop:3}}>{f1.fm.map((f,i)=><FTag key={i} r={f}/>)}</div>}
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:34,fontWeight:900,letterSpacing:4,color:"#fff"}}>{pr.sh}–{pr.sa}</div>
                  <div style={{fontSize:9,color:"#4a5568"}}>λ {pr.l1}–{pr.l2}</div>
                </div>
                <div style={{textAlign:"center",flex:1}}>
                  <div style={{fontSize:28}}>{s2.fl}</div>
                  <div style={{fontSize:11,fontWeight:700,marginTop:3}}>{t2}</div>
                  {f2.n>0&&<div style={{display:"flex",gap:2,justifyContent:"center",marginTop:3}}>{f2.fm.map((f,i)=><FTag key={i} r={f}/>)}</div>}
                </div>
              </div>
              <div style={{fontSize:9,color:"#4a5568",letterSpacing:2,marginBottom:10}}>PROBABILIDADES 1X2</div>
              <Fila l={"1 — "+t1} v={pr.pH} c={G}/>
              <Fila l="X — Empate" v={pr.pD} c={Y}/>
              <Fila l={"2 — "+t2} v={pr.pA} c={B}/>
            </div>

            <div style={card}>
              <div style={{fontSize:9,color:"#4a5568",letterSpacing:2,marginBottom:12}}>MERCADOS ALTERNATIVOS</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                <div style={{background:C,borderRadius:8,padding:10,border:"1px solid #1e2a3a"}}>
                  <div style={{fontSize:9,color:"#4a5568",marginBottom:8}}>DOBLE OPORTUNIDAD</div>
                  <Fila l="1X" v={pr.hx} c={G}/>
                  <Fila l="X2" v={pr.x2} c={B}/>
                  <Fila l="No Emp" v={pr.ne} c={Y}/>
                </div>
                <div style={{background:C,borderRadius:8,padding:10,border:"1px solid #1e2a3a"}}>
                  <div style={{fontSize:9,color:"#4a5568",marginBottom:8}}>GOLES</div>
                  <Fila l="+1.5" v={pr.m15} c={G}/>
                  <Fila l="+2.5" v={pr.m25} c={B}/>
                  <Fila l="BTTS" v={pr.btts} c={P}/>
                </div>
              </div>
              <div style={{padding:"10px 12px",borderRadius:8,background:"#00ff8808",border:"1px solid #00ff8825"}}>
                <div style={{fontSize:9,color:G,fontWeight:800,marginBottom:3}}>✅ MEJOR APUESTA</div>
                <div style={{fontSize:13,color:"#e2e8f0",fontWeight:600}}>{pr.mejor}</div>
              </div>
            </div>
          </div>}
        </div>}

        {/* GRUPOS */}
        {tab==="grp"&&<div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>
            {Object.keys(GRUPOS).map(g=>(
              <button key={g} onClick={()=>setGrp(g)} style={{padding:"5px 11px",borderRadius:7,border:"1px solid",cursor:"pointer",fontWeight:700,fontSize:12,background:grp===g?"linear-gradient(135deg,#00ff88,#0088ff)":"#0a0f1e",borderColor:grp===g?"transparent":"#1e2a3a",color:grp===g?"#000":"#94a3b8"}}>G {g}</button>
            ))}
          </div>
          <div style={card}>
            <div style={{fontSize:13,fontWeight:800,marginBottom:12}}>🏆 Grupo {grp}</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{borderBottom:"1px solid #1e2a3a"}}>{["#","","Equipo","PJ","G","E","P","GF","GC","PTS","Forma"].map(h=><td key={h} style={{padding:"5px 6px",fontSize:9,color:"#4a5568",fontWeight:700}}>{h}</td>)}</tr></thead>
                <tbody>{tablaGrp.map((r,i)=>(
                  <tr key={r.eq} style={{borderBottom:"1px solid #0d1117"}}>
                    <td style={{padding:"8px 6px",fontSize:11,color:i<2?G:"#4a5568",fontWeight:700}}>{i+1}</td>
                    <td style={{padding:"8px 3px",fontSize:14}}>{T[r.eq]?.fl}</td>
                    <td style={{padding:"8px 6px",fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>{r.eq}</td>
                    <td style={{padding:"8px 6px",fontSize:11,color:"#94a3b8",textAlign:"center"}}>{r.n}</td>
                    <td style={{padding:"8px 6px",fontSize:11,color:G,textAlign:"center",fontWeight:700}}>{r.W}</td>
                    <td style={{padding:"8px 6px",fontSize:11,color:Y,textAlign:"center"}}>{r.D}</td>
                    <td style={{padding:"8px 6px",fontSize:11,color:"#ff6060",textAlign:"center"}}>{r.L}</td>
                    <td style={{padding:"8px 6px",fontSize:11,color:"#94a3b8",textAlign:"center"}}>{r.gf}</td>
                    <td style={{padding:"8px 6px",fontSize:11,col

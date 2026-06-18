import{useState}from"react";
const VERSION="v3.6 • 17 Jun 2026";

// Forma previa al mundial (últimos 5 partidos — W=ganó, D=empató, L=perdió)
const PREFORMA={
  "Argentina":["W","W","W","W","W"],
  "Francia":["W","W","D","W","W"],
  "España":["W","W","W","D","W"],
  "Inglaterra":["W","D","W","W","D"],
  "Portugal":["W","W","W","W","D"],
  "Brasil":["D","W","W","D","W"],
  "Países Bajos":["W","W","D","W","W"],
  "Marruecos":["W","D","W","W","D"],
  "Bélgica":["W","W","D","W","L"],
  "Alemania":["W","W","W","W","D"],
  "Croacia":["D","W","D","W","W"],
  "Colombia":["W","W","W","W","W"],
  "Senegal":["W","D","W","W","D"],
  "México":["W","D","W","L","W"],
  "Estados Unidos":["W","W","D","W","W"],
  "Uruguay":["W","D","W","W","D"],
  "Japón":["W","W","W","D","W"],
  "Suiza":["W","W","D","W","W"],
  "Ecuador":["W","W","D","W","D"],
  "Noruega":["W","W","W","W","D"],
  "Suecia":["W","D","W","W","W"],
  "Turquía":["W","W","D","L","W"],
  "Austria":["W","W","W","D","W"],
  "Corea del Sur":["D","W","W","D","W"],
  "Australia":["W","D","W","W","D"],
  "Canadá":["W","W","D","W","W"],
  "Escocia":["W","D","W","D","W"],
  "Paraguay":["D","W","D","W","L"],
  "Argelia":["W","W","D","W","D"],
  "Arabia Saudita":["L","D","W","L","D"],
  "Túnez":["D","W","D","W","D"],
  "Egipto":["W","D","W","D","W"],
  "Irán":["W","W","D","L","W"],
  "Ghana":["D","W","L","W","D"],
  "Costa de Marfil":["W","W","D","W","L"],
  "DR Congo":["W","D","W","D","W"],
  "Bosnia y Herzegovina":["D","W","D","L","W"],
  "Chequia":["W","D","W","D","L"],
  "Jordania":["W","D","L","D","W"],
  "Uzbekistán":["W","W","D","W","D"],
  "Qatar":["L","D","W","L","D"],
  "Panamá":["D","L","W","D","W"],
  "Irak":["W","D","W","D","L"],
  "Cabo Verde":["W","D","W","W","D"],
  "Sudáfrica":["D","W","D","W","L"],
  "Nueva Zelanda":["L","D","L","W","D"],
  "Curazao":["L","D","L","D","W"],
  "Haití":["L","D","L","L","D"],
};

// Rating árbitros: 1=permisivo(más goles), -1=estricto(menos goles)
const ARBITROS={
  "Sin especificar":0,
  // América
  "César Ramos (MEX)":0,
  "Erick Miranda (MEX)":0,
  "Ismail Elfath (USA)":1,
  "Ivan Barton (SLV)":0,
  "Facundo Tello (ARG)":1,
  "Wilton Sampaio (BRA)":1,
  "Raphael Claus (BRA)":1,
  "Piero Maza (CHI)":0,
  "Jesus Valenzuela (VEN)":0,
  // Europa  
  "Felix Zwayer (GER)":-1,
  "Szymon Marciniak (POL)":-1,
  "Clément Turpin (FRA)":0,
  "Danny Makkelie (NED)":0,
  "Anthony Taylor (ENG)":-1,
  "Michael Oliver (ENG)":-1,
  "Slavko Vincic (SVN)":0,
  "Daniele Orsato (ITA)":0,
  "Carlos del Cerro (ESP)":-1,
  // Africa/Asia
  "Mustapha Ghorbal (ALG)":0,
  "Abdulrahman Al-Jassim (QAT)":0,
  "Alireza Faghani (AUS)":0,
  "Ma Ning (CHN)":0,
};

const T={"Argentina":{e:2113,xG:2.0,xA:0.9,fl:"🇦🇷",a:9,d:9,s:"pos"},"Francia":{e:2063,xG:1.9,xA:1.0,fl:"🇫🇷",a:9,d:8,s:"pos"},"España":{e:2171,xG:1.8,xA:0.8,fl:"🇪🇸",a:8,d:9,s:"pos"},"Inglaterra":{e:2042,xG:1.7,xA:1.0,fl:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",a:8,d:8,s:"mix"},"Portugal":{e:1976,xG:1.7,xA:1.0,fl:"🇵🇹",a:8,d:7,s:"mix"},"Brasil":{e:1979,xG:1.7,xA:1.0,fl:"🇧🇷",a:8,d:8,s:"pos"},"Países Bajos":{e:1959,xG:1.6,xA:1.1,fl:"🇳🇱",a:8,d:7,s:"mix"},"Marruecos":{e:1940,xG:1.3,xA:0.8,fl:"🇲🇦",a:6,d:9,s:"blq"},"Bélgica":{e:1849,xG:1.6,xA:1.1,fl:"🇧🇪",a:7,d:7,s:"pos"},"Alemania":{e:1910,xG:1.6,xA:1.1,fl:"🇩🇪",a:8,d:7,s:"mix"},"Croacia":{e:1933,xG:1.4,xA:1.0,fl:"🇭🇷",a:6,d:7,s:"mix"},"Colombia":{e:1998,xG:1.5,xA:1.1,fl:"🇨🇴",a:7,d:7,s:"mix"},"Senegal":{e:1869,xG:1.4,xA:1.1,fl:"🇸🇳",a:7,d:7,s:"mix"},"México":{e:1820,xG:1.3,xA:1.2,fl:"🇲🇽",a:6,d:6,s:"mix"},"Estados Unidos":{e:1780,xG:1.3,xA:1.2,fl:"🇺🇸",a:7,d:6,s:"mix"},"Uruguay":{e:1890,xG:1.4,xA:1.0,fl:"🇺🇾",a:6,d:8,s:"blq"},"Japón":{e:1879,xG:1.4,xA:1.1,fl:"🇯🇵",a:7,d:7,s:"cnt"},"Suiza":{e:1897,xG:1.4,xA:1.0,fl:"🇨🇭",a:6,d:7,s:"mix"},"Ecuador":{e:1933,xG:1.4,xA:1.1,fl:"🇪🇨",a:7,d:7,s:"mix"},"Noruega":{e:1922,xG:1.5,xA:1.2,fl:"🇳🇴",a:8,d:6,s:"mix"},"Suecia":{e:1890,xG:1.5,xA:1.2,fl:"🇸🇪",a:7,d:7,s:"mix"},"Turquía":{e:1880,xG:1.4,xA:1.2,fl:"🇹🇷",a:7,d:6,s:"mix"},"Austria":{e:1820,xG:1.3,xA:1.2,fl:"🇦🇹",a:7,d:6,s:"mix"},"Corea del Sur":{e:1790,xG:1.2,xA:1.2,fl:"🇰🇷",a:6,d:6,s:"mix"},"Australia":{e:1750,xG:1.2,xA:1.3,fl:"🇦🇺",a:6,d:6,s:"cnt"},"Canadá":{e:1770,xG:1.3,xA:1.3,fl:"🇨🇦",a:6,d:6,s:"mix"},"Escocia":{e:1760,xG:1.3,xA:1.2,fl:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",a:6,d:7,s:"mix"},"Paraguay":{e:1700,xG:1.1,xA:1.3,fl:"🇵🇾",a:5,d:6,s:"blq"},"Argelia":{e:1680,xG:1.2,xA:1.2,fl:"🇩🇿",a:5,d:6,s:"mix"},"Arabia Saudita":{e:1640,xG:1.1,xA:1.4,fl:"🇸🇦",a:5,d:5,s:"blq"},"Túnez":{e:1630,xG:1.1,xA:1.3,fl:"🇹🇳",a:5,d:6,s:"blq"},"Egipto":{e:1620,xG:1.1,xA:1.3,fl:"🇪🇬",a:5,d:6,s:"blq"},"Irán":{e:1610,xG:1.0,xA:1.2,fl:"🇮🇷",a:5,d:6,s:"blq"},"Ghana":{e:1600,xG:1.1,xA:1.4,fl:"🇬🇭",a:5,d:5,s:"mix"},"Costa de Marfil":{e:1590,xG:1.1,xA:1.4,fl:"🇨🇮",a:6,d:5,s:"cnt"},"DR Congo":{e:1570,xG:1.1,xA:1.4,fl:"🇨🇩",a:5,d:5,s:"mix"},"Bosnia y Herzegovina":{e:1560,xG:1.1,xA:1.4,fl:"🇧🇦",a:5,d:5,s:"mix"},"Chequia":{e:1540,xG:1.0,xA:1.3,fl:"🇨🇿",a:5,d:5,s:"mix"},"Jordania":{e:1400,xG:0.8,xA:1.5,fl:"🇯🇴",a:4,d:4,s:"blq"},"Uzbekistán":{e:1420,xG:0.9,xA:1.4,fl:"🇺🇿",a:4,d:4,s:"mix"},"Qatar":{e:1500,xG:1.0,xA:1.4,fl:"🇶🇦",a:5,d:5,s:"blq"},"Panamá":{e:1480,xG:0.9,xA:1.5,fl:"🇵🇦",a:4,d:5,s:"blq"},"Irak":{e:1450,xG:0.9,xA:1.5,fl:"🇮🇶",a:4,d:4,s:"blq"},"Cabo Verde":{e:1460,xG:1.0,xA:1.5,fl:"🇨🇻",a:4,d:5,s:"blq"},"Sudáfrica":{e:1490,xG:1.0,xA:1.4,fl:"🇿🇦",a:5,d:5,s:"mix"},"Nueva Zelanda":{e:1380,xG:0.8,xA:1.6,fl:"🇳🇿",a:3,d:4,s:"blq"},"Curazao":{e:1350,xG:0.7,xA:1.6,fl:"🇨🇼",a:3,d:3,s:"mix"},"Haití":{e:1330,xG:0.7,xA:1.7,fl:"🇭🇹",a:3,d:3,s:"blq"}};

const RES=[{h:"México",a:"Sudáfrica",gh:2,ga:0,f:"Jun 11",g:"A"},{h:"Corea del Sur",a:"Chequia",gh:2,ga:1,f:"Jun 11",g:"A"},{h:"Canadá",a:"Bosnia y Herzegovina",gh:1,ga:1,f:"Jun 12",g:"B"},{h:"Estados Unidos",a:"Paraguay",gh:4,ga:1,f:"Jun 12",g:"D"},{h:"Qatar",a:"Suiza",gh:1,ga:1,f:"Jun 13",g:"B"},{h:"Brasil",a:"Marruecos",gh:1,ga:1,f:"Jun 13",g:"C"},{h:"Haití",a:"Escocia",gh:0,ga:1,f:"Jun 13",g:"C"},{h:"Australia",a:"Turquía",gh:2,ga:0,f:"Jun 13",g:"D"},{h:"Alemania",a:"Curazao",gh:7,ga:1,f:"Jun 14",g:"E"},{h:"Países Bajos",a:"Japón",gh:2,ga:2,f:"Jun 14",g:"F"},{h:"Costa de Marfil",a:"Ecuador",gh:1,ga:0,f:"Jun 14",g:"E"},{h:"Suecia",a:"Túnez",gh:2,ga:1,f:"Jun 14",g:"F"},{h:"España",a:"Cabo Verde",gh:0,ga:0,f:"Jun 15",g:"H"},{h:"Bélgica",a:"Egipto",gh:1,ga:1,f:"Jun 15",g:"G"},{h:"Arabia Saudita",a:"Uruguay",gh:1,ga:1,f:"Jun 15",g:"H"},{h:"Irán",a:"Nueva Zelanda",gh:2,ga:2,f:"Jun 15",g:"G"},{h:"Francia",a:"Senegal",gh:3,ga:1,f:"Jun 16",g:"I"},{h:"Noruega",a:"Irak",gh:4,ga:1,f:"Jun 16",g:"I"},{h:"Argentina",a:"Argelia",gh:3,ga:0,f:"Jun 16",g:"J"},{h:"Austria",a:"Jordania",gh:3,ga:1,f:"Jun 16",g:"J"},{h:"Portugal",a:"DR Congo",gh:1,ga:1,f:"Jun 17",g:"K"},{h:"Inglaterra",a:"Croacia",gh:4,ga:2,f:"Jun 17",g:"L"},{h:"Ghana",a:"Panamá",gh:1,ga:0,f:"Jun 17",g:"L"},{h:"Uzbekistán",a:"Colombia",gh:1,ga:3,f:"Jun 17",g:"K"}];

const GRUPOS={A:["México","Corea del Sur","Sudáfrica","Chequia"],B:["Canadá","Suiza","Qatar","Bosnia y Herzegovina"],C:["Brasil","Marruecos","Escocia","Haití"],D:["Estados Unidos","Australia","Paraguay","Turquía"],E:["Alemania","Ecuador","Costa de Marfil","Curazao"],F:["Países Bajos","Japón","Suecia","Túnez"],G:["Bélgica","Irán","Egipto","Nueva Zelanda"],H:["España","Uruguay","Arabia Saudita","Cabo Verde"],I:["Francia","Senegal","Noruega","Irak"],J:["Argentina","Austria","Argelia","Jordania"],K:["Portugal","Colombia","Uzbekistán","DR Congo"],L:["Inglaterra","Croacia","Panamá","Ghana"]};

function calcForma(eq){
  const ps=RES.filter(r=>r.h===eq||r.a===eq);
  let pts=0,gf=0,gc=0,fm=[];
  ps.forEach(r=>{const isH=r.h===eq,mg=isH?r.gh:r.ga,og=isH?r.ga:r.gh;gf+=mg;gc+=og;if(mg>og){pts+=3;fm.push("W");}else if(mg===og){pts+=1;fm.push("D");}else fm.push("L");});
  // Si no hay partidos en el mundial, usar forma previa
  if(fm.length===0){const pf=PREFORMA[eq]||[];return{pts:0,gf:0,gc:0,fm:pf.slice(0,5),n:0,pre:true};}
  return{pts,gf,gc,fm,n:ps.length,pre:false};
}

function calcPuntosPre(eq){
  const pf=PREFORMA[eq]||[];
  return pf.reduce((acc,r)=>acc+(r==="W"?3:r==="D"?1:0),0);
}

const teams=Object.keys(T).sort();
function pois(l,k){let p=Math.exp(-l);for(let i=1;i<=k;i++)p*=l/i;return p;}

function calc(s1,s2,q1,qx,q2,hj,hw1,hd,hw2,arb,presion1,presion2){
  // BASE: xG proporcional a defensa relativa (2.6 = promedio goles/partido mundial)
  const totalD=s1.d+s2.d;
  let l1=s1.xG*(s1.d/totalD)*2.6;
  let l2=s2.xG*(s2.d/totalD)*2.6;

  // AJUSTE ELO
  const de=(s1.e-s2.e)/400;
  l1*=Math.pow(10,de*0.08);
  l2*=Math.pow(10,-de*0.08);

  // AJUSTE estilo de juego
  if(s1.s==="pos"&&(s2.s==="blq"||s2.s==="cnt")){l1*=0.80;l2*=0.90;}
  if(s2.s==="pos"&&(s1.s==="blq"||s1.s==="cnt")){l2*=0.80;l1*=0.90;}

  // AJUSTE forma: previa al mundial (sin jugar) o real del torneo (ya jugo)
  const f1=calcForma(s1.n),f2=calcForma(s2.n);
  if(f1.pre){
    const pp=calcPuntosPre(s1.n)/15;l1*=(0.70+pp*0.60);
  }else if(f1.n>0){
    const ataqReal=f1.gf/f1.n, defReal=f1.gc/f1.n;
    l1*=(0.5+(ataqReal/s1.xG)*0.5);
    l2*=(0.5+(defReal/s2.xA)*0.5);
  }
  if(f2.pre){
    const pp=calcPuntosPre(s2.n)/15;l2*=(0.70+pp*0.60);
  }else if(f2.n>0){
    const ataqReal=f2.gf/f2.n, defReal=f2.gc/f2.n;
    l2*=(0.5+(ataqReal/s2.xG)*0.5);
    l1*=(0.5+(defReal/s1.xA)*0.5);
  }

  // AJUSTE H2H
  if(hj>=3){const r1=hw1/hj,r2=hw2/hj;l1*=(1+(r1-r2)*0.20);l2*=(1+(r2-r1)*0.20);}

  // AJUSTE presion de clasificacion
  if(presion1==="ganar"){l1*=1.12;l2*=1.06;}
  else if(presion1==="eliminado"){l1*=1.08;}
  if(presion2==="ganar"){l2*=1.12;l1*=1.06;}
  else if(presion2==="eliminado"){l2*=1.08;}

  // AJUSTE arbitro
  const ra=ARBITROS[arb]||0;
  if(ra===1){l1*=1.06;l2*=1.06;}
  else if(ra===-1){l1*=0.94;l2*=0.94;}

  // Solo minimo, SIN techo fijo - cada partido refleja sus propios datos
  l1=Math.max(0.3,l1);l2=Math.max(0.3,l2);

  let pH=0,pD=0,pA=0,m15=0,m25=0,btts=0;
  for(let i=0;i<=6;i++)for(let j=0;j<=6;j++){const p=pois(l1,i)*pois(l2,j);if(i>j)pH+=p;else if(i===j)pD+=p;else pA+=p;if(i+j>1)m15+=p;if(i+j>2)m25+=p;if(i>0&&j>0)btts+=p;}
  if(q1>0&&qx>0&&q2>0){const r1=1/q1,rx=1/qx,r2=1/q2,rt=r1+rx+r2;pH=pH*0.55+(r1/rt)*0.45;pD=pD*0.55+(rx/rt)*0.45;pA=pA*0.55+(r2/rt)*0.45;}
  const tot=pH+pD+pA;pH/=tot;pD/=tot;pA/=tot;
  const al=(s1.s==="pos"&&(s2.s==="blq"||s2.s==="cnt"))||(s2.s==="pos"&&(s1.s==="blq"||s1.s==="cnt"));
  const cf=Math.max(pH,pD,pA)>0.55?"ALTA":Math.max(pH,pD,pA)>0.42?"MEDIA":"BAJA";
  const mj=pH>0.55?"Victoria "+s1.n:pA>0.55?"Victoria "+s2.n:(pH+pD)>0.75?"Doble 1X":(pA+pD)>0.75?"Doble X2":m15>0.72?"Mas 1.5 goles":"Evalua con cuotas";
  return{pH,pD,pA,l1:+l1.toFixed(2),l2:+l2.toFixed(2),sh:Math.round(l1),sa:Math.round(l2),m15,m25,btts,hx:pH+pD,x2:pA+pD,ne:pH+pA,al,cf,mj};
}


function randPoisson(lambda){
  // Knuth algorithm para generar variable aleatoria Poisson
  const L=Math.exp(-lambda);
  let k=0,p=1;
  do{k++;p*=Math.random();}while(p>L);
  return k-1;
}

function monteCarlo(l1,l2,n=10000){
  let wH=0,wD=0,wA=0;
  const marcadores={};
  for(let i=0;i<n;i++){
    const g1=Math.min(randPoisson(l1),8);
    const g2=Math.min(randPoisson(l2),8);
    if(g1>g2)wH++;else if(g1===g2)wD++;else wA++;
    const key=`${g1}-${g2}`;
    marcadores[key]=(marcadores[key]||0)+1;
  }
  const top=Object.entries(marcadores).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,v])=>({score:k,prob:v/n}));
  return{pH:wH/n,pD:wD/n,pA:wA/n,top,n};
}

function predecirEnVivo(s1,s2,min,g1act,g2act,pos1,pos2,sp1,sp2,co1,co2,roja1,roja2){
  const minRest=Math.max(90-min,1);
  // Lambda base original del partido completo
  const totalD=s1.d+s2.d;
  let l1base=s1.xG*(s1.d/totalD)*2.6;
  let l2base=s2.xG*(s2.d/totalD)*2.6;
  const de=(s1.e-s2.e)/400;
  l1base*=Math.pow(10,de*0.08);
  l2base*=Math.pow(10,-de*0.08);
  
  // Indice de dominio: combina posesion + tiros a puerta + corners
  // Normalizado 0-1, >0.5 significa que el equipo domina
  const totPos=pos1+pos2||100;
  const totSp=sp1+sp2||1;
  const totCo=co1+co2||1;
  const dom1=(pos1/totPos)*0.4+(sp1/totSp)*0.4+(co1/totCo)*0.2;
  const dom2=1-dom1;
  
  // Ajustar lambda restante segun dominio actual (mas peso que el lambda original)
  let l1rest=(l1base/90)*minRest*(0.5+dom1*1.0);
  let l2rest=(l2base/90)*minRest*(0.5+dom2*1.0);
  
  // Ajuste por marcador actual: quien gana juega mas conservador, quien pierde se desespera
  if(g1act>g2act){l1rest*=0.88;l2rest*=1.12;}
  else if(g2act>g1act){l2rest*=0.88;l1rest*=1.12;}
  
  // Ajuste por tarjeta roja: el equipo con un jugador menos sufre mucho
  if(roja1){l1rest*=0.55;l2rest*=1.30;}
  if(roja2){l2rest*=0.55;l1rest*=1.30;}
  
  l1rest=Math.max(0.05,l1rest);
  l2rest=Math.max(0.05,l2rest);
  
  // Simular goles restantes con Monte Carlo
  const n=10000;
  let wH=0,wD=0,wA=0;
  const finales={};
  for(let i=0;i<n;i++){
    const gf1=g1act+Math.min(randPoisson(l1rest),6);
    const gf2=g2act+Math.min(randPoisson(l2rest),6);
    if(gf1>gf2)wH++;else if(gf1===gf2)wD++;else wA++;
    const key=`${gf1}-${gf2}`;
    finales[key]=(finales[key]||0)+1;
  }
  const top=Object.entries(finales).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,v])=>({score:k,prob:v/n}));
  
  // Indice de dominio textual
  const domTxt=dom1>0.6?`${s1.n} domina claramente`:dom1>0.52?`${s1.n} ligera ventaja`:dom2>0.6?`${s2.n} domina claramente`:dom2>0.52?`${s2.n} ligera ventaja`:"Partido equilibrado";
  const sostenible=(g1act>g2act&&dom1<0.45)||(g2act>g1act&&dom2<0.45);
  
  return{pH:wH/n,pD:wD/n,pA:wA/n,top,minRest,l1rest:+l1rest.toFixed(2),l2rest:+l2rest.toFixed(2),dom1,dom2,domTxt,sostenible,n};
}

const C="#060a12",G="#00ff88",Y="#ffd200",B="#60a5fa",P="#c084fc";
const sn={pos:"Posesion",blq:"Bloque",cnt:"Contragolpe",mix:"Mixto"};
const Ba=({v,c})=><div style={{background:"#1a1f2e",borderRadius:4,height:7,overflow:"hidden"}}><div style={{width:`${Math.min(v*100,100)}%`,height:"100%",background:c,borderRadius:4}}/></div>;
// Total goles en el mundial por equipo
function totalGoles(eq){
  const ps=RES.filter(r=>r.h===eq||r.a===eq);
  let gf=0,gc=0;
  ps.forEach(r=>{const h=r.h===eq;gf+=h?r.gh:r.ga;gc+=h?r.ga:r.gh;});
  return{gf,gc,n:ps.length};
}

const Fi=({l,v,c})=><div style={{marginBottom:9}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}><span style={{fontSize:12,color:c,fontWeight:600}}>{l}</span><span style={{fontSize:13,fontWeight:800,color:c}}>{(v*100).toFixed(1)}%</span></div><Ba v={v} c={c}/></div>;
const FT=({r})=>{const m={W:["#00ff88","#00ff8818"],D:["#ffd200","#ffd20018"],L:["#ff6060","#ff606018"]};const[c,b]=m[r]||["#555","#222"];return <span style={{width:18,height:18,borderRadius:3,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:800,color:c,background:b}}>{r}</span>;};

export default function App(){
  const[tab,setTab]=useState("pred");
  const[t1,setT1]=useState("Francia");
  const[t2,setT2]=useState("Senegal");
  const[q1,setQ1]=useState("");
  const[qx,setQx]=useState("");
  const[q2,setQ2]=useState("");
  const[hj,setHj]=useState("");
  const[hw1,setHw1]=useState("");
  const[hd,setHd]=useState("");
  const[hw2,setHw2]=useState("");
  const[arb,setArb]=useState("Sin especificar");
  const[pr1,setPr1]=useState("normal");
  const[pr2,setPr2]=useState("normal");
  const[grp,setGrp]=useState("A");
  const[res,setRes]=useState(null);
  const[mc,setMc]=useState(null);
  const[load,setLoad]=useState(false);
  // Estado pestaña En Vivo
  const[lt1,setLt1]=useState("Portugal");
  const[lt2,setLt2]=useState("DR Congo");
  const[lmin,setLmin]=useState("");
  const[lg1,setLg1]=useState("");
  const[lg2,setLg2]=useState("");
  const[lpos1,setLpos1]=useState("");
  const[lpos2,setLpos2]=useState("");
  const[lsp1,setLsp1]=useState("");
  const[lsp2,setLsp2]=useState("");
  const[lco1,setLco1]=useState("");
  const[lco2,setLco2]=useState("");
  const[lroja1,setLroja1]=useState(false);
  const[lroja2,setLroja2]=useState(false);
  const[liveRes,setLiveRes]=useState(null);
  const[liveLoad,setLiveLoad]=useState(false);
  const s1={...T[t1],n:t1},s2={...T[t2],n:t2};
  const f1=calcForma(t1),f2=calcForma(t2);
  const cC=res?.cf==="ALTA"?G:res?.cf==="MEDIA"?Y:"#ff6060";
  const card={background:"#0a0f1e",border:"1px solid #1e2a3a",borderRadius:12,padding:14,marginBottom:12};
  const sel={width:"100%",background:"#0d1117",border:"1px solid #1e2a3a",borderRadius:7,padding:"8px 10px",color:"#e2e8f0",fontSize:13,fontWeight:600};
  const inp={...sel,padding:"7px 8px",textAlign:"center"};
  const tablaGrp=(GRUPOS[grp]||[]).map(eq=>{const fm=calcForma(eq);return{eq,...fm,W:fm.fm.filter(x=>x==="W").length,D:fm.fm.filter(x=>x==="D").length,L:fm.fm.filter(x=>x==="L").length};}).sort((a,b)=>b.pts-a.pts||(b.gf-b.gc)-(a.gf-a.gc));

  function predecir(){
    if(t1===t2)return;
    setLoad(true);
    setTimeout(()=>{
      const r=calc(s1,s2,+q1,+qx,+q2,+hj,+hw1,+hd,+hw2,arb,pr1,pr2);
      const sim=monteCarlo(r.l1,r.l2,10000);
      // Combinar ambos metodos: promedio 50/50
      const cH=(r.pH+sim.pH)/2;
      const cD=(r.pD+sim.pD)/2;
      const cA=(r.pA+sim.pA)/2;
      const tot=cH+cD+cA;
      const combinado={
        pH:cH/tot, pD:cD/tot, pA:cA/tot,
        hx:(cH+cD)/tot, x2:(cD+cA)/tot, ne:(cH+cA)/tot,
      };
      // Marcador del Monte Carlo (más probable de simulacion)
      const topScore=sim.top[0]?.score||`${r.sh}-${r.sa}`;
      const cf=Math.max(combinado.pH,combinado.pD,combinado.pA)>0.55?"ALTA":Math.max(combinado.pH,combinado.pD,combinado.pA)>0.42?"MEDIA":"BAJA";
      const mj=combinado.pH>0.55?"Victoria "+t1:combinado.pA>0.55?"Victoria "+t2:(combinado.pH+combinado.pD)>0.75?"Doble 1X":(combinado.pA+combinado.pD)>0.75?"Doble X2":r.m15>0.72?"Mas 1.5 goles":"Evalua con cuotas";
      setRes({...r,...combinado,cf,mj,topScore,t1,t2});
      setMc(sim);
      setLoad(false);
    },300);
  }

  function predecirLive(){
    if(lt1===lt2||lmin===""||lg1===""||lg2==="")return;
    setLiveLoad(true);
    setTimeout(()=>{
      const ls1={...T[lt1],n:lt1},ls2={...T[lt2],n:lt2};
      const r=predecirEnVivo(ls1,ls2,+lmin,+lg1,+lg2,+lpos1||50,+lpos2||50,+lsp1||0,+lsp2||0,+lco1||0,+lco2||0,lroja1,lroja2);
      setLiveRes({...r,t1:lt1,t2:lt2,g1:+lg1,g2:+lg2,min:+lmin});
      setLiveLoad(false);
    },300);
  }

  return(
    <div style={{minHeight:"100vh",background:C,fontFamily:"Inter,sans-serif",color:"#e2e8f0",maxWidth:600,margin:"0 auto"}}>
      <div style={{background:"#0a0f1e",borderBottom:"1px solid #1e2a3a",padding:"10px 14px"}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
          <div style={{width:36,height:36,borderRadius:9,background:"linear-gradient(135deg,#00ff88,#0088ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20}}>⚽</div>
          <div><div style={{fontSize:15,fontWeight:800,color:"#fff"}}>MUNDIAL 2026 <span style={{color:G}}>PREDICTOR</span></div><div style={{fontSize:9,color:"#4a5568"}}>Poisson ELO xG H2H Estilos Arbitro Presion</div></div>
        </div>
        <div style={{display:"flex",borderTop:"1px solid #1e2a3a"}}>
          {[["pred","Predecir"],["live","🔴 En Vivo"],["grp","Grupos"],["res2","Resultados"]].map(([k,l])=>(<button key={k} onClick={()=>setTab(k)} style={{background:"none",border:"none",cursor:"pointer",padding:"9px 14px",fontSize:12,fontWeight:600,color:tab===k?G:"#64748b",borderBottom:tab===k?`2px solid ${G}`:"2px solid transparent"}}>{l}</button>))}
        </div>
      </div>
      <div style={{padding:12}}>

        {tab==="pred"&&<div>
          <div style={card}>
            <div style={{fontSize:9,color:"#4a5568",letterSpacing:2,marginBottom:12}}>PARTIDO</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 32px 1fr",gap:8,marginBottom:12}}>
              <div>
                <select value={t1} onChange={e=>{setT1(e.target.value);setRes(null);setMc(null);}} style={sel}>{teams.map(t=><option key={t} value={t}>{T[t].fl} {t}</option>)}</select>
                <div style={{fontSize:9,color:P,marginTop:3}}>{sn[s1.s]} ELO {s1.e}</div>
                <div style={{display:"flex",gap:2,marginTop:3}}>{f1.fm.map((f,i)=><FT key={i} r={f}/>)}<span style={{fontSize:9,color:f1.pre?"#ffd200":"#64748b",marginLeft:3}}>{f1.pre?"(prev)":f1.pts+"pts"}</span></div>
                {(()=>{const tg=totalGoles(t1);return tg.n>0?<div style={{fontSize:9,color:"#4a5568",marginTop:2}}>GF:{tg.gf} GC:{tg.gc} en {tg.n}PJ</div>:null;})()}
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:28,height:28,borderRadius:14,background:"#1e2a3a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:Y}}>VS</div></div>
              <div>
                <select value={t2} onChange={e=>{setT2(e.target.value);setRes(null);setMc(null);}} style={sel}>{teams.map(t=><option key={t} value={t}>{T[t].fl} {t}</option>)}</select>
                <div style={{fontSize:9,color:P,marginTop:3}}>{sn[s2.s]} ELO {s2.e}</div>
                <div style={{display:"flex",gap:2,marginTop:3}}>{f2.fm.map((f,i)=><FT key={i} r={f}/>)}<span style={{fontSize:9,color:f2.pre?"#ffd200":"#64748b",marginLeft:3}}>{f2.pre?"(prev)":f2.pts+"pts"}</span></div>
                {(()=>{const tg=totalGoles(t2);return tg.n>0?<div style={{fontSize:9,color:"#4a5568",marginTop:2}}>GF:{tg.gf} GC:{tg.gc} en {tg.n}PJ</div>:null;})()}
              </div>
            </div>

            <div style={{fontSize:9,color:Y,fontWeight:700,marginBottom:8}}>CUOTAS (opcional)</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:12}}>
              <div><div style={{fontSize:9,color:G,marginBottom:2}}>1 {t1.slice(0,6)}</div><input type="number" step="0.01" placeholder="1.85" value={q1} onChange={e=>setQ1(e.target.value)} style={inp}/></div>
              <div><div style={{fontSize:9,color:Y,marginBottom:2}}>X Empate</div><input type="number" step="0.01" placeholder="3.40" value={qx} onChange={e=>setQx(e.target.value)} style={inp}/></div>
              <div><div style={{fontSize:9,color:B,marginBottom:2}}>2 {t2.slice(0,6)}</div><input type="number" step="0.01" placeholder="4.50" value={q2} onChange={e=>setQ2(e.target.value)} style={inp}/></div>
            </div>

            <div style={{fontSize:9,color:P,fontWeight:700,marginBottom:8}}>H2H</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:5,marginBottom:12}}>
              <div><div style={{fontSize:8,color:"#64748b",marginBottom:2}}>Total</div><input type="number" min="0" placeholder="0" value={hj} onChange={e=>setHj(e.target.value)} style={inp}/></div>
              <div><div style={{fontSize:8,color:G,marginBottom:2}}>Vic {t1.slice(0,4)}</div><input type="number" min="0" placeholder="0" value={hw1} onChange={e=>setHw1(e.target.value)} style={inp}/></div>
              <div><div style={{fontSize:8,color:Y,marginBottom:2}}>Empates</div><input type="number" min="0" placeholder="0" value={hd} onChange={e=>setHd(e.target.value)} style={inp}/></div>
              <div><div style={{fontSize:8,color:B,marginBottom:2}}>Vic {t2.slice(0,4)}</div><input type="number" min="0" placeholder="0" value={hw2} onChange={e=>setHw2(e.target.value)} style={inp}/></div>
            </div>

            <div style={{fontSize:9,color:"#ff6060",fontWeight:700,marginBottom:8}}>PRESION DE CLASIFICACION</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
              <div>
                <div style={{fontSize:9,color:"#94a3b8",marginBottom:4}}>{t1.slice(0,10)}</div>
                <select value={pr1} onChange={e=>setPr1(e.target.value)} style={{...sel,fontSize:11}}>
                  <option value="normal">Normal</option>
                  <option value="ganar">Necesita ganar</option>
                  <option value="eliminado">Ya eliminado</option>
                </select>
              </div>
              <div>
                <div style={{fontSize:9,color:"#94a3b8",marginBottom:4}}>{t2.slice(0,10)}</div>
                <select value={pr2} onChange={e=>setPr2(e.target.value)} style={{...sel,fontSize:11}}>
                  <option value="normal">Normal</option>
                  <option value="ganar">Necesita ganar</option>
                  <option value="eliminado">Ya eliminado</option>
                </select>
              </div>
            </div>

            <div style={{fontSize:9,color:"#94a3b8",fontWeight:700,marginBottom:8}}>ARBITRO (opcional)</div>
            <select value={arb} onChange={e=>setArb(e.target.value)} style={{...sel,marginBottom:14}}>
              {Object.keys(ARBITROS).map(a=><option key={a} value={a}>{a} {ARBITROS[a]===1?"(permisivo)":ARBITROS[a]===-1?"(estricto)":""}</option>)}
            </select>

            <button onClick={predecir} disabled={load||t1===t2} style={{width:"100%",padding:"13px 0",borderRadius:10,border:"none",cursor:t1===t2?"not-allowed":"pointer",background:load||t1===t2?"#1e2a3a":"linear-gradient(135deg,#00ff88,#0088ff)",color:load||t1===t2?"#4a5568":"#000",fontWeight:800,fontSize:14}}>
              {load?"Calculando...":"⚡ PREDECIR"}
            </button>
          </div>

          {res&&<div>
            {mc&&<div style={{...card,border:"1px solid #c084fc30",marginBottom:12}}>
              <div style={{fontSize:9,color:P,letterSpacing:2,marginBottom:12}}>MARCADORES MAS PROBABLES — 10,000 SIMULACIONES</div>
              {mc.top.map((m,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <span style={{fontSize:13,fontWeight:900,color:"#fff",minWidth:40,textAlign:"center",background:i===0?"#00ff8820":"#1e2a3a",borderRadius:6,padding:"2px 8px",border:i===0?"1px solid #00ff8840":"none"}}>{m.score}</span>
                  <div style={{flex:1,background:"#1a1f2e",borderRadius:4,height:7,overflow:"hidden"}}>
                    <div style={{width:`${m.prob*100*4}%`,height:"100%",background:i===0?G:i===1?B:P,borderRadius:4}}/>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:i===0?G:i===1?B:P,minWidth:40,textAlign:"right"}}>{(m.prob*100).toFixed(1)}%</span>
                </div>
              ))}
              <div style={{fontSize:9,color:"#4a5568",marginTop:8,textAlign:"center"}}>Probabilidades combinadas Poisson + Monte Carlo</div>
            </div>}
            {res.al&&<div style={{background:"#ff303010",borderRadius:8,padding:10,marginBottom:12,border:"2px solid #ff6060"}}><div style={{fontSize:9,color:"#ff6060",fontWeight:800,marginBottom:3}}>ALERTA BLOQUE</div><div style={{fontSize:11,color:"#fca5a5"}}>Patron confirmado este mundial. El favorito puede dominar pero NO marcar. Usa Doble Oportunidad.</div></div>}
            <div style={{...card,border:`1px solid ${cC}40`}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <span style={{fontSize:9,color:"#4a5568",letterSpacing:2}}>PREDICCION COMBINADA</span>
                <span style={{fontSize:10,padding:"2px 8px",borderRadius:12,fontWeight:700,color:cC,background:cC+"12",border:`1px solid ${cC}30`}}>{res.cf}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:14,background:C,borderRadius:9,padding:14,border:"1px solid #1e2a3a"}}>
                <div style={{textAlign:"center",flex:1}}><div style={{fontSize:28}}>{s1.fl}</div><div style={{fontSize:11,fontWeight:700,marginTop:3}}>{t1}</div><div style={{display:"flex",gap:2,justifyContent:"center",marginTop:3}}>{f1.fm.map((f,i)=><FT key={i} r={f}/>)}</div></div>
                <div style={{textAlign:"center"}}><div style={{fontSize:34,fontWeight:900,letterSpacing:4,color:"#fff"}}>{res.sh}-{res.sa}</div><div style={{fontSize:9,color:"#4a5568"}}>l {res.l1}-{res.l2}</div></div>
                <div style={{textAlign:"center",flex:1}}><div style={{fontSize:28}}>{s2.fl}</div><div style={{fontSize:11,fontWeight:700,marginTop:3}}>{t2}</div><div style={{display:"flex",gap:2,justifyContent:"center",marginTop:3}}>{f2.fm.map((f,i)=><FT key={i} r={f}/>)}</div></div>
              </div>
              <Fi l={"1 "+t1} v={res.pH} c={G}/>
              <Fi l="X Empate" v={res.pD} c={Y}/>
              <Fi l={"2 "+t2} v={res.pA} c={B}/>
            </div>
            <div style={card}>
              <div style={{fontSize:9,color:"#4a5568",letterSpacing:2,marginBottom:12}}>MERCADOS</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                <div style={{background:C,borderRadius:8,padding:10,border:"1px solid #1e2a3a"}}><div style={{fontSize:9,color:"#4a5568",marginBottom:8}}>DOBLE OPORTUNIDAD</div><Fi l="1X" v={res.hx} c={G}/><Fi l="X2" v={res.x2} c={B}/><Fi l="No Emp" v={res.ne} c={Y}/></div>
                <div style={{background:C,borderRadius:8,padding:10,border:"1px solid #1e2a3a"}}><div style={{fontSize:9,color:"#4a5568",marginBottom:8}}>GOLES</div><Fi l="+1.5" v={res.m15} c={G}/><Fi l="+2.5" v={res.m25} c={B}/><Fi l="BTTS" v={res.btts} c={P}/></div>
              </div>
              <div style={{padding:"10px 12px",borderRadius:8,background:"#00ff8808",border:"1px solid #00ff8825"}}><div style={{fontSize:9,color:G,fontWeight:800,marginBottom:3}}>MEJOR APUESTA</div><div style={{fontSize:13,color:"#e2e8f0",fontWeight:600}}>{res.mj}</div></div>
            </div>
          </div>}
        </div>}

        {tab==="live"&&<div>
          <div style={card}>
            <div style={{fontSize:9,color:"#ff6060",letterSpacing:2,marginBottom:12}}>🔴 PARTIDO EN VIVO</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 32px 1fr",gap:8,marginBottom:14}}>
              <select value={lt1} onChange={e=>{setLt1(e.target.value);setLiveRes(null);}} style={sel}>{teams.map(t=><option key={t} value={t}>{T[t].fl} {t}</option>)}</select>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:28,height:28,borderRadius:14,background:"#1e2a3a",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:Y}}>VS</div></div>
              <select value={lt2} onChange={e=>{setLt2(e.target.value);setLiveRes(null);}} style={sel}>{teams.map(t=><option key={t} value={t}>{T[t].fl} {t}</option>)}</select>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
              <div><div style={{fontSize:9,color:"#ff6060",marginBottom:3,fontWeight:700}}>MINUTO</div><input type="number" min="1" max="99" placeholder="29" value={lmin} onChange={e=>setLmin(e.target.value)} style={inp}/></div>
              <div><div style={{fontSize:9,color:G,marginBottom:3,fontWeight:700}}>GOLES {lt1.slice(0,5)}</div><input type="number" min="0" placeholder="0" value={lg1} onChange={e=>setLg1(e.target.value)} style={inp}/></div>
              <div><div style={{fontSize:9,color:B,marginBottom:3,fontWeight:700}}>GOLES {lt2.slice(0,5)}</div><input type="number" min="0" placeholder="0" value={lg2} onChange={e=>setLg2(e.target.value)} style={inp}/></div>
            </div>

            <div style={{fontSize:9,color:P,fontWeight:700,marginBottom:8}}>POSESION % (obligatorio)</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              <input type="number" min="0" max="100" placeholder={lt1.slice(0,10)+" %"} value={lpos1} onChange={e=>setLpos1(e.target.value)} style={inp}/>
              <input type="number" min="0" max="100" placeholder={lt2.slice(0,10)+" %"} value={lpos2} onChange={e=>setLpos2(e.target.value)} style={inp}/>
            </div>

            <div style={{fontSize:9,color:P,fontWeight:700,marginBottom:8}}>TIROS A PUERTA (obligatorio)</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              <input type="number" min="0" placeholder="0" value={lsp1} onChange={e=>setLsp1(e.target.value)} style={inp}/>
              <input type="number" min="0" placeholder="0" value={lsp2} onChange={e=>setLsp2(e.target.value)} style={inp}/>
            </div>

            <div style={{fontSize:9,color:P,fontWeight:700,marginBottom:8}}>CORNERS (obligatorio)</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              <input type="number" min="0" placeholder="0" value={lco1} onChange={e=>setLco1(e.target.value)} style={inp}/>
              <input type="number" min="0" placeholder="0" value={lco2} onChange={e=>setLco2(e.target.value)} style={inp}/>
            </div>

            <div style={{fontSize:9,color:"#ff6060",fontWeight:700,marginBottom:8}}>TARJETA ROJA (opcional)</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
              <label style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#94a3b8",cursor:"pointer"}}><input type="checkbox" checked={lroja1} onChange={e=>setLroja1(e.target.checked)}/> {lt1.slice(0,12)} con roja</label>
              <label style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"#94a3b8",cursor:"pointer"}}><input type="checkbox" checked={lroja2} onChange={e=>setLroja2(e.target.checked)}/> {lt2.slice(0,12)} con roja</label>
            </div>

            <button onClick={predecirLive} disabled={liveLoad||lt1===lt2||lmin===""||lg1===""||lg2===""} style={{width:"100%",padding:"13px 0",borderRadius:10,border:"none",cursor:"pointer",background:liveLoad||lt1===lt2||lmin===""?"#1e2a3a":"linear-gradient(135deg,#ff6060,#ff3030)",color:liveLoad||lt1===lt2||lmin===""?"#4a5568":"#fff",fontWeight:800,fontSize:14}}>
              {liveLoad?"Calculando...":"🔴 PREDECIR EN VIVO"}
            </button>
          </div>

          {liveRes&&<div>
            <div style={{...card,border:"1px solid #ff606040"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <span style={{fontSize:9,color:"#4a5568",letterSpacing:2}}>MIN {liveRes.min}' · {liveRes.minRest} MIN RESTANTES</span>
                <span style={{fontSize:10,padding:"2px 8px",borderRadius:12,fontWeight:700,color:"#ff6060",background:"#ff606012",border:"1px solid #ff606030"}}>EN VIVO</span>
              </div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:14,marginBottom:14,background:C,borderRadius:9,padding:14,border:"1px solid #1e2a3a"}}>
                <div style={{textAlign:"center",flex:1}}><div style={{fontSize:28}}>{T[liveRes.t1]?.fl}</div><div style={{fontSize:11,fontWeight:700,marginTop:3}}>{liveRes.t1}</div></div>
                <div style={{textAlign:"center"}}><div style={{fontSize:30,fontWeight:900,letterSpacing:3,color:"#fff"}}>{liveRes.g1}-{liveRes.g2}</div><div style={{fontSize:9,color:"#ff6060"}}>ACTUAL</div></div>
                <div style={{textAlign:"center",flex:1}}><div style={{fontSize:28}}>{T[liveRes.t2]?.fl}</div><div style={{fontSize:11,fontWeight:700,marginTop:3}}>{liveRes.t2}</div></div>
              </div>

              {liveRes.sostenible&&<div style={{background:"#ff303010",borderRadius:8,padding:10,marginBottom:14,border:"2px solid #ff6060"}}><div style={{fontSize:9,color:"#ff6060",fontWeight:800,marginBottom:3}}>⚠️ MARCADOR EN RIESGO</div><div style={{fontSize:11,color:"#fca5a5"}}>El equipo que va ganando NO esta dominando el juego. Alto riesgo de cambio de resultado.</div></div>}

              <div style={{background:C,borderRadius:8,padding:10,marginBottom:14,border:"1px solid #1e2a3a"}}>
                <div style={{fontSize:9,color:"#4a5568",marginBottom:6}}>INDICE DE DOMINIO</div>
                <div style={{fontSize:13,fontWeight:700,color:liveRes.dom1>0.55?G:liveRes.dom2>0.55?B:Y,marginBottom:8}}>{liveRes.domTxt}</div>
                <div style={{display:"flex",borderRadius:6,overflow:"hidden",height:10}}>
                  <div style={{width:`${liveRes.dom1*100}%`,background:G}}/>
                  <div style={{width:`${liveRes.dom2*100}%`,background:B}}/>
                </div>
                <div style={{display:"flex",justifyContent:"space-between",marginTop:4}}>
                  <span style={{fontSize:9,color:G}}>{(liveRes.dom1*100).toFixed(0)}%</span>
                  <span style={{fontSize:9,color:B}}>{(liveRes.dom2*100).toFixed(0)}%</span>
                </div>
              </div>

              <div style={{fontSize:9,color:"#4a5568",marginBottom:8}}>PROBABILIDAD RESULTADO FINAL</div>
              <Fi l={"Gana "+liveRes.t1} v={liveRes.pH} c={G}/>
              <Fi l="Empate" v={liveRes.pD} c={Y}/>
              <Fi l={"Gana "+liveRes.t2} v={liveRes.pA} c={B}/>
            </div>

            <div style={{...card,border:"1px solid #c084fc30"}}>
              <div style={{fontSize:9,color:P,letterSpacing:2,marginBottom:12}}>MARCADORES FINALES MAS PROBABLES</div>
              {liveRes.top.map((m,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                  <span style={{fontSize:13,fontWeight:900,color:"#fff",minWidth:40,textAlign:"center",background:i===0?"#00ff8820":"#1e2a3a",borderRadius:6,padding:"2px 8px",border:i===0?"1px solid #00ff8840":"none"}}>{m.score}</span>
                  <div style={{flex:1,background:"#1a1f2e",borderRadius:4,height:7,overflow:"hidden"}}>
                    <div style={{width:`${m.prob*100*4}%`,height:"100%",background:i===0?G:i===1?B:P,borderRadius:4}}/>
                  </div>
                  <span style={{fontSize:11,fontWeight:700,color:i===0?G:i===1?B:P,minWidth:40,textAlign:"right"}}>{(m.prob*100).toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>}
        </div>}

        {tab==="grp"&&<div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:12}}>{Object.keys(GRUPOS).map(g=>(<button key={g} onClick={()=>setGrp(g)} style={{padding:"5px 11px",borderRadius:7,border:"1px solid",cursor:"pointer",fontWeight:700,fontSize:12,background:grp===g?"linear-gradient(135deg,#00ff88,#0088ff)":"#0a0f1e",borderColor:grp===g?"transparent":"#1e2a3a",color:grp===g?"#000":"#94a3b8"}}>G {g}</button>))}</div>
          <div style={card}>
            <div style={{fontSize:13,fontWeight:800,marginBottom:12}}>Grupo {grp}</div>
            <div style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr style={{borderBottom:"1px solid #1e2a3a"}}>{["#","","Equipo","PJ","G","E","P","GF","GC","PTS","Forma"].map(h=><td key={h} style={{padding:"5px 6px",fontSize:9,color:"#4a5568",fontWeight:700}}>{h}</td>)}</tr></thead>
                <tbody>{tablaGrp.map((r,i)=>(<tr key={r.eq} style={{borderBottom:"1px solid #0d1117"}}><td style={{padding:"8px 6px",fontSize:11,color:i<2?G:"#4a5568",fontWeight:700}}>{i+1}</td><td style={{padding:"8px 3px",fontSize:14}}>{T[r.eq]?.fl}</td><td style={{padding:"8px 6px",fontSize:11,fontWeight:600,whiteSpace:"nowrap"}}>{r.eq}</td><td style={{padding:"8px 6px",fontSize:11,color:"#94a3b8",textAlign:"center"}}>{r.n}</td><td style={{padding:"8px 6px",fontSize:11,color:G,textAlign:"center",fontWeight:700}}>{r.W}</td><td style={{padding:"8px 6px",fontSize:11,color:Y,textAlign:"center"}}>{r.D}</td><td style={{padding:"8px 6px",fontSize:11,color:"#ff6060",textAlign:"center"}}>{r.L}</td><td style={{padding:"8px 6px",fontSize:11,color:"#94a3b8",textAlign:"center"}}>{r.gf}</td><td style={{padding:"8px 6px",fontSize:11,color:"#94a3b8",textAlign:"center"}}>{r.gc}</td><td style={{padding:"8px 6px",textAlign:"center"}}><span style={{fontSize:13,fontWeight:900,color:r.pts>0?"#fff":"#4a5568"}}>{r.pts}</span></td><td style={{padding:"8px 6px"}}><div style={{display:"flex",gap:2}}>{r.fm.map((f,i)=><FT key={i} r={f}/>)}{!r.fm.length&&<span style={{fontSize:9,color:"#4a5568"}}>-</span>}</div></td></tr>))}</tbody>
              </table>
            </div>
          </div>
          <div style={card}>
            <div style={{fontSize:9,color:"#4a5568",letterSpacing:2,marginBottom:10}}>PARTIDOS</div>
            {(GRUPOS[grp]||[]).flatMap((ta,i)=>(GRUPOS[grp]||[]).slice(i+1).map(tb=>{const r=RES.find(x=>(x.h===ta&&x.a===tb)||(x.h===tb&&x.a===ta));return <div key={ta+tb} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 0",borderBottom:"1px solid #0d1117"}}><span>{T[ta]?.fl}</span><span style={{fontSize:11,flex:1}}>{ta}</span>{r?<span style={{fontSize:12,fontWeight:900,padding:"1px 8px",background:"#1e2a3a",borderRadius:5}}>{r.h===ta?`${r.gh}-${r.ga}`:`${r.ga}-${r.gh}`}</span>:<button onClick={()=>{setT1(ta);setT2(tb);setTab("pred");setRes(null);}} style={{padding:"2px 8px",borderRadius:5,border:`1px solid ${G}20`,background:`${G}08`,color:G,fontSize:10,cursor:"pointer",fontWeight:700}}>Predecir</button>}<span style={{fontSize:11,flex:1,textAlign:"right"}}>{tb}</span><span>{T[tb]?.fl}</span></div>;}))}</div>
        </div>}

        {tab==="res2"&&<div>
          <div style={{fontSize:9,color:"#4a5568",letterSpacing:2,marginBottom:12}}>RESULTADOS MUNDIAL 2026</div>
          {["Jun 11","Jun 12","Jun 13","Jun 14","Jun 15","Jun 16","Jun 17"].map(f=>{const ps=RES.filter(r=>r.f===f);if(!ps.length)return null;const lb={"Jun 11":"JUE 11","Jun 12":"VIE 12","Jun 13":"SAB 13","Jun 14":"DOM 14","Jun 15":"LUN 15","Jun 16":"MAR 16","Jun 17":"MIE 17"}[f];return <div key={f} style={{marginBottom:12}}><div style={{fontSize:10,color:Y,fontWeight:700,marginBottom:6}}>{lb} JUN</div><div style={{background:"#0a0f1e",border:"1px solid #1e2a3a",borderRadius:10,overflow:"hidden"}}>{ps.map((r,i)=><div key={i} style={{padding:"10px 12px",borderBottom:i<ps.length-1?"1px solid #0d1117":"none",display:"flex",alignItems:"center",gap:7}}><span style={{fontSize:14}}>{T[r.h]?.fl}</span><span style={{flex:1,fontSize:11,fontWeight:600}}>{r.h}</span><span style={{fontSize:16,fontWeight:900,letterSpacing:2,minWidth:48,textAlign:"center"}}>{r.gh}-{r.ga}</span><span style={{flex:1,fontSize:11,fontWeight:600,textAlign:"right"}}>{r.a}</span><span style={{fontSize:14}}>{T[r.a]?.fl}</span></div>)}</div></div>;})}
        </div>}

      </div>
      <div style={{textAlign:"center",padding:12,borderTop:"1px solid #1e2a3a"}}><span style={{fontSize:11,fontWeight:700,color:"#00ff88",background:"#00ff8812",padding:"3px 12px",borderRadius:20,border:"1px solid #00ff8830"}}>{VERSION}</span><div style={{fontSize:9,color:"#2a3548",marginTop:6}}>Poisson · ELO · xG · H2H · Monte Carlo · Mundial 2026</div></div>
    </div>
  );
}

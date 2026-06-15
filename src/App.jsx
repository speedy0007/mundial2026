import { useState } from "react";

// ══════════════════════════════════════════════════════
// DATOS REALES DEL MUNDIAL 2026 (xG oficiales por partido)
// ══════════════════════════════════════════════════════
const RESULTADOS = [
  { home:"México",        away:"Sudáfrica",           gH:2,gA:0, xGH:1.41,xGA_r:0.07, fecha:"Jun 11",grupo:"A" },
  { home:"Corea del Sur", away:"Chequia",              gH:2,gA:1, xGH:1.84,xGA_r:0.81, fecha:"Jun 11",grupo:"A" },
  { home:"Canadá",        away:"Bosnia y Herzegovina", gH:1,gA:1, xGH:1.25,xGA_r:0.98, fecha:"Jun 12",grupo:"B" },
  { home:"Estados Unidos",away:"Paraguay",             gH:4,gA:1, xGH:1.35,xGA_r:0.47, fecha:"Jun 12",grupo:"D" },
  { home:"Qatar",         away:"Suiza",                gH:1,gA:1, xGH:0.76,xGA_r:3.24, fecha:"Jun 13",grupo:"B" },
  { home:"Brasil",        away:"Marruecos",            gH:1,gA:1, xGH:1.23,xGA_r:1.53, fecha:"Jun 13",grupo:"C" },
  { home:"Haití",         away:"Escocia",              gH:0,gA:1, xGH:1.21,xGA_r:1.05, fecha:"Jun 13",grupo:"C" },
  { home:"Australia",     away:"Turquía",              gH:2,gA:0, xGH:0.77,xGA_r:1.33, fecha:"Jun 13",grupo:"D" },
  { home:"Alemania",      away:"Curazao",              gH:7,gA:1, xGH:4.22,xGA_r:0.61, fecha:"Jun 14",grupo:"E" },
  { home:"Países Bajos",  away:"Japón",                gH:2,gA:2, xGH:2.10,xGA_r:1.80, fecha:"Jun 14",grupo:"F" },
  { home:"Costa de Marfil",away:"Ecuador",             gH:1,gA:0, xGH:0.90,xGA_r:1.80, fecha:"Jun 14",grupo:"E" },
];

const GRUPOS = {
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

// Stats base FIFA/ELO + capacidades
const TEAMS = {
  "Argentina":       {fifa:1874,elo:2113,xG:2.0,xGA:0.9,flag:"🇦🇷",atk:9,def:9,tier:1},
  "Francia":         {fifa:1877,elo:2063,xG:1.9,xGA:1.0,flag:"🇫🇷",atk:9,def:8,tier:1},
  "España":          {fifa:1876,elo:2171,xG:1.8,xGA:0.8,flag:"🇪🇸",atk:8,def:9,tier:1},
  "Inglaterra":      {fifa:1825,elo:2042,xG:1.7,xGA:1.0,flag:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",atk:8,def:8,tier:1},
  "Portugal":        {fifa:1763,elo:1976,xG:1.7,xGA:1.0,flag:"🇵🇹",atk:8,def:7,tier:2},
  "Brasil":          {fifa:1761,elo:1979,xG:1.7,xGA:1.0,flag:"🇧🇷",atk:8,def:8,tier:1},
  "Países Bajos":    {fifa:1757,elo:1959,xG:1.6,xGA:1.1,flag:"🇳🇱",atk:8,def:7,tier:2},
  "Marruecos":       {fifa:1755,elo:1940,xG:1.3,xGA:0.8,flag:"🇲🇦",atk:6,def:9,tier:2},
  "Bélgica":         {fifa:1734,elo:1849,xG:1.6,xGA:1.1,flag:"🇧🇪",atk:7,def:7,tier:2},
  "Alemania":        {fifa:1730,elo:1910,xG:1.6,xGA:1.1,flag:"🇩🇪",atk:8,def:7,tier:2},
  "Croacia":         {fifa:1717,elo:1933,xG:1.4,xGA:1.0,flag:"🇭🇷",atk:6,def:7,tier:2},
  "Colombia":        {fifa:1693,elo:1998,xG:1.5,xGA:1.1,flag:"🇨🇴",atk:7,def:7,tier:2},
  "Senegal":         {fifa:1688,elo:1869,xG:1.4,xGA:1.1,flag:"🇸🇳",atk:7,def:7,tier:2},
  "México":          {fifa:1681,elo:1820,xG:1.3,xGA:1.2,flag:"🇲🇽",atk:6,def:6,tier:3},
  "Estados Unidos":  {fifa:1673,elo:1780,xG:1.3,xGA:1.2,flag:"🇺🇸",atk:7,def:6,tier:3},
  "Uruguay":         {fifa:1673,elo:1890,xG:1.4,xGA:1.0,flag:"🇺🇾",atk:6,def:8,tier:2},
  "Japón":           {fifa:1660,elo:1879,xG:1.4,xGA:1.1,flag:"🇯🇵",atk:7,def:7,tier:2},
  "Suiza":           {fifa:1649,elo:1897,xG:1.4,xGA:1.0,flag:"🇨🇭",atk:6,def:7,tier:2},
  "Ecuador":         {fifa:1620,elo:1933,xG:1.4,xGA:1.1,flag:"🇪🇨",atk:7,def:7,tier:2},
  "Noruega":         {fifa:1610,elo:1922,xG:1.5,xGA:1.2,flag:"🇳🇴",atk:8,def:6,tier:2},
  "Suecia":          {fifa:1595,elo:1890,xG:1.5,xGA:1.2,flag:"🇸🇪",atk:7,def:7,tier:2},
  "Turquía":         {fifa:1600,elo:1880,xG:1.4,xGA:1.2,flag:"🇹🇷",atk:7,def:6,tier:3},
  "Austria":         {fifa:1580,elo:1820,xG:1.3,xGA:1.2,flag:"🇦🇹",atk:7,def:6,tier:3},
  "Corea del Sur":   {fifa:1560,elo:1790,xG:1.2,xGA:1.2,flag:"🇰🇷",atk:6,def:6,tier:3},
  "Australia":       {fifa:1540,elo:1750,xG:1.2,xGA:1.3,flag:"🇦🇺",atk:6,def:6,tier:3},
  "Canadá":          {fifa:1530,elo:1770,xG:1.3,xGA:1.3,flag:"🇨🇦",atk:6,def:6,tier:3},
  "Escocia":         {fifa:1520,elo:1760,xG:1.3,xGA:1.2,flag:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",atk:6,def:7,tier:3},
  "Paraguay":        {fifa:1470,elo:1700,xG:1.1,xGA:1.3,flag:"🇵🇾",atk:5,def:6,tier:3},
  "Argelia":         {fifa:1450,elo:1680,xG:1.2,xGA:1.2,flag:"🇩🇿",atk:5,def:6,tier:3},
  "Arabia Saudita":  {fifa:1430,elo:1640,xG:1.1,xGA:1.4,flag:"🇸🇦",atk:5,def:5,tier:4},
  "Túnez":           {fifa:1420,elo:1630,xG:1.1,xGA:1.3,flag:"🇹🇳",atk:5,def:6,tier:4},
  "Egipto":          {fifa:1410,elo:1620,xG:1.1,xGA:1.3,flag:"🇪🇬",atk:5,def:6,tier:4},
  "Irán":            {fifa:1400,elo:1610,xG:1.0,xGA:1.2,flag:"🇮🇷",atk:5,def:6,tier:4},
  "Ghana":           {fifa:1390,elo:1600,xG:1.1,xGA:1.4,flag:"🇬🇭",atk:5,def:5,tier:4},
  "Costa de Marfil": {fifa:1380,elo:1590,xG:1.1,xGA:1.4,flag:"🇨🇮",atk:6,def:5,tier:3},
  "DR Congo":        {fifa:1370,elo:1570,xG:1.1,xGA:1.4,flag:"🇨🇩",atk:5,def:5,tier:4},
  "Bosnia y Herzegovina":{fifa:1360,elo:1560,xG:1.1,xGA:1.4,flag:"🇧🇦",atk:5,def:5,tier:4},
  "Chequia":         {fifa:1340,elo:1540,xG:1.0,xGA:1.3,flag:"🇨🇿",atk:5,def:5,tier:4},
  "Jordania":        {fifa:1200,elo:1400,xG:0.8,xGA:1.5,flag:"🇯🇴",atk:4,def:4,tier:4},
  "Uzbekistán":      {fifa:1220,elo:1420,xG:0.9,xGA:1.4,flag:"🇺🇿",atk:4,def:4,tier:4},
  "Qatar":           {fifa:1320,elo:1500,xG:1.0,xGA:1.4,flag:"🇶🇦",atk:5,def:5,tier:4},
  "Panamá":          {fifa:1300,elo:1480,xG:0.9,xGA:1.5,flag:"🇵🇦",atk:4,def:5,tier:4},
  "Irak":            {fifa:1250,elo:1450,xG:0.9,xGA:1.5,flag:"🇮🇶",atk:4,def:4,tier:4},
  "Cabo Verde":      {fifa:1280,elo:1460,xG:1.0,xGA:1.5,flag:"🇨🇻",atk:4,def:5,tier:4},
  "Sudáfrica":       {fifa:1310,elo:1490,xG:1.0,xGA:1.4,flag:"🇿🇦",atk:5,def:5,tier:4},
  "Nueva Zelanda":   {fifa:1150,elo:1380,xG:0.8,xGA:1.6,flag:"🇳🇿",atk:3,def:4,tier:4},
  "Curazao":         {fifa:1100,elo:1350,xG:0.7,xGA:1.6,flag:"🇨🇼",atk:3,def:3,tier:4},
  "Haití":           {fifa:1080,elo:1330,xG:0.7,xGA:1.7,flag:"🇭🇹",atk:3,def:3,tier:4},
};

// Lección del mundial: resultados que definen las sorpresas
const SORPRESAS = [
  "Australia 2-0 Turquía (xG: 0.77 vs 1.33 — ganó el que menos mereció)",
  "Qatar 1-1 Suiza (xG: 0.76 vs 3.24 — Qatar se salvó del colapso)",
  "Costa de Marfil 1-0 Ecuador (xG: 0.90 vs 1.80 — Ecuador controló pero perdió)",
  "Brasil 1-1 Marruecos (xG equilibrado — empate justo)",
];

const allTeams = Object.keys(TEAMS).sort();

function calcForma(equipo) {
  const ps = RESULTADOS.filter(r => r.home===equipo||r.away===equipo);
  let pts=0,gf=0,gc=0,xGfor=0,xGcon=0,forma=[];
  ps.forEach(r=>{
    const isHome = r.home===equipo;
    const myG=isHome?r.gH:r.gA, opG=isHome?r.gA:r.gH;
    const myxG=isHome?r.xGH:r.xGA_r, opxG=isHome?r.xGA_r:r.xGH;
    gf+=myG; gc+=opG; xGfor+=myxG; xGcon+=opxG;
    if(myG>opG){pts+=3;forma.push("W");}
    else if(myG===opG){pts+=1;forma.push("D");}
    else{forma.push("L");}
  });
  return {pts,gf,gc,xGfor:+xGfor.toFixed(2),xGcon:+xGcon.toFixed(2),forma,partidos:ps.length};
}

// ══════════════════════════════
// COMPONENTES UI
// ══════════════════════════════
const Tag = ({c,children,size=11})=>{
  const cols={green:["#00ff88","#00ff8818","#00ff8840"],yellow:["#ffd200","#ffd20018","#ffd20040"],red:["#ff6060","#ff606018","#ff606040"],blue:["#60a5fa","#60a5fa18","#60a5fa40"],purple:["#c084fc","#c084fc18","#c084fc40"]};
  const [color,bg,border]=cols[c]||cols.blue;
  return <span style={{display:"inline-flex",alignItems:"center",gap:3,padding:`2px ${size<12?8:12}px`,borderRadius:20,fontSize:size,fontWeight:700,color,background:bg,border:`1px solid ${border}`}}>{children}</span>;
};

const FormaTag=({r})=>{
  const m={W:["#00ff88","#00ff8820"],D:["#ffd200","#ffd20020"],L:["#ff6060","#ff606020"]};
  const [c,b]=m[r]||["#64748b","#1e2a3a"];
  return <span style={{width:20,height:20,borderRadius:4,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:800,color:c,background:b,border:`1px solid ${c}30`}}>{r}</span>;
};

const Bar=({v,max,color="#00ff88"})=>(
  <div style={{background:"#1a1f2e",borderRadius:4,height:8,overflow:"hidden",flex:1}}>
    <div style={{width:`${Math.min((v/max)*100,100)}%`,height:"100%",background:color,borderRadius:4,transition:"width 1s ease",boxShadow:`0 0 6px ${color}55`}}/>
  </div>
);

const Meter=({label,v1,v2,max=10,c1="#00ff88",c2="#60a5fa"})=>(
  <div style={{marginBottom:10}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
      <span style={{fontSize:12,color:c1,fontWeight:700}}>{typeof v1==="number"&&v1%1!==0?v1.toFixed(1):v1}</span>
      <span style={{fontSize:10,color:"#4a5568"}}>{label}</span>
      <span style={{fontSize:12,color:c2,fontWeight:700}}>{typeof v2==="number"&&v2%1!==0?v2.toFixed(1):v2}</span>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
      <Bar v={v1} max={max} color={c1}/>
      <Bar v={v2} max={max} color={c2}/>
    </div>
  </div>
);

const Section=({title,children,accent="#1e2a3a"})=>(
  <div style={{background:"#0a0f1e",border:`1px solid ${accent}`,borderRadius:14,padding:18,marginBottom:14}}>
    {title&&<div style={{fontSize:10,color:"#4a5568",letterSpacing:2,fontWeight:700,marginBottom:14}}>{title}</div>}
    {children}
  </div>
);

// ══════════════════════════════
// APP PRINCIPAL
// ══════════════════════════════
export default function App(){
  const [tab,setTab]=useState("predictor");
  const [t1,setT1]=useState("España");
  const [t2,setT2]=useState("Cabo Verde");
  const [c1,setC1]=useState("");
  const [cX,setCX]=useState("");
  const [c2odd,setC2odd]=useState("");
  const [bajaH,setBajaH]=useState("");
  const [bajaA,setBajaA]=useState("");
  const [res,setRes]=useState(null);
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState(null);
  const [grp,setGrp]=useState("A");

  const formaT1=calcForma(t1);
  const formaT2=calcForma(t2);
  const statsT1=TEAMS[t1];
  const statsT2=TEAMS[t2];

  // Señales de valor: cuántas coinciden a favor del favorito
  const computeSignales=()=>{
    if(!statsT1||!statsT2) return [];
    const sigs=[];
    const dElo=statsT1.elo-statsT2.elo;
    if(Math.abs(dElo)>200) sigs.push({txt:`Diferencia ELO significativa: ${dElo>0?t1:t2} +${Math.abs(dElo)}`,favor:dElo>0?"home":"away",fuerte:Math.abs(dElo)>400});
    if(formaT1.partidos>0||formaT2.partidos>0){
      if(formaT1.pts>formaT2.pts) sigs.push({txt:`Mejor forma en torneo: ${t1} (${formaT1.pts}pts vs ${formaT2.pts}pts)`,favor:"home",fuerte:formaT1.pts-formaT2.pts>=2});
      if(formaT2.pts>formaT1.pts) sigs.push({txt:`Mejor forma en torneo: ${t2} (${formaT2.pts}pts vs ${formaT1.pts}pts)`,favor:"away",fuerte:formaT2.pts-formaT1.pts>=2});
      if(formaT1.partidos>0&&formaT2.partidos===0) sigs.push({txt:`${t1} ya tiene ritmo competitivo, ${t2} debuta`,favor:"home",fuerte:false});
      if(formaT2.partidos>0&&formaT1.partidos===0) sigs.push({txt:`${t2} ya tiene ritmo competitivo, ${t1} debuta`,favor:"away",fuerte:false});
    }
    if(statsT1.def>=8&&statsT2.atk<=5) sigs.push({txt:`Defensa sólida de ${t1} vs ataque débil de ${t2}`,favor:"home",fuerte:true});
    if(statsT2.def>=8&&statsT1.atk<=5) sigs.push({txt:`Defensa sólida de ${t2} vs ataque débil de ${t1}`,favor:"away",fuerte:true});
    if(statsT1.tier<statsT2.tier) sigs.push({txt:`${t1} es de mayor nivel histórico (Tier ${statsT1.tier} vs ${statsT2.tier})`,favor:"home",fuerte:statsT2.tier-statsT1.tier>=2});
    if(statsT2.tier<statsT1.tier) sigs.push({txt:`${t2} es de mayor nivel histórico (Tier ${statsT2.tier} vs ${statsT1.tier})`,favor:"away",fuerte:statsT1.tier-statsT2.tier>=2});
    return sigs;
  };
  const senales=computeSignales();
  const senalesHome=senales.filter(s=>s.favor==="home");
  const senalesAway=senales.filter(s=>s.favor==="away");
  const senalesFuertes=senales.filter(s=>s.fuerte);

  const predict=async()=>{
    if(t1===t2){setErr("Selecciona dos equipos diferentes.");return;}
    setLoading(true);setErr(null);setRes(null);
    const s1=TEAMS[t1],s2=TEAMS[t2];
    if(!s1||!s2){setErr("Datos no disponibles.");setLoading(false);return;}

    let cuotasBlock="";
    if(c1&&cX&&c2odd){
      const pH=1/parseFloat(c1),pD=1/parseFloat(cX),pA=1/parseFloat(c2odd);
      const tot=pH+pD+pA;
      cuotasBlock=`
⭐ CUOTAS DE MERCADO (Feature #1 — peso 45% en el modelo):
  Cuota 1 (${t1}): ${c1} → prob ${(pH/tot*100).toFixed(1)}%
  Cuota X (empate): ${cX} → prob ${(pD/tot*100).toFixed(1)}%
  Cuota 2 (${t2}): ${c2odd} → prob ${(pA/tot*100).toFixed(1)}%
  Las casas de apuestas ya incorporan lesiones, estado físico, clima y toda la info disponible.`;
    }

    const sorpresasBlock=SORPRESAS.map(s=>`  • ${s}`).join("\n");
    const prompt=`Eres un modelo XGBoost avanzado entrenado en predicción de partidos de fútbol del Mundial 2026.

PARTIDO A ANALIZAR: ${t1} vs ${t2}
Sede: Terreno neutral (Mundial 2026 USA/CAN/MEX)

══════════ FEATURES COMPLETOS ══════════

1. ELO Y FIFA (peso 20%):
   ${t1}: ELO=${s1.elo}, FIFA=${s1.fifa}, Tier=${s1.tier}/4
   ${t2}: ELO=${s2.elo}, FIFA=${s2.fifa}, Tier=${s2.tier}/4
   diff_elo=${s1.elo-s2.elo} | diff_tier=${s1.tier-s2.tier}

2. CAPACIDADES (peso 15%):
   ${t1}: Ataque=${s1.atk}/10, Defensa=${s1.def}/10, xG_prom=${s1.xG}, xGA_prom=${s1.xGA}
   ${t2}: Ataque=${s2.atk}/10, Defensa=${s2.def}/10, xG_prom=${s2.xG}, xGA_prom=${s2.xGA}

3. FORMA REAL EN ESTE MUNDIAL (peso 20%):
   ${t1}: ${formaT1.partidos}PJ, ${formaT1.pts}pts, GF:${formaT1.gf} GC:${formaT1.gc}, xGfor:${formaT1.xGfor} xGcon:${formaT1.xGcon}, forma:[${formaT1.forma.join(",")||"sin partidos"}]
   ${t2}: ${formaT2.partidos}PJ, ${formaT2.pts}pts, GF:${formaT2.gf} GC:${formaT2.gc}, xGfor:${formaT2.xGfor} xGcon:${formaT2.xGcon}, forma:[${formaT2.forma.join(",")||"sin partidos"}]
${cuotasBlock}
${bajaH?`4. BAJAS ${t1}: ${bajaH}`:""}
${bajaA?`5. BAJAS ${t2}: ${bajaA}`:""}

══════════ CONTEXTO CRÍTICO: LECCIONES DEL MUNDIAL 2026 ══════════
Resultados sorpresivos ya registrados (MUY IMPORTANTE para calibrar):
${sorpresasBlock}

PATRONES CLAVE COMPROBADOS:
- Los equipos que dominan xG pero pierden son COMUNES en este mundial (Costa de Marfil, Australia, Qatar)
- La diferencia Tier ≥2 casi siempre favorece al equipo superior
- En partidos equilibrados (ELO diff < 150), el empate es altamente probable
- Un solo gol cambia TODO: la línea entre ganar y perder es mínima

══════════ LO QUE DEBES CALCULAR ══════════

Responde EXCLUSIVAMENTE con JSON válido sin texto extra:
{
  "prob_home": 0.XX,
  "prob_draw": 0.XX,
  "prob_away": 0.XX,
  "doble_oportunidad": {
    "homeOrDraw": 0.XX,
    "awayOrDraw": 0.XX,
    "noEmpate": 0.XX
  },
  "goles": {
    "mas15": 0.XX,
    "mas25": 0.XX,
    "mas35": 0.XX,
    "ambosAnot": 0.XX
  },
  "predicted_score_home": X,
  "predicted_score_away": X,
  "confianza": "ALTA|MEDIA|BAJA",
  "hay_valor": true|false,
  "mejor_apuesta": "texto de la apuesta con mayor valor esperado",
  "apuesta_evitar": "qué NO apostar y por qué",
  "señal_consenso": "FUERTE|MODERADA|NINGUNA",
  "key_factors": ["factor1 con número real","factor2 con número real","factor3 con número real"],
  "alerta_sorpresa": "riesgo específico de sorpresa basado en patrones del mundial",
  "analysis": "3-4 frases de análisis táctico con datos reales"
}`;

    try{
      const response=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1200,messages:[{role:"user",content:prompt}]})
      });
      const data=await response.json();
      const text=data.content?.map(i=>i.text||"").join("")||"";
      const m=text.match(/\{[\s\S]*\}/);
      if(!m) throw new Error("No JSON");
      const parsed=JSON.parse(m[0]);
      setRes({...parsed,t1,t2,formaT1,formaT2,s1,s2});
    }catch(e){setErr("Error al obtener predicción. Intenta de nuevo.");}
    setLoading(false);
  };

  // Tabla grupo
  const grupoTeams=GRUPOS[grp]||[];
  const tablaGrp=grupoTeams.map(team=>{
    const f=calcForma(team);
    const wins=f.forma.filter(x=>x==="W").length;
    const draws=f.forma.filter(x=>x==="D").length;
    const losses=f.forma.filter(x=>x==="L").length;
    return{team,...f,wins,draws,losses};
  }).sort((a,b)=>b.pts-a.pts||(b.gf-b.gc)-(a.gf-a.gc));

  const TABS=[["predictor","🎯 Predecir"],["grupos","🏆 Grupos"],["resultados","📋 Resultados"],["guia","📖 Guía"]];

  return(
    <div style={{minHeight:"100vh",background:"#060a12",fontFamily:"'Inter','Segoe UI',sans-serif",color:"#e2e8f0"}}>

      {/* HEADER */}
      <div style={{background:"linear-gradient(135deg,#0a0f1e,#0d1528)",borderBottom:"1px solid #1e2a3a"}}>
        <div style={{maxWidth:940,margin:"0 auto",padding:"0 14px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,paddingTop:14,paddingBottom:8}}>
            <div style={{width:38,height:38,borderRadius:9,background:"linear-gradient(135deg,#00ff88,#0088ff)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:"0 0 18px #00ff8840"}}>⚽</div>
            <div>
              <div style={{fontSize:16,fontWeight:800,color:"#fff",letterSpacing:-0.5}}>MUNDIAL 2026 <span style={{color:"#00ff88"}}>PREDICTOR PRO</span></div>
              <div style={{fontSize:9,color:"#4a5568",letterSpacing:2}}>XGBoost · xG REALES · CUOTAS · DOBLE OPORTUNIDAD · IA</div>
            </div>
            <div style={{marginLeft:"auto",display:"flex",gap:6}}>
              <Tag c="green" size={10}>🔴 LIVE</Tag>
              <Tag c="blue" size={10}>14 Jun 2026</Tag>
            </div>
          </div>
          <div style={{display:"flex",gap:0,borderTop:"1px solid #1e2a3a",overflowX:"auto"}}>
            {TABS.map(([key,label])=>(
              <button key={key} onClick={()=>setTab(key)} style={{background:"none",border:"none",cursor:"pointer",padding:"10px 14px",fontSize:12,fontWeight:600,color:tab===key?"#00ff88":"#64748b",borderBottom:tab===key?"2px solid #00ff88":"2px solid transparent",whiteSpace:"nowrap"}}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:940,margin:"0 auto",padding:"14px"}}>

        {/* ════════ PREDICTOR ════════ */}
        {tab==="predictor"&&(
          <div>
            <Section title="SELECCIONAR PARTIDO">
              {/* Equipos */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 34px 1fr",gap:10,marginBottom:14}}>
                <div>
                  <div style={{fontSize:9,color:"#4a5568",marginBottom:5,letterSpacing:1}}>EQUIPO 1</div>
                  <select value={t1} onChange={e=>setT1(e.target.value)} style={{width:"100%",background:"#0d1117",border:"1px solid #1e2a3a",borderRadius:8,padding:"8px 10px",color:"#e2e8f0",fontSize:13,fontWeight:600}}>
                    {allTeams.map(t=><option key={t} value={t}>{TEAMS[t]?.flag} {t}</option>)}
                  </select>
                  {formaT1.partidos>0?(
                    <div style={{marginTop:7,padding:"7px 9px",background:"#060a12",borderRadius:7,border:"1px solid #1e2a3a"}}>
                      <div style={{fontSize:9,color:"#4a5568",marginBottom:4}}>FORMA EN EL MUNDIAL</div>
                      <div style={{display:"flex",gap:3,marginBottom:3}}>{formaT1.forma.map((f,i)=><FormaTag key={i} r={f}/>)}</div>
                      <div style={{fontSize:10,color:"#64748b"}}>{formaT1.pts}pts · {formaT1.gf}-{formaT1.gc} · xG:{formaT1.xGfor}</div>
                    </div>
 

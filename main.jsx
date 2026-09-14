import React, {useMemo, useState} from "react";
import {createRoot} from "react-dom/client";
import "./style.css";

const demoGames=[
 {id:1,title:"ECHOES OF VALOR",platform:"PC",genre:"RPG",status:"プレイ中",progress:65,memo:"第5章。ボス戦前に装備を整える。"},
 {id:2,title:"STAR FRONTIER",platform:"PS5",genre:"アクション",status:"クリア",progress:100,memo:"本編クリア。実績を回収中。"},
 {id:3,title:"MYSTIC FARM",platform:"Switch",genre:"シミュレーション",status:"積みゲー",progress:15,memo:"序盤で一旦休止。"}
];

function App(){
 const [logged,setLogged]=useState(false);
 const [games,setGames]=useState(demoGames);
 const [q,setQ]=useState("");
 const [filter,setFilter]=useState("すべて");
 const [editing,setEditing]=useState(null);
 const [detail,setDetail]=useState(null);

 const list=useMemo(()=>games.filter(g=>
   (g.title.toLowerCase().includes(q.toLowerCase())||g.genre.includes(q)) &&
   (filter==="すべて"||g.status===filter)
 ),[games,q,filter]);

 if(!logged) return <Login onLogin={()=>setLogged(true)}/>;

 const total=games.length;
 const playing=games.filter(g=>g.status==="プレイ中").length;
 const cleared=games.filter(g=>g.status==="クリア").length;
 const avg=total?Math.round(games.reduce((a,g)=>a+g.progress,0)/total):0;

 function save(data){
   if(data.id) setGames(games.map(g=>g.id===data.id?data:g));
   else setGames([{...data,id:Date.now()},...games]);
   setEditing(null);
 }

 function remove(id){
   if(confirm("このゲームを削除しますか？")){
     setGames(games.filter(g=>g.id!==id));
     setDetail(null);
   }
 }

 return <div className="app">
  <header><div className="brand"><b>G</b><span>GameLog<small>GAME GUIDE & PROGRESS MANAGER</small></span></div>
   <div><button className="add" onClick={()=>setEditing({})}>＋ ゲームを追加</button>
   <button className="logout" onClick={()=>setLogged(false)}>ログアウト</button></div>
  </header>

  <main>
   <section className="hero"><div><small>MY GAME DATABASE</small>
    <h1>ゲームの攻略情報と<br/><em>プレイ状況をひとまとめ。</em></h1>
    <p>「次どこまで進めたっけ？」をなくす、ゲーム管理アプリ。</p>
   </div><div className="average"><small>AVERAGE PROGRESS</small><strong>{avg}%</strong><div className="bar"><i style={{width:avg+"%"}}/></div></div></section>

   <section className="stats">
    <Stat t="登録ゲーム" v={total} u="本"/><Stat t="プレイ中" v={playing} u="本"/>
    <Stat t="クリア済み" v={cleared} u="本"/><Stat t="平均進行度" v={avg} u="%"/>
   </section>

   <section className="tools"><label>⌕<input value={q} onChange={e=>setQ(e.target.value)} placeholder="ゲーム名・ジャンルで検索"/></label>
    <div>{["すべて","プレイ中","クリア","積みゲー"].map(x=><button className={filter===x?"sel":""} onClick={()=>setFilter(x)} key={x}>{x}</button>)}</div>
   </section>

   <section className="heading"><div><small>MY LIBRARY</small><h2>ゲーム一覧</h2></div><span>{list.length} GAMES</span></section>
   <section className="grid">{list.map(g=><article onClick={()=>setDetail(g)} key={g.id}>
     <div className="cover"><small>GAMELOG / {g.genre}</small><strong>{g.title}</strong><span>{g.platform}</span></div>
     <div className="body"><div className="line"><h3>{g.title}</h3><b className="badge">{g.status}</b></div>
      <small>{g.platform}　/　{g.genre}</small><div className="line progress"><span>進行度</span><b>{g.progress}%</b></div>
      <div className="bar"><i style={{width:g.progress+"%"}}/></div><p>{g.memo}</p>
     </div></article>)}</section>
  </main>
  <footer>GameLog — ゲーム攻略・プレイ状況管理アプリ</footer>
  {editing!==null&&<Editor game={editing.id?editing:null} close={()=>setEditing(null)} save={save}/>}
  {detail&&<Detail game={detail} close={()=>setDetail(null)} edit={()=>{setEditing(detail);setDetail(null)}} remove={()=>remove(detail.id)}/>}
 </div>
}

function Stat({t,v,u}){return <div><small>{t}</small><strong>{v}<i>{u}</i></strong></div>}

function Login({onLogin}){
 const [email,setEmail]=useState("");const [pass,setPass]=useState("");
 return <div className="login"><div className="loginbox"><div className="loginlogo">G</div><small>GAME GUIDE & PROGRESS MANAGER</small><h1>GameLog</h1>
 <p>ゲームの攻略情報とプレイ状況をひとまとめ。</p>
 <label>メールアドレス<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="demo@gamelog.local"/></label>
 <label>パスワード<input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="password"/></label>
 <button className="add wide" onClick={onLogin}>ログイン</button>
 <small className="demo">デモ版：任意の入力でログインできます</small></div></div>
}

function Editor({game,close,save}){
 const [f,setF]=useState(game||{title:"",platform:"PC",genre:"RPG",status:"プレイ中",progress:0,memo:""});
 const set=(k,v)=>setF({...f,[k]:v});
 return <div className="overlay"><div className="modal"><div className="modalhead"><h2>{game?"ゲームを編集":"ゲームを追加"}</h2><button onClick={close}>×</button></div>
 <form onSubmit={e=>{e.preventDefault();if(f.title.trim())save({...f,progress:Number(f.progress)})}}>
 <label>ゲーム名<input value={f.title} onChange={e=>set("title",e.target.value)} required/></label>
 <div className="two"><label>プラットフォーム<select value={f.platform} onChange={e=>set("platform",e.target.value)}>{["PC","PS5","PS4","Switch","Xbox","スマホ"].map(x=><option key={x}>{x}</option>)}</select></label>
 <label>ジャンル<select value={f.genre} onChange={e=>set("genre",e.target.value)}>{["RPG","アクション","アドベンチャー","シミュレーション","FPS","その他"].map(x=><option key={x}>{x}</option>)}</select></label></div>
 <div className="two"><label>ステータス<select value={f.status} onChange={e=>set("status",e.target.value)}>{["プレイ中","クリア","積みゲー"].map(x=><option key={x}>{x}</option>)}</select></label>
 <label>進行度<input type="number" min="0" max="100" value={f.progress} onChange={e=>set("progress",e.target.value)}/></label></div>
 <label>攻略メモ<textarea value={f.memo} onChange={e=>set("memo",e.target.value)} placeholder="次にやること、攻略メモなど"/></label>
 <button className="add wide">{game?"変更を保存":"ゲームを登録"}</button></form></div></div>
}

function Detail({game,close,edit,remove}){
 return <div className="overlay"><div className="modal detail"><button className="x" onClick={close}>×</button><div className="detailcover"><small>{game.genre} / {game.platform}</small><h2>{game.title}</h2></div>
 <div className="detailbody"><div className="line"><span className="badge">{game.status}</span><b>{game.progress}%</b></div><div className="bar"><i style={{width:game.progress+"%"}}/></div>
 <h3>攻略メモ</h3><p className="memo">{game.memo||"メモはありません。"}</p><div className="actions"><button onClick={edit}>編集</button><button onClick={remove}>削除</button></div></div></div></div>
}
createRoot(document.getElementById("root")).render(<App/>);


function fmtDate(iso){
  const d = new Date(iso);
  return {y:d.getFullYear(), m:(d.getMonth()+1).toString().padStart(2,'0'), d:d.getDate().toString().padStart(2,'0')};
}
async function loadEvents(){
  const res = await fetch('data/events.json',{cache:'no-store'});
  const events = await res.json();
  const root = document.getElementById('events');
  events.forEach(e=>{
    const el = document.createElement('article');
    el.className='card';
    el.innerHTML = `
      <img src="${e.image}" alt="${e.title}" loading="lazy">
      <div class="body">
        <h3>${e.title}</h3>
        <div class="meta">${e.when}</div>
        <p>${e.notes}</p>
        ${e.link?`<p><a href="${e.link}" target="_blank" rel="noopener">查看公告</a></p>`:''}
      </div>`;
    root.appendChild(el);
  });
}
async function loadNews(){
  const res = await fetch('data/news.json',{cache:'no-store'});
  const list = await res.json();
  const root = document.getElementById('news');
  list.forEach(n=>{
    const {y,m,d} = fmtDate(n.date);
    const li = document.createElement('div');
    li.className='news-item';
    li.innerHTML = `
      <div class="news-date"><div class="d">${m}/${d}</div><div class="y">${y}</div></div>
      <div><div><strong>${n.title}</strong></div>${n.url?`<a href="${n.url}" target="_blank" rel="noopener">連結</a>`:''}</div>`;
    root.appendChild(li);
  });
}
async function loadIG(){
  try{
    const res = await fetch('data/insta.json',{cache:'no-store'});
    const urls = await res.json();
    const wrap = document.getElementById('ig-embeds');
    urls.slice(0,10).forEach(u=>{
      const div = document.createElement('div');
      div.innerHTML = `<blockquote class="instagram-media" data-instgrm-permalink="${u}" data-instgrm-version="14" style="background:#fff;"></blockquote>`;
      wrap.appendChild(div);
    });
    if(window.instgrm){ instgrm.Embeds.process(); }
  }catch(e){ console.error(e); }
}
document.addEventListener('DOMContentLoaded',()=>{ loadEvents(); loadNews(); loadIG(); });


async function loadEvents(){
  const res = await fetch('data/events.json',{cache:'no-store'});
  const events = await res.json();
  const list = document.getElementById('events');
  events.forEach(e=>{
    const el = document.createElement('article');
    el.className='card';
    el.innerHTML = `
      <img src="${e.image}" alt="${e.title}" loading="lazy">
      <h3>${e.title}</h3>
      <div class="meta">${e.when}</div>
      <p>${e.notes}</p>
      ${e.link?`<p><a target="_blank" rel="noopener" href="${e.link}">查看貼文</a></p>`:''}
    `;
    list.appendChild(el);
  });
}
document.addEventListener('DOMContentLoaded', loadEvents);

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
document.addEventListener('DOMContentLoaded', loadIG);

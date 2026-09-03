const K1NG={
  init(){
    this.nav();
    this.reveal();
    this.cursor();
    this.socials();
    this.parallax();
    this.clock();
    this.activePage();
  },
  nav(){
    const menu=document.querySelector('.menu');
    const nav=document.querySelector('.main-nav');
    if(!menu||!nav)return;
    menu.addEventListener('click',()=>{
      const open=menu.classList.toggle('open');
      nav.classList.toggle('open',open);
      menu.setAttribute('aria-expanded',String(open));
    });
    nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
      menu.classList.remove('open');
      nav.classList.remove('open');
      menu.setAttribute('aria-expanded','false');
    }));
  },
  reveal(){
    const items=document.querySelectorAll('.reveal');
    if(!items.length)return;
    if(!('IntersectionObserver' in window)){
      items.forEach(x=>x.classList.add('visible'));
      return;
    }
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:'0px 0px -35px'});
    items.forEach((item,index)=>{
      item.style.transitionDelay=`${Math.min(index*55,280)}ms`;
      observer.observe(item);
    });
  },
  cursor(){
    const glow=document.querySelector('.cursor-glow');
    if(!glow||window.matchMedia('(pointer:coarse)').matches)return;
    window.addEventListener('mousemove',e=>{
      glow.style.left=`${e.clientX}px`;
      glow.style.top=`${e.clientY}px`;
      glow.style.opacity='1';
    });
    window.addEventListener('mouseleave',()=>glow.style.opacity='0');
  },
  socials(){
    const toast=document.querySelector('.toast');
    const links=document.querySelectorAll('[data-social]');
    if(!toast||!links.length)return;
    const messages={
      discord:'Discord link ready — add your official invite in script.js.',
      youtube:'YouTube link ready — add your official channel URL.',
      tiktok:'TikTok link ready — add your official profile URL.',
      x:'X link ready — add your official profile URL.'
    };
    links.forEach(link=>link.addEventListener('click',e=>{
      if(link.getAttribute('href')==='#'){
        e.preventDefault();
        toast.textContent=messages[link.dataset.social]||'Social link ready.';
        toast.classList.add('show');
        clearTimeout(this.toastTimer);
        this.toastTimer=setTimeout(()=>toast.classList.remove('show'),3200);
      }
    }));
  },
  parallax(){
    const emblem=document.querySelector('.hero-emblem');
    if(!emblem||window.matchMedia('(pointer:coarse)').matches)return;
    window.addEventListener('mousemove',e=>{
      const x=(e.clientX/window.innerWidth-.5)*14;
      const y=(e.clientY/window.innerHeight-.5)*10;
      emblem.style.marginLeft=`${x}px`;
      emblem.style.marginTop=`${y}px`;
    },{passive:true});
  },
  clock(){
    const clock=document.querySelector('#clock');
    if(!clock)return;
    const tick=()=>clock.textContent=new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());
    tick();
    setInterval(tick,1000);
  },
  activePage(){
    const page=location.pathname.split('/').pop()||'index.html';
    document.querySelectorAll('.main-nav a').forEach(a=>{
      if(a.getAttribute('href')===page)a.classList.add('active');
    });
  }
};
document.addEventListener('DOMContentLoaded',()=>K1NG.init());

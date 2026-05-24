'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type Lang = 'bs' | 'en'

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))
const remap  = (v: number, a: number, b: number) => clamp((v - a) / (b - a))
const lerp   = (a: number, b: number, t: number) => a + (b - a) * t
const eOut   = (t: number) => 1 - Math.pow(1 - t, 3)
const eBack  = (t: number) => { const c = 1.70158; return 1 + (c+1)*Math.pow(t-1,3) + c*Math.pow(t-1,2) }

type C = CanvasRenderingContext2D

// ── Draw functions (unchanged) ────────────────────────────────────────────────
function bunTop(ctx:C,x:number,y:number,r:number,rot:number,a:number){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=a
  ctx.fillStyle='rgba(0,0,0,0.2)';ctx.beginPath()
  ctx.ellipse(2,r*.58+4,r*.95,r*.12,0,0,Math.PI*2);ctx.fill()
  const g=ctx.createRadialGradient(-r*.15,-r*.3,r*.04,0,0,r)
  g.addColorStop(0,'#F09030');g.addColorStop(.45,'#C8671A');g.addColorStop(1,'#7A3008')
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,r,r*.54,0,Math.PI,0);ctx.fill()
  ctx.fillStyle='#A84E0E';ctx.beginPath();ctx.ellipse(0,0,r,r*.16,0,0,Math.PI);ctx.fill()
  ;[[-0.32,-0.30],[-0.10,-0.40],[0.17,-0.32],[0.35,-0.20],[-0.02,-0.13],[-0.22,-0.11],[0.12,-0.07]].forEach(([sx,sy])=>{
    ctx.save();ctx.translate(sx!*r,sy!*r);ctx.rotate(sx!*1.4)
    ctx.fillStyle='rgba(245,239,224,.83)';ctx.beginPath()
    ctx.ellipse(0,0,r*.073,r*.038,0,0,Math.PI*2);ctx.fill();ctx.restore()
  })
  ctx.fillStyle='rgba(255,255,255,.055)';ctx.beginPath()
  ctx.ellipse(-r*.13,-r*.23,r*.33,r*.14,Math.PI*.25,0,Math.PI*2);ctx.fill()
  ctx.restore()
}
function lettuce(ctx:C,x:number,y:number,r:number,rot:number,a:number){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=a
  for(let i=-6;i<=6;i++){
    const lx=i*r*.17,h=r*.19+Math.sin(i*1.3)*r*.05
    const g=ctx.createLinearGradient(0,-h,0,h)
    g.addColorStop(0,'#88D848');g.addColorStop(1,'#38781A')
    ctx.fillStyle=g;ctx.beginPath()
    ctx.moveTo(lx-r*.09,-h*.3);ctx.quadraticCurveTo(lx,-h,lx+r*.09,-h*.3)
    ctx.quadraticCurveTo(lx+r*.18,h*.5,lx+r*.09,h)
    ctx.quadraticCurveTo(lx,h*.85,lx-r*.09,h)
    ctx.quadraticCurveTo(lx-r*.18,h*.5,lx-r*.09,-h*.3);ctx.fill()
  }
  ctx.restore()
}
function tomato(ctx:C,x:number,y:number,r:number,rot:number,a:number){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=a
  ;[-r*.25,r*.25].forEach(ox=>{
    const g=ctx.createRadialGradient(ox*.6,-r*.03,0,ox,0,r*.3)
    g.addColorStop(0,'#F24030');g.addColorStop(.55,'#CC1E10');g.addColorStop(1,'#7A0C06')
    ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(ox,0,r*.3,r*.11,0,0,Math.PI*2);ctx.fill()
  })
  ctx.restore()
}
function cheese(ctx:C,x:number,y:number,r:number,rot:number,a:number){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=a
  ctx.fillStyle='#C87808';ctx.save();ctx.rotate(.06);ctx.fillRect(-r*1.05,-r*.14,r*2.1,r*.32);ctx.restore()
  ctx.fillStyle='#F0A820';ctx.fillRect(-r*1.05,-r*.14,r*2.1,r*.23)
  ;[-.7,-.35,0,.35,.7].forEach(dx=>{
    const dh=r*(.16+Math.abs(dx)*.08)
    ctx.fillStyle='#F0A820';ctx.beginPath()
    ctx.moveTo(dx*r,r*.10);ctx.quadraticCurveTo(dx*r+r*.04,r*.10+dh*.55,dx*r,r*.10+dh)
    ctx.quadraticCurveTo(dx*r-r*.04,r*.10+dh*.55,dx*r,r*.10);ctx.fill()
  })
  ctx.fillStyle='rgba(255,220,90,.18)';ctx.fillRect(-r*1.05,-r*.14,r*2.1,r*.08)
  ctx.restore()
}
function patty(ctx:C,x:number,y:number,r:number,rot:number,a:number){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=a
  ctx.fillStyle='rgba(0,0,0,.28)';ctx.beginPath()
  ctx.ellipse(3,r*.20+3,r*.97,r*.14,0,0,Math.PI*2);ctx.fill()
  const g=ctx.createRadialGradient(-r*.2,0,0,0,0,r)
  g.addColorStop(0,'#703010');g.addColorStop(.5,'#3D1A08');g.addColorStop(1,'#180804')
  ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,r,r*.19,0,0,Math.PI*2);ctx.fill()
  ctx.strokeStyle='rgba(8,3,1,.6)';ctx.lineWidth=r*.044;ctx.lineCap='round'
  ;[-r*.38,-r*.14,r*.12,r*.38].forEach(gx=>{
    ctx.beginPath();ctx.moveTo(gx,-r*.10);ctx.lineTo(gx+r*.13,r*.10);ctx.stroke()
  })
  ctx.restore()
}
function bunBottom(ctx:C,x:number,y:number,r:number,rot:number,a:number){
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=a
  ctx.fillStyle='rgba(0,0,0,.22)';ctx.beginPath()
  ctx.ellipse(3,r*.30+3,r*.97,r*.10,0,0,Math.PI*2);ctx.fill()
  const g=ctx.createLinearGradient(0,-r*.22,0,r*.28)
  g.addColorStop(0,'#D4770A');g.addColorStop(.4,'#C8671A');g.addColorStop(1,'#7A3408')
  ctx.fillStyle=g;ctx.beginPath()
  ctx.moveTo(-r,r*.08);ctx.quadraticCurveTo(-r,-r*.22,0,-r*.22)
  ctx.quadraticCurveTo(r,-r*.22,r,r*.08)
  ctx.ellipse(0,r*.08,r,r*.17,0,0,Math.PI);ctx.fill()
  ctx.restore()
}

// Layer Y offsets (fraction of R, bottom=positive, top=negative)
// LY = Y offset of each layer centre from burger anchor point
// Calculated from actual canvas draw geometry (no gaps)
const LY: Record<string,number> = {
  'bun-top':    -0.42,
  lettuce:      -0.16,
  tomato:        0.06,
  cheese:        0.24,
  patty:         0.44,
  'bun-bottom':  0.72,
}


const T = {
  bs: {
    scrollHint:'Scrollaj prema dolje', tagline:'Smash burgeri · Sarajevo',
    viewMenu:'Pogledaj Meni', findUs:'Pronađi Nas', address:'Gajev trg 4 · Sarajevo 71000',
    ctaHeadline:'POGLEDAJ MENI', heroSub:'Handcrafted smash burgeri, svježe svaki dan. Centar Sarajeva.',
    heroTag:'pravi burgeri, bez kompromisa', whyTag:'zašto Frankies?', whyTitle:'Naš način rada',
    findTag:'pronađi nas', findTitle:'Dođi na burger', ratingText:'Ocijenjeni na Google-u',
    ratingQuote:'"Sarajevski omiljeni burger"', call:'Pozovi', directions:'Upute',
    openMap:'Otvori Mapu ↗', addImage:'Dodaj Google Maps embed ovdje', hours:'Svaki dan · 10:00 – 23:00',
    highlights:[
      {t:'Smash Burgeri',d:'Hrskavi odresci pritisnuti na ravnoj ploči.',i:'🔥'},
      {t:'Centar Sarajeva',d:'Gajev trg 4 — srce grada.',i:'📍'},
      {t:'Svježe svaki dan',d:'Bez zamrznutih sastojaka, ikad.',i:'🥩'},
      {t:'10:00 – 23:00',d:'Otvoreni svaki dan bez izuzetka.',i:'🕙'},
    ],
    contact:[
      {label:'Adresa',val:'Gajev trg 4, Sarajevo 71000',href:'https://maps.google.com/?q=Gajev+trg+4+Sarajevo'},
      {label:'Radno vrijeme',val:'Svaki dan · 10:00 – 23:00',href:undefined},
      {label:'Telefon',val:'061 725 544',href:'tel:061725544'},
      {label:'Instagram',val:'@sarajevofrankies',href:'https://instagram.com/sarajevofrankies'},
    ],
    cards:{
      'bun-bottom':{title:'INSTAGRAM',body:'@sarajevofrankies'},
      patty:{title:'GAJEV TRG 4',body:'Sarajevo 71000'},
      cheese:{title:'10:00 – 23:00',body:'Otvoreni svaki dan'},
      tomato:{title:'5.0 ★★★★★',body:'Google ocjena'},
      lettuce:{title:'061 725 544',body:'Pozovi nas'},
      'bun-top':{title:'FRANKIES',body:'Smash burgeri.\nSarajevo.'},
    },
    footer:'© 2026 Frankies · Gajev trg 4, Sarajevo 71000',
  },
  en: {
    scrollHint:'Scroll down', tagline:'Smash Burgers · Sarajevo',
    viewMenu:'View Menu', findUs:'Find Us', address:'Gajev trg 4 · Sarajevo 71000',
    ctaHeadline:'VIEW MENU', heroSub:'Handcrafted smash burgers made fresh every day. City centre Sarajevo.',
    heroTag:'real burgers, no compromises', whyTag:'why Frankies?', whyTitle:'Our Way',
    findTag:'find us', findTitle:'Come for a burger', ratingText:'Rated by our guests on Google',
    ratingQuote:'Sarajevo favourite burger spot', call:'Call', directions:'Directions',
    openMap:'Open Map ↗', addImage:'Add Google Maps embed here', hours:'Every day · 10:00 – 23:00',
    highlights:[
      {t:'Smash Burgers',d:'Crispy thin patties pressed on a flat-top griddle.',i:'🔥'},
      {t:'City Centre',d:'Gajev trg 4 — the heart of Sarajevo.',i:'📍'},
      {t:'Fresh Every Day',d:'No frozen shortcuts. Ever.',i:'🥩'},
      {t:'10:00 – 23:00',d:'Open every single day, no exceptions.',i:'🕙'},
    ],
    contact:[
      {label:'Address',val:'Gajev trg 4, Sarajevo 71000',href:'https://maps.google.com/?q=Gajev+trg+4+Sarajevo'},
      {label:'Opening hours',val:'Every day · 10:00 – 23:00',href:undefined},
      {label:'Phone',val:'061 725 544',href:'tel:061725544'},
      {label:'Instagram',val:'@sarajevofrankies',href:'https://instagram.com/sarajevofrankies'},
    ],
    cards:{
      'bun-bottom':{title:'INSTAGRAM',body:'@sarajevofrankies'},
      patty:{title:'GAJEV TRG 4',body:'Sarajevo 71000'},
      cheese:{title:'10:00 – 23:00',body:'Open every day'},
      tomato:{title:'5.0 ★★★★★',body:'Google rating'},
      lettuce:{title:'061 725 544',body:'Call us'},
      'bun-top':{title:'FRANKIES',body:'Smash burgers.\nSarajevo.'},
    },
    footer:'© 2026 Frankies · Gajev trg 4, Sarajevo 71000',
  },
} as const

type DrawFn = (ctx:C,x:number,y:number,r:number,rot:number,a:number)=>void

interface Layer {
  name:string; draw:DrawFn; color:string
  progStart:number; progEnd:number
  startX:(W:number,H:number)=>number
  startY:(W:number,H:number)=>number
  startRot:number
  side:'left'|'right'
  cardTitle:string; cardBody:string; cardHref?:string
}

const LAYERS:Layer[] = [
  // Assembly order: bottom → top, so burger builds upward naturally
  { name:'bun-bottom', draw:bunBottom, color:'#C8671A',
    progStart:.00, progEnd:.16,
    startX:(_W,_H)=>-300, startY:(_W,H)=>H*1.3, startRot:.55,
    side:'right', cardTitle:'INSTAGRAM', cardBody:'@sarajevofrankies',
    cardHref:'https://instagram.com/sarajevofrankies' },
  { name:'patty', draw:patty, color:'#8B4020',
    progStart:.12, progEnd:.27,
    startX:(W,H)=>W*1.1, startY:(_W,H)=>H*1.3, startRot:-.45,
    side:'left', cardTitle:'GAJEV TRG 4', cardBody:'Sarajevo 71000',
    cardHref:'https://maps.google.com/?q=Gajev+trg+4+Sarajevo' },
  { name:'cheese', draw:cheese, color:'#F0A820',
    progStart:.24, progEnd:.38,
    startX:(W)=>W*1.1, startY:()=>-200, startRot:-1.0,
    side:'right', cardTitle:'10:00 – 23:00', cardBody:'Otvoreni svaki dan' },
  { name:'tomato', draw:tomato, color:'#D63020',
    progStart:.36, progEnd:.50,
    startX:(_W)=>-300, startY:()=>-200, startRot:1.2,
    side:'left', cardTitle:'5.0 ★★★★★', cardBody:'Google ocjena',
    cardHref:'https://maps.google.com/?q=Frankies+Sarajevo' },
  { name:'lettuce', draw:lettuce, color:'#4A9E2A',
    progStart:.48, progEnd:.63,
    startX:(W)=>W*1.1, startY:(_W,H)=>H*1.2, startRot:.65,
    side:'right', cardTitle:'061 725 544', cardBody:'Pozovi nas',
    cardHref:'tel:061725544' },
  { name:'bun-top', draw:bunTop, color:'#C8671A',
    progStart:.62, progEnd:.78,
    startX:(_W)=>-300, startY:()=>-250, startRot:-.7,
    side:'left', cardTitle:'FRANKIES', cardBody:'Smash burgeri.\nSarajevo.' },
]

interface Spark{x:number;y:number;vx:number;vy:number;life:number;color:string;r:number}

export default function HomePage(){
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const rafRef     = useRef(0)
  const bobRef     = useRef(0)
  const sparks     = useRef<Spark[]>([])
  const landed     = useRef(new Set<string>())

  const [lang, setLang]     = useState<Lang>('bs')
  const [prog, setProg]     = useState(0)
  const t = T[lang]
  const [mounted,setMounted]= useState(false)
  const [vw, setVw]         = useState(0)
  const [vh, setVh]         = useState(0)

  useEffect(()=>{
    setMounted(true)
    const upd=()=>{ setVw(window.innerWidth); setVh(window.innerHeight) }
    upd(); window.addEventListener('resize',upd)
    return ()=>window.removeEventListener('resize',upd)
  },[])

  useEffect(()=>{
    const canvas=canvasRef.current, sec=sectionRef.current
    if(!canvas||!sec||!mounted)return
    const ctx=canvas.getContext('2d')!
    let cw=0,ch=0

    const resize=()=>{ if(!canvas)return; cw=canvas.width=window.innerWidth; ch=canvas.height=window.innerHeight }
    resize(); window.addEventListener('resize',resize)

    // All randomness inside useEffect — no SSR mismatch
    const dots=Array.from({length:55},()=>({
      x:Math.random()*1920, y:Math.random()*1080,
      vx:(Math.random()-.5)*.22, vy:(Math.random()-.5)*.18,
      r:.8+Math.random()*1.8,
      color:Math.random()<.55?'#C8241A':'#8B3808',
      alpha:.03+Math.random()*.07,
    }))

    const getP=()=>{
      if(!sec)return 0
      const sc=sec.offsetHeight-window.innerHeight
      return sc>0?clamp(-sec.getBoundingClientRect().top/sc):0
    }

    const spawn=(x:number,y:number,col:string)=>{
      for(let i=0;i<18;i++){
        const a=Math.random()*Math.PI*2,s=2+Math.random()*5
        sparks.current.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1.5,life:1,color:col,r:1.5+Math.random()*2})
      }
    }

    // Burger radius: scales with the smaller screen dimension
    // clamp so it's never too small (min 48px) or too big (max 120px)
    const getR=(cw:number,ch:number)=>Math.min(Math.max(Math.min(cw,ch)*.22,48),120)

    // Burger centre: top 55% of screen on mobile so cards fit below,
    // true centre on desktop
    const getBurgerY=(ch:number,cw:number)=>cw<600?ch*.44:ch*.5

    const frame=()=>{
      rafRef.current=requestAnimationFrame(frame)
      bobRef.current+=.018
      const p=getP(); setProg(p)
      const R=getR(cw,ch)
      const cx=cw/2, cy=getBurgerY(ch,cw)

      // background
      ctx.fillStyle='#0C0A08'; ctx.fillRect(0,0,cw,ch)
      const gr=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.min(cw,ch)*.85)
      gr.addColorStop(0,`rgba(80,16,4,${.10+p*.32})`)
      gr.addColorStop(.7,`rgba(30,6,2,${.03+p*.10})`)
      gr.addColorStop(1,'rgba(0,0,0,0)')
      ctx.fillStyle=gr; ctx.fillRect(0,0,cw,ch)
      // grid
      ctx.strokeStyle='rgba(200,36,26,.022)'; ctx.lineWidth=1
      for(let x=0;x<cw;x+=64){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,ch);ctx.stroke()}
      for(let y=0;y<ch;y+=64){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(cw,y);ctx.stroke()}
      // dots
      dots.forEach(d=>{
        d.x+=d.vx; d.y+=d.vy
        if(d.x<0)d.x=cw;if(d.x>cw)d.x=0;if(d.y<0)d.y=ch;if(d.y>ch)d.y=0
        ctx.globalAlpha=d.alpha; ctx.fillStyle=d.color
        ctx.beginPath(); ctx.arc(d.x%cw,d.y%ch,d.r,0,Math.PI*2); ctx.fill()
      })
      ctx.globalAlpha=1
      // progress bar
      if(p>0){
        const bar=ctx.createLinearGradient(0,0,cw*p,0)
        bar.addColorStop(0,'#C8241A'); bar.addColorStop(1,'#F0A820')
        ctx.fillStyle=bar; ctx.fillRect(0,0,cw*p,3)
      }
      // layers
      LAYERS.forEach((l,i)=>{
        const tp=remap(p,l.progStart,l.progEnd)
        const te=eBack(clamp(tp)), to=eOut(clamp(tp))
        const sx=l.startX(cw,ch), sy=l.startY(cw,ch)
        const ex=cx, ey=cy+LY[l.name]*R
        const x=lerp(sx,ex,te), y=lerp(sy,ey,to)
        const rot=lerp(l.startRot,0,to), al=clamp(tp*5)
        const bob=tp>=1?Math.sin(bobRef.current+i*1.1)*2.5:0
        l.draw(ctx,x,y+bob,R,rot,al)
        if(tp>=1&&!landed.current.has(l.name)){ landed.current.add(l.name); spawn(ex,ey,l.color) }
        if(tp<.9) landed.current.delete(l.name)
      })
      // sparks
      sparks.current=sparks.current.filter(s=>s.life>0)
      sparks.current.forEach(s=>{
        s.x+=s.vx; s.y+=s.vy; s.vy+=.15; s.life-=.038
        ctx.globalAlpha=s.life*.85; ctx.fillStyle=s.color
        ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,Math.PI*2); ctx.fill()
      })
      ctx.globalAlpha=1
    }
    frame()
    return ()=>{ cancelAnimationFrame(rafRef.current); window.removeEventListener('resize',resize) }
  },[mounted])

  // ── DOM overlay calculations ──────────────────────────────────────────────
  const R          = Math.min(Math.max(Math.min(vw,vh)*.24,55),130)
  const cx         = vw/2
  // burger sits at 44% height on narrow screens, 50% on wide
  const burgerCY   = vh * 0.35
  const isMobile   = vw<768
  const isNarrow   = vw<480
  const cardFade   = clamp(1-(prog-.76)/.07)
  const finalFade  = clamp((prog-.80)/.08)
  const hintFade   = clamp(1-prog*12)

  if(!mounted) return <div style={{height:'500vh',background:'#0C0A08'}}/>

  return(
    <>
      <div ref={sectionRef} style={{height:'500vh',position:'relative'}}>
        <div style={{position:'sticky',top:0,width:'100%',height:'100vh',overflow:'hidden'}}>
          <canvas ref={canvasRef} style={{position:'absolute',inset:0,zIndex:0}}/>

          
          {/* Navbar */}
          <nav style={{
            position:'absolute',top:0,left:0,right:0,zIndex:40,
            display:'flex',alignItems:'center',justifyContent:'space-between',
            padding:'clamp(.75rem,2vh,1.2rem) clamp(1rem,4vw,1.5rem)',
          }}>
            <div style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
              <Image
                src="/images/logo.jpg"
                alt="Frankies logo"
                width={48}
                height={48}
                style={{borderRadius:'50%',objectFit:'cover'}}
              />
              <span style={{
                fontFamily:'var(--font-d)',
                fontSize:'clamp(1.1rem,4vw,1.4rem)',
                color:'var(--cream)',
              }}>
                FRANK<span style={{color:'var(--red)'}}>IES</span>
              </span>
            </div>
            <div style={{display:'flex',gap:'.6rem',alignItems:'center'}}>
              {/*<button onClick={()=>setLang(lang==='bs'?'en':'bs')} style={{
                fontFamily:'var(--font-b)',fontWeight:800,
                fontSize:'clamp(.72rem,2.5vw,.85rem)',
                letterSpacing:'.1em',textTransform:'uppercase',
                color:'rgba(245,239,224,.6)',
                background:'transparent',
                border:'1px solid rgba(245,239,224,.15)',
                padding:'clamp(.28rem,1vw,.38rem) clamp(.55rem,2vw,.8rem)',
                cursor:'pointer',transition:'all .2s',
              }}
              onMouseEnter={e=>{const el=e.currentTarget;el.style.color='var(--mustard)';el.style.borderColor='var(--mustard)';}}
              onMouseLeave={e=>{const el=e.currentTarget;el.style.color='rgba(245,239,224,.6)';el.style.borderColor='rgba(245,239,224,.15)';}}
              >
                {lang==='bs'?'EN':'BS'}
              </button>*/}
              <Link href="/menu" style={{
                fontFamily:'var(--font-b)',fontWeight:800,
                fontSize:'clamp(.78rem,3vw,.95rem)',
                letterSpacing:'.1em',textTransform:'uppercase',
                color:'var(--cream)',
                border:'1px solid rgba(245,239,224,.2)',
                padding:'clamp(.3rem,1.5vw,.45rem) clamp(.7rem,2.5vw,1rem)',
              }}>
                {lang==='bs'?'Meni':'Menu'}
              </Link>
            </div>
          </nav>

          {/* Scroll hint — full screen, impossible to miss */}
          {hintFade>0 && (
            <div style={{
              position:'absolute',inset:0,
              zIndex:10,
              display:'flex',flexDirection:'column',
              alignItems:'center',justifyContent:'center',
              opacity:hintFade,
              pointerEvents:'none',
              background:'transparent',
            }}>
              {/* Big animated title */}
              <h1 style={{
                fontFamily:'var(--font-d)',
                fontSize:'clamp(3rem,14vw,9rem)',
                color:'var(--cream)',
                lineHeight:.95,textAlign:'center',
                marginBottom:'clamp(.5rem,2vw,1rem)',
              }}>
                FRANK<span style={{color:'var(--red)'}}>IES</span>
              </h1>
              <p style={{
                fontFamily:'var(--font-a)',
                fontSize:'clamp(1rem,4vw,2rem)',
                color:'var(--mustard)',
                marginBottom:'clamp(2rem,6vh,4rem)',
                textAlign:'center',
              }}>
                {t.tagline}
              </p>

              {/* BIG scroll cue */}
              <div style={{
                display:'flex',flexDirection:'column',alignItems:'center',gap:'clamp(.6rem,2vw,1rem)',
              }}>
                <p style={{
                  fontFamily:'var(--font-b)',fontWeight:800,
                  fontSize:'clamp(1rem,4vw,1.4rem)',
                  letterSpacing:'.25em',textTransform:'uppercase',
                  color:'rgba(245,239,224,.5)',
                }}>
                  {t.scrollHint}
                </p>
                {/* Big animated arrows */}
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'4px',
                  animation:'bounceY 1.5s ease-in-out infinite'}}>
                  <svg width="clamp(28px,6vw,44px)" height="clamp(28px,6vw,44px)" viewBox="0 0 24 24" fill="none"
                    stroke="var(--red)" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <svg width="clamp(28px,6vw,44px)" height="clamp(28px,6vw,44px)" viewBox="0 0 24 24" fill="none"
                    stroke="rgba(200,36,26,.4)" strokeWidth="2.5">
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Info cards */}
          {LAYERS.map(l=>{
            const tp     = remap(prog,l.progStart,l.progEnd)
            const cardIn = clamp((tp-.82)/.18)
            const alpha  = cardIn*cardFade
            if(alpha<.01) return null

            // Burger layer Y position
            const ey = burgerCY + LY[l.name]*R
            const isLeft = l.side==='left'

            // ── Responsive card positioning ──────────────────────────────
            // DESKTOP (≥768px): cards float beside the burger horizontally
            // MOBILE  (<768px): cards appear at top corners, stacked by layer
            let style: React.CSSProperties

            if(!isMobile){
              // Desktop: position beside burger, vertically aligned to layer
              style = {
                position:'absolute',
                top: Math.max(60, ey-30),   // never overlap navbar
                ...(isLeft
                  ? {right: vw - cx + R*1.1}
                  : {left:  cx + R*1.1}),
                maxWidth:'200px',
              }
            } else {
              // Mobile: spread cards across top area (above burger)
              // Map layer index to a top % — 6 layers, each ~7% apart
              const layerOrder = ['bun-bottom','patty','cheese','tomato','lettuce','bun-top']
              const idx = layerOrder.indexOf(l.name)
              const topPct = 10 + idx * 5   // 10%, 15%, 20%, 25%, 30%, 35%
              style = {
                position:'absolute',
                top:`${topPct}%`,
                ...(isLeft
                  ? {left:'clamp(8px,2vw,12px)'}
                  : {right:'clamp(8px,2vw,12px)'}),
                maxWidth: isNarrow ? '44vw' : '42vw',
              }
            }

            const inner=(
              <div style={{
                padding: isMobile
                  ? 'clamp(.4rem,1.5vw,.65rem) clamp(.5rem,2vw,.85rem)'
                  : '.8rem 1.1rem',
                background:'rgba(10,8,6,.92)',
                borderLeft:  isLeft?`3px solid ${l.color}`:`1px solid ${l.color}44`,
                borderRight: !isLeft?`3px solid ${l.color}`:`1px solid ${l.color}44`,
                borderTop:   `1px solid ${l.color}33`,
                borderBottom:`1px solid ${l.color}33`,
                backdropFilter:'blur(12px)',
              }}>
                <div style={{
                  fontFamily:'var(--font-d)',
                  // Fluid: 3.5vw floors at 13px, caps at 18px
                  fontSize:'clamp(13px,3.5vw,18px)',
                  color:l.color,lineHeight:1.1,
                  marginBottom:'clamp(2px,.5vw,4px)',
                }}>
                  {(t.cards as Record<string,{title:string;body:string}>)[l.name]?.title ?? l.cardTitle}
                </div>
                <div style={{
                  fontFamily:'var(--font-b)',fontWeight:600,
                  fontSize:'clamp(11px,2.8vw,14px)',
                  color:'rgba(245,239,224,.5)',
                  lineHeight:1.5,whiteSpace:'pre-line',
                  letterSpacing:'.04em',
                }}>
                  {(t.cards as Record<string,{title:string;body:string}>)[l.name]?.body ?? l.cardBody}
                </div>
              </div>
            )

            return(
              <div key={l.name} style={{
                ...style,
                opacity:alpha,
                transform:`translateX(${(1-cardIn)*(isLeft?-10:10)}px)`,
                zIndex:20,
                pointerEvents:alpha>.5?'auto':'none',
                transition:'none',
              }}>
                {l.cardHref
                  ? <a href={l.cardHref}
                      target={l.cardHref.startsWith('http')?'_blank':'_self'}
                      rel="noopener noreferrer">{inner}</a>
                  : inner}
              </div>
            )
          })}

          {/* Final CTA */}
          {finalFade>0 && (
            <div style={{
              position:'absolute',bottom:0,left:0,right:0,zIndex:30,
              display:'flex',flexDirection:'column',alignItems:'center',
              gap:'clamp(.4rem,1.5vw,.7rem)',
              padding:`clamp(1rem,3vw,1.5rem) 1rem clamp(2.5rem,6vw,5rem)`,
              opacity:finalFade,
              transform:`translateY(${(1-finalFade)*16}px)`,
              background:`linear-gradient(to top,rgba(12,10,8,${finalFade*.97}),transparent)`,
              pointerEvents:finalFade>.5?'auto':'none',
            }}>
              <div style={{
                fontFamily:'var(--font-a)',
                fontSize:'clamp(.85rem,3vw,1.15rem)',
                color:'var(--mustard)',
              }}>
                {t.address}
              </div>
              <h2 style={{
                fontSize:'clamp(2.4rem,9vw,5.5rem)',
                textAlign:'center',lineHeight:.95,
              }}>
                <span style={{color:'var(--cream)'}}>{t.ctaHeadline.split(' ')[0]} </span><span style={{color:'var(--red)'}}>{t.ctaHeadline.split(' ')[1]}</span>
              </h2>
              <div style={{
                display:'flex',gap:'clamp(.5rem,2vw,.9rem)',
                flexWrap:'wrap',justifyContent:'center',
                marginTop:'clamp(.3rem,1.5vw,.6rem)',
              }}>
                <Link href="/menu" className="btn-p"
                  style={{fontSize:'clamp(.8rem,3vw,.95rem)',padding:'clamp(.7rem,2.5vw,.9rem) clamp(1.2rem,4vw,1.8rem)'}}>
                  {t.viewMenu}
                </Link>
                <a href="https://maps.google.com/?q=Gajev+trg+4+Sarajevo"
                  target="_blank" rel="noopener noreferrer" className="btn-o"
                  style={{fontSize:'clamp(.8rem,3vw,.95rem)',padding:'clamp(.7rem,2.5vw,.9rem) clamp(1.2rem,4vw,1.8rem)'}}>
                  {t.findUs}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── LANDING PAGE below scroll section ─────────────────────────── */}

      {/* Hero */}
      <section style={{
        background:'var(--char2)',borderTop:'1px solid var(--border)',
        padding:'clamp(4rem,10vh,8rem) clamp(1rem,5vw,2rem)',
        position:'relative',overflow:'hidden',
      }}>
        <div style={{
          position:'absolute',right:'-1rem',top:'50%',transform:'translateY(-50%)',
          fontFamily:'var(--font-d)',fontSize:'clamp(8rem,22vw,20rem)',
          color:'rgba(200,36,26,.035)',lineHeight:1,userSelect:'none',pointerEvents:'none',
        }}>F</div>
        <div style={{maxWidth:'1100px',margin:'0 auto',position:'relative',zIndex:2}}>
          <span style={{fontFamily:'var(--font-a)',color:'var(--red)',
            fontSize:'clamp(.95rem,3.5vw,1.4rem)',display:'block',marginBottom:'.6rem'}}>
            {t.heroTag}
          </span>
          <h2 style={{fontSize:'clamp(2.8rem,10vw,7rem)',marginBottom:'clamp(.75rem,2vw,1rem)',lineHeight:.95}}>
            REAL<br/><span style={{color:'var(--red)'}}>BURGERS.</span>
          </h2>
          <p style={{
            fontFamily:'var(--font-b)',fontWeight:600,
            fontSize:'clamp(.95rem,3vw,1.2rem)',
            color:'rgba(245,239,224,.55)',
            maxWidth:'480px',lineHeight:1.7,
            marginBottom:'clamp(1.5rem,4vw,2rem)',
          }}>
            {t.heroSub}
          </p>
          <div style={{display:'flex',gap:'clamp(.6rem,2vw,1rem)',flexWrap:'wrap'}}>
            <Link href="/menu" className="btn-p"
              style={{fontSize:'clamp(.82rem,3vw,.95rem)'}}>
              {t.viewMenu}
            </Link>
            <a href="https://maps.google.com/?q=Gajev+trg+4+Sarajevo"
              target="_blank" rel="noopener noreferrer" className="btn-o"
              style={{fontSize:'clamp(.82rem,3vw,.95rem)'}}>
              {t.findUs}
            </a>
          </div>
        </div>
      </section>

      {/* Rating ticker */}
      <div style={{background:'var(--red)',padding:'clamp(1rem,3vw,1.5rem)',overflow:'hidden'}}>
        <div style={{
          display:'flex',alignItems:'center',justifyContent:'center',
          flexWrap:'wrap',gap:'clamp(.8rem,3vw,1.5rem)',maxWidth:'900px',margin:'0 auto',
          textAlign:'center',
        }}>
          <div style={{display:'flex',gap:'3px'}}>
            {'★★★★★'.split('').map((s,i)=>(
              <span key={i} style={{color:'var(--mustard)',fontSize:'clamp(1.1rem,4vw,1.4rem)'}}>{s}</span>
            ))}
          </div>
          <div>
            <span style={{fontFamily:'var(--font-d)',fontSize:'clamp(1.4rem,5vw,2rem)',color:'var(--cream)'}}>5.0</span>
            <span style={{
              fontFamily:'var(--font-b)',fontWeight:700,
              fontSize:'clamp(.75rem,2.5vw,.9rem)',
              color:'rgba(245,239,224,.8)',letterSpacing:'.05em',marginLeft:'.5rem',
            }}>
              {t.ratingText}
            </span>
          </div>
          <div style={{fontFamily:'var(--font-a)',fontSize:'clamp(.85rem,3vw,1rem)',
            color:'rgba(245,239,224,.7)',fontStyle:'italic'}}>
            {t.ratingQuote}
          </div>
        </div>
      </div>

      {/* Photo placeholder strip */}
      <section style={{
        background:'var(--char)',
        padding:'0',
        overflow:'hidden',
        borderTop:'1px solid var(--border)',
      }}>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,340px),1fr))',
          gap:'2px',
        }}>
          {/* ── REPLACE THESE with real photos ──────────────────────────── */}
          {/* Recommended: interior shot, burger close-up, team/kitchen     */}
          {[
            {label:'Interijer', hint:'Dodaj sliku interijera (1200×800px)'},
            {label:'Burger', hint:'Dodaj close-up burgera (1200×800px)'},
            {label:'Atmosfera', hint:'Dodaj atmosfersku sliku (1200×800px)'},
          ].map((ph,i)=>(
            <div key={i} style={{
              minHeight:'clamp(200px,50vw,320px)',aspectRatio:'16/9',
              background:`linear-gradient(135deg,#1A1208,#2A1A0A)`,
              display:'flex',flexDirection:'column',
              alignItems:'center',justifyContent:'center',
              gap:'.5rem',
              position:'relative',
              overflow:'hidden',
            }}>
              {/* Uncomment when you have real images:
              <Image src={"/images/gallery/0" + (i+1) + ".jpg"}
                alt={ph.label} fill style={{objectFit:'cover'}} /> */}
              <div style={{
                width:'40px',height:'40px',
                border:'1px solid rgba(200,36,26,.3)',
                display:'flex',alignItems:'center',justifyContent:'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="rgba(200,36,26,.5)" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
              <span style={{
                fontFamily:'var(--font-b)',fontWeight:700,
                fontSize:'clamp(.6rem,1.8vw,.75rem)',
                letterSpacing:'.1em',textTransform:'uppercase',
                color:'rgba(245,239,224,.2)',textAlign:'center',
                padding:'0 .5rem',
              }}>
                {ph.hint}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section style={{
        background:'var(--char)',
        padding:'clamp(3.5rem,8vh,6rem) clamp(1rem,5vw,2rem)',
      }}>
        <div style={{maxWidth:'1100px',margin:'0 auto'}}>
          <span style={{fontFamily:'var(--font-a)',color:'var(--red)',
            fontSize:'clamp(.95rem,3.5vw,1.1rem)',display:'block',marginBottom:'.5rem'}}>
            {t.whyTag}
          </span>
          <h2 style={{fontSize:'clamp(1.8rem,6vw,3rem)',marginBottom:'clamp(1.5rem,4vh,2.5rem)'}}>
            {t.whyTitle}
          </h2>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,220px),1fr))',
            gap:'1px',background:'var(--border)',border:'1px solid var(--border)',
          }}>
            {t.highlights.map((c,i)=>(
              <div key={i} style={{
                padding:'clamp(1.4rem,4vw,2rem) clamp(1.2rem,3.5vw,1.75rem)',
                background:'var(--char2)',transition:'background .2s',cursor:'default',
              }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='var(--char3)'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='var(--char2)'}
              >
                <div style={{fontSize:'clamp(1.4rem,5vw,1.8rem)',marginBottom:'.9rem'}}>{c.i}</div>
                <h3 style={{fontFamily:'var(--font-d)',fontSize:'clamp(1rem,4vw,1.2rem)',marginBottom:'.4rem'}}>{c.t}</h3>
                <p style={{fontFamily:'var(--font-b)',fontWeight:600,
                  fontSize:'clamp(.82rem,2.8vw,.9rem)',
                  color:'rgba(245,239,224,.5)',lineHeight:1.7}}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={{
        background:'var(--char2)',borderTop:'1px solid var(--border)',
        padding:'clamp(3.5rem,8vh,6rem) clamp(1rem,5vw,2rem)',
      }}>
        <div style={{
          maxWidth:'1100px',margin:'0 auto',
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,280px),1fr))',
          gap:'clamp(2rem,6vw,3rem)',alignItems:'center',
        }}>
          <div>
            <span style={{fontFamily:'var(--font-a)',color:'var(--red)',
              fontSize:'clamp(.95rem,3.5vw,1.1rem)',display:'block',marginBottom:'.5rem'}}>
              pronađi nas
            </span>
            <h2 style={{fontSize:'clamp(1.8rem,6vw,3rem)',marginBottom:'clamp(1.2rem,3vh,1.5rem)'}}>
              Dođi na burger
            </h2>
            {t.contact.map((row,i)=>(
              <div key={i} style={{display:'flex',gap:'clamp(.6rem,2vw,1rem)',
                marginBottom:'clamp(.85rem,2.5vw,1.1rem)',alignItems:'flex-start'}}>
                <div style={{
                  minWidth:'7px',height:'7px',borderRadius:'50%',
                  background:'var(--red)',marginTop:'7px',flexShrink:0,
                }}/>
                <div>
                  <div style={{fontFamily:'var(--font-b)',fontWeight:700,
                    fontSize:'clamp(.62rem,2vw,.7rem)',
                    letterSpacing:'.12em',textTransform:'uppercase',
                    color:'rgba(245,239,224,.3)',marginBottom:'2px'}}>
                    {row.label}
                  </div>
                  {row.href
                    ? <a href={row.href}
                        target={row.href.startsWith('http')?'_blank':'_self'}
                        rel="noopener noreferrer"
                        style={{fontFamily:'var(--font-b)',fontWeight:600,
                          fontSize:'clamp(.9rem,3vw,1rem)',color:'var(--cream)'}}>
                        {row.val}
                      </a>
                    : <span style={{fontFamily:'var(--font-b)',fontWeight:600,
                        fontSize:'clamp(.9rem,3vw,1rem)',color:'var(--cream)'}}>
                        {row.val}
                      </span>
                  }
                </div>
              </div>
            ))}
            <div style={{display:'flex',gap:'clamp(.5rem,2vw,.8rem)',
              marginTop:'clamp(1.5rem,4vw,2rem)',flexWrap:'wrap'}}>
              <a href="https://maps.google.com/?q=Gajev+trg+4+Sarajevo"
                target="_blank" rel="noopener noreferrer" className="btn-p"
                style={{fontSize:'clamp(.8rem,3vw,.95rem)'}}>
                {t.directions}
              </a>
              <a href="tel:061725544" className="btn-o"
                style={{fontSize:'clamp(.8rem,3vw,.95rem)'}}>
                Pozovi
              </a>
            </div>
          </div>

          {/* Map */}
          <div style={{
            height:'clamp(220px,35vw,320px)',
            position:'relative',
            overflow:'hidden',
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2828.1484209157043!2d18.42359!3d43.8590409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c9d15a1a5891%3A0x797467397e5e0369!2sFrankie&#39;s%20street%20food%20Sarajevo!5e1!3m2!1sen!2sba!4v1779570612487!5m2!1sen!2sba"
              width="100%"
              height="100%"
              style={{border:0,display:'block'}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer style={{
        background:'var(--char)',borderTop:'1px solid var(--border)',
        padding:'clamp(1.5rem,4vw,2rem) 1rem clamp(4rem,8vh,5rem)',
        textAlign:'center',
      }}>
        <div style={{fontFamily:'var(--font-d)',fontSize:'clamp(1.2rem,4vw,1.5rem)',
          color:'var(--cream)',marginBottom:'.4rem'}}>
          FRANK<span style={{color:'var(--red)'}}>IES</span>
        </div>
        <div style={{fontFamily:'var(--font-b)',fontWeight:600,
          fontSize:'clamp(.7rem,2.5vw,.8rem)',
          color:'rgba(245,239,224,.25)',letterSpacing:'.06em'}}>
          {t.footer}
        </div>
      </footer>

      {/* Mobile sticky bar */}
      <div style={{
        position:'fixed',bottom:0,left:0,right:0,zIndex:100,
        display:'flex',
      }} className="mobile-bar">
        <a href="tel:061725544" style={{
          flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'.4rem',
          padding:'clamp(.75rem,2.5vh,1rem)',
          background:'var(--char2)',borderTop:'1px solid var(--border)',
          fontFamily:'var(--font-b)',fontWeight:700,
          fontSize:'clamp(.75rem,3vw,.88rem)',
          letterSpacing:'.08em',textTransform:'uppercase',color:'var(--cream)',
        }}>📞 {t.call}</a>
        <Link href="/menu" style={{
          flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'.4rem',
          padding:'clamp(.75rem,2.5vh,1rem)',
          background:'var(--red)',
          fontFamily:'var(--font-b)',fontWeight:800,
          fontSize:'clamp(.75rem,3vw,.88rem)',
          letterSpacing:'.08em',textTransform:'uppercase',color:'var(--cream)',
        }}>🍔 {lang==='bs'?'Meni':'Menu'}</Link>
      </div>

      <style>{`
        @media(min-width:768px){.mobile-bar{display:none!important}}
        @keyframes bounceY{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
      `}</style>
    </>
  )
}

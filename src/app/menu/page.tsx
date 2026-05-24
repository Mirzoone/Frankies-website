'use client'

import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import { menuItems, categories, type Category } from '@/data/menu'

const CAT_LABELS: Record<string,string> = {
  burgers:'Burgeri', 'ostala-jela':'Ostala jela', fries:'Pomfrit', sos:'Sos',drinks:'Piće',
}

export default function MenuPage(){
  const [active,setActive]=useState<Category>('burgers')
  const filtered=menuItems.filter(i=>i.category===active)

  return(
    <>
      <nav style={{
        position:'sticky',top:0,zIndex:50,
        background:'rgba(12,10,8,.97)',
        borderBottom:'1px solid rgba(245,239,224,.07)',
        backdropFilter:'blur(12px)',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'clamp(.75rem,2.5vh,1rem) clamp(1rem,4vw,1.5rem)',
      }}>
        <Link href="/" style={{display:'flex',alignItems:'center',gap:'.6rem'}}>
        <Image
          src="/images/logo.jpg"
          alt="Frankies logo"
          width={48}
          height={48}
          style={{borderRadius:'50%',objectFit:'cover'}}
        />
        <span style={{fontFamily:'var(--font-d)',fontSize:'clamp(1.1rem,4vw,1.3rem)',color:'var(--cream)'}}>
          FRANK<span style={{color:'var(--red)'}}>IES</span>
        </span>
        </Link>
        <Link href="/" style={{fontFamily:'var(--font-b)',fontWeight:700,fontSize:'clamp(.75rem,2.8vw,.88rem)',letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(245,239,224,.45)'}}>
          ← Nazad
        </Link>
      </nav>

      <section style={{background:'var(--char2)',padding:'clamp(2rem,5vh,3.5rem) clamp(1rem,4vw,1.5rem) 0',borderBottom:'1px solid rgba(245,239,224,.07)',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',right:'-1rem',bottom:'-1rem',fontFamily:'var(--font-menu)',fontWeight:800,fontSize:'clamp(8rem,20vw,16rem)',color:'rgba(200,36,26,.035)',lineHeight:1,userSelect:'none',pointerEvents:'none'}}>M</div>
        <div style={{maxWidth:'1100px',margin:'0 auto',position:'relative',zIndex:2}}>
          <span style={{fontFamily:'var(--font-a)',color:'var(--red)',fontSize:'clamp(.95rem,3.5vw,1.1rem)',display:'block',marginBottom:'.4rem'}}>sve što pravimo</span>
          <h1 style={{fontSize:'clamp(2.5rem,9vw,5rem)',marginBottom:'clamp(1.5rem,3vh,2rem)'}}>Naš Meni</h1>
        </div>
        <div style={{maxWidth:'1100px',margin:'0 auto',display:'flex',gap:0,overflowX:'auto',scrollbarWidth:'none'}}>
          {categories.map(cat=>(
            <button key={cat} onClick={()=>setActive(cat)} style={{background:'transparent',border:'none',borderBottom:active===cat?'2px solid var(--red)':'2px solid transparent',padding:'clamp(.75rem,2.5vw,.95rem) clamp(.85rem,3vw,1.25rem)',cursor:'pointer',fontFamily:'var(--font-b)',fontWeight:active===cat?800:600,fontSize:'clamp(.85rem,3.2vw,1rem)',letterSpacing:'.08em',textTransform:'uppercase',color:active===cat?'var(--cream)':'rgba(245,239,224,.4)',transition:'all .2s',whiteSpace:'nowrap'}}>
              {CAT_LABELS[cat]}
            </button>
          ))}
        </div>
      </section>

      <section style={{background:'var(--char)',minHeight:'60vh',padding:'clamp(1.5rem,4vw,2.5rem) clamp(1rem,4vw,1.5rem) clamp(5rem,10vh,7rem)'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,260px),1fr))',gap:'clamp(.85rem,2.5vw,1.25rem)'}}>
          {filtered.map((item,idx)=>(
            <article key={item.id} style={{background:'var(--char2)',border:'1px solid rgba(245,239,224,.07)',overflow:'hidden',transition:'all .25s',animation:`fadeUp .4s ease ${idx*.06}s both`}}
              onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='rgba(200,36,26,.4)';el.style.transform='translateY(-3px)';el.style.boxShadow='0 10px 28px rgba(0,0,0,.4)'}}
              onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='rgba(245,239,224,.07)';el.style.transform='translateY(0)';el.style.boxShadow='none'}}
            >
             {/* ── Image slot — samo za burgere, ostala jela i dodaci ── */}
            {(item.category === 'burgers' || item.category === 'ostala-jela' || item.category === 'fries') && (
            <div style={{position:'relative',height:'clamp(150px,38vw,190px)',background:'linear-gradient(135deg,var(--char3),var(--brown))',overflow:'hidden'}}>
                {/* SLIKE: stavi u /public/images/menu/<item.id>.jpg */}
                {/* Primjer: classic-single → /public/images/menu/classic-single.jpg */}
                {item.id === 'classic-single' && (
                  <Image
                    src="/images/menu/singleClassic.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'classic-double' && (
                  <Image
                    src="/images/menu/doubleClassic.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'classic-triple' && (
                  <Image
                    src="/images/menu/tripleClassic.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'single-oklahoma' && (
                  <Image
                    src="/images/menu/singleOklahoma.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'double-oklahoma' && (
                  <Image
                    src="/images/menu/doubleOklahoma.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'triple-oklahoma' && (
                  <Image
                    src="/images/menu/tripleOklahoma.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'single-jalapeno' && (
                  <Image
                    src="/images/menu/jalapenoSingle.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'double-jalapeno' && (
                  <Image
                    src="/images/menu/jalapenoDouble.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'triple-jalapeno' && (
                  <Image
                    src="/images/menu/jalapenoTriple.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'chicken-sandwich' && (
                  <Image
                    src="/images/menu/chickenSandwich.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )} 
                {item.id === 'macand-cheese' && (
                  <Image
                    src="/images/menu/macandcheese.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'tacos' && (
                  <Image
                    src="/images/menu/tacos.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'dirty-nachos' && (
                  <Image
                    src="/images/menu/dirtynachos.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'loaded-nachos' && (
                  <Image
                    src="/images/menu/loadednachos.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'egg-rolls' && (
                  <Image
                    src="/images/menu/eggrolls.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'chicken-wings' && (
                  <Image
                    src="/images/menu/chickenwings.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'dried-fries' && (
                  <Image
                    src="/images/menu/driedFries.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'loaded-fries' && (
                  <Image
                    src="/images/menu/loadedFries.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                {item.id === 'dirty-fries' && (
                  <Image
                    src="/images/menu/dirtyFries.jpg"
                    alt={item.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    style={{objectFit:'cover'}}
                  />
                )}
                
                {/* Placeholder za sve ostale burgere dok nemas slike */}
                <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'.4rem',zIndex:-1}}>
                  <span style={{fontSize:'clamp(2rem,8vw,2.5rem)'}}>🍔</span>
                  <span style={{fontFamily:'var(--font-b)',fontWeight:700,fontSize:'clamp(.58rem,1.8vw,.65rem)',letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(245,239,224,.2)'}}>Dodaj sliku</span>
                </div>
              </div>
)}
              <div style={{padding:'clamp(.85rem,3vw,1.2rem)'}}>
                {item.tags&&(
                  <div style={{display:'flex',gap:'.3rem',marginBottom:'.55rem',flexWrap:'wrap'}}>
                    {item.tags.map(t=>(
                      <span key={t} className={t==='bestseller'?'tag-bs':t==='spicy'?'tag-sp':'tag-nw'} style={{fontSize:'clamp(.58rem,2vw,.65rem)'}}>
                        {t==='bestseller'?'Bestseller':t==='spicy'?'Ljuto':'Novo'}
                      </span>
                    ))}
                  </div>
                )}
                <h2 style={{fontFamily:'var(--font-menu)',fontWeight:800,fontSize:'clamp(1rem,4vw,1.15rem)',color:'var(--cream)',marginBottom:'.35rem'}}>{item.name}</h2>
                <p style={{fontFamily:'var(--font-b)',fontWeight:600,fontSize:'clamp(.75rem,2.5vw,.82rem)',color:'rgba(245,239,224,.42)',lineHeight:1.55,marginBottom:'.9rem'}}>{item.descriptionBs}</p>
                <div style={{borderTop:'1px solid rgba(245,239,224,.07)',paddingTop:'.8rem'}}>
                  <span style={{fontFamily:'var(--font-menu)',fontWeight:800,fontSize:'clamp(1.1rem,4.5vw,1.3rem)',color:item.price===0?'rgba(245,239,224,.2)':'var(--mustard)'}}>
                    {item.price===0?'— KM':`${item.price.toFixed(2)} KM`}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div style={{background:'var(--char2)',borderTop:'1px solid rgba(245,239,224,.07)',padding:'clamp(1rem,3vw,1.5rem)',textAlign:'center',paddingBottom:'clamp(4.5rem,10vh,5.5rem)'}}>
        <div style={{fontFamily:'var(--font-b)',fontWeight:700,fontSize:'clamp(.68rem,2.2vw,.8rem)',letterSpacing:'.08em',textTransform:'uppercase',color:'rgba(245,239,224,.22)'}}>
          Frankies · Gajev trg 4, Sarajevo · 061 725 544 · 10:00–23:00
        </div>
      </div>

      <div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:100,display:'flex'}} className="mobile-bar">
        <a href="tel:061725544" style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'.4rem',padding:'clamp(.75rem,2.5vh,1rem)',background:'var(--char2)',borderTop:'1px solid rgba(245,239,224,.07)',fontFamily:'var(--font-b)',fontWeight:700,fontSize:'clamp(.72rem,3vw,.85rem)',letterSpacing:'.08em',textTransform:'uppercase',color:'var(--cream)'}}>📞 Pozovi</a>
        <a href="https://maps.google.com/?q=Gajev+trg+4+Sarajevo" target="_blank" rel="noopener noreferrer" style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'.4rem',padding:'clamp(.75rem,2.5vh,1rem)',background:'var(--red)',fontFamily:'var(--font-b)',fontWeight:800,fontSize:'clamp(.72rem,3vw,.85rem)',letterSpacing:'.08em',textTransform:'uppercase',color:'var(--cream)'}}>📍 Upute</a>
      </div>
      <style>{`@media(min-width:768px){.mobile-bar{display:none!important}}`}</style>
    </>
  )
}
import puppeteer from 'puppeteer-core';
const CHROME='C:/Program Files/Google/Chrome/Application/chrome.exe';
const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
const urls=['/','/about','/services','/packages','/destinations','/gallery','/testimonials','/blog','/blog/how-to-plan-a-destination-wedding','/faq','/contact','/book','/privacy','/terms'];
const widths=[320,360,375];
for(const w of widths){
  const p=await b.newPage(); await p.setViewport({width:w,height:800});
  for(const u of urls){
    await p.goto('http://localhost:3000'+u,{waitUntil:'domcontentloaded'});
    await new Promise(r=>setTimeout(r,250));
    const res=await p.evaluate(()=>{
      const sw=document.documentElement.scrollWidth, iw=window.innerWidth;
      // detect clipped button text (scrollWidth of button > clientWidth)
      let clipped=0;
      document.querySelectorAll('a,button').forEach(el=>{ if(el.scrollWidth>el.clientWidth+2 && getComputedStyle(el).whiteSpace==='nowrap' && el.clientWidth>60) clipped++; });
      return {over:sw>iw+1?sw:0, clipped};
    });
    if(res.over||res.clipped) console.log(`@${w} ${u}: overflow=${res.over||'ok'} clippedBtns=${res.clipped}`);
  }
  await p.close();
  console.log(`--- width ${w} scan done ---`);
}
await b.close(); console.log('ALL CLEAN if no overflow lines above');

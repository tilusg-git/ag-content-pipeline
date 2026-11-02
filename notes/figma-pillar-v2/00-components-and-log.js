const C={bone:'FAFAF7',panel:'FFFFFF',ink:'0F0F0E',soft:'5C5C58',line:'E5E2DA',ember:'D8512A'};
const rgb=h=>{h=C[h]||h;return{r:parseInt(h.slice(0,2),16)/255,g:parseInt(h.slice(2,4),16)/255,b:parseInt(h.slice(4,6),16)/255}};
const P=h=>[{type:'SOLID',color:rgb(h)}];
const FONTS={serif:{family:'Newsreader',style:'Regular'},serifI:{family:'Newsreader',style:'Italic'},sans:{family:'Inter',style:'Regular'},sansB:{family:'Inter',style:'Semi Bold'},mono:{family:'JetBrains Mono',style:'Medium'}};
await Promise.all(Object.values(FONTS).map(f=>figma.loadFontAsync(f)));
function tx(parent,str,o={}){const t=figma.createText();t.fontName=FONTS[o.f||'sans'];let s=String(str);if(o.upper)s=s.toUpperCase();t.characters=s;t.fontSize=o.size||15;t.fills=P(o.c||'ink');t.lineHeight={unit:'PERCENT',value:(o.lh||1.5)*100};if(o.ls)t.letterSpacing={unit:'PERCENT',value:o.ls*100};if(o.align)t.textAlignHorizontal=o.align;parent.appendChild(t);if(o.w==='fill'){t.layoutSizingHorizontal='FILL';t.textAutoResize='HEIGHT';}return t;}
function al(parent,dir,o={}){const f=figma.createAutoLayout(dir==='H'?'HORIZONTAL':'VERTICAL');f.name=o.name||'Frame';f.fills=o.bg?P(o.bg):[];if(o.gap!=null)f.itemSpacing=o.gap;if(o.pad!=null){const p=Array.isArray(o.pad)?o.pad:[o.pad,o.pad,o.pad,o.pad];[f.paddingTop,f.paddingRight,f.paddingBottom,f.paddingLeft]=p;}if(parent)parent.appendChild(f);if(o.w==='fill')f.layoutSizingHorizontal='FILL';if(o.stroke){f.strokes=P(o.stroke);f.strokeWeight=1;f.strokeAlign='INSIDE';}return f;}
const page=await figma.getNodeByIdAsync('25:2');await figma.setCurrentPageAsync(page);
if(page.findAllWithCriteria({types:['COMPONENT']}).some(c=>c.name==='Pillar/Media placeholder'))return {skipped:'already built'};
const row=(await figma.getNodeByIdAsync('25:3')).children.find(n=>n.name==='Row');
const mp=figma.createComponent();mp.name='Pillar/Media placeholder';mp.layoutMode='VERTICAL';mp.primaryAxisSizingMode='FIXED';mp.counterAxisSizingMode='FIXED';mp.primaryAxisAlignItems='CENTER';mp.counterAxisAlignItems='CENTER';mp.itemSpacing=8;mp.paddingTop=mp.paddingBottom=20;mp.paddingLeft=mp.paddingRight=24;mp.fills=P('line');row.appendChild(mp);mp.resize(360,260);
const k=tx(mp,'Image',{f:'mono',size:10,c:'soft',ls:0.18,upper:true,align:'CENTER'});
const d=tx(mp,'What the image shows',{f:'serifI',size:15,c:'soft',lh:1.35,align:'CENTER',w:'fill'});
const kK=mp.addComponentProperty('Kind','TEXT','Image');k.componentPropertyReferences={characters:kK};
const kD=mp.addComponentProperty('Description','TEXT','What the image shows');d.componentPropertyReferences={characters:kD};
const g=al(null,'V',{name:'v2.1 change log · read first',bg:'panel',gap:22,pad:[48,48,48,48],stroke:'line'});page.appendChild(g);g.resize(620,10);g.layoutSizingVertical='HUG';g.x=4800;g.y=0;
const top=figma.createRectangle();top.fills=P('ink');g.appendChild(top);top.resize(10,2);top.layoutSizingHorizontal='FILL';
tx(g,'v2.1 change log · read first',{f:'mono',size:11,c:'soft',ls:0.18,upper:true});
tx(g,'Fewer tables, media built into the layout',{f:'serif',size:34,lh:1.1,w:'fill'});
const sec=(h,body)=>{const s=al(g,'V',{name:h,gap:8});s.layoutSizingHorizontal='FILL';tx(s,h,{f:'sansB',size:14,w:'fill'});for(const b of body)tx(s,b,{size:14,c:'soft',lh:1.55,w:'fill'});};
sec('Your two comments',['Too many tables: v1 had tables in 6 of 10 modules on /goal-setting and 7 of 8 on /types-of-personal-goals. No media positioned in the layout.']);
sec('What changed in the spec',['pillar-page-structure skill (B3a, B7), the playbook (rule 7, §3.2, §3.3), and the brief template (§11) now require: at most 3 table-type elements per page, never in adjacent modules; at least 4 element types; a media beat on every second or third module; and a media split layout for modules with media.']);
sec('What changed in /goal-setting',['Tables are down to 3 (4.2, 4.4, 4.10). 4.3 is a rewrite list with an annotated goal card. 4.5 is a week-plan figure. 4.7 is numbered steps. 4.8 is an image card grid. Images in 4.1, 4.3, 4.6, 4.8.']);
sec('What changed in /types-of-personal-goals',['Tables are down to 3 (the band 2 grid, 4.6, 4.8). The five life areas are rewrite lists, each with its own image, and the image side alternates. Optional group photo in the in-practice band.']);
sec('Copy',['Every word of the v2 copy is kept. The only new copy is the “Instead of” labels, the three annotated-image callouts on /goal-setting, and the 20 grid examples on /types-of-personal-goals (already flagged for your OK). Module docs v2.1 are in Drive; prose limits re-measured, all pass.']);
sec('Placeholders',['Grey blocks are image slots with a description of the planned shot. Every image still needs per-page source approval (own photo, AI, or licensed).']);
sec('Where v1 is',['The v1 frames stay to the left for comparison.']);
return {mp:mp.id,log:g.id};

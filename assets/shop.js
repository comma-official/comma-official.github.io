/* COMMA 판매 정보. 가격·얼리버드·구성은 여기만 고치면 홈과 구매 페이지에 함께 반영됩니다.
   금액 근거는 ../보관이 아니라 COMMA/가격_근거.md에 있습니다. */
window.SHOP=(function(){
  const S={
    earlyEnd:'2026-12-31T23:59:59+09:00', /* 이 시각이 지나면 자동으로 정가로 바뀝니다 */
    earlyLimit:1000,
    shipping:'2027년 1월 5일부터 순차 배송',
    returnDays:30,
    dot:{list:199000,early:149000},       /* Core + Dock + COMMA App */
    mount:{list:29000,early:19000},       /* Mount 1종 */
    mountSet:{list:69000,early:39000},    /* Mount 3종 세트 */
    colors:[
      {id:'purple',n:'퍼플',hex:'#C797F6',tint:'#F3E9FD',img:'assets/img/dot-purple.webp'},
      {id:'blue',n:'블루',hex:'#7AA5F3',tint:'#E6EEFD',img:'assets/img/dot-blue.webp'},
      {id:'mint',n:'민트',hex:'#2BE7DB',tint:'#E2FBF7',img:'assets/img/dot-mint.webp'},
      {id:'lime',n:'라임',hex:'#AEE556',tint:'#F3FBE1',img:'assets/img/dot-lime.webp'}
    ],
    mounts:[
      {id:'watch',n:'워치 스트랩',s:'손목에',img:'assets/v3/mount-watch-clay.webp'},
      {id:'keyring',n:'키링',s:'가방에',img:'assets/v3/mount-keyring-clay.webp'},
      {id:'clip',n:'클립',s:'옷이나 가방에',img:'assets/v3/mount-clip-clay.webp'}
    ]
  };
  S.isEarly=()=>Date.now()<new Date(S.earlyEnd).getTime();
  S.won=n=>'₩'+Math.round(n).toLocaleString('ko-KR');
  S.mountsPrice=(count,early)=>{ const k=early?'early':'list'; return count===S.mounts.length?S.mountSet[k]:count*S.mount[k]; };
  S.quote=(count,qty=1)=>{ const early=S.isEarly();
    const list=(S.dot.list+S.mountsPrice(count,false))*qty;
    const pay=((early?S.dot.early:S.dot.list)+S.mountsPrice(count,early))*qty;
    return {list,pay,save:list-pay,early}; };
  S.left=()=>{ const t=Math.max(0,new Date(S.earlyEnd).getTime()-Date.now()), p=n=>String(n).padStart(2,'0');
    const d=Math.floor(t/864e5),h=Math.floor(t/36e5)%24,m=Math.floor(t/6e4)%60,s=Math.floor(t/1e3)%60;
    return `${d}일 ${p(h)}:${p(m)}:${p(s)}`; };
  return S;
})();

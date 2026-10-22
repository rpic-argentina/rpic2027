(function(){
  // Días restantes hasta el cierre de envío (fecha y textos vienen del contenido y de i18n)
  var el=document.getElementById("days");
  if(el){
    var d=Math.ceil((new Date(el.dataset.deadline)-new Date())/86400000);
    if(d>1) el.textContent=el.dataset.many.replace("{n}",d);
    else if(d===1) el.textContent=el.dataset.one;
  }

  // Haces de líneas ondulantes y nodos
  var c=document.getElementById("waves"); if(!c||!c.getContext) return;
  var x=c.getContext("2d"), W, H, dpr=Math.min(window.devicePixelRatio||1,2), nodes=[];
  var still=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  var bundles=[
    {y:.18,amp:.10,freq:1.3,col:"79,189,238",n:22,spread:2.4,speed:.00012,phase:0},
    {y:.55,amp:.14,freq:.9,col:"112,72,232",n:18,spread:2.8,speed:.0001,phase:2},
    {y:.86,amp:.08,freq:1.6,col:"79,189,238",n:16,spread:2.2,speed:.00015,phase:4}
  ];
  function size(){W=c.clientWidth;H=c.clientHeight;c.width=W*dpr;c.height=H*dpr;x.setTransform(dpr,0,0,dpr,0,0);
    nodes=[];var n=Math.round(Math.min(26,W/45));
    for(var i=0;i<n;i++)nodes.push({x:Math.random()*W,y:Math.random()*H,r:2+Math.random()*4,c:i%2?"217,70,239":"112,72,232",a:.12+Math.random()*.22});}
  function draw(t){x.clearRect(0,0,W,H);
    bundles.forEach(function(b){
      for(var k=0;k<b.n;k++){x.beginPath();
        for(var px=0;px<=W;px+=8){var u=px/W;
          var y=H*b.y + Math.sin(u*Math.PI*2*b.freq + b.phase + t*b.speed + k*.045)*H*b.amp + k*b.spread*(1+Math.sin(u*3+k*.1)*.6);
          if(px===0)x.moveTo(px,y);else x.lineTo(px,y);}
        x.strokeStyle="rgba("+b.col+","+(0.22-k*0.008)+")";x.lineWidth=1;x.stroke();}
    });
    for(var i=0;i<nodes.length;i++){var p=nodes[i];
      for(var j=i+1;j<nodes.length;j++){var q=nodes[j],dx=p.x-q.x,dy=p.y-q.y,dd=dx*dx+dy*dy;
        if(dd<14000){x.strokeStyle="rgba(217,70,239,"+(0.14*(1-dd/14000))+")";x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke();}}
      x.fillStyle="rgba("+p.c+","+p.a+")";x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fill();}
    if(!still)requestAnimationFrame(draw);}
  size();requestAnimationFrame(draw);addEventListener("resize",size);
})();

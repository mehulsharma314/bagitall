import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "REकलture | Wearable Art. Upcycled. One of One.",
  description: "REकलture transforms discarded fabrics into 1-of-1 wearable art. Part of Bag It All — a scarcity-driven platform for slow fashion. Once sold, gone forever.",
  keywords: ["thrift", "upcycled", "sustainable fashion", "1-of-1", "REकलture", "bag it all", "slow fashion", "handcrafted"],
  openGraph: {
    title: "REकलture | Wearable Art. Upcycled. One of One.",
    description: "1-of-1 upcycled fashion pieces handcrafted from discarded fabrics. Once sold, gone forever.",
    url: "https://bagitall.in",
    siteName: "Bag It All | REकलture",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {/* Scroll-reveal IntersectionObserver — fires .is-visible on .reveal-section */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('is-visible'); io.unobserve(e.target); }
    });
  },{threshold:0.12});
  function init(){
    document.querySelectorAll('.reveal-section,.reveal-up').forEach(function(el){io.observe(el);});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init);
  else init();
  /* 3D mouse-tilt on pillar cards */
  document.addEventListener('mousemove',function(ev){
    document.querySelectorAll('.tilt-card').forEach(function(card){
      var r=card.getBoundingClientRect();
      if(ev.clientX<r.left-60||ev.clientX>r.right+60||ev.clientY<r.top-60||ev.clientY>r.bottom+60) return;
      var x=(ev.clientX-r.left)/r.width-0.5;
      var y=(ev.clientY-r.top)/r.height-0.5;
      card.style.transform='rotateY('+(x*12)+'deg) rotateX('+(-y*10)+'deg) translateY(-4px)';
    });
  });
  document.addEventListener('mouseleave',function(){
    document.querySelectorAll('.tilt-card').forEach(function(card){ card.style.transform=''; });
  });
})();`,
          }}
        />
      </body>
    </html>
  );
}

// ===== LOADER =====
window.addEventListener('load', () => {
  const fill = document.getElementById('loaderFill');
  let p = 0;
  const iv = setInterval(() => {
    p += Math.random() * 15;
    if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => document.getElementById('loader').classList.add('hide'), 300); }
    fill.style.width = p + '%';
  }, 80);
});

// ===== THEME TOGGLE =====
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
let dark = true;
themeBtn.addEventListener('click', () => {
  dark = !dark;
  html.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeIcon.className = dark ? 'fas fa-moon' : 'fas fa-sun';
});

// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateNav();
});
function updateNav() {
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  document.querySelectorAll('.nav-link').forEach(l => { l.classList.toggle('active', l.getAttribute('href') === '#' + cur); });
}

// ===== HAMBURGER =====
const hbg = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hbg.addEventListener('click', () => { hbg.classList.toggle('open'); navLinks.classList.toggle('open'); });
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => { hbg.classList.remove('open'); navLinks.classList.remove('open'); }));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ===== REVEAL =====
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('visible'), i * 80); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ===== TOGGLE SOLUTION =====
function toggleSol(btn) {
  const sol = btn.closest('.soal-body').querySelector('.penyelesaian');
  const hidden = sol.classList.contains('hidden');
  sol.classList.toggle('hidden');
  btn.innerHTML = hidden ? '<i class="fas fa-eye-slash"></i> Sembunyikan' : '<i class="fas fa-eye"></i> Lihat Penyelesaian';
}

// ===== CANVAS =====
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
let W, H, pts = [];
const SYMS = ['f\u207b\u00b9','x','y','\u222b','\u03a3','\u221e','\u03c0','\u0394','f(x)','ax+b','\u221ax','dy/dx'];
function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
function mkPts() {
  pts = [];
  const n = Math.floor(W * H / 22000);
  for (let i = 0; i < n; i++) pts.push({ x: Math.random()*W, y: Math.random()*H, vx:(Math.random()-.5)*.3, vy:(Math.random()-.5)*.3, a:Math.random()*.2+.04, sz:Math.random()*10+8, sym:SYMS[Math.floor(Math.random()*SYMS.length)], c:Math.random()>.5?'#a855f7':'#ec4899' });
}
function draw() {
  ctx.clearRect(0,0,W,H);
  const isDark = html.getAttribute('data-theme') !== 'light';
  const g = ctx.createRadialGradient(W*.3,H*.2,0,W*.3,H*.2,W*.7);
  g.addColorStop(0, isDark?'rgba(168,85,247,0.06)':'rgba(168,85,247,0.04)');
  g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
  const g2 = ctx.createRadialGradient(W*.8,H*.7,0,W*.8,H*.7,W*.5);
  g2.addColorStop(0, isDark?'rgba(236,72,153,0.04)':'rgba(236,72,153,0.03)');
  g2.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle = g2; ctx.fillRect(0,0,W,H);
  pts.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < -50) p.x = W+50; if (p.x > W+50) p.x = -50;
    if (p.y < -50) p.y = H+50; if (p.y > H+50) p.y = -50;
    ctx.save(); ctx.globalAlpha = p.a; ctx.fillStyle = p.c;
    ctx.font = p.sz + 'px "Space Grotesk",sans-serif';
    ctx.fillText(p.sym, p.x, p.y); ctx.restore();
  });
  requestAnimationFrame(draw);
}
resize(); mkPts(); draw();
window.addEventListener('resize', () => { resize(); mkPts(); });

// ===== QUIZ DATA =====
const QD = [
  { q:'Jika f(x) = 2x + 6, maka f\u207b\u00b9(x) adalah...', o:['(x \u2212 6) / 2','(x + 6) / 2','2x \u2212 6','(x \u2212 3) / 2'], a:0, fb:'y = 2x+6 \u2192 2x = y\u22126 \u2192 x = (y\u22126)/2, sehingga f\u207b\u00b9(x) = (x\u22126)/2' },
  { q:'Diketahui f(x) = 4x \u2212 8. Nilai f\u207b\u00b9(4) adalah...', o:['2','3','4','1'], a:1, fb:'f\u207b\u00b9(x) = (x+8)/4, maka f\u207b\u00b9(4) = (4+8)/4 = 12/4 = 3' },
  { q:'Syarat utama sebuah fungsi memiliki invers adalah...', o:['Fungsi linear','Fungsi bijektif','Fungsi kuadrat','Fungsi konstan'], a:1, fb:'Fungsi harus bijektif (injektif sekaligus surjektif) agar memiliki invers.' },
  { q:'Jika f(x) = (3x+1)/(x\u22122), maka f\u207b\u00b9(x) adalah...', o:['(2x+1)/(x\u22123)','(x\u22121)/(3\u2212x)','(2x\u22121)/(x+3)','(x+2)/(3\u2212x)'], a:0, fb:'y(x\u22122)=3x+1 \u2192 xy\u22122y=3x+1 \u2192 x(y\u22123)=2y+1 \u2192 x=(2y+1)/(y\u22123), ganti y\u2192x' },
  { q:'Jika f(3) = 7, maka f\u207b\u00b9(7) = ...', o:['3','7','1/3','21'], a:0, fb:'Sifat dasar invers: jika f(a)=b maka f\u207b\u00b9(b)=a. Jadi f\u207b\u00b9(7)=3.' },
  { q:'Fungsi f(x) = x\u00b2 pada domain semua bilangan real memiliki invers?', o:['Ya, selalu','Tidak, karena tidak injektif','Ya, jika domain dibatasi','Tidak pernah'], a:1, fb:'f(x)=x\u00b2 tidak injektif pada R karena f(2)=f(\u22122)=4, sehingga tidak memiliki invers.' },
  { q:'Jika f(x) = 5x + 10, maka f\u207b\u00b9(0) = ...', o:['\u22122','2','10','\u221210'], a:0, fb:'f\u207b\u00b9(x)=(x\u221210)/5, maka f\u207b\u00b9(0)=(0\u221210)/5=\u22122' },
  { q:'Notasi yang benar untuk fungsi invers dari f adalah...', o:['1/f(x)','f\u207b\u00b9(x)','[f(x)]\u207b\u00b9','f\'(x)'], a:1, fb:'Notasi standar fungsi invers adalah f\u207b\u00b9(x), bukan 1/f(x) atau turunan f\'(x).' },
  { q:'Jika f\u207b\u00b9(x) = (x+4)/3, maka f(x) adalah...', o:['3x\u22124','3x+4','(x\u22124)/3','x/3+4'], a:0, fb:'Invers dari f\u207b\u00b9(x)=(x+4)/3: y=(x+4)/3 \u2192 3y=x+4 \u2192 x=3y\u22124, jadi f(x)=3x\u22124' },
  { q:'Sifat komposisi fungsi invers: f(f\u207b\u00b9(x)) = ...', o:['0','1','x','f(x)'], a:2, fb:'Sifat fundamental: f(f\u207b\u00b9(x))=x dan f\u207b\u00b9(f(x))=x untuk semua x di domain.' }
];

let cQ = 0, score = 0, answered = false, userName = '', userKelas = '', userNo = '';

function startQuiz(e) {
  e.preventDefault();
  userName = document.getElementById('inputNama').value.trim();
  userKelas = document.getElementById('inputKelas').value.trim();
  userNo = document.getElementById('inputNo').value.trim();
  document.getElementById('quizLogin').classList.add('hidden');
  document.getElementById('quizScreen').classList.remove('hidden');
  cQ = 0; score = 0;
  renderQ();
}

function renderQ() {
  answered = false;
  const d = QD[cQ];
  document.getElementById('qzUser').innerHTML = '<i class="fas fa-user"></i> ' + userName + ' \u2022 ' + userKelas + ' \u2022 No. ' + userNo;
  document.getElementById('liveScore').textContent = score;
  document.getElementById('progressFill').style.width = (cQ / QD.length * 100) + '%';
  document.getElementById('qzCounter').textContent = 'Soal ' + (cQ+1) + ' / ' + QD.length;
  document.getElementById('qzQuestion').textContent = d.q;
  document.getElementById('qzFeedback').className = 'qz-feedback hidden';
  document.getElementById('nextBtn').classList.add('hidden');
  const L = ['A','B','C','D'];
  const el = document.getElementById('qzOptions');
  el.innerHTML = '';
  d.o.forEach((opt, i) => {
    const div = document.createElement('div');
    div.className = 'qz-option';
    div.innerHTML = '<span class="opt-letter">' + L[i] + '</span>' + opt;
    div.onclick = () => pick(i, div);
    el.appendChild(div);
  });
}

function pick(idx, el) {
  if (answered) return;
  answered = true;
  const d = QD[cQ];
  document.querySelectorAll('.qz-option').forEach(o => o.classList.add('disabled'));
  const fb = document.getElementById('qzFeedback');
  if (idx === d.a) {
    score++;
    el.classList.add('correct');
    document.getElementById('liveScore').textContent = score;
    fb.className = 'qz-feedback ok';
    fb.innerHTML = '\u2705 Benar! ' + d.fb;
  } else {
    el.classList.add('wrong');
    document.querySelectorAll('.qz-option')[d.a].classList.add('correct');
    fb.className = 'qz-feedback no';
    fb.innerHTML = '\u274c Kurang tepat. ' + d.fb;
  }
  fb.classList.remove('hidden');
  const nb = document.getElementById('nextBtn');
  nb.classList.remove('hidden');
  nb.innerHTML = cQ < QD.length-1 ? 'Soal Berikutnya <i class="fas fa-arrow-right"></i>' : 'Lihat Hasil <i class="fas fa-flag-checkered"></i>';
}

function nextQuestion() {
  cQ++;
  if (cQ >= QD.length) showResult();
  else renderQ();
}

function showResult() {
  document.getElementById('quizScreen').classList.add('hidden');
  document.getElementById('quizResult').classList.remove('hidden');
  document.getElementById('progressFill').style.width = '100%';
  const pct = Math.round(score / QD.length * 100);
  document.getElementById('qrScore').textContent = pct + '%';
  document.getElementById('qrName').innerHTML = '<i class="fas fa-user"></i> ' + userName + ' \u2022 ' + userKelas + ' \u2022 No. ' + userNo;
  document.getElementById('qrDetail').textContent = 'Kamu menjawab ' + score + ' dari ' + QD.length + ' soal dengan benar.';
  let em, ti, de;
  if (pct>=90){em='\uD83C\uDF1F';ti='Luar Biasa!';de='Kamu menguasai Fungsi Invers dengan sangat baik!';}
  else if(pct>=70){em='\uD83D\uDCAA';ti='Bagus Sekali!';de='Pemahaman kamu sudah baik. Terus tingkatkan!';}
  else if(pct>=50){em='\uD83D\uDCDA';ti='Cukup Baik!';de='Masih ada yang perlu dipelajari. Baca lagi materinya ya!';}
  else{em='\uD83D\uDE4F';ti='Jangan Menyerah!';de='Pelajari kembali materi Fungsi Invers dan coba lagi!';}
  document.getElementById('qrEmoji').textContent = em;
  document.getElementById('qrTitle').textContent = ti;
  document.getElementById('qrDesc').textContent = de;
}

function restartQuiz() {
  document.getElementById('quizResult').classList.add('hidden');
  document.getElementById('quizScreen').classList.remove('hidden');
  cQ = 0; score = 0; renderQ();
}

function backToLogin() {
  document.getElementById('quizResult').classList.add('hidden');
  document.getElementById('quizLogin').classList.remove('hidden');
  document.getElementById('inputNama').value = '';
  document.getElementById('inputKelas').value = '';
  document.getElementById('inputNo').value = '';
}

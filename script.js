// Tema salvo
const body = document.body;
const toggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "light") {
  body.classList.remove("dark");
  body.classList.add("light");
  toggle.textContent = "🌙";
}
toggle.addEventListener("click", () => {
  body.classList.toggle("light");
  body.classList.toggle("dark");
  const theme = body.classList.contains("light") ? "light" : "dark";
  toggle.textContent = theme === "light" ? "🌙" : "☀️";
  localStorage.setItem("theme", theme);
});

// Overlay QR
const overlay = document.getElementById("qrOverlay");
const qrImage = document.getElementById("qrImage");
const shareBtn = document.getElementById("shareBtn");
const copyBtn = document.getElementById("copyBtn");
const downloadBtn = document.getElementById("downloadBtn");
let currentUrl = "";

function openModal(url){
  currentUrl = url;
  qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}`;
  overlay.style.display = "flex";
}
function closeModal(){ overlay.style.display = "none"; }
overlay.addEventListener("click", e => { if(e.target===overlay) closeModal(); });

shareBtn.addEventListener("click", () => {
  if(navigator.share){ navigator.share({url:currentUrl}).catch(()=>{}); }
  else{ copyLink(currentUrl); }
});
copyBtn.addEventListener("click", () => copyLink(currentUrl));
downloadBtn.addEventListener("click", () => {
  const a = document.createElement("a");
  a.href = qrImage.src;
  a.download = "qr-code.png";
  a.click();
});

function copyLink(url){
  navigator.clipboard.writeText(url).then(() => alert("Link copiado!"));
}

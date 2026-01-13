// ==============================
// 要素取得
// ==============================
const canvas = document.getElementById('flip-canvas');
const ctx = canvas.getContext('2d');

const plusBtn = document.getElementById('count-plus');
const minusBtn = document.getElementById('count-minus');
const countNumber = document.getElementById('count-number');
const clearBtn = document.getElementById('clear-canvas');

// ==============================
// 状態
// ==============================
let drawing = false;
let correctCount = 0;

// ==============================
// Canvas初期化
// ==============================
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 60;

  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ==============================
// 描画（タッチ専用）
// ==============================
canvas.addEventListener('touchstart', e => {
  drawing = true;
  const t = e.touches[0];
  ctx.beginPath();
  ctx.moveTo(t.clientX, t.clientY - 60);
});

canvas.addEventListener('touchmove', e => {
  if (!drawing) return;
  e.preventDefault();

  const t = e.touches[0];
  ctx.lineTo(t.clientX, t.clientY - 60);
  ctx.stroke();
});

canvas.addEventListener('touchend', () => {
  drawing = false;
});

// ==============================
// 消去
// ==============================
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ==============================
// 正答数カウンター
// ==============================
plusBtn.addEventListener('click', () => {
  correctCount++;
  countNumber.textContent = correctCount;
});

minusBtn.addEventListener('click', () => {
  if (correctCount > 0) {
    correctCount--;
    countNumber.textContent = correctCount;
  }
});

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
  const headerHeight = 60; // フリップヘッダー高さ
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - headerHeight;

  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ==============================
// 座標取得（PC・スマホ共通）
// ==============================
function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

// ==============================
// 描画（PC / スマホ / ペン対応）
// ==============================
canvas.addEventListener('pointerdown', e => {
  drawing = true;
  const { x, y } = getPos(e);
  ctx.beginPath();
  ctx.moveTo(x, y);
});

canvas.addEventListener('pointermove', e => {
  if (!drawing) return;
  const { x, y } = getPos(e);
  ctx.lineTo(x, y);
  ctx.stroke();
});

canvas.addEventListener('pointerup', () => {
  drawing = false;
  ctx.closePath();
});

canvas.addEventListener('pointerleave', () => {
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

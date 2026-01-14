// ==============================
// 要素取得
// ==============================
const nameScreen = document.getElementById('name-screen');
const questionScreen = document.getElementById('question-screen');

const nicknameInput = document.getElementById('nickname-input');
const saveNameBtn = document.getElementById('save-name-btn');

const questionTitle = document.getElementById('question-title');
const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const nextBtn = document.getElementById('next-question-btn');

// 出題数カウンター
const decreaseBtn = document.getElementById('decrease-btn');
const increaseBtn = document.getElementById('increase-btn');
const questionCountText = document.getElementById('question-count');

// ==============================
// 状態
// ==============================
let currentIndex = 0;
let nickname = '';
let shuffledQuestions = [];

const answers = [];
const answerHistory = [];

let questionCount = 10;
const MIN_COUNT = 5;
const STEP = 5;
const MAX_COUNT = questions.length;

// ==============================
// シャッフル
// ==============================
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// ==============================
// 出題数カウンター操作
// ==============================
decreaseBtn.addEventListener('click', () => {
  if (questionCount > MIN_COUNT) {
    questionCount -= STEP;
    questionCountText.textContent = questionCount;
  }
});

increaseBtn.addEventListener('click', () => {
  if (questionCount + STEP <= MAX_COUNT) {
    questionCount += STEP;
    questionCountText.textContent = questionCount;
  }
});

// ==============================
// 呼び名保存 → 質問開始
// ==============================
saveNameBtn.addEventListener('click', () => {
  nickname = nicknameInput.value.trim();

  if (!nickname) {
    alert('呼び名を入力してください');
    return;
  }

  // 状態リセット
  currentIndex = 0;
  answers.length = 0;
  answerHistory.length = 0;
  answerInput.value = '';

  const shuffled = shuffle([...questions]);
  shuffledQuestions = shuffled.slice(0, questionCount);

  nameScreen.style.display = 'none';
  questionScreen.style.display = 'flex';

  showQuestion();
});

// ==============================
// 質問表示
// ==============================
function showQuestion() {
  const q = shuffledQuestions[currentIndex];
  questionTitle.textContent = `第${currentIndex + 1}問`;
  questionText.textContent = q.text;
}

// ==============================
// 次へ
// ==============================
nextBtn.addEventListener('click', () => {
  const answer = answerInput.value.trim();

  if (!answer) {
    alert('回答を入力してください');
    return;
  }

  answers[currentIndex] = answer;
  answerHistory[currentIndex] = answer;

  answerInput.value = '';
  currentIndex++;

  if (currentIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    saveKingData();
    location.href = 'index.html';
  }
});

// ==============================
// 1つ前に戻る（質問画面専用）
// ==============================
function goPrev() {
  // 1問目 → 名前入力画面へ
  if (currentIndex === 0) {
    questionScreen.style.display = 'none';
    nameScreen.style.display = 'flex';
    return;
  }

  // 2問目以降 → 前の質問へ
  currentIndex--;
  answerInput.value = answerHistory[currentIndex] || '';
  showQuestion();
}

// ==============================
// タイトルへ戻る（完全に戻る）
// ==============================
function goTitle() {
  // 状態をすべて破棄
  currentIndex = 0;
  answers.length = 0;
  answerHistory.length = 0;
  answerInput.value = '';

  location.href = 'index.html';
}

// ==============================
// 〇〇王データ保存
// ==============================
function saveKingData() {
  const stored = localStorage.getItem('kings');
  const kings = stored ? JSON.parse(stored) : [];

  const kingData = {
    nickname,
    questions: shuffledQuestions.map(q => q.text),
    answers
  };

  kings.push(kingData);
  localStorage.setItem('kings', JSON.stringify(kings));
}

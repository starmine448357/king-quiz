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
const answers = [];
let nickname = '';

let questionCount = 10;           // 初期値
const MIN_COUNT = 5;
const STEP = 5;
const MAX_COUNT = questions.length;

let shuffledQuestions = [];

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

  // 出題数分だけランダム取得
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

  answers.push(answer);
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
// 〇〇王データを保存
// ==============================
function saveKingData() {
  const stored = localStorage.getItem('kings');
  const kings = stored ? JSON.parse(stored) : [];

  const kingData = {
    nickname: nickname,
    questions: shuffledQuestions.map(q => q.text),
    answers: answers
  };

  kings.push(kingData);
  localStorage.setItem('kings', JSON.stringify(kings));
}

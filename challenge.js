// ==============================
// 要素取得
// ==============================
const selectScreen = document.getElementById('select-screen');
const kingList = document.getElementById('king-list');

const quizScreen = document.getElementById('quiz-screen');
const quizTitle = document.getElementById('quiz-title');
const quizQuestion = document.getElementById('quiz-question');
const showAnswerBtn = document.getElementById('show-answer-btn');

const answerScreen = document.getElementById('answer-screen');
const quizAnswer = document.getElementById('quiz-answer');
const nextBtn = document.getElementById('next-btn');
const endScreen = document.getElementById('end-screen');
const endTitle = document.getElementById('end-title');


// ==============================
// 状態
// ==============================
const kings = JSON.parse(localStorage.getItem('kings')) || [];
let selectedKing = null;
let currentIndex = 0;

// ==============================
// 王一覧表示
// ==============================
if (kings.length === 0) {
  kingList.innerHTML = '<p>まだ〇〇王がいません</p>';
} else {
  kings.forEach((king, index) => {
    const btn = document.createElement('button');
    btn.textContent = `${king.nickname}王`;
    btn.onclick = () => selectKing(index);
    kingList.appendChild(btn);
  });
}

// ==============================
// 王を選択
// ==============================
function selectKing(index) {
  selectedKing = kings[index];
  currentIndex = 0;

  selectScreen.style.display = 'none';
  quizScreen.style.display = 'flex';

  showQuestion();
}

// ==============================
// 質問表示
// ==============================
function showQuestion() {
  quizTitle.textContent = `第${currentIndex + 1}問`;
  quizQuestion.textContent =
    selectedKing.questions[currentIndex];
}

// ==============================
// 回答を見る
// ==============================
showAnswerBtn.addEventListener('click', () => {
  quizScreen.style.display = 'none';
  answerScreen.style.display = 'flex';

  quizAnswer.textContent =
    selectedKing.answers[currentIndex];
});

// ==============================
// 次へ
// ==============================
nextBtn.addEventListener('click', () => {
  currentIndex++;

  if (currentIndex < selectedKing.questions.length) {
    answerScreen.style.display = 'none';
    quizScreen.style.display = 'flex';
    showQuestion();
} else {
  answerScreen.style.display = 'none';
  endScreen.style.display = 'flex';

  endTitle.textContent =
    `${selectedKing.nickname}王 終了 !!`;
}
});

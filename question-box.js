// ==============================
// localStorageキー
// ==============================
const CUSTOM_KEY = 'questionBoxCustom';
const DELETED_KEY = 'questionBoxDeleted';

// ==============================
// 要素取得
// ==============================
const questionList = document.getElementById('question-list');
const input = document.getElementById('new-question-input');
const addBtn = document.getElementById('add-question-btn');

// ==============================
// 保存データ取得
// ==============================
function getCustomQuestions() {
  return JSON.parse(localStorage.getItem(CUSTOM_KEY)) || [];
}

function getDeletedIds() {
  return JSON.parse(localStorage.getItem(DELETED_KEY)) || [];
}

// ==============================
// 保存
// ==============================
function saveCustomQuestions(list) {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
}

function saveDeletedIds(list) {
  localStorage.setItem(DELETED_KEY, JSON.stringify(list));
}

// ==============================
// 既存質問をオブジェクト化
// ==============================
function getBaseQuestions() {
  return questions.map((q, index) => ({
    id: `base-${index}`,
    text: q.text
  }));
}

// ==============================
// 全質問取得（新しい順）
// ==============================
function getAllQuestions() {
  const base = getBaseQuestions();
  const custom = getCustomQuestions();
  const deleted = getDeletedIds();

  const merged = [...custom, ...base];

  return merged
    .filter(q => !deleted.includes(q.id))
    .reverse(); // 新しい順
}

// ==============================
// 描画
// ==============================
function renderQuestions() {
  const list = getAllQuestions();
  questionList.innerHTML = '';

  if (list.length === 0) {
    questionList.innerHTML = '<li>質問がありません</li>';
    return;
  }

  list.forEach(q => {
    const li = document.createElement('li');
    li.className = 'question-item';

    const text = document.createElement('span');
    text.textContent = q.text;

    const delBtn = document.createElement('button');
    delBtn.textContent = '削除';
    delBtn.onclick = () => {
      if (!confirm('この質問を削除しますか？')) return;

      const deleted = getDeletedIds();
      deleted.push(q.id);
      saveDeletedIds(deleted);

      renderQuestions();
    };

    li.appendChild(text);
    li.appendChild(delBtn);
    questionList.appendChild(li);
  });
}

// ==============================
// 追加
// ==============================
addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (!text) return;

  const custom = getCustomQuestions();
  custom.push({
    id: `custom-${Date.now()}`,
    text
  });

  saveCustomQuestions(custom);
  input.value = '';
  renderQuestions();
});

// 初期描画
renderQuestions();

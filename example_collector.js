// ==UserScript==
// @name        Moodle collector
// @match       https://eios.kantiana.ru/mod/quiz/attempt.php*
// @grant       none
// ==/UserScript==
(function () {
  const page = parseInt(new URLSearchParams(location.search).get('page') || '0');
  const key = 'collected_q';
  const data = JSON.parse(localStorage.getItem(key) || '{}');

  const que = document.querySelector('.que');
  if (!que) return;
  const text = que.querySelector('.qtext')?.innerText.trim();
  const opts = [...que.querySelectorAll('.answer label, .answer .flex-fill')].map(o => o.innerText.trim());
  data[page + 1] = { q: text, options: opts };
  localStorage.setItem(key, JSON.stringify(data));

  const btn = document.querySelector('[name="next"]')
    || [...document.querySelectorAll('button, input[type="submit"]')]
         .find(b => /Следующая|Next/i.test(b.value || b.textContent));

  if (btn && /Следующая|Next/i.test(btn.value || btn.textContent)) {
    setTimeout(() => btn.click(), 600);
  } else {
    console.log(JSON.stringify(data, null, 1));
    localStorage.removeItem(key);
  }
})();

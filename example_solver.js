// ==UserScript==
// @name        Moodle autofill test3
// @match       https://eios.kantiana.ru/mod/quiz/attempt.php*
// @grant       none
// ==/UserScript==
(function () {
  const A = ["persistent","timeless","hasty","economical","preparatory","reliable","eventful","advisable","mashed","Polish",
    "explanatory","famous","fashionable","speechless","skinny","exaggerated","managerial","ambitious","Portuguese","enthusiastic",
    "collectable","sensitive","autonomous","digestive","dependent"];

  const page = parseInt(new URLSearchParams(location.search).get('page') || '0');
  const qno = page + 1;
  const ans = A[qno - 1];
  const el = document.querySelector('.que input[type="text"]');
  if (!el || !ans) return;

  el.value = ans;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  console.log('[autofill]', qno, ans);

  if (qno < 25) {
    const btn = document.querySelector('[name="next"]')
      || [...document.querySelectorAll('button, input[type="submit"]')]
           .find(b => /Следующая|Next/i.test(b.value || b.textContent));
    setTimeout(() => btn?.click(), 700);
  }
})();

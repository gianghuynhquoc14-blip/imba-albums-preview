'use strict';
// Keep generation separate from a fresh user gesture: mobile share sheets need it.
(() => {
 let sequence = 0;
 const node = (tag, text, className) => {
  const value = document.createElement(tag);
  if (text) value.textContent = text;
  if (className) value.className = className;
  return value;
 };
 function filename(name) {
  const stem = String(name).replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 64) || 'IMBA-album';
  const stamp = new Date().toISOString().replace(/\D/g, '').slice(0, 14);
  return stem + '-' + stamp + '-' + (++sequence) + '.pdf';
 }
 function prepare(blob, name, host) {
  if (!host || !(blob instanceof Blob) || blob.size < 8 || blob.type !== 'application/pdf') throw Error('Не удалось подготовить PDF. Соберите файл ещё раз.');
  const fileName = filename(name);
  const file = typeof File === 'function' ? new File([blob], fileName, {type:'application/pdf'}) : null;
  const url = URL.createObjectURL(file || blob);
  const panel = node('section', '', 'pdf-delivery');
  panel.setAttribute('aria-label', 'Готовый PDF');
  const heading = node('h3', 'PDF готов');
  heading.tabIndex = -1;
  const label = node('p', fileName, 'pdf-delivery-name');
  const actions = node('div', '', 'pdf-delivery-actions');
  const save = node('a', 'Скачать PDF', 'pdf-delivery-save');
  save.href = url;
  save.download = fileName;
  const open = node('a', 'Открыть PDF');
  open.href = url;
  open.target = '_blank';
  open.rel = 'noopener';
  const status = node('p', '', 'pdf-delivery-status');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  let canShare = false;
  try { canShare = !!(file && navigator.share && navigator.canShare?.({files:[file]})); } catch {}
  if (canShare) {
   const share = node('button', 'Сохранить или отправить PDF', 'pdf-delivery-share');
   share.type = 'button';
   share.onclick = () => {
    if (share.disabled) return;
    share.disabled = true;
    status.textContent = 'Выберите «Сохранить в Файлы» или приложение для отправки.';
    let result;
    try { result = navigator.share({files:[file]}); }
    catch (error) { result = Promise.reject(error); }
    return Promise.resolve(result).then(() => {
     status.textContent = 'Проверьте сохранённый файл или вложение в выбранном приложении.';
    }).catch(error => {
     status.textContent = error?.name === 'AbortError'
      ? 'Отправка отменена. PDF можно скачать или открыть ниже.'
      : 'Не удалось открыть меню отправки. Скачайте PDF или откройте его кнопкой рядом.';
    }).finally(() => { share.disabled = false; });
   };
   actions.append(share);
  }
  actions.append(save, open);
  const help = node('p', canShare
   ? 'На телефоне используйте «Сохранить или отправить PDF»: передаётся сам файл с расширением .pdf.'
   : 'Скачайте файл с расширением .pdf. Если встроенный браузер мессенджера сохраняет «данные» без имени, откройте эту страницу в Safari или Chrome и сохраните PDF там.', 'pdf-delivery-help');
  const snapshot = node('p', 'Это копия выбора на момент подготовки. После правок подготовьте PDF заново.', 'pdf-delivery-help');
  panel.append(heading, label, actions, help, snapshot, status);
  host.replaceChildren(panel);
  host.hidden = false;
  heading.focus({preventScroll:true});
  panel.scrollIntoView({block:'nearest', behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  // Never revoke while a preview/share target might still be reading the file.
  return {name:fileName, size:blob.size};
 }
 // The browser releases object URLs with their document. No short timer or
 // pagehide revocation: downloads, previews and bfcache may still need them.
 window.ImbaPdfDelivery = Object.freeze({prepare});
})();

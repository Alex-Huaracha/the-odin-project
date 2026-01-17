export default function createActionButton({ className, iconId, onClick }) {
  const btn = document.createElement('button');
  btn.className = className;
  btn.innerHTML = `
    <svg class="icon">
      <use href="#${iconId}"></use>
    </svg>
  `;
  if (onClick) btn.addEventListener('click', onClick);
  return btn;
}

import Template from './templates/Template.js';
// console.log('hola');c
import './styles/main.css';
import './styles/vars.scss'
(async function App() {
  console.log('si se hiz el llamado a la API')
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();


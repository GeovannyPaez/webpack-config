import Template from './templates/Template.js';
// console.log('hola');c
import './styles/main.css';
import './styles/vars.scss'
(async function App() {
  console.log('amonos a la verga ss   a')
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();


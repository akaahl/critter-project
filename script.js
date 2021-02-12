const mainContainer = document.getElementById('creets');

const apiUrl = `https://www.acefrontend.com/c/critter/feed.json`;

function renderDate(dateString) {
  const date = new Date(dateString)
  const locale = 'en-us'
  const month = date.toLocaleString(locale, { month: 'short' })
  const day = date.getDate()
  return `${month} ${day}`
}

async function getData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  
  data.feed.forEach(item => {
  	addToDOM(item)
  })
}

function addToDOM(item) {
  const sectionContainer = document.createElement('section');
  sectionContainer.classList.add('creets-container');
  
  const { created_at: date, text, likes, user: { avatar }, user: { username } } = item;
    
  sectionContainer.innerHTML = `
    <img src="${avatar}" alt="animal photo">
    <div class="creets-handle">
      <h4>@${username} <span>&#183; ${renderDate(date)}</span></h4>
    </div>
    <div class="creets-status">
      <p>${text}</p>
    </div>
    <div class="creets-likes">
      <span>Likes: ${likes}</span>
    </div>
    `;
    
  mainContainer.appendChild(sectionContainer);
}

getData();
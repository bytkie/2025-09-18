let givenProfile = "";
let profileName = "";
let profileId = "";
let profileLink = "";
let profileRepos = "";
let profileFollowers = "";
let profileFollowing = "";

// Функция отрисовки страницы
function renderPage() {
  document.getElementById("app").innerHTML = `
    <div>
      <h1>Github profile viewer</h1>
      <p>Please enter profile name: </p>
      <input value="${givenProfile}" placeholder="Enter GitHub username" />
      <div class="content">
        <h1 id="name">Name: ${profileName ? profileName : "-"}</h1>
        <p id="id">Id: ${profileId ? profileId : "-"}</p>
        <p id="repos">Public repos: ${profileRepos ? profileRepos : "-"}</p>
        <p id="followers">Followers: ${
          profileFollowers ? profileFollowers : "-"
        }</p>
        <p id="following">Following: ${
          profileFollowing ? profileFollowing : "-"
        }</p>
        <p id="profileurl">Link: ${
          profileLink && profileName
            ? `<a href="${profileLink}" target="_blank">${profileLink}</a>`
            : "-"
        }</p>
      </div>
    </div>
  `;
  // После перерисовки обязательно снова добавляем обработчик на input!
  const input = document.querySelector("input");
  input.addEventListener("change", updateValue);
}

// Функция обработки ввода
function updateValue(e) {
  givenProfile = e.target.value;
  fetchProfile();
}

// Функция запроса профиля с GitHub
async function fetchProfile() {
  if (!givenProfile) {
    profileName = "";
    profileId = "";
    profileLink = "";
    profileRepos = "";
    profileFollowers = "";
    profileFollowing = "";
    renderPage();
    return;
  }
  try {
    const response = await fetch(
      `https://api.github.com/users/${givenProfile}`
    );
    if (!response.ok) {
      profileName = "User not found";
      profileId = "-";
      profileLink = "";
      profileRepos = "-";
      profileFollowers = "-";
      profileFollowing = "-";
    } else {
      const data = await response.json();
      profileName = data.login || "-";
      profileId = data.id || "-";
      profileLink = data.html_url || "";
      profileRepos = data.public_repos || "-";
      profileFollowers = data.followers || "-";
      profileFollowing = data.following || "-";
    }
    renderPage();
  } catch (e) {
    profileName = "Error";
    profileId = "-";
    profileLink = "";
    profileRepos = "-";
    profileFollowers = "-";
    profileFollowing = "-";
    renderPage();
  }
}

// Первичная отрисовка
renderPage();

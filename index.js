let search_area = document.querySelector(".searching_here");
let userDetailConatiner = document.querySelector(".user_details");
let content = document.querySelector(".content");

let user = async() => {
    let input = document.querySelector(".user_name");
    if (input.value.length <= 0) {
        userDetailConatiner.innerHTML = content.innerHTML;
    } else {
        content.innerHTML = `<i class="bi bi-arrow-clockwise"></i>`;
        let response = await fetch(`https://api.github.com/users/${input.value}`);
        let result = await response.json();
        let data = await result;
        //   console.log(data);
        showUserContent(data);
        content.innerHTML = 'Please enter your github username.'
    }
};


let showUserContent = (data) => {
    if (data.message === 'Not Found') {
        content.innerHTML = 'Uset not found';
        userDetailConatiner.innerHTML = content.innerHTML;
    } else {
        let userCardHtml = `<div class="head d-flex center">
        <img src="${data.avatar_url}" alt="${data.name}" class="photo">
        <div class="name_user_name">
            <div>
                <h1 class="name fw-bold">${(data.name) ? data.name : '-'}</h1>
                <a href="${data.html_url}" class="username" target="_blank">@${data.login}</a>
            </div>
            <p class="joined">Joined ${new Date(data.created_at).toLocaleDateString('en-US')}</p>
        </div>
    </div>
    <div class="bio_and_all">
        <p class="bio">${(data.bio) ? data.bio : '-'}</p>
        <ul class="repo_follower_following">
            <li>
                <h6 class="mb-5">Repos</h6>
                <span class="fw-bold">${data.public_repos}</span>
            </li>
            <li>
                <h6 class="mb-5">Followers</h6>
                <span class="fw-bold">${data.followers}</span>
            </li>
            <li>
                <h6 class="mb-5">Following</h6>
                <span class="fw-bold">${data.following}</span>
            </li>
        </ul>
        <div class="links ">
            <ul>
                <li>
                    <i class="bi bi-map-fill"></i>
                    <span>${(data.location) ? data.location : '-'}</span>
                </li>
                <li>
                    <i class="bi bi-link"></i>
                    <span>${(data.blog) ? data.blog : '-'}</span>
                </li>
            </ul>
            <ul>
                <li>
                    <i class="bi bi-twitter"></i>
                    <span>${(data.twitter_username) ? data.twitter_username : '-'}</span>
                </li>
                <li>
                    <i class="bi bi-building-fill"></i>
                    <span>${(data.company) ? data.company : '-'}</span>
                </li>
            </ul>
        </div>
    </div>
        `
        userDetailConatiner.innerHTML = userCardHtml
    }
}

search_area.addEventListener("submit", (e) => {
    e.preventDefault();
    user();
});
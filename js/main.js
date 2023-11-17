'use strist';

const cartButton = document.querySelector('#cart-button');
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('gloDelivery');

function toggleModal() {
    modal.classList.toggle("is-open");
}


function toggleModalAuth() {
    modalAuth.classList.toggle('is-open');
    if (modalAuth.classList.contains('is-open')) {
        disableScroll();
    } else {
        enableScroll();
    }
}

function clearForm() {
    loginInput.style.borderColor = '';
    logInForm.reset();
}

function authorized() {
    function logOut() {
        login = null;
        localStorage.removeItem('gloDelivery');
        userName.style.display = 'none';
        buttonOut.style.display = 'none';
        buttonAuth.style.display = '';
        buttonOut.removeEventListener('click', logOut);
        checkAuth();
    }

    console.log('Авторизован');
    userName.textContent = login;
    buttonAuth.style.display = 'none';
    userName.style.display = 'inline';
    buttonOut.style.display = 'block';

    buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
    console.log('Не авторизован');

    function logIn(event) {
        event.preventDefault();
        

        if (loginInput.value.trim()) {
            login = loginInput.value;
            localStorage.setItem('gloDelivery', login);
            toggleModalAuth();
            buttonAuth.style.display = 'none';
            userName.style.display = 'inline';
            buttonOut.style.display = 'block';
            buttonAuth.removeEventListener('click', toggleModalAuth);
            closeAuth.removeEventListener('click', toggleModalAuth);
            logInForm.removeEventListener('submit', logIn);
            logInForm.reset();
            checkAuth();
        } else {
            loginInput.style.borderColor = '#ff0000';
            loginInput.value = '';
        }
    }

    buttonAuth.addEventListener('click', toggleModalAuth);
    closeAuth.addEventListener('click', toggleModalAuth);
    logInForm.addEventListener('submit', logIn);
    modalAuth.addEventListener('click', function (event) {
        console.log(event.target);
        if (event.target.classList.contains('is-open')) {
            toggleModalAuth()
        }
    })
}

buttonAuth.addEventListener('click', clearForm);

function checkAuth() {
    if (login) {
        authorized();
    } else {
        notAuthorized();
    }
}

checkAuth();

function createCardsRestaurant() {
    const card = `
        <a  class="card">
            <img src="img/image.png" alt="image1" class="card-image">
            <div class="card-text">
                <div class="card-heading">
                    <h3 class="card-title">IQ Pizza</h3>
                        <span class="card-tag tag">20 мин</span>
                </div>
                <div class="card-info">
                    <div class="raiting">
                        <img src="img/rating.svg" alt="raiting" class="raiting-star">
                            4.5
                    </div>
                    <div class="price">От 69₴</div>
                    <div class="category">Пицца</div>
                </div>
            </div>
        </a>
    `;

    cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

createCardsRestaurant();
createCardsRestaurant();
createCardsRestaurant();

function createCardGood() {
    const card = document.createElement('div');
    card.className = 'card';

    card.insertAdjacentHTML('beforeend', `
        <img src="img/image-2.png" alt="image1" class="card-image">
        <div class="card-text">
            <div class="card-heading">
                <h3 class="card-title card-title-reg">Ролл угорь стандарт</h3>
            </div>
            <div class="card-info">
                <div class="ingredients">Рис, угорь, соус унаги, кунжут, водоросли нори.</div>
            </div>
            <div class="card-buttons">
                <button class="button button-primary">
                    <span class="button-card-text">В корзину</span>
                    <img src="img/shopping-cart2.svg" alt="shopping-card" class="button-card-image">
                </button>
                <strong class="card-price-bold">250 ₴</strong>
            </div>
       </div>
    `);

    cardsMenu.insertAdjacentElement('beforeend', card);
}

function openGoods(event) {
    

    const target = event.target;

    const restaurant = target.closest('.card');


if(login) {

if (restaurant) {
        cardsMenu.textContent = '';
        containerPromo.classList.add('hide')
        restaurants.classList.add('hide')
        menu.classList.remove('hide')

        createCardGood();
        createCardGood();
        createCardGood();
    }
	} else {
		toggleModalAuth();
	}
}


cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);



cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', function () {
    containerPromo.classList.remove('hide')
        restaurants.classList.remove('hide')
        menu.classList.add('hide')
})

//slider

new Swiper('.swiper-container',{
    sliderPerView: 1,
    autoplay: true,
    loop: true,
    effect: 'cube',
    grabCursor: true,
});
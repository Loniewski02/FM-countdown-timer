const secondsCard = document.querySelector('.app__body-card--seconds');
const minutesCard = document.querySelector('.app__body-card--minutes');
const hoursCard = document.querySelector('.app__body-card--hours');
const daysCard = document.querySelector('.app__body-card--days');
const box = document.querySelectorAll('.app__body-box');

const popup = document.querySelector('.popup');
const settingsBtn = document.querySelector('.app__body-settings');
const closePopupBtn = document.querySelector('.popup__main-close');
const confirmPopupBtn = document.querySelector('.popup__main-confirm');
const nameInput = document.querySelector('#name');
const dateInput = document.querySelector('#date');
const allInputs = popup.querySelectorAll('input');
const appHeading = document.querySelector('.app__heading');

const currentTime = new Date();
let usersTime = new Date();
usersTime.setHours(usersTime.getHours() + 216);
let prevSeconds;
let prevMinutes;
let prevHours;
let prevDays;

const checkPopup = () => {
	checkLength(nameInput);
	checkDate(dateInput);
	checkErrors();
};

const showError = (el, msg) => {
	const popupBox = el.parentElement;
	popupBox.classList.add('popup__main-box--error');
	const errorInfo = popupBox.querySelector('.error-info');
	errorInfo.textContent = msg;
};

const clearError = el => {
	const popupBox = el.parentElement;
	popupBox.classList.remove('popup__main-box--error');
};

const checkLength = inp => {
	if (inp.value === '') {
		showError(inp, `Can't be blank`);
	} else {
		clearError(inp);
	}
};

const checkDate = inp => {
	let time = new Date(dateInput.value);
	if (inp.value === '') {
		showError(inp, `Can't be blank`);
	} else if (time < currentTime) {
		showError(inp, `Can't be in the past`);
	} else {
		clearError(inp);
	}
};

const checkErrors = () => {
	const popupBoxes = popup.querySelectorAll('.popup__main-box');
	let errorCount = 0;

	popupBoxes.forEach(el => {
		if (el.classList.contains('popup__main-box--error')) {
			errorCount++;
		}
	});
	if (errorCount === 0) {
		setEvent();
	}
};

const setEvent = () => {
	let time = new Date(dateInput.value);

	appHeading.textContent = nameInput.value;
	usersTime = time;
	closePopup();
};

const closePopup = () => {
	popup.classList.remove('popup--active');
	nameInput.value = '';
	dateInput.value = '';
	clearError(nameInput);
	clearError(dateInput);
};

const setTime = () => {
	const currentTime = new Date();
	const result = usersTime - currentTime;

	const days = Math.floor(result / 1000 / 60 / 60 / 24);
	const hours = Math.floor(result / 1000 / 60 / 60) % 24;
	const minutes = Math.floor(result / 1000 / 60) % 60;
	const seconds = Math.floor(result / 1000) % 60;

	if (result < 0) {
		return;
	} else {
		if (prevSeconds !== seconds) {
			handleAnimation(secondsCard, seconds);
			prevSeconds = seconds;
		}
		if (prevMinutes !== minutes) {
			handleAnimation(minutesCard, minutes);
			prevMinutes = minutes;
		}
		if (prevHours !== hours) {
			handleAnimation(hoursCard, hours);
			prevHours = hours;
		}
		if (prevDays !== days) {
			handleAnimation(daysCard, days);
			prevDays = days;
		}
	}
};

const handleAnimation = (card, time) => {
	const top = card.querySelector('.app__body-card-top');
	const bottom = card.querySelector('.app__body-card-bottom');

	const topSpan = top.querySelector('span');
	const bottomSpan = bottom.querySelector('span');

	setTimeout(() => {
		topSpan.textContent = time;
		bottomSpan.textContent = time;
	}, 500);

	top.classList.add('animation-top');
	bottom.classList.add('animation-bottom');

	top.addEventListener('animationend', () => {
		top.classList.remove('animation-top');
	});

	bottom.addEventListener('animationend', () => {
		bottom.classList.remove('animation-bottom');
	});
};

setInterval(setTime, 1000);

closePopupBtn.addEventListener('click', closePopup);

settingsBtn.addEventListener('click', () => {
	popup.classList.add('popup--active');
});

confirmPopupBtn.addEventListener('click', checkPopup);

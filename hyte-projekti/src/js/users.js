import { fetchData } from './fetch.js';

const addUser = async (event) => {
	event.preventDefault();
	const username = document.querySelector('#username')?.value.trim();
	const password = document.querySelector('#password')?.value.trim();
	const email = document.querySelector('#email')?.value.trim();

	if (!username || !password || !email) {
		alert('Please fill username, password and email');
		return;
	}

	const payload = { username, password, email };

	const res = await fetchData('http://localhost:3000/api/users', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(payload),
	});

	if (res.error) {
		alert('Error creating user: ' + res.error);
		return;
	}

	alert('User created successfully');
	const form = document.querySelector('.addform');
	if (form) form.reset();
};

export { addUser };

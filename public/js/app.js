/** Registration Form */
$('form').on('submit', function (e) {
	e.preventDefault();
	const firstName = $('#firstName').val();
	const lastName = $('#lastName').val();
	const email = $('#email').val();
	$.ajax({
		type: 'POST',
		url: 'http://localhost:3000/users',
		data: {
			firstName,
			lastName,
			email,
		},
		success: console.log('success'),
	});
});

/** Admin Page */
$('#users').ready(function () {
	$.ajax({
		type: 'GET',
		url: 'http://localhost:3000/users',
		success: function (result) {
			for (user of result) {
				$('#users').append(
					`<li id='${user.id}'class='text-lg'>
                        ${user.firstName} ${user.lastName} - ${user.email}
                        <button id='edit' class='bg-blue-500 p-1 rounded-2xl text-white'>Edit</button>
                    </li>`
				);
			}
		},
	});
});

/** Edit */
$(function () {
	$('body').on('click', '#edit', function () {
		const id = $(this).parent().attr('id');
		/** Profile */
		$.ajax({
			url: `http://localhost:3000/users/${id}`,
			success: function (result) {
				$('#profile').empty();
				$('#profile').append(
					`<li class='text-lg'>First name: ${result.firstName}</li>
                    <li class='text-lg'>Last name: ${result.lastName}</li>
                    <li class='text-lg'>Email: ${result.email}</li>
                    <li class='text-lg'>State: ${result.state} </li>
                    <a id='${result.id}' class='bg-red-500 p-1 rounded-2xl text-white'>Delete</a>`
				);
			},
		});
	});
});

/** Delete */
$(function () {
	$('body').on('click', 'a', function () {
		const id = $(this).attr('id');
		$.ajax({
			type: 'DELETE',
			url: `http://localhost:3000/users/${id}`,
			success: console.log('User Deleted'),
		});
	});
});

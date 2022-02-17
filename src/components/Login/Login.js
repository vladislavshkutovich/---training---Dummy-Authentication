import React, { useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// * Reducers

const emailReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		return { value: action.value, isValid: action.value.includes('@') };
	}

	if (action.type === 'INPUT_BLUR') {
		return { value: state.value, isValid: state.value.includes('@') };
	}

	return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
	if (action.type === 'USER_INPUT') {
		console.log('USER_INPUT state', state);
		console.log('USER_INPUT action', action);
		return { value: action.value, isValid: action.value.trim().length > 6 };
	}

	if (action.type === 'INPUT_BLUR') {
		console.log('INPUT_BLUR state', state);
		console.log('INPUT_BLUR action', action);
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}

	return { value: '', isValid: false };
};

// * Login component

const Login = (props) => {
	// ? Managing state via useState

	const [formIsValid, setFormIsValid] = useState(false);

	// ? Managing state via useReducer

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: '',
		isValid: false,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: '',
		isValid: false,
	});

	// ? Email handlers

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: 'USER_INPUT', value: event.target.value });

		setFormIsValid(event.target.value.includes('@') && passwordState.isValid);
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: 'INPUT_BLUR' });
	};

	// ? Password handlers

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: 'USER_INPUT', value: event.target.value });

		setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
	};

	const validatePasswordHandler = (event) => {
		dispatchPassword({ type: 'INPUT_BLUR', value: event.target.value });
	};

	// ? Submit handler

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ''
					}`}
				>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;

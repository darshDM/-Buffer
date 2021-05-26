import React, { useState } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
//MaterialUI

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card'

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function UpdatePassword(){
    const history = useHistory();
	const initialFormData = Object.freeze({
		current_password: '',
		new_password: '',
		re_new_password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);
    
    const classes = useStyles();
	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};
    const handleSubmit = (e) => {
		e.preventDefault();
		axiosInstance
			.post(`auth/users/set_password/`,JSON.stringify({
				current_password: formData.current_password,
				new_password: formData.new_password,
				re_new_password: formData.re_new_password
			}))
			.then((res) => {
				console.log(res.statusText);
				history.push('/login');
				
				console.log(res.data);
			},(error)=>{
				console.log(error);
			});
	};
    return (
        <Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				
				<Typography component="h1" variant="h5">
					Update Password
				</Typography>
				<Card variant="outlined">#todo: Password cases</Card>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="current_password"
								label="Current password"
								name="current_password"
					            type="password"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="new_password"
								label="New Password"
								type="password"
								id="new_password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="re_new_password"
								label="Confirm New Password"
								type="password"
								id="re_new_password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
						
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Change
					</Button>
					
				</form>
			</div>
		</Container>
    )

}
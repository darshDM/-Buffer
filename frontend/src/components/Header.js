import React, { useEffect, useState, Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import axiosInstance from "../axios";
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
function getModalStyle() {
    const top = 30;
    const left = 45;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}
const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `2px solid ${theme.palette.divider}`,
	},
	link: {
		margin: theme.spacing(1, 1),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
	modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
	paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Header(props) {
	
	const [logged, setLogged] = useState(props.logged);
	//console.log(logged)
	const [open,setOpen] = useState(false);
	const [modalStyle] = useState(getModalStyle);
	const [serverName, setServerName] = useState(undefined);
	useEffect(()=>{
		setLogged(props.logged);
	},[props])
	const handleChange = (e) => {
		setServerName(e.target.value.trim())
	};
	const createServerButton = () =>{
		setOpen(true);
	}
	const handleClose = () => {
        setOpen(false);
    };
	const handleSubmit = () =>{
		console.log(serverName)
		axiosInstance
			.post(`v1/create-server`, {
				name: serverName,
			})
			.then((res) => {
				setOpen(false);
			});
	}
	const authLinks = () => {
		return <Fragment>
			<Button
			onClick={createServerButton}
			color="default"
			variant="outlined"
			className={classes.link}
			>
			<AddRoundedIcon></AddRoundedIcon>
		</Button>
			<Button
			href="#"
			color="default"
			variant="outlined"
			className={classes.link}
			component={NavLink}
			to="/logout"
			>
			Logout
		</Button>
		</Fragment> 
		
	};
	const guestLinks = () => {
		return <Fragment>
		<nav>
						<Link
							color="textPrimary"
							href="#"
							className={classes.link}
							component={NavLink}
							to="/register"
						>
					Register
						</Link>
		</nav>
					<Button
						color="default"
						variant="outlined"
						className={classes.link}
						component={NavLink}
						to="/login"
					>
					Login
					</Button>
		</Fragment>	
	};
	
	const classes = useStyles();
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar variant="dense" className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary">
							Channels
						</Link>
					</Typography>
					{logged ? authLinks() : guestLinks()}
				</Toolbar>
			</AppBar>
			<Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2>Create Server</h2>
                    <TextField
						variant="filled"
						color="secondary"
						margin="normal"
						required
						fullWidth
						id="server-name"
						label="Server Name"
						name="server-name"
						autoComplete="server-name"
						autoFocus
						onChange={handleChange}
					/>
					<Button
						type="submit"
						variant="contained"
						color="secondary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Create
					</Button>
                </div>
            </Modal>
		</React.Fragment>
	);
}

export default Header;
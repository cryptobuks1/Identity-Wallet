import React, { Component } from 'react';
import {
	withStyles,
	List,
	ListItem,
	ListItemText,
	Drawer,
	ListItemIcon,
	Grid,
	Typography,
	Divider
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Close from '@material-ui/icons/Close';
import {
	DashboardMenuIcon,
	MarketplaceMenuIcon,
	SelfkeyIDMenuIcon,
	AddressBookMenuIcon,
	SelfkeyLogo
} from 'selfkey-ui';

const styles = theme => ({
	list: {
		margin: 0,
		width: 300
	},

	logoSection: {
		marginBottom: '30px',
		marginTop: '-30px',
		paddingLeft: '16px'
	},

	logo: {
		width: '38px',
		height: '44px'
	},

	logoText: {
		fontFamily: 'Orbitron, arial, sans-serif',
		fontSize: '18px',
		letterSpacing: '2.77px',
		lineHeight: '22px',
		paddingTop: '3px'
	},

	closeSection: {
		width: '100%'
	},

	pointer: {
		cursor: 'pointer'
	},

	listItem: {
		alignItems: 'end',
		display: 'flex',
		marginBottom: '30px',
		paddingLeft: '10px'
	}
});

const dashboard = props => <Link to="/main/dashboard" {...props} />;
const marketplace = props => <Link to="/main/marketplace-categories" {...props} />;
const selfkeyID = props => <Link to="/main/selfkeyID" {...props} />;
const addressBook = props => <Link to="/main/addressBook" {...props} />;
const switchAccount = props => <Link to="/home" {...props} />;

class Sidebar extends Component {
	state = {
		open: false
	};

	componentDidMount() {
		this.toggleDrawer(this.props.isOpen);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen !== this.props.isOpen) {
			this.toggleDrawer(this.props.isOpen);
		}
	}

	toggleDrawer = open => {
		this.props.onClose(open);
		this.setState({
			open
		});
	};

	render() {
		const { classes } = this.props;

		const sideList = (
			<Grid
				container
				direction="column"
				justify="flex-start"
				alignItems="flex-start"
				className={classes.list}
				spacing={40}
			>
				<Grid item className={classes.closeSection}>
					<Grid container direction="row" justify="flex-end" alignItems="flex-start">
						<Grid item>
							<Close color="secondary" className={classes.pointer} />
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<Grid
						container
						direction="row"
						justify="flex-start"
						alignItems="center"
						spacing={16}
						className={classes.logoSection}
					>
						<Grid item>
							<SelfkeyLogo className={classes.logo} />
						</Grid>
						<Grid item>
							<Typography variant="h1" className={classes.logoText}>
								SELFKEY
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item>
					<List>
						<ListItem
							className={classes.listItem}
							component={dashboard}
							key="dashboard"
						>
							<ListItemIcon>
								<DashboardMenuIcon />
							</ListItemIcon>
							<Typography variant="body2" color="secondary" gutterBottom>
								Dashboard
							</Typography>
						</ListItem>
						<ListItem
							className={classes.listItem}
							component={marketplace}
							key="marketplace"
						>
							<ListItemIcon>
								<MarketplaceMenuIcon />
							</ListItemIcon>
							<Typography variant="body2" color="secondary" gutterBottom>
								Marketplace
							</Typography>
						</ListItem>
						<ListItem
							className={classes.listItem}
							component={selfkeyID}
							key="selfkeyID"
						>
							<ListItemIcon>
								<SelfkeyIDMenuIcon />
							</ListItemIcon>
							<Typography variant="body2" color="secondary" gutterBottom>
								SelfKey ID
							</Typography>
						</ListItem>
						<ListItem
							className={classes.listItem}
							component={addressBook}
							key="addressBook"
						>
							<ListItemIcon>
								<AddressBookMenuIcon />
							</ListItemIcon>
							<Typography variant="body2" color="secondary" gutterBottom>
								Address Book
							</Typography>
						</ListItem>
					</List>
				</Grid>
				<Divider />
				<Grid item>
					<List>
						<ListItem
							className={classes.listItem}
							component={switchAccount}
							key="switchAccount"
						>
							<ListItemText primary="Switch Account" />
						</ListItem>
					</List>
				</Grid>
			</Grid>
		);

		return (
			<Drawer anchor="right" open={this.state.open} onClose={() => this.toggleDrawer(false)}>
				<div
					tabIndex={0}
					role="button"
					onClick={() => this.toggleDrawer(false)}
					onKeyDown={() => this.toggleDrawer(false)}
				>
					{sideList}
				</div>
			</Drawer>
		);
	}
}

export default withStyles(styles)(Sidebar);
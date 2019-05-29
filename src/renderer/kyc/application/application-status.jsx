import React from 'react';
import { withStyles, Grid, Typography, Button } from '@material-ui/core';
import { success, warning, AttributeAlertIcon } from 'selfkey-ui';
import { CheckOutlined } from '@material-ui/icons';

const styles = theme => ({
	successBar: {
		padding: '22px 30px',
		border: '2px solid',
		borderColor: success,
		alignItems: 'center',
		'& p': {
			display: 'inline-block',
			marginLeft: '1em'
		},
		'& svg': {
			verticalAlign: 'middle'
		}
	},
	warningBar: {
		padding: '22px 30px',
		border: '2px solid',
		borderColor: warning,
		alignItems: 'center',
		'& p': {
			display: 'inline-block',
			marginLeft: '1em'
		},
		'& svg': {
			verticalAlign: 'middle'
		}
	},
	checkIcon: {
		fill: success
	}
});

export const ApplicationStatusCompleted = withStyles(styles)(({ classes }) => (
	<React.Fragment>
		<Grid item xs={12}>
			<CheckOutlined className={classes.checkIcon} />
			<Typography variant="body2" color="secondary">
				Your application was successful
			</Typography>
		</Grid>
	</React.Fragment>
));

export const ApplicationStatusRejected = withStyles(styles)(({ classes }) => (
	<React.Fragment>
		<Grid item xs={12}>
			<AttributeAlertIcon />
			<Typography variant="body2" color="secondary">
				Your previous application was rejected
			</Typography>
		</Grid>
	</React.Fragment>
));

export const ApplicationStatusUnpaid = withStyles(styles)(({ classes, paymentAction }) => (
	<React.Fragment>
		<Grid item xs={9}>
			<AttributeAlertIcon />
			<Typography variant="body2" color="secondary">
				You have an existing <strong>unpaid</strong> application
			</Typography>
		</Grid>
		<Grid item xs={3} className={classes.payment}>
			<Button variant="contained" onClick={paymentAction}>
				Pay
			</Button>
		</Grid>
	</React.Fragment>
));

export const ApplicationStatusInProgress = withStyles(styles)(({ classes, contact }) => (
	<React.Fragment>
		<Grid item xs={12}>
			<AttributeAlertIcon />
			<Typography variant="body2" color="secondary">
				You have an existing <strong>in progress</strong> application
				{contact ? `, please contact ${contact} for further details` : ''}
			</Typography>
		</Grid>
	</React.Fragment>
));

const statusComponent = {
	completed: { StatusComponent: ApplicationStatusCompleted, statusType: 'success' },
	progress: { StatusComponent: ApplicationStatusInProgress, statusType: 'warning' },
	unpaid: { StatusComponent: ApplicationStatusUnpaid, statusType: 'warning' },
	rejected: { StatusComponent: ApplicationStatusRejected, statusType: 'warning' }
};

export const ApplicationStatusBar = withStyles(styles)(
	({ classes, status, contact, paymentAction }) => {
		if (!statusComponent.hasOwnProperty(status)) {
			return null;
		}
		const { StatusComponent, statusType } = statusComponent[status];
		return (
			<Grid
				container
				direction="row"
				justify="flex-start"
				alignItems="flex-start"
				className={statusType === 'success' ? classes.successBar : classes.warningBar}
			>
				<StatusComponent contact={contact} paymentAction={paymentAction} />
			</Grid>
		);
	}
);
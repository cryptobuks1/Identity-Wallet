import React, { Component } from 'react';
import { Typography, Button, Grid, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import Popup from '../../../common/popup';
import { appSelectors } from 'common/app';
import { WarningShieldIcon } from 'selfkey-ui';
import { kycOperations } from 'common/kyc';

const styles = theme => ({});

class HardwareWalletTimeout extends Component {
	handleClose = () => {
		this.props.dispatch(kycOperations.cancelCurrentApplicationOperation());
	};

	render() {
		const typeText = this.props.hardwareWalletType === 'ledger' ? 'Ledger' : 'Trezor';
		return (
			<Popup open={true} closeAction={this.handleClose} text="Authentication Confirmation">
				<Grid
					container
					direction="row"
					justify="flex-start"
					alignItems="flex-start"
					spacing={40}
				>
					<Grid item xs={2}>
						<WarningShieldIcon />
					</Grid>
					<Grid item xs={10}>
						<Grid
							container
							direction="column"
							justify="flex-start"
							alignItems="flex-start"
							spacing={40}
						>
							<Grid item>
								<Typography variant="h2">Declined Authentication</Typography>
								<Typography variant="body1">
									You declined this authentication on your {typeText} device
								</Typography>
							</Grid>
							<Grid item>
								<Button
									color="secondary"
									variant="outlined"
									onClick={this.handleClose}
								>
									OK
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Popup>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		hardwareWalletType: appSelectors.selectApp(state).hardwareWalletType
	};
};

export default connect(mapStateToProps)(withStyles(styles)(HardwareWalletTimeout));
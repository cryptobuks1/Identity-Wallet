import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Dashboard from '../../dashboard';
import { CryptoMangerContainer, AddTokenContainer } from '../../crypto-manager';
import AddressBook from '../../address-book/main';
import AddressBookAdd from '../../address-book/add';
import AddressBookEdit from '../../address-book/edit';

import {
	MarketplaceCategoriesPage,
	MarketplaceExchangesPage,
	MarketplaceIncorporationPage,
	MarketplaceServiceDetailsPage
} from '../../marketplace';

import { SelfkeyIdContainer } from '../../selfkey-id/main';
import Transfer from '../../transaction/send';
import AdvancedTransaction from '../../transaction/send/advanced-transaction';
import ReceiveTransfer from '../../transaction/receive';
import { walletTokensOperations } from 'common/wallet-tokens';

import { Grid, withStyles } from '@material-ui/core';
import Toolbar from './toolbar';
import { connect } from 'react-redux';

import TransactionSendProgress from '../../transaction/progress/containers/transaction-send-progress-box';
import TransactionNoGasError from '../../transaction/transaction-no-gas-error/containers/transaction-no-gas-error';
import TransactionError from '../../transaction/transaction-error/containers/transaction-error';

import { CurrentApplication, ApplicationInProgress } from '../../kyc';

const styles = theme => ({
	headerSection: {
		marginLeft: 0,
		marginRi: 0,
		width: '100%'
	},
	bodySection: {
		maxWidth: '1140px',
		width: '100%'
	},
	page: {}
});

const contentWrapperStyle = {
	marginBottom: '60px',
	marginTop: '50px'
};

class Main extends Component {
	async componentDidMount() {
		this.props.dispatch(walletTokensOperations.loadWalletTokens());
	}
	render() {
		const { match, classes } = this.props;
		return (
			<Grid
				container
				direction="column"
				justify="space-between"
				alignItems="center"
				className={classes.page}
			>
				<Grid item className={classes.headerSection}>
					<Toolbar />
				</Grid>
				<Grid item xs={12} className={classes.bodySection} style={contentWrapperStyle}>
					<Route path={`${match.path}/dashboard`} component={CurrentApplication} />
					<Route
						path={`${match.path}/kyc/application-in-progress`}
						component={ApplicationInProgress}
					/>
				</Grid>
			</Grid>
		);
	}
	render2() {
		const { match, classes } = this.props;
		return (
			<Grid
				container
				direction="column"
				justify="space-between"
				alignItems="center"
				className={classes.page}
			>
				<Grid item className={classes.headerSection}>
					<Toolbar />
				</Grid>
				<Grid item xs={12} className={classes.bodySection} style={contentWrapperStyle}>
					<Route path={`${match.path}/dashboard`} component={Dashboard} />
					<Route
						path={`${match.path}/crypto-manager`}
						component={CryptoMangerContainer}
					/>
					<Route path={`${match.path}/add-token`} component={AddTokenContainer} />
					<Route path={`${match.path}/addressBook`} component={AddressBook} />
					<Route path={`${match.path}/selfkeyId`} component={SelfkeyIdContainer} />
					<Route path={`${match.path}/addressBookAdd`} component={AddressBookAdd} />
					<Route path={`${match.path}/addressBookEdit/:id`} component={AddressBookEdit} />
					<Route
						path={`${match.path}/marketplace-categories`}
						component={MarketplaceCategoriesPage}
					/>
					<Route
						path={`${match.path}/marketplace-exchanges`}
						component={MarketplaceExchangesPage}
					/>
					<Route
						path={`${match.path}/marketplace-services/:name`}
						component={MarketplaceServiceDetailsPage}
					/>
					<Route
						path={`${match.path}/marketplace-incorporation`}
						component={MarketplaceIncorporationPage}
					/>
					<Route
						path={`${match.path}/transfer/:crypto`}
						render={props => (
							<Transfer cryptoCurrency={props.match.params.crypto.toUpperCase()} />
						)}
					/>
					<Route
						path={`${match.path}/transaction-progress`}
						component={TransactionSendProgress}
					/>
					<Route
						path={`${match.path}/transaction-no-gas-error`}
						component={TransactionNoGasError}
					/>
					<Route path={`${match.path}/transaction-error`} component={TransactionError} />
					<Route
						path={`${match.path}/advancedTransaction/:cryptoCurrency`}
						component={AdvancedTransaction}
					/>
					<Route
						path={`${match.path}/transfer/receive/:crypto`}
						render={props => (
							<ReceiveTransfer
								cryptoCurrency={props.match.params.crypto.toUpperCase()}
							/>
						)}
					/>
					<Route
						path={`${match.path}/kyc/current-application`}
						component={CurrentApplication}
					/>
					<Route
						path={`${match.path}/kyc/application-in-progress`}
						component={ApplicationInProgress}
					/>
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {};
};

export default connect(mapStateToProps)(withStyles(styles)(Main));

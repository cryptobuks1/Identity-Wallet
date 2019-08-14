import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { MarketplaceDIDRequired } from './selfkey-did-required';
import { walletOperations } from 'common/wallet';

const MARKETPLACE_PATH = '/main/marketplace-categories';

class MarketplaceSelfkeyDIDRequiredContainer extends Component {
	handleConfirm = evt => {
		evt.preventDefault();
		this.props.dispatch(walletOperations.startCreateDidFlow(MARKETPLACE_PATH));
	};
	handleClose = () => {
		this.props.dispatch(push(MARKETPLACE_PATH));
	};
	handleEnterDID = evt => {
		evt.preventDefault();
		this.props.dispatch(walletOperations.startAssociateDidFlow(MARKETPLACE_PATH));
	};
	render() {
		return (
			<MarketplaceDIDRequired
				onConfirm={this.handleConfirm}
				onEnterDid={this.handleEnterDID}
				onClose={this.handleClose}
			/>
		);
	}
}

const connectedComponent = connect(state => ({}))(MarketplaceSelfkeyDIDRequiredContainer);

export { connectedComponent as MarketplaceSelfkeyDIDRequiredContainer };
export default connectedComponent;

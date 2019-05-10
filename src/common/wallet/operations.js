import * as actions from './actions';
import { getWallet } from './selectors';

import { getGlobalContext } from 'common/context';
import * as types from './types';
import { createAliasedAction } from 'electron-redux';
import { push } from 'connected-react-router';
import { appSelectors } from 'common/app';
const hardwalletConfirmationTime = '30000';

const getWalletWithBalance = async wallet => {
	const walletService = getGlobalContext().walletService;
	const balance = await walletService.getBalance(wallet.id);

	return {
		...wallet,
		balance
	};
};

const updateWalletWithBalance = wallet => async dispatch => {
	await dispatch(actions.updateWallet(await getWalletWithBalance(wallet)));
};

const refreshWalletBalance = () => async (dispatch, getState) => {
	await dispatch(actions.updateWallet(await getWalletWithBalance(getWallet(getState()))));
};

const updateWalletAvatar = (avatar, walletId) => async (dispatch, getState) => {
	try {
		const walletService = getGlobalContext().walletService;
		await walletService.updateWalletAvatar(avatar, walletId);
		const wallet = getWallet(getState());
		await dispatch(updateWalletWithBalance({ ...wallet, profilePicture: avatar }));
	} catch (error) {
		console.error(error);
	}
};

const updateWalletName = (name, walletId) => async (dispatch, getState) => {
	try {
		const walletService = getGlobalContext().walletService;
		const wallet = await walletService.updateWalletName(name, walletId);
		const walletFromStore = getWallet(getState());
		await dispatch(updateWalletWithBalance({ ...walletFromStore, name: wallet.name }));
	} catch (error) {
		console.error(error);
	}
};

const createWalletDID = () => async (dispatch, getState) => {
	const walletFromStore = getWallet(getState());
	try {
		let hardwalletConfirmationTimeout = null;
		const walletType = appSelectors.selectWalletType(getState());

		if (walletType === 'ledger' || walletType === 'trezor') {
			await dispatch(push('/main/hd-transaction-timer'));
			hardwalletConfirmationTimeout = setTimeout(async () => {
				clearTimeout(hardwalletConfirmationTimeout);
				await dispatch(push('/main/transaction-timeout'));
			}, hardwalletConfirmationTime);
		}

		const didService = getGlobalContext().didService;
		await dispatch(updateWalletWithBalance({ ...walletFromStore, didPending: true }));
		const gasLimit = await didService.getGasLimit(walletFromStore.publicKey);
		const transaction = didService.createDID(walletFromStore.publicKey, gasLimit);
		transaction.on('receipt', async receipt => {
			const did = receipt.events.CreatedDID.returnValues.id;
			const walletService = getGlobalContext().walletService;
			const wallet = await walletService.updateDID(walletFromStore.id, did);
			await dispatch(
				updateWalletWithBalance({
					...walletFromStore,
					did: wallet.did,
					didPending: false
				})
			);
			await dispatch(push('/main/selfkeyId'));
		});
		transaction.on('transactionHash', async hash => {
			clearTimeout(hardwalletConfirmationTimeout);
			await dispatch(push('/main/create-did-processing'));
		});
		transaction.on('error', async error => {
			clearTimeout(hardwalletConfirmationTimeout);
			const message = error.toString().toLowerCase();
			if (message.indexOf('insufficient funds') !== -1) {
				await dispatch(push('/main/transaction-no-gas-error'));
			}
			await dispatch(updateWalletWithBalance({ ...walletFromStore, didPending: false }));
			console.error(error);
		});
	} catch (error) {
		await dispatch(updateWalletWithBalance({ ...walletFromStore, didPending: false }));
		console.error(error);
	}
};

const updateWalletDID = (walletId, did) => async (dispatch, getState) => {
	try {
		const walletFromStore = getWallet(getState());
		const DIDService = getGlobalContext().didService;
		const controllerAddress = await DIDService.getControllerAddress();

		if (walletFromStore.publicKey === controllerAddress) {
			const walletService = getGlobalContext().walletService;
			const wallet = await walletService.updateDID(walletId, did);
			await dispatch(updateWalletWithBalance({ ...walletFromStore, did: wallet.did }));
		} else {
			// TODO - dispatch action with error to show that DID is not devived from the current wallet
		}
	} catch (error) {
		console.error(error);
	}
};

const updateWalletSetup = (setup, walletId) => async (dispatch, getState) => {
	try {
		const walletService = getGlobalContext().walletService;
		const wallet = await walletService.updateWalletSetup(setup, walletId);
		const walletFromStore = getWallet(getState());
		await dispatch(
			updateWalletWithBalance({ ...walletFromStore, isSetupFinished: wallet.isSetupFinished })
		);
	} catch (error) {
		console.error(error);
	}
};

export default {
	...actions,
	updateWalletWithBalance,
	refreshWalletBalance,
	updateWalletAvatar: createAliasedAction(types.WALLET_AVATAR_UPDATE, updateWalletAvatar),
	updateWalletName: createAliasedAction(types.WALLET_NAME_UPDATE, updateWalletName),
	updateWalletSetup: createAliasedAction(types.WALLET_SETUP_UPDATE, updateWalletSetup),
	createWalletDID: createAliasedAction(types.WALLET_DID_CREATE, createWalletDID),
	updateWalletDID: createAliasedAction(types.WALLET_DID_UPDATE, updateWalletDID)
};

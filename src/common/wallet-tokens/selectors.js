import { createSelector } from 'reselect';
import { getViewAll } from 'common/view-all-tokens/selectors';
import { getPrices } from 'common/prices/selectors';
import { getWallet } from 'common/wallet/selectors';

export const getTopTokenListSize = state => state.walletTokens.topTokenListSize;

export const getTokens = state => {
	const tokens = state.walletTokens.tokens;
	tokens.forEach(token => {
		const price = getPrices(state).prices.filter(price => price.symbol === token.symbol)[0];
		token.balanceInFiat = token.balance * price.priceUSD;
		token.price = price.priceUSD;
	});
	return [getWallet(state), ...tokens];
};

const getVisibleTokens = state => {
	return getTokens(state).filter(token => token.hidden < 1);
};

const getFilteredTokens = state => {
	const tokens = getVisibleTokens(state);
	const topTokenListSize = getTopTokenListSize(state);
	const topTokens = tokens.slice(0, topTokenListSize);
	const otherTokens = tokens.slice(topTokenListSize, tokens.length);
	if (otherTokens.length) {
		const othersToken = getOthersToken(otherTokens);
		return [...topTokens, othersToken];
	} else {
		return topTokens;
	}
};

const getOthersToken = otherTokens => {
	return {
		name: 'Others',
		symbol: 'OTHERS',
		balance: getOthersTokenBalance(otherTokens, 'balance'),
		balanceInFiat: getOthersTokenBalance(otherTokens, 'balanceInFiat')
	};
};

const getOthersTokenBalance = (otherTokens, balanceType) => {
	return otherTokens.reduce((a, b) => {
		return a + b[balanceType];
	}, 0);
};

export const getVisibleTokens = createSelector(
	[getViewAll, getVisibleTokens, getFilteredTokens],
	(viewAll, notHiddenTokens, filteredTokens) => {
		if (viewAll.viewAll) {
			return notHiddenTokens;
		} else {
			return filteredTokens;
		}
	}
);

import React from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import { BankingTypesTab } from './details-types-tab';
import { BankingCountryTab } from './details-country-tab';
import { BankingDescriptionTab } from './details-description-tab';
import { BankingServicesTab } from './details-services-tab';

const styles = theme => ({});

export const BankingDetailsPageTabs = withStyles(styles)(
	({ classes, tab = 'types', onTabChange, ...tabProps }) => {
		return (
			<React.Fragment>
				<Tabs value={tab} onChange={(evt, value) => onTabChange(value)}>
					<Tab id="accountButton" value="types" label="Account Types" />
					<Tab id="descriptionButton" value="description" label="Description" />
					<Tab id="countryButton" value="country" label="Country Details" />
					<Tab id="servicesButton" value="services" label="Services" />
				</Tabs>
				{tab === 'types' && <BankingTypesTab id="accountTab" {...tabProps} />}
				{tab === 'country' && <BankingCountryTab id="countryTab" {...tabProps} />}
				{tab === 'services' && <BankingServicesTab id="servicesTab" {...tabProps} />}
				{tab === 'description' && (
					<BankingDescriptionTab id="descriptionTab" {...tabProps} />
				)}
			</React.Fragment>
		);
	}
);

export default BankingDetailsPageTabs;

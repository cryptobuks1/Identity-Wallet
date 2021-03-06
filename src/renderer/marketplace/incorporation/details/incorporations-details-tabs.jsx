import React from 'react';
import { withStyles, Tabs, Tab } from '@material-ui/core';
import { IncorporationsLegalTab } from './incorporations-details-legal-tab';
import { IncorporationsTaxesTab } from './incorporations-details-taxes-tab';
import { IncorporationsTaxTreatiesTab } from './incorporations-details-tax-treaties-tab';
import { IncorporationsCountryTab } from './incorporations-details-country-tab';
import { IncorporationsDescriptionTab } from './incorporations-details-description-tab';
import { IncorporationsServicesTab } from './incorporations-details-services-tab';

const styles = theme => ({});

export const IncorporationsDetailsTabs = withStyles(styles)(
	({ classes, tab = 'description', onTabChange, ...tabProps }) => {
		return (
			<React.Fragment>
				<Tabs value={tab} onChange={(evt, value) => onTabChange(value)}>
					<Tab id="descriptionButton" value="description" label="Description" />
					<Tab id="legalButton" value="legal" label="Legal" />
					<Tab id="taxesButton" value="taxes" label="Taxes" />
					<Tab id="countryButton" value="country" label="Country Details" />
					<Tab id="taxTreatiesButton" value="taxTreaties" label="Tax Treaties" />
					<Tab id="servicesButton" value="services" label="Services" />
				</Tabs>
				{tab === 'description' && (
					<IncorporationsDescriptionTab id="descriptionTab" {...tabProps} />
				)}
				{tab === 'legal' && <IncorporationsLegalTab id="legalTab" {...tabProps} />}
				{tab === 'taxes' && <IncorporationsTaxesTab id="taxesTab" {...tabProps} />}
				{tab === 'country' && <IncorporationsCountryTab id="countryTab" {...tabProps} />}
				{tab === 'taxTreaties' && (
					<IncorporationsTaxTreatiesTab id="taxTreatiesTab" {...tabProps} />
				)}
				{tab === 'services' && <IncorporationsServicesTab id="servicesTab" {...tabProps} />}
			</React.Fragment>
		);
	}
);

export default IncorporationsDetailsTabs;

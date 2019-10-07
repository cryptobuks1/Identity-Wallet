import React from 'react';
import { Grid, CardHeader, Card, CardContent, withStyles } from '@material-ui/core';
import { grey, EditTransparentIcon, typography } from 'selfkey-ui';
import 'react-orgchart/index.css';
import OrgChart from 'react-orgchart';

const styles = theme => ({
	hr: {
		backgroundColor: '#303C49',
		border: 'none',
		boxSizing: 'border-box',
		height: '1px',
		margin: '5px 16px'
	},
	card: {},
	cardHeader: {
		whiteSpace: 'normal',
		wordBreak: 'break-all'
	},
	cardAction: {
		padding: '1em 1em 0'
	},
	regularText: {
		'& span': {
			fontWeight: 400
		}
	},
	orgChart: {
		overflow: 'scroll',
		margin: 'auto',
		'& .initechNode': {
			backgroundColor: '#313D49',
			border: `solid 1px ${grey}`,
			borderRadius: '3px',
			padding: '1em',
			display: 'inline-block',
			margin: '0 2px',
			minWidth: '60px',
			fontSize: '12px'
		},
		'& .initechNode span': {
			display: 'block',
			color: `${typography}`,
			fontSize: '12px',
			marginTop: '0.5em'
		},
		'& .orgNodeChildGroup .nodeLineTable .nodeGroupLineVerticalMiddle': {
			borderRight: `solid 1px ${grey}`
		},
		'& .nodeLineTable .nodeLineBorderTop': {
			borderTop: `solid 1px ${grey}`
		}
	}
});

const generateStructFromCap = (name, cap) => {
	return {
		name: name,
		role: 'Entity',
		children: cap
	};
};

const editAction = onEdit => (
	<div onClick={onEdit}>
		<EditTransparentIcon />
	</div>
);

const treeNode = ({ node }) => (
	<div className="initechNode">
		{node.name}
		<span>{node.role}</span>
	</div>
);

const CorporateOrgChart = withStyles(styles)(props => {
	const { classes, profile, cap = [], onEdit } = props;
	return (
		<Grid container direction="column" spacing={32}>
			<Grid item>
				<Card>
					<CardHeader
						title="Structure"
						classes={{
							root: classes.regularText,
							action: classes.cardAction
						}}
						action={editAction(onEdit)}
					/>
					<hr className={classes.hr} />
					<CardContent className={classes.orgChart}>
						<OrgChart
							tree={generateStructFromCap(profile.entityName, cap)}
							NodeComponent={treeNode}
						/>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
});

export { CorporateOrgChart };
export default CorporateOrgChart;

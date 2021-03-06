import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';
import { CloseButtonIcon, HourGlassLargeIcon } from 'selfkey-ui';

const styles = theme => ({
	container: {
		position: 'relative',
		width: '100%',
		margin: '0 auto',
		maxWidth: '780px'
	},
	containerHeader: {
		padding: '22px 30px',
		background: '#2A3540',
		'& div': {
			display: 'inline-block',
			color: '#FFF'
		}
	},
	closeIcon: {
		position: 'absolute',
		right: '-19px',
		top: '-20px'
	},
	contentContainer: {
		border: '1px solid #303C49',
		borderRadius: '4px',
		padding: '30px'
	},
	icon: {
		width: '120px'
	},
	content: {
		width: '100%'
	},
	insideContent: {
		width: 'calc(100% - 160px)'
	},
	description: {
		fontFamily: 'Lato, arial',
		color: '#FFF',
		lineHeight: '1.5em',
		fontSize: '14px',
		'& p': {
			marginBottom: '1em'
		},
		'& p.email': {
			color: '#00C0D9',
			padding: '10px 0 10px 0'
		},
		'& strong': {
			fontWeight: '700'
		}
	},
	instructions: {
		padding: '30px 0',
		borderTop: '1px solid #475768'
	},
	footer: {
		width: '100%',
		'& button': {
			marginRight: '30px'
		}
	}
});

const MarketplaceProcessStarted = withStyles(styles)(
	({ classes, title, body, onBackClick, onSelfKeyClick }) => (
		<div className={classes.container}>
			<CloseButtonIcon onClick={onBackClick} className={classes.closeIcon} />
			<Grid
				container
				justify="flex-start"
				alignItems="flex-start"
				className={classes.containerHeader}
			>
				<Typography variant="h2">{title}</Typography>
			</Grid>
			<div className={classes.contentContainer}>
				<Grid
					container
					justify="flex-start"
					alignItems="flex-start"
					className={classes.content}
				>
					<div className={classes.icon}>
						<HourGlassLargeIcon />
					</div>
					<div className={classes.insideContent}>
						<div className={classes.description}>{body}</div>
						<div className={classes.instructions} style={{ display: 'none' }}>
							<Typography variant="subtitle2" color="secondary" gutterBottom>
								The application is available to you at any point under the
								marketplace applications tab, in your SelfKey ID Profile.
							</Typography>
						</div>
						<div className={classes.footer}>
							<Button variant="contained" size="large" onClick={onSelfKeyClick}>
								Go to Profile
							</Button>
							<Button variant="outlined" size="large" onClick={onBackClick}>
								Close
							</Button>
						</div>
					</div>
				</Grid>
			</div>
		</div>
	)
);

export { MarketplaceProcessStarted };
export default MarketplaceProcessStarted;

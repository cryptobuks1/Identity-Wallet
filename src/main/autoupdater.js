/* istanbul ignore file */
'use strict';
import { app, dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import striptags from 'striptags';

export function appUpdater() {
	autoUpdater.logger = log;

	// TODO: hard coding it now but should be moved to a config file or build time or allow user to choose
	autoUpdater.channel = 'beta';
	autoUpdater.allowDowngrade = false;

	// Ask the user if update is available
	autoUpdater.on('update-downloaded', info => {
		let message =
			app.getName() +
			' ' +
			info.releaseName +
			' is now available. It will be installed the next time you restart the application.';
		if (info.releaseNotes) {
			const notesInText = striptags(info.releaseNotes);
			const splitNotes = notesInText.split(/[^\r]\n/);
			message += '\n\nRelease Notes:\n';
			splitNotes.forEach(notes => {
				message += notes + '\n\n';
			});
		}
		// Ask user to update the app
		dialog.showMessageBox(
			{
				type: 'question',
				buttons: ['Install and Relaunch', 'Later'],
				defaultId: 0,
				message: 'A new version of ' + app.getName() + ' has been downloaded',
				detail: message
			},
			response => {
				if (response === 0) {
					setTimeout(() => autoUpdater.quitAndInstall(), 1);
				}
			}
		);
	});
	// init for updates
	autoUpdater.checkForUpdatesAndNotify();
}

export default appUpdater;

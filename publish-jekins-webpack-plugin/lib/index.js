
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
const { exec } = require('child_process');
// https://juejin.cn/post/6988117125491589156?searchId=20231211214356FF734B57C707B69A5807
/**
 * @example
 * new ArchiveDistPlugin({
 *  targetPath: '/custom/target/path/dist.zip',
 *  userName: 'yourUsername',
 *  userToken: 'yourUserToken',
 *  url: 'yourJenkinsURL',
 * });
 * or
 * new ArchiveDistPlugin({
 *  targetPath: '/custom/target/path/dist.zip',
 *  sshRestful: 'yourSSHRestfulString',
 * });
 */
class PublishJekinsPlugin {
    /** 
     * targetPath:string&
     * (
     * {
     * userName:string
     * userToken:string
     * url:string
     * }|
     * sshRestful:string
     * )
     */
    constructor(options) {
        this.options = options || {};
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tap('PublishJekinsPlugin', () => {
            const outputPath = compiler.options.output.path;
            const outputFolder = path.resolve(outputPath, '..');
            const targetPath = this.options.targetPath
            if (!targetPath) {
                console.error('need targetpath')
                return
            }

            const archive = archiver('zip', { zlib: { level: 9 } });

            const output = fs.createWriteStream(targetPath);
            archive.on('error', (err) => {
                throw err;
            });
            output.on('close', () => {
                console.log('dist.zip created successfully!');
                this.reloadServer();
            });
            archive.directory(path.join(outputFolder, 'dist'), 'dist');
            archive.pipe(output);
            archive.finalize();
        });
    }

    reloadServer() {
        // Your reloadServer logic here
        const { userName, userToken, url, sshRestful } = this.options;
        if (userName && userToken && url) {
            // Trigger Jenkins build using HTTP
            this.triggerJenkinsBuild(userName, userToken, url);
        } else if (sshRestful) {
            // Trigger Jenkins build using SSH
            this.triggerJenkinsBuildSSH(sshRestful);
        } else {
            console.error('Invalid configuration for reloading server.');
        }
    }
    triggerJenkinsBuild(userName, userToken, url) {
        exec(
            `curl -X POST  -u ${userName}:${userToken} ${url}`,
            (error) => {
                if (error) {
                    console.error(`Error triggering Jenkins build: ${error.message}`);
                    return;
                }
                console.log('Jenkins build triggered successfully!');
            },
        );
    }

    triggerJenkinsBuildSSH(sshRestful) {
        exec(
            sshRestful,
            (error) => {
                if (error) {
                    console.error(`Error triggering Jenkins build: ${error.message}`);
                    return;
                }
                console.log('Jenkins build triggered successfully!');
            },
        );
    }

}

module.exports = PublishJekinsPlugin;


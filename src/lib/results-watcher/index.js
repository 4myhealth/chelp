import Vue from 'vue';
import log from 'electron-log';
import fs from 'fs';
import DB from '../database';
import ResultEntity from './result-entity';
import Upload from './upload';
import electronStore from '../store';

const maxUploadTries = 5;


class ResultsWatcher {
  /**
   * [construct description]
   * @param  {[type]} path          [description]
   * @return {[type]}               [description]
   */
  constructor(path) {
    this.path = path;
    this.dbPath = DB.RESULTS_WATCHER_PDFS + this.path;
    this.restart = false;
    this.results = electronStore.get(this.dbPath, {});
    this.events = new Vue();
    this.quitExecutions = false;

    const pdfs = Object.keys(this.results);
    pdfs.forEach((pdf) => {
      this.results[pdf] = new ResultEntity(this.results[pdf]);
    });
  }

  /**
   * [start description]
   * @return {[type]} [description]
   */
  async start() {
    if (this.quitExecutions) {
      return;
    }
    if (!this.path) {
      log.error('Can not start ResultsWatcher for undefined path');
      return;
    }
    if (!this.restart) {
      log.info(`Start ResultsWatcher for path: ${this.path}`);
      this.restart = true;
    }

    await this.checkDirectory();
    if (this.restart) {
      setTimeout(() => {
        this.start();
      }, 5000);
    }
  }

  /**
   * [stop description]
   * @return {[type]} [description]
   */
  stop() {
    log.info(`Stop ResultsWatcher for path: ${this.path}`);
    this.restart = false;
    this.quitExecutions = true;
  }

  /**
   * [checkDirectory description]
   * @return {[type]} [description]
   */
  async checkDirectory() {
    log.info(`Check files for path: ${this.path}`);
    const files = fs.readdirSync(this.path);
    const pdfs = files.filter(file => file.slice(-4).toLowerCase() === '.pdf');

    pdfs.forEach((pdf) => {
      if (!this.results[pdf]) {
        this.results[pdf] = new ResultEntity({ filename: pdf, path: this.path });
      }
    });
    const keys = Object.keys(this.results);

    await Promise.all(keys.map(async (pdf) => {
      try {
        const resultEntity = this.results[pdf];
        if (resultEntity.errors.length >= maxUploadTries) {
          return;
        }

        if (resultEntity.status !== Upload.STATUS_UPLOAD_SUCCESS
          && resultEntity.uploadTries < maxUploadTries) {
          await resultEntity.upload();
        }
      } catch (err) {
        // muss i was tun? schauma mal...
      }
    }));

    electronStore.set(this.dbPath, JSON.parse(JSON.stringify(this.results)));
    log.info(`Checked files for path: ${this.path}`);
    this.events.$emit('folder-checked');
  }
}


export default ResultsWatcher;

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';

import { GithubCommit } from '../_models/githubCommit';
import { GITHUBCOMMITS } from '../sample-data/sample-github-commits';

@Injectable()
export class GithubCommitsService {

  private githubAPIUrl: string;

  constructor(private http: Http) {
    this.githubAPIUrl = 'https://api.github.com/';
  }

  /**
   * Returns an array of GithubCommits for a given repo
   *
   * @param ownerName
   * @param repoName
   * @returns {any}
   */
  getRepoCommits(ownerName: string, repoName: string): Observable<GithubCommit[]> {
    // Ensure param validity
    if (ownerName == null || ownerName === '') {
      return Observable.throw('Invalid Github owner name supplied: ' + ownerName);
    }
    if (repoName == null || repoName === '') {
      return Observable.throw('Invalid Github repo name supplied: ' + repoName);
    }

    // Testing
    ownerName = 'C3ICapstone';
    repoName = 'stackbutton';

    // Build the get url, then make and return the request
    // GET /repos/:owner/:repo/commits
    const getUrl = this.githubAPIUrl + 'repos/' + ownerName + '/' + repoName + '/commits';
    console.log('getRepoCommits getUrl: ' + getUrl);

    return this.http.get(getUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Github Server Error'));
  }

  /**
   * Retrieve a single GithubCommit
   *
   * @param ownerName
   * @param repoName
   * @param sha
   * @returns {any}
   */
  getCommit(ownerName: string, repoName: string, sha: string): Observable<GithubCommit[]> {
    // Ensure param validity
    if (ownerName == null || ownerName === '') {
      return Observable.throw('Invalid Github owner name supplied: ' + ownerName);
    }
    if (repoName == null || repoName === '') {
      return Observable.throw('Invalid Github repo name supplied: ' + repoName);
    }
    if (sha == null || sha === '') {
      return Observable.throw('Invalid Github sha supplied: ' + sha);
    }

    // Build the get url, then make and return the request
    // GET /repos/:owner/:repo/commits/:sha
    const getUrl = this.githubAPIUrl + 'repos/' + ownerName + '/' + repoName + '/commits/' + sha;
    console.log('getCommit getUrl: ' + getUrl);

    return this.http.get(getUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Github Server Error'));
  }

  /**
   * Get the local sample GithubCommits
   *
   * @returns {any} Array of sample GithubCommits
   */
  getCommitsSample(): Observable<GithubCommit[]> {
    return Observable.of(GITHUBCOMMITS);
  }

  /**
   * For testing: get local sample GithubCommits, with a 3 second delay
   *
   * @returns {any} Array of sample GithubCommits
   */
  getCommitsSampleSlowly(): Observable<GithubCommit[]> {
    return Observable.of(GITHUBCOMMITS).delay(3000);
  }

  /**
   * For testing: Return an observable with an error where a GithubCommit is expected
   *
   * @returns {any} Errored Observable
   */
  getCommitsSampleError(): Observable<GithubCommit[]> {
    return Observable.throw('Get GithubCommits Error');
  }

}

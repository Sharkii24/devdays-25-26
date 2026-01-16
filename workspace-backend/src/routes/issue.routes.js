import { Router } from 'express';
import { getAllIssues, getIssueByIssueId, fetchGithubIssues, fetchGithubIssuesPaginated } from '../controllers/issue.controller.js';
import { validateCreateIssues } from '../middlewares/issue.middleware.js';

const issueRouter = Router();

issueRouter.get('/issues', getAllIssues);
issueRouter.get('/issues/:issueId', getIssueByIssueId);
issueRouter.post('/issues/fetch', validateCreateIssues, fetchGithubIssues);
issueRouter.post('/issues/fetch/paginated', validateCreateIssues, fetchGithubIssuesPaginated);

export { issueRouter };
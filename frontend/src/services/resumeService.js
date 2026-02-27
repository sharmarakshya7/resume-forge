import { api } from './api.js';

/**
 * Save (upsert) the current user's resume on the server.
 * @param {object} resumeData - full resume data object
 * @returns {{ message, resume }}
 */
export const saveResume = (resumeData) =>
  api.post('/resume', resumeData);

/**
 * Load the current user's saved resume from the server.
 * @returns {{ resume }} or null if none saved yet
 */
export const loadResume = () =>
  api.get('/resume');

import { useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import {basePath} from '../../config.js';

export default useRouterHistory(createHistory)({ basename: basePath });

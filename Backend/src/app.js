import config from './configs/config.js';
import express from 'express';

import cookieSession from 'cookie-session';
import passport from "passport";

import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expense.js';
import incomeRoutes from './routes/income.js';
import errorHandler from './middlewares/errorHandler.js';
import routeNotFoundHandler from './middlewares/routeNotFoundHandler.js';
import './services/passport.js';
import { cookieSessionFix } from './utils/cookieSessionFixes.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
    name: 'session',
    maxAge: 10 * 24 * 60 * 60 * 1000,
    keys: [config.session.cookieKey1],
}));
app.use(cookieSessionFix);

app.use(passport.initialize());
app.use(passport.session());

export const baseUrl = config.baseUrl;

/* ROUTES */
const apiBaseUrl = `/api/${config.api_version}`;

app.get(`${apiBaseUrl}`,(req, res) => res.status(200).json({success: true, message: 'Expense Tracker API'}))
app.use(`${apiBaseUrl}/auth`, authRoutes);
app.use(`${apiBaseUrl}/expenses`, expenseRoutes);
app.use(`${apiBaseUrl}/incomes`, incomeRoutes);

app.use(routeNotFoundHandler);
app.use(errorHandler);

export default app;
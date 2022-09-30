/** @format */

import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import LoginBox from './Components/LoginBox';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Feed from './Pages/Feed';
import FriendsList from './Pages/FriendsList';
import PersonalProfile from './Pages/PersonalProfile';
import LogInPage from './Pages/LogInPage';
import AccountSettings from './Pages/AccountSettings';
import MessengerPage from './Pages/MessengerPage';

import HomePage from './Pages/HomePage';
import OtherUserProfile from './Pages/OtherUserProfile';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LogInPage />} />
					<Route path='/HomePage' element={<HomePage />} />
					<Route path='/Messenger' element={<MessengerPage />} />
					<Route path='/Feed' element={<Feed />} />
					<Route path='/FriendsList' element={<FriendsList />} />
					<Route path='/AccountSettings' element={<AccountSettings />} />
					<Route path='/PersonalProfile' element={<PersonalProfile />} />
					<Route path='/PersonalProfile/:id' element={<OtherUserProfile />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;

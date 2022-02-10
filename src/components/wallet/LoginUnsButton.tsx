import { useEffect, useState } from 'react';
import { formatEther } from '@ethersproject/units';
import { useEtherBalance, useEthers} from '@usedappify/core';
import Identicon from './Identicon';
import UAuth from '@uauth/js'

export default function LoginUnsButton({ handleOpenModal }: any) {
//const uath = useUnstoppableDomains();
//console.log(useUnstoppableDomains())
const uauth = new UAuth({
  clientID: process.env.UNS_CLIENTID,
  clientSecret: process.env.UNS_CLIENTSECRET,
  redirectUri: process.env.UNS_REDIRECT_URI,
  postLogoutRedirectUri: process.env.UNS_LOGOUT_REDIRECT_URI,
  // Scope must include openid and wallet
  scope: 'openid wallet',
  // Injected and walletconnect connectors are required.
  //connectors: {injected, walletconnect},
})

async function handleUAuthConnect() {
    try {
      const unsauth = await uauth.loginWithPopup();
      console.log(unsauth);
      //setAccount(unsauth.idToken.sub);

    } catch (error) {
      console.error(error);
    }
}

useEffect(() => {
  uauth
    .user()
    .then(userData => {
      //setUser(userData);
      //setAccount(userData.sub);
      console.log(userData);
    })
    .catch(error => {
      console.error('profile error:', error);
    })
}, [])

return (
			<button
				onClick={handleUAuthConnect}
			>
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ/SURBVHgB7ZnNa9RAGMafN2Z33bboHooVQRF7saDSnvy4iKd6kHb3JCgUBIvXiiD0Kn6AIOpNkCr6D7i9rVRFELUXP04qglK9bQW7ittt1yTjvBFqY2vZJpNMR/KDkGVgJ8/z5nknQ0KQFA83tjsCtyFEL4gKWPNQ2SZxulzJT5Ev3hOvzBC+GKpJE32249FVEAwTz4gCp8YCiSKMhXotGI0oGG4ASA3oJjWgm9SAblIDutFiYNceCyNnMoGxuZ5wUmwkyKYu8oXvlgamq2JhfOa4jR/9NrYOzWG1JGbg5Ckbg6Xg5ZxOwtfhDOZ7wgchMQN/i/fagOr5rDwTopBohBbDwr0GIqO8iblBOetJocwAC794OYtL8uhK0ICSCA3LBh0o/Xuq76X4kqpk5r0H1i073soqQ7MCG+676JBHGGIrDT+YZqR4NrEclhTeed1B7q3n/w5LLAa+ych86V65vaxZIP8iXNUD8yAG5ncGp+Uqx0VsEeJsdzzx/Crn3kkDB9cjDmIxsPmpiy23nEjZbpVIEeIGnR7N4s3GYKMe3UYB8QOlpatUtarGXOg7wKtM7VgGbS9dvP/k4dDQn6l4tzl2J4cHEy52dBP27V9q4OFE9AZm6Eh/Y9WlaMoKC7mX8bMtaW8Hxu7m5Lm1JzBvpUfPNgNb6rCEilD2s1gQz9TrwLUrP1v+/80bjhLxjLJldPKZhwvnmitmu14XvtHJ52riwyhdhdjExw9NDBZtf3PH+WfY1COZ+fF7rm9CJaF6YC2RvpXQTWpAN6kB3aQGdPMfGBCiBoORX+rpNQxFQIxbDuGEkXdBanaJRqxKJT/lWNRHoDJM4HexH7Nm1v4LuUTUJSWSY4YAAAAASUVORK5CYII=" />
    </button> 
)

}

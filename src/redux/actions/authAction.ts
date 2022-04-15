import axios from 'axios';
import Web3 from 'web3';
import { call, put } from 'redux-saga/effects';
import { setLoggedIn, setViewedJobs } from '../reducers/authReducer';
import { signInWithCustomToken, getIdToken } from 'firebase/auth';
import { auth } from '../../firebase';
import { maybeFixMetamaskConnection } from '../../provider/MetamaskProvider';

declare global {
  interface windows {
    ethereum: any;
  }
}

const handleSignIn = async (
  address: string,
  type?: number,
  openJoinPopup?: () => void
) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/user/getMessageToSign?address=${address}&type=${type}`
  );
  if (!response.data.isExisting) {
    if (openJoinPopup) {
      openJoinPopup();
      return;
    } else {
      throw new Error('Register is failed!');
    }
  }
  const messageToSign = response?.data?.messageToSign;

  if (!messageToSign) {
    throw new Error('Invalid message to sign');
  }

  const web3 = new Web3(Web3.givenProvider);
  const signature = await web3.eth.personal.sign(
    messageToSign,
    address,
    'password'
  );

  const jwtResponse = await axios.get(
    `${process.env.REACT_APP_API_URL}/user/getJwt?address=${address}&signature=${signature}`
  );

  const customToken = jwtResponse?.data?.customToken;

  if (!customToken) {
    throw new Error('Invalid JWT');
  }

  await signInWithCustomToken(auth, customToken);
  if (auth.currentUser) {
    const idToken = await getIdToken(auth.currentUser);
    localStorage.setItem('custom_token', customToken);
    localStorage.setItem('jwt_token', idToken);
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + idToken;
  }

  return jwtResponse?.data?.userData;
};

export function* handleConnectWallet(action: any): any {
  const { onClose, type, openPopup } = action.payload;

  try {
    const accounts = yield (window as any).ethereum.request({
      method: 'eth_requestAccounts',
    });

    const account = Web3.utils.toChecksumAddress(accounts[0].toLowerCase());
    const userData = yield handleSignIn(account.toLowerCase(), type, openPopup);
    if (!userData) {
      return;
    }

    const { data }: any = yield axios.get(
      `${process.env.REACT_APP_API_URL}/job/getViewedJobs`,
      {
        params: { userId: account.toLowerCase() },
      }
    );

    if (data.success) {
      yield put(
        setLoggedIn({
          isLoggedIn: true,
          viewedJobs: data.jobs,
          userInfo: {
            address: account.toLowerCase(),
            ...(userData || {}),
          },
        })
      );
    } else {
      yield put(
        setLoggedIn({
          isLoggedIn: true,
          address: account.toLowerCase(),
          userInfo: {
            address: account.toLowerCase(),
            ...(userData || {}),
          },
        })
      );
    }

    if (onClose) {
      onClose();
    }
  } catch (e: any) {
    console.log(e.message);
  }
}

export function* handleLoginWithToken(action: any): any {
  const { token, connect } = action.payload;
  try {
    const dat = yield signInWithCustomToken(auth, token);
    const account = dat.user?.uid;

    if (account) {
      const idToken = localStorage.getItem('jwt_token');
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + idToken;

      const { data }: any = yield axios.get(
        `${process.env.REACT_APP_API_URL}/user/getUserInfo`,
        {
          params: { id: account },
        }
      );

      if (data?.success) {
        if (connect) {
          connect();
        }
        yield put(
          setLoggedIn({
            isLoggedIn: true,
            userInfo: {
              address: account,
              ...(data?.user || {}),
            },
          })
        );
      } else {
        auth.signOut();
      }
    } else {
      auth.signOut();
    }
  } catch (e: any) {
    auth.signOut();
    console.log(e.message);
  }
}

export function* handleGetViewedJobs(action: any): any {
  try {
    const { account } = action.payload;
    const { data }: any = yield axios.get(
      `${process.env.REACT_APP_API_URL}/job/getViewedJobs`,
      {
        params: { userId: account },
      }
    );
    if (data.success) {
      yield put(setViewedJobs(data.jobs));
    }
  } catch (e) {
    console.log(e);
  }
}

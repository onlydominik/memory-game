import { redirect } from 'react-router-dom';
import { ActionFunction } from 'react-router-dom';
import StartScreenForm from './StartScreenForm.tsx';
import { Logo } from '../../components/Logo/Logo.tsx';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase.ts';

const StartScreen = () => {
  return (
    <main className="pt-10 max-w-screen-md mx-auto">
      <div
        className="min-h-32 flex items-center justify-center bg-startScreen-logoBg sm:rounded-t-3xl"
        role="banner"
        aria-label="Application logo"
      >
        <Logo isLink={false} />
      </div>
      <StartScreenForm />
    </main>
  );
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const data = await request.formData();
    const username = (data.get('username') as string) || null;

    const usernameDoc = doc(db, 'currentUser', 'username');
    await updateDoc(usernameDoc, { username: username });
    return redirect('/');
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error occurred:', error.message);
    } else {
      console.error('Error occurred:', error);
    }
    return {
      status: 500,
      statusText: 'Internal Server Error: Unable to connect to server',
    };
  }
};

export default StartScreen;

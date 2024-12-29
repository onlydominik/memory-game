import { redirect } from 'react-router-dom';
import { ActionFunction } from 'react-router-dom';
import StartScreenForm from './StartScreenForm.tsx';
import { Logo } from '../../components/Logo/Logo.tsx';

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

    const body = {
      id: 1,
      username: username,
    };

    const res = await fetch('http://localhost:3000/currentUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return {
        status: 400,
        statusText: 'Failed to save username',
      };
    }

    return redirect('/');
  } catch (error: any) {
    console.error('Error occurred:', error?.message || error);
    return {
      status: 500,
      statusText: 'Internal Server Error: Unable to connect to server',
    };
  }
};

export default StartScreen;

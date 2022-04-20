import type { LoaderFunction } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import { users } from '@clerk/remix/api.server';
import { getAuth } from '@clerk/remix/ssr.server';
import { Link, useLoaderData } from '@remix-run/react';
import { Button } from '@mantine/core';
import { useClerk } from '@clerk/remix';

export const loader: LoaderFunction = async ({ request }) => {
  const { userId } = await getAuth(request);

  if (userId) {
    // return redirect('/sign-in?redirect_url=' + request.url);
    const user = await users.getUser(userId);
    return json({ user });
  }

  return { user: null };
};

export default function Index() {
  const { user } = useLoaderData();
  const { signOut } = useClerk();
  return (
    <div>
      <main>
        <Link to="/sign-in">
          <Button variant="outline">Login</Button>
        </Link>
        <Link to="/" onClick={async () => await signOut()}>
          <Button variant="outline">Sign out</Button>
        </Link>
        <pre>{JSON.stringify({ user }, null, 2)}</pre>
      </main>
    </div>
  );
}

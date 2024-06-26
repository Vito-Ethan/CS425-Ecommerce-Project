'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { incQuantity } from '../sanity-helpers';
import { useShoppingCart } from 'use-shopping-cart';

export default function StripeError() {
  const [count, setCount] = useState(5);
  const router = useRouter();
  const timerID = useRef<NodeJS.Timeout>();
  const firstRender = useRef(true);
  const { cartDetails }: { cartDetails: {} } = useShoppingCart();
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      (async () => {
        const products: { docID: string; quantity: number }[] =
          Object.values(cartDetails);
        for (const product of products) {
          //return the the products back into inventory
          await fetch('/sanity/api', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              type: 'increment',
              product: { docID: product.docID, quantity: product.quantity },
            }),
            cache: 'no-store',
          });
        }
      })();
    }

    timerID.current = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    return () => clearInterval(timerID.current);
  }, []);

  useEffect(() => {
    if (count === 0) {
      //redirect to
      router.push('/');
    }
  }, [count]);

  return (
    <div className="flex flex-col justify-center items-center my-auto">
      <h2 className="font-semibold text-2xl">
        Payment Error, something went wrong...
      </h2>

      <div>
        You will be automatically redirected in{' '}
        <span className="text-lg font-bold"> {count}</span> seconds
      </div>
      <div className="flex justify-center">
        <button className="bg-stone-800 text-slate-100 rounded-2xl py-2 px-6 hover:opacity-75 transition-opacity mt-2">
          <Link href="/">Go Home Now</Link>
        </button>
      </div>
    </div>
  );
}

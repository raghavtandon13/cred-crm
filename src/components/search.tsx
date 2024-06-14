'use client';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Search() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const phoneNumber = e.target[0].value;
        if (phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)) {
            router.push(`/${phoneNumber}`);
        } else {
            setErrorMessage('Phone number must be exactly 10 digits');
        }
    };

    return (
        <form className="w-full items-center justify-center pt-5" onSubmit={handleSubmit}>
            <Input type="number" placeholder="Phone Number" />
            {errorMessage && <small className="text-red-500">{errorMessage}</small>}
        </form>
    );
}

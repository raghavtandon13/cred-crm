'use client';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
        <form className="w-full items-center justify-center  pt-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 sm:flex-row">
                <Input className="flex-[6]" type="number" placeholder="Phone Number" />
                <Button className="flex-[1]" variant="secondary">
                    Search
                </Button>
            </div>
            {errorMessage && <small className="text-red-500">{errorMessage}</small>}
        </form>
    );
}

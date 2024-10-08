'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Search({ phone, mv }: { phone: string; mv: boolean }) {
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const phoneNumber = e.target[0].value;
        if (mv === true) {
            window.location.href = `/mv/${phoneNumber}`;
            return;
        }
        window.location.href = `/${phoneNumber}`;
    };

    return (
        <form className="w-full items-center justify-center  pt-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 sm:flex-row">
                <Input type="tel" pattern="\d{10}" maxLength={10} className="flex-[6]" placeholder="Phone Number" defaultValue={phone} />
                <Button className="flex-[1]" variant="secondary">
                    Search
                </Button>
            </div>
        </form>
    );
}

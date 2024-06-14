import Image from 'next/image';
import Search from '@/components/search';

export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col items-stretch p-10 px-10 md:p-20 md:px-40">
            <div className="flex h-20 w-full items-end justify-between">
                <h1 className="text-2xl font-bold">DATABASE</h1>
                <Image className="rounded" src="/cred.svg" alt="Credmantra Logo" width={150} height={36} priority />
            </div>
            <Search />
        </main>
    );
}

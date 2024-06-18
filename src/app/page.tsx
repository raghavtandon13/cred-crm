import Image from 'next/image';
import Search from '@/components/search';
import Date from '@/components/date';
// import Dashboard from '@/components/dashboard';


export default async function Home(searchParams: any) {
    return (
        <main className="flex min-h-screen flex-col items-stretch p-10 px-5 md:p-20 md:px-40">
            <div className="flex h-20 w-full items-end justify-between">
                <h1 className="text-2xl font-bold">DATABASE</h1>
                <Image className="rounded" src="/cred.svg" alt="Credmantra Logo" width={150} height={36} priority />
            </div>
            <Search phone="" />
            <h1 className="flex items-center py-5 text-2xl font-bold">
                DASHBOARD
                {searchParams.searchParams.start && searchParams.searchParams.end ? (
                    <>
                        <span className="pl-2 text-sm font-normal text-gray-500">from {searchParams.searchParams.start}</span>
                        <span className="pl-1 text-sm font-normal text-gray-500"> to {searchParams.searchParams.end}</span>
                    </>
                ) : null}
            </h1>
	    <Date />
        </main>
    );
}
// <Dashboard dates={{ start: searchParams.searchParams.start, end: searchParams.searchParams.end }} />

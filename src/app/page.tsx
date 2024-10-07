import Image from 'next/image';
import Search from '@/components/search';
import Date from '@/components/date';
import Dashboard from '@/components/dashboard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home(searchParams: any) {
    let dateprops: any = {};
    if (searchParams.searchParams.start && searchParams.searchParams.end) {
        dateprops.start = searchParams.searchParams.start;
        dateprops.end = searchParams.searchParams.end;
    } else {
        dateprops.start = '1970-01-01';
        dateprops.end = '2030-01-01';
    }
    return (
        <main className="flex min-h-screen flex-col items-stretch p-10 px-5 md:p-20 md:px-40">
            <div className="flex h-20 w-full items-end justify-between">
                <div>
                    <Button asChild className="ml-[-1rem] text-2xl font-bold" variant={'link'}>
                        <Link href="/" className="text-2xl font-bold">
                            DATABASE
                        </Link>
                    </Button>
                    <Button asChild className="ml-[-1rem] text-2xl font-bold" variant={'link'}>
                        <Link href="/mv" className="text-sm  font-bold">
                            MV STATUS-&gt;
                        </Link>
                    </Button>
                </div>
                <Image className="rounded" src="/cred.svg" alt="Credmantra Logo" width={150} height={36} priority />
            </div>
            <Search phone="" />
            <h1 className="flex flex-col items-start py-5 text-2xl font-bold sm:flex-row sm:items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button asChild className="ml-[-1rem] text-2xl font-bold" variant={'link'}>
                                <Link href="/full">DASHBOARD</Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>SHOW FULL DETAILS</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                {searchParams.searchParams.start && searchParams.searchParams.end ? (
                    <div className="flex">
                        <span className="text-sm font-normal text-gray-500 sm:pl-2">from {searchParams.searchParams.start}</span>
                        <span className="pl-1 text-sm font-normal text-gray-500"> to {searchParams.searchParams.end}</span>
                    </div>
                ) : null}
            </h1>
            <Date dates={dateprops} />
            <Dashboard dates={dateprops} />
        </main>
    );
}

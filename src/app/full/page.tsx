import Image from 'next/image';
import Search from '@/components/search';
import Date from '@/components/date';
import Countboard from '@/components/countboard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SearchParams {
    start?: string;
    end?: string;
}

interface FullProps {
    searchParams: SearchParams;
}

export default function Full({ searchParams }: FullProps) {
    let dateprops: { start: string; end: string } = {
        start: searchParams.start || '1970-01-01',
        end: searchParams.end || '2030-01-01',
    };

    return (
        <div className="flex min-h-screen flex-col items-stretch p-10 px-5 md:p-20 md:px-40">
            <div className="flex h-20 w-full items-end justify-between">
                <Button asChild className="ml-[-1rem] text-2xl font-bold" variant={'link'}>
                    <Link href="/" className="text-2xl font-bold">
                        DATABASE
                    </Link>
                </Button>
                <Image className="rounded" src="/cred.svg" alt="Credmantra Logo" width={150} height={36} priority />
            </div>
            <Search phone="" mv={false} />
            <h1 className="flex flex-col items-start py-5 text-2xl font-bold sm:flex-row sm:items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button asChild className="ml-[-1rem] text-2xl font-bold" variant={'link'}>
                                <Link href="/">FULL DASHBOARD</Link>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>SHOW LESS DETAILS</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {searchParams.start && searchParams.end && (
                    <div className="flex">
                        <span className="text-sm font-normal text-gray-500 sm:pl-2">from {searchParams.start}</span>
                        <span className="pl-1 text-sm font-normal text-gray-500"> to {searchParams.end}</span>
                    </div>
                )}
            </h1>
            <Date dates={dateprops} />
            <Countboard dates={dateprops} />
        </div>
    );
}

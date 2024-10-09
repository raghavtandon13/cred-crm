import Image from 'next/image';
import User from '@/lib/models/user.model';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Search from '@/components/search';
export const dynamic = 'force-dynamic'

async function findMoneyViewId(phone: string): Promise<any> {
    try {
        const userArray = await User.find({ phone: phone });
        const user = userArray[0];
        console.log(user);
        if (!user || !user.accounts) {
            console.log('User or user accounts not found');
            throw new Error('User or user accounts not found');
        }

        const moneyViewAccount = user.accounts.find((account: any) => account.name === 'MoneyView');
        console.log(moneyViewAccount);
        if (!moneyViewAccount) {
            console.log('MoneyView account not found');
            throw new Error('MoneyView account not found');
        }

        const tokenResponse = await fetch('https://atlas.whizdm.com/atlas/v1/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                partnerCode: 158,
                userName: 'credmantra',
                password: 'p-wWj6.13M',
            }),
        });

        if (!tokenResponse.ok) {
            const errorText = await tokenResponse.text();
            throw new Error(`Failed to fetch token: ${tokenResponse.status} ${tokenResponse.statusText}. ${errorText}`);
        }

        const tokenData = await tokenResponse.json();
        const token = tokenData.token;

        const leadStatusResponse = await fetch(`https://atlas.whizdm.com/atlas/v1/lead/status/${moneyViewAccount.id}`, {
            method: 'GET',
            headers: {
                token: token,
            },
        });

        if (!leadStatusResponse.ok) {
            const errorText = await leadStatusResponse.text();
            throw new Error(`Failed to fetch lead status: ${leadStatusResponse.status} ${leadStatusResponse.statusText}. ${errorText}`);
        }

        const leadStatusData = await leadStatusResponse.json();
        console.log('Lead status data:', leadStatusData);
        return leadStatusData;
    } catch (error) {
        console.error('Error in findMoneyViewId:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

export default async function Phone({ params }: { params: { phone: string } }) {
    let phone = '';
    let res = null;
    let error = null;

    if (params.phone) {
        phone = params.phone.toString();
    }

    try {
        res = await findMoneyViewId(phone);
    } catch (err) {
        error = err instanceof Error ? err.message : String(err);
    }

    return (
        <main className="flex min-h-screen flex-col items-stretch p-10 px-5 md:p-20 md:px-40">
            <div className="flex h-20 w-full items-end justify-between">
                <a href="/" className="text-2xl font-bold">
                    DATABASE
                </a>
                <Image className="rounded" src="/cred.svg" alt="Credmantra Logo" width={150} height={36} priority />
            </div>
            <Search phone={phone} mv={true} />
            {error ? (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">Error: {error}</div>
            ) : (
                <div className="items-center justify-center">
                    <h1 className="py-10 font-bold">MoneyView Details</h1>
                    <Table>
                        <TableBody>
                            {Object.entries(res).map(
                                ([key, value]: any) =>
                                    value && (
                                        <TableRow key={key}>
                                            <TableCell className="font-medium">{key}</TableCell>
                                            <TableCell className="text-right">{value.toString()}</TableCell>
                                        </TableRow>
                                    ),
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </main>
    );
}
